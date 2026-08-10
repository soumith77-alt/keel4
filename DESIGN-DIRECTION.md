# Keel — Signal System redesign

Pre-implementation deliverables. Written against the live local build at
`http://localhost:3000` (commit `32fbba6`), audited at 1440×900 and 390×844.

---

## A. Current-site critique

### What works and must be preserved

- **The token layer is genuinely good.** `globals.css` resolves surfaces and
  foregrounds through theme-scoped CSS variables, so a band inverts by swapping
  one class. The contrast rules (green as fill-only on light, `accent-700` for
  green text on light) are documented and correct. Keep all of it.
- **One structural navy.** `--ink: #0e1836` for every dark field is the single
  best decision in the current build. Keep.
- **`Reveal` is progressive-enhancement-correct** — content is visible without
  JS, hidden only under `html.js`. Most agency sites ship `opacity: 0` in the
  SSR HTML. Keep.
- **Typography.** Clash Display / Inter / JetBrains Mono is the right three-role
  system and is already self-hosted. Keep.
- **Honest proof.** `ProofStrip` cites source projects per number and there are
  no fabricated metrics on the homepage. Keep the discipline.
- **The services tab stage** is structurally the right pattern (30/70 split,
  real `role="tablist"`). Keep the structure, fix the contents.

### What feels generic

- **The hero visual is decoration, not evidence.** The morphing `KeelSystem`
  SVG is a well-made abstract shape, but it shows no input, no decision and no
  outcome. A waveform floating in space is what every voice-AI site ships. It
  fails the brief's central test: a visitor cannot tell what Keel *does* by
  looking at it.
- **Selected Work is three equal cards.** Explicitly the pattern the brief
  rules out. Worse, `object-cover object-top` crops a 1600px-wide dashboard
  into a 4:3 box, so the Football Intelligence OS screenshot — the stated
  visual benchmark — renders as illegible pixel soup.
- **No process section.** "How Keel Thinks" does not exist. There is a
  four-word `ProcessRow` under Services with no artefacts attached, which
  asserts a methodology rather than showing one.
- **The final CTA is another oversized promo headline**, the third H1-scale
  headline in a row, where the brief asks for a compact interactive brief.

### What is inconsistent

- **The signal motif appears twice and never recurs.** Hero, then the
  automation demo. Nothing carries it between sections, so the page reads as
  five unrelated compositions rather than one system.
- **Card content heights don't align.** Football Intelligence OS has no
  `results`, so its card has a hole where the other two have metrics.
- **Section rhythm has no dark/light logic** — light, light, dark, light(raised
  = near-white), light, dark. Two adjacent light-on-light bands
  (`DeliveryTrust` raised → `FeaturedWork` light) read as one unbroken
  1,600px stretch of off-white.

### What is too text-heavy

- `DeliveryTrust`: three headings plus three full sentences plus a lead
  paragraph — 78 words in a band that communicates one idea (you own it).
- Services: `outcomeStatement` for Voice AI is a comma-spliced list of three
  agent types, not a proposition.
- `config/content.ts` project `summary` fields run 85–122 words each. They are
  correctly kept off the cards, but `/work` renders them as walls.

### Where imagery lacks fidelity

- `football-intelligence-os.png` is **1.6 MB, unoptimised PNG**, served through
  a raw `<img>` with no `srcset`, no width/height, cropped to 4:3. This is
  simultaneously the worst performance offender and the least legible asset.
- Four of eight projects have no image at all and fall back to the abstract
  system object, so one row of work is visibly lower-fidelity than the next.
- No project has a mobile-specific crop; dense dashboards are shown at 390px
  in the same 4:3 frame as desktop.

### Where spacing and alignment fail

- **Hero, desktop:** content occupies the top ~45% of a `min-h-[92svh]` band.
  The bottom 380px is empty. The left column ends at the tab bar while the
  waveform is vertically centred, so nothing aligns across the gutter.
- **Hero, mobile:** a 112px fixed-height label box, then a gap, then the CTA,
  then a 17rem square object with dead space above and below it. Three separate
  voids in one screen.
