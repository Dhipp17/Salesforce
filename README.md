# Chapin + Salesforce: Future-State Journey

Static site, no build step. Open `index.html` or host on GitHub Pages.

| File | What it holds |
|---|---|
| `index.html`, `styles.css` | Layout and Salesforce-branded styling |
| `data.js` | The six journey chapters (steps, mock-screen specs), 13-week plan, next steps |
| `mocks.js` | Illustrative mock screens drawn in HTML/CSS |
| `why.js` | Simple by design, Why Salesforce, proof points |
| `faqs.js` | salesforce.com FAQs with source links (also searched by Ask) |
| `library.js` | Platform library: 98 slides from the Chapin decks, with in-page detail |
| `slides.js` | Ask knowledge base |
| `render.js`, `agent.js` | Page rendering and the Ask assistant |
| `pager.js` | Presentation flow: one section per page, `#1`–`#13` links, Back/Next and arrow keys |

## Publish on GitHub Pages
In GitHub Desktop: File > Add Local Repository > choose this folder > Publish repository. Then on github.com: Settings > Pages > Deploy from a branch > main / (root) > Save.

## Logos
- Chapin: `assets/chapin-logo.png` (included). Falls back to a text wordmark if missing.
- Salesforce: the header uses a text wordmark. Swap in the official logo from Salesforce brand resources.

## Ask assistant
Answers come from the Chapin knowledge base in `slides.js` plus the salesforce.com FAQs in `faqs.js`. If a question matches a salesforce.com FAQ more closely, that answer leads with a link to its source page; otherwise the Chapin answer leads and the best FAQ appears as a quick answer underneath. It uses keyword retrieval with no external calls, so it is deterministic and safe to demo offline. To add or change answers, edit the `KB` array. To power it with a live model, replace the `search()` call in `agent.js` with a call to your own server-side endpoint; never put an API key in this repo.

## Slides and screenshots
Library slides live in `assets/slides/` (full size) and `assets/slides/t/` (thumbnails), named by deck and page (for example `co-8.jpg` is Commercial Operations slide 8). Clicking a slide opens it on the page with its content; nothing links out to the decks. Journey screenshots live in `assets/screens/`; see `SHOTLIST.md` for which steps use real screens and how to add more.

## Content notes
- No pricing or contract terms are included.
- Customer results are labelled Achieved or Projected as the source describes them. Verify before external use.
- The Slack tab is marked "Proposed"; it was not part of the scoped work.
- The page is `noindex`; share the link only with Chapin.
