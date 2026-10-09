---
title: Design System
aliases: [design, design tokens, theme]
tags: [design, tokens, theme, apple, messages, matte]
cssclasses: [design-doc]
created: 2026-10-08
updated: 2026-10-09
status: active
version: 3
---

# Design System

> [!abstract] Summary
> **Apple structure, matte finish.** Layout, density, grouping and restraint come from macOS Messages. The surface is matte: warm stone/charcoal neutrals, no translucency or blur, one muted terracotta accent, square controls, flat avatars and a faint grain.
> Token names are unchanged from v1/v2 (`--color-base-*`, `--color-accent*`), so existing components re-theme without edits.

Related: [[Typography]] · [[Components]] · [[Layout]] · [[Chat UI]]

---

## 0. History

> [!question]- Why v1 felt off (click to expand)
> 1. **Too many hues.** Purple bubbles + yellow avatars + blue avatars. Use one accent; avatars are neutral.
> 2. **Avatar on every bubble.** None in 1:1; in groups only beside the *last* bubble of a run.
> 3. **Uniform spacing.** Group runs tightly (2px), separate speakers (12px+).
> 4. **No bubble tails / small radius.** 18px bubbles, tail on the last bubble only.
> 5. **Heavy filled panels.** Separators are hairlines, not filled bands.
> 6. **Sidebar has no information.** Rows show a 2-line preview + timestamp.
> 7. **Composer is a big box with a word button.** Thin field; send is a small accent icon button that appears only with text.

> [!info]- v2 → v3: what changed and why
> | Area | v2 (Apple gloss) | v3 (matte) |
> |---|---|---|
> | Neutrals | Cool grays (`#f2f2f7`) | Warm stone (`#e6e3dc`) → charcoal (`#1c1c1b`) |
> | Sidebar | Translucent + `blur(30px) saturate(180%)` | Opaque `base-10` + hairline |
> | Accent | `#007aff`, full saturation | Terracotta `hsl(17 55% 45%)` |
> | Controls | 8–16px radius, pill composer | Square (`--radius-control: 0`) |
> | Content | 18px bubbles | Unchanged — content stays round |
> | Avatars | Gradient monograms | Flat fill |
> | Buttons | Undefined | Ink solid / outline, color-wash hover |
> | Font | System stack first | Inter first, everywhere |
> | Texture | None | Grain overlay, 4.5% (dark 5%) |

---

## 1. Principles

1. **Neutral by default.** Color is reserved for your messages and interactive state. Everything else is warm gray.
2. **No gloss.** No `backdrop-filter`, no gradients on UI surfaces, no glow, no glassmorphism. Depth comes from one step of tone plus a hairline. (Image scrims in §12 are imagery, not UI surfaces.)
3. **Radius encodes role.** Content is round: bubbles, avatars, badges. Controls are square: buttons, fields, rows, menus.
4. **Rhythm over decoration.** Hierarchy comes from spacing and weight, not boxes and color.
5. **Quiet motion.** Short fades for state. Two signature moves: the button color wash (§8) and the blur-in reveal (§10, landing pages only).
6. **No pure `#fff` / `#000`.** Text and surfaces are always slightly warm. The single exception is the dark-mode solid-button wash, which goes to `#ffffff` as its "lit" state.
7. **Imagery may be expressive; chrome may not.** Blur, chromatic aberration, halation and heavy grain belong *inside* images and hero display type (§12). Buttons, body text and panels follow every rule above, even when they sit on an image.

---

## 2. Base scale

| Token | Light | Dark | Role |
|---|---|---|---|
Two anchors: **stone** `#e6e3dc` (light page) and **charcoal** `#1c1c1b` (dark page). Every step between is the same warm, low-chroma family.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--color-base-00` | `#e6e3dc` stone | `#1c1c1b` charcoal | Page / conversation background |
| `--color-base-05` | `#f1efe9` | `#262624` | Raised: fields, cards, popovers, menus |
| `--color-base-10` | `#dedad2` | `#20201f` | Sidebar |
| `--color-base-20` | `#d6d2c9` | `#2a2a28` | Row hover, code background |
| `--color-base-25` | `#cdc9bf` | `#2e2d2a` | Received bubble, selected row |
| `--color-base-30` | `#c4bfb4` | `#363532` | Opaque border (rare) |
| `--color-base-35` | `#b8b3a8` mid stone | `#42413d` | Field border, avatar fill |
| `--color-base-40` | `#a39e93` | `#55534e` | Field border (hover), disabled, scrollbar |
| `--color-base-50` | `#8a857b` taupe | `#7a776f` | Placeholder, faint text |
| `--color-base-60` | `#77736a` | `#8a857b` taupe | Icons, timestamps |
| `--color-base-70` | `#5f5b54` | `#b8b3a8` mid stone | Muted text, previews |
| `--color-base-100` | `#1c1c1b` charcoal | `#ece9e2` | Primary text, ink |