- **Services stage, desktop:** the tab rail is 5 × ~52px = 260px inside a
  `min-h-[34rem]` panel — 285px of empty navy below "05 SaaS Products".
- **Proof strip:** `min-h-[10rem]` items containing ~90px of content, inside
  `py-28`. The band is half empty.
- **`DeliveryTrust` heading** wraps to five ragged lines in a `0.72fr` column.

### Accessibility defects found

- **Voice demo transcript animates to `opacity: 0.18`** — muted grey on navy at
  roughly 1.4:1. Future transcript lines are effectively invisible, and the
  demo conveys its meaning purely through motion.
- The services tab rail selects on `onPointerEnter` **and** `onFocus`, so
  tabbing through changes the panel on every stop; there is no arrow-key
  roving-tabindex pattern.
- Mobile drawer does not lock background scroll and does not return focus.
- Hero tabs are `role="tab"` without a `tabpanel`, and the only accessible name
  is an `sr-only` span.

### Sections that are unnecessarily long

- Hero (92svh for one headline and one label).
- Proof strip (`py-28` for four numbers).
- Services (34rem panel + a detached process row that belongs elsewhere).

---

## B. Creative direction

### Recommended route — **Signal Editorial**

Keel's work is invisible: a call that got answered, a lead that got routed, an
agent that made a decision. The site's job is to make the invisible legible.

So the site is built as **an instrument panel wrapped in an editorial page.**
Large editorial typography and fine rules carry the argument; inside them sit
*real system readouts* — traces, transcripts, state rows, run logs. The green
signal is never ornament: it is always **the thing currently happening**.

**The three rules that define the system:**

1. **A signal is a green mark on a navy path.** Never a glow, never a particle,
   never an orb. A 2px rule, a 6px dot, a filled bar, a lit row.
2. **Every path has named stops.** A signal only travels between labelled
   states: `SIGNAL → CONTEXT → DECISION → ACTION → OUTCOME`. Same five words
   everywhere on the site, for every service. That repetition is the brand.
3. **The readout must survive the animation being switched off.** Every trace
   renders complete and legible with `prefers-reduced-motion`. Motion reveals
   order, never content.

### Alternative route — **Obsidian Lab** (not recommended)

Invert the page: navy as the dominant canvas, off-white reserved for evidence
panels, green as the only light source. Reads as more "AI lab", photographs
well, and makes screenshots pop. Rejected because (a) it discards the warm
off-white the brief asks to preserve, (b) dark-dominant is the *default* AI
agency look the brief rules out, and (c) Keel's real assets are already dark
dashboards — on a navy page they lose all separation.

### Color system

Unchanged in substance; formalised in distribution.

| Role | Token | Value | Share |
|---|---|---|---|
| Canvas | `--canvas` | `#f2f2f0` | ~70% |
| Ink / dark bands | `--ink` | `#0e1836` | ~20% |
| Signal | `accent-500` | `#00c776` | ~8% (fill on light, text on navy) |
| Signal, text on light | `accent-700` | `#00794a` | — |
| Technical accent | `--technical` | `#3d6bff` cobalt | ~2% |

The cobalt is **new and deliberately rationed**: it marks *inputs the system
received* — the caller, the visitor, the brief — while green marks *what the
system did about it*. Two-colour semantics inside a trace, capped at focus
rings, input rows and technical annotations. It never fills an area.

### Typography direction

Unchanged roles, tightened use.

- **Clash Display** — headlines, service names, project titles. Nothing else.
- **Inter** — body, navigation, buttons.
- **JetBrains Mono** — the *system voice*: step labels, state names, payload
  lines, metrics, timestamps, project metadata. Mono is how the machine speaks;
  it must never be used for a human sentence.
- **New: one editorial serif moment.** A single italic serif word in the
  process section (`Diagnose` → the word "why"). One instance, site-wide.

### Image treatment

- Every project image sits in a **contained frame**: `object-contain` on a
  navy inner surface with 4–6% padding, fixed `16/10` desktop / `4/3` mobile.
  Dense dashboards stay legible; nothing is cropped through UI text.
