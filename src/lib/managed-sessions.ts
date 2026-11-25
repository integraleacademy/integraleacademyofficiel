import { sessionMatchesLocation } from './session-location-filter';
import { resolveSessionSeatCapacity } from './session-capacity';

type Key = {slug: string; centre: string; start: string; end: string; exam: string; standard_start?: string};
export type CatalogueRow = Key & {
  id: string; aliases: Key[]; visibility: 'public' | 'match' | 'internal' | 'closed';
  capacity: number | null; sold: number | null;
  name?: string; venue?: string; managed?: boolean; edited?: boolean; deleted?: boolean;
  group_periods?: Pick<Key,'centre'|'start'|'end'>[];
  remote_start?: string; remote_end?: string; onsite_start?: string; onsite_end?: string;
};
const slugs: Record<string, string> = {a3p: 'a3p-apr', desp: 'desp-dssp', 'desp-initial': 'desp-dssp'};
const managedTitles: Record<string, string> = {
  aps: 'Agent de prévention et de sécurité', 'a3p-apr': 'Agent de protection physique des personnes',
  'ssiap-1': 'SSIAP 1', 'ssiap-2': 'SSIAP 2', 'ssiap-3': 'SSIAP 3', 'desp-dssp': 'DESP initial',
  'recyclage-ssiap-1': 'Recyclage SSIAP 1', 'remise-a-niveau-ssiap-1': 'Remise à niveau SSIAP 1',
};
const courses = new Set(['aps','a3p-apr','ssiap-1','ssiap-2','ssiap-3','desp-dssp','desp-vae','vtc','recyclage-ssiap-1','remise-a-niveau-ssiap-1']);
function slug(value: string) { return slugs[value] ?? value; }
function iso(value: Date | string | null) {
  if (!value) return '';
  return (value instanceof Date ? value.toISOString() : value).slice(0,10);
}
function day(value?: string) { return value ? new Date(value + 'T00:00:00.000Z') : null; }
function centre(session: {location?: string}) {
  if (sessionMatchesLocation(session, 'paris')) return 'paris';
  if (sessionMatchesLocation(session, 'cote-azur')) return 'puget';
  return '';
}
function score(key: Key, candidate: Key) {
  if (!key.centre || key.centre !== candidate.centre || key.slug !== candidate.slug) return 0;
  const anchors = [!!key.start && (key.start === candidate.start || key.slug === 'ssiap-1' && key.start === candidate.standard_start), key.end === candidate.end && !!key.end,
    !!key.exam && key.exam === candidate.exam];
  return anchors.filter(Boolean).length;
}
function publicLocation(row: CatalogueRow, base?: {location?: string}) {
  const city = row.centre === 'paris' ? 'Paris' : 'Puget-sur-Argens';
  if (row.venue) {
    return centre({location: row.venue}) === row.centre ? row.venue : city + ' · ' + row.venue;
  }
  return base && centre(base) === row.centre ? base.location : row.centre === 'paris' ? city : 'Puget-sur-Argens / Côte d’Azur';
}

function publicTitle(row: CatalogueRow, original: string, variant?: string) {
  if (!row.name || row.group_periods) return original;
  return variant && !new RegExp('\\b' + variant + '\\b', 'i').test(row.name) ? row.name + ' · ' + variant : row.name;
}

function groupPeriod(key: Key, row: CatalogueRow) {
  return key.slug === row.slug && row.group_periods?.some(group => key.centre === group.centre &&
    key.start >= group.start && key.end <= group.end);
}

function capacityAndSales(base: any, row?: CatalogueRow) {
  const seatsTotal = row?.capacity ?? resolveSessionSeatCapacity(base);
  const seatsLeft = row?.sold != null ? Math.max(0, seatsTotal - row.sold) : null;
  return { seatsTotal, seatsLeft, showSeatsLeft: seatsLeft !== null };
}

