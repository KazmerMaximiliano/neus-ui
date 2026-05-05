# Form Patterns — Neus Page Form

## FormTemplate Layout

FormTemplate renders children in a 2-column grid automatically. Fields flow left-to-right, top-to-bottom. Full-width elements (FileUploader, InteractiveMap) break to single column.

```tsx
<FormTemplate submitLabel="Save" loading={loading}>
  <Input name="name" label="Name" required />             {/* col 1 */}
  <Input name="email" label="Email" type="email" />       {/* col 2 */}
  <Select name="role" label="Role" options={roleOpts} />  {/* col 1 */}
  <Input name="phone" label="Phone" type="tel" />         {/* col 2 */}
  <FileUploader ... />   {/* full width — breaks grid */}
  <InteractiveMap ... /> {/* full width */}
</FormTemplate>
```

## Field Patterns by Input Type

### text / email / password / number / tel / url
```tsx
<Input
  name="fieldName"
  label="Label"
  type="email"           // or text, password, number, tel, url
  placeholder="..."
  required               // if required
  defaultValue={defaultValues?.fieldName}
  error={errors?.fieldName}
  onChange={(value) => handleChange('fieldName', value)}
/>
```

### select (single, with backend options)
```tsx
<Select
  name="categoryId"
  label="Category"
  options={categoryOptions}    // prop: SelectOption[] — never hardcode
  placeholder="Select..."
  defaultValue={defaultValues?.categoryId}
  error={errors?.categoryId}
  viewSearchBar
  onChange={(value) => handleChange('categoryId', value)}
/>
```

### multiselect (multiple, with backend options)
```tsx
<MultiSelect
  name="tags"
  label="Tags"
  options={tagOptions}         // prop: SelectOption[] — never hardcode
  placeholder="Select..."
  defaultValue={defaultValues?.tags}
  error={errors?.tags}
  viewSearchBar
  onChange={(values) => handleChange('tags', values)}
/>
```

### date
```tsx
<DateInput
  name="birthDate"
  label="Date of birth"
  mode="single"          // 'single' | 'range'
  required
  defaultValue={defaultValues?.birthDate}
  error={errors?.birthDate}
  onChange={(value) => handleChange('birthDate', value)}
/>
```

### time
```tsx
<TimeInput
  name="startTime"
  label="Start time"
  format="24h"
  defaultValue={defaultValues?.startTime}
  error={errors?.startTime}
  onChange={(value) => handleChange('startTime', value)}
/>
```

### file (image/document upload)
```tsx
<FileUploader
  allowedTypes={[FileType.IMAGE]}   // or [FileType.PDF, FileType.DOC]
  maxWeight={5}                      // MB
  multiple={false}
  placeholder="Drag or select an image"
  onChange={(data, error) => onFileChange?.(data, error)}
/>
```
**Note:** `onChange` must be a prop passed from parent — never handle file upload internally.

### map (location with Google Maps)
```tsx
<InteractiveMap
  googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
  initialCoordinates={defaultValues?.coordinates}
  initialAddress={defaultValues?.address}
  searchBoxPlaceholder="Search address..."
  onLocationSelect={(location) => onLocationSelect?.(location)}
/>
```
**Note:** API key must come from env var, not hardcoded.

### checkbox
```tsx
<Checkbox
  name="acceptTerms"
  checked={values?.acceptTerms ?? false}
  onChange={(checked) => handleChange('acceptTerms', checked)}
/>
```

## Backend-Driven Options Pattern

When Select/MultiSelect options come from a backend API, receive them as props:

```tsx
// Component signature
type EntityFormProps = {
  categoryOptions: SelectOption[];    // from API, passed by parent
  statusOptions: SelectOption[];      // from API, passed by parent
  // ...
};

// SelectOption type
type SelectOption = {
  value?: string | null;
  label: string;
};
```

The parent fetches options from API and passes them down. The form component is dumb — it only renders.

## Edit Mode Pattern

For edit forms, receive existing entity data as `defaultValues`:

```tsx
type EntityFormProps = {
  defaultValues?: Partial<Entity>;
  // ...
};

// Wire to inputs:
<Input
  name="name"
  defaultValue={defaultValues?.name}
  // ...
/>
```

## Two-Column Override

To force a field to take full width (outside of FileUploader/InteractiveMap):
```css
.entity-form .full-width {
  grid-column: 1 / -1;
}
```
```tsx
<div className="full-width">
  <Input name="description" label="Description" />
</div>
```
