import { useState, type FormEvent } from 'react'
import { CalendarHeart, MessageSquareText, Timer } from 'lucide-react'
import {
  Alert, Avatar, Button, Card, CardContent, FormTemplate, Grid, Input, MediaPlaceholder, Section, Stack, Text,
} from 'neus-ui'
import {
  CallToAction, FeatureItem, FeatureList, Hero, SectionHeader, SiteFooter, SiteHeader, Testimonial, TestimonialList,
} from 'neus-ui/sections'
import './App.css'

// SAMPLE: realistic quotes; replace with real ones before launch.
const QUOTES = [
  {
    quote: 'Le escribí que tenía el pecho apretado antes de presentar al comité. Me dio tres minutos de respiración y entré con otra cabeza.',
    name: 'Valentina Ruiz',
    role: 'Consultora de estrategia',
  },
  { quote: 'La abro en el ascensor, entre una llamada y la siguiente.', name: 'Tomás Herrera', role: 'Product manager' },
  { quote: 'Por fin algo que no me pide media hora libre.', name: 'Camila Ortega', role: 'Abogada asociada' },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Errors = { name?: string; email?: string }
type Status = 'idle' | 'sending' | 'sent' | 'failed'

// ponytail: no backend yet; resolves without sending. Replace with the waitlist API call.
const joinWaitlist = async (data: { name: string; email: string }) => { void data }

const SignupForm = () => {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const next: Errors = {}
    if (!name) next.name = 'Escribe tu nombre.'
    if (!EMAIL_PATTERN.test(email)) next.email = 'Revisa el email: falta algo, como la @ o el dominio.'
    setErrors(next)
    const firstInvalid = next.name ? 'name' : next.email ? 'email' : null
    if (firstInvalid) {
      ;(formElement.elements.namedItem(firstInvalid) as HTMLInputElement).focus()
      return
    }

    setStatus('sending')
    try {
      await joinWaitlist({ name, email })
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <Alert status="success" title="Ya estás en la lista">
        Te escribiremos al email que dejaste cuando abramos el acceso.
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap={4}>
        {status === 'failed' && (
          <Alert status="error" live="assertive" title="No pudimos guardar tus datos">
            Vuelve a intentarlo en un momento.
          </Alert>
        )}
        <FormTemplate
          submitLabel="Unirme a la lista de espera"
          loading={status === 'sending'}
          columns={1}
          tabletColumns={1}
          mobileColumns={1}
        >
          <Input name="name" label="Nombre" autoComplete="given-name" required error={errors.name} />
          <Input
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            description="Solo para avisarte cuando abramos el acceso."
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
        brand="AuraFlow"
        variant="sticky"
        skipLinkTarget="#main"
        links={[
          { label: 'Cómo funciona', href: '#funciones' },
          { label: 'Testimonios', href: '#testimonios' },
        ]}
        actions={<Button label="Unirme a la lista" href="#registro" variant="outlined" size="small" />}
        labels={{ navigation: 'Principal', menu: 'Menú', skipLink: 'Saltar al contenido' }}
      />
      <main id="main">
        <Hero
          variant="centered"
          title="Respira antes de la próxima reunión."
          lead="AuraFlow es una app de meditación con IA. Le cuentas en una frase cómo llegas y te guía una sesión hecha para ese momento."
          actions={<Button label="Unirme a la lista de espera" href="#registro" size="large" />}
          note="Solo te pedimos nombre y email."
          media={
            /* SAMPLE: example exchange and session screen; replace with the real interface. */
            <Card className="af-demo">
              <CardContent>
                <Grid columns={{ base: 1, md: 2 }} gap={8}>
                  <Stack gap={3} justify="center">
                    <Text variant="caption" tone="muted">Tú escribes</Text>
                    <Text variant="lead">“Salgo de una reunión tensa y en diez minutos presento al cliente.”</Text>
                    <Text variant="caption" tone="muted">AuraFlow te propone</Text>
                    <Text weight="semibold">Bajar el pulso antes de hablar</Text>
                    <Text tone="muted">
                      Tres minutos de respiración lenta, con exhalaciones más largas que las inhalaciones, y una frase
                      para abrir tu presentación con calma.
                    </Text>
                  </Stack>
                  <MediaPlaceholder ratio="3 / 2" label="Pantalla de la sesión en un iPhone: círculo de respiración y tiempo restante" />
                </Grid>
              </CardContent>
            </Card>
          }
        />

        <Section id="funciones" tone="subtle" className="af-ruled" aria-labelledby="funciones-title">
          <SectionHeader
            titleId="funciones-title"
            title="Empieza por tu día, no por un catálogo de audios."
            description="No eliges entre cientos de pistas: AuraFlow arma la sesión con lo que le cuentas."
          />
          <FeatureList variant="grid" columns={{ base: 1, md: 3 }}>
            <FeatureItem icon={<MessageSquareText />} title="Dile cómo llegas">
              Escribe una frase sobre tu momento. La IA ajusta el ritmo de la respiración, el tono de la voz y la duración.
            </FeatureItem>
            <FeatureItem icon={<Timer />} title="Cabe entre dos reuniones">
              Sesiones cortas para el escritorio, el transporte o los minutos antes de una llamada difícil.
            </FeatureItem>
            <FeatureItem icon={<CalendarHeart />} title="Aprende de tus días">
              Con cada sesión entiende qué momentos te tensan y te sugiere la pausa antes de que lleguen.
            </FeatureItem>
          </FeatureList>
        </Section>

        <Section id="testimonios" className="af-ruled" aria-labelledby="testimonios-title">
          <SectionHeader titleId="testimonios-title" title="La usan en los huecos de una agenda llena." />
          {/* SAMPLE: */}
          <TestimonialList variant="featured" columns={{ base: 1, md: 2 }}>
            {QUOTES.map(({ quote, name, role }) => (
              <Testimonial key={name} quote={quote} name={name} role={role} avatar={<Avatar name={name} alt="" />} />
            ))}
          </TestimonialList>
        </Section>

        <CallToAction
          id="registro"
          variant="split"
          tone="brand"
          className="af-ruled"
          title="Reserva tu lugar en AuraFlow."
          text="Déjanos tu nombre y tu email y te escribimos cuando abramos el acceso. Nada más."
          aside={
            <Card>
              <CardContent>
                <SignupForm />
              </CardContent>
            </Card>
          }
        />
      </main>
      <SiteFooter brand="AuraFlow" legal="© 2026 AuraFlow" />
    </>
  )
}

export default App
