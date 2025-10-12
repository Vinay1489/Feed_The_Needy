// src/components/PageTransition.jsx
import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.995 },
};

const pageTransition = {
  duration: 0.45,
  ease: [0.25, 0.1, 0.25, 1],
};

export default function PageTransition({ children, className = "", ...props }) {
  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      {...props}
    >
      {children}
    </motion.div>
  );
}
