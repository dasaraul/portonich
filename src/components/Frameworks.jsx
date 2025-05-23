import React, { memo } from "react";
import { OrbitingCircles } from "./OrbitingCircles";

const Icon = memo(({ src, alt }) => (
  <img 
    src={src} 
    alt={alt}
    className="duration-200 rounded-sm hover:scale-110" 
    loading="lazy"
    decoding="async"
  />
));

Icon.displayName = 'Icon';

export const Frameworks = memo(() => {
  const skills = [
    "cplusplus",
    "laravel", 
    "php",
    "dart",
    "flutter",
    "bootstrap",
    "css3",
    "html5",
    "javascript",
    "mysql",
    "git",
    "sass",
    "midtrans",
    "assembly",
    "gamedev",
    "linux",
  ];

  // Split skills for better performance
  const primarySkills = skills.slice(0, 8);
  const secondarySkills = skills.slice(8);

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40} speed={0.5}>
        {primarySkills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} alt={skill} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={1}>
        {secondarySkills.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} alt={skill} />
        ))}
      </OrbitingCircles>
    </div>
  );
});

Frameworks.displayName = 'Frameworks';