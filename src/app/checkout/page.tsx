import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="container-shell py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">Checkout</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">إتمام الدفع</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">بيانات العميل</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span>الاسم الكامل</span>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-rose-500" defaultValue="سارة محمد" />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span>البريد الإلكتروني</span>
              <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-rose-500" defaultValue="sara@example.com" />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span>رقم الهاتف</span>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-rose-500" defaultValue="966500000000" />
            </label>
            <label className="space-y-2 text-sm text-slate-600 sm:col-span-2">
              <span>العنوان</span>
              <textarea rows={3} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-rose-500" defaultValue="الرياض، حي النخيل، شارع 12" />
            </label>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-black text-slate-900">طريقة الدفع</h2>
            <div className="mt-4 space-y-3">
              {['بطاقة ائتمان', 'PayPal', 'الدفع عند الاستلام'].map((method) => (
                <label key={method} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <span>{method}</span>
                  <input type="radio" name="payment" defaultChecked={method === 'بطاقة ائتمان'} />
                </label>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">ملخص الطلب</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80" alt="جاكت" className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">جاكت رويال أوفرشيرت</div>
                <div>المقاس L × 1</div>
              </div>
              <div className="font-bold">389 ر.س</div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
              <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=400&q=80" alt="فستان" className="h-16 w-16 rounded-xl object-cover" />
              <div className="flex-1 text-sm text-slate-700">
                <div className="font-semibold text-slate-900">فستان لونا إيلجانس</div>
                <div>المقاس M × 2</div>
              </div>
              <div className="font-bold">558 ر.س</div>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>المجموع الفرعي</span><span>947 ر.س</span></div>
            <div className="flex justify-between"><span>الضرائب</span><span>142 ر.س</span></div>
            <div className="flex justify-between"><span>الشحن</span><span>0 ر.س</span></div>
            <div className="border-t border-slate-200 pt-3 text-base font-black text-slate-900">
              <div className="flex justify-between"><span>الإجمالي</span><span>1089 ر.س</span></div>
            </div>
          </div>

          <button className="mt-6 block w-full rounded-full bg-rose-500 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-rose-400">
            تأكيد الطلب
          </button>
          <Link href="/cart" className="mt-3 block text-center text-sm font-medium text-slate-600">عودة إلى السلة</Link>
        </aside>
      </div>
    </div>
  );
}
