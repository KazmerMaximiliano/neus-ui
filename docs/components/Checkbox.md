# Checkbox

Checkbox component with support for controlled and uncontrolled states.

## Props

| Property   | Type                         | Required | Description              |
| ---------- | ---------------------------- | -------- | ------------------------ |
| `name`     | `string`                     | ❌       | Name attribute           |
| `checked`  | `boolean`                    | ❌       | Checkbox state           |
| `disabled` | `boolean`                    | ❌       | Disables the checkbox    |
| `onChange` | `(checked: boolean) => void` | ❌       | Callback on state change |


## Live Demo

<ClientOnly>
  <CheckboxDemo />
</ClientOnly>

## Usage Example

```tsx
import { Checkbox } from "@neus-ui/components";
import { useState } from "react";

export function SubscriptionForm() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div>
      <Checkbox
        name="acceptTerms"
        checked={acceptTerms}
        onChange={setAcceptTerms}
      />
      <label>Accept terms and conditions</label>

      <Checkbox
        name="newsletter"
        checked={newsletter}
        onChange={setNewsletter}
      />
      <label>I want to receive news by email</label>

      <Checkbox name="disabledOption" disabled={true} />
      <label>Disabled option</label>
    </div>
  );
}
```
