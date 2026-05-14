import { useState } from 'react'
import { EXPENSE_CATEGORIES } from '../constants'

const initialForm = { name: '', amount: '', category: EXPENSE_CATEGORIES[0] }

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState(false)

  const amountNum = parseFloat(form.amount)
  const amountInvalid =
    form.amount.trim() === '' || Number.isNaN(amountNum) || amountNum <= 0
  const nameInvalid = form.name.trim() === ''

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (nameInvalid || amountInvalid) return

    onAdd({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      amount: Math.round(amountNum * 100) / 100,
      category: form.category,
    })
    setForm(initialForm)
    setTouched(false)
  }

  return (
    <form className="et-form" onSubmit={handleSubmit} noValidate>
      <h2 className="et-sectionTitle">Add expense</h2>
      <p className="et-hint">
        Enter a short name, amount in your ledger currency, and a category.
      </p>

      <div className="et-fieldGrid">
        <label className="et-field">
          <span className="et-label">Name</span>
          <input
            className="et-input"
            type="text"
            name="name"
            autoComplete="off"
            placeholder="e.g. Weekly groceries"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            aria-invalid={touched && nameInvalid}
          />
          {touched && nameInvalid && (
            <span className="et-fieldError" role="alert">
              Please enter a name.
            </span>
          )}
        </label>

        <label className="et-field">
          <span className="et-label">Amount</span>
          <input
            className="et-input"
            type="number"
            name="amount"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
            aria-invalid={touched && amountInvalid}
          />
          {touched && amountInvalid && (
            <span className="et-fieldError" role="alert">
              Enter a positive number.
            </span>
          )}
        </label>

        <label className="et-field">
          <span className="et-label">Category</span>
          <select
            className="et-select"
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
          >
            {EXPENSE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button type="submit" className="et-btn et-btnPrimary">
        Add expense
      </button>
    </form>
  )
}
