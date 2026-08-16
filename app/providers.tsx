"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import FloatingWidgets from "@/components/FloatingWidgets";

const pageVariants = { 
  initial: { opacity: 0, filter: "blur(6px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(6px)" },
};

function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const loadingFallbackTimer = window.setTimeout(() => {
      setLoading(false);
    }, 4500);

    return () => {
      window.clearTimeout(loadingFallbackTimer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {loading && <LoadingScreen onComplete={handleLoadComplete} />}

        <ScrollToTop />
        <CustomCursor />
        <GrainOverlay />
        <Navbar />
        <FloatingWidgets />

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" as const }}
          >
            {children}
            <Footer />
          </motion.div>
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
}








