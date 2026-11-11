import type { Metadata } from "next";
import Image from "next/image";
import ServicesMotion from "@/components/services-motion";
import { services } from "@/lib/data";
import { PageIntro, ContactCTA, Button } from "@/components/site";
export const metadata: Metadata = { title: "Services" };
export default function Services() {
  return (
    <main id="main" className="services-page">
      <ServicesMotion variant="page" />
      <PageIntro
        eyebrow="OUR SERVICES"
        title="A complete EPF solution."
        description="Engineering, procurement and fabrication services connected around your industrial requirements."
      />
      {services.map((s, i) => (
        <section
          id={s.name.toLowerCase()}
          className="service-detail"
          key={s.name}
        >
          <div className="container two-column">
            <div className="content-image">
              <Image
                src={`/images/${s.image}.jpg`}
                alt={s.imageAlt}
                fill
                sizes="(max-width:800px) 100vw, 50vw"
              />
            </div>
            <div className="service-detail-copy">
              <p className="eyebrow">0{i + 1} / OUR EXPERTISE</p>
              <h2>{s.name}</h2>
              <p>{s.description}</p>
              <p>{s.detail}</p>
              <Button outline href={`/contact?service=${s.name}`}>
                Discuss Your Requirements
              </Button>
            </div>
          </div>
        </section>
      ))}
      <ContactCTA />
    </main>
  );
}
