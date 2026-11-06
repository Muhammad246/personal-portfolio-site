# Personal portfolio

A Next.js App Router portfolio using TypeScript and Tailwind CSS 4. The visual styling lives in `app/globals.css`; the application keeps most content in typed data files and reusable components.

## Run locally

Use Node.js 20.9 or newer, then install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Use `npm run build` for a production build and `npm run typecheck` for a TypeScript check.

## Main files

- `app/layout.tsx` sets the document shell, shared navigation/footer, theme provider, and SEO metadata.
- `app/api/contact/route.ts` validates contact submissions and sends email through Resend using server-only environment variables.
- `app/icon.svg` provides the App Router favicon, and `app/opengraph-image.tsx` generates the LinkedIn/social preview image.
- `app/page.tsx` renders the homepage sections: introduction, project list, skills, and contact.
- `app/projects/[slug]/page.tsx` creates a detail page for each project in the typed data list.
- `app/globals.css` contains the design tokens, responsive layout, theme colors, accessibility states, and motion preferences.
- `components/` contains the shared header, footer, theme controls, social links, and project card.
- `lib/projects.ts` is the source for the featured projects and technical skills.
- `lib/site.ts` holds site configuration and environment-backed contact/social links.
- `public/Ali_Analyst_Resume.pdf` is the downloadable CV.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the actual deployed URL for absolute social preview metadata. To enable contact delivery, configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`. Add a domain you control in Resend, publish the DNS records it provides, and verify the domain before using its address as `CONTACT_FROM_EMAIL`. Configure the same variables in Vercel project settings and redeploy. Never prefix the Resend key with `NEXT_PUBLIC_` or commit `.env.local`.

The email address and social profiles are maintained in `lib/site.ts`; repository and demo URLs are in `lib/projects.ts`. Until the Resend settings are configured, the contact endpoint returns a service-unavailable response and the form keeps the visitor’s text so they can retry or email directly. Project detail pages intentionally contain prompts until verified descriptions, tools, and outcomes are available.
