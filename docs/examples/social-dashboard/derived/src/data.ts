// SAMPLE: every figure in this file is example data; replace it with the analytics API.

export type Period = '7d' | '30d'
export type Network = 'Instagram' | 'TikTok' | 'LinkedIn'

export const END_DATE = new Date(2026, 9, 20)

// Daily impressions, in thousands, oldest first. The 7-day view is the tail of the month.
const MONTH = [
  15.1, 16.4, 14.8, 17.9, 19.2, 16.7, 15.9, 17.3, 18.8, 16.2, 19.5, 21.0, 18.4, 17.6, 20.3,
  22.1, 19.7, 18.9, 21.6, 23.4, 20.8, 18.2, 21.4, 19.8, 24.6, 27.1, 22.9, 25.3, 23.7, 24.9,
]
const PREVIOUS_MONTH = [
  14.2, 15.0, 13.9, 16.1, 17.4, 15.2, 14.6, 15.8, 16.9, 14.8, 17.2, 18.6, 16.5, 15.9, 18.0,
  19.4, 17.6, 16.8, 19.1, 20.5, 18.3, 16.9, 18.1, 17.4, 20.2, 22.8, 19.5, 21.0, 20.4, 21.2,
]

type NetworkRow = { network: Network; impressions: number; ctr: number; newFollowers: number }
type Post = { id: string; network: Network; format: string; title: string; impressions: number; ctr: number }

type PeriodData = {
  current: number[]
  previous: number[]
  previousCtr: number
  previousNewFollowers: number
  totalFollowers: number
  networks: NetworkRow[]
  posts: Post[]
}

export const DATA: Record<Period, PeriodData> = {
  '7d': {
    current: MONTH.slice(-7),
    previous: MONTH.slice(-14, -7),
    previousCtr: 3.4,
    previousNewFollowers: 1040,
    totalFollowers: 48920,
    networks: [
      { network: 'Instagram', impressions: 82.6, ctr: 3.6, newFollowers: 598 },
      { network: 'TikTok', impressions: 64.9, ctr: 3.4, newFollowers: 471 },
      { network: 'LinkedIn', impressions: 20.8, ctr: 5.2, newFollowers: 162 },
    ],
    posts: [
      { id: 'p1', network: 'Instagram', format: 'Reel', title: 'Detrás de cámaras de la sesión de otoño', impressions: 32.4, ctr: 5.1 },
      { id: 'p2', network: 'TikTok', format: 'Vídeo', title: 'Tres trucos para fotografiar producto con el móvil', impressions: 28.9, ctr: 4.6 },
      { id: 'p3', network: 'LinkedIn', format: 'Artículo', title: 'Cómo duplicamos el alcance orgánico en un trimestre', impressions: 12.7, ctr: 6.3 },
      { id: 'p4', network: 'Instagram', format: 'Carrusel', title: 'Guía de colores de la temporada', impressions: 11.2, ctr: 3.9 },
    ],
  },
  '30d': {
    current: MONTH,
    previous: PREVIOUS_MONTH,
    previousCtr: 3.3,
    previousNewFollowers: 4120,
    totalFollowers: 48920,
    networks: [
      { network: 'Instagram', impressions: 291.8, ctr: 3.5, newFollowers: 2340 },
      { network: 'TikTok', impressions: 233.1, ctr: 3.2, newFollowers: 1910 },
      { network: 'LinkedIn', impressions: 74.6, ctr: 5.0, newFollowers: 655 },
    ],
    posts: [
      { id: 'p5', network: 'TikTok', format: 'Vídeo', title: 'Un día en el estudio en 60 segundos', impressions: 84.3, ctr: 4.2 },
      { id: 'p1', network: 'Instagram', format: 'Reel', title: 'Detrás de cámaras de la sesión de otoño', impressions: 61.7, ctr: 4.8 },
      { id: 'p6', network: 'Instagram', format: 'Carrusel', title: 'Antes y después: rediseño del empaque', impressions: 47.5, ctr: 3.7 },
      { id: 'p3', network: 'LinkedIn', format: 'Artículo', title: 'Cómo duplicamos el alcance orgánico en un trimestre', impressions: 29.8, ctr: 6.1 },
    ],
  },
}

export const sum = (values: number[]) => values.reduce((total, value) => total + value, 0)

// CTR of the whole period, weighted by each network's impressions.
export const weightedCtr = (rows: NetworkRow[]) =>
  sum(rows.map((row) => row.ctr * row.impressions)) / sum(rows.map((row) => row.impressions))