export function mergeManagedSessions(stored: any[], trainings: any[], catalogue: CatalogueRow[] | null) {
  if (catalogue === null) {
    // On a cold start, the CMS may still contain a withdrawn or private cohort.
    return stored.filter(session => !Object.hasOwn(managedTitles, slug(session.training?.slug)));
  }
  const used = new Set<string>();
  const previouslyPublished = new Set<string>();
  const existingFormulas = new Map<string, Set<string>>();
  const combined = [];
  for (const base of stored) {
    const code = slug(base.training?.slug);
    if (!courses.has(code)) { combined.push(base); continue; }
    const key = {slug: code, centre: centre(base), start: iso(base.startDate), end: iso(base.endDate), exam: iso(base.examDate)};
    const direct = catalogue.filter(row => base.id === row.id || row.slug === 'ssiap-1' && base.id === row.id + '-sans-sst');
    const matches = direct.length ? direct : catalogue.filter(row =>
      [row, ...row.aliases].some(alias => score(key, alias) >= 2) || groupPeriod(key, row));
    const authoritative = matches.filter(row => row.managed);
    let hits = authoritative.length ? authoritative : matches;
    if (!direct.length && hits.length > 1 && hits.some(row => row.managed || row.deleted)) {
      // A stored CMS ID and its enrolment link belong to the old group. When the dates
      // have been reused, expose the currently published groups under their own IDs.
      const active = hits.filter(row => !row.deleted && row.visibility === 'public');
      if (active.length) continue;
      const current = hits.filter(row => !row.deleted && score(key, row) >= 2);
      if (current.length) hits = current;
    }
    if (hits.length === 1 && hits[0].slug !== code) {
      if (base.status !== 'HIDDEN' && hits[0].visibility === 'match') previouslyPublished.add(hits[0].id);
      continue;
    }
    for (const row of hits) used.add(row.id);
    if (hits.some(row => row.visibility === 'internal' || row.visibility === 'closed')) continue;
    if (hits.length !== 1) {
      combined.push({...base, status: base.status === 'FULL' ? 'OPEN' : base.status, ...capacityAndSales(base)});
      continue;
    }
    const row = hits[0];
    if (row.visibility === 'public' && code === 'ssiap-1' && row.standard_start) {
      const formula = /\b(avec|sans) SST\b/i.exec(base.title || '')?.[1]?.toLowerCase();
      const found = existingFormulas.get(row.id) ?? new Set<string>();
      if (formula) found.add(formula);
      else { found.add('avec'); found.add('sans'); }
      existingFormulas.set(row.id, found);
    }
    if (base.status === 'HIDDEN') continue;
    const sales = capacityAndSales(base, row);
    const status = sales.seatsLeft === null ? (base.status === 'FULL' ? 'OPEN' : base.status)
      : sales.seatsLeft === 0 ? 'FULL' : 'OPEN';
    if (row.visibility === 'match' && !row.edited) {
      combined.push({...base, ...sales, status});
      continue;
    }
    const alias = [row, ...row.aliases].filter(a => score(key, a) >= 2).sort((a,b) =>
      score(key,b) - score(key,a) || Math.abs(+day(key.start)! - +day(a.start)!) - Math.abs(+day(key.start)! - +day(b.start)!))[0] ?? row;
    const move = (value: string, from: string, to: string) => {
      if (!value || !from || !to) return day(to);
      return new Date(+day(to)! + (+day(value)! - +day(from)!));
    };
    const variant = code === 'ssiap-1' && /\b(?:avec|sans) SST\b/i.test(base.title || '');
    const withoutSst = variant && /\bsans SST\b/i.test(base.title || '');
    const startDate = variant && row.standard_start ? day(withoutSst ? row.standard_start : row.start)
      : variant ? move(key.start, alias.start, row.start) : day(row.start);
    const endDate = variant ? move(key.end, alias.end, row.end) : day(row.end);
    const moved = iso(startDate) !== key.start || iso(endDate) !== key.end;
    const preservePeriods = !moved && !row.edited;
    const variantName = variant ? (withoutSst ? 'sans SST' : 'avec SST') : undefined;
    combined.push({...base, title: publicTitle(row, base.title, variantName), startDate, endDate, examDate: day(row.exam),
      location: publicLocation(row, base),
      remoteStartDate: day(row.remote_start) ?? (preservePeriods ? base.remoteStartDate : null),
      remoteEndDate: day(row.remote_end) ?? (preservePeriods ? base.remoteEndDate : null),
      inPersonStartDate: withoutSst && row.standard_start && row.onsite_start ? startDate
        : day(row.onsite_start) ?? (preservePeriods ? base.inPersonStartDate : null),
      inPersonEndDate: day(row.onsite_end) ?? (preservePeriods ? base.inPersonEndDate : null),
      inPersonFirstEndDate: moved ? null : base.inPersonFirstEndDate,
      inPersonResumeDate: moved ? null : base.inPersonResumeDate, ...sales, status});
  }
  for (const row of catalogue) {
    const covered = existingFormulas.get(row.id);
    if ((row.visibility !== 'public' && !previouslyPublished.has(row.id)) || !courses.has(row.slug) || (used.has(row.id) && covered?.size !== 1)) continue;
    const existing = trainings.find(t => slug(t.slug) === row.slug);
    if (existing && !existing.isActive) continue;
    const name = managedTitles[row.slug];
    if (!name && !existing) continue;
    const training = existing ?? {id: row.slug, slug: row.slug, name, title: name, isActive: true,
      category: 'securite', pageUrl: '/formations-securite/' + (row.slug === 'desp-dssp' ? 'desp-initial' : row.group_periods ? 'recyclage-remise-a-niveau-ssiap' : row.slug)};
    const template = stored.filter(s => slug(s.training?.slug) === row.slug && iso(s.startDate).slice(0,4) === row.start.slice(0,4))
      .sort((a,b) => Math.abs(+new Date(a.startDate) - +day(row.start)!) - Math.abs(+new Date(b.startDate) - +day(row.start)!))[0];
    const sales = capacityAndSales({training}, row);
    const session = {id: row.id, training, trainingId: training.id, title: publicTitle(row, training.name || training.title),
      startDate: day(row.start), endDate: day(row.end), examDate: day(row.exam),
      remoteStartDate: day(row.remote_start), remoteEndDate: day(row.remote_end),
      inPersonStartDate: day(row.onsite_start), inPersonEndDate: day(row.onsite_end),
      location: publicLocation(row),
      priceCents: template?.priceCents ?? null, priceLabel: template?.priceLabel ?? '', durationLabel: template?.durationLabel ?? '',
      fundingNotes: template?.fundingNotes ?? '', registrationUrl: template?.registrationUrl || training.pageUrl,
      publicNotes: '', isHighlighted: false, status: sales.seatsLeft === 0 ? 'FULL' : 'OPEN', ...sales};
    if (row.slug === 'ssiap-1' && row.standard_start) {
      const priceFor = (formula: RegExp) => {
        const offer = stored.find(s => slug(s.training?.slug) === row.slug && iso(s.startDate).slice(0,4) === row.start.slice(0,4) && formula.test(s.title || ''));
        return {priceCents: offer?.priceCents ?? null, priceLabel: offer?.priceLabel ?? ''};
      };
      if (!covered?.has('avec')) combined.push({...session, ...priceFor(/\bavec SST\b/i), title: publicTitle(row, 'SSIAP 1 avec SST', 'avec SST')});
      if (!covered?.has('sans')) combined.push({...session, ...priceFor(/\bsans SST\b/i), id: row.id + '-sans-sst', title: publicTitle(row, 'SSIAP 1 sans SST', 'sans SST'),
        startDate: day(row.standard_start), inPersonStartDate: session.inPersonStartDate ? day(row.standard_start) : null});
    } else {
      combined.push(session);
    }
  }
  return combined;
}

