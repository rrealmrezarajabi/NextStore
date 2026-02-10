"use client";

import { useState } from "react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    setEmail("");
  }

  return (
    <section className="relative bg-zinc-920 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3">
          <div className="pointer-events-none absolute -right-24 -top-24 h-105 w-105 rounded-full bg-white/60 blur-0" />
          <div className="pointer-events-none absolute right-44 top-16 h-16 w-16 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute right-32 bottom-16 h-10 w-10 rounded-full bg-white/10" />

          <div className="relative grid gap-10 p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm text-white/70">Powering your business</p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Grow faster with NextStore updates
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/50">
                Get product tips, growth playbooks, and feature drops. No spam —
                unsubscribe anytime.
              </p>

              <form
                onSubmit={onSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="Your email..."
                  className="h-11 w-full rounded-lg border border-white/10 bg-zinc-950/40 px-4 text-sm text-white/80 placeholder:text-white/30 outline-none focus:ring-2 focus:ring-violet-300/30"
                />
                <button
                  type="submit"
                  className="h-11 shrink-0 rounded-lg bg-white px-6 text-sm font-medium text-black transition hover:bg-white-400 focus:outline-none focus:ring-2 focus:ring-white-300/40"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute left-8 top-1/2 h-px w-32 -translate-y-1/2 bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
