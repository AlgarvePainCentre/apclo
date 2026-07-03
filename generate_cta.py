import re

css_file = "src/styles/layout/treatments-legacy-grids.css"

with open(css_file, "r") as f:
    css = f.read()

# Grab all the prefixes that might exist in treatments
# Or just parse them directly from treatments-legacy-grids.css using regex
matches = re.findall(r'\.([a-z]+)-help-cta-button', css)
prefixes = list(set(matches))

# Just in case, add some known ones
known = ["rfa", "iss", "pnb", "iacsi", "cb", "cryo", "np", "prp", "hd", "btx", "ppm", "hc", "ost", "st", "pt", "ot", "tms", "sf", "dr", "lds", "vp"]
for k in known:
    if k not in prefixes:
        prefixes.append(k)

cta_sels = [f".{p}-help-cta-button" for p in prefixes]

cta_sels_str = ",\n".join(cta_sels)
cta_hover_sels_str = ",\n".join([s + ":hover" for s in cta_sels])

new_css = f"""/* Treatment Help CTA Component */

{cta_sels_str} {{
  padding: 1.2rem 1.5rem !important;
  border-radius: 999px !important;
  border: none !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  height: 48px !important;
  width: fit-content !important;
  text-decoration: none !important;
  background-color: #f04b5e !important;
  color: #ffffff !important;
  font-size: 16px !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  background-size: 200% 200% !important;
  background-position: 0% 50% !important;
  transform: scale(1) !important;
  transition: background-position 0.35s ease-out, box-shadow 0.28s ease-out, transform 0.28s ease-out !important;
  margin-top: 24px !important;
}}

{cta_hover_sels_str} {{
  background-image: linear-gradient(90deg, #ff9a52 40%, #ff5c6e 80%, #e83d5b 100%) !important;
  background-position: 100% 50% !important;
  transform: none !important;
  text-decoration: none !important;
  color: #ffffff !important;
}}
"""

with open("src/styles/components/TreatmentHelpCTA.css", "w") as f:
    f.write(new_css)

print("TreatmentHelpCTA.css generated.")