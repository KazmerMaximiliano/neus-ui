import { useId, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, Heading, Stack, Text } from "neus-ui";
import "./EnergyCalculator.css";

// Generic reference values, shown to the user under the result. Tune here.
const KW_PER_ROOM = 1.5;
const EUR_PER_KWH = 0.2;
const DAYS_PER_MONTH = 30;
const BASE_SAVING = 0.07; // bajar el termostato 1 °C
const SAVING_PER_HOUR = 0.01; // programación horaria, crece con las horas de uso

const eur = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
const pct = new Intl.NumberFormat("es-ES", { style: "percent" });

export function estimate(rooms: number, hours: number) {
  const cost = rooms * KW_PER_ROOM * hours * DAYS_PER_MONTH * EUR_PER_KWH;
  const rate = BASE_SAVING + SAVING_PER_HOUR * hours;
  return { cost, rate, saving: cost * rate };
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: (n: number) => string;
  onChange: (n: number) => void;
};

function Slider({ label, value, min, max, unit, onChange }: SliderProps) {
  const id = useId();
  return (
    <div className="energy-slider">
      <div className="energy-slider__row">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{unit(value)}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        aria-valuetext={unit(value)}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="energy-slider__scale" aria-hidden="true">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function Donut({ rate }: { rate: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <svg className="energy-donut" viewBox="0 0 120 120" aria-hidden="true">
      <circle className="energy-donut__rest" cx="60" cy="60" r={r} />
      <circle
        className="energy-donut__saving"
        cx="60"
        cy="60"
        r={r}
        strokeDasharray={`${c * rate} ${c}`}
        transform="rotate(-90 60 60)"
      />
    </svg>
  );
}

export function EnergyCalculator() {
  const [rooms, setRooms] = useState(3);
  const [hours, setHours] = useState(6);
  const { cost, rate, saving } = estimate(rooms, hours);

  return (
    <Card as="section" className="energy-calc" aria-labelledby="energy-title">
      <CardHeader>
        <Stack gap={2}>
          <Heading as="h1" size="lg" id="energy-title">
            ¿Cuánto puedes ahorrar en calefacción?
          </Heading>
          <Text tone="muted">
            Ajusta tu casa y tu uso diario. La estimación se actualiza al momento.
          </Text>
        </Stack>
      </CardHeader>

      <CardContent>
        <div className="energy-calc__body">
          <Stack gap={8}>
            <Slider
              label="Habitaciones con calefacción"
              value={rooms}
              min={1}
              max={8}
              unit={(n) => (n === 1 ? "1 habitación" : `${n} habitaciones`)}
              onChange={setRooms}
            />
            <Slider
              label="Horas de calefacción al día"
              value={hours}
              min={1}
              max={16}
              unit={(n) => (n === 1 ? "1 hora" : `${n} horas`)}
              onChange={setHours}
            />
          </Stack>

          <div className="energy-result" aria-live="polite">
            <div className="energy-result__chart">
              <Donut rate={rate} />
              <div className="energy-result__center">
                <Text variant="small" tone="muted">Ahorro al mes</Text>
                <span className="energy-result__figure">{eur.format(saving)}</span>
              </div>
            </div>
            <Stack as="ul" gap={2} className="energy-legend">
              <li>
                <span className="energy-legend__swatch energy-legend__swatch--saving" />
                <Text as="span">Ahorras {pct.format(rate)}</Text>
              </li>
              <li>
                <span className="energy-legend__swatch energy-legend__swatch--rest" />
                <Text as="span">
                  Sigues pagando <Text as="strong" numeric>{eur.format(cost - saving)}</Text> de{" "}
                  <Text as="span" numeric>{eur.format(cost)}</Text>
                </Text>
              </li>
            </Stack>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Text variant="small" tone="muted">
          Estimación orientativa: {KW_PER_ROOM.toLocaleString("es-ES")} kW por habitación,{" "}
          {eur.format(EUR_PER_KWH)}/kWh y {DAYS_PER_MONTH} días. El ahorro suma un{" "}
          {pct.format(BASE_SAVING)} por bajar el termostato 1 °C y un {pct.format(SAVING_PER_HOUR)} por
          cada hora diaria de uso gracias a la programación horaria.
        </Text>
      </CardFooter>
    </Card>
  );
}
