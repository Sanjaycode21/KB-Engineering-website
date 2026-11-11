"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/site";
import EngineeringGeometry from "@/components/engineering-geometry";

const slides = [
  {
    image: "refinery",
    alt: "Illustrative oil refinery and industrial process structures",
    position: "65% 53%",
    eyebrow: "ENGINEERING / PROCUREMENT / FABRICATION",
    title: ["Integrated", "Engineering", "& Fabrication", "Solutions."],
    description:
      "Engineering, procurement and fabrication solutions for industrial equipment and process systems.",
    cta: "Explore Our Capabilities",
    href: "/services",
    caption: "CONNECTED INDUSTRIAL SOLUTIONS",
  },
  {
    image: "hero-process",
    alt: "Illustrative industrial boiler, cylindrical equipment and connected pipework",
    position: "70% 50%",
    eyebrow: "INDUSTRIAL EQUIPMENT / PROCESS SYSTEMS",
    title: ["Industrial", "Equipment", "& Process", "Systems."],
    description:
      "Explore skid mounted packages, process equipment, well testing units and power plant equipment.",
    cta: "Explore Our Products",
    href: "/products",
    caption: "EQUIPMENT FOR YOUR APPLICATION",
  },
  {
    image: "hero-fabrication",
    alt: "Illustrative welder in protective equipment fabricating metal profiles in a workshop",
    position: "70% 45%",
    eyebrow: "FABRICATION / MANUFACTURING / ASSEMBLY",
    title: ["Precision", "Fabrication", "& Package", "Assembly."],
    description:
      "Manufacturing and assembling industrial equipment, structures and packages around your project requirements.",
    cta: "Discuss Your Project",
    href: "/contact?service=Fabrication",
    caption: "FROM SPECIFICATION TO FABRICATION",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const section = useRef<HTMLElement>(null);
  const slide = slides[active];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setMotionAllowed(!media.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion();
    media.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && !document.hidden),
      { threshold: 0.15 },
    );
    if (section.current) observer.observe(section.current);
    return () => {
      media.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (focused || !visible || !motionAllowed) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % slides.length),
      4000,
    );
    return () => window.clearTimeout(timer);
  }, [active, focused, visible, motionAllowed]);

  function select(index: number) {
    setActive((index + slides.length) % slides.length);
  }

  return (
    <section
      className="hero"
      ref={section}
      aria-label="K B Engineering capabilities"
      aria-roledescription="carousel"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          e.preventDefault();
          select(active + (e.key === "ArrowRight" ? 1 : -1));
        }
      }}
    >
      <div className="hero-photo">
        {slides.map((s, i) => (
          <div
            className={`hero-slide-image ${i === active ? "is-active" : ""}`}
            key={s.image}
            aria-hidden={i !== active}
          >
            <Image
              src={`/images/${s.image}.jpg`}
              alt={s.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              style={{ objectFit: "cover", objectPosition: s.position }}
            />
          </div>
        ))}
      </div>
      <div className="hero-shade" />
      <EngineeringGeometry variant="hero" />
      <div className="metal-composition" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`metal-piece metal-${i}`} />
        ))}
      </div>
      <div className="container hero-inner">
        <div
          className="hero-copy"
          aria-live={focused || !motionAllowed ? "polite" : "off"}
          aria-atomic="true"
        >
          <div
            key={active}
            className="hero-slide-copy"
            role="group"
            aria-roledescription="slide"
            aria-label={`${active + 1} of ${slides.length}`}
          >
            <p className="eyebrow">{slide.eyebrow}</p>
            <h1>
              {slide.title.map((line, i) => (
                <span className="hero-title-line" key={line}>
                  {i === 3 ? <em>{line}</em> : line}
                </span>
              ))}
            </h1>
            <p className="hero-description">{slide.description}</p>
            <div className="hero-actions">
              <Button href={slide.href}>{slide.cta}</Button>
              <Link href="/contact" className="hero-secondary">
                Request a Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-caption">
          <span className="hero-slide-caption">{slide.caption}</span>
          <div
            className="hero-controls"
            role="group"
            aria-label="Hero slide controls"
          >
            <strong className="hero-count">
              0{active + 1} / 0{slides.length}
            </strong>
            <div className="hero-dots">
              {slides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  className={i === active ? "active" : ""}
                  aria-label={`Show slide ${i + 1}: ${s.title.join(" ")}`}
                  aria-pressed={i === active}
                  onClick={() => select(i)}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => select(active - 1)}
            >
              <ChevronLeft size={21} />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => select(active + 1)}
            >
              <ChevronRight size={21} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
