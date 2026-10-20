# Landing Jornadas Frontend Córdoba 2027

Status: delivered
Framework: react (vite) · Rendering: spa
Design system: derived "Programa" (`design/system/DESIGN.md`, extends vercel) · Color scheme: light
Brand: Programa: naranja señal #c2410c, papel #f7f5f0, Source Serif 4 · chosen from: Tinta y naranja / Cobalto preciso / Arena y terracota (deal seed 58283564)

## Answers
- Sistema: Tinta y naranja (recomendado) → base vercel, palette "Ink and signal orange", Source Serif 4 + Source Sans 3, Crisp 4/6px, Compact, Hairlines, signature: cada sección abre sobre una línea de tinta de 1px, sin overlines.
- Imágenes: placeholders (`MediaPlaceholder`), avatares con iniciales para oradores.
- Contenido faltante: ejemplos realistas marcados `SAMPLE:` (oradores, charlas, horarios, respuestas no dadas por el brief). El link real de compra queda pendiente (`TICKETS_URL`).

## Goal
Que un desarrollador frontend de Argentina o la región entienda en una pantalla cuándo y dónde es, vea qué va a escuchar y compre su entrada; quien todavía no compra se suma a la lista de novedades.

## Audience and context
Público, desktop y teléfono por igual (se comparte por redes y chats). Una o pocas visitas.

## Public page
Inventory (del brief): nombre "Jornadas Frontend Córdoba 2027"; dos días; viernes 14 y sábado 15 de mayo de 2027; Pabellón Argentina; Universidad Nacional de Córdoba (Ciudad Universitaria); público: frontend de Argentina y la región; General $45.000; Estudiantes $20.000; precios en pesos argentinos; lista de novedades.

Argument:
- Hero → "es en Córdoba, estas dos fechas, en este edificio" → fecha y lugar en el lead, CTA a entradas, foto del Pabellón.
- Agenda → "dos días con un recorrido claro cada uno" → banda inversa, dos columnas con horarios en mono.
- Oradores → "gente que hace frontend en la región" → seis cards con nombre, rol, ciudad y charla (SAMPLE).
- Entradas → "dos precios, sin letra chica" → dos cards, General sólida, Estudiantes outlined.
- Preguntas → "lo que se pregunta antes de comprar" → `details` nativos.
- Novedades → "enterate cuando salgan oradores y agenda final" → CallToAction split con el formulario en Card.

Composition (seed 58283564, opción 2): hero split / features cards (oradores y entradas en `Grid as="ul"` + `Card as="li"`) / sin testimonios (el brief no los pide) / cierre: el formulario usa `CallToAction variant="split"` porque lleva campos.

Idea sentence: En esta página, el programa impreso de las Jornadas —dos días, horarios en columna, líneas de tinta entre bloques— se convierte en la estructura de la landing.

## Screens and flow
1. Landing — route `/` — comprar entrada — "Comprar entrada"

## Component map
| Region | Components and key props |
| --- | --- |
| Header | SiteHeader variant="sticky", links Agenda/Oradores/Entradas/Preguntas, action Button outlined small → #entradas, labels es |
| Hero | Hero variant="split", lead con fecha y lugar, Button large → #entradas, note con precios, MediaPlaceholder 4/3 |
| Agenda | Section tone="inverse" + SectionHeader + Grid as="ul" columns md 2 + Card as="li" (CardHeader Heading h3, CardContent ol con horario Text numeric) |
| Oradores | Section + SectionHeader + Grid as="ul" + Card as="li" con Avatar large alt="" |
| Entradas | Section + SectionHeader + Grid as="ul" columns md 2 + Card + CardFooter Button (General solid, Estudiantes outlined) |
| Preguntas | Section + SectionHeader + `details`/`summary` propios con tokens |
| Novedades | CallToAction variant="split" + Card + form + FormTemplate columns 1 + Input nombre, email + Alert |
| Footer | SiteFooter brand, columna Jornadas, legal |

## States
| Region | Loading | Empty | Error | Other |
| --- | --- | --- | --- | --- |
| Novedades | Button loading en submit | — | error por campo (nombre vacío, email inválido); Alert error assertive si falla el envío | Alert success reemplaza el formulario |

## Content
Ver `src/App.tsx`. Pendientes: `[pending: link de la boletería]` en `TICKETS_URL`; servicio real de suscripción en `subscribeToNewsletter`.

## Customization decisions
- Level 0 (variants): Section tone inverse solo en Agenda; Button solid una vez por vista.
- Level 1 (palette): `npx neus init --yes --base vercel --primary "#c2410c" --brand "Programa: …"`.
- Level 2 (tokens): sistema derivado en `design/system/DESIGN.md` → `npx neus design build`; `neus.overrides.css` sin cambios.
- Level 3 (part classes): `.jfc-section` agrega la línea de tinta superior (firma del sistema, sin token propio); `.jfc-price` precio en serif; `.jfc-schedule` filas de agenda; `.jfc-faq` details.

## Assumptions and open questions
- Oradores, charlas, horarios y algunas respuestas de preguntas frecuentes son de ejemplo (`SAMPLE:`).
- Se asume que ambas entradas dan acceso a los dos días y que la de estudiante pide constancia de alumno regular.
- La suscripción no tiene backend todavía.