- `object-cover` only where the crop is a deliberate composition (hero-scale
  chapter images with a stated focal point).
- Explicit `width`/`height` on every image. `sizes` on every responsive image.
  The 1.6 MB PNG is converted to WebP at two widths.
- Projects without a real asset render a **labelled system diagram**, not a
  fake screenshot — and it is captioned as a diagram so it can't be mistaken
  for a product shot.

### Motion rules

| Tier | Duration | Easing | Used for |
|---|---|---|---|
| Scene | 600–800ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Section entrance, band inversion, chapter change |
| Component | 320–450ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Service switch, trace step, tab morph, blur transition |
| Micro | 140–220ms | `cubic-bezier(0.32, 0.72, 0, 1)` | Hover, arrow, focus, underline |

Standing rules: no spring bounce above `damping: 26`; no continuous animation
outside the viewport; signal loops pause on `visibilitychange`; every trace has
a complete static state.

### Example section compositions

```
HERO                    ┌ 5 cols ─────────┬ 7 cols ────────────────────┐
                        │ eyebrow          │ ┌ SYSTEM CONSOLE ───────┐ │
                        │ H1 (2 lines)     │ │ [voice|auto|video|…]  │ │
                        │ support line     │ ├───────────────────────┤ │
                        │ CTA  CTA         │ │ ● SIGNAL   payload    │ │
                        │                  │ │ │ CONTEXT  payload    │ │
                        │                  │ │ │ DECISION payload    │ │
                        │                  │ │ │ ACTION   payload    │ │
                        │                  │ │ ○ OUTCOME  payload    │ │
                        │                  │ └───────────────────────┘ │
                        └──────────────────┴───────────────────────────┘

WORK CHAPTER            ┌ 7 cols ──────────────┬ 5 cols ───────────────┐
                        │ ┌ contained frame ─┐ │ 01 / SAAS / 2026      │
                        │ │  real screenshot │ │ Football Intelligence │
                        │ │  object-contain  │ │ ─────────────────     │
                        │ └──────────────────┘ │ CHALLENGE  one line   │
                        │                      │ SYSTEM     one line   │
                        │                      │ STATUS     Built      │
                        │                      │ → Case study          │
                        └──────────────────────┴───────────────────────┘
                        (alternates side on the next chapter)
```

---

## C. Homepage wireframe

| # | Section | Height (desktop / mobile) | Tone | Content | Interaction |
|---|---|---|---|---|---|
| 1 | Nav | 72px sticky | transparent → surface | wordmark, 4 links, Book a call | opaque after 24px; mobile drawer with scroll-lock + focus return |
| 2 | Hero | ~86svh / auto | light | eyebrow, H1, one support line, 2 CTAs, System Console | console auto-runs; 5-way segmented control; pauses when offscreen or hidden |
| 3 | Proof rail | ~340px / auto | dark | 4 rows: PROJECT · SYSTEM · OBSERVABLE · STATUS | signal rule draws left→right on entry; rows link to work |
| 4 | Services stage | ~720px / auto | dark | 5-item rail, one proposition, 3 capabilities, live demo, service CTA | desktop: click/arrow-key rail (no hover-select); mobile: scroll-snap segmented selector, one panel |
| 5 | Selected work | 3 × ~560px / 3 × auto | light | 3 chapters, alternating; contained frame; challenge / system / status | image reveal on entry; annotation dots on desktop, listed below on mobile |
| 6 | How Keel Thinks | ~640px / auto | dark | 01 Diagnose · 02 Model · 03 Build · 04 Measure, each with an artefact | steps reveal on entry; artefacts are static readouts |
| 7 | Trust & capability | ~380px / auto | raised | 3 handoff commitments (compressed), integration surface list | none — static, updateable from the data layer |
| 8 | Final brief | ~420px / auto | brand navy | "What should your next system improve?" · 5 chips · one line · 2 actions | chip select + validated input → `/contact` prefilled |
| 9 | Footer | existing | light | unchanged | — |

