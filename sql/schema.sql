-- =========================================================
--  متجر الأزياء — Supabase schema (tables + RLS + storage)
--  شغّلي هذا الملف كامل مرة واحدة من: Supabase Dashboard > SQL Editor
-- =========================================================

-- ---------- EXTENSIONS ----------
create extension if not exists pgcrypto;

-- ---------- التصنيفات / الأقسام ----------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  image_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- المنتجات ----------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  compare_price numeric(10,2),
  image_url text,
  extra_images text[],
  sizes text,        -- مثال: "S,M,L,XL"
  colors text,        -- مثال: "أسود,أبيض,بيج"
  stock int not null default 0,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- الأدمن (من يملك صلاحية التحكم) ----------
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

-- ---------- الطلبات ----------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null default to_char(now(),'YYMMDD') || substr(md5(random()::text),1,5),
  customer_name text not null,
  phone text not null,
  address text,
  notes text,
  status text not null default 'قيد المراجعة', -- قيد المراجعة / قيد التجهيز / تم الشحن / تم التسليم / ملغي
  total numeric(10,2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  size text,
  color text,
  price numeric(10,2) not null,
  quantity int not null default 1,
  subtotal numeric(10,2) not null
);

-- ---------- تحديث updated_at تلقائياً ----------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- =========================================================
--  ROW LEVEL SECURITY
-- =========================================================

alter table public.categories enable row level security;
alter table public.products   enable row level security;
alter table public.admins     enable row level security;
alter table public.orders     enable row level security;
alter table public.order_items enable row level security;

-- Helper: هل المستخدم الحالي أدمن؟
create or replace function public.is_admin()
returns boolean as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$ language sql stable security definer;

-- ---------- categories ----------
drop policy if exists "public read categories" on public.categories;
create policy "public read categories" on public.categories
  for select using (is_active = true or public.is_admin());

drop policy if exists "admin write categories" on public.categories;
create policy "admin write categories" on public.categories
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- products ----------
drop policy if exists "public read products" on public.products;
create policy "public read products" on public.products
  for select using (is_active = true or public.is_admin());

drop policy if exists "admin write products" on public.products;
create policy "admin write products" on public.products
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- admins (يقرأ فقط الأدمن نفسه، الكتابة يدويًا من الداشبورد فقط) ----------
drop policy if exists "admin can read admins" on public.admins;
create policy "admin can read admins" on public.admins
  for select using (public.is_admin());

-- ---------- orders (أي زائر يقدر يعمل طلب، لكن القراءة/التعديل للأدمن فقط) ----------
drop policy if exists "anyone can create order" on public.orders;
create policy "anyone can create order" on public.orders
  for insert with check (true);

drop policy if exists "admin read orders" on public.orders;
create policy "admin read orders" on public.orders
  for select using (public.is_admin());

drop policy if exists "admin update orders" on public.orders;
create policy "admin update orders" on public.orders
  for update using (public.is_admin());

drop policy if exists "admin delete orders" on public.orders;
create policy "admin delete orders" on public.orders
  for delete using (public.is_admin());

-- ---------- order_items ----------
drop policy if exists "anyone can create order items" on public.order_items;
create policy "anyone can create order items" on public.order_items
  for insert with check (true);

drop policy if exists "admin read order items" on public.order_items;
create policy "admin read order items" on public.order_items
  for select using (public.is_admin());

drop policy if exists "admin delete order items" on public.order_items;
create policy "admin delete order items" on public.order_items
  for delete using (public.is_admin());

-- =========================================================
--  STORAGE — صور المنتجات
-- =========================================================

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "public read product images" on storage.objects;
create policy "public read product images" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "admin upload product images" on storage.objects;
create policy "admin upload product images" on storage.objects
  for insert with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "admin update product images" on storage.objects;
create policy "admin update product images" on storage.objects
  for update using (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "admin delete product images" on storage.objects;
create policy "admin delete product images" on storage.objects
  for delete using (bucket_id = 'product-images' and public.is_admin());

-- =========================================================
--  بيانات تجريبية (اختياري — احذفي هذا الجزء لو مش محتاجاه)
-- =========================================================

insert into public.categories (name, slug, sort_order) values
  ('نسائي', 'women', 1),
  ('رجالي', 'men', 2),
  ('إكسسوارات', 'accessories', 3)
on conflict (slug) do nothing;

-- =========================================================
--  بعد تشغيل هذا الملف:
--  1) روحي Authentication > Users > Add user، واعملي حساب الأدمن (إيميل + باسورد).
--  2) انسخي الـ User UID بتاعه.
--  3) شغّلي السطر ده بعد ما تحطي الـ UID الصح مكان YOUR-USER-ID:
--
--     insert into public.admins (user_id, full_name)
--     values ('YOUR-USER-ID', 'اسم الأدمن');
--
--  كده هذا الحساب بقى أدمن ويقدر يدخل لوحة التحكم.
-- =========================================================
