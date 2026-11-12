# Product-source foundations (scoped)

Baseline: `BrunoPessoa22/special-project`, commit `6e9bba6237d9f6296e41d71a105c7b190074205a`, reviewed 12 November 2026. [DESIGN.md at this commit](https://github.com/BrunoPessoa22/special-project/blob/6e9bba6237d9f6296e41d71a105c7b190074205a/docs/DESIGN.md) requires repository access. Contract SHA-256: `0914259bcab75e5c6c3caf3507c89c5e2585da00b8d00bb1e8c90adbc9b3cb42`.

The newer [user-supplied brand kit](brand-kit.md) takes priority for general communication marks, names, palette metadata and badge conditions. The older artwork remains historical/product-source reference; this does not replace the scoped rules below.

This is a selective, portable reference. It does not reproduce the private contract, supersede it or establish that all target parts are implemented. Recheck the owning source when a new revision materially affects the requested artifact.

## Scope and precedence

| Surface | Apply | Important distinction |
|---|---|---|
| Shared foundation | Y rules and root palette | Linen/Patina; these defaults do not override named zone exceptions |
| Holder `/app` | V4 rules, then H2 replacements | H2 removes green buttons, decorative V4 motion and older navigation destinations |
| Operator `/admin` | Shared rules, A rules, then A2 replacements | A2 removes the old dot grid, top colour line, Geist and all-caps table heads |
| Documentation `/docs` | DV1 plus shared rules | Root linen/Patina palette and the three product faces; no independent docs palette |
| Studio `/studio` | Applicable shared rules | Compact product zone; a visual design does not prove a live issuer portal |
| Public marketing site | Its separately scoped theme | Do not use the public Direction C theme as authority for every product surface or slide |

The 2026-11-12 contract itself names some components as **target** and distinguishes them from in-place parts. A source rule, a component implementation, a live journey and a programme agreement are four different evidence claims.

## Colour roles

Exact light/dark values are in [tokens.json](tokens.json). The shared light root is linen `#F4F1E7` with ink `#172A2B` and Patina `#245E61`. Holder/Admin V2 light uses ground `#F3F5FA`, surface `#FFFFFF`, ink `#15245A`; dark uses `#050B1E`, `#0B1533`, `#F4F7FF` respectively.

V2 signal green is `#2BF59A` in both looks. It means earned/days held/ready in the holder zone and live/running in the operator zone. Primary actions use ink; selection uses the neutral active fill. On light, green carries its `1.5px` indigo edge. Positive text uses its readable text role, not signal green on white.

Text floors: 4.5:1 for body, 3:1 for large text as the zone defines it; edge-only controls 3:1. Meaningful marks need sufficient contrast or an edge. A company ticket's own ink must clear 4.5:1 on its fill; refuse the pair if it fails. A proposal that passes a contrast calculation is still only a proposal.

## Faces and source product sizes

| Role | Holder V2 | Admin V2 |
|---|---|---|
| Primary faces | Sora, Source Sans 3, DM Mono | Same; no Geist |
| Hero / statement | Sora 700, 144/116; 96/80 below 640px | Statement Sora 700, 28/34 |
| Page title | Sora 700, 32/38; 28/34 phone | Sora through its page-title preset |
| Section | Sora 600, 20/26 | Sora 600, 16/22 |
| Body | Source Sans 3 400, 16/24 | Source Sans 3 400, 15/22 |
| Action | Sora 600, 14/20 | Source Sans 3 600, 15/22 |
| Data | DM Mono, 13/20 | DM Mono, 13/18 |
| Meta / tabs | Meta 14/20; tabs Source Sans 3 600, 12/16 | Meta 13/18; keys DM Mono, 12/12 |

These are product dimensions, not prescribed slide heading sizes. Set communication type proportionally to a visually selected composition. Source specimens retain their internal proportions when enlarged.

## Holder objects

- Ticket: at least 196px high; radius 20px; bottom stub 60px high, 68px phone; 1.5px dashed perforation in ticket ink at 55%; half-circle notches radius 9px. Ready claim is a pill in ticket ink with company-colour label. The ticket's own focus ring uses its ink at 3px offset.
- A ready ticket uses the company colour. Claimed, expired, programme-paused, partner-not-yet-open and nothing-to-claim states remain neutral. A benefit that is itself paused is hidden. Do not invent a programme pause date.
- Company pass: notched square 40px/radius 9; 30px/radius 7 on tickets. Approved logo if available, otherwise ticker initials. It is not a physical payment card.
- The largest Overview figure is days held and appears once per screen. Its unit stays on the same baseline. Day-axis track 8px; programme tier marks 2×18px; each row keeps its own thresholds. Extend beyond the largest threshold to the next whole year when needed.
- No programme: no tier marks. One tier: no extra tier marks. Unknown next-tier timing says so. Use days to go, not a projected calendar date. Partner benefits and Affinity do not sit on the tier axis.
- Destinations: Overview, Holdings, Benefits, Voice, Spend. Phone bar 78px high; 20px icon in a 56×32 pill; 12/16 label. Source line once: header from 1024px, under Overview rows below that.

## Operator objects

- Dark default; light and system alternatives. Show mode in words at every width: Live, Simulated or Test data. A green dot alone is insufficient. Target components must not be described as already adopted everywhere.
- Primary controls 32px high, 28px small; radius 8px. Panels 12px, sheets 16px, chips 14px. Presses fill rather than shrink.
- Worklist: one evidence body plus a right-hand 112px action stub, 76px phone; 1px dashed control perforation; radius-8 notches at top and bottom. Roving row focus, arrows between rows, Tab to stub then out, Enter activates the row action.
- Operator holding axes use ink, not earned green. Green here means live.

## Shared discipline and motion

Cards hold real objects, not decorative prose grids. Shadows belong to floating layers. Product motion is feedback, with reduced motion instant: 120ms press; the V2 target durations include 180ms control, 240ms reveal and 160ms exit. Retired V4 shimmer, tilt, breathing and count-up are not the new default.

Sentence case, British English, one main action and explicit empty/loading/error states remain useful communication disciplines. A slide's composition, image choice and narrative pacing need their own visual proof; no product token or detector can choose them for Max.
