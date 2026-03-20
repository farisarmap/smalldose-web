export function OrbitalRings({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none text-[#c9973a] ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="200" cy="200" r="175" stroke="currentColor" strokeWidth="0.6" opacity="0.12" />
      <circle cx="200" cy="200" r="135" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
      <circle cx="200" cy="200" r="95" stroke="currentColor" strokeWidth="0.4" opacity="0.08" />
      <ellipse
        cx="200"
        cy="200"
        rx="175"
        ry="95"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity="0.06"
        transform="rotate(-18 200 200)"
      />
    </svg>
  );
}
