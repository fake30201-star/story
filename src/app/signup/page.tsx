import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-400 text-xl font-black text-white">M</div>
          <h1 className="text-3xl font-black text-slate-900">إنشاء حساب</h1>
        </div>

        <form className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 sm:col-span-2">
            <span>الاسم الكامل</span>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-rose-500" placeholder="الاسم الكامل" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 sm:col-span-2">
            <span>البريد الإلكتروني</span>
            <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-rose-500" placeholder="example@email.com" />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>رقم الهاتف</span>
            <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-rose-500" placeholder="966500000000" />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>كلمة المرور</span>
            <input type="password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-rose-500" placeholder="••••••••" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 sm:col-span-2">
            <span>تأكيد كلمة المرور</span>
            <input type="password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-rose-500" placeholder="••••••••" />
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-600 sm:col-span-2">
            <input type="checkbox" />
            أوافق على الشروط والأحكام
          </label>

          <button className="sm:col-span-2 w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600">
            إنشاء حساب
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          لديك حساب بالفعل؟ <Link href="/login" className="font-semibold text-rose-600">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
}
