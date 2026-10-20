# Jornadas Frontend Córdoba 2027 — landing

Status: delivered
Framework: react · Rendering: spa
Design system: neus · Color scheme: light (dark tokens set)
Brand: Ladrillo de la Docta: terracota #A8471F, arena cálida, Space Grotesk · chosen from: Ladrillo de la Docta, Celeste pabellón, Monte serrano, Neus tal cual

## Answers

- Marca: Ladrillo de la Docta.
- Composición: titular enorme + split (seed 3894022354, opción 3).
- Oradores y agenda: ejemplos realistas marcados `SAMPLE:`.
- Fotos: `MediaPlaceholder` con la toma a reemplazar.

## Goal

Que un desarrollador frontend de Argentina o la región entienda en un vistazo qué, cuándo y dónde, y compre su entrada o se sume a la lista de novedades.

## Audience and context

Público, móvil primero (llegan desde redes y grupos), una sola visita de decisión.

## Public page

Inventory (brief): Jornadas Frontend Córdoba 2027 · dos días · viernes 14 y sábado 15 de mayo de 2027 · Pabellón Argentina · Universidad Nacional de Córdoba (Ciudad Universitaria) · desarrollo web frontend · Argentina y la región · General $45.000 · Estudiantes $20.000 · pesos argentinos · lista de novedades.

Argument:
- Hero → la cita es concreta → fecha, lugar y precio de entrada a la vista, CTA "Comprar entrada".
- Agenda → dos días con recorridos distintos → bloques horarios por día (SAMPLE).
- Oradores → gente que hace frontend en la región → seis oradores con rol y charla (SAMPLE).
- Entradas → dos precios simples → General y Estudiantes en ARS.
- Preguntas → quitar dudas antes de pagar → seis preguntas.
- Novedades → no perderse la agenda final → formulario nombre + email.

Composition: seed 3894022354 opción 3 → hero `split` / agenda como lista de especificación / oradores en cards / cierre `band` con formulario en Card → la fecha y el lugar son el dato; el titular grande los sostiene.

Idea sentence: En esta página, la fecha y el Pabellón Argentina se vuelven el titular gigante en Space Grotesk que abre la página.

## Screens and flow

1. Landing — route `/` — decidir y comprar — "Comprar entrada"

## Component map

| Region | Components |
| --- | --- |
| Header | SiteHeader sticky, labels es, Button outlined small "Comprar entrada" |
| Hero | Hero split, eyebrow fecha, MediaPlaceholder Pabellón (SAMPLE) |
| Agenda | Section tone="brand", Grid 2 columnas de Card as="li" por día, Stack as="ol" de bloques |
| Oradores | Section, Grid as="ul" Card as="li", Avatar + Heading + Text |
| Entradas | Section tone="subtle", Grid 2 Card as="li", Text numeric precio, Button |
| Preguntas | Section, FeatureList variant="list" |
| Novedades | CallToAction split tone="inverse", Card + form + FormTemplate + Input, Alert |
| Footer | SiteFooter |

## States

| Region | Loading | Empty | Error | Other |
| --- | --- | --- | --- | --- |
| Novedades | botón `loading` | — | Alert error assertive | Alert success al suscribirse |

## Content

Copy en `src/App.tsx`. Pendientes: `[pending: URL de venta de entradas]`, `[pending: endpoint de la lista de novedades]`.

## Customization decisions

- Level 0: variants por componente (arriba).
- Level 1: `npx neus init --yes --primary "#A8471F" --brand "Ladrillo de la Docta: ..."`.
- Level 2: bloque de marca en `src/styles/neus.overrides.css` (arena, tinta, Space Grotesk, botones en caso natural).
- Level 3/4: precio de entrada como `Text numeric` con `style` inline a `--font-display` y `--type-headline-size` (Heading no admite `as="p"` y el precio no es un título).

## Assumptions and open questions

- Oradores, charlas, horarios y respuestas de FAQ son ejemplos (`SAMPLE:`).
- No se indica qué acredita la tarifa Estudiantes; la página no lo inventa.
- Compra de entradas: `onBuyTicket` sin URL real todavía.
