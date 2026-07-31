# Implementation Plan: Ivorytip Safaris Full Redesign & Rebuild

This document outlines the architecture, layout structure, data modeling, animation, and performance steps for the complete redesign of the **Ivorytip Safaris** website. Our goal is to craft an award-winning, immersive safari portal that feels handcrafted, natural, and premium.

---

## 1. Project Setup & Git Restore Point
- **Status:** **Completed**
- **Git Commit:** `Restore Point - Before Ivorytip Safaris Full Redesign`
- **Compressed Archive:** Created physical zip restore point at `../backup-before-redesign.zip`.

---

## 2. Architecture & Modular Data Modeling
To avoid monolithic components and hardcoded pages, we will separate copy and assets from presentation. We will establish structured TypeScript datasets under `src/data/`:
1. **`lodges.ts` [NEW]**:
   - Outlines the modular structure of the accommodations.
   - Initial support for **Kikuyo Lodge** and **Emanzini Lodge**.
   - Modular properties: id, name, location, tagline, fullDescription, architecture, capacity, staffRatio, poolSpa, powerGrid, stargazing, images (hero, bedroom, bathroom, lifestyle), features, amenities (name, description, lucide-icon).
   - Designed to support future farms and additional lodge listings easily by simply adding records.
2. **`hunting.ts` [NEW]**:
   - Holds structured data for the hunting timeline journey: *Planning, Arrival, Camp, Daily routine, Tracking, Stalking, Harvest, Celebration, Accommodation, Departure*.
   - Each step will have: title, description, photography asset, key tip, and duration.
3. **`blog.ts` [NEW]**:
   - Contains editorial safari magazine posts to drive SEO.
   - Properties: id, title, slug, summary, content, category, readTime, author, date, featuredImage, relatedSpecies, tags, schemaBreadcrumbs.
4. **`faq.ts` [NEW]**:
   - Contains categorised questions and answers (Travel, Logistics, Hunting, Accommodation) for display in the booking funnel and main pages, linked directly to JSON-LD FAQ schema.

---

## 3. Information Architecture & Scroll Narrative
We will redesign the homepage as a single-page immersive narrative that flows naturally, with key routes linking into corresponding scroll anchors or dedicated subpages.

### Suggested Flow:
1. **Hero**: Cinematic full-bleed video/image background, floating particle dust overlay (Three.js), elegant typography, and a minimalist luxury calendar booking trigger.
2. **Experience Overview**: The "Why Ivorytip" story. High-contrast typography, large landscape photography, showing their commitment to ethical hunting, conservation, and deep friendships.
3. **Luxury Accommodation (The Redesign)**:
   - Complete replacement of standard lists.
   - Modular tabbed selector: **Kikuyo Lodge** and **Emanzini Lodge**.
   - Dynamic slide-to-reveal imagery and interactive specs comparison.
4. **Hunting Experience (The Timeline)**:
   - Interactive, scroll-linked storytelling timeline mapping out the stalk journey from Planning to Departure.
   - Immersive parallax card blocks instead of generic icons.
5. **Meet Andre & Jenna (Warmth & Trust)**:
   - Dedicated split section introducing Andre (the PH guide) and Jenna (hospitality and boma hosting).
   - Deep, conversational, personal copy detailing the family trust, campfire storytelling, and authentic friendships.
6. **Gallery Experience**:
   - An interactive media engine with category filters (*Wildlife, Accommodation, The Hunt, Landscape, Camp Life*).
   - Responsive grid with smooth layout morphing and full-screen premium lightbox.
7. **Guest Reviews**:
   - Immersive card system linking reviews to specific species hunted, trip types, and locations.
   - Rich typography and hand-drawn styling.
8. **Editorial Blog (SEO Powerhouse)**:
   - Premium magazine-style layout featuring articles on tracking tips, Eastern Cape species, and chef recipes.
9. **Booking Journey (Luxury Travel Funnel)**:
   - Effortless multi-step progressive inquiry widget.
   - FAQs integrated directly adjacent to booking steps.
   - Sticky "Reserve Now" floating tab appearing on scroll.
10. **FAQ Accordion Grid**:
    - Expanding semantic FAQ items.
11. **Footer & Contact Form**:
    - High-density premium contact section.

---

## 4. Specific Component Design Specs

### A. Accommodation Tab System & Pages
- **Component:** `Lodges.tsx` and `LodgeDetail.tsx`.
- **Navigation:** Segmented tabs for Kikuyo Lodge and Emanzini Lodge.
- **Support for Expansion:** A single helper component `<LodgeShowcase lodge={currentLodge} />` that handles layout, mapping, and features, allowing developers to add new lodges simply by extending `src/data/lodges.ts`.

### B. Gallery Experience
- **Component:** `<PremiumGallery />` inside `Gallery.tsx` and detail pages.
- **Product Gallery Style:**
  - Large main high-res preview frame with zoom-on-hover.
  - Horizontally scrolling thumbnail carousel below.
  - Full-screen immersive lightbox modal supporting keyboard arrow keys, zoom, image preloading, and a sidebar containing room description, amenities list, and accommodation details.

### C. Meet Andre & Jenna
- **Page/Section:** `About.tsx` and `Home.tsx#hosts-section`.
- **Content:** Shift focus from corporate "guides" to intimate family hosts. Highlight Andre's stalk philosophy and Jenna's warm culinary boma hosting.

### D. Hunting Experience
- **Page/Section:** `Packages.tsx` and `Home.tsx#hunting-experience`.
- **Details:** Interactive vertical timeline with GSAP-linked slide reveals. Parallax background mapping the conservancy topography.

### E. Booking Engine Redesign
- **Component:** `<LuxuryBookingJourney />` inside `Contact.tsx` or modal.
- **Details:** Minimal steps (Guest detail -> Date selection -> Package/Specimen curation -> Submission). Availability warning flags (e.g., "Only 3 custom group slots remaining for 2026"). Clear CTA triggers.

### F. SEO Editorial Blog
- **Page/Section:** `/blog` and `/blog/:slug`.
- **Details:** Beautiful typography, reading progress bar, related species tags, custom Article JSON-LD schema injection.

---

## 5. Animation & 3D direction (WebGL Dust & Parallax)
- **Smooth Scroll:** Lenis integrated globally via RAF ticker.
- **3D Particles:** Tasteful WebGL background of floating dust/sun-ray particles using React Three Fiber, optimized to scale down count or disable on low-end mobile systems.
- **GSAP reveals:** Image clip-path reveals, scroll-linked typography scaling, and soft parallax translations for layers.

---

## 6. SEO & Schema Architecture
We will inject detailed structured schemas:
- **`FAQPage` Schema**: Structured list of top 8 questions.
- **`BreadcrumbList` Schema**: Clear route hierarchy.
- **`Article` Schema**: Detailed blog schema with publisher, author, date, and image properties.
- **`Lodges` / `LocalBusiness` Schema**: Geolocation, name, description, and booking contact coordinates.
- **Semantic HTML**: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` tags throughout.

---

## 7. Performance & Verification Plan
- **Lighthouse Target:** 95+ across all criteria.
- **Optimizations:**
  - WebP/optimized JPG image compression.
  - Offload heavy operations to Web Workers or requestAnimationFrame.
  - Disable high-triangle Three.js animations if `prefers-reduced-motion` is enabled or if frame drops below 45fps.
  - Implement dynamic lazy loading and image pre-fetching.

### Automated Verification:
- Run typescript compilation checks (`npm run lint`).
- Execute production builds (`npm run build`) to ensure bundle size and import paths compile correctly.
- Test in browser.
