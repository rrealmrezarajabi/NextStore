import Image from "next/image";

type Props = {
  quote: string;
  name: string;
  role: string;
  handle: string;
  avatarSrc: string;
};

export default function TestimonialCard({
  quote,
  name,
  role,
  handle,
  avatarSrc,
}: Props) {
  return (
    <section className="relative bg-zinc-920">
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/60 bg-white/3 px-8 pb-8 pt-12">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl font-black leading-none text-sky-400/80">
            “
          </div>

          <div className="absolute -top-10 left-1/2 -translate-x-1/2">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/15 bg-zinc-900">
              <Image
                src={avatarSrc}
                alt={`${name} avatar`}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <p className="mt-2 text-center text-sm leading-7 text-white/65">
            {quote}
          </p>

          <div className="mt-6 text-center">
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="mt-1 text-xs text-white/45">
              {role} <span className="text-violet-300/80">{handle}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