const endpoint = 'https://gestionstagiaires-r5no.onrender.com/api/integrations/session-availability';
let snapshot: CatalogueRow[] = [], refreshed = 0, next = 0;
let pending: Promise<void> | undefined;
export async function readManagedSessions(): Promise<CatalogueRow[] | null> {
  const token = process.env.SESSION_CATALOG_TOKEN;
  if (!token) return [];
  if (Date.now() >= next) {
    pending ??= (async () => {
      try {
        const response = await fetch(endpoint, {headers: {Authorization: 'Bearer ' + token}, cache: 'no-store',
          redirect: 'error', signal: AbortSignal.timeout(6000)});
        if (!response.ok) throw new Error('catalogue unavailable');
        const data = await response.json();
        if (data.version !== 1 || !Array.isArray(data.sessions) || !data.sessions.every((r: CatalogueRow) =>
          r && typeof r.id === 'string' && Array.isArray(r.aliases) && Number.isInteger(r.sold) && r.sold! >= 0)) throw new Error('invalid catalogue');
        snapshot = data.sessions; refreshed = Date.now(); next = refreshed + 30_000;
      } catch { next = Date.now() + 10_000; }
    })().finally(() => { pending = undefined; });
    await pending;
  }
  return refreshed && Date.now() - refreshed <= 120_000 ? snapshot : null;
}
