# FileUploader

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

File selection and drag/drop with size and type validation.

## Usage

```tsx
import { ThemeProvider, FileUploader, FileType } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <FileUploader allowedTypes={[FileType.PNG, FileType.JPG]} onChange={(data, error) => console.log(data, error)} />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

`allowedTypes` is required and uses the exported FileType enum. `maxWeight` defaults to 10
MiB. Validation checks combined file size first, then count, then allowed type. maxWeight
limits the total bytes across the selection. `onChange` receives FileUploadData (`files`,
`totalSize`) on success, or null and a FileUploadError (`type`, `message`) on validation
failure. Clearing emits null. Error display is consumer-owned through `error`; callback
errors are not automatically displayed.

Single image selection creates a preview; other selections show file metadata. The empty
drop area is a label associated with the native file input; after selection it becomes a
div. `disabled` prevents picking and dropping. The forwarded ref targets the file input. A
composed public Button clears the selection; style its existing classes or tokens rather
than adding deep button props.

## Props

The component selects and validates files locally. The application owns transmitting or
persisting them. An invalid selection reports an error without replacing the previous valid
selection.

See [the type source](../../src/components/FileUploader/FileUploader.types.ts) and
[implementation](../../src/components/FileUploader/FileUploader.tsx) for the exact contract.
All customization props are optional and default to undefined unless noted; section style
props retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `uploadHintValueClassName` | `string` | Omitted | Additional classes on `.file-uploader__upload-hint-value` |
| `uploadHintValueStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__upload-hint-value` |
| `areaClassName` | `string` | Omitted | Additional classes on `.file-uploader__area` |
| `className` | `string` | Omitted | Additional classes on `.file-uploader` |
| `contentClassName` | `string` | Omitted | Additional classes on `.file-uploader__content` |
| `contentStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__content` |
| `detailsClassName` | `string` | Omitted | Additional classes on `.file-uploader__details` |
| `detailsStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__details` |
| `errorClassName` | `string` | Omitted | Additional classes on `.file-uploader__error-message` |
| `fileCountClassName` | `string` | Omitted | Additional classes on `.file-uploader__file-count` |
| `fileCountStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__file-count` |
| `fileInfoClassName` | `string` | Omitted | Additional classes on `.file-uploader__file-info` |
| `fileInfoStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__file-info` |
| `fileNameClassName` | `string` | Omitted | Additional classes on `.file-uploader__file-name` |
| `fileNameStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__file-name` |
| `fileSizeClassName` | `string` | Omitted | Additional classes on `.file-uploader__file-size` |
| `fileSizeStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__file-size` |
| `iconClassName` | `string` | Omitted | Additional classes on `.file-uploader__icon` |
| `iconContainerClassName` | `string` | Omitted | Additional classes on `.file-uploader__icon-container` |
| `iconContainerStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__icon-container` |
| `iconStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__icon` |
| `inputClassName` | `string` | Omitted | Additional classes on `.file-uploader__input` |
| `inputStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__input` |
| `previewClassName` | `string` | Omitted | Additional classes on `.file-uploader__preview` |
| `previewImageClassName` | `string` | Omitted | Additional classes on `.file-uploader__preview-image` |
| `previewImageStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__preview-image` |
| `previewStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__preview` |
| `selectedClassName` | `string` | Omitted | Additional classes on `.file-uploader__selected` |
| `selectedStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__selected` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.file-uploader` |
| `totalSizeClassName` | `string` | Omitted | Additional classes on `.file-uploader__total-size` |
| `totalSizeStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__total-size` |
| `uploadHintClassName` | `string` | Omitted | Additional classes on `.file-uploader__upload-hint` |
| `uploadHintStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__upload-hint` |
| `uploadIconClassName` | `string` | Omitted | Additional classes on `.file-uploader__upload-icon` |
| `uploadIconStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__upload-icon` |
| `uploadTextClassName` | `string` | Omitted | Additional classes on `.file-uploader__upload-text` |
| `uploadTextStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__upload-text` |
| `allowedTypes` | `FileType[]` | Required | Accepted file types |
| `maxWeight` | `number` | `10 * 1024 * 1024` | Maximum total size in bytes |
| `multiple` | `boolean` | `false` | Allows several files |
| `error` | `string` | Omitted | Error message linked to the input |
| `placeholder` | `string` | `"Click to upload or drag and drop files here"` | Main text of the drop area |
| `deleteFilesText` | `string` | `"Delete files"` | Label of the clear action |
| `disabled` | `boolean` | `false` | Disables selection and dropping |
| `name` | `string` | Omitted | Name of the native file input |
| `label` | `string` | `"Upload files"` | Accessible name of the file input |
| `areaStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__area` |
| `errorStyle` | `CSSProperties` | Omitted | Inline styles on `.file-uploader__error-message` |
| `onChange` | `(data: FileUploadData \| null, error?: FileUploadError) => void` | Required | Called with the files or a validation error |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/FileUploader/index.ts). A type shown here is not
necessarily a package export.

