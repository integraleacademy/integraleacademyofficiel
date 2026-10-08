/* Render public page components without a browser, network calls or production data. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const ts = require('typescript');
const root = process.cwd(), cache = new Map();
let currentRoute = '/';
const element = (type, props) => ({ type, props });
const react = { createElement: (type, props, ...children) => element(type, { ...props, ...(children.length ? { children: children.length === 1 ? children[0] : children } : {}) }), Fragment: 'fragment', useState: value => [typeof value === 'function' ? value() : value, () => {}], useEffect: () => {}, useLayoutEffect: () => {}, useMemo: fn => fn(), useCallback: fn => fn, useRef: current => ({ current }), useId: () => 'audit-id', cache: fn => fn, Suspense: ({ children }) => children, memo: fn => fn, forwardRef: fn => fn, useTransition: () => [false, () => {}] };
react.default = react;
const mocks = {
  react,
  'react/jsx-runtime': { jsx: element, jsxs: element, Fragment: 'fragment' },
  'next/link': props => element('a', props),
  'next/image': props => element('img', props),
  'next/navigation': { usePathname: () => currentRoute, useSearchParams: () => new URLSearchParams(), useRouter: () => ({}), notFound: () => { throw new Error('NOT_FOUND'); }, redirect: () => { throw new Error('REDIRECT'); } },
  'next/headers': { cookies: async () => ({ get: () => undefined }), headers: async () => ({ get: () => undefined }) },
  'server-only': {},
  gsap: { gsap: { registerPlugin: () => {} } },
  'gsap/ScrollTrigger': { ScrollTrigger: {} },
  'src/lib/training-data.ts': { listSessions: async () => [], listTrainings: async () => [] },
  'src/lib/aps-gallery-data.ts': { listApsPhotos: async () => ({ photos: [] }) },
};
function resolve(spec, from) {
  if (!spec.startsWith('.') && !spec.startsWith('@/')) return spec;
  const base = spec.startsWith('@/') ? 'src/' + spec.slice(2) : path.posix.normalize(path.posix.join(path.posix.dirname(from), spec));
  return [base, base + '.ts', base + '.tsx', base + '/index.tsx', base + '/index.ts'].find(file => fs.existsSync(path.join(root, file))) || base;
}
function load(name) {
  if (mocks[name]) return mocks[name];
  if (name.endsWith('.css')) return { __esModule: true, default: new Proxy({}, { get: (_, key) => String(key) }) };
  if (name.endsWith('.json')) return JSON.parse(fs.readFileSync(name, 'utf8'));
  if (cache.has(name)) return cache.get(name).exports;
  if (!name.startsWith('src/')) return require(name);
  const module = { exports: {} }; cache.set(name, module);
  try {
    const source = fs.readFileSync(name, 'utf8');
    const result = ts.transpileModule(source, { fileName: name, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
    new Function('require', 'module', 'exports', 'React', result.outputText)(spec => load(resolve(spec, name)), module, module.exports, react);
  } catch (error) { cache.delete(name); throw error; }
  return module.exports;
}
async function walk(node, images, trail = []) {
  if (node == null || typeof node === 'boolean') return;
  if (node instanceof Promise) return walk(await node, images, trail);
  if (Array.isArray(node)) { for (const child of node) await walk(child, images, trail); return; }
  if (typeof node !== 'object') return;
  if (typeof node.type === 'function') return walk(await node.type(node.props), images, [...trail, node.type.name]);
  const p = node.props || {};
  if ((node.type === 'img' || node.type === 'object') && (p.src || p.data)) images.push({ src: p.src || p.data, alt: p.alt || p['aria-label'] || '', trail: trail.join(' > ') });
  await walk(p.children, images, trail);
}
function filesIn(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? filesIn(path.join(dir, item.name)) : [path.join(dir, item.name)]); }
(async () => {
  const routes = filesIn('src/app').filter(file => file.endsWith('/page.tsx') && !file.includes('[') && !file.includes('/admin/')).map(file => ({ url: file.replace('src/app', '').replace('/page.tsx', '') || '/', file }));
  for (const slug of ['aps', 'a3p-apr', 'ssiap-1', 'sst', 'desp']) routes.push({ url: '/formations-securite/' + slug, file: 'src/app/formations-securite/[slug]/page.tsx', slug });
  for (const slug of ['mos', 'mco', 'ndrc', 'commerce-international', 'professions-immobilieres', 'comptabilite-gestion']) routes.push({ url: '/bts/' + slug, file: 'src/app/bts/[slug]/page.tsx', slug });
  const report = { routes: [], errors: [], duplicates: [], missingImages: [] };
  for (const route of routes) {
    currentRoute = route.url; const images = [];
    try { await walk(element(load(route.file).default, { params: Promise.resolve({ slug: route.slug }), searchParams: Promise.resolve({}) }), images); report.routes.push({ ...route, images }); }
    catch (error) { if (!['REDIRECT', 'NOT_FOUND'].includes(error.message)) report.errors.push({ url: route.url, error: error.message, stack: error.stack.split('\n').slice(0,5) }); }
  }
  const groups = new Map();
  for (const route of report.routes) for (const image of route.images) {
    if (!image.src.startsWith('/images/')) continue;
    const file = path.join('public', image.src);
    if (!fs.existsSync(file)) { report.missingImages.push({ route: route.url, ...image }); continue; }
    const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
    if (!groups.has(hash)) groups.set(hash, []);
    groups.get(hash).push({ route: route.url, ...image });
  }
  report.duplicates = [...groups.values()].filter(group => group.length > 1);
  fs.mkdirSync('artifacts', { recursive: true });
  fs.writeFileSync('artifacts/visual-inventory.json', JSON.stringify(report, null, 2));
  console.log('VISUAL_INVENTORY_START');
  console.log(JSON.stringify(report));
  console.log('VISUAL_INVENTORY_END');
  if (report.errors.length || report.missingImages.length) process.exitCode = 1;
})();
