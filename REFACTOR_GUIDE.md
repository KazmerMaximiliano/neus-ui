# Guía de refactor de componentes: diseños y personalización modular

Esta guía documenta el patrón implementado en Button, Input, Card y Sidebar y explica cómo
aplicarlo a otros componentes de Neus UI. Está dirigida a quienes modifican la
biblioteca y a quienes deben migrar sus usos en aplicaciones.

La estructura y el comportamiento pertenecen al componente. Los sistemas de
diseño definen su apariencia mediante variables CSS. La aplicación puede
personalizar un ámbito completo, una instancia o una sección concreta.

## 1. Qué cambió en Button y Card

| Aspecto | Button | Card |
| --- | --- | --- |
| Estructura pública | Un componente con etiqueta y loader internos | Cinco componentes exportados y componibles |
| Apariencia | Tokens `--button-*` y recetas por sistema | Tokens `--card-*` compartidos por la familia y recetas por sistema |
| Personalización puntual | `buttonStyle`, `labelStyle`, `loaderStyle` | `className` y `style` en cada componente |
| Estilos sin personalizar | Props opcionales de tipo `CSSProperties`; al omitirlas quedan en `undefined` | `style?: CSSProperties \| null`, con valor predeterminado `null` |
| Contenido | `label`; el componente gestiona el loader | `children` y elementos multimedia elegidos por el consumidor |
| Comportamiento | Conserva variantes, tamaños, colores, carga, deshabilitado y clic | Contenedor pasivo; las acciones pertenecen a sus children |
| Exportación | `Button/index.ts` agrupa componente y tipos públicos | `Card/index.ts` agrupa la familia y sus tipos públicos |
| Storybook | Una historia con selector de diseño | Una historia por componente; Card muestra la composición completa |

Ambos cuentan con adaptaciones para `neus`, `apple`, `carbon`, `material`,
`neobrutalism` y `vercel`. Neus es el diseño predeterminado. Las recetas son
adaptaciones del proyecto; su cobertura figura en el registro compartido.

## 2. Responsabilidades del sistema

| Capa | Responsabilidad | Ubicación |
| --- | --- | --- |
| Tokens semánticos | Superficies, colores, tipografía, espaciados y radios generales | `src/css/variables.css` |
| Selección del tema | Sistema activo, claro/oscuro, ámbitos y colores personalizados | `src/providers/ThemeProvider/` |
| Configuración de diseños | IDs, metadatos, cobertura y paletas | `src/design-systems/` |
| Contrato visual del componente | Valores Neus completos de sus tokens | `src/design-systems/neus/<componente>.css` |
| Receta de un diseño | Valores que cambian respecto de Neus | `src/design-systems/<sistema>/<componente>.css` |
| Estilos del componente | Selectores, estructura, estados y consumo de tokens | `<ComponentName>.styles.css` |
| Implementación | HTML, composición, interacción y accesibilidad | `<ComponentName>.tsx` |
| API | Props públicas y tipos de controles de la historia | `<ComponentName>.types.ts` |
| Personalización de aplicación | Clases reutilizables y objetos de estilo puntuales | CSS y JSX del consumidor |

El recorrido habitual es:

```text
ThemeProvider
  → atributos data-design-system y data-color-scheme
  → tokens semánticos y contrato Neus
  → receta del sistema elegido
  → CSS del componente
  → personalización de la aplicación
```

El componente consume variables CSS sin preguntar qué diseño está activo.
Los condicionales de React siguen siendo apropiados para comportamientos como
el estado de carga de Button o el elemento seleccionado en CardMedia.

### Selección del diseño y ámbitos

```tsx
import { Button, Card, CardContent, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="carbon" colorScheme="dark">
    <Button label="Guardar" />
    <ThemeProvider designSystem="neus" colorScheme="light">
      <Card>
        <CardContent>Contenido con un tema local.</CardContent>
      </Card>
    </ThemeProvider>
  </ThemeProvider>
);
```

