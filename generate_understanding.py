import re

prefixes = [
    "rfa", "iss", "pnb", "iacsi", "cb", "cryo", "np", "prp", "hd", "btx", "ppm",
    "hc", "ost", "st", "pt", "ot", "tms", "sf", "dr", "lds"
]

paragraph_sels = [f".{p}-understanding-paragraph" for p in prefixes]
copy_sels = [f".{p}-understanding-copy" for p in prefixes]

# New subtitle and title selectors across all sections
subtitle_sels = []
title_sels = []
body_sels = []
item_body_sels = []

sections = ["understanding", "aftercare", "benefits", "conditions", "expect", "process", "procedure"]

for p in prefixes:
    for s in sections:
        subtitle_sels.append(f".{p}-{s}-subtitle")
        title_sels.append(f".{p}-{s}-title")
        body_sels.append(f".{p}-{s}-body")
        item_body_sels.append(f".{p}-{s}-item-body")
        
# also grab raw <p> inside understanding sections that don't have classes just in case
extra_p_sels = [
    ".posture-correction p",
    ".tms-understanding-body",
    ".sf-understanding-body",
    ".dr-understanding-body",
    ".lds-understanding-body"
]

all_paragraph_sels = paragraph_sels + subtitle_sels + body_sels + item_body_sels + extra_p_sels
p_sels_str = ",\n".join(all_paragraph_sels)
c_sels_str = ",\n".join(copy_sels)
t_sels_str = ",\n".join(title_sels)

new_css = f"""/* Treatment Understanding Typography Component */

{c_sels_str} {{
  display: flex !important;
  flex-direction: column !important;
  gap: 24px !important; /* Increased space between paragraphs */
}}

{p_sels_str} {{
  margin: 0 !important;
  color: #4b5563 !important; /* slate-600 */
  line-height: 1.8 !important; /* improved readability */
  font-size: 1.125rem !important; /* 18px - larger and more legible */
  text-align: left !important;
  letter-spacing: 0.01em !important;
}}

/* Ensure all titles have consistent spacing */
{t_sels_str} {{
  margin: 0 0 24px 0 !important;
  font-size: clamp(2rem, 3vw, 2.5rem) !important;
  font-weight: 700 !important;
  color: #0f4681 !important;
  line-height: 1.2 !important;
  text-align: left !important;
}}
"""

with open("src/styles/components/TreatmentUnderstanding.css", "w") as f:
    f.write(new_css)

print("TreatmentUnderstanding.css generated.")