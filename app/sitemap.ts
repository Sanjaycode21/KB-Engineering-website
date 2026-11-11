import type { MetadataRoute } from "next";
import { products } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!process.env.SITE_URL) return [];
  const origin = process.env.SITE_URL.replace(/\/$/, "");
  return [
    "",
    "/about",
    "/services",
    "/products",
    "/contact",
    ...products.map((p) => `/products/${p.slug}`),
  ].map((path) => ({ url: `${origin}${path}` }));
}
