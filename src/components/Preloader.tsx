"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loading from "@/app/loading";

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Track previous path to prevent showing loader when it's the exact same page
  const prevPathRef = useRef(pathname);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    // 1. Guarantee minimum animation runtime (1000ms) for visual completion on initial load
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

  // Detect route changes (when pathname updates, client-side navigation has completed)
  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      prevPathRef.current = pathname;

      if (isTransitioningRef.current) {
        // Let the loading screen stay visible for a short moment so the animation plays smoothly
        setTimeout(() => {
          setLoading(false);
          isTransitioningRef.current = false;
        }, 600);
      }
    }
  }, [pathname]);

  // Intercept routing transitions (clicks, history changes, back/forward buttons)
  useEffect(() => {
    const handleStartTransition = () => {
      if (!isTransitioningRef.current) {
        isTransitioningRef.current = true;
        setTimeout(() => {
          setLoading(true);
        }, 0);
      }
    };

    // Intercept Link/Anchor clicks
    const handleAnchorClick = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      if (event.defaultPrevented) return;

      const anchor = (event.target as HTMLElement).closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        const target = anchor.getAttribute("target");

        if (
          href?.startsWith("/") &&
          !href.startsWith("//") &&
          target !== "_blank" &&
          !anchor.hasAttribute("download")
        ) {
          const currentUrl = new URL(window.location.href);
          const targetUrl = new URL(href, window.location.origin);

          if (currentUrl.pathname !== targetUrl.pathname) {
            handleStartTransition();
          }
        }
      }
    };

    // Intercept history pushState/replaceState
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      const url = args[2];
      if (url) {
        const targetUrl = new URL(url.toString(), window.location.origin);
        if (targetUrl.pathname !== window.location.pathname) {
          handleStartTransition();
        }
      }
      return originalPushState.apply(this, args);
    };

    window.history.replaceState = function (...args) {
      const url = args[2];
      if (url) {
        const targetUrl = new URL(url.toString(), window.location.origin);
        if (targetUrl.pathname !== window.location.pathname) {
          handleStartTransition();
        }
      }
      return originalReplaceState.apply(this, args);
    };

    window.addEventListener("popstate", handleStartTransition);
    document.addEventListener("click", handleAnchorClick);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener("popstate", handleStartTransition);
      document.removeEventListener("click", handleAnchorClick);
    };
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
