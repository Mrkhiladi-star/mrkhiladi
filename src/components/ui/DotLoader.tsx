import React from 'react';
import { motion, Transition } from 'framer-motion';
const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2
    }
  },
  end: {
    transition: {
      staggerChildren: 0.2
    }
  }
};
const loadingCircleTransition: Transition = {
  duration: 0.8,
  repeat: Infinity,
  ease: [0.42, 0, 0.58, 1], 
};
const loadingCircleVariants = {
  start: {
    y: "0%"
  },
  end: {
    y: "100%",
    transition: loadingCircleTransition 
  }
};
const colors = ["#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"]; 
export const DotLoader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <motion.div
        className="flex space-x-2"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        {colors.map((color, index) => (
          <motion.span
            key={index}
            className="block w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
            variants={loadingCircleVariants}
            transition={{ 
                ...loadingCircleTransition, 
                repeatDelay: 0.1 * (colors.length - 1 - index) 
            }} 
          />
        ))}
      </motion.div>
    </div>
  );
};