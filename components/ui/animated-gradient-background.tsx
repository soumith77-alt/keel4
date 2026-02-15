"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface AnimatedGradientBackgroundProps {
  /**
   * Initial size of the radial gradient, defining the starting width.
   * @default 125
   */
  startingGap?: number;

  /**
   * Enables or disables the breathing animation effect.
   * @default false
   */
  Breathing?: boolean;

  /**
   * Array of colors to use in the radial gradient.
   * @default ["#0A0A0A", "#2979FF", "#FF80AB", "#FF6D00", "#FFD600", "#00E676", "#3D5AFE"]
   */
  gradientColors?: string[];

  /**
   * Array of percentage stops corresponding to each color in `gradientColors`.
   * @default [35, 50, 60, 70, 80, 90, 100]
   */
  gradientStops?: number[];

  /**
   * Speed of the breathing animation.
   * @default 0.02
   */
  animationSpeed?: number;

  /**
   * Maximum range for the breathing animation in percentage points.
   * @default 5
   */
  breathingRange?: number;

  /**
   * Additional inline styles for the gradient container.
   */
  containerStyle?: React.CSSProperties;

  /**
   * Additional class names for the gradient container.
   */
  containerClassName?: string;

  /**
   * Additional top offset for the gradient container.
   * @default 0
   */
  topOffset?: number;
}

const DEFAULT_COLORS = [
  "#0A0A0A",
  "#2979FF",
  "#FF80AB",
  "#FF6D00",
  "#FFD600",
  "#00E676",
  "#3D5AFE",
];
const DEFAULT_STOPS = [35, 50, 60, 70, 80, 90, 100];

/**
 * AnimatedGradientBackground
 *
 * Renders a customizable animated radial gradient background with a subtle breathing effect.
 * Uses framer-motion for entrance animation and requestAnimationFrame for the dynamic background.
 */
const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps> = ({
  startingGap = 125,
  Breathing = false,
  gradientColors = DEFAULT_COLORS,
  gradientStops = DEFAULT_STOPS,
  animationSpeed = 0.02,
  breathingRange = 5,
  containerStyle = {},
  topOffset = 0,
  containerClassName = "",
}) => {
  if (gradientColors.length !== gradientStops.length) {
    throw new Error(
      `GradientColors and GradientStops must have the same length. Received gradientColors length: ${gradientColors.length}, gradientStops length: ${gradientStops.length}`
    );
  }

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationFrame: number;
    let width = startingGap;
    let directionWidth = 1;

    const animateGradient = () => {
      if (width >= startingGap + breathingRange) directionWidth = -1;
      if (width <= startingGap - breathingRange) directionWidth = 1;
      if (!Breathing) directionWidth = 0;
      width += directionWidth * animationSpeed;

      const gradientStopsString = gradientStops
        .map((stop, index) => `${gradientColors[index]} ${stop}%`)
        .join(", ");
      const gradient = `radial-gradient(${width}% ${width + topOffset}% at 50% 20%, ${gradientStopsString})`;

      if (containerRef.current) {
        containerRef.current.style.background = gradient;
      }
      animationFrame = requestAnimationFrame(animateGradient);
    };

    animationFrame = requestAnimationFrame(animateGradient);
    return () => cancelAnimationFrame(animationFrame);
  }, [
    startingGap,
    Breathing,
    gradientColors,
    gradientStops,
    animationSpeed,
    breathingRange,
    topOffset,
  ]);

  return (
    <motion.div
      key="animated-gradient-background"
      initial={{ opacity: 0, scale: 1.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 2,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }}
      className={`absolute inset-0 overflow-hidden ${containerClassName}`}
    >
      <div
        ref={containerRef}
        style={containerStyle}
        className="absolute inset-0 transition-transform"
      />
    </motion.div>
  );
};

export default AnimatedGradientBackground;
