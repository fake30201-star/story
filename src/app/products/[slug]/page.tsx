import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { products, reviews } from "@/data/store";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const suggested = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);

  return (
    <div className="container-shell py-12">
      <div className="mb-8 flex items-center gap-3 text-sm text-slate-500">
        <Link href="/">الرئيسية</Link>
        <span>/</span>
        <Link href="/shop">المتجر</Link>
        <span>/</span>
        <span className="text-slate-800">{product.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm">
            <img src={product.gallery[0]} alt={product.name} className="h-[580px] w-full rounded-[20px] object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.gallery.map((image, index) => (
              <button key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                <img src={image} alt={`${product.name} ${index + 1}`} className="h-28 w-full rounded-xl object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>{product.brand}</span>
            <span>{product.category}</span>
          </div>

          <h1 className="mt-4 text-3xl font-black text-slate-900">{product.name}</h1>

          <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>{index < Math.round(product.rating) ? "★" : "☆"}</span>
              ))}
            </div>
            <span>{product.rating} تقييم</span>
            <span>({product.reviews} تقييمات)</span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-black text-slate-900">{product.price} ر.س</span>
            {product.previousPrice ? <span className="text-lg text-slate-400 line-through">{product.previousPrice} ر.س</span> : null}
          </div>

          <div className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-slate-700">اختر المقاس</h2>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button key={size.size} className={`rounded-xl border px-4 py-2 text-sm font-medium ${size.stock > 0 ? "border-slate-200 text-slate-800 hover:border-rose-500" : "border-slate-200 bg-slate-100 text-slate-400 line-through"}`}>
                  {size.size}
                  <span className="mr-2 text-[10px]">({size.stock})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-slate-700">اللون</h2>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button key={color} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:border-rose-500">
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700">
              الكمية
              <input type="number" defaultValue={1} min={1} className="w-14 border-0 bg-transparent text-center outline-none" />
            </label>
            <button className="flex-1 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600">
              إضافة إلى السلة
            </button>
          </div>

          <div className="mt-4 flex gap-3">
            <button className="flex-1 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-rose-500 hover:text-rose-600">
              شراء الآن
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-rose-500 hover:text-rose-600">
              ♡ المفضلة
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-2xl font-black text-slate-900">الوصف</h2>
          <p className="leading-8 text-slate-600">{product.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-bold text-slate-900">المواصفات</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {Object.entries(product.specs).map(([key, value]) => (
                  <li key={key} className="flex justify-between border-b border-slate-100 pb-2">
                    <span>{key}</span>
                    <span className="font-medium text-slate-800">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-bold text-slate-900">تعليمات العناية</h3>
              <ul className="list-disc space-y-2 pr-5 text-sm text-slate-600">
                {product.care.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-2xl font-black text-slate-900">مراجعات العملاء</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.customer} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">{review.customer}</span>
                  <span className="text-amber-500">{Array.from({ length: review.rating }).fill("★").join("")}</span>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">{review.comment}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-4">
            <h3 className="mb-3 text-lg font-bold text-slate-900">أضف مراجعة</h3>
            <textarea className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-rose-500" rows={4} placeholder="اكتب رأيك عن المنتج..." />
            <button className="mt-3 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white">إرسال</button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-3xl font-black text-slate-900">منتجات مقترحة</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {suggested.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