> [!tip] Rule of thumb
> Surfaces **00–25**, borders **30–40**, text **50–100**. Prefer the translucent `--separator` (§4) for dividers.
> `base-05` is "raised" — lighter than the page in *both* themes, so cards and fields lift off the page by one tone step.
> The two themes mirror each other: light text is the dark page, dark text is close to the light page.

> [!info] Grain is part of the stone
> The stone only reads as "paper" with the grain overlay on (§6). Without it, `#e6e3dc` looks like a flat beige.

---

## 3. Accent

**Terracotta.** Warm against both stone and charcoal, and the most distinctive pairing.

| Variable | Light | Dark |
|---|---|---|
| `--accent-h` | `17` | `17` |
| `--accent-s` | `55%` | `55%` |
| `--accent-l` | `45%` | `60%` |

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-accent` | `#b25734` | `#d18161` | Unread dot, focus ring, link underline, dark-mode link text |
| `--color-accent-1` | `hsl(17 55% 40%)` | `hsl(17 55% 66%)` | Hover |
| `--color-accent-2` | `hsl(17 55% 35%)` | `hsl(17 55% 72%)` | Pressed |
| `--color-accent-fill` | `#b25734` | `#b25734` | **Fills carrying text/icons:** sent bubbles, send button. Same in both themes so off-white text always passes contrast |

> [!warning] One accent, used sparingly
> Terracotta appears **only** on: sent bubbles, the send button, link underlines, unread dots, focus rings. Never on panels, avatars, icons at rest, or labeled buttons. Labeled buttons are ink (§8).
> Terracotta is for **fills and marks, not small text** on stone — `#b25734` on `#e6e3dc` is under 4.5:1. Links on light use `text-normal` with a terracotta underline.

### Alternate accents

To swap the accent, change `--accent-h` and `--accent-s` only; lightness stays as above. Re-check contrast after any swap.

| Name | `--accent-h` | `--accent-s` | Feel |
|---|---|---|---|
| **Terracotta** (current) | `17` | `55%` | Warm, filmic |
| Ink blue | `214` | `35%` | Cool contrast, closest to Apple |
| Moss | `80` | `18%` | Quiet, earthy, very matte |

Don't exceed `65%` saturation — past that it stops reading as matte.

### Status colors

Same muted family. They never stand alone — always paired with an icon and a text message.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-success` | `#4a6340` moss | `#8fa67e` | Sent/delivered confirmations |
| `--color-warning` | `#7a5c16` ochre | `#c49a3a` | Reconnecting, rate limits |
| `--color-danger` | `#9b2c2c` oxblood | `#e0766a` | Errors, invalid fields. Redder than the accent so the two never read as the same thing |

---

## 4. Semantic tokens

| Semantic token | Value | Notes |
|---|---|---|
| `--background-primary` | `base-00` | Conversation pane, pages. **Must stay solid** (bubble tail mask, §9) |
| `--background-secondary` | `base-10` | Sidebar. Opaque — no blur |
| `--background-raised` | `base-05` | Popovers, menus |
| `--background-input` | `base-05` | Fields: search, composer, forms |
| `--background-hover` | `base-20` | Row hover |
| `--background-selected` | `base-25` | Selected sidebar row |
| `--separator` | light `rgb(28 28 27 / .12)` · dark `rgb(236 233 226 / .1)` | All hairlines |
| `--border-field` | `base-35` | Field border at rest |
| `--border-field-hover` | `base-40` | |
| `--bubble-sent` | `accent-fill` | Same terracotta in both themes |
| `--bubble-sent-text` | `#faf8f3` | Warm off-white, not pure white |
| `--link-text` | light `base-100` · dark `accent` | |
| `--link-underline` | `accent` | `1px`, `text-underline-offset: 3px`; `2px` on hover |
| `--bubble-received` | `base-25` | |
| `--bubble-received-text` | `base-100` | |
| `--text-normal` | `base-100` | |
| `--text-muted` | `base-70` | Previews, sender names, secondary copy |
| `--text-faint` | `base-50` | Placeholders, legal text |
| `--icon-color` | `base-60` | |
| `--avatar-bg` | `base-35` | Flat. Initials in `base-100` |
| `--focus-ring` | accent at 25% | Field focus halo |

---

## 5. Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

```css
--font-ui:   "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, monospace;
```

