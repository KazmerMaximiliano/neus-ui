# Landing de Veterinaria Los Aromos

Status: delivered
Framework: react (vite) · Rendering: spa
Design system: derived `design/system/DESIGN.md` "Los Aromos" (extends neus) · Color scheme: light
Brand: Bosque y bronce: verde #2F5D3A, crema #F4F2EA, Newsreader + Work Sans · chosen from: Bosque y bronce, Borgoña editorial, Océano mineral (deal-directions seed 3867305388)

## Answers

- Sistema: Bosque y bronce (recomendado), con densidad estándar en vez de compacta.
- Fotos: marcadores `MediaPlaceholder` rotulados con la toma, marcados `SAMPLE:`.
- Teléfonos: afuera. La página menciona la guardia telefónica sin número.
- Equipo: nombres de ejemplo, marcados `SAMPLE:`.

## Goal

Que un vecino de la zona de Bv. Oroño vea qué hace la clínica, cuándo abre y
quién lo atiende, y pida turno desde el celular en menos de un minuto.

## Audience and context

Público, dueños de mascotas del barrio. Celular primero. Visita ocasional,
a veces con urgencia (necesita saber ya si está abierto).

## Public page

Inventory:
1. Nombre: Veterinaria Los Aromos (aromo: árbol de flor amarilla).
2. Clínica de barrio en Rosario.
3. Dirección: Bv. Oroño 1450.
4. Lunes a viernes de 9 a 20 h.
5. Sábados de 9 a 13 h; domingos cerrado.
6. Guardia telefónica para urgencias.
7. Servicios: consultas, vacunación, cirugías menores, peluquería.
8. Equipo de tres veterinarios.
9. Turnos pedidos por formulario: nombre, teléfono, mascota, motivo, fecha preferida.

Argument:
- Hero → atención de barrio cerca de casa → dirección, días y CTA a turno.
- Servicios → resolvemos lo de todos los días sin ir lejos → cuatro servicios concretos.
- Equipo → te atiende siempre gente conocida → tres veterinarios con nombre y foco.
- Opiniones → vecinos que ya vienen → tres testimonios con su mascota.
- Ubicación y horarios → sabés ya si está abierto → estado "abierto ahora" en vivo, tabla de horarios, guardia.
- Turno → pedirlo es simple → formulario de cinco campos en la banda de marca.

Composition: deal seed 3867305388, opción 2 → hero `centered` con foto ancha
debajo / servicios `cards` / opiniones `featured` / cta `split` con el
formulario en `aside`. Elegida porque el formulario de turno al lado del
cierre es la acción central de una clínica.

Idea sentence: En esta página, los horarios de la clínica de Bv. Oroño se
vuelven un estado "abierto ahora" calculado en hora de Rosario, que responde
la primera pregunta del vecino antes de pedir turno.

## Screens and flow

1. Landing — route `/` — pedir turno — "Pedir turno"

## Component map

| Region | Components and key props |
| --- | --- |
| Header | SiteHeader variant="sticky", skipLinkTarget="#main", labels es, action Button outlined small "Pedir turno" |
| Hero | Hero variant="centered", eyebrow dirección, Button large + Button text "Ver horarios", MediaPlaceholder 21/9 |
| Servicios | Section tone="subtle" + SectionHeader + FeatureList variant="cards" columns {1,2,4} |
| Equipo | Section + SectionHeader + Grid as="ul" de Card as="li" (MediaPlaceholder 4/5, Heading h3, Text) |
| Opiniones | Section tone="subtle" + TestimonialList variant="featured" + Avatar |
| Ubicación | Section + Grid 2 col: Card (Badge estado, `dl` horarios, guardia) y MediaPlaceholder fachada + Link "Cómo llegar" |
| Turno | CallToAction id="turno" variant="split" tone="brand", aside Card + form + FormTemplate (Input, Input tel, Input, Select, DateInput) |
| Footer | SiteFooter brand, columna Clínica, legal con dirección y horarios |

## States

| Region | Loading | Empty | Error | Other |
| --- | --- | --- | --- | --- |
| Formulario | botón en `loading` | — | errores por campo; Alert error assertive si falla el envío | éxito: Alert success con resumen y "Pedir otro turno" |
| Estado abierto | — | — | — | "Abierto ahora · cierra a las N h" / "Cerrado ahora" |

## Content

Copy final en `src/App.tsx`. Validaciones: nombre, teléfono, mascota y
motivo obligatorios; teléfono con al menos 8 dígitos; fecha preferida
opcional, no puede ser pasada ni domingo.

## Customization decisions

- Level 0 (variants): ver component map.
- Level 1 (palette): `npx neus init --yes --base neus --primary "#2F5D3A" --brand "..."`.
- Level 2: sistema derivado en `design/system/DESIGN.md` → `src/styles/neus.system.css` (fondo, tinta, fuentes, radios, elevación, botones en caja normal).
- Level 3/4: ninguno. Los horarios son un `Stack as="ul"` con `Text`; sin CSS propio.

## Assumptions and open questions

- Nombres del equipo y opiniones son de ejemplo (`SAMPLE:`).
- Fotos: marcadores hasta tener fotos reales.
- Sin número de guardia ni de turnos: pendiente del cliente.
- El envío del formulario no tiene backend todavía: `sendAppointmentRequest` en `src/App.tsx` es el punto a conectar (email, API o WhatsApp).
- Se asume que la clínica contacta para confirmar el turno (copy del hero y del formulario).
- Descripción de cirugías menores (castraciones, suturas) asumida; confirmar con la clínica.
