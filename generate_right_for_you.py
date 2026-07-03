import re

css_file = "src/styles/layout/treatments-legacy-grids.css"

with open(css_file, "r") as f:
    css = f.read()

prefixes = [
    "rfa", "iss", "pnb", "iacsi", "cb", "cryo", "np", "prp", "hd", "btx", "ppm",
    "hc", "ost", "st", "pt", "ot", "tms", "sf", "dr", "lds", "vp"
]

# Types of wrappers that represent this section
suffixes_inner = ["-help-inner", "-right-for-you-inner", "-help-cta-inner"]
suffixes_title = ["-help-title", "-right-for-you-title", "-help-cta-title"]
suffixes_copy = ["-help-copy", "-right-for-you-copy", "-help-cta-copy"]
suffixes_paragraph = ["-help-paragraph", "-right-for-you-paragraph", "-help-cta-paragraph"]

inner_sels = []
title_sels = []
copy_sels = []
para_sels = []

for p in prefixes:
    for s in suffixes_inner: inner_sels.append(f".{p}{s}")
    for s in suffixes_title: title_sels.append(f".{p}{s}")
    for s in suffixes_copy: copy_sels.append(f".{p}{s}")
    for s in suffixes_paragraph: para_sels.append(f".{p}{s}")

inner_sels_str = ",\n".join(inner_sels)
title_sels_str = ",\n".join(title_sels)
copy_sels_str = ",\n".join(copy_sels)
para_sels_str = ",\n".join(para_sels)

new_css = f"""/* Treatment Right For You Component */

{inner_sels_str} {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  max-width: var(--container-width, 1600px) !important;
  margin: 0 auto;
  padding: clamp(40px, 6vw, 80px) 0;
  text-align: left !important;
  align-items: center;
}}

@media (min-width: 992px) {{
  {inner_sels_str} {{
    grid-template-columns: 1fr 1.5fr;
    gap: 80px;
  }}
}}

{title_sels_str} {{
  margin: 0 !important;
  font-size: clamp(2rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #0f4681;
  text-align: left !important;
}}

{copy_sels_str} {{
  display: flex;
  flex-direction: column;
  gap: 24px;
}}

{para_sels_str} {{
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.8;
  color: #4b5563;
  letter-spacing: 0.01em;
  text-align: left !important;
}}
"""

with open("src/styles/components/TreatmentRightForYou.css", "w") as f:
    f.write(new_css)

print("TreatmentRightForYou.css generated.")