> [!note] Why Inter first
> SF Pro only exists on Apple devices. Inter first keeps rendering identical on Windows and Mac. Never let it fall to Segoe UI — that's the source of heavy, synthetic-italic headings.

| Role | Size / line-height | Weight | Color |
|---|---|---|---|
| Page title (auth, settings) | 24 / 30 | 600, `-0.015em` | `text-normal` |
| Page subtitle | 15 / 22 | 400 | `text-muted` |
| Conversation title (header) | 13 / 16 | 600 | `text-normal` |
| Sidebar name | 13 / 16 | 600 | `text-normal` |
| Sidebar preview (2 lines max) | 13 / 16 | 400 | `text-muted` |
| Sidebar timestamp | 12 / 16 | 400, `tabular-nums` | `text-muted` |
| Bubble text | 14 / 19 | 400 | per bubble |
| Sender name (groups only) | 11 / 13 | 400 | `text-muted` |
| Time separator ("Today 9:41 AM") | 11 / 13 | 500 | `text-muted`, centered |
| Form label | 14 / 18 | 500 | `text-normal` |
| Field text | 14 / 20 | 400 | `text-normal`; placeholder `text-faint` |
| Button label | per size (§8) | 500 | per variant |
| Legal / footnote | 12 / 16 | 400 | `text-faint` |
| Mono (code, count badges) | 0.85em | 500 | inherit |

Rules: `-0.01em` letter-spacing on 13–14px text. `-webkit-font-smoothing: antialiased`. `font-style: normal` everywhere — no italics in UI.

---

## 6. Shape, depth & texture

### Radius

| Token | Value | Applies to |
|---|---|---|
| `--radius-control` | `0` | Buttons, fields, composer, search, sidebar rows, menus, popovers, send button |
| `--radius-bubble` | `18px` | Message bubbles |
| `--radius-avatar` | `50%` | Avatars |
| `--radius-badge` | `999px` | Count badges, unread dot |

Nothing else gets a radius. If a new element isn't clearly content, it's a control → `0`.

### Depth

| Thing | Spec |
|---|---|
| Panels | No shadow. Tone step + `--separator` hairline |
| Popovers / menus | `background-raised`, `1px solid var(--separator)`, `box-shadow: var(--popover-shadow)` (light `0 4px 16px rgb(0 0 0 / .06)`, dark `.4`) |
| `backdrop-filter` | **Never** |

### Grain

One fixed overlay over the whole app at 4.5% (dark 5%). It's the matte signature. It sits above content, ignores the pointer, and doesn't affect the bubble tail mask.

```css
body::after {
  content: ""; position: fixed; inset: 0; z-index: 9999; pointer-events: none;
  opacity: var(--grain-opacity);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

---

## 7. Layout

| Region | Spec |
|---|---|
| Window | Sidebar `300px` · conversation `1fr` · no icon rail (settings via toolbar button) |
| Sidebar | `background-secondary`, `border-right: 1px solid var(--separator)` |
| Sidebar header | `52px`; search field below, `32px` tall, full-width minus `12px` inset, field styles (§8) |
| Sidebar row | `64px`, flush edge to edge (no inset), `--radius-control`, avatar `40px`, `12px` horizontal padding; unread dot `8px` accent, left of avatar |
| Row states | hover `background-hover` · selected `background-selected` (gray, **never** accent) · `150ms` fade |
| Conversation header | `52px`, "To: Name", `border-bottom: 1px solid var(--separator)` |
| Message column | padding `16px 20px`, bubble `max-width: 70%` |
| Composer | field (§8), `min-height: 36px`, padding `8px 44px 8px 12px`, margin `12px 16px` |
| Send button | `28px` square, `accent-fill`, `--bubble-sent-text` ↑ icon, inside composer right `4px` inset; hidden when empty; hover `brightness(.92)`, pressed `brightness(.85)` |
| Standalone pages (auth, settings) | Content column `max-width: 440px`, centered, no card border/shadow — the page is the card |

---

## 8. Components

### Fields

```css
.field {
  height: 40px; width: 100%; padding: 0 12px;
  background: var(--background-input); color: var(--text-normal);
  border: 1px solid var(--border-field); border-radius: var(--radius-control);
  font: 400 14px/20px var(--font-ui);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
}
.field::placeholder { color: var(--text-faint); }
.field:hover { border-color: var(--border-field-hover); }
.field:focus { outline: none; border-color: var(--color-accent); box-shadow: 0 0 0 3px var(--focus-ring); }
.field[aria-invalid="true"] { border-color: var(--color-danger); }
```

Search (`32px`) and composer (`min-height: 36px`) are `.field` with height overrides.

### Buttons

Two variants only: **solid** and **outline**. Both are ink, not accent. No translucent, gradient or colored buttons.

| Size | Height | Padding-x | Font | Use |
|---|---|---|---|---|
| `sm` | 32px | 12px | 13px / 500 | Toolbars, inline |
| `md` | 40px | 16px | 14px / 500 | Forms, dialogs (full width on auth pages) |
| `lg` | 52px | 24px | 16px / 500 | Page-level CTAs |

Icon in a button: 16px (`lg`: 18px), `10px` gap, `fill: currentColor`. Trailing arrow uses `<span class="arrow">→</span>`.

#### Hover: color wash

On hover, a fill **sweeps in from the right edge to the left**. The arrow slides `4px` left in sync, and the label color crossfades. The button never changes size: no scale, no glow, no shadow, no border-width change. On mouse-out the wash retracts the same way.

```
rest:    [  Continue   →  ]
50%:     [  Continue  →▓▓▓]
hover:   [▓▓Continue →▓▓▓▓]
```

```css
.btn {
  position: relative; isolation: isolate; overflow: hidden;
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  border-radius: var(--radius-control);
  font: 500 14px/1 var(--font-ui); letter-spacing: -0.005em;
  text-decoration: none; cursor: pointer;
  transition: color var(--dur-wash) var(--ease-in-out), border-color var(--dur-wash) var(--ease-in-out);
}
.btn::before {                                   /* the wash */
  content: ""; position: absolute; inset: 0; z-index: -1;
  background: var(--wash);
  transform: scaleX(0); transform-origin: right center;
  transition: transform var(--dur-wash) var(--ease-in-out);
}
.btn:hover::before, .btn:focus-visible::before { transform: scaleX(1); }
.btn .arrow { display: inline-block; transition: transform var(--dur-wash) var(--ease-in-out); }
.btn:hover .arrow, .btn:focus-visible .arrow { transform: translateX(-4px); }

