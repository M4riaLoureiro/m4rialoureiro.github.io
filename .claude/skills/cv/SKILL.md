---
name: cv
description: Build, update, or retarget Maria's CV PDF from the portfolio site content. Use when asked to update the CV, regenerate the CV PDF, add something new to the CV, tailor the CV for a specific application or award, or when site content changes in a way the CV should reflect.
---

# CV

The CV is generated from `cv/cv.html` — a standalone, self-contained HTML file that is
the **source of truth**. The PDF is a build artifact. Never hand-edit the PDF.

```
cv/cv.html                 source of truth (edit this)
cv/build.sh                renders -> cv/Maria-Loureiro-CV.pdf, checks pages + links
cv/Maria-Loureiro-CV.pdf   committed output
```

## Build

```bash
./cv/build.sh
```

Prints page count and every embedded link, and **fails if the result is not exactly
2 pages**. Requires Chrome; no other dependencies.

To inspect the result visually before reporting it done:

```bash
pdftoppm -png -r 90 cv/Maria-Loureiro-CV.pdf /tmp/cvpg && ls /tmp/cvpg*.png
```

Then Read the PNGs. Always look at the rendered pages after a content change — text
reflows and a bullet that gained one line can push a whole block to a third page.

## Current target

Written for the **IESE Business School Future Female Leaders Award**. That award
screens for 2–10 years of experience, professional excellence, and "a deep, positive
and lasting impact on people, companies and society through professionalism,
excellence and a spirit of service."

This framing matters: it is a **leadership-award CV**, not an MBA-application résumé
and not a technical CV. Maria is not applying to an MBA at present, so the one-page
résumé convention does not bind. Peer credibility, public voice, and service carry
the most weight.

If retargeting to a different application, re-read the new criteria first and say
what you are changing and why before editing.

## Structure

**Page 1** — header · profile · three highlights · experience (Loka, GenH, iLoF,
earlier roles) · education
**Page 2** — leadership & community · awards · selected publications · speaking &
press · skills, certifications, languages

Davos appears deliberately **twice**: once in the highlights strip at the top, once
under awards. The highlight strip exists so a panel sees it within ten seconds. This
is not accidental duplication — do not "fix" it.

## Content rules

Everything below is a decision Maria made explicitly. Do not silently reverse one.

- **No invented metrics.** Loka's impact is stated qualitatively ("reducing the time
  and cost of identifying viable targets and molecules") because no figure is cleared
  for external use. Never add a number that is not sourced from her directly.
- **Davos is "1 of 40"**, matching the site and the press coverage.
- **No numbers on the women-in-tech work.** Inspiring Girls and Geek Girls are
  described qualitatively, by choice.
- **No iLoF funding, headcount, or intern numbers.**
- **No GenH revenue.** Impact figures only.
- **No language levels** beyond "Portuguese (native) · English (professional)".
  French is deliberately omitted.
- **No degree distinctions or rankings.** "Grade A" only — it is the international
  reference value.
- **Excluded from publications by request:** the 2021 Público Erasmus piece and the
  O Amador Financeiro investing piece. Both off-thesis.
- **Excluded entirely:** university coursework projects, the Podcast Cruzamento PM
  role, Comic Con volunteering, the 2020 Talkdesk/Glintt award, and all soft-skills
  certifications.

## Links

15 links are embedded. Contact details, employers (Loka, GenH, iLoF), Global Shapers,
six article titles, the Prova Oral episode, and the media page.

Maria removed three on purpose — **the Eurekathon award, the Credly certification
badge, and the master's thesis**. Do not add them back.

Style is a thin terracotta underline, never blue. Links must survive print.

## Visual system

Mirrors the site (see `agents.md`) with print-specific departures:

- Literata for the name, section headings and role titles; Work Sans for body
- Terracotta `#B5592E` for rules, section labels and link underlines
- **White background**, not the site's paper `#F6F1E8` — it prints heavy and
  projects muddy
- No Caveat, no icons, no emoji, no photo, no skill bars
- Left date column and hairline dividers, echoing the site's `.timeline-row`

## Keeping it to two pages

Content is tuned to land exactly on two pages. When adding something, remove
something of similar length. In rough order of what to cut first:

1. A publication (the list already points to the full set on the site)
2. A bullet duplicated elsewhere — e.g. anything on page 1 restating a page-2 award
3. Wording inside a bullet that wraps to a short final line

Lever of last resort: body `font-size` / `line-height`, `@page` margin, and the
`.row` / `.entry` margins in the `<style>` block. Do not go below 8.8pt body.

`.entry` uses `break-inside: avoid`, so a block that does not fit jumps whole to the
next page and leaves a large gap. A near-empty page 2 means page 1 is a few lines
over, not that the content is short.

## Updating from the site

Source content lives in `pages/media.html` (writing, talks, awards, press),
`pages/experience.html`, `pages/education.html`, and `pages/community.html`.
Extract text with:

```bash
sed -e 's/<[^>]*>/ /g' pages/media.html | tr -s ' \n' ' \n' | sed '/^ *$/d'
```

Pull article URLs from the `href` attributes in `pages/media.html` rather than
retyping them.

When new site content appears, judge it against the target criteria above before
adding it. The CV is a selection, not a mirror of the site.

## Open gaps

Worth revisiting whenever Maria has new information:

- Quantified Loka outcomes cleared for external use
- People managed or mentored at Loka (an internal project was starting as of Sep 2026)
