# Personal Expense Tracker

A small React (Vite) app to **add, categorise, and delete** expenses; see a **running total**, a **category breakdown**, and a **live FX preview** using the public [Frankfurter](https://www.frankfurter.app/) API (ECB rates, no API key).

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build   # production bundle in dist/
npm run preview # serve dist locally
```

## Deploy (free)

### Vercel

1. Push this folder to a GitHub repo.
2. In [Vercel](https://vercel.com), **New Project** → import the repo.
3. Framework preset: **Vite**; build command `npm run build`; output directory `dist`.
4. Deploy — your site gets a public `*.vercel.app` URL.

### Netlify

1. Push to GitHub.
2. In [Netlify](https://www.netlify.com): **Add new site** → **Import an existing project**.
3. Build command: `npm run build`; publish directory: `dist`.

Or use Netlify CLI: `npm run build && npx netlify deploy --prod --dir=dist`.

## Project structure

- `src/App.jsx` — expense list state, ledger currency, layout.
- `src/components/ExpenseForm.jsx` — add expense (name, amount, category).
- `src/components/ExpenseList.jsx` — cards + delete.
- `src/components/SummaryPanel.jsx` — running total + inline category breakdown.
- `src/components/CurrencyConverter.jsx` — Frankfurter fetch, loading/error UI, converted total.
- `src/constants.js` — categories and currency codes.
- `src/expense-tracker.css` — layout and theme (no UI kit).

## Behaviour notes

- Amounts are stored as the numbers you enter, in the **ledger currency** you pick. Changing ledger later does **not** rewrite past rows (set ledger before logging if you care about consistency).
- If the FX API fails, totals in your ledger currency still work; the converter shows a warning instead of breaking the page.

## Optional submission note

See `SUBMISSION_NOTE.md` for a short write-up you can paste into your assignment.
