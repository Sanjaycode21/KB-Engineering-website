"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Shared motion for the inner pages; selectors stay inside the current main. */
export default function PageMotion({ pageKey }: { pageKey: string }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>(".motion-page");
    if (!root) return;
    const media = gsap.matchMedia();
    let disposed = false;
    const focusCleanups: Array<() => void> = [];

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
          const introduction = root.querySelectorAll(
            ".page-intro > .container > *",
          );
          gsap.set(introduction, { y: 24, autoAlpha: 0 });
          gsap.to(introduction, {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          });
          gsap.fromTo(
            ".intro-lines",
            { x: 65, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.4, ease: "power2.out" },
          );

          // Each item enters at its own viewport position, including stacked mobile cards.
          gsap.utils
            .toArray<HTMLElement>(
              "[data-page-reveal], .approach article, .equipment-list li, .contact-item",
            )
            .forEach((element, i) => {
              gsap.fromTo(
                element,
                { y: desktop ? 38 : 22, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.8,
                  delay: desktop ? (i % 2) * 0.08 : 0,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 92%",
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                  },
                },
              );
            });

          gsap.utils
            .toArray<HTMLElement>(".about-page .content-image")
            .forEach((image) => {
              gsap.fromTo(
                image,
                { clipPath: "inset(0 22% 0 0)", y: 30 },
                {
                  clipPath: "inset(0 0% 0 0)",
                  y: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: image,
                    start: "top 94%",
                    end: "top 42%",
                    scrub: 0.4,
                    invalidateOnRefresh: true,
                  },
                },
              );
            });

          const form = root.querySelector<HTMLElement>(".inquiry-form");
          if (form) {
            // Keep the form available to keyboard navigation throughout its entrance.
            const tween = gsap.fromTo(
              form,
              { y: 24, opacity: 0.65 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: form,
                  start: "top 94%",
                  toggleActions: "play none none none",
                },
              },
            );
            const revealOnFocus = () => tween.progress(1).pause();
            form.addEventListener("focusin", revealOnFocus);
            focusCleanups.push(() =>
              form.removeEventListener("focusin", revealOnFocus),
            );
          }

          gsap.utils
            .toArray<HTMLElement>(".contact-cta > .container > div")
            .forEach((element) => {
              gsap.fromTo(
                element,
                { y: 26, autoAlpha: 0 },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.9,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 92%",
                    toggleActions: "play none none reverse",
                  },
                },
              );
            });
        }, root);
        return () => {
          focusCleanups.splice(0).forEach((cleanup) => cleanup());
          animation.revert();
        };
      },
    );

    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    const images = Array.from(root.querySelectorAll("img"));
    images.forEach((image) =>
      image.addEventListener("load", refresh, { once: true }),
    );
    return () => {
      disposed = true;
      images.forEach((image) => image.removeEventListener("load", refresh));
      media.revert();
    };
  }, [pageKey]);
  return null;
}
