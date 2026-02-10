export default function TrustedBy() {
  const logos = ["facebook", "tinder", "airbnb", "HubSpot", "amazon"];

  return (
    <section className="relative bg-zinc-950 mb-6">
      <div className="mx-auto max-w-6xl px-6 pt-20">
        <p className="text-center text-sm text-white/60">
          Trusted by over <span className="text-white/80">20,000</span>{" "}
          companies all over the world
        </p>

        <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-6 text-white/40">
          Arcu cursus vitae congue mauris rhoncus viverra nibh cras pulvinar
          mattis blandit libero cursus mattis.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pb-10">
          {logos.map((name) => (
            <span
              key={name}
              className="select-none text-xl font-semibold tracking-tight text-white/80"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
