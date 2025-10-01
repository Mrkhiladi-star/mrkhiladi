"use client";
import React, { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/store/Auth";
import Image from "next/image";
import { IconMenu2, IconX } from "@tabler/icons-react"; // hamburger & close icons

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: { name: string; link: string; icon?: JSX.Element }[];
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // FIX: मोबाइल मेन्यू ओपन होने पर बॉडी स्क्रॉलिंग को डिसेबल करें
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    // FIX: इस कंटेनर का z-index 50 है, मोबाइल मेनू का z-index 100 है
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
              // FIX: overflow-visible जोड़ें ताकि मोबाइल मेनू बाहर निकल सके
              "flex w-full items-center justify-center bg-white/90 backdrop-blur-md px-6 py-4 shadow-md border-b border-gray-200/50 dark:bg-gray-900/90 dark:border-gray-700/50 overflow-visible",
              className
            )}
          >
            <div className="flex max-w-7xl w-full items-center justify-between px-4 md:px-8">
              {/* Desktop nav */}
              <div className="hidden md:flex items-center space-x-8">
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

              {/* Mobile hamburger */}
              <div className="flex md:hidden items-center space-x-4">
                <div className="flex-1">
                {/* Logo/Title area */}
                </div>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-700 dark:text-gray-200 focus:outline-none"
                >
                  {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                </button>
              </div>

              {/* Right side: logos or logout */}
              <div className="hidden md:flex items-center space-x-4">
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

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  // FIX: width: 100vw और height: 100vh जोड़ें, हालांकि inset-0 को यह करना चाहिए
                  // FIX: पूरी तरह से अपारदर्शी बनाने के लिए bg-black/95 का प्रयोग करें
                  className="fixed top-0 left-0 w-screen h-screen z-[100] bg-black/95 flex flex-col p-6 overflow-y-auto"
                >
                  {/* Close button */}
                  <div className="flex justify-end mb-8">
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white"
                    >
                      <IconX size={32} />
                    </button>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col items-center justify-center flex-grow space-y-6">
                    {navItems.map((navItem, idx) => (
                      <Link
                        key={idx}
                        href={navItem.link}
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-4/5 max-w-sm flex items-center justify-center gap-2 
                           text-white font-semibold text-lg py-3 rounded-lg 
                           bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                           transition-colors"
                      >
                        {navItem.icon}
                        {navItem.name}
                      </Link>
                    ))}
                  </div>

                  {/* Logos / Logout */}
                  <div className="flex justify-center space-x-6 mt-8 pb-6">
                    {!session ? (
                      <>
                        <Image src="/images/logos/nit-mizoram.png" alt="NIT Mizoram" width={36} height={36} />
                        <Image src="/images/logos/jnv.png" alt="JNV" width={36} height={36} />
                        <Image src="/images/logos/cbse.png" alt="CBSE" width={36} height={36} />
                      </>
                    ) : (
                      <button
                        onClick={logout}
                        className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {!isVisible && !isScrolled && <div className="absolute top-0 left-0 right-0 h-6 bg-transparent" />}
    </div>
  );
};