**Mobile deltas:** hero console drops to a single-column trace with the
selector as a scroll-snap row above it; work chapters stack image-then-meta with
annotations as a list; process artefacts become full-width; the brief's chips
wrap to two rows at 44px minimum.

---

## D. Component shortlist

| Component | Inspiration | Purpose | Customisation | Desktop | Mobile | Perf risk | A11y fallback |
|---|---|---|---|---|---|---|---|
| `SystemConsole` (hero) | Manus product-in-hero | Show input→outcome for 5 services | Keel navy panel, mono payloads, green marker; no chrome dressing | auto-run + segmented switch | trace below copy, selector scroll-snaps | **Low** — DOM + CSS, no canvas/WebGL | all 5 rows render lit and complete under reduced motion; `aria-live="polite"` on the active step |
| `SignalRail` | Motion Primitives in-view | The recurring motif | 1px rule + green segment, `IntersectionObserver`, no library | draws on entry | draws on entry, shorter | Low | decorative, `aria-hidden`; never carries information |
| `ServiceStage` (existing, reworked) | 21st.dev tabs | One active service | fix contrast; roving tabindex; progressive-blur on switch | click + ←/→ keys | segmented control, one panel | Low | full `tablist`/`tabpanel` wiring; blur is CSS-only and drops out under reduced motion |
| `WorkChapter` | Awwwards editorial case study | Make work the protagonist | contained frame, alternating sides, mono metadata rail | hover annotation dots | annotations listed below image | Medium — large images; mitigated by WebP + `sizes` + `loading="lazy"` | annotations are real list items, not tooltips |
| `ProcessLog` | build-log / changelog | Prove methodology | 4 steps, each with a working artefact panel | sticky left rail, steps light in | stacked, artefact full width | Low | steps are `<ol>`; artefacts are static SVG/DOM |
| `ProofRail` (rework) | editorial data table | Attributable evidence | table semantics, status vocabulary, no invented numbers | 4 rows, rules between | 2-line rows | None | real `<table>`/`<dl>` semantics |
| `BriefForm` | Flowbite form states | Compact qualified intake | 5 chips + 1 field + 2 actions; posts to `/contact` prefilled | inline row | stacked, 44px targets | None | `<fieldset>/<legend>`, `aria-describedby` errors, `aria-invalid`, visible focus |
| `MobileDrawer` (rework) | Mobbin / Flowbite | Access without friction | scroll-lock, Esc close, focus return | n/a | full-height drawer | None | focus returns to trigger; `inert` background |

**Explicitly not building:** WebGL/shader hero, custom cursor, scroll-hijack,
preloader, marquee, particle field. None of them pass §16 of the brief.

---

## E. Implementation plan

### Files changed

- `app/globals.css` — add `--technical` cobalt, motion tier tokens, signal
  keyframes, `.type-mono-sm`, remove `.gradient-orb`.
- `tailwind.config.ts` — expose `technical`, add the micro easing curve.
- `components/Hero.tsx` — rewritten around `SystemConsole`.
- `components/ui/services.tsx` — contrast fix, roving tabindex, mobile
  selector, remove the detached `ProcessRow`.
- `components/FeaturedWork.tsx` — rewritten as chapters.
- `components/ProofStrip.tsx` — rewritten as a rail.
- `components/DeliveryTrust.tsx` — compressed.
- `components/CTA.tsx` — replaced by the brief form.
- `components/ServiceDemos.tsx` — transcript opacity floor, waveform contrast.
- `components/Navbar.tsx` — drawer scroll-lock, Esc, focus return.
- `components/ContactForm.tsx` — read `?focus=` / `?note=` prefill.
- `app/page.tsx` — new section order.
- `config/content.ts` — add `challenge` / `systemBuilt` / `status` per project.

### New components

`components/SystemConsole.tsx`, `components/ui/signal-rail.tsx`,
`components/WorkChapters.tsx`, `components/ProcessLog.tsx`,
`components/BriefForm.tsx`, `components/ui/segmented.tsx`.

### Assets required

- `football-intelligence-os.webp` at 1600w and 800w (from the existing 1.6 MB
  PNG). **Blocking for the performance target.**
