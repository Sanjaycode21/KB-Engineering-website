import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { products } from "@/lib/data";
import ProductExplorer from "@/components/product-explorer";
import ProductsMotion from "@/components/products-motion";
import { Button } from "@/components/site";
import "./products.css";

export const metadata: Metadata = {
  title: "Industrial Equipment & Packages",
  description:
    "Explore K B Engineering's skid mounted packages, process equipment, well testing units, power plant equipment and sludge treatment plant range.",
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
              <a className="collection-discover" href="#product-explorer">
                <span className="collection-discover-icon">
                  <ArrowDown size={18} />
                </span>{" "}
                Discover the collection
              </a>
            </div>
            <figure className="collection-hero-photo">
              <Image
                src="/images/hero-process.jpg"
                alt="Illustrative industrial boiler, cylindrical equipment and connected pipework"
                fill
                priority
                sizes="(max-width:800px) 90vw, 48vw"
                style={{ objectFit: "cover", objectPosition: "62% center" }}
              />
              <figcaption>
                <span>INDUSTRIAL EQUIPMENT & SYSTEMS</span>
                <span>KB / EPF</span>
              </figcaption>
            </figure>
          </div>
          <div className="collection-hero-bottom">
            <span>FIVE EQUIPMENT GROUPS. ONE CONNECTED EPF OFFERING.</span>
            <a href="#product-directory">
              Already know what you need? <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
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
            {products.map((product, i) => (
              <details
                className="directory-row"
                key={product.slug}
                open={i === 0}
              >
                <summary>
                  <span className="directory-number">
                    {String(i + 1).padStart(2, "0")}
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
              Explore our EPF services <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
