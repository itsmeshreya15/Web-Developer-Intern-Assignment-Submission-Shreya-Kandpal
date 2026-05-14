# Personal Expense Tracker

A responsive **React** web app for logging personal expenses by category, viewing an automatic **running total** and **category breakdown**, and previewing totals in another currency using **live exchange rates** from a public API.

---

## Submission links

| Item | Link |
|------|------|
| **Live app (Vercel)** | [https://web-developer-intern-assignment-sub.vercel.app](https://web-developer-intern-assignment-sub.vercel.app) |
| **Source code (GitHub)** | *https://github.com/itsmeshreya15/Web-Developer-Intern-Assignment-Submission-Shreya-Kandpal* |

---

## Features

- **Add expenses** — name, amount, and category: Food, Travel, Marketing, Utilities, Other.
- **Expense list** — card layout with category, formatted amount, and **delete** per entry.
- **Running total** — updates immediately when expenses are added or removed.
- **Spending by category** — inline summary (e.g. `Food: … — Travel: …`).
- **Currency preview** — choose a **ledger currency** (amounts you enter) and a **preview currency**; fetches a current rate and shows the converted total.
- **Resilient API usage** — loading state while fetching rates; clear **error message** if the API fails; core totals in the ledger currency still work.

---

## Tech stack

- **React 19** with **Vite 8**
- State: **React hooks only** (`useState`, `useEffect`, `useMemo`, `useCallback`) — no Redux or similar
- Styling: **Plain CSS** (single feature stylesheet, no Tailwind / no pre-built UI kit)

---

## External API

- **[Frankfurter](https://www.frankfurter.app/)** — free JSON API (ECB reference data), **no API key**.
- Example request: `GET https://api.frankfurter.app/latest?from=USD&to=EUR`
- Used in `src/components/CurrencyConverter.jsx` for the live conversion preview.

---

## Project structure

| Path | Purpose |
|------|---------|
| `src/App.jsx` | Root layout, expense list state, ledger currency |
| `src/components/ExpenseForm.jsx` | Form to add an expense |
| `src/components/ExpenseList.jsx` | List/cards and delete actions |
| `src/components/SummaryPanel.jsx` | Running total + category breakdown |
| `src/components/CurrencyConverter.jsx` | FX fetch, loading/error UI, converted total |
| `src/constants.js` | Categories and supported currency codes |
| `src/utils/formatCurrency.js` | `Intl.NumberFormat` helpers |
| `src/expense-tracker.css` | Layout, theme, responsive breakpoints |

---

## Local development

**Requirements:** Node.js 18+ (recommended: current LTS).

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

**Other scripts:**

```bash
npm run build    # production build → dist/
npm run preview  # serve dist locally
npm run lint     # ESLint
```

---

## Deployment

This project is deployed on **Vercel** with:

- **Build command:** `npm run build`
- **Output directory:** `dist`


**Live deployment:** [https://web-developer-intern-assignment-sub.vercel.app](https://web-developer-intern-assignment-sub.vercel.app)

---

## Behaviour notes

- Expense **amounts are stored as entered**, in the **ledger currency** you select. Changing the ledger currency later does **not** recalculate past rows; pick your ledger currency before logging if you need consistency across entries.
- If the exchange API is unavailable, the **converter** shows a warning; **totals and the list** in the ledger currency are unaffected.

---


## Responsive design

The layout is tested for comfortable use at **desktop** (~1600×900) and **mobile** (~414×749) widths: stacked columns on small screens, grid cards where space allows, and no intentional horizontal overflow.
