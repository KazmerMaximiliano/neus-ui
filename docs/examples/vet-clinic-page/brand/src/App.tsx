import { useState, type FormEvent } from "react";
import { Scissors, Stethoscope, Syringe, HeartPulse } from "lucide-react";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
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
} from "neus-ui";
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
} from "neus-ui/sections";
import "./App.css";

const ADDRESS = "Bv. Oroño 1450, Rosario";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Bv.+Oro%C3%B1o+1450,+Rosario,+Santa+Fe";
// SAMPLE: placeholder; replace with the clinic's real phone and guardia number.
const PHONE = { label: "(0341) 000-0000", href: "tel:+543410000000" };

const HOURS = [
  { days: "Lunes a viernes", time: "9 a 20 h" },
  { days: "Sábados", time: "9 a 13 h" },
  { days: "Domingos", time: "Cerrado" },
];

// SAMPLE: example team; replace with the clinic's vets and their photos.
const TEAM = [
  { name: "Dra. Carolina Bustos", focus: "Clínica general y cirugía", bio: "Hace las cirugías menores y sigue a cada paciente hasta el alta." },
  { name: "Dr. Martín Ferraro", focus: "Vacunación y cachorros", bio: "Arma el plan de vacunas y acompaña los primeros meses de cada cachorro." },
  { name: "Dra. Julieta Sosa", focus: "Gatos y animales mayores", bio: "Atiende a los gatos en un consultorio aparte, sin perros cerca." },
];

// SAMPLE: example reviews; replace with real ones before launch.
const REVIEWS = [
  { quote: "Llevamos a Tola desde que era cachorra. La doctora se acuerda de todo su historial y siempre nos explica qué le van a hacer antes de hacerlo.", name: "Silvina Medina", role: "Tola, mestiza de 9 años" },
  { quote: "Un sábado a la mañana Simón se cortó una pata en la plaza. Nos atendieron enseguida y volvió a casa con los puntos hechos.", name: "Ezequiel Romero", role: "Simón, border collie" },
  { quote: "Para Michi es un lugar tranquilo. Ya no sufre las vacunas como antes.", name: "Rocío Giménez", role: "Michi, gato europeo" },
];

const REASONS = [
  { value: "consulta", label: "Consulta" },
  { value: "vacunacion", label: "Vacunación" },
  { value: "cirugia", label: "Cirugía menor" },
  { value: "peluqueria", label: "Peluquería" },
  { value: "otro", label: "Otro motivo" },
];

const LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Equipo", href: "#equipo" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Horarios", href: "#horarios" },
];

const dateFormat = new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" });

type Field = "name" | "phone" | "pet" | "reason" | "date";
type Errors = Partial<Record<Field, string>>;
type Request = { name: string; phone: string; pet: string; reason: string; date: Date };

const validate = (values: Partial<Request>): Errors => {
  const errors: Errors = {};
  if (!values.name?.trim()) errors.name = "Escribí tu nombre.";
  if ((values.phone?.replace(/\D/g, "").length ?? 0) < 10) errors.phone = "Escribí un teléfono con código de área.";
  if (!values.pet?.trim()) errors.pet = "Contanos quién viene.";
  if (!values.reason) errors.reason = "Elegí el motivo.";
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (!values.date) errors.date = "Elegí una fecha.";
  else if (values.date < today) errors.date = "Elegí una fecha desde hoy en adelante.";
  else if (values.date.getDay() === 0) errors.date = "Los domingos estamos cerrados. Elegí otro día.";
  return errors;
};

// SAMPLE: no backend yet; replace with the clinic's endpoint or WhatsApp integration.
const sendAppointmentRequest = (request: Request) =>
  new Promise<Request>((resolve) => setTimeout(() => resolve(request), 600));

