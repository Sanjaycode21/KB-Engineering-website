import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Layers3, HardHat, Factory } from "lucide-react";
import { Button, ContactCTA, ProductGrid } from "@/components/site";
import Motion from "@/components/motion";
import ServicesMotion from "@/components/services-motion";
import Hero from "@/components/hero";
import EngineeringGeometry from "@/components/engineering-geometry";
import { services } from "@/lib/data";
import SectionDivider from "@/components/section-divider";
export default function Home() {
  return (
    <main id="main" className="home">
      <Motion />
      <ServicesMotion />
      <Hero />
      <section id="about" className="about-section">
        <div className="container about-grid">
          <div className="about-visual" data-reveal>
            <div className="about-image">
              <Image
                src="/images/welding.jpg"
                alt="Illustrative metal fabrication work with sparks"
                fill
                sizes="(max-width:760px) 100vw, 45vw"
              />
            </div>
            <div className="image-tag">IDEAS. ENGINEERED INTO REALITY.</div>
          </div>
          <div className="about-copy" data-reveal>
            <p className="eyebrow">ABOUT K B ENGINEERING</p>
            <h2>
              Specialized in Engineering,
              <br className="desktop-break" /> Procurement and Fabrication
            </h2>
            <p>
              K B Engineering Enterprises Private Limited brings engineering,
              material procurement and fabrication together for industrial
              equipment and process systems.
            </p>
            <div className="expertise">
              {[
                [Compass, "Engineering", "Technical planning"],
                [Layers3, "Procurement", "Material sourcing"],
                [HardHat, "Fabrication", "Manufacturing & assembly"],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof Compass;
                return (
                  <div key={String(title)}>
                    <I />
                    <div>
                      <strong>{String(title)}</strong>
                      <small>{String(text)}</small>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button outline href="/about">
              Know More About Us
            </Button>
          </div>
        </div>
      </section>
      <SectionDivider />
      <section className="services-section">
        <EngineeringGeometry variant="services" />
        <div className="container services-layout">
          <div className="services-heading" data-reveal>
            <p className="eyebrow">OUR SERVICES</p>
            <h2>
              A complete <br />
              EPF solution.
            </h2>
            <span className="gold-rule" />
            <p>
              From technical planning to fabrication, connected services for
              your industrial requirements.
            </p>
            <Link className="text-link" href="/services">
              Explore our services <ArrowRight size={17} />
            </Link>
          </div>
          <div className="services-grid">
            {services.map((s, i) => {
              const Icon = [Compass, Layers3, HardHat][i];
              return (
                <div className="service-card-reveal" key={s.name}>
                  <Link
                    href={`/services#${s.name.toLowerCase()}`}
                    className="service-card"
                  >
                    <div className="service-image">
                      <Image
                        src={`/images/${s.image}.jpg`}
                        alt={s.imageAlt}
                        fill
                        sizes="(max-width:760px) 90vw, 25vw"
                      />
                    </div>
                    <div className="service-content">
                      <div className="service-top">
                        <Icon size={35} strokeWidth={1.3} />
                        <span>0{i + 1}</span>
                      </div>
                      <h3>{s.name}</h3>
                      <p>{s.description}</p>
                      <ArrowUpRightIcon />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <SectionDivider />
      <section className="products-section">
        <div className="container">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">OUR PRODUCTS</p>
              <h2>Industrial Equipment & Packages</h2>
            </div>
            <p>
              Equipment and packages for
              <br />
              diverse industrial applications.
            </p>
          </div>
          <ProductGrid />
          <div className="products-foot">
            <span>
              Explore our range. Find the right starting point for your project.
            </span>
            <Link href="/products" className="text-link">
              View all products <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <SectionDivider />
      <section className="why">
        <EngineeringGeometry variant="finished" />
        <div className="container why-content">
          <div className="why-grid">
            <div className="why-introduction" data-reveal>
              <p className="eyebrow">WHY K B ENGINEERING</p>
              <h2>
                Built around your
                <br />
                industrial requirements.
              </h2>
              <p className="why-lead">
                Engineering, procurement and fabrication brought together around
                the equipment your project needs.
              </p>
              <p className="why-intro-detail">
                From a single process vessel to an integrated package, the
                starting point is your application, specifications and supply
                scope.
              </p>
              <Button outline href="/contact">
                Discuss Your Requirements
              </Button>
              <p className="why-location">Based in Ranipet, Tamil Nadu.</p>
            </div>
            <div className="why-benefits">
              {[
                {
                  Icon: Compass,
                  title: "Engineering around your requirements",
                  text: "Technical planning begins with your application, drawings and specifications, helping define the equipment and engineering scope for discussion.",
                },
                {
                  Icon: Layers3,
                  title: "Procurement with a defined scope",
                  text: "Material and equipment sourcing forms part of the EPF offering. Share specifications, quantities and supply requirements to frame your procurement needs.",
                },
                {
                  Icon: HardHat,
                  title: "Fabrication and package assembly",
                  text: "Manufacturing and assembly cover industrial equipment, structures and packages, bringing the agreed engineering scope into the fabrication conversation.",
                },
                {
                  Icon: Factory,
                  title: "A focused industrial product range",
                  text: "Explore equipment for process systems, well testing, power plants and treatment applications, alongside modular and skid mounted packages.",
                },
              ].map(({ Icon, title, text }, i) => (
                <article className="why-benefit" key={title}>
                  <div className="why-benefit-top">
                    <Icon size={32} strokeWidth={1.25} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="why-range" data-reveal>
            <div>
              <p className="eyebrow">EQUIPMENT & PACKAGES</p>
              <p>
                Find the right starting point
                <br />
                for your application.
              </p>
            </div>
            <div className="why-range-links">
              <Link href="/products/skid-mounted-packages">
                Skid Mounted Packages <ArrowRight size={15} />
              </Link>
              <Link href="/products/process-equipment">
                Process Equipment <ArrowRight size={15} />
              </Link>
              <Link href="/products/well-testing-units">
                Well Testing Units <ArrowRight size={15} />
              </Link>
              <Link href="/products/power-plant-equipment">
                Power Plant Equipment <ArrowRight size={15} />
              </Link>
              <Link href="/products/sludge-treatment-plant">
                Sludge Treatment Plant <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
        <svg
          className="technical-drawing"
          viewBox="0 0 1400 100"
          aria-hidden="true"
        >
          <path
            className="technical-line"
            pathLength="1000"
            strokeDasharray="1000"
            d="M0 75 H240 L280 25 H590 L630 75 H920 L960 25 H1400"
          />
        </svg>
      </section>
      <SectionDivider />
      <ContactCTA />
    </main>
  );
}
function ArrowUpRightIcon() {
  return (
    <span className="service-arrow">
      <ArrowRight size={17} />
    </span>
  );
}
