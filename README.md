# Syed Shahid Nazeer — AI Generalist Portfolio

A space-themed personal portfolio built with Next.js 16, React 19, Three.js and Tailwind CSS.

**Live sections:** Hero · About · Skills · Grounded & Governed · Projects · Contact · FAQ

---

## Getting started

```bash
pnpm install
pnpm dev
```

Then open <http://localhost:3000>.

```bash
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # eslint
```

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS 3, Framer Motion |
| 3D | Three.js, @react-three/fiber, @react-three/drei, maath |
| Language | TypeScript |

---

## Structure

```
app/            route, layout, global styles, and SEO files
                (robots, sitemap, manifest, llms.txt, llms-full.txt)
components/
  main/         page sections (hero, about, skills, encryption, projects,
                contact, faq, navbar, footer)
  sub/          building blocks (hero content + flip card, project ticket,
                skill tile)
  ui/           reusable pieces (GlassIsland, FlipCard, BorderGlow,
                command palette, cursor glow, scroll progress)
config/         site metadata
constants/      profile, skills, projects, socials, FAQs — edit content here
lib/            JSON-LD, llms.txt builders, motion variants and helpers
public/         profile photo, skill logos, videos
```

**To change content, edit `constants/index.ts`** — profile, projects, skills, socials, keywords and FAQs all live there, and the page, JSON-LD and llms.txt are all generated from it, so they stay in sync. Site metadata lives in `config/index.ts`; set `NEXT_PUBLIC_SITE_URL` to the live domain.

---

## Notable implementation details

- **Project tickets** are perforated holographic tickets: the shape is built from layered `mask` gradients and the foil from a shared SVG turbulence filter. The only animation is a float on hover.
- **Grounded & Governed** recreates a looping video in CSS: 21 centred rows of keywords whose widths trace an ellipse, with a glow ring that ripples outward from the centre.
- **Glass UI** (`components/ui/glass-island.tsx`) is shared by the navbar, footer, badges and hero button; a frosted layer behind it blurs content scrolling underneath.
- **Contact form** is a live-preview card: typing updates it in real time, focusing the message field flips it, and a valid submit seals the card into an envelope before handing off to the visitor's mail client via `mailto:`.
- **SEO / AEO / GEO**: one linked JSON-LD graph (Person, WebSite, ProfilePage, projects, FAQPage), a visible FAQ, explicit AI-crawler rules in `robots.txt`, and `/llms.txt` + `/llms-full.txt`.
- **Performance**: continuous animations are transform/opacity only; background videos pause off-screen; the star field caps its pixel ratio.

---

## Contact

- **Email:** shahidnazeerds@gmail.com
- **GitHub:** <https://github.com/Syedshahidnazeer>
- **LinkedIn:** <https://www.linkedin.com/in/shahidnazeersyed/>

---

## Credits

Built on the open-source [space-portfolio](https://github.com/sanidhyy/space-portfolio) template (MIT). The project tickets adapt a [Uiverse.io](https://uiverse.io) design by dexter-st, the contact form adapts a credit-card form interaction, and the hero `FlipCard` and contact `BorderGlow` come from [React Bits](https://reactbits.dev).

## License

MIT — see [LICENSE](./LICENSE).