```ts
enum FileType {
  IMAGE = "image/*",
  JPG = ".jpg,.jpeg",
  PNG = ".png",
  SVG = ".svg",
  GIF = ".gif",
  WEBP = ".webp",
  PDF = ".pdf",
  DOC = ".doc,.docx",
  XLS = ".xls,.xlsx",
  TXT = ".txt",
  ZIP = ".zip",
  RAR = ".rar",
  VIDEO = "video/*",
  AUDIO = "audio/*",
  CSV = ".csv",
  JSON = ".json",
}

type FileUploadError = {
  type: "size" | "type" | "count";
  message: string;
};

type FileUploadData = {
  files: File[];
  totalSize: number;
};
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.file-uploader__content` | `div` | `contentClassName` | `contentStyle` | `Always` |
| `.file-uploader__upload-icon` | `CloudUpload` | `uploadIconClassName` | `uploadIconStyle` | `Always` |
| `.file-uploader__upload-text` | `p` | `uploadTextClassName` | `uploadTextStyle` | `Always` |
| `.file-uploader__upload-hint` | `p` | `uploadHintClassName` | `uploadHintStyle` | `Always` |
| `.file-uploader__upload-hint-value` | `span` | `uploadHintValueClassName` | `uploadHintValueStyle` | `Always` |
| `.file-uploader__preview` | `div` | `previewClassName` | `previewStyle` | `Always` |
| `.file-uploader__preview-image` | `img` | `previewImageClassName` | `previewImageStyle` | `Always` |
| `.file-uploader__file-info` | `div` | `fileInfoClassName` | `fileInfoStyle` | `Always` |
| `.file-uploader__file-name` | `p` | `fileNameClassName` | `fileNameStyle` | `Always` |
| `.file-uploader__file-size` | `p` | `fileSizeClassName` | `fileSizeStyle` | `Always` |
| `.file-uploader__selected` | `div` | `selectedClassName` | `selectedStyle` | `Always` |
| `.file-uploader__icon-container` | `div` | `iconContainerClassName` | `iconContainerStyle` | `Always` |
| `.file-uploader__icon` | `Image` | `iconClassName` | `iconStyle` | `isImageFile(selectedFiles[0])` |
| `.file-uploader__details` | `div` | `detailsClassName` | `detailsStyle` | `Always` |
| `.file-uploader__file-count` | `p` | `fileCountClassName` | `fileCountStyle` | `multiple` |
| `.file-uploader__total-size` | `p` | `totalSizeClassName` | `totalSizeStyle` | `multiple` |
| `.file-uploader` | `div` | `className` | `style` | `Always` |
| `.file-uploader__input` | `input` | `inputClassName` | `inputStyle` | `Always` |
| `.file-uploader__area` | `Area` | `areaClassName` | `areaStyle` | `Always` |
| `.file-uploader__error-message` | `div` | `errorClassName` | `errorStyle` | `error` |

State/variant selectors: `.file-uploader__area--disabled`,
`.file-uploader__area--drag-active`, `.file-uploader__area--error`,
`.file-uploader__area--has-files`.

