---
name: neus-page-auth
description: |
  Generates a centered authentication page (login, register, or password reset) using Neus UI.
  Produces a .tsx file with Input fields, Button, and Link. NO AppTemplate — centered layout.
  Use whenever the user asks for: "login", "registro", "sign in", "sign up", "auth page",
  "página de autenticación", "iniciar sesión", "crear cuenta", "recover password",
  "forgot password", "reset password". Always use for any authentication view.
od:
  mode: prototype
  platform: web
  scenario: design
  design_system:
    requires: true
  inputs:
    - name: auth_type
      type: string
      required: true
      description: "Auth type: login, register, or reset-password"
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Login page for my inventory management app"
---

# Neus Page Auth

Generates a centered authentication page (no sidebar, no AppTemplate).

**IMPORTANT**: No AppTemplate. Centered layout, public page.

## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Input, Button, Link sections
- `.agents/skills/_shared/design-personality.md` — apply VISUAL DIRECTIVE; use fade-up on `.auth__card`, H1 at `1.5rem weight-700` centered, section background from palette
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates

## Phase 0 — Collect Data

Ask the user these questions and wait for their complete reply before generating:

---

**Type** — What type of authentication page do you need?
- Login (recommended) — email + password + sign in button
- Register — name + email + password + confirmation
- Reset password — email only + reset button
- Login + Register (tabs) — both forms with toggle between them

Also include in your reply:
- App/product name
- Logo or name to show in the form header
- Link to "Register" from login? (yes/no)
- Primary theme color

---

## Phase 2 — Generate Artifact

Produce **three files**: `LoginPage.tsx` + `LoginPage.styles.css` + `LoginPage.types.ts`.

### LoginPage.types.ts

```ts
export type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthFormProps = {
  onSubmit: (credentials: AuthCredentials) => void;
  loading?: boolean;
  error?: string;
};
```

### LoginPage.tsx

```tsx
import { Input, Button, Link } from 'neus-ui';
import './LoginPage.styles.css';
import type { AuthCredentials, AuthFormProps } from './LoginPage.types';

export const LoginPage = ({ onSubmit, loading, error }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__brand">
          <h1>[AppName]</h1>
          <p>Sign in to your account</p>
        </div>

        {error && <div className="auth-card__error">{error}</div>}

        <div className="auth-card__fields">
          <Input
            name="email"
            label="Email address"
            type="email"
            placeholder="user@example.com"
            required
            value={email}
            onChange={setEmail}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={setPassword}
          />
        </div>

        <Button
          label="Sign in"
          type="button"
          variant="solid"
          color="primary"
          fullWidth
          loading={loading}
          onClick={() => onSubmit({ email, password })}
        />

        <div className="auth-card__links">
          {/* Auth card has white background → type="primary" for all links */}
          <Link label="Forgot your password?" type="primary" href="/forgot-password" />
          <Link label="Create account" type="primary" href="/register" />
        </div>
      </div>
    </div>
  );
};
```

### LoginPage.styles.css

Apply Mode from VISUAL DIRECTIVE: `light` → gray background + white card; `dark` → dark canvas + glass card.

```css
@keyframes neus-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Light mode (default) */
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-100);
  padding: 1rem;
}
.auth-card {
  background: var(--color-white);
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 20px var(--color-shadow);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: neus-fade-up 0.4s ease forwards;
}
.auth-card__brand { text-align: center; }
.auth-card__brand h1 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}
.auth-card__brand p { color: var(--color-gray-500); font-size: 0.95rem; }
.auth-card__error {
  background: var(--color-error-light);
  color: var(--color-error);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}
.auth-card__fields { display: flex; flex-direction: column; gap: 1rem; }
.auth-card__links { display: flex; justify-content: space-between; align-items: center; }

/* Dark mode overrides — apply when Mode: dark */
/* .auth-page { background: #0a0a14; } */
/* .auth-card {
  background: rgba(20, 20, 40, 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: none;
} */
/* .auth-card__brand h1 { color: #818cf8; } */
/* .auth-card__brand p { color: #94a3b8; } */
```
