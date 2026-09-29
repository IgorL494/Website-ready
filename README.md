# Website Ready

A lightweight, dependency-free, responsive marketing site for Website Ready LLC.

## Run locally

From this folder:

```sh
python3 -m http.server 8765 --directory dist
```

Then open http://localhost:8765. Any static hosting service can serve `dist/`.

## Structure

- `dist/index.html`: semantic page sections, sample previews, FAQs, and dialogs.
- `dist/styles.css`: responsive brand design, sample-site themes, and mobile layouts.
- `dist/app.js`: navigation, accessible native dialogs, desktop/mobile demo switching, configurable CTAs, and footer links.
- `dist/config.js`: price, currency, contact details, checkout/lead URLs, legal/social links, and policy TODOs.
- `dist/assets/`: optimized, locally stored sample-site photography.
- `.openai/hosting.json`: private Sites deployment configuration.

## Before public launch

1. Set `checkoutUrl` and/or `leadUrl` in `dist/config.js`. Checkout takes precedence; if both are empty, every purchase CTA opens a truthful preview-first explanation. No payment or lead submission is simulated.
2. Add verified email/phone, approved Privacy Policy and Terms URLs, and optional social links. Empty links are omitted, never rendered as dead links.
3. Decide hosting, domain, maintenance, revisions, refunds, launch timing, and ownership-transfer mechanics. Reserved policy fields are internal TODOs and are not automatically published; approved wording can then be added to the relevant page sections.
4. Replace illustrative concepts with actual approved examples when available. Current examples are explicitly fictional; no reviews, clients, guarantees, or performance claims are implied.
5. Set the public domain and sharing audience when ready. The Sites review deployment begins private.

Price is read from config and applied to all page prices and descriptions. Brand/legal names are included as business reference settings; changing the brand requires updating the page branding and title too.

Google Fonts supplies DM Sans and Manrope, with system fallbacks. Images are served locally. No analytics, cookies, forms, backend, or payment integration are included.

## Photography

Images licensed under the [Pexels license](https://www.pexels.com/license/), used only in fictional sample concepts. No endorsement is implied.

- Curtis Adams: https://www.pexels.com/photo/lawn-and-trees-around-house-12700469/
- Caitlin Whealy: https://www.pexels.com/photo/back-view-of-a-person-pressure-washing-a-house-5652626/
- Luke Miller: https://www.pexels.com/photo/a-person-polishing-the-car-s-body-14231701/

## Verification and current status

The local site was run and reviewed in the in-app browser at desktop, tablet, and mobile sizes. Purchase dialogs (including all four keyboard activations), three sample previews, preview width switching, mobile navigation, FAQ expansion, anchor targets, and browser error logs were checked. A rotated hero backdrop overflow at narrow widths was fixed; the corrected 320px and 1024px layouts fit without horizontal overflow. JavaScript syntax checks passed.

The source is complete. A private Sites project was registered, but publication did not finish because the installed Sites publishing helper disappeared during the session. No hosted deployment URL is being claimed. The site remains runnable locally or deployable to any static host.
