'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { brands, categories, products } from "@/data/store";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === categories.find((item) => item.slug === selectedCategory)?.name;
      const matchesBrand = selectedBrand === "all" || product.brand === selectedBrand;
      const matchesColor = selectedColor === "all" || product.colors.includes(selectedColor);
      const matchesSize = selectedSize === "all" || product.sizes.some((item) => item.size === selectedSize);
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesBrand && matchesColor && matchesSize && matchesPrice;
    });

    return result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
        default:
          return b.id - a.id;
      }
    });
  }, [selectedCategory, selectedBrand, selectedColor, selectedSize, maxPrice, sortBy]);

  return (
    <div className="container-shell py-12">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">Store</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">تسوق حسب ذوقك</h1>
        </div>
        <div className="text-sm text-slate-500">{filteredProducts.length} منتج متاح</div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[270px_1fr]">
        <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-slate-900">الفلاتر</h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">القسم</label>
              <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-rose-400">
                <option value="all">الكل</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">العلامة التجارية</label>
              <select value={selectedBrand} onChange={(event) => setSelectedBrand(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-rose-400">
                <option value="all">الكل</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">اللون</label>
              <select value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-rose-400">
                <option value="all">الكل</option>
                {Array.from(new Set(products.flatMap((product) => product.colors))).map((color) => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">المقاس</label>
              <select value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-rose-400">
                <option value="all">الكل</option>
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">الحد الأقصى للسعر: {maxPrice} ر.س</label>
              <input type="range" min="50" max="600" step="10" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="w-full accent-rose-500" />
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">شبكة</button>
              <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">قائمة</button>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-slate-600">ترتيب حسب</label>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-rose-400">
                <option value="newest">الأحدث</option>
                <option value="price-low">السعر من الأقل للأعلى</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.length ? (
              filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                لا توجد منتجات تطابق الفلاتر، جرّب تعديل الخيارات.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600">
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
}
