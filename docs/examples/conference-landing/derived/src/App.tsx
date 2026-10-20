import { useState, type FormEvent } from 'react'
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  FormTemplate,
  Grid,
  Heading,
  Input,
  MediaPlaceholder,
  Section,
  Stack,
  Text,
} from 'neus-ui'
import { CallToAction, Hero, SectionHeader, SiteFooter, SiteHeader } from 'neus-ui/sections'
import './App.css'

// PENDING: link real de la boletería.
const TICKETS_URL = '/entradas'

// SAMPLE: agenda de ejemplo; reemplazar por la grilla confirmada.
const AGENDA = [
  {
    day: 'Viernes 14 de mayo',
    theme: 'Plataforma y rendimiento',
    slots: [
      { time: '08:30', title: 'Acreditación' },
      { time: '09:30', title: 'Apertura de las Jornadas' },
      { time: '10:00', title: 'Lo que el navegador ya resuelve: View Transitions y popover sin librerías' },
      { time: '11:00', title: 'Medir antes de optimizar: Core Web Vitals con tráfico real' },
      { time: '12:30', title: 'Pausa del mediodía' },
      { time: '14:00', title: 'Server components en producción: un año después' },
      { time: '15:00', title: 'Accesibilidad que pasa la auditoría y además sirve' },
      { time: '16:30', title: 'Panel: frontend en equipos chicos' },
    ],
  },
  {
    day: 'Sábado 15 de mayo',
    theme: 'Diseño de interfaces y oficio',
    slots: [
      { time: '09:30', title: 'Sistemas de diseño que sobreviven al segundo producto' },
      { time: '10:30', title: 'CSS moderno: container queries, :has() y capas' },
      { time: '11:30', title: 'Formularios que no hacen sufrir' },
      { time: '12:30', title: 'Pausa del mediodía' },
      { time: '14:00', title: 'Tests de interfaz que no se rompen con cada cambio' },
      { time: '15:00', title: 'Tipografía variable en la web' },
      { time: '16:00', title: 'Charlas relámpago de la comunidad' },
      { time: '17:30', title: 'Cierre de las Jornadas' },
    ],
  },
]

// SAMPLE: oradores de ejemplo; reemplazar por los confirmados.
const SPEAKERS = [
  { name: 'Valentina Ríos', role: 'Ingeniera frontend · Córdoba', talk: 'Lo que el navegador ya resuelve' },
  { name: 'Matías Quiroga', role: 'Especialista en rendimiento web · Rosario', talk: 'Medir antes de optimizar' },
  { name: 'Camila Duarte', role: 'Consultora de accesibilidad · Montevideo', talk: 'Accesibilidad que pasa la auditoría' },
  { name: 'Joaquín Peralta', role: 'Arquitecto de software · Buenos Aires', talk: 'Server components en producción' },
  { name: 'Lucía Benítez', role: 'Diseñadora de sistemas · Mendoza', talk: 'Sistemas de diseño que sobreviven' },
  { name: 'Tomás Ferreyra', role: 'Desarrollador CSS · Santiago de Chile', talk: 'CSS moderno: container queries y capas' },
]

const FAQ = [
  {
    question: '¿Dónde es exactamente?',
    answer: 'En el Pabellón Argentina de la Universidad Nacional de Córdoba, en Ciudad Universitaria.',
  },
  {
    question: '¿La entrada sirve para los dos días?',
    // SAMPLE: confirmar con la organización.
    answer: 'Sí. Tanto la entrada general como la de estudiantes dan acceso al viernes 14 y al sábado 15 de mayo.',
  },
  {
    question: '¿Quién puede comprar la entrada de estudiante?',
    // SAMPLE: confirmar el requisito con la organización.
    answer: 'Estudiantes de carreras universitarias o terciarias. En la acreditación te pedimos la constancia de alumno regular.',
  },
  {
    question: '¿En qué moneda están los precios?',
    answer: 'En pesos argentinos: la general cuesta $45.000 y la de estudiantes, $20.000.',
  },
  {
    question: '¿Las charlas son en español?',
    // SAMPLE: confirmar con la organización.
    answer: 'Sí, todas las charlas y el panel son en español.',
  },
]

type Errors = { name?: string; email?: string }
type Status = 'idle' | 'sending' | 'done' | 'failed'

// PENDING: conectar con el servicio de correo de la organización.
const subscribeToNewsletter = async (data: { name: string; email: string }) => {
  console.info('Suscripción a novedades', data)
}

