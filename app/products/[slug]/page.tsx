import PageMotion from "@/components/page-motion";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { products } from "@/lib/data";
import { PageIntro, Button } from "@/components/site";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: products.find((p) => p.slug === slug)?.name ?? "Product" };
}
export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main id="main" className="motion-page product-detail-page">
      <PageMotion pageKey={p.slug} />
      <PageIntro
        eyebrow="PRODUCT RANGE"
        title={p.name}
        description={p.description}
      />
      <section className="content-section container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/products">Products</Link> / {p.name}
        </nav>
        <h2 data-page-reveal>
          {p.items.length
            ? "Explore the range"
            : "Discuss your treatment requirements"}
        </h2>
        {p.items.length > 0 ? (
          <ul className="equipment-list">
            {p.items.map((item) => (
              <li key={item}>
                <Check size={18} />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            Share your application, project specifications and equipment
            requirements so our team can discuss the scope with you.
          </p>
        )}
        <p>
          Equipment specifications and supply scope are confirmed for each
          inquiry. Share your requirements to begin the discussion.
        </p>
        <Button href={`/contact?product=${encodeURIComponent(p.name)}`}>
          Inquire About {p.name}
        </Button>
      </section>
    </main>
  );
}
