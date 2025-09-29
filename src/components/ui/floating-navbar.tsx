"use client";
import React, { JSX, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/store/Auth";
import Image from "next/image";
export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: { name: string; link: string; icon?: JSX.Element }[];
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { session, logout } = useAuthStore();
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => {
    if (!isScrolled) setIsVisible(false);
  };
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-24"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        {(isVisible || isScrolled) && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex w-full items-center justify-center bg-white/70 backdrop-blur-md px-6 py-4 shadow-md border-b border-gray-200/50 dark:bg-gray-900/70 dark:border-gray-700/50",
              className
            )}
          >
            <div className="flex max-w-7xl w-full items-center justify-between px-4 md:px-8">
              {/* Navbar links with icons */}
              <div className="flex items-center space-x-8">
                {navItems.map((navItem, idx) => (
                  <Link
                    key={`link-${idx}`}
                    href={navItem.link}
                    className={cn(
                      "flex items-center gap-2 text-base font-medium text-neutral-700 transition-colors hover:text-blue-600 dark:text-neutral-200 dark:hover:text-blue-400",
                      "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                    )}
                    scroll={true}
                  >
                    {navItem.icon}
                    {navItem.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                {!session && (
                  <div className="flex items-center space-x-3">
                    <Image src="/images/logos/nit-mizoram.png" alt="NIT Mizoram" width={36} height={36} />
                    <Image src="/images/logos/jnv.png" alt="JNV" width={36} height={36} />
                    <Image src="/images/logos/cbse.png" alt="CBSE" width={36} height={36} />
                  </div>
                )}
                {session && (
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isVisible && !isScrolled && <div className="absolute top-0 left-0 right-0 h-6 bg-transparent" />}
    </div>
  );
};
