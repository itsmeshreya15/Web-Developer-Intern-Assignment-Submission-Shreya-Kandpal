import { useMemo } from 'react'
import { EXPENSE_CATEGORIES } from '../constants'
import { formatCurrency } from '../utils/formatCurrency'

export default function SummaryPanel({ expenses, ledgerCurrency }) {
  const { total, byCategory } = useMemo(() => {
    let sum = 0
    const map = Object.fromEntries(
      EXPENSE_CATEGORIES.map((c) => [c, 0]),
    )
    for (const e of expenses) {
      sum += e.amount
      if (map[e.category] != null) map[e.category] += e.amount
      else map.Other = (map.Other ?? 0) + e.amount
    }
    const breakdown = EXPENSE_CATEGORIES.filter((c) => map[c] > 0).map(
      (c) => ({
        category: c,
        amount: map[c],
      }),
    )
    breakdown.sort((a, b) => b.amount - a.amount)
    return { total: sum, byCategory: breakdown }
  }, [expenses])

  return (
    <section className="et-summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="et-sectionTitle">
        Summary
      </h2>

      <div className="et-summaryTotal">
        <span className="et-summaryLabel">Running total</span>
        <span className="et-summaryValue">
          {formatCurrency(total, ledgerCurrency)}
        </span>
      </div>

      <div className="et-breakdown">
        <h3 className="et-subheading">By category</h3>
        {byCategory.length === 0 ? (
          <p className="et-muted">No spending recorded yet.</p>
        ) : (
          <p className="et-breakdownInline">
            {byCategory.map(({ category, amount }, i) => (
              <span key={category}>
                {i > 0 && (
                  <span className="et-breakdownSep" aria-hidden="true">
                    {' '}
                    —{' '}
                  </span>
                )}
                <strong>{category}</strong>:{' '}
                {formatCurrency(amount, ledgerCurrency)}
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  )
}
