-- SCIN CARE multi-platform affiliate schema. Run once in Supabase SQL Editor.
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 category text not null,
 description text,
 price numeric(10,2) check (price >= 0),
 currency text not null default 'USD',
 image_url text,
 badge text,
 active boolean not null default true,
 featured boolean not null default false,
 created_at timestamptz not null default now()
);
alter table public.products add column if not exists description text;
alter table public.products add column if not exists currency text not null default 'USD';
alter table public.products add column if not exists featured boolean not null default false;
alter table public.products add column if not exists affiliate_url text;
alter table public.products enable row level security;
drop policy if exists "Public can view active products" on public.products;
create policy "Public can view active products" on public.products for select to anon, authenticated using (active=true);

create table if not exists public.affiliate_offers (
 id uuid primary key default gen_random_uuid(),
 product_id uuid not null references public.products(id) on delete cascade,
 platform text not null,
 affiliate_url text not null check (affiliate_url ~* '^https://'),
 price numeric(10,2) check (price >= 0),
 currency text not null default 'USD',
 is_primary boolean not null default false,
 active boolean not null default true,
 created_at timestamptz not null default now()
);
create index if not exists affiliate_offers_product_idx on public.affiliate_offers(product_id);
alter table public.affiliate_offers enable row level security;
drop policy if exists "Public can view active offers" on public.affiliate_offers;
create policy "Public can view active offers" on public.affiliate_offers for select to anon, authenticated
using (active=true and exists (select 1 from public.products p where p.id=product_id and p.active=true));

insert into storage.buckets(id,name,public) values ('product-images','product-images',true) on conflict(id) do nothing;
drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images" on storage.objects for select to public using(bucket_id='product-images');
-- No anonymous insert/update/delete policies: manage data and uploads as project admin in dashboard.
-- Enter affiliate offers in affiliate_offers; legacy products.affiliate_url remains supported.
