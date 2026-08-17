import Link from "next/link";
import { Product } from "@/data/store";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge ? (
          <span className="absolute right-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
            {product.badge}
          </span>
        ) : null}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{product.brand}</span>
          <span>{product.category}</span>
        </div>

        <Link href={`/products/${product.slug}`} className="block text-lg font-semibold text-slate-800 hover:text-rose-600">
          {product.name}
        </Link>

        <div className="flex items-center gap-1 text-amber-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index}>{index < Math.round(product.rating) ? "★" : "☆"}</span>
          ))}
          <span className="ml-2 text-sm text-slate-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900">{product.price} ر.س</span>
            {product.previousPrice ? (
              <span className="text-sm text-slate-400 line-through">{product.previousPrice} ر.س</span>
            ) : null}
          </div>
          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600">
            إضافة للسلة
          </button>
        </div>
      </div>
    </article>
  );
}
