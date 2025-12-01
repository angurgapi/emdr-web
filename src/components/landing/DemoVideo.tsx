"use client";

import { VideoPlayer } from "@/components/VideoPlayer";
import Container from "./Container";
import { useIsMobile } from "@/hooks/useMobile";

export function DemoVideo() {
  const isMobile = useIsMobile();

  return (
    <Container>
      <VideoPlayer src={isMobile ? "/demomob.webm" : "/demo.webm"} />
    </Container>
  );
}
