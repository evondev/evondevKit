# evondevKit

**English** | [Tiếng Việt](README.vi.md)

A **`ui-ux`** skill for Claude Code: builds and polishes app UIs (dashboards, lists, tables,
forms, settings, modals) using your project's own component library and colors.

Overview: [evondev-uiux.vercel.app/en/ui-ux](https://evondev-uiux.vercel.app/en/ui-ux)

> **Beta.** Works well for light-theme app UIs: tested on 70 prompts across real projects.
> Most testing so far used Vietnamese prompts. English prompts follow the same flow but have
> had less testing. Currently testing: adding dark mode to existing apps.
> The skill keeps changing as tests come in; get the latest with
> `/plugin marketplace update evondevkit`. To hear about new versions, click
> **Watch → Custom → Releases** on GitHub. Each release has a few lines on what changed in
> [Releases](https://github.com/evondev/evondevKit/releases).
>
> The skill isn't perfect. It does its best within its own set of rules. Taste varies, and
> every project has its own quirks: after it builds, tweak by hand or ask your AI to adjust.
>
> If something looks off, [open an issue](https://github.com/evondev/evondevKit/issues) with a
> link or screenshot of the screen and the prompt you used.

## Install

```bash
/plugin marketplace add evondev/evondevKit
/plugin install evon@evondevkit
```

Invoke with `/evon:ui-ux`. Update: `/plugin marketplace update evondevkit`.

To skip the update command: `/plugin` → Marketplaces → `evondevkit` → Enable auto-update.
Claude Code then pulls the latest version every time it starts.

## Usage

By default the skill works like a designer: **brief → you approve → 2–3 wireframes → you pick →
build**. Same in English or Vietnamese. To take a different path, say so in the prompt:

| You want | Type | The skill |
| --- | --- | --- |
| Build or redo a screen (default) | `/evon:ui-ux Build an orders list: order ID, customer, total, status.` or `/evon:ui-ux Redesign the jobs page.` | Brief → you approve → 2–3 wireframes → you pick (e.g. `C + D`) → builds. Wireframes have a top bar: toggle color, try accent colors, preview mobile (☰ is clickable, bottom bar when there are few items), preview empty / error states, read pros and cons, copy a feedback line. Reply `ok` to build the recommended option |
| Build right away, no wireframes | `/evon:ui-ux Just build the notification settings screen.` | No wireframes (saves tokens): the skill picks the option it would recommend and builds it. On delivery it says which layout it chose and why |
| Lock a design system before building many screens | `/evon:ui-ux Build a design system for a clinic management app first, no screens yet.` | Tokens and seven base components (button, badge, input, card, list row, modal, empty state) on a `/design-system` page. No wireframes, one stop for your approval. If the project uses shadcn or its own kit, it adjusts that kit. Later screens are assembled from exactly this set |
| Find what's wrong with a UI | `/evon:ui-ux Review this page, what's off: http://localhost:3000/orders` | A table of issues with before/after screenshots. Reply `fix 1, 3` before it changes anything |
| Tidy up, keep the brand and layout | `/evon:ui-ux Rebuild this page, keep the brand.` | Swaps controls, tightens cards, keeps your colors. Browse-to-pick pages and dashboards (formula B of `P12`) get an extra colored-version line. Reply `ok` or `drop 7` |
| Switch fully to the skill's style | `/evon:ui-ux Rebuild completely in the skill's style, drop the old style.` | Same as above, but changes the colors too, keeping only the logo and accent color |
| Clean up code, keep the look | `/evon:ui-ux Refactor the /settings CSS to Tailwind, keep the UI identical.` | Swaps classes, removes old CSS, compares before and after screenshots |

Anything smaller than a screen (fix a component, add a dropdown, fix a bug) the skill just
does, no wireframes.

## Tips

- **Give it a running localhost link.** The skill opens the page, measures and screenshots
  from 375 to 1920px. No link? Send a screenshot.
- **One page per turn**, with a specific route.
- **For new screens, describe real data**: columns, fields, empty and error states.
- **Have a wireframe? Attach it** and note "this image is just a wireframe".
- **Want the skill to find issues itself? Don't list them.**
- **Give wireframe feedback by block number**: each block has a small number in the corner, so
  say "drop block 3", "move block 2 to the top".
- **The skill handles the look, you handle the logic**: API calls, saving data, number
  formatting are on you.
- **Use realistic sample data.** Cartoon images make any UI look like a draft.

## Checking the result

- The issue table ends with a **"Đối chiếu probe"** (probe cross-check) line. If it's missing,
  the skill didn't run its measurements.
- A full redesign comes with **five self-check lines** on delivery. If they're missing, reply
  "redo the five self-checks".

## What the skill keeps

- **Your components and library** (shadcn, MUI, in-house kits): it uses yours and doesn't
  layer another kit on top.
- **Brand colors**: kept, unless you say "drop the old style".
- **Style**: flat by default. Want glassmorphism, gradients or a dark background? Say so in
  the prompt.
- Works without Tailwind or without a `package.json` (plain HTML, WordPress).

## Using with Cursor, OpenCode, Codex, Antigravity, omp

Run at the project root (`bunx` works in place of `npx`):

```bash
npx skills add evondev/evondevKit
```

The command asks which tools to install for, then copies the skill into
`.agents/skills/ui-ux/`, the folder Cursor, OpenCode, Codex, Antigravity and omp all read. To
preselect tools, add `-a`, e.g. `-a cursor -a opencode`. To share it across all projects, add
`-g`.

| Tool | Invoke |
| --- | --- |
| Cursor, Antigravity | `/ui-ux Build an orders list…` |
| Codex | `$ui-ux Build an orders list…` |
| OpenCode | `Use the ui-ux skill to build an orders list…` |
| omp | `/skill:ui-ux Build an orders list…` |

Without the name, the tool turns the skill on when the prompt matches its description.
Update: `npx skills update`. The skill is tested most on Claude; other tools work but may
differ in places.

---

Developing the skill: see [DEVELOP.md](DEVELOP.md) (Vietnamese). License: [MIT](LICENSE).
