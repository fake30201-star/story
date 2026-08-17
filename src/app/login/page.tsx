import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-md rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-400 text-xl font-black text-white">M</div>
          <h1 className="text-3xl font-black text-slate-900">تسجيل الدخول</h1>
        </div>

        <form className="space-y-5">
          <label className="block space-y-2 text-sm text-slate-600">
            <span>البريد الإلكتروني</span>
            <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-rose-500" placeholder="name@example.com" />
          </label>
          <label className="block space-y-2 text-sm text-slate-600">
            <span>كلمة المرور</span>
            <input type="password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 outline-none focus:border-rose-500" placeholder="••••••••" />
          </label>

          <div className="flex items-center justify-between text-sm text-slate-500">
            <label className="flex items-center gap-2"><input type="checkbox" /> تذكرني</label>
            <Link href="/" className="text-rose-600">نسيت كلمة المرور؟</Link>
          </div>

          <button className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600">تسجيل الدخول</button>
        </form>

        <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-slate-400">
          <div className="h-px flex-1 bg-slate-200" />
          <span>أو</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="space-y-3">
          <button className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-rose-500 hover:text-rose-600">تسجيل الدخول بحساب Google</button>
          <button className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-rose-500 hover:text-rose-600">تسجيل الدخول بحساب Facebook</button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          ليس لديك حساب؟ <Link href="/signup" className="font-semibold text-rose-600">إنشاء حساب</Link>
        </p>
      </div>
    </div>
  );
}
