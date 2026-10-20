import { useState, type FormEvent } from 'react'
import { HeartPulse, Scissors, Stethoscope, Syringe } from 'lucide-react'
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  DateInput,
  FormTemplate,
  Grid,
  Heading,
  Input,
  Link,
  MediaPlaceholder,
  Section,
  Select,
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
  Testimonial,
  TestimonialList,
} from 'neus-ui/sections'
import { HOURS, closingHour } from './hours'

const ADDRESS = 'Bv. Oroño 1450, Rosario'
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Bv.+Oro%C3%B1o+1450,+Rosario,+Santa+Fe'

const REASONS = [
  { value: 'consulta', label: 'Consulta' },
  { value: 'vacunacion', label: 'Vacunación' },
  { value: 'cirugia', label: 'Cirugía menor' },
  { value: 'peluqueria', label: 'Peluquería' },
  { value: 'otro', label: 'Otro motivo' },
]

// SAMPLE: example team; replace with the clinic's real vets and photos.
const TEAM = [
  { name: 'Dra. Mariana Galván', focus: 'Clínica general y plan de vacunas', photo: 'Retrato de la Dra. Galván en el consultorio, con guardapolvo' },
  { name: 'Dr. Tomás Bertolotti', focus: 'Cirugías menores y control posoperatorio', photo: 'Retrato del Dr. Bertolotti junto a la camilla' },
  { name: 'Dra. Lucía Ferrero', focus: 'Gatos, piel y alergias', photo: 'Retrato de la Dra. Ferrero con un gato en brazos' },
]

// SAMPLE: example reviews; replace with real ones from clients.
const REVIEWS = [
  {
    quote: 'Pancho llegó cojeando un sábado a las doce y media. Lo atendieron igual, le sacaron una espina de la almohadilla y nos explicaron cómo curarlo en casa.',
    name: 'Graciela Paredes',
    role: 'Con Pancho, caniche',
  },
  { quote: 'Llevo a las dos gatas desde que eran cachorras. Siempre me avisan cuándo toca la próxima vacuna.', name: 'Martín Ibarra', role: 'Con Mora y Tita' },
  { quote: 'Queda a dos cuadras de casa y no hay que esperar una hora. Para la castración de Lola nos dieron todo por escrito.', name: 'Sofía Quiroga', role: 'Con Lola, mestiza' },
]

type Errors = Partial<Record<'name' | 'phone' | 'pet' | 'reason' | 'date', string>>
type Request = { name: string; phone: string; pet: string; reason: string; date?: Date }

// ponytail: no backend yet; connect to the clinic's email, API or WhatsApp here.
const sendAppointmentRequest = async (request: Request) => {
  console.info('Pedido de turno', request)
}

const validate = (request: Request): Errors => {
  const errors: Errors = {}
  if (!request.name.trim()) errors.name = 'Escribí tu nombre.'
  if (request.phone.replace(/\D/g, '').length < 8) errors.phone = 'Escribí un teléfono con código de área, al menos 8 números.'
  if (!request.pet.trim()) errors.pet = 'Contanos el nombre de tu mascota.'
  if (!request.reason) errors.reason = 'Elegí el motivo del turno.'
  if (request.date) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (request.date < today) errors.date = 'Elegí un día de hoy en adelante.'
    else if (request.date.getDay() === 0) errors.date = 'Los domingos no atendemos; elegí otro día.'
  }
  return errors
}

