# Supplied brand kit: current general identity

Source: user-supplied `yutai-brand-kit.zip`, incorporated 12 November 2026. Archive SHA-256 `b4b6f62f87e99f81e4516353577c906d3ac2ffdef9233f80f9298f52405276ce`. The [provided README](brand-kit-readme.txt) is copied exactly; [asset provenance](../assets/brand-kit/provenance.json) records all 28 files, hashes and dimensions. This kit updates general identity guidance. It does not silently replace product-zone contracts, prove production capability, or discard approved presentation composition and paragraph typography.

## Choose the artwork

Prefer SVG outlines; they need no font installation. Use the paired PNG only where vector artwork is unsupported. Preserve aspect ratio, complete artwork and supplied colours. Do not type, redraw, retint, stretch or remove the Japanese from a chosen lockup. The SVG's canvas is part of the delivered asset; do not trim it casually.

| Context | SVG to use | PNG fallback |
|---|---|---|
| Primary horizontal logo, light background or print | [horizontal ink](../assets/brand-kit/svg/yutai-lockup-horizontal-ink.svg) | [PNG](../assets/brand-kit/png/yutai-lockup-horizontal-ink.png) |
| Primary horizontal logo, dark background | [horizontal on-dark](../assets/brand-kit/svg/yutai-lockup-horizontal-on-dark.svg) | [PNG](../assets/brand-kit/png/yutai-lockup-horizontal-on-dark.png) |
| Primary horizontal logo, photo or coloured background with sufficient contrast | [horizontal white](../assets/brand-kit/svg/yutai-lockup-horizontal-white.svg) | [PNG](../assets/brand-kit/png/yutai-lockup-horizontal-white.png) |
| Square space with Japanese, light background | [stacked ink](../assets/brand-kit/svg/yutai-lockup-stacked-ink.svg) | [PNG](../assets/brand-kit/png/yutai-lockup-stacked-ink.png) |
| Square space with Japanese, dark background | [stacked on-dark](../assets/brand-kit/svg/yutai-lockup-stacked-on-dark.svg) | [PNG](../assets/brand-kit/png/yutai-lockup-stacked-on-dark.png) |
| Square space with Japanese, photo/coloured background with sufficient contrast | [stacked white](../assets/brand-kit/svg/yutai-lockup-stacked-white.svg) | [PNG](../assets/brand-kit/png/yutai-lockup-stacked-white.png) |
| Icon/favicon/small space, light background | [seal ink](../assets/brand-kit/svg/yutai-seal-ink.svg) | [PNG](../assets/brand-kit/png/yutai-seal-ink.png) |
| Icon/favicon/small space, green seal appropriate and contrast checked | [seal green](../assets/brand-kit/svg/yutai-seal-green.svg) | [PNG](../assets/brand-kit/png/yutai-seal-green.png) |
| Icon/favicon/small space, white seal on contrasting background | [seal white](../assets/brand-kit/svg/yutai-seal-white.svg) | [PNG](../assets/brand-kit/png/yutai-seal-white.png) |
| Wordmark alone, light background | [wordmark ink](../assets/brand-kit/svg/yutai-wordmark-ink.svg) | [PNG](../assets/brand-kit/png/yutai-wordmark-ink.png) |
| Wordmark alone, contrasting background | [wordmark white](../assets/brand-kit/svg/yutai-wordmark-white.svg) | [PNG](../assets/brand-kit/png/yutai-wordmark-white.png) |
| Square social/profile avatar | [avatar](../assets/brand-kit/svg/yutai-avatar.svg) | [PNG](../assets/brand-kit/png/yutai-avatar.png) |
| Distributor badge in a light interface, only after the conditions below hold | [Benefits by, light](../assets/brand-kit/svg/yutai-badge-benefits-light.svg) | [PNG](../assets/brand-kit/png/yutai-badge-benefits-light.png) |
| Distributor badge in a dark interface, only after the conditions below hold | [Benefits by, dark](../assets/brand-kit/svg/yutai-badge-benefits-dark.svg) | [PNG](../assets/brand-kit/png/yutai-badge-benefits-dark.png) |