const AppointmentForm = () => {
  const [formKey, setFormKey] = useState(0);
  const [reason, setReason] = useState("");
  const [date, setDate] = useState<Date>();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [sent, setSent] = useState<Request>();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = { name: String(data.get("name") ?? ""), phone: String(data.get("phone") ?? ""), pet: String(data.get("pet") ?? ""), reason, date };
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStatus("sending");
    try {
      setSent(await sendAppointmentRequest(values as Request));
      setStatus("idle");
    } catch {
      setStatus("failed");
    }
  };

  const reset = () => {
    setSent(undefined);
    setReason("");
    setDate(undefined);
    setErrors({});
    setFormKey((key) => key + 1);
  };

  if (sent) {
    return (
      <Alert
        ref={(alert) => alert?.focus()}
        tabIndex={-1}
        status="success"
        title="Recibimos tu pedido"
        actions={<Button label="Pedir otro turno" variant="outlined" size="small" onClick={reset} />}
      >
        Te llamamos al {sent.phone} para confirmar el turno de {sent.pet} el {dateFormat.format(sent.date)} ({REASONS.find((r) => r.value === sent.reason)?.label.toLowerCase()}).
      </Alert>
    );
  }

  return (
    <form key={formKey} onSubmit={handleSubmit} noValidate aria-label="Pedir turno">
      <Stack gap={6}>
        {status === "failed" && (
          <Alert status="error" title="No pudimos enviar tu pedido" live="assertive">
            Probá de nuevo en un momento o llamanos al {PHONE.label}.
          </Alert>
        )}
        <FormTemplate submitLabel="Pedir turno" loading={status === "sending"} columns={2} tabletColumns={2} mobileColumns={1} gap={20}>
          <Input name="name" label="Tu nombre" autoComplete="name" required error={errors.name} />
          <Input name="phone" label="Teléfono" type="tel" autoComplete="tel" inputMode="tel" required error={errors.phone}
            description="Te llamamos a este número para confirmar." />
          <Input name="pet" label="Mascota" required error={errors.pet} description="Nombre y especie, por ejemplo: Luna, gata." />
          <Select name="reason" label="Motivo" description="Obligatorio." placeholder="Elegí el motivo" options={REASONS} value={reason}
            onChange={setReason} viewSearchBar={false} error={errors.reason} />
          <DateInput name="date" label="Fecha preferida" placeholder="Elegí un día" required value={date}
            onChange={(value) => setDate(value instanceof Date ? value : undefined)} error={errors.date}
            description="De lunes a sábado. Confirmamos el horario por teléfono." />
        </FormTemplate>
      </Stack>
    </form>
  );
};

