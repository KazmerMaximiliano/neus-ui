# Anti-AI-Slop Rules for Neus Design

Apply these rules in EVERY skill before emitting any artifact.

## Slop Blacklist — Never do these

- Add fields, columns, or sections not explicitly requested in the intake
- Hardcode option arrays in Select/MultiSelect when user said data comes from API
- Use inline styles (`style={{}}`) when a CSS variable or component prop exists
- Import from internal paths like `../../components/Button/Button` — always use `neus-ui`
- Invent copy: fake testimonials, made-up metrics, placeholder company names like "Acme Corp"
- Add decorative elements (gradients, emojis as icons, random illustrations) unless requested
- Use colors outside `var(--color-*)` CSS variables unless ThemeProvider override was requested
- Generate a sidebar or AppTemplate for landing/marketing pages
- Add features not in the intake ("I added a search bar just in case")
- Use `any` TypeScript type — always type props correctly

## Self-Critique Mandatory (5 dimensions)

Run this internal check before emitting code. If any dimension fails, fix it first.

| Dimension | Pass condition |
|-----------|---------------|
| **Jerarquía visual** | Primary action is visually prominent; secondary actions are subordinate |
| **Uso de componentes** | Every UI element uses a Neus UI component if one exists; CSS only for gaps |
| **Coherencia del tema** | All colors use `var(--color-*)` or ThemeProvider config; no hardcoded hex |
| **Especificidad de campos** | Field count in output == field count in intake; zero extras |
| **Contención visual** | No decorative noise; every element serves a function |

## Two Anti-Slop Profiles

### App Views (page-*, flow-*, layout-app)
- No extra fields in forms or tables
- Props for API-driven data: `data: Entity[]`, `options: SelectOption[]`
- No hardcoded data arrays in component body
- Actions handler props always optional: `onEdit?: () => void`

### Marketing Pages (landing-*, page-auth, page-blog)
- Copy comes 100% from intake — no invented headlines, features, or pricing
- If user said "no social proof" → zero testimonials in output
- No stock photo placeholders unless user requested images
- Nav items must match exactly what user specified

## CSS Rules

1. Check component props first — `color`, `variant`, `fullWidth`, `size` cover most needs
2. Use `var(--color-primary)`, `var(--color-gray-300)` etc. for theme consistency
3. Custom CSS only when component props cannot achieve the layout requirement
4. Never override component internals with `!important`

## Import Rule

```tsx
// CORRECT
import { Button, Card, DataTable, Modal } from 'neus-ui';

// WRONG
import { Button } from '../../components/Button/Button';
import { Card } from '../Card/Card';
```
