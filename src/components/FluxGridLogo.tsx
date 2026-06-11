import logoDefault from '../assets/fluxgrid-logo.png';
import logoLight from '../assets/fluxgrid-logo-light.png';

type FluxGridLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light';
  className?: string;
};

const heights = {
  sm: 28,
  md: 36,
  lg: 44,
};

export function FluxGridLogo({
  size = 'md',
  variant = 'default',
  className = '',
}: FluxGridLogoProps) {
  const src = variant === 'light' ? logoLight : logoDefault;

  return (
    <img
      src={src}
      alt="FluxGrid"
      className={`fluxgrid-logo fluxgrid-logo--${size} ${className}`.trim()}
      height={heights[size]}
      decoding="async"
    />
  );
}
