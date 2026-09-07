# PRD: Personal Identity Portfolio Redesign

## Problem Statement

Maria (27, ML Engineer with a Bioengineering background) has a personal portfolio site that is content-accurate but structurally and visually generic — it reads as a plain resume rather than a distinct professional identity. The people who matter most when evaluating her — event/conference organizers deciding who to invite to speak, and recruiters/hiring managers/project leads deciding whether to bring her onto a role or collaboration — currently default to LinkedIn or word of mouth to form an impression, because the site doesn't do that job. The cost of not solving this: the site isn't something she's proud to share, and it fails to convert a first look into "this is someone I should invite / bring in."

## Evidence

- Assumption — validated by the site owner's own judgment, not external data: "It's just not something you're proud to share" was chosen over "doesn't get shared" or "undersells on first glance" as the sharpest pain. This is a founder-conviction case, not a data-backed one — legitimate for a solo personal-brand project, but the hypothesis below should be checked against real reactions post-launch, not assumed correct.
- Observed today: LinkedIn is the profile people actually treat as current and authoritative (self-reported). The site is secondary.
- No analytics, visitor feedback, or competitor teardown were reviewed for this PRD — none exist yet. Treat audience-reaction assumptions as TBD until real visitor feedback comes in post-launch.

## Thesis (why build it)

LinkedIn is structurally a feed — chronological, same-template-as-everyone, optimized for updates, not for telling one coherent story. It cannot show, in one curated pass, that Maria is a generalist spanning AI/ML, healthcare/pharma/biotech, and community/speaking/mentorship — nor can it convey personality (young, values travel and community, someone people would want in the room). A personal site is the one place that can be shaped entirely around that narrative.

Why now: the constraint that used to make a bold custom redesign expensive (design + frontend build time) is gone — Claude Code makes a from-scratch rebuild achievable solo, on top of content that's already accurate and doesn't need re-reporting, only re-presenting.

Why this beats the status quo (LinkedIn / word of mouth): those channels are default-selected only because nothing better exists yet, not because they're well-suited to the job. Neither can hold a curated narrative, a personal design identity, or a single link that pre-answers "why invite/hire her" the way a dedicated, intentionally designed site can.

## Hypothesis

> We believe redesigning the site as a bold, narrative-driven personal identity (replacing the current plain, resume-style layout) will cause organizers, recruiters, and collaborators who are vetting Maria before an invite, offer, or partnership to come away with a stronger, more memorable impression and reach out with more confidence.
>
> We'll know we're **RIGHT** if, within roughly 2–3 months of launch, people who visit the site start referencing specific things from it unprompted — in emails, at events, in DMs (e.g. "I saw the talk on X" or "I loved the piece about Y" without being prompted).
>
> We'll know we're **WRONG** if visitors still default to asking for a LinkedIn profile or CV instead of engaging with the site, or if there's no noticeable uptick in unprompted, specific mentions compared to today.

## Target User & JTBD

**Primary user:** Someone vetting Maria before extending a speaking invite, job offer, or collaboration/project — most often after being given her name by a third party and doing due diligence before reaching out (the "vetting before an invite" trigger, prioritized over the in-person-followup or self-shared-link moments).

**JTBD:** When an organizer, recruiter, or collaborator is deciding whether to invite, hire, or partner with Maria, they want to quickly grasp who she is and why she's worth it, so they can confidently reach out.

**Secondary, lower-priority moments:** someone looking her up right after meeting her in person; Maria proactively sharing the link herself (e.g. in a pitch or bio request).

**Non-users (explicitly not designing for):**
- Recruiters doing keyword/ATS-style resume screening — that job stays with LinkedIn/CV, not this site.
- General public / cold visitors with no prior context — this is not top-of-funnel content marketing.
- Peers browsing purely for design/engineering inspiration.

## MVP

Full redesign, shipped as one release rather than phased: new visual/narrative identity plus all existing content areas (work experience, education, media & recognition, community, contact) restyled and re-organized around the "legit and interesting" narrative — not a resume list. The interactive travel map / "places I've been" concept is included only as a secondary, personality layer, and must not compete with or dilute the professional credibility content; if it can't be done without diluting focus, it should be the first thing cut, not the core pages.

This is the thinnest *end-to-end* proof available given the chosen scope: a partial reskin wouldn't test whether the full narrative repositioning actually changes how vetters react, since the bet is about the overall impression, not any single page.

## Success Metrics

