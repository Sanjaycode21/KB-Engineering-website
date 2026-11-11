"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProductsMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector(".products-showcase");
    if (!root) return;
    const media = gsap.matchMedia();
    let disposed = false;
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const animation = gsap.context(() => {
        gsap.fromTo(
          ".collection-hero-line > span",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.13, ease: "power3.out" },
        );
        gsap.fromTo(
          ".collection-hero-photo",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power3.inOut" },
        );
        gsap.fromTo(
          ".collection-hero-photo img",
          { scale: 1.08 },
          { scale: 1, duration: 1.6, ease: "power2.out" },
        );
        gsap.to(".collection-hero-photo img", {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: ".collection-hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.utils
          .toArray<HTMLElement>(
            ".directory-row, .directory-intro, .collection-inquiry > .container > div",
          )
          .forEach((el) => {
            gsap.fromTo(
              el,
              { y: 24, opacity: 0.3 },
              {
                y: 0,
                opacity: 1,
                duration: 0.75,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 94%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });
      }, root);
      return () => animation.revert();
    });
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    const images = Array.from(root.querySelectorAll("img"));
    images.forEach((img) =>
      img.addEventListener("load", refresh, { once: true }),
    );
    const directoryRows = Array.from(root.querySelectorAll("details"));
    directoryRows.forEach((row) => row.addEventListener("toggle", refresh));
    return () => {
      disposed = true;
      images.forEach((img) => img.removeEventListener("load", refresh));
      directoryRows.forEach((row) =>
        row.removeEventListener("toggle", refresh),
      );
      media.revert();
    };
  }, []);
  return null;
}
