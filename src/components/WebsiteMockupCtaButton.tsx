import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useDemoModal } from '../context/DemoModalContext';

type WebsiteMockupCtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function WebsiteMockupCtaButton({
  children,
  className,
  onClick,
  type = 'button',
  ...props
}: WebsiteMockupCtaButtonProps) {
  const { openWebsiteMockupModal } = useDemoModal();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    openWebsiteMockupModal();
    onClick?.(event);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={['cta-btn', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
