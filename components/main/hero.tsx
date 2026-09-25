"use client";

import { HeroContent } from "@/components/sub/hero-content";
import { useAutoPauseVideo } from "@/lib/use-auto-pause-video";

export const Hero = () => {
  const videoRef = useAutoPauseVideo<HTMLVideoElement>();

  return (
    <div id="about-me" className="relative flex flex-col h-full w-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      <HeroContent />
    </div>
  );
};
