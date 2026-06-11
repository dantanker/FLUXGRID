import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
};

type MotionElement = 'div' | 'ol' | 'ul' | 'li' | 'section';

const ease = [0.22, 1, 0.36, 1] as const;

function getOffset(direction: RevealProps['direction']) {
  switch (direction) {
    case 'left':
      return { x: -24, y: 0 };
    case 'right':
      return { x: 24, y: 0 };
    default:
      return { x: 0, y: 22 };
  }
}

function motionTag(tag: MotionElement) {
  return motion[tag] as ElementType;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = getOffset(direction);

  const variants: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.65, delay, ease },
        },
      };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -60px 0px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  className,
  stagger = 0.08,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: MotionElement;
}) {
  const reduceMotion = useReducedMotion();
  const MotionComponent = motionTag(as);

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={
        reduceMotion
          ? {}
          : {
              hidden: {},
              visible: {
                transition: { staggerChildren: stagger, delayChildren: 0.05 },
              },
            }
      }
    >
      {children}
    </MotionComponent>
  );
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: MotionElement;
}) {
  const reduceMotion = useReducedMotion();
  const MotionComponent = motionTag(as);

  return (
    <MotionComponent
      className={className}
      variants={
        reduceMotion
          ? {}
          : {
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease },
              },
            }
      }
    >
      {children}
    </MotionComponent>
  );
}
