import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { industrialCategories, products } from "@/lib/data";
import ProductExplorer from "@/components/product-explorer";
import ProductsMotion from "@/components/products-motion";
import { Button, ProductGrid } from "@/components/site";
import "./products.css";

export const metadata: Metadata = {
  title: "Industrial Equipment & Packages",
  description:
    "Explore K B Engineering's pressure vessels, heat exchangers, piping, process equipment, power plant duct systems, heavy structures and industrial packages.",
};

export default function Products() {
  return (
    <main id="main" className="products-showcase">
      <ProductsMotion />
      <section className="collection-hero">
        <div className="container">
          <div className="collection-topline">
            <p className="eyebrow">OUR PRODUCTS</p>
            <span>ENGINEERING / PROCUREMENT / FABRICATION</span>
          </div>
          <div className="collection-hero-grid">
            <div className="collection-hero-copy">
              <h1>
                <span className="collection-hero-line">
                  <span>Engineered for</span>
                </span>
                <span className="collection-hero-line">
                  <span>
                    Industry<span className="collection-period">.</span>
                  </span>
                </span>
              </h1>
              <p>
                From integrated process packages to specialized industrial
                equipment, explore solutions built around complex engineering
                requirements.
              </p>
              <a className="collection-discover" href="#industrial-categories">
                <span className="collection-discover-icon">
                  <ArrowDown size={18} />
                </span>{" "}
                Discover the collection
              </a>
            </div>
            <figure className="collection-hero-photo">
              <Image
                src="/images/product-components-hero.png"
                alt="Illustration of a heat exchanger tube bundle and fabricated pipe components in a workshop"
                fill
                priority
                sizes="(max-width:800px) 90vw, 48vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <figcaption>
                <span>INDUSTRIAL EQUIPMENT & SYSTEMS</span>
                <span>KB / EPC SOLUTION</span>
              </figcaption>
            </figure>
          </div>
          <div className="collection-hero-bottom">
            <span>ELEVEN PRODUCT CATEGORIES. ONE CONNECTED EPC SOLUTION.</span>
            <a href="#product-directory">
              Already know what you need? <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
      <section
        className="industrial-categories container"
        id="industrial-categories"
        aria-labelledby="industrial-categories-title"
      >
        <h2 id="industrial-categories-title">Industrial equipment & structures</h2>
        <ProductGrid />
      </section>
      <ProductExplorer />
      <section
        className="product-directory"
        id="product-directory"
        aria-labelledby="directory-title"
      >
        <div className="container">
          <div className="directory-intro">
            <div>
              <p className="eyebrow">FULL PRODUCT DIRECTORY</p>
              <h2 id="directory-title">The complete range.</h2>
            </div>
            <p>
              Find a specific item, explore a category,
              <br />
              or share your equipment requirements.
            </p>
          </div>
          <div className="directory-list">
            {industrialCategories.map((category, i) => (
              <Link
                className="directory-row directory-category"
                key={category.slug}
                href={category.href}
              >
                <span className="directory-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{category.name}</h3>
                <ArrowUpRight size={20} className="directory-toggle" />
              </Link>
            ))}
            {products.map((product, i) => (
              <details
                className="directory-row"
                key={product.slug}
                open={i === 0}
              >
                <summary>
                  <span className="directory-number">
                    {String(industrialCategories.length + i + 1).padStart(2, "0")}
                  </span>
                  <h3>{product.name}</h3>
                  <span className="directory-count">
                    {product.items.length
                      ? `${product.items.length} equipment types`
                      : "Project requirements"}
                  </span>
                  <Plus size={20} className="directory-toggle" />
                </summary>
                <div className="directory-content">
                  <p>{product.description}</p>
                  {product.items.length > 0 && (
                    <ul>
                      {product.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  <Link
                    href={`/products/${product.slug}`}
                    className="directory-link"
                  >
                    Explore {product.name} <ArrowUpRight size={17} />
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="collection-inquiry">
        <div className="container">
          <div>
            <p className="eyebrow">LET’S DEFINE YOUR REQUIREMENTS</p>
            <h2>
              Your specifications.
              <br />
              Our starting point.
            </h2>
            <p>
              Tell us about your application, equipment list and project scope.
            </p>
          </div>
          <div>
            <Button href="/contact">Discuss Your Project</Button>
            <Link href="/services" className="collection-services-link">
              Explore our EPC Solution <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
