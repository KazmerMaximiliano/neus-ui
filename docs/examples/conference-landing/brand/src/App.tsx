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
import {
  CallToAction,
  FeatureItem,
  FeatureList,
  Hero,
  SectionHeader,
  SiteFooter,
  SiteHeader,
} from 'neus-ui/sections'

type TicketType = 'general' | 'estudiantes'

const ars = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })

const TICKETS: { type: TicketType; name: string; price: number; text: string }[] = [
  { type: 'general', name: 'General', price: 45000, text: 'Acceso a los dos días de charlas en el Pabellón Argentina.' },
  { type: 'estudiantes', name: 'Estudiantes', price: 20000, text: 'Los mismos dos días, con tarifa para quienes están estudiando.' },
]

// SAMPLE: agenda de ejemplo; reemplazar con el programa confirmado.
const AGENDA = [
  {
    id: 'viernes',
    day: 'Viernes 14 de mayo',
    track: 'Plataforma y rendimiento',
    slots: [
      { time: '09:00', title: 'Acreditación y café' },
      { time: '10:00', title: 'Apertura: el estado del frontend en la región' },
      { time: '11:00', title: 'Core Web Vitals en sitios con tráfico real' },
      { time: '14:00', title: 'Server components sin miedo' },
      { time: '16:30', title: 'Panel: equipos frontend en empresas argentinas' },
    ],
  },
  {
    id: 'sabado',
    day: 'Sábado 15 de mayo',
    track: 'Diseño, accesibilidad y oficio',
    slots: [
      { time: '09:30', title: 'Sistemas de diseño que sobreviven al segundo año' },
      { time: '11:00', title: 'Accesibilidad que pasa una auditoría' },
      { time: '14:00', title: 'CSS moderno: container queries y :has()' },
      { time: '16:00', title: 'Charlas relámpago de la comunidad' },
      { time: '18:00', title: 'Cierre y encuentro en el pabellón' },
    ],
  },
]

// SAMPLE: oradores de ejemplo; reemplazar con los confirmados.
const SPEAKERS = [
  { name: 'Lucía Ferreyra', role: 'Staff engineer, fintech en Buenos Aires', talk: 'Core Web Vitals en sitios con tráfico real' },
  { name: 'Martín Ibarra', role: 'Tech lead frontend, Córdoba', talk: 'Server components sin miedo' },
  { name: 'Valeria Ocampo', role: 'Diseñadora de sistemas, Rosario', talk: 'Sistemas de diseño que sobreviven al segundo año' },
  { name: 'Joaquín Paredes', role: 'Especialista en accesibilidad, Montevideo', talk: 'Accesibilidad que pasa una auditoría' },
  { name: 'Carolina Quiroga', role: 'Desarrolladora web independiente, Mendoza', talk: 'CSS moderno: container queries y :has()' },
  { name: 'Diego Sosa', role: 'Engineering manager, Santiago de Chile', talk: 'Apertura: el estado del frontend en la región' },
]

// SAMPLE: respuestas a confirmar con la organización (idioma, accesos).
const FAQ = [
  { q: '¿Cuándo y dónde es?', a: 'El viernes 14 y el sábado 15 de mayo de 2027, en el Pabellón Argentina de la Universidad Nacional de Córdoba, en Ciudad Universitaria.' },
  { q: '¿La entrada vale para los dos días?', a: 'Sí. Tanto la entrada General como la de Estudiantes dan acceso a las charlas del viernes y del sábado.' },
  { q: '¿En qué idioma son las charlas?', a: 'En español. Si se suma alguna charla en otro idioma, lo vas a ver marcado en la agenda.' },
  { q: '¿Es para mí si recién empiezo?', a: 'Sí. Hay charlas de nivel inicial y avanzado; en la agenda final cada una indica su nivel.' },
  { q: '¿Cómo me entero de la agenda final?', a: 'Sumate a la lista de novedades al final de la página y te escribimos cuando esté confirmada.' },
  { q: '¿El Pabellón es accesible?', a: 'Escribinos antes de venir y coordinamos lo que necesites para que puedas participar.' },
]

type SubscribeStatus = 'idle' | 'sending' | 'done' | 'error'

// ponytail: no newsletter endpoint yet; swap for the real POST when the provider is chosen.
const subscribe = async (data: FormData) => {
  console.info('subscribe', Object.fromEntries(data))
}

// ponytail: no checkout URL yet; point at the ticketing provider when it exists.
const onBuyTicket = (type: TicketType) => {
  console.info('buy ticket', type)
}

