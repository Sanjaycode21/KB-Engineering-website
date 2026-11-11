import PageMotion from "@/components/page-motion";
import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro, ContactCTA } from "@/components/site";
export const metadata: Metadata = { title: "About" };
export default function About() {
  return (
    <main id="main" className="motion-page about-page">
      <PageMotion pageKey="about" />
      <PageIntro
        eyebrow="ABOUT K B ENGINEERING"
        title="Engineering with a connected approach."
        description="Specialized in Engineering, Procurement and Fabrication. Based in Ranipet, Tamil Nadu."
      />
      <section className="content-section container">
        <div className="two-column">
          <div className="content-image">
            <Image
              src="/images/welding.jpg"
              alt="Illustrative industrial metal fabrication"
              fill
              sizes="(max-width:800px) 100vw, 50vw"
            />
          </div>
          <div data-page-reveal>
            <p className="eyebrow">FROM REQUIREMENT TO EQUIPMENT</p>
            <h2>
              One focus.
              <br />
              Your industrial requirements.
            </h2>
            <p>
              K B Engineering Enterprises Private Limited provides engineering,
              procurement and fabrication solutions for industrial equipment and
              process systems.
            </p>
            <p>
              Our product range spans skid mounted packages, process equipment,
              well testing units, power plant equipment and sludge treatment
              plant requirements.
            </p>
            <p>
              Talk to our team about your specifications, project scope and
              equipment needs.
            </p>
          </div>
        </div>
        <div className="approach">
          <article>
            <h3>Understand the scope</h3>
            <p>
              Start with your application, specifications and equipment
              requirements.
            </p>
          </article>
          <article>
            <h3>Connect the disciplines</h3>
            <p>
              Bring engineering, material procurement and fabrication into the
              same conversation.
            </p>
          </article>
          <article>
            <h3>Define the solution</h3>
            <p>
              Discuss a practical equipment or package scope for your industrial
              application.
            </p>
          </article>
        </div>
      </section>
      <ContactCTA />
    </main>
  );
}