Un provider raíz usa alcance global por defecto. `scope="local"` crea un
contenedor aislado; los providers anidados siempre son locales. Un provider
anidado hereda el sistema y el modo de su padre cuando no los especifica.
`colorScheme` controla el modo; `initialColorScheme` configura su estado inicial.

`designSystem` pertenece a ThemeProvider y a los controles de previsualización,
no a las props de Button o Card. Las paletas y los cambios de color se gestionan
con las APIs existentes del tema. La explicación completa está en
[Theming](./docs/theming.md).

## 3. Button como referencia de partes internas

Button conserva una responsabilidad concreta: ejecutar una acción. Su API
mantiene `label`, `type`, `variant`, `color`, `size`, `fullWidth`,
`disabled`, `loading` y `onClick`.

El refactor separa esas decisiones de los detalles visuales. Las clases de
variante, color y tamaño se generan en `Button.utils.ts`; el CSS consume tokens
para radio, padding, tipografía, bordes, sombras, transiciones y loader.
Los estados `:hover`, `:active`, `:focus-visible` y `:disabled` se definen
una vez en el CSS del componente y utilizan los valores del tema.

### Personalización de cada parte

| Prop | Destino | Ejemplos de uso |
| --- | --- | --- |
| `buttonStyle` | Elemento `button` | Radio, ancho o padding de una instancia |
| `labelStyle` | `span.button-label` | Tipografía o espaciado de la etiqueta |
| `loaderStyle` | Contenedor de BeatLoader | Color, tamaño relativo y separación de los puntos |

```tsx
<>
  <Button
    label="Guardar"
    variant="solid"
    color="primary"
    size="medium"
    buttonStyle={{ borderRadius: 12 }}
    labelStyle={{ letterSpacing: "0.08em" }}
  />
  <Button
    label="Guardando"
    loading
    loaderStyle={{ fontSize: 8, gap: 4, color: "var(--color-white)" }}
  />
</>
```

La etiqueta y el loader son alternativas de renderizado. El loader usa
`currentColor` y medidas relativas para sus puntos, por lo que
`loaderStyle.color` y `loaderStyle.fontSize` permiten personalizarlos desde su
contenedor. `loaderStyle` no se asigna individualmente a cada punto.

Button no exporta componentes para la etiqueta o el loader; por eso conserva
tres props de estilos con nombres específicos. Su API actual tampoco expone
`className`, `style` ni `children`. Para personalización reutilizable se puede
usar una clase en un ámbito local del tema y cambiar los tokens del botón.

Al migrar otro control con partes internas, definir qué elemento recibe cada
objeto de estilo y mantener el comportamiento accesible: Button sigue usando un
botón nativo, bloquea la interacción durante carga/deshabilitado y expone
`aria-busy` durante la carga.

Referencias: [implementación](./src/components/Button/Button.tsx),
[tipos](./src/components/Button/Button.types.ts),
[estilos](./src/components/Button/Button.styles.css) y
[contrato Neus](./src/design-systems/neus/button.css).

## 4. Card como referencia de composición modular

Card reemplaza los slots y modificadores anteriores por una familia de
componentes. Cada sección controla su propio elemento y recibe directamente
su contenido, clases y estilos.

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardFooter,
} from "neus-ui";

