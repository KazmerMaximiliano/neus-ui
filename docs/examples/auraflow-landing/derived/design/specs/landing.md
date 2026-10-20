# AuraFlow landing

Status: building
Framework: react (vite) · Rendering: spa
Design system: derived `design/system/DESIGN.md` (AuraFlow Sand, extends neus) · Color scheme: light
Brand: Arena y terracota: #A8471F, arena #F5EFE6, Newsreader · chosen from: Arena y terracota / Burdeos editorial / Tinta y naranja / Neus tal cual

## Answers

- Dirección: Arena y terracota (dealt seed 2575709694, option 3).
- Imágenes: placeholders (`MediaPlaceholder`) con la toma a reemplazar.
- Formulario: nombre y email.
- Datos de negocio: ninguno (sin precios, pruebas, tiendas ni métricas).

## Goal

Un profesional joven y estresado entiende en un vistazo que AuraFlow arma una
pausa guiada a partir de cómo llega, y deja nombre y email para el acceso
anticipado.

## Audience and context

Público, móvil primero (lo abren entre reuniones), una visita.

## Public page

Inventory (del brief): nombre AuraFlow; app de meditación; la IA guía la
sesión; público: profesionales jóvenes estresados; su día tiene reuniones,
pantallas y noches sin desconectar; la app empieza preguntando cómo llegas;
sesiones cortas que caben en el día laboral; aprende de lo que te funciona;
startup en acceso anticipado (registro simple).

Argument:
- Hero → la pausa cabe antes de la próxima reunión → CTA a registro.
- Características (3, con iconos) → no es una biblioteca de audios, es una
  sesión hecha para tu momento → cómo llegas, cuánto tiempo tienes, qué te funciona.
- Testimonios → funciona en días laborales reales → tres citas SAMPLE.
- Registro → reservar lugar → formulario nombre + email.

Composition (dealt, seed 2575709694 option 3): hero `split` / features `list`
/ testimonials `plain` / cta `band` with the form in a Card. Fits the
hairline, no-surface system and the calm subject.

Idea sentence: En esta página, la pregunta con la que empieza cada sesión
("¿cómo llegas?") se vuelve el titular enorme en Newsreader y el hilo de las
tres características.

## Screens

1. Landing — route `/` — reservar acceso — "Pedir acceso anticipado"

## Component map

| Region | Components |
| --- | --- |
| Header | SiteHeader sticky, labels es, action Button outlined small → #registro |
| Hero | Hero split, Button large → #registro, note, MediaPlaceholder 4/5 (SAMPLE) |
| Características | Section default + SectionHeader + FeatureList list + FeatureItem (lucide icons) |
| Testimonios | Section subtle + SectionHeader + TestimonialList plain + Testimonial + Avatar (SAMPLE) |
| Registro | CallToAction band tone brand, Card > form > FormTemplate (Input nombre, Input email), Alert |
| Footer | SiteFooter brand + legal |

## States

| Region | Loading | Error | Success |
| --- | --- | --- | --- |
| Registro | submit Button `loading` | field errors (vacío, email inválido); Alert error assertive si falla el envío | Alert success reemplaza el formulario |

## Customization decisions

- Level 0: variants above.
- Level 1: `npx neus init --yes --primary "#A8471F" --brand "..."`.
- Level 2: none in `neus.overrides.css`; ground, ink, faces, shapes and button case live in the derived DESIGN.md (`x-neus`).
- Level 3: `.signup-card` width inside the band (page CSS).

## Assumptions and open questions

- Copy en español neutro con "tú".
- `requestEarlyAccess` no tiene backend: resuelve localmente; conectar al endpoint real.
- Testimonios y nombres son ejemplos (`SAMPLE:`).
