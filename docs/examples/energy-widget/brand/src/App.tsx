import { useState } from 'react'
import { Card, CardContent, CardHeader, Container, Grid, Heading, Input, Stack, Text } from 'neus-ui'
import { estimate } from './estimate'
import './App.css'

const money = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 })

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

type SliderProps = {
  id: string
  label: string
  value: number
  min: number
  max: number
  unit: (value: number) => string
  onChange: (value: number) => void
}

function Slider({ id, label, value, min, max, unit, onChange }: SliderProps) {
  return (
    <Stack gap={2}>
      <Stack direction="row" justify="between" align="baseline" gap={3}>
        <label htmlFor={id} className="calc-label">{label}</label>
        <output htmlFor={id} className="calc-value">{unit(value)}</output>
      </Stack>
      <input
        id={id}
        className="calc-range"
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        aria-valuetext={unit(value)}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <Stack direction="row" justify="between" aria-hidden="true">
        <Text as="span" variant="caption" tone="muted" numeric>{min}</Text>
        <Text as="span" variant="caption" tone="muted" numeric>{max}</Text>
      </Stack>
    </Stack>
  )
}

function parsePositive(value: string, max = Infinity) {
  const parsed = Number(value.replace(',', '.'))
  return value.trim() !== '' && Number.isFinite(parsed) && parsed >= 0 && parsed <= max ? parsed : null
}

function App() {
  const [rooms, setRooms] = useState(3)
  const [hours, setHours] = useState(6)
  const [price, setPrice] = useState('120')
  // SAMPLE: average electric heater per room; replace with the real figure.
  const [power, setPower] = useState('1.5')
  // SAMPLE: expected savings of the measure being evaluated; replace with the real figure.
  const [savingsPct, setSavingsPct] = useState('10')

  const priceValue = parsePositive(price)
  const powerValue = parsePositive(power)
  const pctValue = parsePositive(savingsPct, 100)
  const valid = priceValue !== null && powerValue !== null && pctValue !== null
  const result = valid ? estimate(rooms, hours, powerValue, priceValue, pctValue) : null
  const share = result && result.cost > 0 ? result.savings / result.cost : 0

  return (
    <Container as="main" size="lg" className="calc-page">
      <Card variant="outlined">
        <CardHeader>
          <Stack gap={2}>
            <Heading as="h1" size="lg">Calculadora de ahorro energético</Heading>
            <Text tone="muted">Mové los controles y mirá cuánto podés ahorrar por mes en calefacción.</Text>
          </Stack>
        </CardHeader>
        <CardContent>
          <Stack gap={8}>
            <Grid columns={{ base: 1, md: 2 }} gap={{ base: 8, md: 12 }}>
              <Stack gap={8}>
                <Slider
                  id="rooms"
                  label="Habitaciones con calefacción"
                  value={rooms}
                  min={1}
                  max={10}
                  unit={(value) => (value === 1 ? '1 habitación' : `${value} habitaciones`)}
                  onChange={setRooms}
                />
                <Slider
                  id="hours"
                  label="Horas de calefacción por día"
                  value={hours}
                  min={0}
                  max={24}
                  unit={(value) => (value === 1 ? '1 hora' : `${value} horas`)}
                  onChange={setHours}
                />
              </Stack>

              <Stack as="section" gap={4} aria-labelledby="result-title" aria-live="polite">
                <Heading as="h2" size="xs" id="result-title">Ahorro mensual estimado</Heading>
                {!result ? (
                  <Text tone="error">Revisá los supuestos del cálculo para ver la estimación.</Text>
                ) : result.cost === 0 ? (
                  <Text>Sin horas de calefacción no hay consumo que ahorrar. Subí las horas para ver la estimación.</Text>
                ) : (
                  <Stack direction={{ base: 'column', md: 'row' }} gap={6} align="center">
                    <svg className="calc-pie" viewBox="0 0 120 120" role="img" aria-label={`El ahorro es el ${Math.round(share * 100)} % del gasto mensual`}>
                      <circle className="calc-pie__rest" cx="60" cy="60" r={RADIUS} />
                      <circle
                        className="calc-pie__savings"
                        cx="60"
                        cy="60"
                        r={RADIUS}
                        strokeDasharray={`${share * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                      />
                      <text x="60" y="60" className="calc-pie__label">{Math.round(share * 100)} %</text>
                    </svg>
                    <Stack gap={4}>
                      <Text className="calc-amount">{money.format(result.savings)}<Text as="span" variant="lead" tone="muted"> por mes</Text></Text>
                      <Stack as="ul" gap={2}>
                        <li className="calc-legend calc-legend--savings">
                          <Text as="span">Ahorro: <Text as="strong" weight="semibold" numeric>{money.format(result.savings)}</Text></Text>
                        </li>
                        <li className="calc-legend calc-legend--rest">
                          <Text as="span">Gasto que queda: <Text as="strong" weight="semibold" numeric>{money.format(result.cost - result.savings)}</Text></Text>
                        </li>
                      </Stack>
                      <Text tone="muted" numeric>
                        Consumo de {number.format(result.kWh)} kWh al mes, con un gasto de {money.format(result.cost)}.
                      </Text>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </Grid>

            <Stack as="section" gap={4} aria-labelledby="assumptions-title" className="calc-assumptions">
              <Stack gap={1}>
                <Heading as="h2" size="xs" id="assumptions-title">Supuestos del cálculo</Heading>
                <Text tone="muted">
                  Consumo = habitaciones × potencia × horas × 30 días. Cambiá estos valores por los de tu hogar.
                </Text>
              </Stack>
              <Grid columns={{ base: 1, md: 3 }} gap={4}>
                <Input
                  type="number"
                  label="Precio de la energía"
                  suffix="$/kWh"
                  min={0}
                  value={price}
                  onChange={setPrice}
                  error={priceValue === null ? 'Ingresá un precio de 0 o más.' : undefined}
                  description="Lo encontrás en tu factura."
                />
                <Input
                  type="number"
                  label="Potencia por habitación"
                  suffix="kW"
                  min={0}
                  step={0.1}
                  value={power}
                  onChange={setPower}
                  error={powerValue === null ? 'Ingresá una potencia de 0 o más.' : undefined}
                  description="Figura en la etiqueta del calefactor."
                />
                <Input
                  type="number"
                  label="Ahorro esperado"
                  suffix="%"
                  min={0}
                  max={100}
                  value={savingsPct}
                  onChange={setSavingsPct}
                  error={pctValue === null ? 'Ingresá un porcentaje entre 0 y 100.' : undefined}
                  description="Lo que ahorra el cambio que evaluás."
                />
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export default App
