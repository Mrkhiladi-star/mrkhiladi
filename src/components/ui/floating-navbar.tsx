"use client";
import React, { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/store/Auth";
import Image from "next/image";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => {
    if (!isScrolled) setIsVisible(false);
  };

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

  // Wrapper for logout that also redirects
  const handleLogout = async () => {
    await logout();
    router.push("/"); // Redirect to home page after logout
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
              "flex w-full items-center justify-center bg-white/90 backdrop-blur-md px-6 py-4 shadow-md border-b border-gray-200/50 dark:bg-gray-900/90 dark:border-gray-700/50 overflow-visible",
              className
            )}
          >
            <div className="flex max-w-7xl w-full items-center justify-between px-4 md:px-8">
              {/* Desktop nav */}
              <div className="hidden lg:flex items-center space-x-8">
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
              <div className="flex lg:hidden items-center space-x-4 w-full justify-between">
                <div className="w-6"></div>
                <div className="flex-1 text-center">
                  <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-200">
                    Ramu Yadav
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-700 dark:text-gray-200 focus:outline-none"
                >
                  {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
                </button>
              </div>

              {/* Right side */}
              <div className="hidden lg:flex items-center space-x-4">
                {!session && (
                  <div className="flex items-center space-x-3">
                    <Image src="/images/logos/nit-mizoram.png" alt="NIT Mizoram" width={36} height={36} />
                    <Image src="/images/logos/jnv.png" alt="JNV" width={36} height={36} />
                    <Image src="/images/logos/cbse.png" alt="CBSE" width={36} height={36} />
                  </div>
                )}
                {session && (
                  <button
                    onClick={handleLogout}
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
                  className="fixed top-0 left-0 w-screen h-screen z-[100] bg-black/95 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <span className="text-xl font-bold text-white">Menu</span>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white p-2"
                    >
                      <IconX size={28} />
                    </button>
                  </div>

                  {/* Menu items */}
                  <div className="flex-1 overflow-y-auto py-4">
                    <div className="space-y-3 px-6">
                      {navItems.map((navItem, idx) => (
                        <Link
                          key={idx}
                          href={navItem.link}
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full flex items-center gap-4 
                             text-white font-medium text-lg py-4 px-4 rounded-lg 
                             bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                             transition-colors border border-white/10"
                        >
                          <div className="flex-shrink-0">{navItem.icon}</div>
                          <span>{navItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-700 bg-black/50 backdrop-blur-sm p-6">
                    <div className="flex justify-center space-x-6">
                      {!session ? (
                        <>
                          <Image src="/images/logos/nit-mizoram.png" alt="NIT Mizoram" width={40} height={40} className="rounded-lg" />
                          <Image src="/images/logos/jnv.png" alt="JNV" width={40} height={40} className="rounded-lg" />
                          <Image src="/images/logos/cbse.png" alt="CBSE" width={40} height={40} className="rounded-lg" />
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="px-6 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                          Logout
                        </button>
                      )}
                    </div>
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
