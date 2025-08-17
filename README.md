# Ceramic Soul — Vite + Tailwind (Multi-page)

A small, production-ready front-end for the **Ceramic Soul** brand.
Built with **Vite**, **Tailwind CSS**, vanilla **JS**, and **Swiper**.
Multi-page routing is handled at build time; shared layout (header/footer) is injected on the client.

---

## Tech stack

* **Vite 7** (fast dev server & build)
* **Tailwind CSS 4** (utility-first styling)
* **PostCSS + Autoprefixer**
* **Swiper** (carousel)
* Optional: **just-validate** for forms
* Icon font via **Fontello**

> Node.js **18+** is recommended.

---

## Project structure

```
.
├─ public/                     # Static assets (copied as-is to dist/)
│  ├─ img/                     # Images
│  ├─ fonts/                   # Local webfonts & icon fonts
│  └─ sections/                # Reusable HTML fragments
│     ├─ header.html
│     ├─ footer.html
│     ├─ promo.html       # "body" fragment for index page
│     ├─ catalog.body.html
│     ├─ blog.body.html
│     └─ about.body.html
│
├─ src/
│  ├─ styles/
│  │  ├─ tailwind.css          # Tailwind entry + @layer rules
│  │  ├─ globals.css           # Global resets / CSS variables
│  │  └─ fontello.css          # Icon font
│  └─ main.js                  # Loads styles, injects fragments, init JS
│
├─ index.html                  # Page shells (only #app + script)
├─ catalog.html
├─ blog.html
├─ about.html
├─ vite.config.ts
├─ postcss.config.cjs
└─ package.json
```

### How pages are assembled

Each top-level page (`index.html`, `catalog.html`, etc.) is a **shell**:

```html
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
```

At runtime, `src/main.js`:

1. Maps the current `window.location.pathname` to a body fragment (`promo.body.html`, `catalog.body.html`, …).
2. Fetches and injects **header → body → footer** from `public/sections/` into `#app`.
3. Initializes UI (burger menu, Swiper, etc.).

All images/fonts under `public/` are referenced with absolute paths (e.g. `/img/...`, `/fonts/...`) so they work both in dev and in production.

---

## Scripts


# Install
npm i

# Dev server
npm run dev

# Production build (outputs /dist)
npm run build

# Preview the production build locally
npm run preview
```

> `npm run build` and `npx vite build` produce the **same** result.
> The npm script is preferred so your team runs the exact configured command.

---

## Multi-page build

`vite.config.ts` lists all page **entry HTML files** so Rollup builds them:


build: {
  rollupOptions: {
    input: {
      main:    resolve(__dirname, "index.html"),
      catalog: resolve(__dirname, "catalog.html"),
      blog:    resolve(__dirname, "blog.html"),
      about:   resolve(__dirname, "about.html"),
    },
  },
},
```

---

## Adding a new page

1. **Create the shell** at the project root, e.g. `contact.html` (with `#app` + main script).

2. **Create the body fragment**: `public/sections/contact.body.html`.

3. **Register the URL → fragment** in `src/main.js`:

   ```js
   const pageMap = {
     "/": "promo.body.html",
     "/index.html": "promo.body.html",
     "/catalog.html": "catalog.body.html",
     "/blog.html": "blog.body.html",
     "/about.html": "about.body.html",
     "/contact.html": "contact.body.html",
   };
   ```

4. **Add the entry to the build** in `vite.config.ts`:

   ```ts
   input: {
     ...,
     contact: resolve(__dirname, "contact.html"),
   }
   ```

5. Run `npm run dev` (or `build`).

---

## Styling

* Global CSS variables & base rules live in `src/styles/globals.css`.
* Tailwind layers and component abstractions live in `src/styles/tailwind.css`:

  * Use `@layer base`, `@layer components`, `@layer utilities`.
  * You can compose utilities with `@apply` for repeatable patterns (e.g., buttons).

---

## Swiper

* Markup lives inside the body fragments.
* Initialization happens in `src/main.js`:

```js
import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

new Swiper(".swiper", {
  loop: true,
  modules: [Navigation, Pagination],
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".icon-right-open", prevEl: ".icon-left-open" },
  breakpoints: { 1200: { slidesPerView: 3, spaceBetween: 5 }, 1920: { slidesPerView: 3, spaceBetween: 35 } },
});
```

---

## Paths & assets

* Use `/img/...` and `/fonts/...` for assets under `public/`.
* Do **not** import images from `src/` — `public/` is designed for static assets that must keep their filenames/paths.

---

## Deployment

* Build locally: `npm run build` → upload the `/dist` folder to your hosting.
* **GitHub Pages (project site)**: set `base: "/<repo-name>/"` in `vite.config.ts` if deploying at a subpath.

---

## Contributing

1. Create a feature branch (`feat/...`).
2. Keep commits conventional (e.g., `refactor(build): move fragments to public/sections`).
3. Open a PR.

---

## License

This project is for educational/portfolio purposes for the Ceramic Soul brand.
Use of imagery and branding may require permission.
