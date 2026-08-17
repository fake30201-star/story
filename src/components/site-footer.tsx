import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-amber-400 font-bold text-white">
              M
            </div>
            <div>
              <div className="text-lg font-black tracking-[0.12em] text-white">MODA</div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-slate-400">studio</div>
            </div>
          </div>
          <p className="text-sm leading-7 text-slate-400">
            متجر عربي عصري للأزياء والملحقات، يقدم تصاميم أنيقة حديثة مع جودة عالية وراحة يومية.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">روابط سريعة</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="/shop" className="hover:text-white">المتجر</Link></li>
            <li><Link href="/shop?category=women" className="hover:text-white">حريمي</Link></li>
            <li><Link href="/shop?category=men" className="hover:text-white">رجالي</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">حسابي</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">معلومات</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link href="/" className="hover:text-white">سياسة الخصوصية</Link></li>
            <li><Link href="/" className="hover:text-white">الشحن والتوصيل</Link></li>
            <li><Link href="/" className="hover:text-white">سياسة الاسترجاع</Link></li>
            <li><Link href="/" className="hover:text-white">الأسئلة الشائعة</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">تواصل معنا</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>Instagram: @moda.store</li>
            <li>Facebook: /modastudio</li>
            <li>WhatsApp: +966 555 123 456</li>
            <li>Visa / MasterCard / PayPal</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-500">
        جميع الحقوق محفوظة © 2026 MODA Studio
      </div>
    </footer>
  );
}
