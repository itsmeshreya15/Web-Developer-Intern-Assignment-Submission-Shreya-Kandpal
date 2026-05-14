/** Expense categories required by the brief */
export const EXPENSE_CATEGORIES = [
  'Food',
  'Travel',
  'Marketing',
  'Utilities',
  'Other',
]

/**
 * Currencies supported by Frankfurter (subset, widely used).
 * @see https://www.frankfurter.app/docs/
 */
export const CURRENCY_OPTIONS = [
  { code: 'USD', label: 'US Dollar (USD)' },
  { code: 'EUR', label: 'Euro (EUR)' },
  { code: 'GBP', label: 'British Pound (GBP)' },
  { code: 'INR', label: 'Indian Rupee (INR)' },
  { code: 'JPY', label: 'Japanese Yen (JPY)' },
  { code: 'AUD', label: 'Australian Dollar (AUD)' },
  { code: 'CAD', label: 'Canadian Dollar (CAD)' },
  { code: 'CHF', label: 'Swiss Franc (CHF)' },
  { code: 'SGD', label: 'Singapore Dollar (SGD)' },
  { code: 'NZD', label: 'New Zealand Dollar (NZD)' },
]

export const FRANKFURTER_BASE = 'https://api.frankfurter.app'
