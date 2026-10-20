// Monthly heating estimate: rooms × kW per room × hours per day × 30 days.
export const DAYS_PER_MONTH = 30

export type Estimate = { kWh: number; cost: number; savings: number }

export function estimate(rooms: number, hours: number, kWPerRoom: number, pricePerKWh: number, savingsPct: number): Estimate {
  const kWh = rooms * kWPerRoom * hours * DAYS_PER_MONTH
  const cost = kWh * pricePerKWh
  return { kWh, cost, savings: cost * (savingsPct / 100) }
}
