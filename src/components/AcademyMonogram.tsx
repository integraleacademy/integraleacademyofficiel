import styles from './AcademyMonogram.module.css';

/** Decorative Academy A, traced from the supplied September 2026 brand reference. */
export function AcademyMonogram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 490 565"
      width="490"
      height="565"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`${styles.mark} ${className}`}
    >
      <path
        d="M20 408 203 20H284L470 516Q450 537 404 547L250 176 120 447M159.3 365H328.5"
        stroke="currentColor"
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
