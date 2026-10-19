# SCIN CARE
Responsive skincare storefront with carousel, categories, featured products, promotion banner, cart preview, and Supabase-ready login/product catalog.

## Setup
1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL Editor.
3. Enable Email authentication in Supabase Authentication settings.
4. Replace placeholders in `config.js` with your Supabase project URL and **publishable/anon** key (never a secret/service-role key).
5. Upload product images into the `product-images` Storage bucket. Copy public image URLs into the `image_url` column of your products.
6. Add products through the Supabase Table Editor. Public visitors can only read active products; they cannot write them.
7. Host the files with GitHub Pages (Settings → Pages → Deploy from branch → main / root).

Before Supabase configuration, demo products appear and sign-in displays a setup message. After configuration, the product grid loads real cloud records. Cart is a local browser preview, **not checkout/payment processing**. Currency and promotional text are demonstration content; update them before launch.
