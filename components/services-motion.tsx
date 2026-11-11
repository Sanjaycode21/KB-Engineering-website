"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ServicesMotion({
  variant = "home",
}: {
  variant?: "home" | "page";
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector(
      variant === "home" ? ".home" : ".services-page",
    );
    if (!root) return;
    const media = gsap.matchMedia();
    let disposed = false;
    media.add(
      {
        desktop: "(min-width: 801px)",
        mobile: "(max-width: 800px)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (!context.conditions?.motion) return;
        const desktop = Boolean(context.conditions.desktop);
        const animation = gsap.context(() => {
          if (variant === "home") {
            const cards = gsap.utils.toArray<HTMLElement>(
              ".service-card-reveal",
            );
            if (desktop) {
              // Initialize every staggered child before its delayed tween begins.
              gsap.set(cards, { y: 65, rotation: 3, autoAlpha: 0 });
              gsap.fromTo(
                cards,
                { y: 65, rotation: 3, autoAlpha: 0 },
                {
                  y: 0,
                  rotation: 0,
                  autoAlpha: 1,
                  stagger: 0.18,
                  duration: 1,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 86%",
                    end: "top 36%",
                    scrub: 0.35,
                    invalidateOnRefresh: true,
                  },
                },
              );
            } else {
              // Each stacked card has its own trigger, rather than playing offscreen.
              cards.forEach((card) =>
                gsap.fromTo(
                  card,
                  { y: 32, autoAlpha: 0 },
                  {
                    y: 0,
                    autoAlpha: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: card,
                      start: "top 94%",
                      end: "top 68%",
                      scrub: 0.25,
                      invalidateOnRefresh: true,
                    },
                  },
                ),
              );
            }
          } else {
            gsap.utils
              .toArray<HTMLElement>(".service-detail")
              .forEach((section) => {
                const image = section.querySelector(".content-image");
                const copy = section.querySelector(".service-detail-copy");
                gsap
                  .timeline({
                    scrollTrigger: {
                      trigger: section,
                      start: "top 88%",
                      end: "top 35%",
                      scrub: 0.35,
                      invalidateOnRefresh: true,
                    },
                  })
                  .fromTo(
                    image,
                    { y: desktop ? 45 : 24, clipPath: "inset(0 18% 0 0)" },
                    { y: 0, clipPath: "inset(0 0% 0 0)", ease: "none" },
                    0,
                  )
                  .fromTo(
                    copy,
                    { y: desktop ? 40 : 20, autoAlpha: 0 },
                    { y: 0, autoAlpha: 1, ease: "none" },
                    0.12,
                  );
              });
          }
        }, root);
        return () => animation.revert();
      },
    );
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    const images = Array.from(
      root.querySelectorAll(".services-grid img, .service-detail img"),
    );
    images.forEach((image) =>
      image.addEventListener("load", refresh, { once: true }),
    );
    return () => {
      disposed = true;
      images.forEach((image) => image.removeEventListener("load", refresh));
      media.revert();
    };
  }, [variant]);
  return null;
}
