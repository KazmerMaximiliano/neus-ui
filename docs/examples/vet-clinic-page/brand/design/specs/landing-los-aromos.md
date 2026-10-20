# Veterinaria Los Aromos — landing

Status: building
Framework: react (vite) · Rendering: spa
Design system: neus · Color scheme: light
Brand: Aromo y monte: verde bosque #2F5D3A, crema cálida, Fraunces · chosen from: Aromo y monte, Terracota de barrio, Petróleo sobre papel, neus as is

## Answers

- Marca: Aromo y monte (recomendada).
- Composición: split + tarjetas (dealt seed 332326730, opción 3 adaptada): hero `split`, servicios `FeatureList variant="cards"`, opiniones `featured`, cierre `CallToAction variant="split"` con el formulario en una Card.
- Fotos: `MediaPlaceholder` rotulados, marcados `SAMPLE:`.
- Datos faltantes: nombres del equipo y opiniones como ejemplo `SAMPLE:`; teléfono como placeholder evidente `(0341) 000-0000`, marcado `SAMPLE:`.

## Goal

Que un vecino del barrio pida turno para su mascota en menos de un minuto y sepa dónde y cuándo atiende la clínica, y qué hacer ante una urgencia.

## Audience and context

Público, dueños de mascotas de Rosario; mayoría en el teléfono. Visita ocasional.

## Public page

Inventory:
1. Veterinaria Los Aromos, clínica de barrio.
2. Rosario, Bv. Oroño 1450.
3. Lunes a viernes de 9 a 20 h.
4. Sábados de 9 a 13 h; domingos cerrado.
5. Guardia telefónica para urgencias.
6. Consultas.
7. Vacunación.
8. Cirugías menores.
9. Peluquería.
10. Equipo de tres veterinarios.
11. Turnos pedidos por formulario: nombre, teléfono, mascota, motivo, fecha preferida.

Argument:
- Hero → somos tu veterinaria de barrio en Bv. Oroño → dirección, horario y CTA a la vista.
- Servicios → cubrimos lo de todos los días → los cuatro servicios con una línea concreta.
- Equipo → te atiende siempre la misma gente → tres veterinarios con nombre y foco.
- Opiniones → los vecinos vuelven → tres opiniones (SAMPLE), una destacada.
- Ubicación y horarios → es fácil llegar y saber cuándo → dirección, tabla de horarios, guardia.
- Turno → pedirlo lleva un minuto → formulario con confirmación telefónica.

Composition: hero split / features cards / testimonials featured / cta split, on tone="brand".

Idea sentence: On this page, el horario y la guardia —lo que un vecino necesita saber antes de salir— se leen como un cartel de puerta, en la tipografía display.

## Screens

1. Landing — route `/` — pedir turno — "Pedir turno"

## Component map

| Region | Components |
| --- | --- |
| Header | SiteHeader sticky, labels es, action Button outlined small "Pedir turno" |
| Hero | Hero split, Button large href="#turno", MediaPlaceholder |
| Servicios | Section subtle + SectionHeader + FeatureList cards (4 columns lg) |
| Equipo | Section + SectionHeader + Grid ul + Card li + MediaPlaceholder + Heading + Text |
| Opiniones | Section subtle + TestimonialList featured + Avatar |
| Ubicación | Section + Grid: horarios (dl) + Card guardia + MediaPlaceholder fachada + Link "Cómo llegar" |
| Turno | CallToAction split tone="brand", aside Card + form + FormTemplate + Input, Select, DateInput, Alert |
| Footer | SiteFooter |

## States

| Region | Idle | Error | Sending | Sent |
| --- | --- | --- | --- | --- |
| Formulario | campos vacíos | error por campo (requerido, teléfono corto, fecha pasada o domingo) | botón loading | Alert success con resumen + "Pedir otro turno" |

## Content

Copy en el código (`src/App.tsx`). Voseo rioplatense, sentence case.

## Customization decisions

- Level 0: variants above.
- Level 1: `npx neus init --yes --primary "#2F5D3A" --brand "Aromo y monte: …"`.
- Level 2: brand block in `src/styles/neus.overrides.css` (crema, tinta, Fraunces, botones en caja natural).
- Level 3: page classes in `src/App.css` for the hours list and team picture.

## Assumptions and open questions

- Teléfono, nombres del equipo, opiniones: SAMPLE, reemplazar.
- El formulario no tiene backend: `sendAppointmentRequest` es un stub a reemplazar por el endpoint/WhatsApp real.
- Sin mapa interactivo (InteractiveMap requiere API key de Google Maps): placeholder + link a Google Maps.
