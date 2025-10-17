"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Button } from "../ui/button";
import Container from "./Container";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Demo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();

  const [size, setSize] = useState<number>(18); // dot size
  const [dir, setDir] = useState<"x" | "y" | "xy">("x"); // direction
  const [speed, setSpeed] = useState<number>(1.2); // seconds per one-way
  const [playing, setPlaying] = useState<boolean>(true);

  const bounds = useRef({ w: 0, h: 0 });
  const [layoutVer, setLayoutVer] = useState(0);

  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => {
      bounds.current = { w: el.clientWidth, h: el.clientHeight };
      setLayoutVer((v) => v + 1);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const start = useCallback(() => {
    const { w, h } = bounds.current;
    const maxX = Math.max(0, w - size);
    const maxY = Math.max(0, h - size);
    const base = {
      ease: "linear" as const,
      repeat: Infinity,
      repeatType: "reverse" as const,
      duration: speed,
    };

    if (dir === "x") {
      controls.start({
        x: [0, maxX],
        y: h / 2 - size / 2,
        transition: {
          ...base,
          x: { ...base },
          y: { duration: 0 },
        },
      });
    } else if (dir === "y") {
      controls.start({
        y: [0, maxY],
        x: w / 2 - size / 2,
        transition: {
          ...base,
          y: { ...base },
          x: { duration: 0 },
        },
      });
    } else {
      controls.start({
        x: [0, maxX],
        y: [0, maxY],
        transition: base,
      });
    }
  }, [controls, dir, size, speed]);

  useEffect(() => {
    let raf = 0;
    if (!mountedRef.current) return;
    if (!playing) {
      controls.stop();
      return;
    }
    raf = requestAnimationFrame(() => start());
    return () => cancelAnimationFrame(raf);
  }, [dir, size, speed, playing, layoutVer, start, controls]);

  const togglePlay = () => setPlaying((p) => !p);

  return (
    <section id="demo" className="py-10">
      <Container>
        <div className="rounded-3xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-lg font-medium">Live Demo</div>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Select
                onValueChange={(value) => setDir(value as "x" | "y" | "xy")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="x">Horizontal</SelectItem>
                  <SelectItem value="y">Vertical</SelectItem>
                  <SelectItem value="xy">Diagonal</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setSize(parseInt(value, 10))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"12"}>XS</SelectItem>
                  <SelectItem value={"18"}>S</SelectItem>
                  <SelectItem value={"24"}>M</SelectItem>
                  <SelectItem value={"32"}>L</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => setSpeed(parseFloat(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select speed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"1.6"}>Calm</SelectItem>
                  <SelectItem value={"1.2"}>Default</SelectItem>
                  <SelectItem value={"0.8"}>Fast</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={togglePlay} className="ml-1">
                {playing ? "Pause" : "Play"}
              </Button>
            </div>
          </div>

          <div
            ref={wrapRef}
            className="relative mt-5 h-56 w-full rounded-2xl bg-gradient-to-tr from-indigo-50 to-sky-50"
          >
            <motion.div
              animate={controls}
              className="absolute left-0 top-0 rounded-full bg-indigo-500 shadow-[0_8px_30px_rgba(79,70,229,0.35)]"
              style={{ width: size, height: size }}
            />
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Tip: press Space to pause/resume when on session page. This demo
            uses a simple keyframe loop for a calm preview.
          </p>
        </div>
      </Container>
    </section>
  );
}
