'use client';
import React, {useRef} from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
export const TracingBeam = ({
    children,
    className,
    cardHeight,
}: {
    children: React.ReactNode;
    className?: string;
    cardHeight: number;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const pathLength = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
        stiffness: 500,
        damping: 90,
    });

    return (
        <motion.div ref={ref} className={cn("relative mx-auto h-full w-full", className)}>
            {/* Left vertical beam + dot */}
            <div className="absolute -left-6 md:-left-20 top-0  hidden md:flex flex-col items-center">
                {/* Dot */}
                <motion.div 
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                    className="h-5 w-5 rounded-full bg-green border-2 border-cyan-500 shadow-lg mb-1 z-10" 
                />

                {/* Beam line container */}
                <div className="relative" style={{ height: `${cardHeight}px` }}>
                    {/* Full static line (background) */}
                    <div 
                        className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-600/30"
                        style={{ height: `${cardHeight}px` }}
                    />
                    
                    {/* Animated line */}
                    <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600"
                        style={{
                            height: `${cardHeight}px`,
                            scaleY: pathLength,
                            transformOrigin: "top center",
                        }}
                    />
                </div>
            </div>

            <div>{children}</div>
        </motion.div>
    );
};