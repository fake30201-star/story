import Link from "next/link";

const navItems = [
  { href: "/shop", label: "رجالي" },
  { href: "/shop?category=women", label: "حريمي" },
  { href: "/shop?category=kids", label: "أطفال" },
  { href: "/shop?category=accessories", label: "إكسسوارات" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-400 text-lg font-bold text-white">
            M
          </div>
          <div>
            <div className="text-lg font-black tracking-[0.15em] text-slate-900">MODA</div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-slate-500">studio</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-rose-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-rose-500 hover:text-rose-600" aria-label="Search">
            🔎
          </button>
          <Link href="/cart" className="relative rounded-full border border-slate-200 p-2 text-slate-700 transition hover:border-rose-500 hover:text-rose-600" aria-label="Shopping cart">
            🛒
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              3
            </span>
          </Link>
          <Link href="/login" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </header>
  );
}