Use the [stylesheet](../../src/components/FileUploader/FileUploader.styles.css) for
pseudo-elements and state selectors. For shared field/listbox parts, also inspect the shared
styles linked from the implementation. Consumer content and third-party generated internals
retain their own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<FileUploader contentClassName="example-file-uploader" contentStyle={{ outlineOffset: 4 }} allowedTypes={[FileType.PNG, FileType.JPG]} onChange={(data, error) => console.log(data, error)} />
```

```css
.example-file-uploader {
  outline-offset: 4px;
}
.example-file-uploader:focus-visible {
  outline: 2px solid var(--color-focus);
}
```

Style props win over ordinary stylesheet declarations for the same property. Use a
stylesheet for hover, focus, disabled states and pseudo-elements. Custom properties still
follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [file-uploader baseline recipe](../../src/design-systems/neus/generated/recipes/file-uploader.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--file-uploader-background` | file uploader background | `var(--color-surface)` |
| `--file-uploader-badge-background` | file uploader badge background | `var(--color-primary-light)` |
| `--file-uploader-badge-border-width` | file uploader badge border width | `0px` |
| `--file-uploader-badge-color` | file uploader badge color | `var(--color-primary-text)` |
| `--file-uploader-border-color` | file uploader border color | `var(--color-border-input-hover)` |
| `--file-uploader-border-style` | file uploader border style | `dashed` |
| `--file-uploader-border-width` | file uploader border width | `2px` |
| `--file-uploader-color` | file uploader color | `var(--color-text-primary)` |
| `--file-uploader-drag-background` | file uploader drag background | `var(--color-primary-light)` |
| `--file-uploader-drag-border-color` | file uploader drag border color | `var(--color-primary)` |
| `--file-uploader-hint-color` | file uploader hint color | `var(--color-text-secondary)` |
| `--file-uploader-shadow` | file uploader shadow | `none` |
| `--file-uploader-success-border-color` | file uploader success border color | `var(--color-success)` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--file-uploader-badge-radius` | file uploader badge radius | `50%` |
| `--file-uploader-badge-size` | file uploader badge size | `60px` |
| `--file-uploader-drag-transform` | file uploader drag transform | `scale(1.02)` |
| `--file-uploader-gap` | file uploader gap | `8px` |
| `--file-uploader-hint-size` | file uploader hint size | `var(--fs-base)` |
| `--file-uploader-icon-size` | file uploader icon size | `48px` |
| `--file-uploader-media-radius` | file uploader media radius | `var(--radius-sm)` |
| `--file-uploader-min-height` | file uploader min height | `200px` |
| `--file-uploader-padding` | file uploader padding | `16px` |
| `--file-uploader-radius` | file uploader radius | `var(--radius-default)` |
| `--file-uploader-title-size` | file uploader title size | `var(--fs-md)` |
| `--file-uploader-transition` | file uploader transition | `border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--file-uploader-disabled-background` | file uploader disabled background | `var(--color-surface-disabled)` |
| `--file-uploader-disabled-border-color` | file uploader disabled border color | `var(--color-border-subtle)` |
| `--file-uploader-disabled-color` | file uploader disabled color | `var(--color-text-disabled)` |
| `--file-uploader-error-area-background` | file uploader error area background | `var(--file-uploader-error-background)` |
| `--file-uploader-error-background` | file uploader error background | `var(--color-error-light)` |
| `--file-uploader-error-border-width` | file uploader error border width | `1px` |
| `--file-uploader-error-color` | file uploader error color | `var(--color-error)` |
| `--file-uploader-error-padding` | file uploader error padding | `8px 16px` |
| `--file-uploader-error-radius` | file uploader error radius | `var(--radius-sm)` |
| `--file-uploader-error-text-color` | file uploader error text color | `color-mix(in srgb, var(--color-error) 65%, var(--color-text-primary))` |
| `--file-uploader-focus-color` | file uploader focus color | `var(--color-focus)` |
| `--file-uploader-hover-background` | file uploader hover background | `var(--color-surface-hover)` |
| `--file-uploader-hover-border-color` | file uploader hover border color | `var(--color-primary)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--file-uploader-font-family` | file uploader font family | `var(--font-body)` |
| `--file-uploader-title-weight` | file uploader title weight | `600` |

### Scoped recipe override

Wrap the usage example in a local provider with a class:

```tsx
<ThemeProvider scope="local" designSystem="vercel" className="example-scope">
  {/* Place the component usage here. */}
</ThemeProvider>
```

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --file-uploader-badge-radius: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

Related composition: [Button](./Button.md).

The single FileUploader story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
