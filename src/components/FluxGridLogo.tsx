import fluxgridLogo from '../assets/fluxgrid-logo.png';

type FluxGridLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  className?: string;
};

const sizeHeights = {
  sm: 36,
  md: 48,
  lg: 56,
};

export function FluxGridLogo({ size = 'md', className = '' }: FluxGridLogoProps) {
  const height = sizeHeights[size];

  return (
    <img
      src={fluxgridLogo}
      alt="FluxGrid"
      className={`fluxgrid-logo ${className}`}
      style={{ height, width: 'auto' }}
    />
  );
}
