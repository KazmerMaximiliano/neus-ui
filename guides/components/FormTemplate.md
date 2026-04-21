# FormTemplate

Form layout template with a built-in submit button and loading state support.

## Props

| Property      | Type              | Required | Description                              |
| ------------- | ----------------- | -------- | ---------------------------------------- |
| `children`    | `React.ReactNode` | ✅       | Form fields content                      |
| `submitLabel` | `string`          | ✅       | Label text for the submit button         |
| `loading`     | `boolean`         | ❌       | Shows a loading state on the submit button|

## Usage Example

```tsx
import { FormTemplate } from "@neus-ui/templates";
import { Input } from "@neus-ui/components";
import { useState } from "react";

export function CreateUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await saveUser({ name, email });
    setLoading(false);
  };

  return (
    <FormTemplate submitLabel="Create User" loading={loading}>
      <Input label="Name" value={name} onChange={setName} required />
      <Input label="Email" type="email" value={email} onChange={setEmail} required />
    </FormTemplate>
  );
}
```
