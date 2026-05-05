# Neus UI Component Catalog

Reference for all 25 components. All imports from `neus-ui`.

```tsx
import { ComponentName } from 'neus-ui';
```

---

## Actions

Row-level action buttons (info / edit / delete). Use inside DataTable cells or detail pages.

```tsx
import { Actions } from 'neus-ui';

<Actions
  onInfo={() => handleInfo(item)}
  onEdit={() => handleEdit(item)}
  onDelete={() => handleDelete(item)}
  infoLabel="Ver"        // optional, default "Info"
  editLabel="Editar"     // optional, default "Edit"
  deleteLabel="Eliminar" // optional, default "Delete"
/>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| onInfo | `() => void` | — |
| onEdit | `() => void` | — |
| onDelete | `() => void` | — |
| infoLabel | `string` | `"Info"` |
| editLabel | `string` | `"Edit"` |
| deleteLabel | `string` | `"Delete"` |

---

## Button

Primary interactive element. Covers all CTA, form submit, and action use cases.

```tsx
import { Button } from 'neus-ui';

<Button
  label="Guardar"
  variant="solid"        // 'solid' | 'outlined' | 'text'
  color="primary"        // 'primary' | 'success' | 'error' | 'info'
  type="submit"          // 'button' | 'submit' | 'reset'
  fullWidth={false}
  loading={false}
  disabled={false}
  onClick={() => {}}
/>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| label | `string` | required |
| variant | `'solid' \| 'outlined' \| 'text'` | `'solid'` |
| color | `'primary' \| 'success' \| 'error' \| 'info'` | `'primary'` |
| type | `'button' \| 'submit' \| 'reset'` | `'button'` |
| fullWidth | `boolean` | `false` |
| loading | `boolean` | `false` |
| disabled | `boolean` | `false` |
| onClick | `(e?) => void` | — |

---

## Calendar

Date picker with single, range, and multiple selection modes.

```tsx
import { Calendar } from 'neus-ui';

<Calendar
  mode="single"
  selected={date}
  required
  value={date}
  label="Fecha"
  onChange={(value) => setDate(value as Date)}
/>
```

---

## Card

Content container with optional avatar, leading/trailing slots, and color variants.

```tsx
import { Card } from 'neus-ui';

<Card
  color="blue"              // 'purple'|'pink'|'red'|'yellow'|'blue'|'green'
  fill={false}              // fills background with color
  avatarImage="/avatar.jpg"
  avatarAlt="User"
  leading={<SomeIcon />}
  trailing={<Button label="Action" />}
>
  Card content here
</Card>
```

**Props:**
| Prop | Type | Default |
|------|------|---------|
| children | `ReactNode` | — |
| color | `'purple'\|'pink'\|'red'\|'yellow'\|'blue'\|'green'` | — |
| fill | `boolean` | `false` |
| avatarImage | `string` | — |
| avatarAlt | `string` | — |
| leading | `ReactNode` | — |
| trailing | `ReactNode` | — |

**Note:** `color` is a decorative palette (not semantic). For KPI cards use `fill={true}` with a color for visual distinction.

---

## Checkbox

```tsx
import { Checkbox } from 'neus-ui';

<Checkbox
  name="terms"
  checked={checked}
  disabled={false}
  onChange={(checked) => setChecked(checked)}
/>
```

---

## Clock

Time picker (hours/minutes visual wheel).

```tsx
import { Clock } from 'neus-ui';

<Clock
  value={{ hours: 14, minutes: 30 }}
  format="24h"
  onChange={(time) => setTime(time)}
/>
```

---

## DataTable

Full-featured table with sorting, pagination, and optional card layout. Receives data as prop — never hardcode rows.

```tsx
import { DataTable } from 'neus-ui';

<DataTable
  data={items}                    // T[] — from API prop
  pagination={{
    current_page: 1,
    last_page: 5,
    per_page: 10,
    total: 48,
  }}
  columnLabels={{
    name: 'Nombre',
    price: 'Precio',
    status: 'Estado',
  }}
  hiddenColumns={['id', 'created_at']}
  useCardLayout={false}
  noDataTitle="Sin resultados"
  noDataDescription="No hay datos para mostrar"
  onEdit={(row) => handleEdit(row)}
  onDelete={(row) => handleDelete(row)}
  onInfo={(row) => handleInfo(row)}
  onPaginationChange={({ currentPage, pageSize }) => fetchPage(currentPage, pageSize)}
/>
```

**Props:**
| Prop | Type | Notes |
|------|------|-------|
| data | `T[]` | required — never hardcode |
| pagination | `PaginationInfo` | required |
| columnLabels | `Record<string, string>` | optional label map |
| hiddenColumns | `string[]` | columns to hide |
| useCardLayout | `boolean` | card grid instead of table |
| onEdit | `(row: T) => void` | optional |
| onDelete | `(row: T) => void` | optional |
| onInfo | `(row: T) => void` | optional |
| onPaginationChange | `(params) => void` | optional |

