# Siteset Studio — Design System (Redesigned)

**Premium digital agency marketing website. Modern Gen Z aesthetic—simple, stylish, eye-catching. 3D parallax depth, scroll-triggered animations, strategic blue accent.**

## Tone & Differentiation

Confident modernism with precision. Deep navy (#0f172a) + electric deep blue (#2563eb) + white. Parallax depth and 3D micro-interactions signal premium quality. Breathing space throughout—never congested. Motion feels intentional, not decorative. Bold geometric display typography (Gen Z vibe) paired with refined body copy.

## Color Palette

| Token | OKLCH | Purpose |
|-------|--------|---------|
| **Background** | 0.07 0.01 265 | Deep navy page surface |
| **Foreground** | 0.96 0 0 | Light text on dark |
| **Primary** | 0.62 0.26 265 | Electric blue accent, CTAs, glow effects |
| **Accent** | 0.65 0.28 265 | Interactive highlights, hover states |
| **Muted** | 0.15 0.015 265 | Subtle surfaces, secondary zones |
| **Border** | 0.21 0.03 265 | Soft separation lines |
| **Card** | 0.11 0.025 265 | Elevated card surfaces |
| **Destructive** | 0.65 0.19 22 | Error states |

## Typography

| Layer | Font | Scale | Weight | Use |
|-------|------|-------|--------|-----|
| **Display** | Bricolage Grotesque | 48–72px | 700–900 | Hero, section titles—bold geometric Gen Z vibe |
| **Body** | General Sans | 16–18px | 400–600 | Copy, descriptions—refined, readable |
| **Mono** | Geist Mono | 12–14px | 400 | Details, small text |

## Motion & Animation

- **Parallax Mouse**: Hero shapes respond to mouse movement (translateZ, rotateX).
- **Scroll Reveal**: Cards fade-in + scale-up as they enter viewport (0.8s, cubic-bezier easing).
- **Hover 3D**: Service/portfolio cards tilt slightly on hover (rotateX 2–3deg), lift (translateY -8px).
- **Glow Pulse**: Interactive elements pulse with primary blue glow (3s infinite).
- **Floating Shapes**: Hero background shapes drift at staggered speeds (3s, 6s, 9s).

## Structural Zones

| Zone | Background | Border | Motion |
|------|-----------|--------|--------|
| **Header/Nav** | `bg-background/85` glassmorphic | `border-b border-border/20` | Sticky, blur 20px |
| **Hero** | Deep navy gradient + floating 3D shapes | None | Parallax depth on mouse, fade-in entrance |
| **Services** | Alternating `bg-background`, `bg-muted/15` | Subtle | Cards lift + glow on hover, staggered reveal |
| **Before/After** | Clean split with transparency | Minimal | Slider transitions smooth, labels clear |
| **Portfolio** | `bg-muted/10` grid layout | None | Cards 3D tilt on hover, preview images pop |
| **Testimonials** | `bg-card glass` alternating | `border-b border-border/15` | Staggered scale-in on scroll |
| **Pricing** | Highlight plan: `bg-primary/8 border-2 border-primary` | Bold ring | Glow-pulse animation continuous |
| **Footer** | `bg-muted/10` | `border-t border-border/15` | Clean, minimal accent |

## Component Patterns

- **Primary Button**: `bg-primary text-primary-foreground glow-btn` with hover glow expansion.
- **Card**: `bg-card glass rounded-lg` with `shadow-subtle`. Hover: `shadow-elevated + scale(1.02) + rotate(0.5deg)`.
- **Service Card**: Add `animate-glow-pulse` on hover + 3D tilt.
- **Portfolio Item**: Image overlay with gradient. Hover: scale image (1.08), reveal demo link.

## Constraints

- **No Excess**: Motion limited to parallax, hover lift, glow pulse, scroll reveal. No bouncing or spinning.
- **Contrast**: L-value difference ≥ 0.8 (dark theme verified).
- **Spacing**: 2rem section padding, 1.5rem card padding. Breathing space priority.
- **Color Discipline**: Blue used sparingly—mostly on CTAs, accents, glow. Rest is navy/white.

## Signature Detail

Parallax hero with animated 3D geometric shapes responding to mouse movement, creating depth perception. Cards tilt and lift on hover. Primary blue glow pulses subtly, reinforcing premium tech brand. Clean grid layouts with generous whitespace.
