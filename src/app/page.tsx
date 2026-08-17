import Link from "next/link";
import { Countdown } from "@/components/countdown";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/store";

const featured = products.filter((product) => product.isFeatured).slice(0, 8);

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-slate-900/40" />

        <div className="container-shell relative grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-xl text-white">
            <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-rose-200 uppercase">
              Collection 2026
            </span>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              أزياء عصرية تعكس أسلوبك اليومي
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">
              اكتشف قطعاً فاخرة من الملابس والحقائب والإكسسوارات، مصممة للمظهر الأنثوي والأنيق والراعي للعصري.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/shop" className="rounded-full bg-rose-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-400">
                تسوق الآن
              </Link>
              <Link href="/shop?category=women" className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                اطلع على العروض
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-200">
              <div>
                <div className="text-3xl font-black text-white">25k+</div>
                <div>زبون سعيد</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">4.9/5</div>
                <div>تقييم المتجر</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white">24h</div>
                <div>توصيل سريع</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[32px] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
                alt="تصميم أزياء"
                className="h-[540px] w-full rounded-[28px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 right-6 rounded-2xl bg-white p-4 text-slate-900 shadow-xl">
              <div className="text-xs text-slate-500">خصم اليوم</div>
              <div className="mt-1 text-3xl font-black">40%</div>
              <div className="text-sm text-slate-600">على مجموعة مختارة</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">Best sellers</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">الأكثر مبيعاً</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-rose-600">عرض الكل</Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-300">Weekend Deal</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">تخفيضات الأسبوع</h2>
            <p className="mt-4 max-w-md text-slate-300">
              خصم إضافي على تشكيلة مختارة من الملابس والحقائب والمجوهرات حتى نهاية هذا الأسبوع.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link href="/shop" className="rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">
                استمتع بالعرض
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Countdown />
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">Curated picks</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">اختيارات مختارة</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[products[0], products[1], products[4]].map((product) => (
            <div key={product.id} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
              <img src={product.image} alt={product.name} className="h-80 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{product.brand}</span>
                  <span>{product.category}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-slate-900">{product.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-900">{product.price} ر.س</span>
                  <Link href={`/products/${product.slug}`} className="text-sm font-semibold text-rose-600">عرض المنتج</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
