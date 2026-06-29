import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/footer.png"
                width={42}
                height={42}
                alt="logo"
                className="rounded-full"
              />
              <span className="text-white font-semibold text-lg">
                NextStore
              </span>
            </Link>

            <p className="mt-4 text-sm text-zinc-400 leading-6">
              NextStore is your go-to destination for quality products and
              exceptional shopping experience.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
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

          <div className=" p-4 flex items-center gap-3">
            <Image
              src="/me.jpg"
              width={64}
              height={64}
              alt="dev"
              className="rounded-full"
            />
            <div>
              <p className="text-white font-medium text-md">
                Mohamad Reza Rajabi
              </p>
              <p className="text-sm text-zinc-400">FrontEnd Developer</p>

              <div className="flex gap-2 mt-2 text-zinc-400">
                <Github size={16} className="hover:text-white cursor-pointer" />
                <Linkedin
                  size={16}
                  className="hover:text-white cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            © {year} NextStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
