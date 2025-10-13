"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import Demo from "@/components/landing/Demo";
import Container from "@/components/landing/Container";
import Features from "@/components/landing/Features";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(120,119,198,0.25),rgba(255,255,255,0))]" />
      <Container>
        <div className="py-8 md:py-14">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 bg-white/60 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Minimal • Calm • Open
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Bilateral Stimulation, made simple.
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600 md:text-lg">
            A tiny, focused BLS playground for relaxation exercises: smooth
            motion, fullscreen, keyboard controls. Built to be distraction‑free
            and delightful.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#demo">
              <Button size="lg">Try the Demo</Button>
            </a>
            <a href="#features">
              <Button variant="ghost" size="lg">
                See Features
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border bg-black text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_100%_0%,rgba(255,255,255,0.12),transparent)]" />
          <div className="relative z-10 p-8 md:p-12">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Start your calm BLS experience right now.
            </h2>
            <p className="mt-2 max-w-2xl text-white/80">
              No registration, no tracking, no distractions.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/session" className="text-lg font-bold">
                Start BLS session
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Demo />
      <CTA />
    </main>
  );
}
