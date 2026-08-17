import Link from "next/link";

const cartItems = [
  { id: 1, name: "جاكت رويال أوفرشيرت", size: "L", qty: 1, price: 389, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "فستان لونا إيلجانس", size: "M", qty: 2, price: 279, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80" },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.15;
  const shipping = subtotal > 500 ? 0 : 35;
  const total = subtotal + tax + shipping;

  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">Cart</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">سلة التسوق</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {cartItems.map((item) => (
            <div key={item.id} className="flex flex-col gap-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <img src={item.image} alt={item.name} className="h-28 w-24 rounded-2xl object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900">{item.name}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-5 text-sm text-slate-500">
                  <span>المقاس: {item.size}</span>
                  <span>السعر: {item.price} ر.س</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select defaultValue={item.qty} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-rose-500">
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <option key={qty} value={qty}>{qty}</option>
                  ))}
                </select>
                <button className="text-sm font-medium text-rose-600">حذف</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">ملخص الطلب</h2>
          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <div className="flex justify-between"><span>المجموع الفرعي</span><span>{subtotal} ر.س</span></div>
            <div className="flex justify-between"><span>الضرائب</span><span>{tax.toFixed(0)} ر.س</span></div>
            <div className="flex justify-between"><span>الشحن</span><span>{shipping === 0 ? "مجاني" : `${shipping} ر.س`}</span></div>
            <div className="border-t border-slate-200 pt-4 text-base font-bold text-slate-900">
              <div className="flex justify-between"><span>المجموع الكلي</span><span>{total.toFixed(0)} ر.س</span></div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link href="/checkout" className="block rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-rose-600">متابعة الدفع</Link>
            <Link href="/shop" className="block rounded-full border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-800 transition hover:border-rose-500 hover:text-rose-600">مواصلة التسوق</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