---

## DateInput

Date input field (text + calendar popup).

```tsx
import { DateInput } from 'neus-ui';

<DateInput
  name="birthDate"
  label="Fecha de nacimiento"
  placeholder="dd/mm/yyyy"
  mode="single"              // 'single' | 'range'
  required
  error={errors.birthDate}
  onChange={(value) => setValue('birthDate', value)}
/>
```

---

## Dropdown

Icon/button that opens a dropdown menu of actions.

```tsx
import { Dropdown } from 'neus-ui';
import { MoreVertical } from 'lucide-react';

<Dropdown
  icon={MoreVertical}
  name="Opciones"
  items={[
    { label: 'Editar', onClick: () => handleEdit() },
    { label: 'Eliminar', onClick: () => handleDelete() },
  ]}
/>
```

---

## FileUploader

Drag-and-drop file upload area.

```tsx
import { FileUploader, FileType } from 'neus-ui';

<FileUploader
  allowedTypes={[FileType.IMAGE, FileType.PDF]}
  maxWeight={5}              // MB
  multiple={false}
  placeholder="Arrastra o selecciona un archivo"
  disabled={false}
  onChange={(data, error) => {
    if (error) console.error(error.message);
    else handleFiles(data?.files);
  }}
/>
```

**FileType enum values:** IMAGE, JPG, PNG, SVG, GIF, WEBP, PDF, DOC, XLS, TXT, ZIP, RAR, VIDEO, AUDIO, CSV, JSON

**Note:** `onChange` is required. When data comes from server, pass handler as prop.

---

## IconButton

Icon-only button variant.

```tsx
import { IconButton } from 'neus-ui';
import { Trash2 } from 'lucide-react';

<IconButton
  icon={Trash2}
  variant="outlined"   // 'solid' | 'outlined' | 'text'
  color="error"
  size="medium"        // 'small' | 'medium' | 'large'
  onClick={() => handleDelete()}
/>
```

---

## Input

Text input with label, error, and type variants.

```tsx
import { Input } from 'neus-ui';

<Input
  name="email"
  label="Correo electrónico"
  placeholder="usuario@ejemplo.com"
  type="email"         // 'text'|'password'|'email'|'number'|'color'|'tel'|'url'
  value={value}        // controlled
  // defaultValue={} // uncontrolled
  required
  error={errors.email}
  disabled={false}
  readonly={false}
  onChange={(value) => setValue('email', value)}
/>
```

---

## InteractiveMap

Google Maps integration with address search and coordinate selection.

```tsx
import { InteractiveMap } from 'neus-ui';

<InteractiveMap
  googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
  initialCoordinates={item?.coordinates}  // from prop
  initialAddress={item?.address}          // from prop
  searchBoxPlaceholder="Buscar dirección..."
  instructionsText="Haz clic en el mapa para seleccionar"
  readonly={false}
  onLocationSelect={(location) => {
    // location: { address, country, state, city, coordinates }
    setValue('location', location);
  }}
/>
```

---

## Link

Styled navigation link.

```tsx
import { Link } from 'neus-ui';

<Link
  label="Volver al listado"
  type="primary"       // 'primary' | 'secondary'
  href="/products"
/>
```

---

## Menu

Button that opens a dropdown menu (similar to Dropdown but with text label support).

```tsx
import { Menu } from 'neus-ui';
import { Settings } from 'lucide-react';

<Menu
  icon={Settings}
  text="Acciones"
  size="medium"        // 'small' | 'medium' | 'large'
  items={[
    { label: 'Configurar', onClick: () => {} },
    { label: 'Exportar', onClick: () => {} },
  ]}
/>
```

---

## Modal

Confirmation dialog with title, content, and action buttons.

```tsx
import { Modal } from 'neus-ui';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  title="¿Eliminar registro?"
  confirmText="Eliminar"
  cancelText="Cancelar"
  confirmButtonColor="error"   // 'primary'|'success'|'error'|'info'
  onConfirm={() => { handleDelete(); setIsOpen(false); }}
  onCancel={() => setIsOpen(false)}
>
  Esta acción no se puede deshacer.
</Modal>
```

---

## MultiSelect

Multiple-option selection with search bar.

```tsx
import { MultiSelect } from 'neus-ui';

// options come from props — never hardcode in component body
<MultiSelect
  name="categories"
  options={categoryOptions}    // SelectOption[] from prop
  label="Categorías"
  placeholder="Seleccionar categorías..."
  value={selected}
  viewSearchBar
  searchBarPlaceholder="Buscar..."
  error={errors.categories}
  onChange={(values) => setSelected(values)}
/>
```

