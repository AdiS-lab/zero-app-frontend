---
title: Design System
aliases: [design, design tokens, theme]
tags: [design, tokens, theme, obsidian]
cssclasses: [design-doc]
created: 2026-10-08
updated: 2026-10-08
status: active
---

# Design System

> [!abstract] Summary
> Neutral grayscale base (`base-00` → `base-100`) with a single violet accent, `hsl(258 88% 66%)` / `#8a5cf5`. Every surface, border and text color comes from the base scale; the accent is reserved for interaction and focus. Light and dark themes share the same token names — only the values flip.

Related: [[Typography]] · [[Components]] · [[Layout]]

---

## 1. Base scale

| Token | Light | Dark | Role |
|---|---|---|---|
| `--color-base-00` | `#ffffff` | `#1c1c1c` | Primary background |
| `--color-base-05` | `#fcfcfc` | `#212121` | Raised surface |
| `--color-base-10` | `#fafafa` | `#232323` | Alt background |
| `--color-base-20` | `#f6f6f6` | `#282828` | Secondary background (sidebars) |
| `--color-base-25` | `#efefef` | `#2e2e2e` | Hover fill |
| `--color-base-30` | `#e4e4e4` | `#333333` | Border |
| `--color-base-35` | `#dadada` | `#3f3f3f` | Border (hover) |
| `--color-base-40` | `#bdbdbd` | `#555555` | Border (focus), disabled |
| `--color-base-50` | `#ababab` | `#666666` | Faint text, placeholders |
| `--color-base-60` | `#707070` | `#999999` | Icons |
| `--color-base-70` | `#5c5c5c` | `#b3b3b3` | Muted text |
| `--color-base-100` | `#222222` | `#dadada` | Normal text |

