"use client";

import { useEffect, useRef } from "react";

/**
 * Pauses a looping background video once its section scrolls out of view,
 * and resumes it when back in view. A muted <video autoPlay loop> keeps
 * decoding frames indefinitely even while scrolled far away — this site has
 * three of them mounted at once (hero, encryption, skills), all decoding
 * simultaneously regardless of scroll position without this.
 */
export function useAutoPauseVideo<T extends HTMLVideoElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.01 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return ref;
}
