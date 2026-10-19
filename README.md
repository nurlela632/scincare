# SCIN CARE — Affiliate Skincare Discovery

Static GitHub Pages affiliate website. Visitors browse categories and featured products and follow **Buy Now** links to third-party retailers in a new tab. No customer login, cart, checkout or payment processing.

## Publish
GitHub Pages: Settings → Pages → Deploy from branch → main → /(root).

## Connect Supabase (optional cloud catalog)
1. Create a Supabase project.
2. Run `supabase/schema.sql` in its SQL Editor.
3. Copy the project URL and **public publishable/anon key** into `config.js`. Never commit service-role keys, database passwords, or secret keys.
4. Upload product images to the public `product-images` Storage bucket and copy their public URLs.
5. Add rows in Table Editor → products, including `name`, `category`, `price`, `image_url`, and `affiliate_url` (the full approved affiliate destination URL). Set `active=true`.
6. Only public active products are readable from the browser. Admins manage product data in Supabase.

Without Supabase configuration, demo product cards are shown with **Link Coming Soon** instead of fake affiliate destinations. Once connected, real cloud products replace demo entries.

## Affiliate guidance
Add a visible affiliate disclosure and follow each partner's program rules. Only use approved product images and genuine offers. The price and promotion sections in the template are illustrative; verify actual retailer prices and remove outdated promotions before promoting the site. External links use `target="_blank"` with `rel="noopener noreferrer sponsored nofollow"`.
