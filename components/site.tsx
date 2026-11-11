"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { company, products } from "@/lib/data";
export function Button({
  href,
  children,
  outline = false,
}: {
  href: string;
  children: React.ReactNode;
  outline?: boolean;
}) {
  return (
    <Link className={`button ${outline ? "outline" : ""}`} href={href}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" aria-label="K B Engineering home" className="logo">
          <Image
            src="/images/logo-original.jpeg"
            alt="K B Engineering Enterprises Private Limited"
            width={208}
            height={104}
            priority
          />
        </Link>
        <nav
          aria-label="Main navigation"
          className={open ? "navigation open" : "navigation"}
        >
          {["Home", "About", "Services", "Products", "Contact"].map((x) => (
            <Link
              aria-current={
                path === (x === "Home" ? "/" : `/${x.toLowerCase()}`)
                  ? "page"
                  : undefined
              }
              key={x}
              href={x === "Home" ? "/" : `/${x.toLowerCase()}`}
            >
              {x}
            </Link>
          ))}
          <Button href="/contact">Request a Quote</Button>
        </nav>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link href="/" className="footer-logo">
            <Image
              src="/images/logo-original.jpeg"
              alt={company.name}
              width={220}
              height={110}
            />
          </Link>
          <p>
            Engineering, procurement and fabrication.
            <br />
            Built around your industrial requirements.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          {["About", "Services", "Products", "Contact"].map((x) => (
            <Link key={x} href={`/${x.toLowerCase()}`}>
              {x}
            </Link>
          ))}
        </div>
        <div>
          <h3>Our products</h3>
          {products.map((x) => (
            <Link key={x.slug} href={`/products/${x.slug}`}>
              {x.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Get in touch</h3>
          <a href={`mailto:${company.email}`}>
            <Mail size={15} />
            {company.email}
          </a>
          <a href="tel:+917339517139">
            <Phone size={15} />
            {company.phone}
          </a>
          <a href={company.map} target="_blank" rel="noreferrer">
            <MapPin size={18} />
            {company.address}
          </a>
          <p>Working hours: 9:00 AM – 6:00 PM</p>
          <a href={company.whatsapp}>
            WhatsApp <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {company.name}
        </span>
        <span>Industrial photographs are illustrative stock imagery.</span>
      </div>
    </footer>
  );
}
export function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((p, i) => (
        <Link
          className={`product-card product-${i}`}
          href={`/products/${p.slug}`}
          key={p.slug}
        >
          <Image
            src={`/images/${p.image}.jpg`}
            alt={p.imageAlt}
            style={{ objectPosition: "center" }}
            fill
            sizes="(max-width:600px) 90vw, (max-width:1000px) 45vw, 20vw"
          />
          <div>
            <h3>{p.name}</h3>
            <span>
              <ArrowUpRight size={19} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="intro-lines" aria-hidden="true" />
    </section>
  );
}
export function ContactCTA() {
  return (
    <section className="contact-cta">
      <div className="container">
        <div>
          <p className="eyebrow">YOUR NEXT PROJECT STARTS HERE</p>
          <h2>
            Let’s discuss your
            <br />
            next project.
          </h2>
          <p>
            Connect with K B Engineering to discuss your engineering,
            <br className="desktop-break" /> procurement and fabrication
            requirements.
          </p>
        </div>
        <div className="cta-actions">
          <Button href="/contact">Request a Quote</Button>
          <a className="text-link" href={company.whatsapp}>
            Contact on WhatsApp <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
