import { useRef, useState, type KeyboardEvent } from 'react'
import { CalendarDays, FileText, LayoutDashboard, Users } from 'lucide-react'
import { AppTemplate, Badge, Card, CardContent, CardHeader, Grid, Heading, Stack, Text } from 'neus-ui'
import './App.css'

type PeriodId = 'week' | 'month'

type Period = {
  label: string
  range: string
  compare: string
  impressionsPrev: number
  clicks: number
  ctrPrev: number
  followersNew: number
  followersPrev: number
  followersTotal: number
  networks: { name: string; value: number }[]
  series: { label: string; organic: number; paid: number }[]
  topPosts: { title: string; network: string; impressions: number; ctr: number }[]
}

// SAMPLE: replace with the analytics API response for each period.
const PERIODS: Record<PeriodId, Period> = {
  week: {
    label: 'Últimos 7 días',
    range: '13 – 19 oct 2026',
    compare: 'vs. 7 días anteriores',
    impressionsPrev: 155400,
    clicks: 6690,
    ctrPrev: 0.034,
    followersNew: 1248,
    followersPrev: 1096,
    followersTotal: 48210,
    networks: [
      { name: 'Instagram', value: 612 },
      { name: 'LinkedIn', value: 341 },
      { name: 'TikTok', value: 203 },
      { name: 'X', value: 92 },
    ],
    series: [
      { label: 'mar 13', organic: 17800, paid: 6400 },
      { label: 'mié 14', organic: 19200, paid: 7100 },
      { label: 'jue 15', organic: 21500, paid: 8300 },
      { label: 'vie 16', organic: 20100, paid: 7600 },
      { label: 'sáb 17', organic: 14300, paid: 4900 },
      { label: 'dom 18', organic: 12600, paid: 4100 },
      { label: 'lun 19', organic: 22800, paid: 9400 },
    ],
    topPosts: [
      { title: 'Reel: detrás de cámaras del lanzamiento de otoño', network: 'Instagram', impressions: 32400, ctr: 0.051 },
      { title: 'Carrusel: 5 errores al medir el alcance', network: 'LinkedIn', impressions: 21800, ctr: 0.046 },
      { title: 'Video: probamos la nueva colección', network: 'TikTok', impressions: 18900, ctr: 0.039 },
    ],
  },
  month: {
    label: 'Último mes',
    range: '22 sep – 19 oct 2026',
    compare: 'vs. 4 semanas anteriores',
    impressionsPrev: 612300,
    clicks: 23700,
    ctrPrev: 0.033,
    followersNew: 4906,
    followersPrev: 4310,
    followersTotal: 48210,
    networks: [
      { name: 'Instagram', value: 2380 },
      { name: 'LinkedIn', value: 1290 },
      { name: 'TikTok', value: 884 },
      { name: 'X', value: 352 },
    ],
    series: [
      { label: '22–28 sep', organic: 118400, paid: 39200 },
      { label: '29 sep–5 oct', organic: 124900, paid: 41800 },
      { label: '6–12 oct', organic: 131200, paid: 45600 },
      { label: '13–19 oct', organic: 128300, paid: 47800 },
    ],
    topPosts: [
      { title: 'Reel: detrás de cámaras del lanzamiento de otoño', network: 'Instagram', impressions: 58700, ctr: 0.048 },
      { title: 'Artículo: cómo planificamos el calendario de octubre', network: 'LinkedIn', impressions: 41200, ctr: 0.042 },
      { title: 'Carrusel: 5 errores al medir el alcance', network: 'LinkedIn', impressions: 39600, ctr: 0.044 },
    ],
  },
}

const TABS: PeriodId[] = ['week', 'month']

const integer = new Intl.NumberFormat('es', { maximumFractionDigits: 0 })
const compact = new Intl.NumberFormat('es', { notation: 'compact', maximumFractionDigits: 1 })
const percent = new Intl.NumberFormat('es', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 })
const change = new Intl.NumberFormat('es', { style: 'percent', maximumFractionDigits: 1, signDisplay: 'exceptZero' })
const points = new Intl.NumberFormat('es', { maximumFractionDigits: 1, signDisplay: 'exceptZero' })

