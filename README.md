# K B Engineering website

Responsive Next.js App Router website with TypeScript, Tailwind CSS, GSAP ScrollTrigger and Lucide React.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Use `npm run build` for a production build, `npm start` to serve it, and `npm run typecheck` for TypeScript verification.

## Pages and interactions

- Home, About, Services, Products, Contact and five product detail pages.
- Three-slide hero: synchronized images, headings, descriptions and CTAs; crossfades every 4 seconds with previous/next and direct slide selection.
- Autoplay pauses on keyboard focus, hidden tabs and outside the viewport. Reduced-motion visitors use manual controls.
- Scroll-linked hero geometry, image-mask reveals, staggered cards and technical line drawing. Mobile motion is simplified and respects reduced-motion preferences.
- Validated inquiry form, WhatsApp, telephone, email and map links.

## Configure email delivery

Copy `.env.example` to `.env.local`. Add `RESEND_API_KEY` and set `INQUIRY_FROM_EMAIL` to a sender on your verified domain, then restart. The recipient is `info@kbenggepc.in`; visitor email is reply-to.

Without these settings, the endpoint returns HTTP 503 and clearly states that the inquiry was not sent. No inquiries are stored. A success message appears only after the provider accepts delivery. Add deployment-level abuse protection before enabling public delivery.

Deploy to a Node.js-compatible Next.js host; the inquiry API requires a server. This checkout has not been published. Set `SITE_URL` to the final origin for sitemap generation.

## Content and photography

Company details come from the supplied client requirements document; product categories come from the user-authored master brief. No certifications, client names, company history, project totals or performance statistics were invented. A personal LinkedIn profile is not presented as a company account.

The logo was extracted unchanged from `word/media/image1.jpeg` in `Website_Client_Requirements (1).docx`.

Photography is illustrative stock, not K B Engineering facilities or completed work. Unsplash images use the [Unsplash License](https://unsplash.com/license); Pexels images use the [Pexels License](https://www.pexels.com/license/).

| Local file in `public/images/` | Source |
| --- | --- |
| `refinery.jpg` | [Ali Mucci - refinery](https://unsplash.com/photos/gZbjx2K7s9I) |
| `plant.jpg` | [Industrial process piping](https://images.unsplash.com/photo-1513828583688-c52646db42da) |
| `welding.jpg` | [Metal fabrication](https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122) |
| `water.jpg` | [Patrick Federi - treatment facility](https://unsplash.com/photos/bjcceKhRsqA) |
| `engineering.jpg` | [Sven Mieke - technical drawings](https://unsplash.com/photos/brown-pencil-on-white-printing-paper-fteR0e2BzKo) |
| `materials.jpg` | [Deon Fosu - pipe sections](https://unsplash.com/photos/a-large-stack-of-steel-pipes-in-a-warehouse-LgO5QcuHtME) |
| `fabrication.jpg` | [Aman Jakhar - welding](https://unsplash.com/photos/person-welding-metal-CrTTr9xF-w4) |
| `process-tanks.jpg` | [Gonzalo Acuna - tanks](https://www.pexels.com/photo/stainless-metal-tanks-storage-in-a-plant-10922959/) |
| `well-testing.jpg` | [Yerevan Malerva - flare stack](https://www.pexels.com/photo/industrial-flame-tower-emission-against-blue-sky-31316362/) |
| `power.jpg` | [Alex Simpson - power plant](https://unsplash.com/photos/9GwMIek9jnY) |
| `hero-process.jpg` | [Jakub Zerdzicki - boiler and pipework](https://unsplash.com/photos/industrial-complex-with-large-metal-pipes-and-structures-TKJffuIcZu4) |
| `hero-fabrication.jpg` | [Collab Media - workshop welder](https://unsplash.com/photos/a-welder-working-on-a-piece-of-metal-VGjQgLN4B78) |

Manrope is self-hosted from Google Fonts under the SIL Open Font License; see `public/fonts/OFL.txt`.

For client launch, approved photographs of actual skid packages, pressure vessels and well testing units would improve product specificity. The supplied reference guides the layout, not the stock photo provenance.

## Products showcase

The Products overview uses an editorial hero, a scroll-driven five-category explorer and a native details/summary equipment directory. All names, subproducts and category routes come from `lib/data.ts`.

Desktop pinning runs only at widths of at least 1000px, viewport heights of at least 650px, and with no reduced-motion preference. Smaller screens, reduced-motion users and no-JavaScript visitors get ordinary vertical product sections. Inactive desktop panels are inert and hidden from assistive technology. Category buttons scroll to the matching stage; the directory provides a direct alternative to the pinned explorer. All effects clean up on route changes and breakpoint changes.
