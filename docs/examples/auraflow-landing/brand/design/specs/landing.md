# AuraFlow landing

Status: delivered
Framework: react (vite) · Rendering: spa
Design system: neus · Color scheme: light (dark tokens set for the brand)
Brand: Salvia y papel: musgo #55652F, fondo blanco cálido #F5F5F0, Fraunces en títulos · chosen from: Salvia y papel, Terracota al atardecer, Teal profundo, mantener neus

## Answers

1. Marca: 1a Salvia y papel.
2. Composición: 2a centrada y tranquila (seed 574776638, opción 1).
3. Imágenes: 3a MediaPlaceholder con la toma descrita.
4. Datos: 4a lista de espera; nombre y email; sin precios, prueba ni plataformas.

## Goal

Un joven profesional estresado entiende en un vistazo qué hace AuraFlow distinto
(la sesión nace de cómo llega hoy) y se apunta a la lista de espera.

## Audience and context

Público, móvil primero (lo abren entre reuniones o en el transporte), visita única.

## Public page

Inventory:
- Nombre: AuraFlow.
- App de meditación guiada por IA.
- Público: jóvenes profesionales con estrés laboral.
- La entrada es una frase sobre cómo llega la persona; la salida, una sesión para ese momento.
- Momentos de uso: antes de una reunión, entre llamadas, al cerrar el portátil.
- Pre-lanzamiento: lista de espera con nombre y email.
- Sin precios, prueba gratis, plataformas ni métricas (no los da el brief).

Argument:
- Hero → la pausa se adapta a tu día → demo: frase del usuario y la sesión que genera.
- Funciones → no es un catálogo de audios → tres funciones con icono.
- Testimonios → cabe en agendas llenas → una cita destacada y dos breves (SAMPLE).
- Registro → apuntarse cuesta dos campos → formulario en Card sobre banda brand.

Composition: seed 574776638, opción 1 → hero `centered` con la demo debajo /
features `grid` / testimonials `featured` / cta `split` con el formulario en `aside`.
Por qué: la más minimalista y la demo centrada muestra lo único del producto.
Signature: cada sección después del hero empieza con una regla de 1px en tinta, sin
overlines sobre los títulos.

Idea sentence: En esta página, la frase con la que llegas a la sesión se convierte en
la pieza central: la demo del hero muestra tu frase y la sesión que responde.

## Screens

1. Landing — route `/` — entender y apuntarse — "Unirme a la lista de espera"

## Component map

| Region | Components |
| --- | --- |
| Header | SiteHeader sticky, labels es, Button outlined small → #registro |
| Hero | Hero centered, Button large → #registro, note; media: Card con la demo + MediaPlaceholder |
| Funciones | Section subtle + SectionHeader + FeatureList grid + 3 FeatureItem (lucide) |
| Testimonios | Section + SectionHeader + TestimonialList featured + Testimonial + Avatar alt="" |
| Registro | CallToAction split tone brand, aside Card > form > FormTemplate + Input ×2; Alert |
| Footer | SiteFooter brand + legal |

## States

| Region | Loading | Empty | Error | Other |
| --- | --- | --- | --- | --- |
| Registro | botón `loading` | — | error por campo (nombre vacío, email inválido); Alert error si falla el envío | éxito: Alert success reemplaza el formulario |

## Content

En el código (`src/App.tsx`). Testimonios y demo marcados `SAMPLE:`.

## Customization decisions

- Level 0: Hero `centered`, FeatureList `grid`, TestimonialList `featured`, CallToAction `split` + `tone="brand"`; header action `outlined`.
- Level 1: `npx neus init --yes --primary "#55652F" --brand "..."`.
- Level 2: bloque de marca en `src/styles/neus.overrides.css` (fondo, tinta, bordes, Fraunces, botones en caja normal).
- Own markup: `.af-ruled` (regla de 1px en tinta, la signature) y el layout de la demo en `src/App.css`.

## Assumptions and open questions

- `joinWaitlist` no tiene backend: resuelve sin enviar. Conectar a la API real.
- La tercera función ("Aprende de tus días") es una suposición de producto; confirmar.
