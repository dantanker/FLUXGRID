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

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="hero-scroll-container h-[54rem] flex items-center justify-center relative p-8"
      ref={containerRef}
    >
      <div
        className="py-20 w-full relative"
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
      className="max-w-5xl mx-auto text-center"
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
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="hero-scroll-card relative z-10 -mt-8 max-w-5xl mx-auto h-[34rem] w-full border-4 border-[#6C6C6C] p-5 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-zinc-950">
        {children}
      </div>
    </motion.div>
  );
};
