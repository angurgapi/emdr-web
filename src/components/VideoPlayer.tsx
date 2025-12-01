"use client";

import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
}

export function VideoPlayer({
  src,
  className,
  width,
  height,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      className={className}
      width={width}
      height={height}
    />
  );
}