.btn-solid {
  background: var(--btn-solid-bg); color: var(--btn-solid-fg); border: 1px solid var(--btn-solid-bg);
  --wash: var(--btn-solid-wash);
}
.btn-outline {
  background: transparent; color: var(--text-normal); border: 1px solid var(--btn-outline-border);
  --wash: var(--color-base-100);
}
.btn-outline:hover, .btn-outline:focus-visible { color: var(--color-base-00); border-color: var(--color-base-100); }
.btn:disabled { opacity: .45; pointer-events: none; }
```

| Button token | Light | Dark |
|---|---|---|
| `--btn-solid-bg` | `base-100` (`#1c1c1b`) | `base-100` (`#ece9e2`) |
| `--btn-solid-fg` | `base-00` (`#e6e3dc`) | `base-00` (`#1c1c1b`) |
| `--btn-solid-wash` | `#34332f` | `#ffffff` |
| `--btn-outline-border` | `rgb(28 28 27 / .25)` | `rgb(236 233 226 / .4)` |

Wash = `transform: scaleX()` on `::before`, never animated `width`/`left`. `isolation: isolate` + `z-index: -1` keep the fill under the label.

Third-party marks (e.g. Google "G") keep their colors; give them a `2px` `base-05` circular backing so they read on the dark wash.

### Count badge

```css
.badge { font: 500 .85em/1 var(--font-mono); padding: 4px 8px; border-radius: var(--radius-badge);
         background: var(--color-base-100); color: var(--color-base-00); }
```

### Avatars

`40px` (sidebar) / `28px` (group bubbles), `--radius-avatar`, `--avatar-bg`, initials 600 in `base-100`, size ≈ 40% of diameter. Never colored per user.

### Hover summary

| Element | Hover |
|---|---|
| Labeled button | Color wash (`--dur-wash`) |
| Icon button / send | Icon `base-60` → `base-100`; send button darkens (`brightness(.92)`) (`--dur-fast`) |
| Sidebar row | `background-hover` (`--dur-fast`) |
| Field | Border `base-35` → `base-40` (`--dur-fast`) |
| Link | `--link-underline` thickens `1px` → `2px` (`--dur-fast`) |
| Bubble | None |

### Focus

- Fields: accent border + `0 0 0 3px var(--focus-ring)` (above).
- Everything else: `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`
- Never remove focus styles.

---

## 9. Message bubbles

### Grouping

A message continues the previous **run** if it's from the same sender and sent within ~60s.

| Situation | Gap above |
|---|---|
| Same run | `2px` |
| New sender / new run | `12px` |
| Time separator (> 15 min gap) | `20px`, centered timestamp |

- **1:1 chats:** no avatars, no sender names.
- **Group chats:** sender name above the *first* received bubble of a run; `28px` avatar beside the *last* received bubble of a run. Never an avatar on your own messages.

