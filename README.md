# SailMath

Honest math for sailboats: hull speed and realistic cruise, sail area / displacement, capsize screening, Brewer comfort ratio, passage time, anchor rode, and first-reef wind speed.

## Run it

Static site. Open `index.html` (landing) or `app.html` (the calculator). On GitHub Pages the root serves the landing page.

## What it computes

- **Hull speed** - `1.34 * sqrt(LWL)` knots. The brochure number, not the average.
- **Honest cruise** - 75% of hull speed; passage days use that, not marketing knots.
- **SA/Disp** - sail area over displacement volume^(2/3): under 14 motorsailor, 14-18 cruiser, 18-22 racer-cruiser, above race.
- **Capsize screen** - beam over displacement volume^(1/3); under 2.0 passes the classic offshore rule.
- **Comfort ratio** - Brewer's formula: 20-30 coastal, 30-40 offshore cruiser, 40+ heavy.
- **Anchor rode** - (depth + freeboard) x scope: 5 for lunch, 7 overnight, 10 in a blow.
- **First reef** - earlier with race-boat canvas or a tender hull, later with heavy canvas.

## Files

- `index.html` - landing page
- `app.html` - the calculator
- `engine.js` - pure math (also usable from Node: `require('./engine.js')`)
