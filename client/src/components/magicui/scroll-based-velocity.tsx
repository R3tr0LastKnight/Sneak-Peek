// "use client";

// import { cn } from "./lib/utils.ts";
// import { wrap } from "@motionone/utils";
// import {
//   motion,
//   useAnimationFrame,
//   useMotionValue,
//   useScroll,
//   useSpring,
//   useTransform,
//   useVelocity,
// } from "framer-motion";
// import React, { useEffect, useRef, useState } from "react";

// interface VelocityScrollProps {
//   text: string;
//   default_velocity?: number;
//   className?: string;
// }

// interface ParallaxProps {
//   children: string;
//   baseVelocity: number;
//   className?: string;
// }

// export function VelocityScroll({
//   text,
//   default_velocity = 5,
//   className,
// }: VelocityScrollProps) {
//   function ParallaxText({
//     children,
//     baseVelocity = 100,
//     className,
//   }: ParallaxProps) {
//     const baseX = useMotionValue(0);
//     const { scrollY } = useScroll();
//     const scrollVelocity = useVelocity(scrollY);
//     const smoothVelocity = useSpring(scrollVelocity, {
//       damping: 50,
//       stiffness: 400,
//     });

//     const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
//       clamp: false,
//     });

//     const [repetitions, setRepetitions] = useState(1);
//     const containerRef = useRef<HTMLDivElement>(null);
//     const textRef = useRef<HTMLSpanElement>(null);

//     useEffect(() => {
//       const calculateRepetitions = () => {
//         if (containerRef.current && textRef.current) {
//           const containerWidth = containerRef.current.offsetWidth;
//           const textWidth = textRef.current.offsetWidth;
//           const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
//           setRepetitions(newRepetitions);
//         }
//       };

//       calculateRepetitions();

//       window.addEventListener("resize", calculateRepetitions);
//       return () => window.removeEventListener("resize", calculateRepetitions);
//     }, [children]);

//     const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

//     const directionFactor = React.useRef<number>(1);
//     useAnimationFrame((t, delta) => {
//       let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

//       if (velocityFactor.get() < 0) {
//         directionFactor.current = -1;
//       } else if (velocityFactor.get() > 0) {
//         directionFactor.current = 1;
//       }

//       moveBy += directionFactor.current * moveBy * velocityFactor.get();

//       baseX.set(baseX.get() + moveBy);
//     });

//     return (
//       <div
//         className="w-full overflow-hidden whitespace-nowrap"
//         ref={containerRef}
//       >
//         <motion.div className={cn("inline-block", className)} style={{ x }}>
//           {Array.from({ length: repetitions }).map((_, i) => (
//             <span key={i} ref={i === 0 ? textRef : null}>
//               {children}{" "}
//             </span>
//           ))}
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <section className="relative w-full">
//       <ParallaxText baseVelocity={default_velocity} className={className}>
//         {text}
//       </ParallaxText>
//       <ParallaxText baseVelocity={-default_velocity} className={className}>
//         {text}
//       </ParallaxText>
//     </section>
//   );
// }
"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "./lib/utils.ts";

interface VelocityScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultVelocity?: number;
  className?: string;
  numRows?: number;
}

interface ParallaxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  baseVelocity: number;
}

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({
  children,
  baseVelocity = 100,
  ...props
}: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const calculateRepetitions = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const textWidth = textRef.current.offsetWidth;

        if (textWidth === 0) return; // Avoid division by 0

        const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
        setRepetitions(newRepetitions);
      }
    };

    calculateRepetitions();

    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [children]);

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

  const directionFactor = React.useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden whitespace-nowrap text-black  "
      {...props}
    >
      <motion.div className="inline-block" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span key={i} ref={i === 0 ? textRef : null}>
            {children}{" "}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function VelocityScroll({
  defaultVelocity = 5,
  numRows = 2,
  children,
  className,
  ...props
}: VelocityScrollProps) {
  return (
    <div
      className={cn(
        "relative w-full text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]",
        className
      )}
      {...props}
    >
      {Array.from({ length: numRows }).map((_, i) => (
        <ParallaxText
          key={i}
          baseVelocity={defaultVelocity * (i % 2 === 0 ? 1 : -1)}
        >
          {children}
        </ParallaxText>
      ))}
    </div>
  );
}
