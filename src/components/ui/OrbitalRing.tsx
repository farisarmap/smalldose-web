interface OrbitalRingProps {
  size?: number;
  durationSec?: number;
  className?: string;
}

/**
 * Brand-style orbital motif: two overlapping ellipses, stroke only.
 */
export function OrbitalRing({ size = 600, durationSec = 30, className = "" }: OrbitalRingProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`about-orbital-spin origin-center pointer-events-none text-[#c9973a] ${className}`}
      style={{ animationDuration: `${durationSec}s` }}
      aria-hidden
    >
      <ellipse cx="300" cy="300" rx="260" ry="140" stroke="currentColor" strokeWidth="1.2" opacity="0.15" />
      <ellipse
        cx="300"
        cy="300"
        rx="260"
        ry="140"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.15"
        transform="rotate(52 300 300)"
      />
    </svg>
  );
}
