// src/components/ui/DotLoader.tsx
import React from 'react';
import { motion, Transition } from 'framer-motion'; // 🛑 Import Transition

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

// 🛑 FIX: Define the type for the transition object
const loadingCircleTransition: Transition = {
  duration: 0.8,
  repeat: Infinity,
  // Use the array form for 'easeInOut'
  ease: [0.42, 0, 0.58, 1], 
};

const loadingCircleVariants = {
  start: {
    y: "0%"
  },
  end: {
    y: "100%",
    // When using the transition object inside variants, you can safely omit the ease here
    // as it is defined in the shared constant.
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
                // 🛑 CRITICAL CHANGE: Use `loadingCircleTransition` and override `repeatDelay`
                repeatDelay: 0.1 * (colors.length - 1 - index) 
            }} 
          />
        ))}
      </motion.div>
    </div>
  );
};