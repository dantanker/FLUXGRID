type FluxNodeLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  className?: string;
};

const sizeClasses = {
  sm: { text: 'text-base', bolt: 'h-[0.85em] w-[0.55em]' },
  md: { text: 'text-lg lg:text-xl', bolt: 'h-[0.9em] w-[0.58em]' },
  lg: { text: 'text-2xl lg:text-3xl', bolt: 'h-[0.9em] w-[0.58em]' },
};

export function FluxNodeLogo({ size = 'md', variant = 'dark', className = '' }: FluxNodeLogoProps) {
  const { text, bolt } = sizeClasses[size];
  const fluxColor = variant === 'dark' ? 'text-white' : 'text-[#001A3F]';
  const nodeColor = 'text-[#F59E0B]';

  return (
    <span className={`inline-flex items-baseline font-sans tracking-tight ${text} ${className}`} aria-label="FluxNode">
      <span className={`font-bold ${fluxColor}`}>F</span>
      <svg
        className={`${bolt} mx-[0.05em] inline-block self-center translate-y-[0.04em]`}
        viewBox="0 0 24 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M14 2L4 16h7l-2 14 12-18h-7l2-10z"
          fill="#F59E0B"
        />
      </svg>
      <span className={`font-bold ${fluxColor}`}>ux</span>
      <span className={`font-light ${nodeColor}`}>Node</span>
    </span>
  );
}
