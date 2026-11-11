"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/data";

const number = (index: number) => String(index + 1).padStart(2, "0");
const annotations = [
  "INTEGRATED PACKAGES",
  "PROCESS & THERMAL APPLICATIONS",
  "WELL TESTING EQUIPMENT",
  "POWER GENERATION SYSTEMS",
  "TREATMENT APPLICATIONS",
];

export default function ProductExplorer() {
  const root = useRef<HTMLElement>(null);
  const navigation = useRef<((index: number) => void) | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = root.current;
    if (!section) return;
    const panels = Array.from(
      section.querySelectorAll<HTMLElement>(".explorer-panel"),
    );
    const media = gsap.matchMedia();
    let disposed = false;
    media.add(
      {
        desktop: "(min-width: 1000px) and (min-height: 650px)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (!context.conditions?.motion) return;
        const desktop = Boolean(context.conditions.desktop);
        const animation = gsap.context(() => {
          if (!desktop) {
            panels.forEach((panel) => {
              gsap.fromTo(
                panel.querySelector(".explorer-visual"),
                { clipPath: "inset(0 12% 0 0)" },
                {
                  clipPath: "inset(0 0% 0 0)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel.querySelector(".explorer-visual"),
                    start: "top 94%",
                    end: "top 48%",
                    scrub: 0.3,
                  },
                },
              );
            });
            return;
          }

          section.classList.add("is-enhanced");
          gsap.set(panels, { autoAlpha: 0 });
          gsap.set(panels[0], { autoAlpha: 1 });
          const stops = [0];
          let selected = -1;
          const select = (index: number) => {
            if (selected === index) return;
            selected = index;
            panels.forEach((panel, i) => {
              panel.inert = i !== index;
              panel.setAttribute("aria-hidden", String(i !== index));
            });
            setActive(index);
          };
          const timeline = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: section.querySelector(".explorer-stage"),
              start: () =>
                `top top+=${document.querySelector("header")?.offsetHeight ?? 105}`,
              end: () =>
                `+=${Math.max(1600, Math.min(2200, window.innerHeight * 2.5))}`,
              pin: true,
              scrub: 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
            onUpdate: function () {
              const time = this.time();
              let index = 0;
              for (let i = 1; i < stops.length; i++)
                if (time >= stops[i] + 0.35) index = i;
              select(index);
              gsap.set(section.querySelector(".explorer-progress-fill"), {
                scaleX: this.progress(),
              });
            },
          });
          timeline.to({}, { duration: 0.45 });
          panels.slice(1).forEach((panel, i) => {
            const start = 0.45 + i * 1.25;
            stops.push(start);
            timeline
              .set(panel, { autoAlpha: 1 }, start)
              .to(
                panels[i].querySelector(".explorer-copy"),
                { y: -20, autoAlpha: 0, duration: 0.35 },
                start,
              )
              .fromTo(
                panel.querySelector(".explorer-visual"),
                { clipPath: "inset(100% 0 0 0)" },
                { clipPath: "inset(0% 0 0 0)", duration: 0.85 },
                start,
              )
              .fromTo(
                panel.querySelector(".explorer-visual img"),
                { scale: 1.08 },
                { scale: 1, duration: 1 },
                start,
              )
              .fromTo(
                panel.querySelector(".explorer-copy"),
                { y: 20, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.6 },
                start + 0.25,
              )
              .fromTo(
                panel.querySelectorAll(".explorer-word"),
                { yPercent: 105 },
                { yPercent: 0, duration: 0.6, stagger: 0.035 },
                start + 0.25,
              )
              .to({}, { duration: 0.25 }, start + 1);
          });
          select(0);
          navigation.current = (index) => {
            const trigger = timeline.scrollTrigger;
            if (!trigger) return;
            const time = index === 0 ? 0 : stops[index] + 0.92;
            window.scrollTo({
              top:
                trigger.start +
                (time / timeline.duration()) * (trigger.end - trigger.start),
              behavior: "smooth",
            });
          };
        }, section);
        return () => {
          navigation.current = null;
          animation.revert();
          section.classList.remove("is-enhanced");
          panels.forEach((panel) => {
            panel.inert = false;
            panel.removeAttribute("aria-hidden");
          });
        };
      },
    );
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    const images = Array.from(section.querySelectorAll("img"));
    images.forEach((img) =>
      img.addEventListener("load", refresh, { once: true }),
    );
    return () => {
      disposed = true;
      images.forEach((img) => img.removeEventListener("load", refresh));
      media.revert();
    };
  }, []);

  function choose(index: number) {
    if (navigation.current) navigation.current(index);
    else
      root.current
        ?.querySelector(`#explore-${products[index].slug}`)
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "start",
        });
  }

  return (
    <section
      ref={root}
      className="product-explorer"
      id="product-explorer"
      aria-label="Explore our product categories"
    >
      <div className="container explorer-stage">
        <div className="explorer-overline">
          <span>THE PRODUCT COLLECTION</span>
          <a href="#product-directory">
            Jump to full directory <ArrowDown size={13} />
          </a>
        </div>
        <div className="explorer-panels">
          {products.map((product, i) => (
            <article
              className="explorer-panel"
              style={{ zIndex: i + 1 }}
              id={`explore-${product.slug}`}
              key={product.slug}
              aria-labelledby={`title-${product.slug}`}
            >
              <div className="explorer-copy">
                <p className="explorer-index">
                  <strong>{number(i)}</strong>
                  <span>/ {String(products.length).padStart(2, "0")}</span>
                </p>
                <h2 id={`title-${product.slug}`}>
                  {product.name.split(" ").map((word, j) => (
                    <span className="explorer-word-mask" key={j}>
                      <span className="explorer-word">{word}</span>{" "}
                    </span>
                  ))}
                </h2>
                <p className="explorer-description">{product.description}</p>
                <Link
                  className="explorer-link"
                  href={`/products/${product.slug}`}
                >
                  Explore Category <ArrowUpRight size={20} />
                </Link>
                <p className="explorer-smallprint">
                  {product.items.length
                    ? `${String(product.items.length).padStart(2, "0")} equipment types in this range`
                    : "Discuss your treatment requirements"}
                </p>
              </div>
              <figure className={`explorer-visual explorer-photo-${i}`}>
                <Image
                  src={`/images/${product.image}.jpg`}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 999px) 90vw, 58vw"
                  style={{ objectFit: "cover" }}
                />
                <div className="explorer-photo-corners" aria-hidden="true" />
                <figcaption>
                  <span>{annotations[i]}</span>
                  <span>KB / {number(i)}</span>
                </figcaption>
              </figure>
            </article>
          ))}
        </div>
        <div className="explorer-footer">
          <nav aria-label="Select a product category">
            {products.map((p, i) => (
              <button
                type="button"
                className={active === i ? "active" : ""}
                aria-label={`Explore ${p.name}`}
                aria-current={active === i ? "step" : undefined}
                key={p.slug}
                onClick={() => choose(i)}
              >
                {number(i)}
                <span>{p.name}</span>
              </button>
            ))}
          </nav>
          <div className="explorer-progress" aria-hidden="true">
            <div className="explorer-progress-fill" />
          </div>
          <span className="explorer-scroll-hint">
            SCROLL TO EXPLORE <ArrowDown size={13} />
          </span>
        </div>
      </div>
    </section>
  );
}
