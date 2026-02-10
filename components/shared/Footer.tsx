import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold text-white">NextStore</h3>
            <p className="mt-3 text-sm text-zinc-400 max-w-xs">
              A modern e-commerce store built with Next.js.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-white">
              Quick Links
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:text-white" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/products">
                  Products
                </Link>
              </li>
              <li>
                <Link className="hover:text-white" href="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/me.jpg"
                alt="Developer photo"
                width={56}
                height={56}
                className="rounded-full border border-zinc-700 object-cover"
              />

              <div>
                <p className="font-medium text-white">Mohamad Reza Rajabi</p>

                <div className="mt-2 flex gap-3">
                  <a href="https://github.com/rrealmrezarajabi" target="_blank">
                    <Github className="h-5 w-5 hover:text-white" />
                  </a>

                  <a href="https://linkedin.com/" target="_blank">
                    <Linkedin className="h-5 w-5 hover:text-white " />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
          © {year} NextStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
