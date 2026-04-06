# AsiyaUI Reference - DigiLearn

This document is the source of truth for AsiyaUI styling in DigiLearn. Use it when building or reviewing any UI.

## Product Feel
- Youth-focused, friendly, simple, and confident
- Clean light interface with bold contrast for readability
- Strong, energetic accent highlights to guide attention
- Rounded surfaces and soft shadows for approachable cards

## Color Tokens (Tailwind)
Defined in `tailwind.config.ts`:
- `accent`: `#CCFF00` (primary highlight/action color)
- `off-white`: `#fafafa` (app background)
- `light-bg`: `#f5f5f5` (soft neutral surfaces)
- `dark-bg`: `#111111` (high-contrast dark blocks)
- `white`: `#ffffff` (cards, containers, buttons)

## Core Visual Rules
- Default page background: `bg-off-white`
- Primary text: dark grays (`text-gray-900`, `text-gray-700`, `text-gray-600`)
- Accent usage:
  - Primary CTA backgrounds
  - Secondary highlights (borders, icon chips, badges, dividers)
  - Interactive emphasis states
- Cards:
  - Rounded corners (`rounded-2xl` and up)
  - White surfaces with subtle borders/shadows
  - Distinct visual separation between cards (spacing + border/accent cues)

## Component Patterns In This App
- Landing (`src/app/page.tsx`):
  - Big, expressive cards
  - One accent card + one dark contrast card
- Home (`src/app/home/page.tsx`, `src/components/SkillTrackCard.tsx`):
  - Personalized greeting
  - Course cards use accent-tinted separators and icon containers
- Auth (`src/app/login/page.tsx`, `src/app/register/page.tsx`):
  - Minimal forms, rounded controls, high legibility, accent CTA

## Motion
- Keep animations subtle and purposeful
- Current tokens include `animate-fade-in` and `animate-float`
- Avoid heavy movement that distracts from learning content

## Update Protocol (Required)
When any UI styling changes:
1. Apply changes in code.
2. Update this file in the same change set:
   - New/changed color usage
   - New component pattern decisions
   - Any revised visual rules
3. Run `npm run lint` to verify no regressions.

## Special Reveal Pattern (Asiya Surprise)
Used for the landing-page one-time romantic reveal.
- Overlay:
  - Use a fixed veil (`bg-off-white/80` + `backdrop-blur`)
  - Keep the focus on a single centered white card (`bg-white`, rounded corners, subtle border/shadow)
- Accent:
  - Accent is primarily expressed through `text-accent` (icons) and `bg-accent` (confetti/badges)
  - Use translucent accent surfaces (`bg-accent/20`) for soft glow backgrounds
- Animation style:
  - Keep motion brief (around 2–3 seconds)
  - Favor small, joyful effects (floating hearts, sparkles, lightweight confetti) over heavy screen shaking
- Privacy:
  - The reveal is gated client-side (localStorage) so it only appears on the user’s device.