const NewsletterForm = () => {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const next: Errors = {}
    if (!name) next.name = 'Escribí tu nombre.'
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Revisá el email: falta algo, por ejemplo la @.'
    setErrors(next)
    if (next.name || next.email) {
      event.currentTarget.querySelector<HTMLInputElement>(`[name="${next.name ? 'name' : 'email'}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      await subscribeToNewsletter({ name, email })
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'done') {
    return (
      <Alert status="success" title="¡Listo, ya estás en la lista!">
        Te vamos a escribir cuando confirmemos oradores y agenda.
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap={4}>
        {status === 'failed' && (
          <Alert status="error" live="assertive" title="No pudimos anotarte">
            Probá de nuevo en unos minutos.
          </Alert>
        )}
        <FormTemplate
          submitLabel="Sumarme a la lista"
          loading={status === 'sending'}
          columns={1}
          tabletColumns={1}
          mobileColumns={1}
        >
          <Input name="name" label="Nombre" autoComplete="name" required error={errors.name} />
          <Input
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="vos@ejemplo.com"
            required
            error={errors.email}
          />
        </FormTemplate>
      </Stack>
    </form>
  )
}

function App() {
  return (
    <>
      <SiteHeader
        brand="Jornadas Frontend Córdoba"
        variant="sticky"
        skipLinkTarget="#main"
        links={[
          { label: 'Agenda', href: '#agenda' },
          { label: 'Oradores', href: '#oradores' },
          { label: 'Entradas', href: '#entradas' },
          { label: 'Preguntas', href: '#preguntas' },
        ]}
        actions={<Button label="Comprar entrada" href="#entradas" variant="outlined" size="small" />}
        labels={{ navigation: 'Principal', menu: 'Menú', skipLink: 'Saltar al contenido' }}
      />
      <main id="main">
        <Hero
          variant="split"
          title="Jornadas Frontend Córdoba 2027"
          lead={
            <>
              <strong>14 y 15 de mayo de 2027</strong> en el Pabellón Argentina de la Universidad Nacional de
              Córdoba. Dos días de charlas para quienes hacen frontend en Argentina y la región.
            </>
          }
          actions={<Button label="Comprar entrada" href="#entradas" size="large" />}
          note="General $45.000 · Estudiantes $20.000"
          // SAMPLE: reemplazar por una foto propia del Pabellón Argentina.
          media={<MediaPlaceholder label="Fachada del Pabellón Argentina en Ciudad Universitaria, de día" ratio="4 / 3" />}
        />

        <Section id="agenda" tone="inverse" aria-labelledby="agenda-title">
          <SectionHeader
            titleId="agenda-title"
            title="Dos días, un recorrido"
            description="El viernes, plataforma y rendimiento; el sábado, diseño de interfaces y oficio."
          />
          <Grid as="ul" columns={{ base: 1, md: 2 }}>
            {AGENDA.map(({ day, theme, slots }) => (
              <Card as="li" key={day}>
                <CardHeader>
                  <Stack gap={1}>
                    <Heading as="h3" size="md">{day}</Heading>
                    <Text tone="muted">{theme}</Text>
                  </Stack>
                </CardHeader>
                <CardContent>
                  <Stack as="ol" gap={0} className="jfc-schedule">
                    {slots.map(({ time, title }) => (
                      <li key={time}>
                        <Text as="span" numeric className="jfc-schedule__time">{time}</Text>
                        <Text as="span">{title}</Text>
                      </li>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section id="oradores" className="jfc-section" aria-labelledby="oradores-title">
          <SectionHeader
            titleId="oradores-title"
            title="Oradores destacados"
            description="Gente que construye la web todos los días, de Córdoba y de toda la región."
          />
          <Grid as="ul" columns={{ base: 1, md: 2, lg: 3 }}>
            {SPEAKERS.map(({ name, role, talk }) => (
              <Card as="li" key={name}>
                <CardContent>
                  <Stack direction="row" gap={4} align="start">
                    <Avatar name={name} alt="" size="large" />
                    <Stack gap={1}>
                      <Heading as="h3" size="sm">{name}</Heading>
                      <Text variant="small" tone="muted">{role}</Text>
                      <Text>{talk}</Text>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section id="entradas" className="jfc-section" aria-labelledby="entradas-title">
          <SectionHeader
            titleId="entradas-title"
            title="Entradas"
            description="Dos precios, en pesos argentinos, para los dos días de las Jornadas."
          />
          <Grid as="ul" columns={{ base: 1, md: 2 }}>
            <Card as="li">
              <CardHeader>
                <Heading as="h3" size="md">General</Heading>
              </CardHeader>
              <CardContent>
                <Stack gap={2}>
                  <Text className="jfc-price" numeric>$45.000</Text>
                  <Text tone="muted">Acceso al viernes 14 y al sábado 15 de mayo.</Text>
                </Stack>
              </CardContent>
              <CardFooter>
                <Button label="Comprar entrada general" href={TICKETS_URL} size="large" fullWidth />
              </CardFooter>
            </Card>
            <Card as="li">
              <CardHeader>
                <Heading as="h3" size="md">Estudiantes</Heading>
              </CardHeader>
              <CardContent>
                <Stack gap={2}>
                  <Text className="jfc-price" numeric>$20.000</Text>
                  {/* SAMPLE: confirmar el requisito con la organización. */}
                  <Text tone="muted">Los dos días, con constancia de alumno regular en la acreditación.</Text>
                </Stack>
              </CardContent>
              <CardFooter>
                <Button
                  label="Comprar entrada de estudiante"
                  href={TICKETS_URL}
                  variant="outlined"
                  size="large"
                  fullWidth
                />
              </CardFooter>
            </Card>
          </Grid>
        </Section>

        <Section id="preguntas" className="jfc-section" aria-labelledby="preguntas-title">
          <SectionHeader titleId="preguntas-title" title="Preguntas frecuentes" />
          <div className="jfc-faq">
            {FAQ.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}</summary>
                <Text>{answer}</Text>
              </details>
            ))}
          </div>
        </Section>

        <CallToAction
          id="novedades"
          variant="split"
          tone="default"
          className="jfc-section"
          title="Enterate antes que nadie"
          text="Sumate a la lista de novedades: te avisamos cuando confirmemos oradores, la agenda final y cualquier cambio en las entradas."
          aside={
            <Card>
              <CardContent>
                <NewsletterForm />
              </CardContent>
            </Card>
          }
        />
      </main>
      <SiteFooter
        brand="Jornadas Frontend Córdoba 2027"
        columns={[
          {
            title: 'Jornadas',
            links: [
              { label: 'Agenda', href: '#agenda' },
              { label: 'Oradores', href: '#oradores' },
              { label: 'Entradas', href: '#entradas' },
              { label: 'Preguntas frecuentes', href: '#preguntas' },
            ],
          },
        ]}
        legal="14 y 15 de mayo de 2027 · Pabellón Argentina, Universidad Nacional de Córdoba"
      />
    </>
  )
}

export default App
