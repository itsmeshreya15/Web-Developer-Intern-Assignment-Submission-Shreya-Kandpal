import { formatCurrency } from '../utils/formatCurrency'

export default function ExpenseList({
  expenses,
  ledgerCurrency,
  onDelete,
}) {
  if (expenses.length === 0) {
    return (
      <section className="et-listSection" aria-labelledby="list-heading">
        <h2 id="list-heading" className="et-sectionTitle">
          Your expenses
        </h2>
        <div className="et-empty" role="status">
          <p className="et-emptyTitle">No expenses yet</p>
          <p className="et-emptyText">
            Add your first item above. Everything you log will show up here with
            quick delete actions.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="et-listSection" aria-labelledby="list-heading">
      <h2 id="list-heading" className="et-sectionTitle">
        Your expenses
      </h2>
      <ul className="et-cardGrid">
        {expenses.map((exp) => (
          <li key={exp.id} className="et-card">
            <div className="et-cardTop">
              <span className="et-pill">{exp.category}</span>
              <button
                type="button"
                className="et-btn et-btnGhost et-btnSmall"
                onClick={() => onDelete(exp.id)}
                aria-label={`Delete ${exp.name}`}
              >
                Delete
              </button>
            </div>
            <p className="et-cardName">{exp.name}</p>
            <p className="et-cardAmount">
              {formatCurrency(exp.amount, ledgerCurrency)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
