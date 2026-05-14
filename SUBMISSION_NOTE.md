## Submission note (brief)

I built a **Personal Expense Tracker** with React and Vite. Users can add expenses with a name, amount, and one of five categories (Food, Travel, Marketing, Utilities, Other). Each entry appears as a compact card with the category, formatted amount, and a delete control. A **running total** updates immediately when items are added or removed, and a **by category** line summarises spending in the style “Food: … — Travel: …” for quick scanning.

For **currency**, I integrated the free **Frankfurter** REST API (`https://api.frankfurter.app/latest`), which publishes ECB reference rates without an API key. The app lets you pick a **ledger currency** (the currency you type amounts in) and a second currency in a dropdown to preview the converted running total. Loading and error states are handled in the converter panel so the rest of the UI—including totals in the ledger currency—remains usable if the network or API fails.

Structurally, the UI is split into **four components** (`ExpenseForm`, `ExpenseList`, `SummaryPanel`, `CurrencyConverter`) plus `App.jsx`, with state managed only through **React hooks** (`useState`, `useEffect`, `useMemo`, `useCallback`). Styling is **hand-written CSS** (no component library): a dark, high-contrast layout with responsive grids for ~1600×900 desktop and ~414×749 mobile, with careful spacing and tabular numbers for money.

**Challenges:** ESLint’s newer rules around `setState` inside `useEffect` pushed me to treat “same currency” as a derived case (no fetch) and to defer the loading transition appropriately. **With more time**, I would add persistence (e.g. `localStorage`), optional expense dates, and clearer handling when switching ledger currency (e.g. warn or offer conversion of existing rows).
