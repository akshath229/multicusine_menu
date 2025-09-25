"use client";

import {
  MotionValue,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import "./ScrollAnimation.css";

interface ScrollAnimationProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  imageSrc?: string;
  className?: string;
}

export default function ScrollAnimation({
  title = "Playing with masks and Framer Motion.",
  subtitle = "This animation is inspired by the Runway.com homepage. Recreated by frontend.fyi.",
  buttonText = "Early Access",
  imageSrc = "/foodimages/plaindosa.png",
  className = "",
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
  }) as MotionValue<number>;
  const scale = useTransform(scrollYProgressSpring, [0, 1], [1, 12]);
  const imageX = useTransform(scrollYProgressSpring, [0, 1], [50, 0]);
  const imageXCalc = useMotionTemplate`max(0px, calc(${imageX}% + calc(${imageX}vw - 300px)))`;

  return (
    <main className={className}>
      <div ref={ref} className="relative z-10 h-[200vh] overflow-clip">
        <motion.div
          style={{ scale }}
          className="hero-background sticky left-0 top-0 grid h-screen origin-[50%_70%] gap-2 p-2 sm:p-4 md:p-6 pt-8 sm:pt-10 md:pt-12 [grid-template-rows:4fr_1fr] md:origin-[90%_40%] md:pt-20"
        >
          <div className="flex flex-col rounded-3xl p-4 px-6 sm:p-6 sm:px-8 md:p-12 md:px-16 md:flex-row shadow-2xl" style={{ backgroundColor: '#903E10' }}>
            <div className="flex h-full flex-col md:flex-row md:items-center md:justify-between w-full">
              <h1 className="mb-3 sm:mb-5 max-w-[12ch] text-6xl sm:text-6xl md:text-7xl font-bold leading-[0.9] md:leading-[0.95] md:my-auto md:text-[90px] xl:text-[140px] text-white wonderbar-font" style={{ textShadow: '4px 4px 0px rgba(0, 0, 0, 0.8), 8px 8px 0px rgba(0, 0, 0, 0.6), 12px 12px 0px rgba(0, 0, 0, 0.4)' }}>
                Good<br />
                Things .<br />
                Start
                <br />
                With<br />
               Good CHAI <br />
              </h1>
              <div className="flex justify-center md:justify-end mt-4 md:mt-0">
                <img 
                  src="/foodimages/twochai.svg" 
                  alt="Two Chai" 
                  className="max-w-[200px] sm:max-w-[250px] md:max-w-[300px] h-auto rounded-3xl"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  <div className="mt-[-200vh] h-[200vh] overflow-clip pb-20" style={{ backgroundColor: '#F0E5D3' }}>
        <motion.span
          style={{ x: imageXCalc }}
          className="sticky top-1/2 mx-auto block aspect-video w-[1600px]  max-w-[90%] rounded-[60px] bg-gray-300 shadow-2xl md:top-1/4"
        >
          {imageSrc && (
            <img 
              src={imageSrc} 
              alt="Animation content" 
              className="w-full h-full object-cover rounded-[60px]"
            />
          )}
        </motion.span>
      </div>
    </main>
  );
}
