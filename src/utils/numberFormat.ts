export const { format: formatNumber } = Intl.NumberFormat('id-ID', {
  notation: 'standard',
  maximumFractionDigits: 1,
})

export const { format: formatInCurrency } = Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  currencyDisplay: 'code',
  maximumSignificantDigits: 12,
})

const { format: formatDate } = Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export function convertDateFromMilli(milliseconds: number): string {
  const date = new Date(milliseconds)

  return formatDate(date)
}
