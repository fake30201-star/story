import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[60vh] items-center justify-center py-16">
      <div className="rounded-[30px] border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div className="text-6xl">😵</div>
        <h1 className="mt-6 text-3xl font-black text-slate-900">الصفحة غير موجودة</h1>
        <p className="mt-3 text-slate-600">الرابط الذي تحاول الوصول إليه غير موجود أو تم نقله.</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-600">
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </div>
  );
}
