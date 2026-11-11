"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>(".home");
    if (!root) return;
    const mm = gsap.matchMedia();
    let disposed = false;
    mm.add(
      {
        desktop: "(min-width: 801px)",
        mobile: "(max-width: 800px)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (!context.conditions?.motion) return;
        const desktop = Boolean(context.conditions.desktop);
        const ctx = gsap.context(() => {
          // A brief desktop hold gives the alignment time to register.
          // Short screens and mobile retain ordinary scrolling without pinning.
          const pinHero = desktop && window.innerHeight >= 720;
          const hero = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: ".hero",
              start: () =>
                `top top+=${document.querySelector("header")?.offsetHeight ?? 105}`,
              end: pinHero ? "+=420" : "bottom top",
              pin: pinHero,
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          });
          hero
            .to(
              ".hero-photo",
              { scale: desktop ? 1.15 : 1.045, yPercent: desktop ? 5 : 0 },
              0,
            )
            .to(".hero-copy", { y: desktop ? -48 : -15, opacity: 0.85 }, 0)
            .to(".metal-piece", { rotation: 0, x: 0, y: 0, stagger: 0.04 }, 0)
            .fromTo(
              ".geometry-hero .geometry-plate",
              {
                x: (i) => [-65, 22, -18, 70][i],
                y: (i) => [42, -40, 32, -26][i],
                rotation: (i) => [-13, 8, -7, 12][i],
                transformOrigin: "50% 50%",
              },
              { x: 0, y: 0, rotation: 0, stagger: 0.06 },
              0,
            )
            .fromTo(
              ".geometry-hero .geometry-line",
              { strokeDasharray: 1, strokeDashoffset: 1 },
              { strokeDashoffset: 0, stagger: 0.08 },
              0.12,
            )
            .from(".geometry-hero .geometry-nodes", { opacity: 0 }, 0.5);
          gsap.to(".scroll-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.15,
            },
          });
          gsap.utils
            .toArray<HTMLElement>(".section-divider")
            .forEach((divider) => {
              gsap.fromTo(
                divider.querySelector(".section-divider-line"),
                { scaleX: 0 },
                {
                  scaleX: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: divider,
                    start: "top 94%",
                    end: "top 60%",
                    scrub: 0.4,
                  },
                },
              );
            });
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
            gsap.from(el, {
              y: desktop ? 55 : 24,
              autoAlpha: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 87%",
                toggleActions: "play none none reverse",
              },
            });
          });
          gsap.fromTo(
            ".about-image",
            { clipPath: "polygon(14% 0, 30% 0, 15% 100%, 0 100%)" },
            {
              clipPath: "polygon(14% 0, 100% 0, 85% 100%, 0 100%)",
              ease: "none",
              scrollTrigger: {
                trigger: ".about-visual",
                start: "top 90%",
                end: "top 42%",
                scrub: 0.5,
              },
            },
          );
          gsap.from(".expertise > div", {
            y: 24,
            autoAlpha: 0,
            stagger: 0.14,
            duration: 0.7,
            scrollTrigger: {
              trigger: ".expertise",
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
          gsap.fromTo(
            ".geometry-services .geometry-plate",
            {
              x: (i) => (i - 1.5) * 35,
              rotation: (i) => (i % 2 ? 8 : -8),
              transformOrigin: "50% 50%",
            },
            {
              x: 0,
              rotation: 0,
              ease: "none",
              scrollTrigger: {
                trigger: ".services-section",
                start: "top bottom",
                end: "bottom 25%",
                scrub: 0.7,
              },
            },
          );
          gsap.from(".services-section .gold-rule", {
            scaleX: 0,
            transformOrigin: "left",
            scrollTrigger: {
              trigger: ".services-section",
              start: "top 75%",
              end: "top 30%",
              scrub: 0.5,
            },
          });
          gsap.from(".home .product-card", {
            y: desktop ? 70 : 25,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".home .product-grid",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
          gsap.from(".why-benefit", {
            y: 30,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.8,
            scrollTrigger: {
              trigger: ".why-benefits",
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
          gsap.from(".technical-line", {
            strokeDashoffset: 1000,
            ease: "none",
            scrollTrigger: {
              trigger: ".why",
              start: "top 85%",
              end: "bottom 55%",
              scrub: 0.5,
            },
          });
          gsap.from(".geometry-finished", {
            scale: 0.85,
            autoAlpha: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: ".why",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
          gsap.from(".home .contact-cta h2, .home .contact-cta .cta-actions", {
            y: 35,
            autoAlpha: 0,
            stagger: 0.16,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".home .contact-cta",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }, root);
        return () => ctx.revert();
      },
    );
    // Refresh after local fonts and image dimensions settle.
    const refresh = () => {
      if (!disposed) ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    const images = Array.from(root.querySelectorAll("img"));
    images.forEach((img) =>
      img.addEventListener("load", refresh, { once: true }),
    );
    return () => {
      disposed = true;
      window.removeEventListener("load", refresh);
      images.forEach((img) => img.removeEventListener("load", refresh));
      mm.revert();
    };
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}
