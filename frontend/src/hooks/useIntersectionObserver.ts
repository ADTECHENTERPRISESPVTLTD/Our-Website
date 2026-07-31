"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement | null>;
  isInView: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Custom hook for detecting when an element enters the viewport.
 * Useful for triggering scroll-based animations.
 *
 * @param options - IntersectionObserver configuration
 * @returns Object containing ref, isInView status, and the IntersectionObserverEntry
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        setIsInView(true);
        setEntry(entry);

        // If triggerOnce, unobserve after first intersection
        if (triggerOnce && ref.current && observerRef.current) {
          observerRef.current.unobserve(ref.current);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
        setEntry(entry);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, handleObserver]);

  return { ref, isInView, entry };
}

