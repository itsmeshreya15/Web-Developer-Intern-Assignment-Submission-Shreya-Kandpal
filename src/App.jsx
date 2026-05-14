import { useCallback, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SummaryPanel from './components/SummaryPanel'
import CurrencyConverter from './components/CurrencyConverter'
import './expense-tracker.css'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [ledgerCurrency, setLedgerCurrency] = useState('USD')

  const total = expenses.reduce((s, e) => s + e.amount, 0)

  const handleAdd = useCallback((expense) => {
    setExpenses((prev) => [expense, ...prev])
  }, [])

  const handleDelete = useCallback((id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }, [])

  return (
    <div className="et-app">
      <header className="et-header">
        <p className="et-kicker">Personal finance</p>
        <h1 className="et-title">Expense Tracker</h1>
        <p className="et-lead">
          Log spending by category, see your running total and a live currency
          preview — no accounts, just your browser.
        </p>
      </header>

      <main className="et-main">
        <div className="et-column et-columnPrimary">
          <ExpenseForm onAdd={handleAdd} />
          <ExpenseList
            expenses={expenses}
            ledgerCurrency={ledgerCurrency}
            onDelete={handleDelete}
          />
        </div>
        <aside className="et-column et-columnAside">
          <SummaryPanel
            expenses={expenses}
            ledgerCurrency={ledgerCurrency}
          />
          <CurrencyConverter
            ledgerCurrency={ledgerCurrency}
            onLedgerCurrencyChange={setLedgerCurrency}
            totalAmount={total}
          />
        </aside>
      </main>

      <footer className="et-footer">
        <small>
          Built with React + Vite. Exchange rates are indicative (ECB via
          Frankfurter); not for trading or tax filing.
        </small>
      </footer>
    </div>
  )
}
