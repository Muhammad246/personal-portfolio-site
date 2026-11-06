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
- `app/page.tsx` renders the homepage sections: introduction, project list, skills, and contact.
- `app/projects/[slug]/page.tsx` creates a detail page for each project in the typed data list.
- `app/globals.css` contains the design tokens, responsive layout, theme colors, accessibility states, and motion preferences.
- `components/` contains the shared header, footer, theme controls, social links, and project card.
- `lib/projects.ts` is the source for the featured projects and technical skills.
- `lib/site.ts` holds site configuration and environment-backed contact/social links.
- `public/cv.txt` is a downloadable profile summary containing only the facts supplied so far; complete it before using it as a formal CV.

Copy `.env.example` to `.env.local` and add the deployed site URL to enable canonical metadata. The email address and social profiles are maintained in `lib/site.ts`; repository and demo URLs are in `lib/projects.ts`. The contact form validates the message and opens the visitor’s email app with a prefilled draft, so the visitor reviews and sends it from their own account. No email service credentials are needed. Project detail pages intentionally contain prompts until verified descriptions, tools, and outcomes are available.
