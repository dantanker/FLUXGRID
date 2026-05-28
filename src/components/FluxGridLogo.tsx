type FluxGridLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  className?: string;
};

const sizeClasses = {
  sm: { text: 'text-[22px]', bolt: 'h-[0.92em] w-[0.38em]' },
  md: { text: 'text-[26px]', bolt: 'h-[0.95em] w-[0.4em]' },
  lg: { text: 'text-[32px]', bolt: 'h-[0.95em] w-[0.4em]' },
};

export function FluxGridLogo({ size = 'md', variant = 'dark', className = '' }: FluxGridLogoProps) {
  const { text, bolt } = sizeClasses[size];
  const fluxColor = variant === 'dark' ? 'text-white' : 'text-[#001F3F]';
  const accentColor = '#FF9500';

  return (
    <span
      className={`fluxgrid-logo inline-flex items-baseline font-sans font-extrabold tracking-[-0.02em] leading-none ${text} ${className}`}
      aria-label="FluxGrid"
    >
      <span className={fluxColor}>F</span>
      <svg
        className={`${bolt} mx-[0.04em] inline-block shrink-0 self-center translate-y-[0.02em]`}
        viewBox="0 0 18 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M14 2L2 22h6.5L6 38l12-22h-6.5L14 2z" fill={accentColor} />
      </svg>
      <span className={fluxColor}>ux</span>
      <span style={{ color: accentColor }}>Grid</span>
    </span>
  );
}
