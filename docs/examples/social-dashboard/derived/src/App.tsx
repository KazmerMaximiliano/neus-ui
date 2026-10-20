import { useRef, useState, type KeyboardEvent } from 'react'
import { AppTemplate, Badge, Card, CardContent, Heading, Stack, Text } from 'neus-ui'
import { ArrowDownRight, ArrowUpRight, LayoutDashboard, Newspaper, Share2 } from 'lucide-react'
import { DATA, END_DATE, sum, weightedCtr, type Period } from './data'
import { PerformanceChart } from './PerformanceChart'
import './App.css'

const PERIODS: { id: Period; label: string; days: number; dateFormat: Intl.DateTimeFormatOptions }[] = [
  { id: '7d', label: 'Últimos 7 días', days: 7, dateFormat: { weekday: 'short', day: 'numeric' } },
  { id: '30d', label: 'Último mes', days: 30, dateFormat: { day: 'numeric', month: 'short' } },
]

const routes = [
  { label: 'Resumen', href: '#resumen', icon: LayoutDashboard, active: true },
  { label: 'Publicaciones', href: '#publicaciones', icon: Newspaper },
  { label: 'Redes', href: '#redes', icon: Share2 },
]

const num = (value: number, digits = 0) =>
  // 'always' groups four-digit figures too (1.231, not 1231); es only groups from five digits by default.
  new Intl.NumberFormat('es', { minimumFractionDigits: digits, maximumFractionDigits: digits, useGrouping: 'always' }).format(value)

function Delta({ value, unit }: { value: number; unit: string }) {
  const up = value >= 0
  const Icon = up ? ArrowUpRight : ArrowDownRight
  return (
    <Text as="span" variant="small" tone={up ? 'success' : 'error'} className="delta">
      <Icon size={16} aria-hidden="true" />
      <span className="figure">{up ? '+' : '−'}{num(Math.abs(value), 1)} {unit}</span>
      <Text as="span" variant="small" tone="muted">vs. periodo anterior</Text>
    </Text>
  )
}

