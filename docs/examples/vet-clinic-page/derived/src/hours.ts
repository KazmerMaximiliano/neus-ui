export const HOURS = [
  { days: 'Lunes a viernes', time: '9 a 20 h' },
  { days: 'Sábados', time: '9 a 13 h' },
  { days: 'Domingos y feriados', time: 'Cerrado' },
]

// Closing hour today in Rosario if the clinic is open at `now`, else null.
// ponytail: ignores public holidays; add a holiday list if the badge must reflect them.
export const closingHour = (now: Date): number | null => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Argentina/Buenos_Aires',
    weekday: 'short',
    hour: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(now)
  const day = parts.find((part) => part.type === 'weekday')?.value
  const hour = Number(parts.find((part) => part.type === 'hour')?.value)
  const closes = day === 'Sun' ? null : day === 'Sat' ? 13 : 20
  return closes !== null && hour >= 9 && hour < closes ? closes : null
}
