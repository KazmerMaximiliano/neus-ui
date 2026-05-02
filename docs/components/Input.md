# Input

Flexible text input field that supports multiple types and validation.

## Props

| Property       | Type                                                                       | Required | Description                    |
| -------------- | -------------------------------------------------------------------------- | -------- | ------------------------------ |
| `name`         | `string`                                                                   | ❌       | Name attribute                 |
| `value`        | `string \| number`                                                         | ❌       | Current input value            |
| `defaultValue` | `string \| number`                                                         | ❌       | Default value (uncontrolled)   |
| `placeholder`  | `string`                                                                   | ❌       | Placeholder text               |
| `label`        | `string`                                                                   | ❌       | Input label                    |
| `error`        | `string`                                                                   | ❌       | Error message to display       |
| `disabled`     | `boolean`                                                                  | ❌       | Disables the input             |
| `readonly`     | `boolean`                                                                  | ❌       | Makes input read-only          |
| `required`     | `boolean`                                                                  | ❌       | Marks input as required        |
| `type`         | `'text' \| 'password' \| 'email' \| 'number' \| 'color' \| 'tel' \| 'url'` | ❌       | Input type (default: `'text'`) |
| `min`          | `string \| number`                                                         | ❌       | Minimum value (for numbers)    |
| `max`          | `string \| number`                                                         | ❌       | Maximum value (for numbers)    |
| `step`         | `string \| number`                                                         | ❌       | Step increment for numbers     |
| `onChange`     | `(value: string) => void`                                                  | ❌       | Callback on value change       |


## Live Demo

<ClientOnly>
  <InputDemo />
</ClientOnly>

## Usage Example

```tsx
import { Input } from "@neus-ui/components";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form>
      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={setEmail}
        error={errors.email}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        required
      />

      <Input
        label="Age"
        type="number"
        min="18"
        max="120"
        onChange={(value) => console.log(value)}
      />
    </form>
  );
}
```