export const ProductCard = () => (
  <Card className="product-card" style={null}>
    <CardHeader>
      <h2>Nuevo destino</h2>
      <span>Disponible</span>
    </CardHeader>
    <CardMedia src="/destino.jpg" alt="Vista del destino" />
    <CardContent>
      <p>Descripción y contenido elegidos por la aplicación.</p>
    </CardContent>
    <CardFooter>
      <Button label="Ver detalles" />
      <a href="/favoritos">Favoritos</a>
    </CardFooter>
  </Card>
);
```

### Contrato de composición y layout

| Componente | Elemento predeterminado | Layout y contenido |
| --- | --- | --- |
| Card | `div` | Columna de ancho completo, sin padding ni gap; recorta el contenido en sus esquinas |
| CardHeader | `div` | Children en fila, alineación central, `space-between`, padding de 16px y gap de 8px |
| CardMedia | `img` | Ancho disponible sin padding; imágenes y videos con altura automática |
| CardContent | `div` | Children en flujo normal, padding de 16px |
| CardFooter | `div` | Fila con ajuste de línea, alineación central, padding y gap de 8px |

Las secciones son opcionales, independientes y se renderizan en el orden
indicado por el consumidor. Card no inserta wrappers ni valida la presencia de
secciones. Puede recibir texto, fragmentos o cualquier JSX directamente; ese
contenido libre define su propio espaciado o se envuelve en CardContent.
La jerarquía de encabezados y la tipografía pertenecen al contenido.

Cada componente combina su clase base con `className` y acepta
`style?: CSSProperties | null`. Un objeto de estilo se aplica al elemento de
esa sección. No existen props como `cardHeaderStyle` o `cardContentStyle`.

La familia preserva los atributos nativos compatibles, los atributos de
accesibilidad y las referencias. En React 19, la referencia llega como prop y
se reenvía al elemento correspondiente.

### CardMedia y tipado polimórfico

```tsx
<>
  <CardMedia src="/foto.jpg" alt="Paisaje" loading="lazy" />
  <CardMedia component="video" controls poster="/portada.jpg">
    <source src="/recorrido.webm" type="video/webm" />
    <track kind="captions" src="/recorrido.vtt" srcLang="es" label="Español" />
    Tu navegador no puede reproducir este video.
  </CardMedia>
  <CardMedia component="audio" src="/audio.ogg" controls />
  <CardMedia component="iframe" src="/reproductor" title="Recorrido virtual" />
</>
```

`component` también acepta un componente React personalizado. Sus props
obligatorias y el tipo de `ref` se conservan; el reproductor debe aceptar y
reenviar `className` y `style` para recibir la personalización.

El tipo genérico `CardMediaProps<C>` usa `ComponentPropsWithRef` y
`NoInfer<C>`: el elemento se determina mediante `component`, en lugar de
ampliarse accidentalmente por otros atributos. Por ejemplo, `controls` requiere
elegir video o audio; no es válido en la imagen predeterminada. Los elementos
vacíos como `img` rechazan children. Ver el
[tipo completo](./src/components/Card/CardMedia/CardMedia.types.ts).

El polimorfismo resuelve una necesidad específica de Media. Evaluarlo por
componente, junto con sus atributos, referencias y semántica, antes de añadirlo
a otras APIs.

### Migración de la API anterior

| Props retiradas | Implementación nueva |
| --- | --- |
| `avatarImage`, `avatarAlt` | Un `img` u otro componente como child de CardHeader |
| `leading`, `trailing` | Children explícitos de CardHeader |
| `icon`, `title`, `description` | Iconos, encabezados y texto colocados en las secciones |
| `variant`, `fill`, `color`, `highlighted`, `selected` | Clases, tokens o estilos de la aplicación |
| `disabled`, `onClick` | Estado y eventos en botones, enlaces u otros children interactivos |

El reemplazo rompe compatibilidad con esas props y elimina `CardColor` y
`CardVariant`. Card tampoco expone los atributos nativos `title`, `color` y
`onClick`, para mantenerlos fuera de su nueva API. Esto no elimina atributos
necesarios en otros componentes: CardMedia conserva, por ejemplo, `title` para
iframe y `onPlay` para video.

Los selectores antiguos `card__*` y `card--*` se reemplazan por `card`,
`card-header`, `card-media`, `card-content` y `card-footer`. Las aplicaciones
que personalizaban esos selectores deben actualizar su CSS.

La eliminación de estados es una decisión propia de Card. Estados funcionales
como `disabled` y `loading` siguen perteneciendo a controles como Button.
La guía de uso completa está en [Card](./docs/components/Card.md).

## 5. Elegir el nivel de personalización

| Necesidad | Mecanismo |
| --- | --- |
| Cambiar el diseño de una aplicación o sección | ThemeProvider con `designSystem` y modo de color |
| Reutilizar una adaptación visual | Tokens CSS en una clase de ámbito o de componente |
| Personalizar una sección pública | Su propio `className` y `style`, como CardHeader |
| Personalizar una parte interna no exportada | Una prop específica de estilos, como `labelStyle` |
| Cambiar el contenido o sus acciones | Composición con children cuando la API la permita |

### Overrides reutilizables

```tsx
<ThemeProvider scope="local" designSystem="apple" className="checkout-theme">
  <Button label="Comprar" />
  <Card className="checkout-card">
    <CardContent>Resumen del pedido</CardContent>
  </Card>
