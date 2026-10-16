# FormTemplate

Token-driven responsive layout for arbitrary fields and actions. The application
owns its form element, validation and submission.

| Prop | Type / default | Purpose |
| --- | --- | --- |
| `children` | `ReactNode`, required | Fields or other layout content |
| `submitLabel` | `string`, required | Default submit action label |
| `loading` | `boolean` | Disables and marks the default action busy |
| `actions` | `ReactNode` | Replaces the default action |
| `columns`, `tabletColumns`, `mobileColumns` | `number`; 2 / 2 / 1 | Desktop, tablet and mobile column counts |
| `gap` | CSS gap; recipe default | Numeric pixels or a CSS expression |
| `className`, `style` | `string`, `CSSProperties` | Root customization |
| `actionsStyle` | `CSSProperties` | Action region customization |

```tsx
<form onSubmit={handleSubmit}>
  <FormTemplate submitLabel="Save" columns={2} mobileColumns={1} gap={24}>
    <Input label="Name" name="name" required />
    <DateInput label="Birthday" name="birthday" />
  </FormTemplate>
</form>
```

Column counts are finite positive integers; invalid values use a safe default.
Use `--form-template-*` for recipe overrides.
