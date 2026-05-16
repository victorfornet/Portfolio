import type { Variants, Transition } from "framer-motion";

export const easeOut: Transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };
export const easeSpring: Transition = { type: "spring", stiffness: 220, damping: 22 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: easeOut },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: easeOut },
};

export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: easeOut },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: easeOut },
};

export const staggerChildren: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const tilt3DHover = {
  whileHover: { rotateX: -4, rotateY: 4, scale: 1.02 },
  transition: easeSpring,
};