- Real interface stills for Oxacan and RFQ automation — *not blocking*; those
  projects render a labelled diagram until assets exist.

### Dependencies

None added. Framer Motion 11 and `ogl` are already present; `ogl` is unused on
the homepage and stays that way.

### Risk areas

1. **Static export.** `next.config.mjs` + `wrangler.jsonc` mean no server
   actions — the brief form must resolve client-side. Mitigation: prefill and
   hand off to `/contact`.
2. **Hero console timers.** Must pause on `visibilitychange` and when
   offscreen, or they burn CPU on a background tab.
3. **Image regression.** `object-contain` on a fixed frame can letterbox badly
   at some ratios; each frame gets a per-project ratio.
4. **Reduced motion.** The console is the main content of the hero — its static
   state has to be designed, not derived.

### Testing strategy

Playwright screenshots at 320 / 360 / 390 / 430 / 768 / 1280 / 1440; keyboard
walk of nav, service rail and brief form; `prefers-reduced-motion` run;
Lighthouse on the production build.

### Order

**A** tokens → **B** `SystemConsole` + `ServiceStage` + mobile fallbacks →
**C** work chapters, proof rail, process log → **D** brief form, nav,
`/services` and `/work` alignment → **E** responsive, a11y and performance
audits.

---

## F. QA evidence

Measured against the built static export (`npm run build` → `out/`) served with
compression, which is how Cloudflare serves it. Measuring the same build over
an uncompressed `python -m http.server` scores Performance 69 — that number is
an artefact of the test server, not the site, and is recorded here so nobody
re-discovers it and starts optimising the wrong thing.

### Lighthouse (mobile preset unless noted)

| Route | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 95 | 100 | 100 | 100 | 2.9s | 0 | 0ms |
| `/` (desktop) | 100 | 100 | 100 | 100 | — | 0 | — |
| `/work` | 96 | 100 | 100 | 100 | 2.7s | 0 | 0ms |
| `/services` | 95 | 100 | 100 | 100 | 2.9s | 0 | 0ms |
| `/contact` | 96 | 100 | 100 | 100 | 2.7s | 0 | 0ms |
| `/about` | 92 | 100 | 100 | 100 | 3.3s | 0 | 0ms |
| `/services/voice-ai` | 91 | 100 | 100 | 100 | 3.6s | 0 | 20ms |

All targets met: Performance 90+, Accessibility 95+, Best practices 95+,
SEO 95+.

### Responsive

Captured at 320 / 360 / 390 / 430 / 768 / 1280 / 1440. At every width:
no horizontal overflow (`scrollWidth === clientWidth`), no console errors,
and no interactive control below the 44px touch minimum. The only sub-44px
element flagged is the brief form's *text label*, which is not a target — the
input it labels is 56px and tapping the label focuses it.

### Accessibility notes

- Automated: axe (via Lighthouse) reports zero violations on every route.
- Keyboard: the hero console and the service rail are roving-tabindex
  tablists — one tab stop, arrows/Home/End to move, and selection no longer
  follows focus. Verified: `ArrowRight` on the console moves both selection
  and focus to the next service.
- Mobile drawer: verified that `body` overflow is `hidden` while open, that
  `Escape` closes it, and that focus returns to the "Open menu" trigger.
- Brief form: submitting empty announces "Choose what your next system should
  improve." via `role="alert"` and moves focus to the first radio. Fields are
  `aria-invalid` + `aria-describedby`-linked to the message.
- Contrast: `--fg-subtle` was **failing at 4.29:1** across eleven elements and
  is now `#626879` (4.96:1). The voice-demo transcript was failing at 2.67:1
  and no longer dims text with opacity at all — pending/spoken is carried by
  colour (5.7:1 → 12.2:1).
- Structure: fixed a malformed `<dl>` in `ProjectCard` (a loose `<span>` beside
  an `sr-only` `<dt>`) that was breaking the accessibility tree for all of
  `/work`, and added the skipped `<h2>` on `/work` and `/services`.

### Reduced motion