</ThemeProvider>
```

```css
[data-design-system].checkout-theme {
  --button-radius: 12px;
  --card-radius: 20px;
}

.checkout-card {
  --card-content-padding: 24px;
  --card-background: var(--color-surface-secondary);
}
```

Las clases agregadas conviven con la clase base; su posición dentro del atributo
`class` no define prioridad. Los overrides siguen las reglas normales de la
cascada y especificidad de CSS. Cargar el CSS de aplicación después del CSS de
la biblioteca y utilizar selectores adecuados al ámbito.

### Overrides puntuales

```tsx
<Card style={{ borderRadius: 24 }}>
  <CardHeader style={{ gap: 16 }}>Encabezado</CardHeader>
  <CardContent style={{ padding: 24 }}>Contenido</CardContent>
</Card>
```

Los estilos en línea tienen prioridad sobre las declaraciones normales del CSS
para la misma propiedad. Usarlos como ajustes de instancia y mantener los
valores predeterminados en los archivos CSS; las recetas no construyen ni
mezclan objetos `style` en JavaScript.

En Card, `style={null}` elimina los overrides anteriores y deja actuar al CSS.
Internamente se normaliza a `undefined` al pasarlo al DOM. Button mantiene su
contrato existente: sus objetos son opcionales y no están tipados para `null`.

Aplicar un objeto a un elemento no impide la herencia CSS: propiedades como
`color` y `fontFamily` pueden llegar a sus descendientes. Las variables de
Card también pueden afectar a sus secciones por herencia. Un nuevo ámbito de
ThemeProvider reinicia el contrato de tokens.

## 6. Procedimiento para refactorizar otro componente

### Paso 1: inventariar la API y elegir la estructura pública

Revisar implementación, tipos, CSS, pruebas, historias, documentación y usos.
Clasificar las props según contenido, comportamiento y apariencia.

Elegir el patrón de Button cuando las partes internas sean necesarias para una
interacción unificada y deban seguir encapsuladas. Elegir el patrón de Card
cuando la aplicación necesite componer, omitir o personalizar secciones de forma
independiente. Un componente puede combinar ambos patrones si cada prop tiene
un destino claro.

Antes de eliminar una prop, definir su reemplazo y localizar sus consumidores.
Conservar los estados funcionales y documentar los cambios que rompan
compatibilidad. Para los estilos de base, recuperar la apariencia actual; si
falta una definición, consultar y documentar una referencia de diseño. En Card
se utilizó Material para completar la distribución de secciones.

### Paso 2: organizar archivos, tipos e implementación

```text
ComponentName/
├── index.ts
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.styles.css
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
├── ComponentName.utils.ts          # opcional
└── ComponentSection/               # si existe una sección pública
    ├── ComponentSection.tsx
    ├── ComponentSection.types.ts
    ├── ComponentSection.styles.css
    ├── ComponentSection.test.tsx
    └── ComponentSection.stories.tsx
