"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Guarantee minimum animation runtime (2000ms) for visual completion
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1000));

    // 2. Guarantee that the browser page assets have finished loading
    const pageLoadPromise = new Promise<void>((resolve) => {
      if (document.readyState === "complete") {
        resolve();
      } else {
        const handleLoad = () => {
          resolve();
          window.removeEventListener("load", handleLoad);
        };
        window.addEventListener("load", handleLoad);
      }
    });

    // 3. Deactivate loading overlay once both criteria are met
    Promise.all([minTimePromise, pageLoadPromise]).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loading key="loader" />}
      </AnimatePresence>
      {children}
    </>
  );
}