### Shape

Radius `--radius-bubble`, padding `7px 12px`, **tail only on the last bubble of a run.**

```css
.bubble {
  position: relative; max-width: 70%;
  padding: 7px 12px; border-radius: var(--radius-bubble);
  font: 400 14px/19px var(--font-ui);
}
.bubble.sent     { align-self: flex-end;   background: var(--bubble-sent);     color: var(--bubble-sent-text); }
.bubble.received { align-self: flex-start; background: var(--bubble-received); color: var(--bubble-received-text); }

.bubble.last::before,
.bubble.last::after { content: ""; position: absolute; bottom: 0; height: 20px; }

.bubble.sent.last::before     { right: -8px;  width: 20px; background: var(--bubble-sent);         border-bottom-left-radius: 16px 14px; }
.bubble.sent.last::after      { right: -10px; width: 10px; background: var(--background-primary); border-bottom-left-radius: 10px; }
.bubble.received.last::before { left: -8px;   width: 20px; background: var(--bubble-received);     border-bottom-right-radius: 16px 14px; }
.bubble.received.last::after  { left: -10px;  width: 10px; background: var(--background-primary); border-bottom-right-radius: 10px; }
```

> [!warning] Tail mask
> `::after` paints the page color to carve the tail, so it needs a **solid** `--background-primary`. The grain overlay is fine because it sits above everything. A wallpaper or gradient behind messages is not — switch to an SVG tail.

---

## 10. Motion

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | `150ms` | Row / field / icon hovers |
| `--dur-base` | `200ms` | New message in |
| `--dur-wash` | `550ms` | Button color wash |
| `--dur-reveal` | `900ms` | Blur-in reveal |
| `--ease-out` | `cubic-bezier(.2,.8,.2,1)` | Entrances, hovers |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | Wash |
| `--ease-reveal` | `cubic-bezier(.16,1,.3,1)` | Blur-in (fast start, long settle) |

| Thing | Spec |
|---|---|
| New message in | `translateY(8px) scale(.96)` → none, opacity `0 → 1`, `--dur-base` `--ease-out` |
| Blur-in reveal | Landing/marketing only (below). Never in the chat app UI |
| Reduced motion | Fades only, `200ms`: wash becomes an opacity fade, reveal loses blur and movement, arrow and bubble don't move |

### Blur-in reveal

Elements come into focus as they enter the viewport: they start blurred, transparent and slightly low, then sharpen into place. This applies to **landing and marketing pages only**: hero headline words, section headings, images, and hero display type.

| Property | From | To |
|---|---|---|
| `filter` | `blur(12px)` | `none` |
| `opacity` | `0` | `1` |
| `transform` | `translateY(16px)` | `none` |
| Timing | `--dur-reveal` `--ease-reveal`, stagger `80ms` per item via `--i` | |

```css
.reveal {
  opacity: 0; filter: blur(12px); transform: translateY(16px);
  transition:
    opacity   var(--dur-reveal) var(--ease-reveal),
    filter    var(--dur-reveal) var(--ease-reveal),
    transform var(--dur-reveal) var(--ease-reveal);
  transition-delay: calc(var(--i, 0) * 80ms);
}
.reveal.is-in { opacity: 1; filter: none; transform: none; }
```

```js
// Scroll-triggered: reveal once, when 20% visible
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Hero headline on load: wait for Inter so words don't sharpen into a fallback font
document.fonts.ready.then(() =>
  document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('is-in')));
```

Hero headline: wrap each word in `<span class="reveal" style="--i:N">`, with `display: inline-block`. Line 2 words continue the count, so the whole headline sharpens left to right.

> [!warning] Performance
> Animating `filter: blur()` is expensive on large text. Reveal at most ~12 elements per viewport, never animate blur on scroll-*scrubbed* timelines over huge areas, and don't leave `will-change: filter` on after the reveal.

```css
@media (prefers-reduced-motion: reduce) {
  .btn::before { transform: none; opacity: 0; transition: opacity 200ms; }
  .btn:hover::before, .btn:focus-visible::before { opacity: 1; }
  .btn .arrow { transition: none; transform: none !important; }
  .bubble { animation: none; }
  .reveal, .display-word .reveal { filter: none; transform: none; transition: opacity 200ms; transition-delay: 0ms; }
}
```

---

## 11. Implementation

