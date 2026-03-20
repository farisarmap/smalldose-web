import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#faf6ee]/10 bg-[#1c0f0a]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 text-[#faf6ee] sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <h2 className="font-display text-3xl">SMALLDOSE</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#faf6ee]/75">
            Specialty coffee and brew essentials crafted for meaningful everyday
            rituals.
          </p>
        </div>
        <nav aria-label="Footer links" className="space-y-2 text-sm">
          <Link href="/shop" className="block transition-colors hover:text-[#c9973a]">
            Shop
          </Link>
          <Link
            href="/collections"
            className="block transition-colors hover:text-[#c9973a]"
          >
            Collections
          </Link>
          <Link href="/blog" className="block transition-colors hover:text-[#c9973a]">
            Journal
          </Link>
          <Link href="/about" className="block transition-colors hover:text-[#c9973a]">
            Our Story
          </Link>
        </nav>
        <div className="text-sm">
          <p className="font-medium text-[#c9973a]">Visit</p>
          <p className="mt-2 text-[#faf6ee]/75">Dubai, United Arab Emirates</p>
          <p className="mt-4 text-[#faf6ee]/75">hello@smalldose.coffee</p>
        </div>
      </div>
    </footer>
  );
}