**SelectOption type:** `{ value?: string | null; label: string }`

---

## Select

Single-option dropdown with search.

```tsx
import { Select } from 'neus-ui';

<Select
  name="status"
  options={statusOptions}      // SelectOption[] — from prop if backend-driven
  label="Estado"
  placeholder="Seleccionar..."
  value={selectedValue}
  viewSearchBar
  error={errors.status}
  onChange={(value) => setStatus(value)}
/>
```

---

## Sidebar

Navigation panel. Usually consumed via AppTemplate — use directly only for custom layouts.

```tsx
import { Sidebar } from 'neus-ui';
import { Home, Users, Package } from 'lucide-react';

<Sidebar
  title="Mi App"
  items={[
    { label: 'Dashboard', icon: Home, onClick: () => navigate('/'), active: true },
    { label: 'Usuarios', icon: Users, onClick: () => navigate('/users'), visible: true },
    { label: 'Productos', icon: Package, onClick: () => navigate('/products') },
  ]}
/>
```

**SidebarItem type:**
```tsx
type SidebarItem = {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;   // controls visibility (permission gates)
};
```

---

## TimeInput

Time input field (text + clock popup).

```tsx
import { TimeInput } from 'neus-ui';

<TimeInput
  name="startTime"
  label="Hora de inicio"
  format="24h"         // '12h' | '24h'
  value={timeValue}
  error={errors.startTime}
  onChange={(value) => setTime(value)}
/>
```

---

## WeekCalendar

Weekly calendar view with event rows.

```tsx
import { WeekCalendar } from 'neus-ui';

<WeekCalendar
  events={events}
  onEventClick={(event) => handleEventClick(event)}
/>
```

---

## WeekCalendarRow

Single event row with hover tooltip and click handler.

```tsx
import { WeekCalendarRow } from 'neus-ui';

<WeekCalendarRow
  event={event}
  onClick={(event) => handleClick(event)}
/>
```

---

## AppTemplate (Template)

Full app shell: sidebar + responsive header + content area.

```tsx
import { AppTemplate } from 'neus-ui';
import { Home, Users } from 'lucide-react';

<AppTemplate
  routes={[
    { label: 'Dashboard', icon: Home, onClick: () => navigate('/'), active: true },
    { label: 'Usuarios', icon: Users, onClick: () => navigate('/users') },
  ]}
  menu={<UserMenu />}   // optional top-right content
>
  {/* page content */}
</AppTemplate>
```

**Layout behavior:**
- Desktop (1024px+): Fixed 250px sidebar, content with margin-left: 250px
- Tablet (769-1024px): Hover expands sidebar to 250px
- Mobile (≤768px): Hidden sidebar, toggle button shows overlay

**Note:** Use ONLY for app/dashboard pages. Never in landing/marketing pages.

---

## FormTemplate (Template)

Two-column form grid with submit button.

```tsx
import { FormTemplate } from 'neus-ui';

<FormTemplate
  submitLabel="Guardar"
  loading={isLoading}
>
  <Input name="name" label="Nombre" />
  <Input name="email" label="Email" type="email" />
  <Select name="role" label="Rol" options={roleOptions} />
  {/* Fields auto-flow into 2-column grid */}
</FormTemplate>
```

**Note:** Full-width elements (FileUploader, InteractiveMap) break into single column automatically.

---

## Pending Components

These features are not covered by current Neus UI components. When a skill requires them, implement with CSS and document here.

| Component | Priority | Skills affected | Workaround |
|-----------|----------|-----------------|------------|
| **Toast/Notification** | Alta | page-list, page-form, page-detail | Fixed-position div + animation |
| **Badge/Tag** | Alta | page-list, page-dashboard | `<span>` with pill CSS |
| **Tabs** | Alta | page-settings, page-detail | Button group + active state |
| **Accordion/FAQ** | Alta | landing-pricing, page-settings | `<details>`/`<summary>` HTML |
| **NavigationBar** | Alta | landing-saas, landing-pricing, page-blog | Sticky div + flex nav |
| **FeatureTile** | Media | landing-saas, landing-generic | Card with `leading` icon slot |
| **TestimonialCard** | Media | landing-saas, landing-generic | Card with avatar + blockquote |
| **PricingCard** | Media | landing-pricing | Card with structured content |
| **Stepper** | Media | flow-onboarding, flow-wizard | Numbered circles + connector |
| **Breadcrumb** | Baja | page-detail, page-form | `<nav>` + `<ol>` |
| **Skeleton** | Baja | todas | Shimmer div animation |
| **EmptyState** | Baja | page-list, page-dashboard | Icon + text + CTA div |
| **Alert/Banner** | Baja | page-form, page-settings | Colored div with icon |