```css
:root {
  color-scheme: light dark;

  --accent-h: 17; --accent-s: 55%; --accent-l: 45%;

  --color-base-00:  #e6e3dc;   /* stone */
  --color-base-05:  #f1efe9;
  --color-base-10:  #dedad2;
  --color-base-20:  #d6d2c9;
  --color-base-25:  #cdc9bf;
  --color-base-30:  #c4bfb4;
  --color-base-35:  #b8b3a8;
  --color-base-40:  #a39e93;
  --color-base-50:  #8a857b;
  --color-base-60:  #77736a;
  --color-base-70:  #5f5b54;
  --color-base-100: #1c1c1b;   /* charcoal */

  --color-accent:      hsl(var(--accent-h) var(--accent-s) var(--accent-l));
  --color-accent-1:    hsl(var(--accent-h) var(--accent-s) calc(var(--accent-l) - 5%));
  --color-accent-2:    hsl(var(--accent-h) var(--accent-s) calc(var(--accent-l) - 10%));
  --color-accent-fill: hsl(var(--accent-h) var(--accent-s) 45%);

  --color-success: #4a6340;
  --color-warning: #7a5c16;
  --color-danger:  #9b2c2c;

  --link-text:          var(--color-base-100);
  --separator:          rgb(28 28 27 / .12);
  --btn-solid-wash:     #34332f;
  --btn-outline-border: rgb(28 28 27 / .25);
  --popover-shadow:     0 4px 16px rgb(0 0 0 / .06);
  --grain-opacity:      .045;
}

/* Dark, OS-driven (skipped when <html class="theme-light">) */
@media (prefers-color-scheme: dark) {
  :root:not(.theme-light) {
    --accent-l: 60%;
    --color-base-00:  #1c1c1b; --color-base-05:  #262624; --color-base-10:  #20201f;
    --color-base-20:  #2a2a28; --color-base-25:  #2e2d2a; --color-base-30:  #363532;
    --color-base-35:  #42413d; --color-base-40:  #55534e; --color-base-50:  #7a776f;
    --color-base-60:  #8a857b; --color-base-70:  #b8b3a8; --color-base-100: #ece9e2;
    --color-accent:   hsl(var(--accent-h) var(--accent-s) var(--accent-l));
    --color-accent-1: hsl(var(--accent-h) var(--accent-s) calc(var(--accent-l) + 6%));
    --color-accent-2: hsl(var(--accent-h) var(--accent-s) calc(var(--accent-l) + 12%));
    --color-success: #8fa67e; --color-warning: #c49a3a; --color-danger: #e0766a;
    --link-text:          var(--color-accent);
    --separator:          rgb(236 233 226 / .1);
    --btn-solid-wash:     #ffffff;
    --btn-outline-border: rgb(236 233 226 / .4);
    --popover-shadow:     0 4px 16px rgb(0 0 0 / .4);
    --grain-opacity:      .05;
  }
}

/* Dark, forced (on <html> or any subtree) — keep in sync with the block above */
:root.theme-dark, .theme-dark {
  --accent-l: 60%;

  --color-base-00:  #1c1c1b;   /* charcoal */
  --color-base-05:  #262624;
  --color-base-10:  #20201f;
  --color-base-20:  #2a2a28;
  --color-base-25:  #2e2d2a;
  --color-base-30:  #363532;
  --color-base-35:  #42413d;
  --color-base-40:  #55534e;
  --color-base-50:  #7a776f;
  --color-base-60:  #8a857b;
  --color-base-70:  #b8b3a8;
  --color-base-100: #ece9e2;

  /* redeclared so they resolve against the dark --accent-l inside a .theme-dark subtree */
  --color-accent:      hsl(var(--accent-h) var(--accent-s) var(--accent-l));
  --color-accent-1:    hsl(var(--accent-h) var(--accent-s) calc(var(--accent-l) + 6%));
  --color-accent-2:    hsl(var(--accent-h) var(--accent-s) calc(var(--accent-l) + 12%));
  --color-accent-fill: hsl(var(--accent-h) var(--accent-s) 45%);

  --color-success: #8fa67e;
  --color-warning: #c49a3a;
  --color-danger:  #e0766a;

  --link-text:          var(--color-accent);
  --separator:          rgb(236 233 226 / .1);
  --btn-solid-wash:     #ffffff;
  --btn-outline-border: rgb(236 233 226 / .4);
  --popover-shadow:     0 4px 16px rgb(0 0 0 / .4);
  --grain-opacity:      .05;
}

/* Semantic layer — components use only these */
:root, .theme-dark {
  --background-primary:  var(--color-base-00);
  --background-secondary: var(--color-base-10);
  --background-raised:   var(--color-base-05);
  --background-input:    var(--color-base-05);
  --background-hover:    var(--color-base-20);
  --background-selected: var(--color-base-25);

  --border-field:        var(--color-base-35);
  --border-field-hover:  var(--color-base-40);

  --bubble-sent:          var(--color-accent-fill);
  --bubble-sent-text:     #faf8f3;
  --bubble-received:      var(--color-base-25);
  --bubble-received-text: var(--color-base-100);

  --link-underline: var(--color-accent);

  --text-normal: var(--color-base-100);
  --text-muted:  var(--color-base-70);
  --text-faint:  var(--color-base-50);
  --icon-color:  var(--color-base-60);
  --avatar-bg:   var(--color-base-35);
  --focus-ring:  hsl(var(--accent-h) var(--accent-s) var(--accent-l) / .25);

  --btn-solid-bg: var(--color-base-100);
  --btn-solid-fg: var(--color-base-00);

  --radius-control: 0;
  --radius-bubble:  18px;
  --radius-avatar:  50%;
  --radius-badge:   999px;

  --dur-fast: 150ms; --dur-base: 200ms; --dur-wash: 550ms;
  --ease-out: cubic-bezier(.2,.8,.2,1);
  --ease-in-out: cubic-bezier(.65,0,.35,1);

  --font-ui:   "Inter", -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}

body {
  background: var(--background-primary); color: var(--text-normal);
  font-family: var(--font-ui); -webkit-font-smoothing: antialiased;
}
```

