import Link from "next/link";
import { products } from "@/data/store";

const stats = [
  { label: "عدد المنتجات", value: "1,284" },
  { label: "عدد الطلبات", value: "4,225" },
  { label: "عدد العملاء", value: "2,140" },
  { label: "إجمالي المبيعات", value: "84,900 ر.س" },
];

const orders = [
  { id: "#1011", customer: "ملالي فهد", total: "2890 ر.س", status: "قيد التجهيز" },
  { id: "#1012", customer: "يوسف السالم", total: "1620 ر.س", status: "تم الشحن" },
  { id: "#1013", customer: "لينا أحمد", total: "660 ر.س", status: "قيد الانتظار" },
  { id: "#1014", customer: "سارة جوهر", total: "990 ر.س", status: "تم التسليم" },
  { id: "#1015", customer: "رنا منير", total: "430 ر.س", status: "ملغي" },
];

export default function AdminPage() {
  return (
    <div className="container-shell py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-500">Admin</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">لوحة تحكم المدير</h1>
        </div>
        <Link href="/" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600">عرض المتجر</Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-500">{stat.label}</div>
            <div className="mt-3 text-3xl font-black text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">أحدث الطلبات</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            <table className="min-w-full text-right text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3">رقم الطلب</th>
                  <th className="px-4 py-3">العميل</th>
                  <th className="px-4 py-3">المجموع</th>
                  <th className="px-4 py-3">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-slate-200">
                    <td className="px-4 py-3 font-semibold text-slate-900">{order.id}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">{order.total}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">تنبيهات</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">منتجات منتهية من المخزون: 6 عناصر</div>
            <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-700">طلبات معلقة: 12 طلباً</div>
            <div className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-700">مراجعات جديدة تحتاج موافقة: 3 مراجعات</div>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">إدارة المنتجات</h2>
          <button className="rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">إضافة منتج جديد</button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="min-w-full text-right text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">المنتج</th>
                <th className="px-4 py-3">السعر</th>
                <th className="px-4 py-3">المخزون</th>
                <th className="px-4 py-3">القسم</th>
                <th className="px-4 py-3">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((product) => (
                <tr key={product.id} className="border-t border-slate-200">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="h-12 w-12 rounded-xl object-cover" />
                      <span className="font-medium text-slate-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{product.price} ر.س</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">تعديل</button>
                      <button className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">حذف</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
