import re

css_file = "src/styles/layout/treatments-legacy-grids.css"

with open(css_file, "r") as f:
    css = re.sub(r"/\*.*?\*/", "", f.read(), flags=re.DOTALL)

def get_selectors_for(anchor):
    parts = css.split('{')
    for i in range(len(parts) - 1):
        last_brace = parts[i].rfind('}')
        if last_brace != -1:
            selectors_text = parts[i][last_brace+1:].strip()
        else:
            selectors_text = parts[i].strip()
            
        sels = [s.strip() for s in selectors_text.split(',') if s.strip()]
        if anchor in sels:
            return sels
    return []

grid_sels = [s for s in get_selectors_for(".rfa-steps-grid") if "-steps-grid" in s]
card_sels = [s for s in get_selectors_for(".rfa-step-card") if "-step-card" in s]
number_sels = [s for s in get_selectors_for(".rfa-step-number") if "-step-number" in s]
title_sels = [s for s in get_selectors_for(".rfa-step-title") if "-step-title" in s]
divider_sels = [s for s in get_selectors_for(".rfa-step-divider") if "-step-divider" in s]
body_sels = [s for s in get_selectors_for(".rfa-step-body") if "-step-body" in s]

grid_sels_str = ",\n".join(grid_sels)
card_sels_str = ",\n".join(card_sels)
card_hover_sels_str = ",\n".join(card_sels).replace("-step-card", "-step-card:hover")
number_sels_str = ",\n".join(number_sels)
title_sels_str = ",\n".join(title_sels)
divider_sels_str = ",\n".join(divider_sels)
body_sels_str = ",\n".join(body_sels)

grid_before_sels_str = ",\n".join([s + "::before" for s in grid_sels])
grid_before_sels_str_indent = ",\n  ".join([s + "::before" for s in grid_sels])
card_last_sels_str = ",\n".join([s + ":last-child" for s in card_sels])

new_css = f"""/* Treatment Steps / Timeline Layout Component */

{grid_sels_str} {{
  display: flex !important;
  flex-direction: column !important;
  gap: 0 !important;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
}}

/* The connecting vertical line */
{grid_before_sels_str} {{
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 24px;
  width: 2px;
  background-color: #e2e8f0;
  z-index: 1;
}}

@media (min-width: 768px) {{
  {grid_before_sels_str_indent} {{
    left: 28px;
  }}
}}

{card_sels_str} {{
  position: relative;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 0 40px 64px !important;
  margin: 0 !important;
  z-index: 2;
  display: block !important;
}}

{card_last_sels_str} {{
  padding-bottom: 0 !important;
}}

{card_hover_sels_str} {{
  transform: none !important;
  box-shadow: none !important;
  background: transparent !important;
}}

{number_sels_str} {{
  position: absolute;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #0f4681;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  border: 4px solid #f8fafc; /* Matches page background */
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.1);
  z-index: 3;
}}

@media (min-width: 768px) {{
  {number_sels_str} {{
    width: 56px;
    height: 56px;
    font-size: 1.5rem;
  }}
  {card_sels_str} {{
    padding: 0 0 48px 88px !important;
  }}
}}

{title_sels_str} {{
  margin: 0 0 12px 0 !important;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f4681;
  padding-top: 8px; /* Align visually with the circle */
}}

{divider_sels_str} {{
  display: none !important;
}}

{body_sels_str} {{
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #4b5563;
}}
"""

with open("src/styles/components/TreatmentSteps.css", "w") as f:
    f.write(new_css)

print("TreatmentSteps.css generated.")