With `prefers-reduced-motion: reduce`, a DOM sweep for text that is
`visibility: hidden` or below 0.5 opacity returns **nothing** — every heading,
paragraph, list item and control is present and legible. Specifically:
the hero console renders the full trace with the header reading `COMPLETE`
instead of `LIVE`; the signal rules render drawn; the waveform paints one
static frame; the WebGL orb on `/services/voice-ai` never mounts and its
static ring fallback is shown instead.

### Genuine proof assets still required

1. **Interface stills for Oxacan and RFQ automation.** They currently render a
   labelled system diagram captioned "interface assets pending", which is
   honest but visibly lower fidelity than the three chapters above them.
2. **Named client permission.** Trust currently lists *categories* of
   deployment surface. Named integrations or logos need written permission.
3. **Measured outcomes.** Every figure on the page today is a count of things
   done (institutions audited, call minutes crawled, trades covered). There is
   no conversion, revenue or time-saved figure anywhere, because none has been
   measured. Do not add one without a source.

### Must not reach production without a decision

1. **`status` per project is unverified.** "Built", "Built · 39 institutions
   audited", "In development" were inferred from each project's written
   summary. Someone who knows the engagements has to confirm each one — these
   are the only claims on the page I could not verify from the repository.
2. **`NEXT_PUBLIC_FORM_ENDPOINT` is unset.** With it set, the contact form
   POSTs there. Without it, the form composes a `mailto:` to hello@saykeel.com
   and says so. Either path delivers; the previous behaviour (`console.log`
   plus a success message) did not, and silently discarded every enquiry.
3. **`config/content.ts` still exports placeholder `testimonials`** (Sarah
   Chen, Michael Rodriguez, Emily Watson). Nothing renders them any more, but
   they are fabricated and should be deleted rather than left to be picked up
   by a future component.
4. **`faqs` claims "clients typically see 30 to 50% improvements".** That is a
   performance claim with no source, and it is live on `/contact` today. It is
   outside the homepage scope of this pass but it fails the same test
   everything else on the page was held to.

---

# v2 — KEEL SIGNAL / EDITORIAL SYSTEMS STUDIO

v1 fixed the content and the credibility but kept the visual grammar: warm-white
grid, left headline, dark dashboard right, pale green glow, repeated for seven
sections. v2 recomposes the page from the hero outward.

## The scene sequence

| # | Section | Environment | Shape |
|---|---|---|---|
| 1 | Hero | **obsidian** `#070b18` | full-viewport signal field; fragments distributed, path behind the type |
| 2 | Proof | paper | four figures on one rule, evidence folded behind a disclosure |
| 3 | Services | paper | oversized type index; stage bleeds off the right edge |
| 4 | Work 01 | **obsidian** | sticky metadata, interface off the right edge |
| 5 | Work 02 | paper | image full width, facts in a row underneath |
| 6 | Work 03 | paper | interface off the **left** edge, narrow metadata right |
| 7 | Process | navy band | one horizontal signal through four stages |
| 8 | Handoff | paper | three assurances + capability chips |
| 9 | Brief | **obsidian** | closes the loop with the hero |

Three distinct dark values now do three different jobs: obsidian `#070b18` is an
environment you are inside, navy `#0e1836` is a band cut into the page, and the
same navy as ink is type on paper. Previously every dark thing was one value.

## Rejected on purpose

Liquid metal, background beams, particle fields, animated grids, cursor trails,
number tickers, 3D globes, glass panels, a WebGL hero. The hero's atmosphere is
canvas 2D — no new dependency, no shader compile on the critical path, no
WebGL-unavailable branch to design around, and contour lines read as survey
rather than as a gradient blur.

## Dependencies

None added. None removed (`ogl` still powers the voice-agent orb on
`/services/voice-ai`).

---

# v3 — CORRECTION PASS

A focused correction against a visual review of v2. Four problems, all real.

## 1. The hero was withholding information

**What was wrong.** The hero animated Signal → Context → Decision → Action →
Outcome at 1.4s a step and then auto-rotated to the next service. A visitor who
arrived and scrolled within five seconds — most of them — never reached an
outcome, saw four of five states dimmed, and left believing Keel sells
appointment booking. The hero's meaning depended on the visitor standing still.

