import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
  });

  React.useEffect(() => {
    const media = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
}

export const ContainerScroll = ({
  titleComponent,
  actionComponent,
  footerComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  actionComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="hero-scroll-container-mobile">
        <div className="hero-scroll-mobile-copy">{titleComponent}</div>
        <div className="hero-scroll-mobile-card">
          <div className="hero-scroll-mobile-card-inner">{children}</div>
        </div>
        {actionComponent && <div className="hero-scroll-mobile-action">{actionComponent}</div>}
        {footerComponent && <div className="hero-scroll-mobile-footer">{footerComponent}</div>}
      </div>
    );
  }

  return <DesktopContainerScroll titleComponent={titleComponent} actionComponent={actionComponent} footerComponent={footerComponent}>{children}</DesktopContainerScroll>;
};

function DesktopContainerScroll({
  titleComponent,
  actionComponent,
  footerComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  actionComponent?: React.ReactNode;
  footerComponent?: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="hero-scroll-container h-[54rem] flex items-center justify-center relative p-8"
      ref={containerRef}
    >
      <div
        className="relative w-full pt-14 pb-16 md:pt-16 md:pb-20"
        style={{
          perspective: '1000px',
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        {actionComponent && (
          <ActionLayer translate={translate}>{actionComponent}</ActionLayer>
        )}
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
        {footerComponent && (
          <div className="relative z-20 mt-16 w-full pointer-events-none">
            <div className="pointer-events-auto w-full">{footerComponent}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="relative z-30 mx-auto mb-2 max-w-5xl px-4 text-center md:mb-3"
    >
      {titleComponent}
    </motion.div>
  );
};

export const ActionLayer = ({
  translate,
  children,
}: {
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="relative z-50 mt-5 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto">{children}</div>
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformOrigin: 'top center',
      }}
      className="hero-scroll-card relative z-10 mx-auto -mt-1 min-h-[36rem] h-auto w-full max-w-[68rem] overflow-visible bg-transparent px-3 py-0 shadow-none sm:min-h-[38rem] sm:px-4"
    >
      <div className="h-full w-full overflow-visible">{children}</div>
    </motion.div>
  );
};
