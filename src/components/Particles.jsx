import { twMerge } from "tailwind-merge";
import React, { useEffect, useRef, useState, useMemo } from "react";

function MousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId;
    const handleMouseMove = (event) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: event.clientX, y: event.clientY });
        rafId = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return mousePosition;
}

export const Particles = ({
  className = "",
  quantity = 50, // Reduced from 100
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);
  const mousePosition = MousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef(null);

  // Memoize RGB conversion
  const rgb = useMemo(() => {
    const hex = color.replace("#", "");
    const hexInt = parseInt(hex.length === 3 ? 
      hex.split("").map(char => char + char).join("") : hex, 16);
    return [(hexInt >> 16) & 255, (hexInt >> 8) & 255, hexInt & 255];
  }, [color]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();

    const handleResize = () => {
      clearTimeout(handleResize.timeout);
      handleResize.timeout = setTimeout(initCanvas, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (rafID.current != null) {
        cancelAnimationFrame(rafID.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [color]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const circleParams = () => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const pSize = Math.random() * 1.5 + size;
    const alpha = 0;
    const targetAlpha = Math.random() * 0.4 + 0.1; // Reduced opacity
    const dx = (Math.random() - 0.5) * 0.05; // Reduced movement
    const dy = (Math.random() - 0.5) * 0.05;
    const magnetism = 0.1 + Math.random() * 2;
    
    return {
      x, y, translateX: 0, translateY: 0, size: pSize,
      alpha, targetAlpha, dx, dy, magnetism
    };
  };

  const drawCircle = (circle, update = false) => {
    if (!context.current) return;
    
    const { x, y, translateX, translateY, size, alpha } = circle;
    context.current.translate(translateX, translateY);
    context.current.beginPath();
    context.current.arc(x, y, size, 0, 2 * Math.PI);
    context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
    context.current.fill();
    context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!update) {
      circles.current.push(circle);
    }
  };

  const resizeCanvas = () => {
    if (!canvasContainerRef.current || !canvasRef.current || !context.current) return;

    canvasSize.current.w = canvasContainerRef.current.offsetWidth;
    canvasSize.current.h = canvasContainerRef.current.offsetHeight;

    canvasRef.current.width = canvasSize.current.w * dpr;
    canvasRef.current.height = canvasSize.current.h * dpr;
    canvasRef.current.style.width = `${canvasSize.current.w}px`;
    canvasRef.current.style.height = `${canvasSize.current.h}px`;
    context.current.scale(dpr, dpr);

    circles.current = [];
    for (let i = 0; i < quantity; i++) {
      drawCircle(circleParams());
    }
  };

  const drawParticles = () => {
    if (!context.current) return;
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    
    for (let i = 0; i < quantity; i++) {
      drawCircle(circleParams());
    }
  };

  const animate = () => {
    if (!context.current) return;
    
    context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    
    circles.current.forEach((circle, i) => {
      // Simplified physics
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      // Simplified edge detection
      const edge = Math.min(
        circle.x + circle.translateX,
        canvasSize.current.w - circle.x - circle.translateX,
        circle.y + circle.translateY,
        canvasSize.current.h - circle.y - circle.translateY
      );

      if (edge > 10) {
        circle.alpha = Math.min(circle.alpha + 0.02, circle.targetAlpha);
      } else {
        circle.alpha = circle.targetAlpha * (edge / 10);
      }

      drawCircle(circle, true);

      // Reset particles that go out of bounds
      if (circle.x < -50 || circle.x > canvasSize.current.w + 50 ||
          circle.y < -50 || circle.y > canvasSize.current.h + 50) {
        circles.current[i] = circleParams();
      }
    });

    rafID.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const { w, h } = canvasSize.current;
    const x = mousePosition.x - rect.left - w / 2;
    const y = mousePosition.y - rect.top - h / 2;
    
    if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
      mouse.current.x = x;
      mouse.current.y = y;
    }
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div
      className={twMerge("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};