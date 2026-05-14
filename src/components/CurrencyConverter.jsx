import { startTransition, useEffect, useState } from 'react'
import { CURRENCY_OPTIONS, FRANKFURTER_BASE } from '../constants'
import { formatCurrency } from '../utils/formatCurrency'

export default function CurrencyConverter({
  ledgerCurrency,
  onLedgerCurrencyChange,
  totalAmount,
}) {
  const [previewCurrency, setPreviewCurrency] = useState('EUR')
  const [remote, setRemote] = useState({
    status: 'idle',
    rate: null,
    error: '',
  })

  const sameCurrency = previewCurrency === ledgerCurrency

  useEffect(() => {
    if (sameCurrency) return

    const ac = new AbortController()
    startTransition(() => {
      setRemote({ status: 'loading', rate: null, error: '' })
    })

    const url = `${FRANKFURTER_BASE}/latest?from=${encodeURIComponent(
      ledgerCurrency,
    )}&to=${encodeURIComponent(previewCurrency)}`

    fetch(url, { signal: ac.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`)
        return res.json()
      })
      .then((data) => {
        const r = data?.rates?.[previewCurrency]
        if (typeof r !== 'number' || Number.isNaN(r)) {
          throw new Error('Unexpected response from exchange API.')
        }
        setRemote({ status: 'ready', rate: r, error: '' })
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setRemote({
          status: 'error',
          rate: null,
          error:
            err instanceof Error
              ? err.message
              : 'Could not load exchange rate.',
        })
      })

    return () => ac.abort()
  }, [sameCurrency, ledgerCurrency, previewCurrency])

  const rate = sameCurrency ? 1 : remote.rate
  const status = sameCurrency ? 'ready' : remote.status
  const errorMessage = sameCurrency ? '' : remote.error

  const safeTotal =
    typeof totalAmount === 'number' && !Number.isNaN(totalAmount)
      ? totalAmount
      : 0
  const converted = rate != null ? safeTotal * rate : null

  const rateLabel =
    rate != null && !sameCurrency
      ? `1 ${ledgerCurrency} ≈ ${rate < 0.01 ? rate.toPrecision(4) : rate.toFixed(4)} ${previewCurrency} (ECB data, indicative)`
      : null

  return (
    <section className="et-converter" aria-labelledby="fx-heading">
      <h2 id="fx-heading" className="et-sectionTitle">
        Currency preview
      </h2>
      <p className="et-hint">
        Live rates from{' '}
        <a
          href="https://www.frankfurter.app/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Frankfurter
        </a>
        . Your ledger currency is what you type amounts in; the preview shows
        the running total converted.
      </p>

      <div className="et-fxRow">
        <label className="et-field et-fieldInline">
          <span className="et-label">Ledger currency</span>
          <select
            className="et-select"
            value={ledgerCurrency}
            onChange={(e) => onLedgerCurrencyChange(e.target.value)}
            aria-describedby="fx-ledger-help"
          >
            {CURRENCY_OPTIONS.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="et-field et-fieldInline">
          <span className="et-label">Convert total to</span>
          <select
            className="et-select"
            value={previewCurrency}
            onChange={(e) => setPreviewCurrency(e.target.value)}
          >
            {CURRENCY_OPTIONS.map(({ code, label }) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p id="fx-ledger-help" className="et-srOnly">
        All expense amounts are stored and displayed in the ledger currency you
        select here.
      </p>

      <div className="et-fxPreview" role="region" aria-live="polite">
        {!sameCurrency && status === 'loading' && (
          <p className="et-fxStatus">Fetching latest rate…</p>
        )}
        {!sameCurrency && status === 'error' && (
          <div className="et-banner et-bannerWarn">
            <strong>Preview unavailable.</strong>{' '}
            <span>{errorMessage}</span> Your totals in {ledgerCurrency} are
            still correct; try again in a moment.
          </div>
        )}
        {status === 'ready' && converted != null && (
          <>
            <p className="et-fxLine">
              <span className="et-muted">Converted total</span>
              <span className="et-fxConverted">
                {formatCurrency(converted, previewCurrency)}
              </span>
            </p>
            {rateLabel && <p className="et-fxMeta">{rateLabel}</p>}
          </>
        )}
      </div>
    </section>
  )
}
