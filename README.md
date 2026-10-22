# Vuka Connect (demo preview)

Vuka Connect is a proposed internal portal for VUKA Group staff. It puts the company's everyday services in one place, behind a single secure Microsoft sign-in.

> **This repository is a demo.** It uses sample data and a fake sign-in. It does not connect to any real VUKA system, and nothing here is a live service. The working prototype, with real Microsoft sign-in, runs separately and is not part of this repository.

## What the demo shows

- A sign-in page in the VUKA look, with an overview of what is inside the portal.
- A portal home with a "Your session" card and eight service tiles.
- Search and category filters (All, Support, People, Learn & grow, Wellbeing, Company).
- A layout that works on desktop and on a phone.

Clicking **Sign in with Microsoft** signs in a fake "Demo User". Most tiles show a "Demo preview" note instead of opening a real service.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

To build the production files:

```bash
npm run build
npm run preview
```

## How the demo works

The app is the same React code as the full portal. Two things are swapped so it runs with no backend:

| Full portal | This demo |
|---|---|
| Microsoft sign-in library (`@azure/msal-react`) | `src/msalShim.jsx`, a stand-in that fakes a signed-in user |
| Services loaded from a secured API | `src/api.js`, a fixed list of sample services |

The swap is done in `vite.config.js` with a module alias. No tenant IDs, keys or internal links are stored here.

## Project layout

```
src/
  App.jsx          chooses the sign-in page or the portal
  Login.jsx        sign-in page
  Portal.jsx       portal home, search and filters
  Logo.jsx         VUKA | CONNECT wordmark (text stand-in)
  api.js           sample services (demo only)
  msalShim.jsx     fake sign-in (demo only)
  authConfig.js    empty placeholder (demo only)
  styles.css       all styling
docs/                         the built site that GitHub Pages serves
```

## Hosting on GitHub Pages

The `docs` folder holds the built site. To publish it:

1. Open the repository **Settings → Pages**.
2. Set **Source** to **Deploy from a branch**, the branch to `main`, and the folder to `/docs`. Save.
3. The site appears at `https://<owner>.github.io/<repository>/` after about a minute.

After changing the app, rebuild and refresh the folder before pushing:

```bash
npm run build
rm -rf docs && cp -r dist docs && touch docs/.nojekyll
```

## What the full portal adds

These are not in this demo:

- Real sign-in with Microsoft Entra ID, limited to the VUKA tenant.
- A secured API that checks every request, filters services by the user's groups, and logs each launch.
- An idle timeout that signs people out after 15 minutes.
- An installable phone app (PWA).

## Status and next steps

- Prototype working locally. Hosting in Azure is **waiting for approval**.
- Planned: hosting in its own Azure resource group, access groups, enforced multi-factor authentication, and ticket forms built into the portal.

## Notes for contributors

- Keep this repository public-safe: no tenant IDs, client IDs, internal URLs, staff names or email addresses.
- Do not add secrets or `.env` files. They are ignored by `.gitignore`.
- The logo is a text stand-in until the official file is supplied.