> [!note] Dark block
> CSS can't share one rule body between a media query and a class, so the dark values appear twice. Edit both together (or generate both from one source in your build).
> The semantic layer is redeclared on `.theme-dark` so `var()` references resolve against the dark base values when the class is scoped to a subtree.

---

## 12. Landing page

The hero is **one big image with the entry points on it: Sign up, Log in, GitHub.** Nothing else competes.

> [!example] Vision
> Full-bleed sepia/stone still (orbital rings with a small subject), faint scanlines, wordmark top-left, two-tone headline and three square buttons bottom-left, a tiny status dot top-right. Everything below specs that.

### Layout

```
┌──────────────────────────────────────────────────────────┐
│ Zero                                                     • │  wordmark + status dot, 32px inset
│                                                            │
│              (full-bleed image, 100svh)                    │
│                                                            │
│                                                            │
│                                                            │
│ Chat freely.                                               │  headline line 1 — text-normal
│ Connect instantly.                                         │  headline line 2 — text-muted
│                                                            │
│ [ Sign up  → ] [ Log in ] [  GitHub ]                     │  btn-solid + btn-outline ×2, size lg
└──────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---|---|
| Section | `min-height: 100svh`, `position: relative`, `overflow: hidden`, **`class="theme-dark"`** so every token resolves to dark values |
| Image | `position: absolute; inset: 0`, `object-fit: cover`, `z-index: 0` |
| Scrim | Bottom-left legibility only (below). No other overlays |
| Top bar | Wordmark "Zero" left (18px / 600, `text-normal`, text only). Right: optional `6px` connection-status dot (`text-faint` idle, `--color-success` connected), no text label. `32px` inset. **No CTAs in the top bar** |
| Content block | Anchored **bottom-left**: `72px` inset on desktop (`24px` under 640px), `max-width: 720px`, `z-index: 1` |
| Headline | Two lines, `clamp(40px, 5vw, 76px)`, **400**, `line-height: 1.1`, `letter-spacing: -0.025em`. Line 1 `text-normal`, line 2 `text-muted` — the gray line *is* the subhead. Regular weight is deliberate: the image carries the drama |
| Buttons | `48px` below headline, `gap: 16px`, all size `lg`. **Sign up** = `btn-solid` + trailing arrow. **Log in** = `btn-outline`. **GitHub** = `btn-outline` + leading GitHub mark (optional star-count `.badge`). Under 640px: stacked, full width |

### Scrim

```css
.landing-scrim {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background:
    linear-gradient(to top, var(--color-base-00) 0%, transparent 55%),
    radial-gradient(120% 90% at 0% 100%, rgb(0 0 0 / .45), transparent 60%);
}
```

The scrim fades into `--color-base-00` (dark), so the image melts into the page if content continues below.

### Image direction

- **Cinematic, matte, low-saturation, toned to the palette.** Sepia/stone highlights falling off into charcoal shadows — the image should look like it was printed in `base-*` colors. Shallow depth of field, grainy. Not a bright product screenshot.
- Vision reference: concentric orbital rings with one small subject off-center — scale and motion, lots of negative space for the headline.
- Strongest option: a **blurred, close-up shot of the app itself** — a chat bubble or composer filling the frame, out of focus, with slight chromatic aberration.
- Treatment, applied to the image only:

```css
.landing-image { filter: saturate(.75) contrast(1.05) brightness(.8); }

