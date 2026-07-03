import re

css_file = "src/styles/layout/treatments-legacy-grids.css"

with open(css_file, "r") as f:
    css = re.sub(r"/\*.*?\*/", "", f.read(), flags=re.DOTALL)

def get_selectors_for(anchor):
    parts = css.split('{')
    for i in range(len(parts) - 1):
        last_brace = parts[i].rfind('}')
        selectors_text = parts[i][last_brace+1:].strip() if last_brace != -1 else parts[i].strip()
        sels = [s.strip() for s in selectors_text.split(',') if s.strip()]
        if anchor in sels: return sels
    return []

card_sels = get_selectors_for(".rfa-benefit-card")
if not card_sels:
    # the selector might be .rfa-benefits-card instead of benefit-card, or similar.
    # Actually, in the HTML it's class="cryo-benefit-card". Let's search manually.
    pass

import glob
# We will just generate the list of selectors using the known prefixes
prefixes = [
    "rfa", "iss", "pnb", "iacsi", "cb", "cryo", "np", "prp", "hd", "btx", "ppm",
    "hc", "ost", "st", "pt", "ot", "tms", "sf", "dr", "lds"
]

all_cards = []
all_titles = []
all_bodies = []
all_dividers = []

for p in prefixes:
    all_cards.append(f".{p}-benefit-card")
    all_cards.append(f".{p}-condition-card")
    all_titles.append(f".{p}-benefit-title")
    all_titles.append(f".{p}-condition-title")
    all_bodies.append(f".{p}-benefit-body")
    all_bodies.append(f".{p}-condition-body")
    all_dividers.append(f".{p}-benefit-divider")
    all_dividers.append(f".{p}-condition-divider")

all_cards_str = ",\n".join(all_cards)
all_cards_hover_str = ",\n".join([s + ":hover" for s in all_cards])
all_titles_str = ",\n".join(all_titles)
all_bodies_str = ",\n".join(all_bodies)
all_dividers_str = ",\n".join(all_dividers)

new_css = f"""/* Treatment Simple Cards Typography Component */

{all_cards_str} {{
  background: transparent !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  box-shadow: none !important;
}}

{all_cards_hover_str} {{
  transform: none !important;
  box-shadow: none !important;
  background: transparent !important;
}}

{all_titles_str} {{
  margin: 0 0 8px !important;
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #0f4681 !important;
}}

{all_bodies_str} {{
  margin: 0 !important;
  font-size: 1rem !important;
  line-height: 1.6 !important;
  color: #4b5563 !important;
}}

{all_dividers_str} {{
  display: none !important;
}}
"""

with open("src/styles/components/TreatmentSimpleCards.css", "w") as f:
    f.write(new_css)

print("TreatmentSimpleCards.css generated.")