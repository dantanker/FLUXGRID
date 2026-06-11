type FluxGridLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light';
  className?: string;
};

const sizes = {
  sm: { icon: 18, text: '1.0625rem', gap: 8 },
  md: { icon: 22, text: '1.25rem', gap: 10 },
  lg: { icon: 26, text: '1.5rem', gap: 12 },
};

function BoltMark({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M13.2 2L6 13h4.2L9.8 22 18 11h-4.2L13.2 2z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FluxGridLogo({
  size = 'md',
  variant = 'default',
  className = '',
}: FluxGridLogoProps) {
  const s = sizes[size];

  return (
    <span
      className={`fluxgrid-wordmark fluxgrid-wordmark--${variant} ${className}`.trim()}
      style={{ gap: s.gap, fontSize: s.text }}
      aria-label="FluxGrid"
    >
      <BoltMark size={s.icon} className="fluxgrid-wordmark__icon" />
      <span className="fluxgrid-wordmark__text">
        <span className="fluxgrid-wordmark__flux">Flux</span>
        <span className="fluxgrid-wordmark__grid">Grid</span>
      </span>
    </span>
  );
}