function NewsletterForm() {
  const [status, setStatus] = useState<SubscribeStatus>('idle')

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')
    try {
      await subscribe(new FormData(event.currentTarget))
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <Alert status="success" title="¡Listo, ya estás en la lista!">
        Te escribimos cuando confirmemos oradores, agenda y nuevas tandas de entradas.
      </Alert>
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={4}>
        {status === 'error' && (
          <Alert status="error" title="No pudimos sumarte" live="assertive">
            Revisá tu conexión y probá de nuevo.
          </Alert>
        )}
        <FormTemplate submitLabel="Sumarme a la lista" loading={status === 'sending'} columns={1} tabletColumns={1} mobileColumns={1}>
          <Input name="name" label="Nombre" autoComplete="name" required />
          <Input name="email" label="Email" type="email" autoComplete="email" spellCheck={false}
            description="Solo para avisarte novedades de las Jornadas." required />
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
          eyebrow="14 y 15 de mayo de 2027 · Córdoba"
          title="Jornadas Frontend Córdoba"
          lead="Dos días de charlas sobre desarrollo web en el Pabellón Argentina de la Universidad Nacional de Córdoba, para quienes hacen frontend en Argentina y la región."
          actions={<Button label="Comprar entrada" href="#entradas" size="large" />}
          note={`General ${ars.format(45000)} · Estudiantes ${ars.format(20000)}`}
          // SAMPLE: reemplazar con una foto propia del Pabellón Argentina.
          media={<MediaPlaceholder label="Fachada del Pabellón Argentina en Ciudad Universitaria, con público entrando" ratio="4 / 5" />}
        />

        <Section id="agenda" tone="brand" aria-labelledby="agenda-title">
          <SectionHeader titleId="agenda-title" title="Dos días, dos recorridos"
            description="El viernes, plataforma y rendimiento; el sábado, diseño, accesibilidad y oficio." />
          <Grid as="ul" columns={{ base: 1, md: 2 }}>
            {AGENDA.map((day) => (
              <Card as="li" key={day.id}>
                <CardHeader>
                  <Stack gap={1}>
                    <Heading as="h3" size="md">{day.day}</Heading>
                    <Text tone="muted">{day.track}</Text>
                  </Stack>
                </CardHeader>
                <CardContent>
                  <Stack as="ol" gap={3}>
                    {day.slots.map((slot) => (
                      <li key={slot.time}>
                        <Stack direction="row" gap={4} align="baseline">
                          <Text as="span" numeric weight="semibold" tone="primary">{slot.time}</Text>
                          <Text as="span">{slot.title}</Text>
                        </Stack>
                      </li>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section id="oradores" aria-labelledby="oradores-title">
          <SectionHeader titleId="oradores-title" title="Quienes suben al escenario"
            description="Gente que construye interfaces todos los días en equipos de la región." />
          <Grid as="ul">
            {SPEAKERS.map((speaker) => (
              <Card as="li" key={speaker.name}>
                <CardContent>
                  <Stack gap={4}>
                    <Avatar name={speaker.name} alt="" size="large" />
                    <Stack gap={1}>
                      <Heading as="h3" size="sm">{speaker.name}</Heading>
                      <Text tone="muted">{speaker.role}</Text>
                    </Stack>
                    <Text>{speaker.talk}</Text>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section id="entradas" tone="subtle" aria-labelledby="entradas-title">
          <SectionHeader titleId="entradas-title" title="Entradas"
            description="Precios en pesos argentinos, por persona, para los dos días." />
          <Grid as="ul" columns={{ base: 1, md: 2 }}>
            {TICKETS.map((ticket) => (
              <Card as="li" key={ticket.type}>
                <CardHeader>
                  <Heading as="h3" size="md">{ticket.name}</Heading>
                </CardHeader>
                <CardContent>
                  <Stack gap={3}>
                    <Text numeric weight="semibold"
                      style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--type-headline-size)', lineHeight: 1.1 }}>
                      {ars.format(ticket.price)}
                    </Text>
                    <Text>{ticket.text}</Text>
                  </Stack>
                </CardContent>
                <CardFooter>
                  <Button label={`Comprar entrada ${ticket.name}`} fullWidth
                    variant={ticket.type === 'general' ? 'solid' : 'outlined'}
                    onClick={() => onBuyTicket(ticket.type)} />
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section id="preguntas" aria-labelledby="preguntas-title">
          <SectionHeader titleId="preguntas-title" title="Preguntas frecuentes" />
          <FeatureList variant="list">
            {FAQ.map(({ q, a }) => (
              <FeatureItem key={q} title={q}>{a}</FeatureItem>
            ))}
          </FeatureList>
        </Section>

        <CallToAction
          id="novedades"
          variant="split"
          tone="inverse"
          title="Enterate primero de la agenda final"
          text="Te avisamos cuando confirmemos oradores, horarios y nuevas tandas de entradas. Nada más."
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
        legal="Pabellón Argentina, Ciudad Universitaria, Universidad Nacional de Córdoba · 14 y 15 de mayo de 2027"
      />
    </>
  )
}

export default App
