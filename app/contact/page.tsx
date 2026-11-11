import PageMotion from "@/components/page-motion";
import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { company } from "@/lib/data";
import { PageIntro } from "@/components/site";
import InquiryForm from "@/components/inquiry-form";
export const metadata: Metadata = { title: "Contact & Request a Quote" };
export default function Contact() {
  return (
    <main id="main" className="motion-page contact-page">
      <PageMotion pageKey="contact" />
      <PageIntro
        eyebrow="CONTACT US"
        title="Let’s discuss your next project."
        description="Connect with K B Engineering to discuss your engineering, procurement and fabrication requirements."
      />
      <section className="container content-section contact-layout">
        <div className="contact-info">
          <p className="eyebrow">START A CONVERSATION</p>
          <h2 data-page-reveal>Connect with our team.</h2>
          <div className="contact-item">
            <Mail />
            <div>
              <strong>Email us</strong>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </div>
          </div>
          <div className="contact-item">
            <Phone />
            <div>
              <strong>Call us</strong>
              <a href="tel:+917339517139">{company.phone}</a>
            </div>
          </div>
          <div className="contact-item">
            <MapPin />
            <div>
              <strong>Find us in Ranipet</strong>
              <p>{company.address}</p>
              <a
                href={company.map}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
          <div className="contact-item">
            <Clock />
            <div>
              <strong>Working hours</strong>
              <p>9:00 AM – 6:00 PM</p>
            </div>
          </div>
          <div className="contact-item">
            <MessageCircle />
            <div>
              <strong>Prefer a quick conversation?</strong>
              <a href={company.whatsapp}>Contact on WhatsApp ↗</a>
            </div>
          </div>
        </div>
        <InquiryForm
          deliveryConfigured={Boolean(
            process.env.RESEND_API_KEY && process.env.INQUIRY_FROM_EMAIL,
          )}
        />
      </section>
    </main>
  );
}
