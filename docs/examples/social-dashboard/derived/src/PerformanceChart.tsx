import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Stack, Text } from 'neus-ui'

type Props = {
  dates: Date[]
  current: number[]
  previous: number[]
  dateFormat: Intl.DateTimeFormatOptions
}

const PAD = { top: 12, right: 12, bottom: 28, left: 44 }
const fmtK = (value: number) => `${value.toLocaleString('es', { maximumFractionDigits: 1 })}\u202Fk`

// Impressions per day, current period against the previous one, on one shared axis.
export function PerformanceChart({ dates, current, previous, dateFormat }: Props) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(640)
  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  const HEIGHT = Math.round(Math.min(380, Math.max(220, width * 0.5)))
  const n = current.length
  const step = Math.ceil(Math.max(...current, ...previous) / 3 / 5) * 5
  const yMax = step * 3
  const plotW = width - PAD.left - PAD.right
  const plotH = HEIGHT - PAD.top - PAD.bottom
  const x = (i: number) => PAD.left + (plotW * i) / (n - 1)
  const y = (v: number) => PAD.top + plotH - (plotH * v) / yMax
  const path = (values: number[]) => values.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')
  const format = new Intl.DateTimeFormat('es', dateFormat)
  // One date label per ~84px; the last day is always labelled.
  const labelEvery = Math.max(1, Math.ceil(n / Math.max(1, Math.floor(plotW / 84))))

  const onPointerMove = (event: PointerEvent<SVGSVGElement>) => {
    const left = event.currentTarget.getBoundingClientRect().left
    const i = Math.round(((event.clientX - left - PAD.left) / plotW) * (n - 1))
    setActive(Math.min(n - 1, Math.max(0, i)))
  }
  const onKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    const move = { ArrowLeft: -1, ArrowRight: 1 }[event.key]
    if (!move) return
    event.preventDefault()
    setActive((i) => Math.min(n - 1, Math.max(0, (i ?? n - 1) + move)))
  }

  return (
    <div className="chart">
      <Stack as="ul" direction="row" gap={4} wrap className="chart__legend">
        <li><span className="chart__key chart__key--current" aria-hidden="true" />Este periodo</li>
        <li><span className="chart__key chart__key--previous" aria-hidden="true" />Periodo anterior</li>
      </Stack>
      <div className="chart__frame" ref={frameRef}>
        <svg
          width={width}
          height={HEIGHT}
          role="img"
          aria-label="Impresiones por día del periodo actual y del anterior. Usa las flechas para recorrer los días; la tabla siguiente tiene los mismos datos."
          tabIndex={0}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setActive(null)}
          onKeyDown={onKeyDown}
          onBlur={() => setActive(null)}
        >
          {[0, 1, 2, 3].map((t) => (
            <g key={t}>
              <line className="chart__grid" x1={PAD.left} x2={width - PAD.right} y1={y(t * step)} y2={y(t * step)} />
              <text className="chart__tick" x={PAD.left - 8} y={y(t * step)} textAnchor="end" dominantBaseline="middle">
                {t === 0 ? '0' : fmtK(t * step)}
              </text>
            </g>
          ))}
          {dates.map((date, i) =>
            i === n - 1 || (i % labelEvery === 0 && n - 1 - i >= labelEvery) ? (
              <text key={i} className="chart__tick" x={x(i)} y={HEIGHT - 8} textAnchor={i === n - 1 ? 'end' : i === 0 ? 'start' : 'middle'}>
                {format.format(date)}
              </text>
            ) : null,
          )}
          <path className="chart__line chart__line--previous" d={path(previous)} />
          <path className="chart__line chart__line--current" d={path(current)} />
          {active !== null && (
            <g>
              <line className="chart__crosshair" x1={x(active)} x2={x(active)} y1={PAD.top} y2={PAD.top + plotH} />
              <circle className="chart__dot chart__dot--previous" cx={x(active)} cy={y(previous[active])} r={4} />
              <circle className="chart__dot chart__dot--current" cx={x(active)} cy={y(current[active])} r={5} />
            </g>
          )}
        </svg>
        {active !== null && (
          <div
            className="chart__tooltip"
            style={{ left: Math.min(Math.max(x(active), 90), width - 90) }}
            aria-live="polite"
          >
            <Text as="span" variant="caption" tone="muted">{format.format(dates[active])}</Text>
            <span className="chart__tooltip-row">
              <span className="chart__key chart__key--current" aria-hidden="true" />
              Este periodo <strong className="figure">{fmtK(current[active])}</strong>
            </span>
            <span className="chart__tooltip-row">
              <span className="chart__key chart__key--previous" aria-hidden="true" />
              Anterior <strong className="figure">{fmtK(previous[active])}</strong>
            </span>
          </div>
        )}
      </div>
      <table className="visually-hidden">
        <caption>Impresiones por día</caption>
        <thead>
          <tr><th scope="col">Día</th><th scope="col">Este periodo</th><th scope="col">Periodo anterior</th></tr>
        </thead>
        <tbody>
          {dates.map((date, i) => (
            <tr key={i}><th scope="row">{format.format(date)}</th><td>{fmtK(current[i])}</td><td>{fmtK(previous[i])}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