const AppointmentForm = () => {
  const [reason, setReason] = useState('')
  const [date, setDate] = useState<Date | undefined>()
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const [sent, setSent] = useState<Request>()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const request: Request = {
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      pet: String(data.get('pet') ?? ''),
      reason,
      date,
    }
    const found = validate(request)
    setErrors(found)
    if (Object.keys(found).length) {
      requestAnimationFrame(() => form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
      return
    }
    setStatus('sending')
    try {
      await sendAppointmentRequest(request)
      setSent(request)
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'sent' && sent) {
    const reasonLabel = REASONS.find((option) => option.value === sent.reason)?.label.toLowerCase()
    const day = sent.date?.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })
    return (
      <Alert
        status="success"
        title="Recibimos tu pedido"
        actions={<Button label="Pedir otro turno" variant="outlined" size="small" onClick={() => { setStatus('idle'); setReason(''); setDate(undefined) }} />}
      >
        {sent.name}, te contactamos al {sent.phone} para confirmar el turno de {sent.pet} ({reasonLabel}){day ? `, si puede ser el ${day}` : ''}.
      </Alert>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap={6}>
        {status === 'failed' && (
          <Alert status="error" title="No pudimos enviar tu pedido" live="assertive">
            Probá de nuevo en unos minutos o acercate a la clínica.
          </Alert>
        )}
        <FormTemplate submitLabel="Pedir turno" loading={status === 'sending'} columns={2} tabletColumns={2} mobileColumns={1}>
          <Input name="name" label="Tu nombre" autoComplete="name" required error={errors.name} />
          <Input name="phone" label="Teléfono" type="tel" autoComplete="tel" inputMode="tel" placeholder="341 555 0000" required error={errors.phone} />
          <Input name="pet" label="Mascota" placeholder="Nombre y especie, ej.: Lola, perra" required error={errors.pet} />
          <Select
            name="reason"
            label="Motivo"
            placeholder="Elegí un motivo"
            options={REASONS}
            value={reason}
            onChange={setReason}
            viewSearchBar={false}
            required
            error={errors.reason}
          />
          <DateInput
            className="form-template__full"
            name="date"
            label="Fecha preferida"
            placeholder="Elegí un día (opcional)"
            value={date}
            onChange={(value) => setDate(value instanceof Date ? value : undefined)}
            error={errors.date}
          />
        </FormTemplate>
      </Stack>
    </form>
  )
}

const OpenNow = () => {
  const closes = closingHour(new Date())
  return closes === null
    ? <Badge variant="dot" color="neutral" label="Cerrado ahora" />
    : <Badge variant="dot" color="success" label={`Abierto ahora · cierra a las ${closes} h`} />
}

