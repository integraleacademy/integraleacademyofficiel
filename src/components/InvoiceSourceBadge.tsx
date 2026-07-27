export type InvoiceSource = 'qonto' | 'external';

type InvoiceSourceBadgeProps = {
  source: InvoiceSource;
  className?: string;
};

const sourceStyles: Record<InvoiceSource, { label: string; className: string }> = {
  qonto: {
    label: 'QONTO',
    className: 'bg-black text-white ring-black',
  },
  external: {
    label: 'Générée ailleurs',
    className: 'bg-violet-100 text-violet-700 ring-violet-200',
  },
};

/** Identifies where an invoice displayed in the “Facturé” card was created. */
export function InvoiceSourceBadge({ source, className = '' }: InvoiceSourceBadgeProps) {
  const badge = sourceStyles[source];

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-black leading-none ring-1 ring-inset ${badge.className} ${className}`}
    >
      {badge.label}
    </span>
  );
}
