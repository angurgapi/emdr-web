"use client";

import { VideoPlayer } from "@/components/VideoPlayer";
import Container from "./Container";
import { useIsMobile } from "@/hooks/useMobile";

export function DemoVideo() {
  return (
    <section id="demo" className="py-10">
      <Container>
        <div className="rounded-3xl border p-2 md:p-4 shadow-sm dark:bg-gray-800">
          <h4 className="text-2xl font-semibold md:text-3xl">
            See how it works
          </h4>

          <VideoPlayer
            src={useIsMobile() ? "/demo-mobile.webm" : "/demo3.webm"}
            className="mt-4 rounded-3xl -mt-[3px] -mb-[3px] -mr-[5px]"
          />
        </div>
      </Container>
    </section>
  );
}
