# Windows 95 Portfolio

React + Vite single-page portfolio styled as a Win95 desktop. Deployed to GitHub Pages at `/portfolio/`.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview built output
- `npm run lint` — ESLint, fails on any warning (`--max-warnings 0`)

No test framework is configured.

## Deploy

Deployment is **CI-only**: `.github/workflows` builds on push to `main` and publishes `dist/` to the `gh-pages` branch (`force_orphan: true`). Do not run `npm run deploy` locally — the script points at `-d build` but Vite outputs to `dist/`, so it will fail. Push to `main` instead.

## Layout

- `src/components/*.jsx` — all window/app components (MyComputer, WinampPlayer, MineSweeper, etc.)
- `src/css/*.css` — styles are **not** co-located; each component has a matching file here
- `src/Context.js` — single app-wide `UserContext`
- `src/App.jsx` — desktop shell, window manager, routing between apps
- **Folder/window lifecycle** is centralized in `App.jsx`: each folder needs a state slot (`*Expand`), an entry in `ObjectState()`, a value passed via `UserContext`, and a sibling render in the JSX. Icons live in `src/icon.json`. To be a drag-drop target, also add a `*FolderRef` + intersection check in `handleOnDrag`. To be browsable inside MyComputer, add a name block in `handleShowInfolder` + `handleShowInfolderMobile`, and an entry in `MyComputer.folderMap`.
- `patchNotes.js` — at repo root, not under `src/`
- `public/` — static assets including `Pratik_Resume.pdf` (note: capital R — macOS may display it as lowercase due to case-insensitive FS, but git tracks the capitalized name which is what ships to GitHub Pages)

## Gotchas

- `vite.config.js` sets `base: "/portfolio/"` — all asset URLs are prefixed. Hardcoded `/foo.png` paths will break in production; use Vite's `import` or `import.meta.env.BASE_URL`.
- When adding a component, create both `src/components/Foo.jsx` and `src/css/Foo.css`.
- Node 16 is pinned in the CI workflow — keep local Node compatible if reproducing CI behavior.
- `npm run lint` is broken (deprecated `--ext` flag in current ESLint config); use `npm run build` to verify.
- External-link icons (LinkedIn, certifications) are dispatched via early-exit in `handleShow` / `handleShowMobile`. The exported `handleDoubleClickEnterLink` in `AppFunctions.js` is dead code — don't add cases there.
- `localStorage.icons` merges with `icon.json` on each load — `pic`/`folderId`/`link`/`description` refresh from icon.json, new icons appear automatically. Renamed icons leave stale localStorage entries until cleared.
