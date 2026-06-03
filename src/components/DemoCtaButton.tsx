import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useDemoModal } from '../context/DemoModalContext';

type DemoCtaButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function DemoCtaButton({ children, onClick, type = 'button', ...props }: DemoCtaButtonProps) {
  const { openDemoModal } = useDemoModal();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    openDemoModal();
    onClick?.(event);
  };

  return (
    <button type={type} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
