/**
 * Object containing the 'formatNumber' function for formatting numbers in standard notation.
 * @type {{ format: (value: number) => string }}
 */
export const { format: formatNumber } = Intl.NumberFormat('id-ID', {
  notation: 'standard',
  maximumFractionDigits: 1,
})

/**
 * Object containing the 'formatInCurrency' function for formatting numbers in currency format (IDR).
 * @type {{ format: (value: number) => string }}
 */
export const { format: formatInCurrency } = Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  currencyDisplay: 'code',
  maximumSignificantDigits: 12,
})

/**
 * Object containing the 'formatDate' function for formatting dates in 'dd-MM-yyyy' format.
 * @type {{ format: (date: Date) => string }}
 */
const { format: formatDate } = Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

/**
 * Function for converting a millisecond timestamp to a formatted date string.
 * @param {number} milliseconds - The timestamp in milliseconds.
 * @returns {string} - The formatted date string.
 */
export function convertDateFromMilli(milliseconds: number): string {
  const date = new Date(milliseconds)

  return formatDate(date)
}