- **Unprompted specific references:** number of times a vetter (organizer, recruiter, collaborator) mentions something specific from the site without being prompted, tracked informally (email/DM/conversation mentions) over the 2–3 months following launch. Target: TBD — needs a baseline; treat any occurrence as a positive signal given today's baseline is effectively zero.
- **Shift away from "send me your LinkedIn/CV" as the default ask:** qualitative — track whether people increasingly reference the site itself instead of asking for those alternatives. TBD — needs validation, no current measurement method defined.
- **Self-assessment (pride/shareability):** whether Maria herself proactively shares the link in pitches/applications/bio requests post-launch, vs. avoiding it today. TBD — track qualitatively.

## Non-goals

- Not optimizing for ATS/keyword-based resume screening.
- Not building broad top-of-funnel content marketing for a general/cold audience.
- Not designing primarily to impress other engineers/designers with technical cleverness.
- Not making the travel map / personal-life content the primary focus — it stays secondary to the professional narrative.
- Not deciding tech stack, information architecture implementation, component structure, or any other engineering detail here — those are deliberately deferred to the architecture/spec stage.

## Open Questions

- [ ] What's the actual baseline and target for "unprompted specific references" — is there a way to track this more rigorously (e.g. a simple log Maria keeps) rather than relying on memory?
- [x] Should the interactive travel map ship in this same release, or be explicitly deferred to a v2 once the core narrative redesign is validated? → **Resolved in Architecture: ships in this release** (lightweight scope makes it low-risk).
- [ ] Is there a concrete near-term event (application, speaking opportunity, deadline) that should set the timeline, or is this open-ended?
- [ ] Should analytics (even lightweight, privacy-respecting) be added to know whether target users are actually visiting and which pages they engage with, given no data currently exists?
- [x] Tech stack, hosting approach (stay on GitHub Pages vs. move), and whether to keep this fully static — all deferred to `plan-architecture`, but worth flagging that "no hard constraints" was chosen alongside "must stay free to host," which may narrow real options once explored. → **Resolved in Architecture: stay fully static on GitHub Pages, no build step.**

---

## Architecture

### Problem & goals

The site needs to stop reading as a plain resume and start reading as a curated, memorable professional narrative — for one specific moment: someone vetting Maria before an invite, offer, or collaboration. Every decision below is judged against whether it helps a first-time vetter quickly grasp "who she is and why she's worth it," without adding engineering risk that threatens shipping this as one release, solo.

### Approaches considered

1. **Stay fully static, vanilla (current stack)** — redesign is scoped to a new visual design system, restructured IA, and hand-written JS interactions, with no build tooling added. Zero migration risk; every existing convention in `CLAUDE.md` stays valid.
2. **Introduce a static site generator (Astro/11ty)** — real templating/components, still static output, but requires a Node build step and rewriting every existing page into templates before the redesign itself starts. Rejected: too much migration overhead for a solo, one-release ship, and breaks the repo's explicit "no build process" rule for no capability this project actually needs.
3. **Full SPA (React/Vite)** — most power for animation/scrollytelling and a rich map, but the heaviest rewrite and in tension with the PRD's own non-goal of not chasing engineering cleverness. Rejected for the same reason as (2), more so.

**Recommended: Approach 1.** Investigation of the specific interactive element that seemed to justify (2)/(3) — the travel map — showed it doesn't actually need a build step or a library: a static SVG world map with per-country hover, CSS color-coding, and a small JS-driven story lookup is achievable entirely within the current stack.

### Recommended approach

Keep the site static HTML/CSS/JS/GitHub Pages, no build step, no framework. The redesign work is: (a) a new visual design system (color/type/identity) layered into `css/styles.css`, (b) a restructured information architecture that leads with narrative rather than a resume list, and (c) two new pieces of interactivity that stay within the existing vanilla-JS pattern — the travel map, and a real (not simulated) contact form submission.

This plugs into the existing system as follows: all current page inventory, card component patterns, nav structure, and asset path conventions documented in `CLAUDE.md` remain the scaffolding. The redesign changes their visual treatment and, on the homepage specifically, the narrative sequencing — it does not change the underlying page-per-topic structure (`experience.html`, `education.html`, `media.html`, `community.html`, `contact.html` stay as the deep-dive destinations a vetter clicks into after the homepage narrative hooks them).

### Key decisions