```

Cada sección exportada tiene sus propios archivos. Usar exports nombrados,
tipos separados, importaciones ES y las convenciones de
[AGENTS.md](./AGENTS.md). El default export se reserva para el meta de Storybook.

Ejemplo orientativo para un nuevo componente componible llamado Panel
(no forma parte de la API actual de Neus UI):

```ts
// Panel.types.ts
import type { ComponentPropsWithRef, CSSProperties } from "react";

export type PanelProps = Omit<ComponentPropsWithRef<"div">, "style"> & {
  style?: CSSProperties | null;
};
```

```tsx
// Panel.tsx
import "./Panel.styles.css";
import type { PanelProps } from "./Panel.types";

/** Contenedor con contenido libre y personalización por instancia. */
export const Panel = ({
  children,
  className,
  style = null,
  ...props
}: PanelProps) => (
  <div
    {...props}
    className={["panel", className].filter(Boolean).join(" ")}
    style={style ?? undefined}
  >
    {children}
  </div>
);
```

La extensión de atributos nativos debe ser deliberada. Omitir los que entren en
conflicto con la API elegida, como hace Card con sus props retiradas. Normalizar
las props propias antes de enviar atributos al DOM y conservar la referencia
del elemento correcto.

### Paso 3: extraer el contrato de tokens Neus

Separar las reglas estructurales de las decisiones visuales. Usar un prefijo
estable por componente o familia y tokens semánticos para colores y fuentes.

Ejemplo mínimo para Panel:

```css
/* src/design-systems/neus/panel.css */
:root,
[data-design-system] {
  --panel-background: var(--color-surface);
  --panel-color: var(--color-text-primary);
  --panel-radius: var(--radius-default);
  --panel-padding: 16px;
  --panel-border-width: 1px;
  --panel-border-color: var(--color-border-input);
}
```

```css
/* Panel.styles.css */
.panel {
  box-sizing: border-box;
  min-width: 0;
  padding: var(--panel-padding);
  border: var(--panel-border-width) solid var(--panel-border-color);
  border-radius: var(--panel-radius);
  background-color: var(--panel-background);
  color: var(--panel-color);
}
```

Definir en Neus todos los tokens de diseño consumidos por ese componente,
incluidos los estados y las secciones. Los tokens semánticos y las variables
derivadas por modificadores, como `--button-accent`, conservan su función
propia.

El selector `[data-design-system]` reinicia la base en cada ámbito. Definir
solamente `:root` permitiría que un tema anidado heredara radios, sombras o
bordes de la receta exterior. El ejemplo existente más completo es el
[contrato de Button](./src/design-systems/neus/button.css); la familia modular
está representada por el [contrato de Card](./src/design-systems/neus/card.css).

### Paso 4: agregar recetas e integrarlas

Cada receta modifica variables en el selector de su sistema:

```css
/* src/design-systems/material/panel.css */
[data-design-system="material"] {
  --panel-radius: 12px;
  --panel-background: var(--color-surface-secondary);
  --panel-border-width: 0px;
}
```

Los selectores del DOM permanecen en el CSS del componente. Las recetas pueden
usar tokens específicos del modo claro/oscuro cuando sea necesario; reutilizar
las superficies y colores semánticos permite seguir el modo activo.

Agregar los imports a
[design-systems.css](./src/design-systems/design-systems.css), conservando el
orden existente: variables generales y base Neus antes de las recetas
externas. Cargar la base Neus del nuevo componente antes de cualquiera de sus
overrides.

Actualizar `components` en
[registry.ts](./src/design-systems/registry.ts) para los sistemas realmente
adaptados. La familia Card se registra como `"Card"`; sus secciones comparten
la receta. Una receta ausente utiliza los valores Neus, y esa diferencia debe
quedar reflejada en la cobertura documentada.

Los seis IDs ya existen. Agregar un componente a esos sistemas no requiere
modificar `DesignSystemId`, ThemeProvider ni las paletas generales.

### Paso 5: concentrar los exports públicos

Cada familia agrupa sus componentes y tipos públicos en su `index.ts`.
Los índices actuales ilustran ambos casos:

```ts
// src/components/Button/index.ts
export { Button } from "./Button";
export type { ButtonProps, ButtonColor } from "./Button.types";
```

```ts
// Fragmento de src/components/Card/index.ts
export { Card } from "./Card";
export type { CardProps } from "./Card.types";
export { CardHeader } from "./CardHeader/CardHeader";
export type { CardHeaderProps } from "./CardHeader/CardHeader.types";
// El mismo patrón se aplica a CardMedia, CardContent y CardFooter.
```

El índice general queda reducido a una entrada por familia:

```ts
// Fragmento de src/components/index.ts
export * from "./Button";
export * from "./Card";
```

Exportar explícitamente la API destinada al consumidor. Los tipos de controles
de historias y las utilidades internas permanecen fuera de esos índices.
Dentro de una familia, las importaciones directas entre archivos ayudan a
evitar dependencias circulares.

Las aplicaciones continúan importando desde `"neus-ui"`. Estos índices
organizan el código fuente y no agregan subrutas de paquete como
`"neus-ui/Card"`; esas rutas requerirían cambios adicionales en
`package.json`.

### Paso 6: actualizar Storybook con el componente real

Mantener una sola historia nombrada por componente, `tags: ["autodocs"]` y
layout centrado, salvo que el componente necesite otro ancho. Una familia
componible tiene una historia por sección pública; su historia principal
muestra cómo combinarlas.

Definir los tipos de controles en el archivo `.types.ts`. El argumento de
previsualización `designSystem` se separa de las props antes de renderizar:

```ts
// Añadir a Panel.types.ts junto con PanelProps
import type { DesignSystemId } from "../../design-systems";

