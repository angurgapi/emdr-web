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
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 bg-white/60 backdrop-blur dark:bg-black/60 dark:text-gray-300">
            <Sparkles className="h-3.5 w-3.5 text-blue-800 dark:text-yellow-100" />{" "}
            Minimal • Calm • Open
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            EMDR & Bilateral Stimulation, made simple.
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600 md:text-lg dark:text-gray-300">
            A tiny, focused playground for self-administered BLS: smooth motion,
            fullscreen, keyboard controls. Built to be distraction‑free and
            delightful.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/session" className="text-lg font-bold">
              <Button className="font-semibold" size="lg">
                Start free session
              </Button>
            </Link>
            <Link href="#demo">
              <Button
                variant="ghost"
                className="font-semibold text-primary--900"
                size="lg"
              >
                Try the Demo
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

function WhatIs() {
  return (
    <section className="py-6">
      <Container>
        <h2 className="text-2xl font-semibold md:text-3xl">
          What is bilateral stimulation?
        </h2>
        <p className="mt-4 max-w-4xl text-gray-600 md:text-lg dark:text-gray-300">
          Bilateral stimulation (BLS) is a part of EMDR therapy. This technique
          is used to help people process and integrate traumatic memories. It
          involves alternating sensory input, such as visual or auditory
          stimuli, to facilitate emotional regulation and promote healing.
          Trauma survuivors usually notice first improvements in sleep quality
          and reduced anxiety levels after 3-6 sessions. It is usually
          administered by a trained therapist, but self-administered BLS can
          also be beneficial for relaxation and stress reduction.
        </p>
      </Container>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-10">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border bg-black text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_100%_0%,rgba(255,255,255,0.12),transparent)]" />
          <div className="relative z-10 p-8 md:p-12">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Begin your BLS experience right now with Spoko.
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
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Hero />
      <WhatIs />
      <Features />
      <Demo />
      <CTA />
    </main>
  );
}
