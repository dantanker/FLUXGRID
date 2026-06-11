import { useCallback, useRef, useState } from 'react';

function updateCircuitVars(section: HTMLElement, clientX: number, clientY: number) {
  const rect = section.getBoundingClientRect();
  const nx = (clientX - rect.left) / rect.width - 0.5;
  const ny = (clientY - rect.top) / rect.height - 0.5;

  section.style.setProperty('--circuit-shift-x', `${nx * 6}px`);
  section.style.setProperty('--circuit-shift-y', `${ny * 4}px`);
}

function clearCircuitVars(section: HTMLElement) {
  section.style.removeProperty('--circuit-shift-x');
  section.style.removeProperty('--circuit-shift-y');
}

export function useHeroCursor() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (sectionRef.current) {
      updateCircuitVars(sectionRef.current, event.clientX, event.clientY);
    }
  }, []);

  const onMouseEnter = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setIsHovering(true);
    updateCircuitVars(event.currentTarget, event.clientX, event.clientY);
  }, []);

  const onMouseLeave = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setIsHovering(false);
    clearCircuitVars(event.currentTarget);
  }, []);

  return {
    sectionRef,
    isHovering,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
  };
}
