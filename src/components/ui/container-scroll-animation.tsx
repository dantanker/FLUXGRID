import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scaleRange = isMobile ? [0.94, 1] : [1.05, 1];
  const rotateRange = isMobile ? [6, 0] : [20, 0];
  const translateRange = isMobile ? [0, -24] : [0, -100];

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const translate = useTransform(scrollYProgress, [0, 1], translateRange);

  return (
    <div
      className="hero-scroll-container h-[34rem] sm:h-[38rem] md:h-[54rem] flex items-center justify-center relative px-3 py-2 md:p-8"
      ref={containerRef}
    >
      <div
        className="py-4 sm:py-6 md:py-20 w-full relative"
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
          <div className="relative z-20 mt-10 md:mt-16 w-full pointer-events-none">
            <div className="pointer-events-auto w-full">{footerComponent}</div>
          </div>
        )}
      </div>
    </div>
  );
};

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
      className="relative z-50 mt-4 md:mt-5 flex justify-center pointer-events-none px-2"
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
      className="hero-scroll-card relative z-10 -mt-4 md:-mt-8 max-w-5xl mx-auto h-[22rem] sm:h-[26rem] md:h-[34rem] w-full border-2 md:border-4 border-[#6C6C6C] p-2 md:p-5 bg-[#222222] rounded-[20px] md:rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-zinc-950 md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
};