**What it is now.**

| Before | After |
|---|---|
| Five states revealed over 7s | All five render complete on frame one |
| Auto-rotation every ~8s | Rotation removed; service changes only on selection |
| Five outlined boxes of equal weight | Three objects: input, transformation area, outcome |
| Inactive states dimmed to low contrast | Nothing is ever dimmed |
| Motion carried the meaning | Motion is one green signal on a 3s circuit; it reveals nothing |

Service switching completes in ~320ms. One spring set drives both the object
positions and the SVG path, so the line stays attached to the boxes through the
transition. Mobile gets a purpose-built card — input → system action → outcome —
with the full five states behind a disclosure, not a shrunk desktop diagram.

## 2. Typography is now one system

Four families were in use — Clash Display, Inter, JetBrains Mono, and (by
accident, because `tailwind.config.ts` declared no `serif` key) the browser
default serif for the word "compound".

Now three, all self-hosted via `next/font`:

- **Instrument Sans** — navigation, headings, body, buttons, controls
- **Instrument Serif** — one expressive phrase per major page, nothing else
- **IBM Plex Mono** — metadata, state labels, step numbers

Ten fluid `clamp()` roles live in `:root` as `--text-*` and are consumed by
`.type-*` utilities. Line height and tracking are bound to the role. Every
literal `text-[2.9rem]`-style size in site typography is gone.

Small-screen floors: the three largest roles drop below 480px. That is a
measurement, not taste — at the 3.75rem display-xl floor the homepage headline
overflowed a 320px column.

## 3. Selected Work is one system with two patterns

Was three bespoke compositions; the IVR → Artizyn seam opened into most of an
empty viewport and the same three facts appeared in three different places.

One `ProjectChapter` component. **Pattern A** (featured, once): metadata and
title above a full-width 16:9 stage, facts in a strip beneath. **Pattern B**
(standard): 40/60 information and media, sides alternating, 16:10. Shared:
chapter padding `clamp(5rem, 9vw, 9rem)`, the metadata line, the fact structure,
the CTA, and the mobile order — title → visual → facts, on every project.

Ratios are tokens (`aspect-project-featured|standard|mobile`). Every stage is
`object-contain` with fluid internal padding; phones get 4:3 because at 16:9 a
1536px dashboard renders too small to read its own labels. Variation is limited
to the surface a chapter sits on and how its frame is lit — no new palettes.

## 4. One website, not five

- **About** dropped its own design language entirely: shared type roles, shared
  section rhythm, shared borders and labels, and one expressive serif moment
  ("a number") matching the homepage's "compound".
- **`<FinalCTA>`** replaces three divergent copies (homepage-adjacent, About,
  service pages). One band, one set of tokens, one piece of copy. The entry is
  prepared with a green hairline and a tonal step rather than a one-pixel cut
  from off-white to navy.
- **WhatsApp** is now navy with a Keel-green hairline. `#25D366` on a 56px
  circle was the most saturated thing on the site by a wide margin.
- **Navigation** has three verified states: dark-overlay over the obsidian hero,
  light on interior pages, warm-white once scrolled.

## Verified

Build ✓ · lint ✓ (0 warnings) · typecheck ✓ · zero dependencies added or removed.

Eight breakpoints (320→1440) × six routes: no horizontal overflow, no console
errors, no interactive target under 44px, nothing hidden. Reduced motion: 0
hidden elements, `signal-travel` disabled. Keyboard verified on hero modes and
the service index.

| Route | Perf | A11y | BP | SEO | CLS |
|---|---|---|---|---|---|
| `/` | 95 | 100 | 100 | 100 | 0 |
| `/services` | 94 | 100 | 100 | 100 | 0 |
| `/work` | 97 | 100 | 100 | 100 | 0 |
| `/about` | 93 | 100 | 100 | 100 | 0 |
| `/contact` | 96 | 100 | 100 | 100 | 0 |
| `/services/voice-ai` | 92 | 100 | 100 | 100 | 0 |

---

