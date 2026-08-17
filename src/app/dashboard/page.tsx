import Link from "next/link";
import { customerOrders, products, wishlist } from "@/data/store";

export default function DashboardPage() {
  return (
    <div className="container-shell py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">Account</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">لوحة حسابي</h1>
        </div>
        <Link href="/" className="text-sm font-medium text-rose-600">العودة إلى المتجر</Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">الاسم</div>
          <div className="mt-2 text-xl font-black text-slate-900">سارة محمد</div>
        </div>
        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">البريد</div>
          <div className="mt-2 text-xl font-black text-slate-900">sara@example.com</div>
        </div>
        <div className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-slate-500">العنوان الافتراضي</div>
          <div className="mt-2 text-xl font-black text-slate-900">الرياض، حي النخيل</div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">طلباتي السابقة</h2>
          <div className="mt-6 space-y-4">
            {customerOrders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm text-slate-500">رقم الطلب {order.id}</div>
                    <div className="text-lg font-bold text-slate-900">{order.total} ر.س</div>
                  </div>
                  <div className="text-sm text-slate-500">{order.date}</div>
                  <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">تغيير كلمة المرور</h2>
            <div className="mt-4 space-y-3">
              <input type="password" placeholder="كلمة المرور الحالية" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-rose-500" />
              <input type="password" placeholder="كلمة المرور الجديدة" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-rose-500" />
              <button className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600">تحديث كلمة المرور</button>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">المفضلة</h2>
            <div className="mt-4 space-y-3">
              {wishlist.map((product) => (
                <div key={product.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                  <img src={product.image} alt={product.name} className="h-16 w-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">{product.name}</div>
                    <div className="text-sm text-slate-500">{product.price} ر.س</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