/* If the "image" is live HTML (e.g. an oversized blurred chat UI) */
.landing-image--ui {
  filter: blur(1.5px) saturate(.8) brightness(.85);
  text-shadow: -1.5px 0 rgb(255 60 60 / .45), 1.5px 0 rgb(60 140 255 / .45);   /* chromatic aberration */
  transform: scale(1.4); transform-origin: 30% 30%;
  pointer-events: none; user-select: none;
}
```

The global grain overlay (§6) already sits on top, so no extra grain on the image.

Scanlines (on in the vision — keep them faint), for a filmic/CRT texture over the image only:

```css
.landing-scanlines {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: .18;
  background: repeating-linear-gradient(to bottom, rgb(0 0 0 / .5) 0 1px, transparent 1px 3px);
}
```

### Display type (grainy hero word)

One huge decorative word spread across the full width (e.g. `C H A T`), sitting **behind** the image subject. It's soft, slightly blurred, glowing at the edges and grainy inside the letterforms. It counts as imagery (principle 7), so the halation and blur are allowed here and nowhere else.

| Property | Spec |
|---|---|
| Content | 3–5 letters, uppercase, decorative. Real content (headline, buttons) stays in the content block |
| Size | `clamp(96px, 16vw, 260px)`, weight 300, `line-height: 1` |
| Spread | Each letter is a `<span>` in a `display: flex; justify-content: space-between` row spanning the hero width, `48px` inset |
| Position | Upper third of the hero, `z-index` between the background image and a cut-out subject (if the image has one); otherwise directly above the scrim |
| Color | `--color-base-100` (dark) at 85% opacity |
| Halation | `text-shadow: 0 0 18px rgb(236 233 226 / .35), 0 0 48px rgb(236 233 226 / .15)` |
| Softness | `filter: url(#grain-type) blur(.6px)` |
| Motion | Blur-in reveal (§10), letters staggered with `--i`. Starts at `blur(24px)` instead of 12px |
| Accessibility | `aria-hidden="true"` — it's decoration |

```html
<!-- once per page -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <filter id="grain-type" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="noise"/>
    <feColorMatrix in="noise" type="saturate" values="0" result="mono"/>
    <feComposite in="mono" in2="SourceGraphic" operator="in" result="grain"/>
    <feBlend in="SourceGraphic" in2="grain" mode="multiply"/>
  </filter>
</svg>

<div class="display-word" aria-hidden="true">
  <span class="reveal" style="--i:0">C</span><span class="reveal" style="--i:1">H</span>
  <span class="reveal" style="--i:2">A</span><span class="reveal" style="--i:3">T</span>
</div>
```

```css
.display-word {
  position: absolute; top: 14%; left: 48px; right: 48px; z-index: 0;
  display: flex; justify-content: space-between; pointer-events: none;
  font: 300 clamp(96px, 16vw, 260px)/1 var(--font-ui); text-transform: uppercase;
  color: rgb(236 233 226 / .85);
  text-shadow: 0 0 18px rgb(236 233 226 / .35), 0 0 48px rgb(236 233 226 / .15);
  filter: url(#grain-type) blur(.6px);
}
.display-word .reveal { display: inline-block; filter: blur(24px); }
.display-word .reveal.is-in { filter: none; }
```

### Don't

- Gradient or metallic text; glow on the headline (halation is for display type only)
- A paragraph of body copy — the headline's gray second line is the only supporting text
- CTAs in the top bar duplicating the hero buttons
- Centered content over the image's focal point — keep it bottom-left, clear of the subject

---

## 13. Usage rules

- [ ] Components use **semantic tokens only** — no hex in component CSS
- [ ] Accent only on: sent bubbles, send button, links, unread dot, focus ring
- [ ] Labeled buttons are ink solid or ink outline — never accent, never translucent
- [ ] `--radius-control: 0` on every control; round only bubbles, avatars, badges
- [ ] No `backdrop-filter`, no UI gradients, no glow
- [ ] Avatars are flat neutral monograms; never colored per user
- [ ] Hairline `--separator` for every divider; no filled divider bands
- [ ] Tight runs (2px), loose speaker changes (12px); tail on last bubble only
- [ ] Sidebar rows always show preview + timestamp
- [ ] Inter actually loads (DevTools → Network → filter "font"); no Segoe UI fallback, no italics
- [ ] Blur-in reveal and display type only on landing/marketing pages, never in the chat UI; both respect reduced motion

> [!question] Open
> - Status colors beyond `--color-danger` (warning / success) → see [[Status Colors]]
> - Read receipts ("Delivered" / "Read" under last sent bubble, 11px `text-muted`) — add when the socket layer supports acks → [[Chat UI]]
> - Landing hero image — pick or shoot the actual image (§12)

#design #tokens #apple #matte