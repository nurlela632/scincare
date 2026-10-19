-- Run in Supabase SQL Editor. Product images should be uploaded to the public 'product-images' storage bucket.
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 category text not null,
 price numeric(10,2) not null check(price>=0),
 image_url text,
 affiliate_url text,
 badge text,
 active boolean not null default true,
 created_at timestamptz not null default now()
);
alter table public.products enable row level security;
create policy "Public can view active products" on public.products for select to anon, authenticated using (active = true);
insert into storage.buckets (id,name,public) values ('product-images','product-images',true) on conflict(id) do nothing;
create policy "Public can view product images" on storage.objects for select to public using (bucket_id='product-images');
-- Product and image uploads should be performed by trusted admins in the Supabase dashboard.

-- For databases created using the previous schema:
alter table public.products add column if not exists affiliate_url text;