export type PanelStoryArgs = PanelProps & {
  designSystem: DesignSystemId;
};
```

```tsx
// Panel.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Panel as PanelComponent } from "./Panel";
import type { PanelStoryArgs } from "./Panel.types";

const meta: Meta<PanelStoryArgs> = {
  title: "Components/Panel",
  component: PanelComponent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "Sistema de diseño de la previsualización",
    },
    children: { control: "text", description: "Contenido del panel" },
    className: { control: "text", description: "Clases adicionales" },
    style: { control: "object", description: "Estilos de esta instancia" },
  },
};

export const Panel: StoryObj<typeof meta> = {
  args: {
    designSystem: "neus",
    children: "Contenido del panel",
    className: "",
    style: null,
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <PanelComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
```

El provider local hace que el selector de la historia sea independiente del
selector global de diseño, mientras hereda el modo claro/oscuro de la barra.
Las opciones se obtienen de `DESIGN_SYSTEMS` para mantener un solo registro.

Agregar valores iniciales y descripciones a las props propias. Usar controles
de objeto para estilos, texto para clases y `action` para callbacks. Cuando
children sea JSX complejo, documentarlo con `control: false` y proporcionar
una composición de ejemplo. Mostrar los atributos nativos relevantes en
componentes como CardMedia.

En historias con una prop llamada `component`, usar `StoryObj<typeof meta>`
como en CardMedia: evita que Storybook confunda el tipo de argumentos con su
propio formato de metadatos. El JSX de la historia siempre utiliza el
componente de la biblioteca y su CSS real.

### Paso 7: probar comportamiento, tipos y estilos calculados

| Nivel | Qué comprobar |
| --- | --- |
| Pruebas unitarias co-localizadas | Renderizado, defaults, interacción, estados, clases, overrides y reenvío de atributos |
| Composición | Secciones ausentes, children libres/vacíos, orden, secciones repetidas y acciones internas |
| Tipado | Exports públicos, props retiradas, atributos y refs compatibles; errores esperados con `@ts-expect-error` |
| Navegador | Seis diseños en claro/oscuro, estilos calculados, geometría, foco, cambio de tema y ámbitos anidados/hermanos |
| Storybook | Un solo ejemplo por componente, controles aplicados, aislamiento del diseño y composición responsive |
| Builds | Resolución de los índices, declaraciones TypeScript, CSS distribuido y catálogo estático |

JSDOM permite comprobar atributos y estilos en línea. La resolución de tokens,
la cascada, el layout y los resets de temas se verifican en Chromium mediante
el proyecto `design-systems`. Las aserciones de tipos requieren ejecutar
TypeScript además de Vitest.

Referencias existentes:

- [Button.test.tsx](./src/components/Button/Button.test.tsx).
- [Card.test.tsx](./src/components/Card/Card.test.tsx) y pruebas de sus secciones.
- [CardMedia.test.tsx](./src/components/Card/CardMedia/CardMedia.test.tsx).
- [Pruebas de diseños de Button](./src/design-systems/design-systems.browser.test.tsx).
- [Pruebas de diseños de Card](./src/design-systems/card.browser.test.tsx).

Durante la iteración, ejecutar las pruebas afectadas:

```bash
pnpm test:unit src/components/Button src/components/Card
pnpm exec tsc --project tsconfig.test.json --noEmit
pnpm exec tsc --project tsconfig.storybook.json --noEmit
```

Para cerrar el refactor:

```bash
pnpm lint
pnpm test:coverage
pnpm build
pnpm build-storybook
```

`pnpm test:coverage` ejecuta los proyectos configurados, incluidos unitarios,
navegador y Storybook. `pnpm test:design-systems` permite ejecutar solamente
las comprobaciones de diseños. Mantener al menos 70% de cobertura de líneas por
componente y cubrir los caminos de renderizado e interacción relevantes.
Revisar visualmente la composición y registrar cualquier fallo previo que
impida una validación global limpia.

### Paso 8: actualizar consumidores y documentación

Migrar usos internos, ejemplos y pruebas a la API nueva. Documentar props
retiradas, su reemplazo, cambios de selectores y responsabilidades de los
children. Añadir o actualizar las guías de componentes, el catálogo,
README, el índice de documentación y el inventario de AGENTS cuando corresponda.

El refactor queda completo cuando la API, los estilos, los exports, las
historias, las pruebas y la documentación describen el mismo comportamiento.

## Input: aplicación del patrón de partes internas

Input sigue el enfoque de Button y conserva sus siete tipos, `readonly`,
`disabled`, `required`, restricciones numéricas y modos controlado/no controlado.
`onChange` sigue recibiendo un string, también para números y valores vacíos.
No se retiraron props ni clases: `.input__wrapper` sigue integrándose con FormTemplate.

- `wrapperStyle`, `inputStyle`, `labelStyle`, `requiredStyle` y `errorStyle`
  son objetos `CSSProperties` opcionales, sin overrides predeterminados; cada
  objeto se aplica únicamente al elemento correspondiente.
- `id` y `aria-label` son opcionales. Un ID generado con `useId` vincula etiqueta
  y campo; `aria-describedby` vincula el error y `aria-invalid` expone su estado.
- El contrato completo `--input-*` vive en `src/design-systems/neus/input.css`.
  Las seis recetas se registran como `"Input"` y reinician sus valores por ámbito.
  El texto Neus usa `--color-control-text`, evitando selectores oscuros que
  atraviesen un provider claro anidado.
- Neus conserva su geometría y hace explícito el tamaño nativo de fuente de
  13.333333px; la familia de fuente sigue ahora `--font-body`. Las otras recetas
  son adaptaciones del proyecto con etiqueta externa, no reproducciones completas.
- `Input/index.ts` exporta componente y props. `InputStoryArgs` queda interno.
  La única historia sincroniza `value` mediante `useArgs` y permite explorar
  `defaultValue` cuando `value` es `undefined`; el selector de diseño es local.

Ver [la guía de Input](./docs/components/Input.md),
[el contrato Neus](./src/design-systems/neus/input.css) y
[las pruebas Chromium](./src/design-systems/input.browser.test.tsx).

## Sidebar: partes internas, decoración transparente y comportamiento responsive

Sidebar conserva `title`, `items` y sus callbacks, siguiendo el patrón de Button.
Su índice exporta componente, props, items y etiquetas accesibles. El avatar
del encabezado sustituye la inicial suelta y la flecha en tablet y actúa como
control de expansión. En mobile aparece en el panel abierto; desktop muestra
el título completo. `children` permite reemplazar ese contenido de marca con
JSX no interactivo y clases/estilos del consumidor, sin props específicas de logos. `className`
permite overrides reutilizables; nueve objetos `CSSProperties` opcionales se
aplican al root, encabezado, título, navegación, opciones, iconos, etiquetas,
control de apertura/expansión y cierre. No hay estilos inline predeterminados.

El contrato completo `--sidebar-*` y las seis recetas separan apariencia de
comportamiento. La curva cóncava de NEUS usa un pseudoelemento con máscara radial
transparente; comparte `--sidebar-background` con el cuerpo. La máscara no se
aplica al contenido. Así se conserva la silueta sobre colores, degradados e
imágenes sin simular el fondo de la página. Las recetas externas desactivan la
decoración cóncava y usan sus superficies, bordes y radios.

Los breakpoints son `<768`, `768–1023` y `≥1024`, sin solapamientos. Tablet
conserva la barra compacta y agrega foco y expansión fijada por botón. Mobile
usa hamburguesa flotante y un diálogo nativo dentro del ámbito del tema, con
foco inicial, cierre, restauración de foco y limpieza del bloqueo de scroll.
Cambiar de breakpoint reinicia los estados transitorios. React no consulta el
sistema de diseño; CSS suministra todos los valores visuales.

AppTemplate elimina su estado, hamburguesa y overlay propios y reserva espacio
con los mismos tokens y selectores de expansión. Al migrar un consumidor externo,
retirar controles móviles duplicados y adaptar selectores que exigían `div`:
las opciones ahora son botones semánticos. `active` sigue siendo responsabilidad
de la aplicación. Ver [Sidebar](./docs/components/Sidebar.md),
[contrato Neus](./src/design-systems/neus/sidebar.css) y
[pruebas Chromium](./src/design-systems/sidebar.browser.test.tsx).

## 7. Checklist para el siguiente componente

- [ ] Inventariar props y consumidores; definir qué se conserva y qué se migra.
- [ ] Elegir partes internas, subcomponentes públicos o una combinación explícita.
- [ ] Mantener comportamiento, semántica y accesibilidad adecuados.
- [ ] Separar implementación, tipos, CSS, pruebas e historia.
- [ ] Definir la personalización de cada elemento y sus valores predeterminados.
- [ ] Crear el contrato completo de tokens Neus y sus resets por ámbito.
- [ ] Agregar las recetas previstas, imports CSS y cobertura del registro.
- [ ] Centralizar la API pública en el índice de la familia.
- [ ] Incorporar una historia por componente con selector local de diseño.
- [ ] Verificar tipos, comportamiento, seis diseños, claro/oscuro y composición.
- [ ] Completar builds, cobertura y revisión visual.
- [ ] Actualizar documentación y guía de migración.

## Referencias del proyecto

- [Arquitectura de sistemas de diseño](./docs/design-systems.md).
- [Theming y ThemeProvider](./docs/theming.md).
- [Guía de Card y migración](./docs/components/Card.md).
- [Convenciones de desarrollo](./docs/development.md).
- [Pruebas y comprobación de tipos](./docs/testing.md).
- [Índice de documentación](./docs/README.md).