function App() {
  return (
    <>
      <SiteHeader
        brand="Veterinaria Los Aromos"
        links={LINKS}
        actions={<Button label="Pedir turno" href="#turno" variant="outlined" size="small" />}
        variant="sticky"
        skipLinkTarget="#main"
        labels={{ navigation: "Principal", menu: "Menú", skipLink: "Saltar al contenido" }}
      />
      <main id="main">
        <Hero
          variant="split"
          title="Tu veterinaria de barrio"
          lead="Consultas, vacunas, cirugías menores y peluquería en Bv. Oroño 1450, Rosario. Y guardia telefónica para urgencias."
          actions={
            <>
              <Button label="Pedir turno" href="#turno" size="large" />
              <Button label="Ver horarios" href="#horarios" variant="text" size="large" />
            </>
          }
          note={<>¿Urgencia fuera de horario? <Link href={PHONE.href} label={`Guardia: ${PHONE.label}`} /></>}
          // SAMPLE: replace with the clinic's own photo.
          media={<MediaPlaceholder label="Veterinaria revisando a un perro en el consultorio de Los Aromos" ratio="4 / 3" />}
        />

        <Section id="servicios" tone="subtle" aria-labelledby="servicios-title">
          <SectionHeader titleId="servicios-title" title="Lo que hacemos"
            description="Todo lo que tu mascota necesita durante el año, en el mismo lugar y con la misma gente." />
          <FeatureList variant="cards" columns={{ base: 1, md: 2, lg: 4 }}>
            <FeatureItem icon={<Stethoscope />} title="Consultas">
              Controles de rutina y la consulta cuando algo no anda bien, con tiempo para escucharte.
            </FeatureItem>
            <FeatureItem icon={<Syringe />} title="Vacunación">
              Plan de vacunas para perros y gatos, con la libreta sanitaria siempre al día.
            </FeatureItem>
            <FeatureItem icon={<HeartPulse />} title="Cirugías menores">
              Castraciones, suturas y extracciones en nuestro quirófano, con seguimiento hasta el alta.
            </FeatureItem>
            <FeatureItem icon={<Scissors />} title="Peluquería">
              Baño, corte y corte de uñas con turno, para que no espere ni se estrese.
            </FeatureItem>
          </FeatureList>
        </Section>

        <Section id="equipo" aria-labelledby="equipo-title">
          <SectionHeader titleId="equipo-title" title="Quiénes te atienden"
            description="Tres veterinarios que conocen a sus pacientes por el nombre." />
          {/* SAMPLE: example team; replace names, focus and photos. */}
          <Grid as="ul" columns={{ base: 1, md: 3 }}>
            {TEAM.map((vet) => (
              <Card as="li" key={vet.name}>
                <MediaPlaceholder label={`Retrato de ${vet.name} en la clínica`} ratio="4 / 3" />
                <CardHeader>
                  <Stack gap={1}>
                    <Heading as="h3" size="sm">{vet.name}</Heading>
                    <Text variant="small" tone="primary" weight="semibold">{vet.focus}</Text>
                  </Stack>
                </CardHeader>
                <CardContent>
                  <Text>{vet.bio}</Text>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section id="opiniones" tone="subtle" aria-labelledby="opiniones-title">
          <SectionHeader titleId="opiniones-title" title="Lo que cuentan los vecinos" />
          {/* SAMPLE: example reviews; replace with real ones. */}
          <TestimonialList variant="featured" columns={{ base: 1, md: 2 }}>
            {REVIEWS.map(({ quote, name, role }) => (
              <Testimonial key={name} quote={quote} name={name} role={role} avatar={<Avatar name={name} alt="" />} />
            ))}
          </TestimonialList>
        </Section>

        <Section id="horarios" aria-labelledby="horarios-title">
          <Grid columns={{ base: 1, lg: 2 }} gap={{ base: 8, lg: 12 }}>
            <Stack gap={6}>
              <SectionHeader titleId="horarios-title" title="Dónde y cuándo" description={ADDRESS}
                actions={<Link href={MAPS_URL} label="Cómo llegar (se abre en otra pestaña)" target="_blank" rel="noopener noreferrer" />} />
              <dl className="hours">
                {HOURS.map(({ days, time }) => (
                  <div className="hours__row" key={days}>
                    <dt>{days}</dt>
                    <dd>{time}</dd>
                  </div>
                ))}
              </dl>
              <Card>
                <CardHeader>
                  <Heading as="h3" size="sm">Guardia telefónica para urgencias</Heading>
                </CardHeader>
                <CardContent>
                  <Stack gap={4} align="start">
                    <Text>Fuera de horario, si tu mascota tiene una urgencia, llamanos: te decimos qué hacer y adónde ir.</Text>
                    <Button label={`Llamar a la guardia: ${PHONE.label}`} href={PHONE.href} variant="tonal" />
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
            {/* SAMPLE: replace with a photo of the storefront. */}
            <MediaPlaceholder label="Fachada de Los Aromos sobre Bv. Oroño 1450, con el cartel y la puerta" ratio="4 / 3" />
          </Grid>
        </Section>

        <CallToAction
          id="turno"
          tone="brand"
          variant="split"
          title="Pedí turno para tu mascota"
          text={`Completá el formulario y te llamamos para confirmar el día y el horario. Si es una urgencia fuera de horario, llamá a la guardia al ${PHONE.label}.`}
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
          { title: "Clínica", links: LINKS },
          { title: "Contacto", links: [{ label: PHONE.label, href: PHONE.href }, { label: "Cómo llegar", href: MAPS_URL }] },
        ]}
        legal={`${ADDRESS} · Lunes a viernes de 9 a 20 h, sábados de 9 a 13 h, domingos cerrado · Guardia: ${PHONE.label}`}
      />
    </>
  );
}

export default App;
