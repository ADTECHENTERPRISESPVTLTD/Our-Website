"use client";

import { Variants, Transition } from "framer-motion";

/**
 * Shared animation configuration for consistent animations across the website.
 * All section components should use these variants.
 */

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1], // ease-in-out
};

export const itemTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

export const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
};

export const scaleUp: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

/**
 * Creates staggered item variants for card grids
 * @param delayPerItem - delay between each item (default: 0.08)
 */
export const createStaggerItem = (delayPerItem: number = 0.08) => {
  return (index: number): Variants => ({
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...itemTransition,
        delay: index * delayPerItem,
      },
    },
  });
};

/**
 * Standard viewport options for consistent scroll-trigger behavior
 */
export const viewportOptions = {
  once: true,
  margin: "-50px",
} as const;

/**
 * Framer Motion `initial` and `whileInView` shorthand for `fadeUp`
 */
export const fadeUpProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportOptions,
  variants: fadeUp,
};

/**
 * Framer Motion `initial` and `whileInView` shorthand for `fadeLeft`
 */
export const fadeLeftProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportOptions,
  variants: fadeLeft,
};

/**
 * Framer Motion `initial` and `whileInView` shorthand for `fadeRight`
 */
export const fadeRightProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportOptions,
  variants: fadeRight,
};

/**
 * Framer Motion `initial` and `whileInView` shorthand for `scaleUp`
 */
export const scaleUpProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportOptions,
  variants: scaleUp,
};

// ═══════════════════════════════════════════════════════════════════════
// Premium transitions (v2) — cinematic blur + drift entrance
// ═══════════════════════════════════════════════════════════════════════

export const premiumTransition: Transition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1], // easeOutQuint feel
};

export const premiumFadeUp: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.98, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: premiumTransition,
  },
};

export const premiumFadeLeft: Variants = {
  hidden: { opacity: 0, x: -56, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: premiumTransition,
  },
};

export const premiumFadeRight: Variants = {
  hidden: { opacity: 0, x: 56, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: premiumTransition,
  },
};

export const premiumScaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.86, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: premiumTransition,
  },
};

export const premiumFadeUpProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportOptions,
  variants: premiumFadeUp,
};

export const premiumFadeLeftProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportOptions,
  variants: premiumFadeLeft,
};

export const premiumFadeRightProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportOptions,
  variants: premiumFadeRight,
};

export const premiumScaleUpProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportOptions,
  variants: premiumScaleUp,
};