function App() {
  return (
    <>
      <SiteHeader
        brand="Veterinaria Los Aromos"
        variant="sticky"
        skipLinkTarget="#main"
        labels={{ navigation: 'Principal', menu: 'Menú', skipLink: 'Saltar al contenido' }}
        links={[
          { label: 'Servicios', href: '#servicios' },
          { label: 'Equipo', href: '#equipo' },
          { label: 'Opiniones', href: '#opiniones' },
          { label: 'Horarios', href: '#ubicacion' },
        ]}
        actions={<Button label="Pedir turno" href="#turno" variant="outlined" size="small" />}
      />
      <main id="main">
        <Hero
          variant="centered"
          eyebrow={ADDRESS}
          title="La veterinaria del barrio, a pocas cuadras de casa"
          lead="Consultas, vacunas, cirugías menores y peluquería en Bv. Oroño. Abrimos de lunes a sábado y tenemos guardia telefónica para urgencias."
          actions={
            <>
              <Button label="Pedir turno" href="#turno" size="large" />
              <Button label="Ver horarios" href="#ubicacion" variant="text" size="large" />
            </>
          }
          note="Completás cinco datos y te contactamos para confirmar el día y la hora."
          // SAMPLE: replace with the clinic's own photo.
          media={<MediaPlaceholder label="Veterinaria revisando a un perro sobre la camilla del consultorio" ratio="21 / 9" />}
        />

        <Section id="servicios" tone="subtle" aria-labelledby="servicios-title">
          <SectionHeader
            titleId="servicios-title"
            title="Lo que hacemos en la clínica"
            description="Lo de todos los días, resuelto cerca de casa y con la historia de tu mascota a mano."
          />
          <FeatureList variant="cards" columns={{ base: 1, md: 2, lg: 4 }}>
            <FeatureItem icon={<Stethoscope />} title="Consultas">
              Controles de rutina y la consulta cuando algo no anda bien: revisión completa, diagnóstico y tratamiento explicado.
            </FeatureItem>
            <FeatureItem icon={<Syringe />} title="Vacunación">
              Plan de vacunas para perros y gatos desde cachorros, con la libreta sanitaria al día.
            </FeatureItem>
            <FeatureItem icon={<HeartPulse />} title="Cirugías menores">
              Castraciones y procedimientos ambulatorios, con control previo y seguimiento después.
            </FeatureItem>
            <FeatureItem icon={<Scissors />} title="Peluquería">
              Baño, corte y corte de uñas con turno, para que tu mascota no espere entre otros animales.
            </FeatureItem>
          </FeatureList>
        </Section>

        <Section id="equipo" aria-labelledby="equipo-title">
          <SectionHeader
            titleId="equipo-title"
            title="Quiénes te atienden"
            description="Tres veterinarios que conocen a tu mascota de una visita a la otra."
          />
          {/* SAMPLE: names, focus and portraits are placeholders. */}
          <Grid as="ul" columns={{ base: 1, md: 3 }}>
            {TEAM.map((vet) => (
              <Card as="li" key={vet.name}>
                <CardMedia component={MediaPlaceholder} label={vet.photo} ratio="4 / 3" />
                <CardHeader>
                  <Heading as="h3" size="sm">{vet.name}</Heading>
                </CardHeader>
                <CardContent>
                  <Text tone="muted">{vet.focus}</Text>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section id="opiniones" tone="subtle" aria-labelledby="opiniones-title">
          <SectionHeader titleId="opiniones-title" title="Lo que cuentan los vecinos" />
          <TestimonialList variant="featured" columns={{ base: 1, md: 2 }}>
            {REVIEWS.map(({ quote, name, role }) => (
              <Testimonial key={name} quote={quote} name={name} role={role} avatar={<Avatar name={name} alt="" />} />
            ))}
          </TestimonialList>
        </Section>

        <Section id="ubicacion" aria-labelledby="ubicacion-title">
          <SectionHeader titleId="ubicacion-title" title="Dónde estamos y cuándo abrimos" description={ADDRESS} />
          <Grid columns={{ base: 1, lg: 2 }} gap={8}>
            <Card>
              <CardHeader>
                <Stack direction="row" justify="between" align="center" wrap gap={3}>
                  <Heading as="h3" size="sm">Horarios</Heading>
                  <OpenNow />
                </Stack>
              </CardHeader>
              <CardContent>
                <Stack gap={6}>
                  <Stack as="ul" gap={3}>
                    {HOURS.map(({ days, time }) => (
                      <li key={days}>
                        <Stack direction="row" justify="between" gap={4}>
                          <Text as="span" measure={false}>{days}</Text>
                          <Text as="span" measure={false} weight="semibold" numeric>{time}</Text>
                        </Stack>
                      </li>
                    ))}
                  </Stack>
                  <Stack gap={2}>
                    <Heading as="h4" size="xs">Urgencias</Heading>
                    <Text>Fuera de horario tenemos guardia telefónica: te orientamos y, si hace falta, te recibimos en la clínica.</Text>
                  </Stack>
                  <Link href={MAPS_URL} target="_blank" rel="noopener noreferrer" label="Cómo llegar en Google Maps" />
                </Stack>
              </CardContent>
            </Card>
            {/* SAMPLE: replace with a photo of the clinic's front. */}
            <MediaPlaceholder label="Fachada de la clínica sobre Bv. Oroño 1450, con el cartel y la entrada" ratio="4 / 3" />
          </Grid>
        </Section>

        <CallToAction
          id="turno"
          variant="split"
          tone="brand"
          title="Pedí un turno"
          text="Dejanos tus datos y los de tu mascota. Te contactamos en el horario de atención para confirmar el día y la hora."
          aside={
            <Card>
              <CardContent>
                <AppointmentForm />
              </CardContent>
            </Card>
          }
        />
      </main>
      <SiteFooter
        brand="Veterinaria Los Aromos"
        columns={[
          {
            title: 'Clínica',
            links: [
              { label: 'Servicios', href: '#servicios' },
              { label: 'Equipo', href: '#equipo' },
              { label: 'Horarios y ubicación', href: '#ubicacion' },
              { label: 'Pedir turno', href: '#turno' },
            ],
          },
        ]}
        legal={`${ADDRESS} · Lunes a viernes de 9 a 20 h · Sábados de 9 a 13 h · © ${new Date().getFullYear()} Veterinaria Los Aromos`}
      />
    </>
  )
}

export default App