> [!tip] Rule of thumb
> Surfaces live in **00–25**, borders in **30–40**, text in **50–100**. Never skip across groups (e.g. don't use `base-60` as a background).

---

## 2. Accent

| Variable | Default | Description |
|---|---|---|
| `--accent-h` | `258` | Accent hue |
| `--accent-s` | `88%` | Accent saturation |
| `--accent-l` | `66%` | Accent lightness |

| Token | Light | Dark | Use |
|---|---|---|---|
| `--color-accent` | `#8a5cf5` | `#8a5cf5` | Links, primary buttons, focus rings, active states |
| `--color-accent-1` | `#9873f7` | `#a68af9` | Hover |
| `--color-accent-2` | `#a68af9` | `#c5b6fc` | Active / pressed |

> [!info] Derived shades
> `accent-1` and `accent-2` are computed from the HSL vars, so changing `--accent-h/s/l` re-themes everything. Hex values above are for the defaults.
> - Light: `accent-1` = h −1, s ×1.01, l ×1.075 · `accent-2` = h −3, s ×1.02, l ×1.15
> - Dark: `accent-1` = h −3, s ×1.02, l ×1.15 · `accent-2` = h −5, s ×1.05, l ×1.29

> [!warning] Accent is not decoration
> Use the accent only where something is clickable, selected, or focused. No accent backgrounds on large areas, no accent body text.

---

## 3. Semantic tokens

Components reference these — never the raw base values.

| Semantic token | Maps to | Notes |
|---|---|---|
| `--background-primary` | `base-00` | Main canvas |
| `--background-primary-alt` | `base-10` | Code blocks, inputs |
| `--background-secondary` | `base-20` | Sidebars, panels |
| `--background-modifier-hover` | `base-25` | Row / item hover |
| `--background-modifier-border` | `base-30` | Default borders, dividers |
| `--background-modifier-border-hover` | `base-35` | |
| `--background-modifier-border-focus` | `base-40` | Non-accent focus |
| `--text-normal` | `base-100` | Body |
| `--text-muted` | `base-70` | Secondary text, labels |
| `--text-faint` | `base-50` | Placeholders, metadata |
| `--icon-color` | `base-60` | |
| `--text-accent` | `accent` | Links |
| `--text-accent-hover` | `accent-1` | |
| `--interactive-accent` | `accent` | Primary button fill |
| `--interactive-accent-hover` | `accent-1` | |
| `--text-on-accent` | `#ffffff` | Text on accent fills |

---

## 4. Implementation

```css
:root {
  --accent-h: 258;
  --accent-s: 88%;
  --accent-l: 66%;
}

/* Light (default) */
:root,
.theme-light {
  --color-base-00:  #ffffff;
  --color-base-05:  #fcfcfc;
  --color-base-10:  #fafafa;
  --color-base-20:  #f6f6f6;
  --color-base-25:  #efefef;
  --color-base-30:  #e4e4e4;
  --color-base-35:  #dadada;
  --color-base-40:  #bdbdbd;
  --color-base-50:  #ababab;
  --color-base-60:  #707070;
  --color-base-70:  #5c5c5c;
  --color-base-100: #222222;

  --color-accent:   hsl(var(--accent-h), var(--accent-s), var(--accent-l));
  --color-accent-1: hsl(calc(var(--accent-h) - 1), calc(var(--accent-s) * 1.01), calc(var(--accent-l) * 1.075));
  --color-accent-2: hsl(calc(var(--accent-h) - 3), calc(var(--accent-s) * 1.02), calc(var(--accent-l) * 1.15));
}

/* Dark */
.theme-dark {
  --color-base-00:  #1c1c1c;
  --color-base-05:  #212121;
  --color-base-10:  #232323;
  --color-base-20:  #282828;
  --color-base-25:  #2e2e2e;
  --color-base-30:  #333333;
  --color-base-35:  #3f3f3f;
  --color-base-40:  #555555;
  --color-base-50:  #666666;
  --color-base-60:  #999999;
  --color-base-70:  #b3b3b3;
  --color-base-100: #dadada;

  --color-accent:   hsl(var(--accent-h), var(--accent-s), var(--accent-l));
  --color-accent-1: hsl(calc(var(--accent-h) - 3), calc(var(--accent-s) * 1.02), calc(var(--accent-l) * 1.15));
  --color-accent-2: hsl(calc(var(--accent-h) - 5), calc(var(--accent-s) * 1.05), calc(var(--accent-l) * 1.29));
}

/* Semantic layer — shared by both themes */
:root, .theme-light, .theme-dark {
  --background-primary:               var(--color-base-00);
  --background-primary-alt:           var(--color-base-10);
  --background-secondary:             var(--color-base-20);
  --background-modifier-hover:        var(--color-base-25);
  --background-modifier-border:       var(--color-base-30);
  --background-modifier-border-hover: var(--color-base-35);
  --background-modifier-border-focus: var(--color-base-40);

  --text-normal: var(--color-base-100);
  --text-muted:  var(--color-base-70);
  --text-faint:  var(--color-base-50);
  --icon-color:  var(--color-base-60);

  --text-accent:              var(--color-accent);
  --text-accent-hover:        var(--color-accent-1);
  --interactive-accent:       var(--color-accent);
  --interactive-accent-hover: var(--color-accent-1);
  --text-on-accent:           #ffffff;
}
```

> [!note] Theme switching
> Toggle by swapping `.theme-light` / `.theme-dark` on `<body>`. To follow the OS, wrap the dark block in `@media (prefers-color-scheme: dark)`.

---

## 5. Usage rules

- [ ] Components use **semantic tokens only** — no hex values, no raw `base-*` in component CSS
- [ ] One accent per view for the primary action; secondary actions stay neutral (`base-25` fill, `base-30` border)
- [ ] Focus: `2px` outline in `--color-accent`
- [ ] Hover: neutral elements → `--background-modifier-hover`; accent elements → `--color-accent-1`
- [ ] Pressed / active: `--color-accent-2`
- [ ] Borders are `1px` `--background-modifier-border`; hairlines only, no shadows for separation

> [!question] Open
> - Status colors (error / warning / success) not defined yet → see [[Status Colors]]
> - Contrast check `text-faint` on `background-secondary` in light mode (`#ababab` on `#f6f6f6` is below 4.5:1 — keep it for non-essential metadata only)

#design #tokens