- **Stack & libraries** — No new stack. Pure HTML/CSS/JS, no npm/bundler, hosted on GitHub Pages as today. One new external dependency: a form backend (see Boundaries) for the contact form. Rejected alternatives: Astro/11ty and React/Vite (see Approaches).
- **Data model** — Content stays hardcoded HTML using the existing card component patterns (no CMS, no JSON content layer — consistent with `CLAUDE.md`'s explicit static, no-database approach). The one new data shape is the travel map's country → story mapping: a small in-page JS object or literal (e.g. `{ "PT": "...", "JP": "..." }`) keyed by country code, colocated with the map's markup rather than a new top-level content system — this is a handful of entries, not a dataset.
- **Boundaries & contracts** — Two external touchpoints, both new:
  - A **static SVG world map asset** (e.g. a free/CC0 world map with per-country `<path id="XX">` elements, from a source like simplemaps or amCharts' free tier) — needs a license check before use/modification, and must be vetted for hover/click accessibility (keyboard focus states, not just `:hover`).
  - A **form backend for the contact form** (e.g. Formspree free tier) to replace the current simulated success message — no server code needed, but it's a new external service dependency and the free tier has a submission cap worth confirming is sufficient.
- **Other** — Per-page inline `<script>` blocks (the pattern `contact.html` already uses for its form handler) are the right place for page-specific logic like the map's hover/story behavior, keeping `js/script.js` reserved for site-wide behavior as `CLAUDE.md` specifies — avoids stretching the "one shared JS file" rule to hold single-page logic.

### Missing pieces

- The actual travel-map country/story content (which countries, what story) — a content-authoring task for Maria, not an engineering one, but it's on the critical path before the map can ship.
- A chosen and license-checked SVG world map asset.
- A Formspree (or equivalent) account and endpoint configured for the contact form.
- The new visual design system itself (palette, type treatment, homepage narrative copy) — the redesign's actual creative core, to be worked out in the implementation-planning stage.

### Spikes & experiments

Every decision above is cheap and reversible (it's a static site — nothing here is a one-way door), so no formal spike is needed. One quick check worth doing early rather than assuming: confirm the chosen SVG map's per-country paths are cleanly hoverable/keyboard-focusable and that the color-coding approach reads well at mobile widths, before writing the full country/story dataset against it.

### Open questions

- Baseline/target for "unprompted specific references" and whether analytics get added — both still open per the PRD, and orthogonal to this architecture (they don't affect the stack or structure decisions above).
- Concrete launch-driving deadline, if any — still open per the PRD.

---

## Travel Map Content

Content dependency flagged in Architecture → Missing Pieces. This is the country/story dataset the travel map's JS lookup (keyed by ISO 3166-1 alpha-2 code) will read from. Written by Maria; ready to hand off to implementation as-is.

| Country | Code | Story |
|---|---|---|
| Portugal | PT | Home country — where Maria has lived and is based. |
| United States | US | First visit in 2026, for the US Life Sciences Symposium in New York City. Also visited Boston, including MIT and the university's overall atmosphere. |
| Mexico | MX | A 2–3 week car road trip through different towns and cities, plus a scuba diving certification course along the way. |
| Colombia | CO | Three months living in Medellín and Bogotá as part of an explorer programme offered by Loka, the company Maria currently works for — also explored the country more broadly. |
| Morocco | MA | Maria's first trip outside Europe. |
| Spain | ES | Visited, no particular story attached. |
| France | FR | Visited Alsace, and lived for 6 months in Toulouse, in the south. |
| United Kingdom | GB | Maria's first trip abroad alone, and her first flight, at age 16. |
| Netherlands | NL | A one-week cycling tour. |
| Belgium | BE | Visited. |
| Luxembourg | LU | Visited. |
| Switzerland | CH | Visited for conferences; also organized a programme in 2026 that brought 15 Portuguese people to Switzerland to learn about the Basel ecosystem, through GenAI-related work. |
| Italy | IT | Visited. |
| Greece | GR | Visited. |
| Albania | AL | Visited. |
| Sweden | SE | Visited. |
| Thailand | TH | Part of a month-long backpacking trip through Southeast Asia. |
| Vietnam | VN | Part of the same month-long backpacking trip as Thailand. |
| Singapore | SG | Visited — also where Maria lost her passport for the first time. |
| Indonesia | ID | A separate month-long backpacking trip, exploring different islands within the country. |

**Notes for implementation:**
- Entries with only "Visited." (Spain, Belgium, Luxembourg, Italy, Greece, Albania, Sweden) should still get a country color-code on the map, but the hover/click story panel can simply show the country name with no extra copy — don't force a fabricated anecdote onto entries that don't have one.
- Group logic (Thailand/Vietnam as one backpacking trip; Indonesia as a separate one) is a content note for whoever writes final on-site copy — it doesn't need to be a distinct data structure, just consistent phrasing if both are visible at once.
