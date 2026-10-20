import { useState, type FormEvent } from 'react'
import { MessageCircleHeart, Timer, Waves } from 'lucide-react'
import { Alert, Avatar, Button, Card, CardContent, FormTemplate, Input, MediaPlaceholder, Section } from 'neus-ui'
import {
  CallToAction,
  FeatureItem,
  FeatureList,
  Hero,
  SectionHeader,
  SiteFooter,
  SiteHeader,
  Testimonial,
  TestimonialList,
} from 'neus-ui/sections'
import './landing.css'

// SAMPLE: example testimonials; replace with real users' words and permission.
const TESTIMONIALS = [
  {
    quote: 'La abro en el baño de la oficina antes de presentar. Tres minutos después entro a la sala con la voz más firme.',
    name: 'Camila Rojas',
    role: 'Analista financiera',
  },
  {
    quote: 'A las once de la noche le escribí ‘no puedo apagar la cabeza’ y la sesión fue exactamente eso: apagarla de a poco.',
    name: 'Tomás Herrera',
    role: 'Desarrollador backend',
  },
  {
    quote: 'Otras apps me ofrecían siempre la misma lista de audios. Esta primero me pregunta cómo estoy.',
    name: 'Valentina Ortiz',
    role: 'Ejecutiva de cuentas',
  },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Status = 'idle' | 'sending' | 'sent' | 'failed'

// ponytail: no backend yet; replace with the real waitlist endpoint.
const requestEarlyAccess = async (_signup: { name: string; email: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 600))
}

const SignupForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = {
      name: name.trim() ? undefined : 'Escribe tu nombre.',
      email: EMAIL_PATTERN.test(email.trim()) ? undefined : 'Escribe un email válido, por ejemplo ana@empresa.com.',
    }
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.email) {
      const firstInvalid = event.currentTarget.elements.namedItem(nextErrors.name ? 'name' : 'email')
      ;(firstInvalid as HTMLInputElement).focus()
      return
    }

    setStatus('sending')
    try {
      await requestEarlyAccess({ name: name.trim(), email: email.trim() })
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent') {
    return (
      <Alert status="success" title={`Listo, ${name.trim()}. Tu lugar está reservado.`}>
        Te escribiremos a {email.trim()} cuando abramos tu acceso.
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Registro para acceso anticipado">
      {status === 'failed' && (
        <Alert status="error" live="assertive" title="No pudimos guardar tu registro">
          Revisa tu conexión e inténtalo de nuevo.
        </Alert>
      )}
      <FormTemplate submitLabel="Pedir acceso anticipado" loading={status === 'sending'} columns={2} tabletColumns={2}>
        <Input
          label="Nombre"
          name="name"
          autoComplete="given-name"
          required
          value={name}
          onChange={setName}
          error={errors.name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="ana@empresa.com"
          required
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
      </FormTemplate>
    </form>
  )
}

const App = () => (
  <>
    <SiteHeader
      brand="AuraFlow"
      links={[
        { label: 'Cómo funciona', href: '#como-funciona' },
        { label: 'Testimonios', href: '#testimonios' },
      ]}
      actions={<Button label="Pedir acceso" href="#registro" variant="outlined" size="small" />}
      variant="sticky"
      skipLinkTarget="#main"
      labels={{ navigation: 'Principal', menu: 'Menú', skipLink: 'Saltar al contenido' }}
    />

    <main id="main">
      <Hero
        title="¿Cómo llegas hoy?"
        lead="Antes de la próxima reunión, cuéntale a AuraFlow cómo estás en una frase. Su IA arma una meditación guiada para ese momento, no para un día ideal."
        actions={<Button label="Pedir acceso anticipado" href="#registro" size="large" />}
        note="Solo te pedimos tu nombre y tu email."
        // SAMPLE: replace with a real screenshot of the app.
        mediaClassName="hero-media"
        media={
          <MediaPlaceholder
            label="Captura de AuraFlow en el teléfono: la pregunta «¿Cómo llegas hoy?» y la respuesta «Saturado, presento en 10 minutos»"
            ratio="4 / 5"
          />
        }
      />

      <Section id="como-funciona" aria-labelledby="como-funciona-title">
        <SectionHeader
          titleId="como-funciona-title"
          title="Una pausa hecha para tu día, no para un retiro"
          description="Tres cosas que AuraFlow hace distinto a una lista de audios."
        />
        <FeatureList variant="list">
          <FeatureItem icon={<MessageCircleHeart />} title="Empieza por cómo llegas">
            Escribes o dices cómo estás: cansado, acelerado, con la cabeza en otra parte. La IA elige la respiración,
            el ritmo y la voz para ese estado.
          </FeatureItem>
          <FeatureItem icon={<Timer />} title="Cabe entre dos reuniones">
            Le dices cuánto tiempo tienes y la sesión se ajusta a ese hueco, para el escritorio, el ascensor o el
            transporte.
          </FeatureItem>
          <FeatureItem icon={<Waves />} title="Aprende qué te funciona">
            Después de cada pausa le cuentas cómo saliste. Con el tiempo, AuraFlow propone lo que te ayuda a ti, a la
            hora en que más lo necesitas.
          </FeatureItem>
        </FeatureList>
      </Section>

      <Section id="testimonios" tone="subtle" aria-labelledby="testimonios-title">
        {/* SAMPLE: the description assumes beta users; adjust to the launch stage. */}
        <SectionHeader
          titleId="testimonios-title"
          title="Pausas reales en días laborales reales"
          description="Lo que cuentan quienes la usan entre semana."
        />
        <TestimonialList variant="plain" columns={{ base: 1, lg: 3 }}>
          {TESTIMONIALS.map(({ quote, name, role }) => (
            <Testimonial key={name} quote={quote} name={name} role={role} avatar={<Avatar name={name} alt="" />} />
          ))}
        </TestimonialList>
      </Section>

      <CallToAction
        id="registro"
        tone="brand"
        title="Reserva tu lugar en AuraFlow"
        text="Abrimos el acceso por grupos. Déjanos tu nombre y tu email y te avisamos cuando sea tu turno."
        actions={
          <Card className="signup-card">
            <CardContent>
              <SignupForm />
            </CardContent>
          </Card>
        }
      />
    </main>

    <SiteFooter brand="AuraFlow" legal="© 2026 AuraFlow · Meditación guiada con IA" />
  </>
)

export default App
