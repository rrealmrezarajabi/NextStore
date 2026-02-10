"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FEATURES } from "./featureShowcase.data";

type Feature = (typeof FEATURES)[number];

export default function FeatureShowcase() {
  const [activeId, setActiveId] = useState<Feature["id"]>(FEATURES[0].id);

  const active = useMemo(
    () => FEATURES.find((f) => f.id === activeId) ?? FEATURES[0],
    [activeId],
  );

  return (
    <section className="relative overflow-hidden bg-zinc-950 py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]
        [background-image:linear-gradient(to_right,white_1px,transparent_1px),
        linear-gradient(to_bottom,white_1px,transparent_1px)]
        bg-size-[72px_72px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm text-white/70">Powerful suite of tools</p>

            <p className="mt-4 max-w-xl text-white/55">
              Everything you need to run a modern store with speed and
              simplicity.
            </p>

            <div className="mt-10 space-y-4">
              {FEATURES.map((item) => {
                const isActive = item.id === activeId;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`w-full rounded-xl border p-5 text-left transition
                      ${
                        isActive
                          ? "border-white-500 ring-1 ring-white-500/40"
                          : "border-white/10 hover:bg-white/4"
                      }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-white font-semibold">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/55">
                          {item.description}
                        </p>
                      </div>

                      <span className="h-10 w-10 flex items-center justify-center rounded-full border border-white/30 text-white/60">
                        {item.icon}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/3 p-6">
              <div className="relative aspect-16/10 rounded-xl bg-black/40">
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  fill
                  className="object-contain p-6"
                />
              </div>

              <div className="mt-4">
                <p className="text-white font-medium">{active.kicker}</p>
                <p className="text-sm text-white/55">{active.caption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