const routes = [
  { label: 'Resumen', icon: LayoutDashboard, href: '/', active: true },
  { label: 'Publicaciones', icon: FileText, href: '/publicaciones' },
  { label: 'Audiencia', icon: Users, href: '/audiencia' },
  { label: 'Calendario', icon: CalendarDays, href: '/calendario' },
]

const Delta = ({ value, label }: { value: number; label: string }) => (
  <Badge variant="dot" color={value >= 0 ? 'success' : 'error'} label={label} />
)

/** Line of a series, drawn in a 100×40 box that stretches to the card. */
const Sparkline = ({ values }: { values: number[] }) => {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${36 - ((v - min) / (max - min || 1)) * 32}`)
  return (
    <svg className="sparkline" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
      <polygon className="sparkline__area" points={`0,40 ${pts.join(' ')} 100,40`} />
      <polyline className="sparkline__line" points={pts.join(' ')} />
    </svg>
  )
}

const App = () => {
  const [periodId, setPeriodId] = useState<PeriodId>('week')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const p = PERIODS[periodId]

  const totals = p.series.map((s) => s.organic + s.paid)
  const impressions = totals.reduce((a, b) => a + b, 0)
  const organic = p.series.reduce((a, s) => a + s.organic, 0)
  const ctr = p.clicks / impressions
  const chartMax = Math.max(...totals)
  const topNetwork = Math.max(...p.networks.map((n) => n.value))

  const onTabKey = (e: KeyboardEvent, index: number) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key]
    if (!step) return
    const next = (index + step + TABS.length) % TABS.length
    setPeriodId(TABS[next])
    tabRefs.current[next]?.focus()
  }

  return (
    <AppTemplate title="Redes sociales" routes={routes}>
      <Stack gap={6} className="dashboard">
        <Stack direction={{ base: 'column', md: 'row' }} justify="between" align="end" gap={4}>
          <Stack gap={1}>
            <Heading as="h1">Resumen de rendimiento</Heading>
            <Text tone="muted">{p.range} · Instagram, LinkedIn, TikTok y X</Text>
          </Stack>
          <div className="period-tabs" role="tablist" aria-label="Periodo">
            {TABS.map((id, i) => (
              <button
                key={id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={periodId === id}
                aria-controls="period-panel"
                tabIndex={periodId === id ? 0 : -1}
                className="period-tabs__tab"
                onClick={() => setPeriodId(id)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {PERIODS[id].label}
              </button>
            ))}
          </div>
        </Stack>

        <Grid
          id="period-panel"
          role="tabpanel"
          aria-labelledby={`tab-${periodId}`}
          columns={{ base: 1, md: 2, lg: 4 }}
          gap={4}
          className="bento"
        >
          <Card className="bento__impressions">
            <CardContent>
              <Stack gap={3}>
                <Stack direction="row" justify="between" align="center" wrap gap={2}>
                  <Heading as="h2" size="xs">Impresiones</Heading>
                  <Delta
                    value={impressions - p.impressionsPrev}
                    label={`${change.format(impressions / p.impressionsPrev - 1)} ${p.compare}`}
                  />
                </Stack>
                <Text className="metric">{integer.format(impressions)}</Text>
                <Text variant="small" tone="muted">
                  {percent.format(organic / impressions)} orgánicas · {integer.format(impressions - organic)} promocionadas
                </Text>
                <Sparkline values={totals} />
              </Stack>
            </CardContent>
          </Card>

          <Card className="bento__ctr">
            <CardContent>
              <Stack gap={3}>
                <Heading as="h2" size="xs">Tasa de clics (CTR)</Heading>
                <Text className="metric">{percent.format(ctr)}</Text>
                <Text variant="small" tone="muted">{integer.format(p.clicks)} clics en enlaces</Text>
                <Stack as="ul" gap={2} aria-label="CTR por periodo">
                  {[
                    { name: 'Este periodo', value: ctr, tone: 'organic' },
                    { name: 'Periodo anterior', value: p.ctrPrev, tone: 'paid' },
                  ].map((row) => (
                    <li key={row.name} className="networks__row">
                      <Text as="span" variant="small">{row.name}</Text>
                      <Text as="span" variant="small" numeric weight="semibold">{percent.format(row.value)}</Text>
                      <span
                        className={`networks__bar chart__bar--${row.tone}`}
                        style={{ inlineSize: `${(row.value / Math.max(ctr, p.ctrPrev)) * 100}%` }}
                      />
                    </li>
                  ))}
                </Stack>
                <Delta
                  value={ctr - p.ctrPrev}
                  label={`${points.format((ctr - p.ctrPrev) * 100)} pp ${p.compare}`}
                />
              </Stack>
            </CardContent>
          </Card>

          <Card className="bento__followers">
            <CardContent>
              <Stack gap={3}>
                <Heading as="h2" size="xs">Nuevos seguidores</Heading>
                <Text className="metric">+{integer.format(p.followersNew)}</Text>
                <Delta
                  value={p.followersNew - p.followersPrev}
                  label={`${change.format(p.followersNew / p.followersPrev - 1)} ${p.compare}`}
                />
                <Stack as="ul" gap={2} aria-label="Nuevos seguidores por red">
                  {p.networks.map((n) => (
                    <li key={n.name} className="networks__row">
                      <Text as="span" variant="small">{n.name}</Text>
                      <Text as="span" variant="small" numeric weight="semibold">{integer.format(n.value)}</Text>
                      <span className="networks__bar" style={{ inlineSize: `${(n.value / topNetwork) * 100}%` }} />
                    </li>
                  ))}
                </Stack>
                <Text variant="small" tone="muted">{integer.format(p.followersTotal)} seguidores en total</Text>
              </Stack>
            </CardContent>
          </Card>

          <Card className="bento__chart">
            <CardHeader>
              <Stack gap={1}>
                <Heading as="h2" size="sm">Rendimiento de publicaciones</Heading>
                <Text variant="small" tone="muted">
                  Impresiones por {periodId === 'week' ? 'día' : 'semana'}
                </Text>
              </Stack>
              <Stack as="ul" direction="row" gap={4} wrap className="legend">
                <li><span className="legend__swatch legend__swatch--organic" />Orgánicas</li>
                <li><span className="legend__swatch legend__swatch--paid" />Promocionadas</li>
              </Stack>
            </CardHeader>
            <CardContent>
              <div className="chart" aria-hidden="true">
                {p.series.map((s, i) => (
                  <div key={s.label} className="chart__group">
                    <Text as="span" variant="caption" numeric className="chart__total">
                      {compact.format(totals[i])}
                    </Text>
                    <div className="chart__track">
                      <span className="chart__bar chart__bar--paid" style={{ blockSize: `${(s.paid / chartMax) * 100}%` }} />
                      <span className="chart__bar chart__bar--organic" style={{ blockSize: `${(s.organic / chartMax) * 100}%` }} />
                    </div>
                    <Text as="span" variant="caption" tone="muted" className="chart__label">{s.label}</Text>
                  </div>
                ))}
              </div>
              <div className="visually-hidden">
              <table>
                <caption>Impresiones orgánicas y promocionadas, {p.label.toLowerCase()}</caption>
                <thead>
                  <tr><th scope="col">Periodo</th><th scope="col">Orgánicas</th><th scope="col">Promocionadas</th></tr>
                </thead>
                <tbody>
                  {p.series.map((s) => (
                    <tr key={s.label}>
                      <th scope="row">{s.label}</th>
                      <td>{integer.format(s.organic)}</td>
                      <td>{integer.format(s.paid)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bento__top">
            <CardHeader>
              <Heading as="h2" size="sm">Mejores publicaciones</Heading>
            </CardHeader>
            <CardContent>
              <Stack as="ol" gap={4} className="top-posts">
                {p.topPosts.map((post) => (
                  <li key={post.title} className="top-posts__item">
                    <Text weight="medium" lines={2}>{post.title}</Text>
                    <Text variant="small" tone="muted" numeric>
                      {post.network} · {compact.format(post.impressions)} impresiones · CTR {percent.format(post.ctr)}
                    </Text>
                  </li>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Stack>
    </AppTemplate>
  )
}

export default App