The older files in `assets/logos/` remain historical/product-source references. They are not the default mark for new general communication work. New horizontal lockups have a 280×90 SVG viewBox; stacked lockups 200×190; seal 64×64; wordmark 154×66; badge 194×40; avatar 400×400. All PNG dimensions are recorded separately in the manifest.

Artwork exception to the README's shorthand: the file named `yutai-wordmark-white.svg` actually paints `#EAF0FF` (Mist), not `#FFFFFF`. Preserve that delivered artwork and test its actual contrast. Do not retint it to make its filename literal; choose another supplied white lockup/seal when exact white is necessary. Do not promote incidental badge shades into new general palette tokens.

## Clear space, size and names

- Clear space on every side: at least one quarter of the rendered seal height. Measure the seal artwork, not an unrelated text line; retain this margin when composing a slide or interface.
- Minimum seal: 16px on screen or 6mm in print. Minimum horizontal lockup: 80px wide or 24mm in print. Benefits badge: at least 24px tall. A smaller available space needs a different permitted mark, not an illegibly reduced lockup.
- Write **Yutai** in prose; lowercase **yutai** belongs to the outlined wordmark. Do not recreate that wordmark in Sora.
- The README supplies **Yutai Technologies, Inc.** as the company name. This is supplied brand information, not an independent corporate-registry verification.

## General palette and type

General identity colours: Ink `#030817`, Night `#061031`, Indigo `#0B1A47`, Signal green `#2BF59A`, Mist `#EAF0FF`, Haze `#B8C4E6`, Slate `#8C9AC4`, Rule `#1C2F6B`. These are a separate scope in [tokens.json](tokens.json). They do not rename or overwrite linen/Patina shared tokens or Holder/Admin V2 roles.

The kit names Sora for headlines/UI, DM Mono for code/labels and Noto Sans JP for Japanese. It does not explicitly ban another paragraph face. Preserve the established Source Sans 3 reading face in the current presentation and the explicit product-zone type rules. Do not change an approved composition or paragraph face solely because the kit lists headline/UI families.

Noto Sans JP is **specified but not bundled** here. The supplied SVGs already outline their Japanese artwork and require no font. For new Japanese text, obtain a legitimate font file and licence through an authorised workflow, or use an explicitly accepted available face; do not claim Noto Sans JP is loaded or synthesize its lettering. Existing bundled weights remain Sora 600/700, Source Sans 3 400/600 and DM Mono 400/500.

Logo colours are fixed artwork, not interface state or call-to-action tokens. General brand green in a supplied mark does not authorise green buttons/navigation in V2 product specimens, where its earned/live meaning still applies.

## Benefits badge: a live-programme signal

The distributor badge may appear next to an instrument only when at least one live benefit for that instrument has been verified. It must link to benefit details and appear to every eligible holder on the same terms. It must not encourage acquiring a security.

A seeded catalogue row, a source-mode label or a fictional tier/benefit example is not enough. Do not place this badge next to fictional instruments or illustrative offers in the executive deck by default. A brand-asset catalogue may document the badge and its conditions; that is different from using it as a programme-availability claim.

If the live-benefit evidence, details destination or equal-terms treatment is absent, omit the badge. Use the ordinary Yutai mark for general attribution without implying a live benefit or commercial relationship.

## Brand and legal language

Refer accurately to Yutai. Do not imply partnership or endorsement without written authority, or incorporate the marks into another product, company or domain name. The README's contact address is reference data, not an instruction to send a message.

The supplied kit positions Yutai as a technology provider and says benefits are voluntary programmes offered by issuers or trading venues. Preserve the distinction from an issuer, broker, exchange or custodian role. This supplied positioning is not independent licensing, regulatory or perimeter verification. Benefits do not create statutory shareholder rights; use current product/rights evidence for consequential claims.
