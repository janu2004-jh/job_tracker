# Design System

Calm, intentional, coherent, confident. Not flashy, not loud, not playful. One mind designed it.

## Color (max 4 in use)

| Role      | Token           | Value     |
|-----------|-----------------|-----------|
| Background| `--color-bg`    | `#F7F6F3` |
| Primary text | `--color-text` | `#111111` |
| Accent    | `--color-accent`| `#8B0000` (deep red) |
| Success   | `--color-success` | Muted green |
| Warning   | `--color-warning` | Muted amber |

No gradients, glassmorphism, neon.

## Typography

- **Headings:** `--font-serif` (Libre Baskerville). Large, confident, generous spacing.
- **Body:** `--font-sans` (Source Sans 3). 16–18px, line-height 1.6–1.8, max-width 720px for text blocks.

## Spacing (only these)

`8px` · `16px` · `24px` · `40px` · `64px`  
Tokens: `--space-1` through `--space-5`. No random values.

## Global layout (every page)

1. **Top Bar** — Left: project name. Center: Step X / Y. Right: status badge (Not Started / In Progress / Shipped).
2. **Context Header** — Large serif headline, one-line subtext. Clear purpose, no hype.
3. **Primary Workspace (70%)** — Main product interaction. Clean cards, predictable components.
4. **Secondary Panel (30%)** — Step explanation, copyable prompt, Copy / Build in Lovable / It Worked / Error / Add Screenshot.
5. **Proof Footer** — Checklist: □ UI Built □ Logic Working □ Test Passed □ Deployed. Each requires user proof.

## Components

- **Primary button:** solid deep red. **Secondary:** outlined. Same hover and radius everywhere.
- **Inputs:** clean borders, no heavy shadows, clear focus state.
- **Cards:** subtle border, no drop shadows, balanced padding.

## Interaction

- Transitions: 150–200ms, ease-in-out. No bounce, no parallax.

## Errors & empty states

- Errors: explain what went wrong and how to fix. Never blame the user.
- Empty states: provide next action. Never feel dead.

All tokens and layout styles live in `src/index.css`. Layout components in `src/components/layout/`.