function App() {
  const [period, setPeriod] = useState<Period>('7d')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const config = PERIODS.find((p) => p.id === period)!
  const data = DATA[period]

  const impressions = sum(data.current)
  const impressionsDelta = (impressions / sum(data.previous) - 1) * 100
  const ctr = weightedCtr(data.networks)
  const newFollowers = sum(data.networks.map((row) => row.newFollowers))
  const followersDelta = (newFollowers / data.previousNewFollowers - 1) * 100
  const dates = data.current.map((_, i) => {
    const date = new Date(END_DATE)
    date.setDate(date.getDate() - (data.current.length - 1 - i))
    return date
  })
  const range = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'long' }).formatRange(dates[0], END_DATE)

  // Roving focus between the two tabs (WAI-ARIA tabs pattern).
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const move = { ArrowLeft: -1, ArrowRight: 1 }[event.key]
    if (!move) return
    const next = (index + move + PERIODS.length) % PERIODS.length
    setPeriod(PERIODS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <AppTemplate title="Pulso social" routes={routes}>
      <Stack gap={6} className="dashboard">
        <Stack as="header" id="resumen" direction={{ base: 'column', md: 'row' }} justify="between" align="end" gap={4}>
          <Stack gap={1}>
            <Heading as="h1" size="lg">Rendimiento en redes</Heading>
            <Text tone="muted">Instagram, TikTok y LinkedIn · {range}</Text>
          </Stack>
          {/* No Tabs in the neus-ui catalog and Button does not forward aria-selected, so the tablist is native. */}
          <div className="period-tabs" role="tablist" aria-label="Periodo">
            {PERIODS.map((p, index) => (
              <button
                key={p.id}
                ref={(el) => { tabRefs.current[index] = el }}
                type="button"
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={p.id === period}
                aria-controls="panel-periodo"
                tabIndex={p.id === period ? 0 : -1}
                className="period-tabs__tab"
                onClick={() => setPeriod(p.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </Stack>

        <div className="bento" id="panel-periodo" role="tabpanel" aria-labelledby={`tab-${period}`}>
          <Card as="section" className="bento__kpi" aria-labelledby="kpi-impresiones">
            <CardContent>
              <Stack gap={2}>
                <Heading as="h2" size="xs" id="kpi-impresiones">Impresiones</Heading>
                <Text as="p" className="kpi-value figure">{num(impressions, 1)} k</Text>
                <Delta value={impressionsDelta} unit="%" />
              </Stack>
            </CardContent>
          </Card>

          <Card as="section" className="bento__kpi" aria-labelledby="kpi-ctr">
            <CardContent>
              <Stack gap={2}>
                <Heading as="h2" size="xs" id="kpi-ctr">Tasa de clics (CTR)</Heading>
                <Text as="p" className="kpi-value figure">{num(ctr, 1)} %</Text>
                <Delta value={ctr - data.previousCtr} unit="pp" />
              </Stack>
            </CardContent>
          </Card>

          <Card as="section" className="bento__kpi" aria-labelledby="kpi-seguidores">
            <CardContent>
              <Stack gap={2}>
                <Heading as="h2" size="xs" id="kpi-seguidores">Nuevos seguidores</Heading>
                <Text as="p" className="kpi-value figure">+{num(newFollowers)}</Text>
                <Delta value={followersDelta} unit="%" />
                <Text variant="small" tone="muted">
                  <span className="figure">{num(data.totalFollowers)}</span> seguidores en total
                </Text>
              </Stack>
            </CardContent>
          </Card>

          <Card as="section" className="bento__chart" aria-labelledby="chart-title">
            <CardContent>
              <Stack gap={4}>
                <Stack gap={1}>
                  <Heading as="h2" size="sm" id="chart-title">Rendimiento de publicaciones</Heading>
                  <Text variant="small" tone="muted">Impresiones por día, en miles, de todas las publicaciones</Text>
                </Stack>
                <PerformanceChart dates={dates} current={data.current} previous={data.previous} dateFormat={config.dateFormat} />
              </Stack>
            </CardContent>
          </Card>

          <Card as="section" className="bento__posts" id="publicaciones" aria-labelledby="posts-title">
            <CardContent>
              <Stack gap={4}>
                <Heading as="h2" size="sm" id="posts-title">Publicaciones destacadas</Heading>
                <Stack as="ol" gap={4} className="post-list">
                  {data.posts.map((post) => (
                    <li key={post.id} className="post-list__item">
                      <Stack gap={1}>
                        <Stack direction="row" gap={2} align="center">
                          <Badge label={post.network} color="neutral" />
                          <Text as="span" variant="caption" tone="muted">{post.format}</Text>
                        </Stack>
                        <Text weight="medium" lines={2}>{post.title}</Text>
                        <Text variant="small" tone="muted">
                          <span className="figure">{num(post.impressions, 1)} k</span> impresiones · CTR{' '}
                          <span className="figure">{num(post.ctr, 1)} %</span>
                        </Text>
                      </Stack>
                    </li>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Card as="section" className="bento__networks" id="redes" aria-labelledby="networks-title">
            <CardContent>
              <Stack gap={4}>
                <Heading as="h2" size="sm" id="networks-title">Por red</Heading>
                <table className="network-table">
                  <thead>
                    <tr>
                      <th scope="col">Red</th>
                      <th scope="col">Impresiones</th>
                      <th scope="col">Participación</th>
                      <th scope="col">CTR</th>
                      <th scope="col">Nuevos seguidores</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.networks.map((row) => {
                      const share = (row.impressions / impressions) * 100
                      return (
                        <tr key={row.network}>
                          <th scope="row">{row.network}</th>
                          <td className="figure">{num(row.impressions, 1)} k</td>
                          <td>
                            <span className="share">
                              <span className="share__bar" style={{ width: `${(share / 100) * 96}px` }} aria-hidden="true" />
                              <span className="figure">{num(share)} %</span>
                            </span>
                          </td>
                          <td className="figure">{num(row.ctr, 1)} %</td>
                          <td className="figure">+{num(row.newFollowers)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </Stack>
            </CardContent>
          </Card>
        </div>
      </Stack>
    </AppTemplate>
  )
}

export default App