# v4 — EDITING PASS

Not new components. Fewer words, fewer type treatments, less empty space,
one system across every route.

## Hero

| | Before | After |
|---|---|---|
| First paint | Objects at `opacity: 0`, positions unknown until a JS measure ran — the hero loaded blank | Server-rendered HTML *is* the finished composition. No measurement, no absolute positioning, no entrance animation |
| Composition | Three panels scattered across a 92svh field | One system **row**: input → transformation area → outcome, in normal flow |
| Height | 92svh + 60rem cap | 70svh, ~24% shorter |
| Legibility | 13px payloads, 11px state labels | Body copy and the shared label role |
| Mobile selector | Horizontal scroller clipping "Web" and "SaaS" | 3+2 grid, all five visible |
| Headline | Sans with one italic serif word | All sans |

## Typography

**Instrument Serif is gone.** It was carrying three words on the whole site —
"compound", "a number", "something". Three exceptions is not a system, and
against a serif wordmark it read as a third unrelated voice. Two families now:
Instrument Sans for all reading, IBM Plex Mono for machine voice. Emphasis is
size, weight and colour.

The scale's spread went from ~10:1 to ~7:1 — display down from 7rem, the mono
label role up from 11px to 12–13px. Both ends were wrong in the same way.

## Selected Work

The two-pattern system collapsed to **one**. The "featured" full-width
treatment made the first project read as substantially more premium than the
other two, which is a ranking nobody asked for. Every chapter is now 40/60
alternating with a 16:10 stage, `object-contain`, identical facts and CTA.
Chapter padding down from 80–144px to 56–96px. The clip-path reveal on media
is removed — a fade that catches a screenshot mid-transition makes the product
look worse than no fade.

**`/work` now uses the same `<ProjectChapter>`.** It was the last page still
running the old website: a grid of white cards showing the same projects in a
different visual language.

## `/services` and `/about`

`/services` cards → five compact rows. The card imagery was ranking the
services: Voice had a rendered orb, Automation a real screenshot, and the other
three had stock art. Rows give all five identical weight.

`/about` merged its three principles and four commitments into four — the two
lists said the same things twice ("Move in weeks" beside "Fast deployment").
It gained one honest visual: the same system diagram the work chapters fall
back to, not a stock photo of people who do not work here.

## Global

- `[id] { scroll-margin-top: 6rem }` declared once, so no anchor can land under
  the fixed bar again.
- Phone section padding down ~25%.
- Proof rail is 2×2 from the smallest screen — four short figures were taking a
  near-full viewport.
- WhatsApp down to 44px with more edge clearance.

## Two defects found while measuring

1. **`/work` returned a 500.** `chapterEnv` was exported from a `'use client'`
   module and imported by a server component — a non-component export crossing
   that boundary arrives as a client *reference*, not a function. Moved to
   `config/content.ts`.
2. **The travelling signal animated `left`**, forcing a layout on every frame of
   a 3s infinite loop. Measured **460ms TBT** on `/`. Rewritten as
   transform-only: **20ms**.

Also caught: unselected service titles measured 4.46:1. They passed before as
*large* text; `type-h3` now starts at 23.2px, under the 24px threshold, so the
4.5:1 bar applies. Now 6.2:1.

## Verified

Build ✓ · lint ✓ · typecheck ✓ · zero dependencies added.
Eight breakpoints × six routes: no overflow, no console errors, no sub-44px
target, nothing hidden. Reduced motion: 0 hidden elements.

| Route | Perf | A11y | BP | SEO | CLS | TBT |
|---|---|---|---|---|---|---|
| `/` | 90–95 | 100 | 100 | 100 | 0 | 10–120ms |
| `/services` | 98 | 100 | 100 | 100 | 0 | 0 |
| `/work` | 96 | 100 | 100 | 100 | 0 | 0 |
| `/about` | 94 | 100 | 100 | 100 | 0 | 0 |
| `/contact` | 97 | 100 | 100 | 100 | 0 | 10ms |
| `/services/voice-ai` | 92 | 100 | 100 | 100 | 0 | 0 |
