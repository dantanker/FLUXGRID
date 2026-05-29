import fluxgridLogo from '../assets/fluxgrid-logo.png';
import fluxgridLogoDark from '../assets/fluxgrid-logo-dark.png';

type FluxGridLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  className?: string;
};

const sizeHeights = {
  sm: 32,
  md: 40,
  lg: 48,
};

export function FluxGridLogo({ size = 'md', variant = 'dark', className = '' }: FluxGridLogoProps) {
  const height = sizeHeights[size];
  const src = variant === 'dark' ? fluxgridLogoDark : fluxgridLogo;

  return (
    <img
      src={src}
      alt="FluxGrid"
      className={`fluxgrid-logo ${className}`}
      style={{ height, width: 'auto' }}
    />
  );
}
