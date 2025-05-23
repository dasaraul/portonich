import React, { memo } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const ParallaxBackground = memo(() => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { damping: 50, mass: 0.5 });
  
  const mountain3Y = useTransform(x, [0, 0.3], ["0%", "50%"]);
  const planetsX = useTransform(x, [0, 0.3], ["0%", "-15%"]);
  const mountain2Y = useTransform(x, [0, 0.3], ["0%", "20%"]);
  const mountain1Y = useTransform(x, [0, 0.3], ["0%", "0%"]);

  return (
    <section className="absolute inset-0 bg-black/40">
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 w-full h-screen -z-50"
          style={{
            backgroundImage: "url(/assets/sky.webp), url(/assets/sky.jpg)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            willChange: "transform",
          }}
        />
        
        <motion.div
          className="absolute inset-0 -z-40"
          style={{
            backgroundImage: "url(/assets/mountain-3.webp), url(/assets/mountain-3.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain3Y,
            willChange: "transform",
          }}
        />
        
        <motion.div
          className="absolute inset-0 -z-30"
          style={{
            backgroundImage: "url(/assets/planets.webp), url(/assets/planets.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            x: planetsX,
            willChange: "transform",
          }}
        />
        
        <motion.div
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: "url(/assets/mountain-2.webp), url(/assets/mountain-2.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain2Y,
            willChange: "transform",
          }}
        />
        
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url(/assets/mountain-1.webp), url(/assets/mountain-1.png)",
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: mountain1Y,
            willChange: "transform",
          }}
        />
      </div>
    </section>
  );
});

ParallaxBackground.displayName = 'ParallaxBackground';

export default ParallaxBackground;
