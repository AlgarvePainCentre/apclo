import re

css_file = "src/styles/layout/treatments-legacy-grids.css"

with open(css_file, "r") as f:
    css = f.read()

def get_selectors_for(anchor):
    parts = css.split('{')
    for i in range(len(parts) - 1):
        last_brace = parts[i].rfind('}')
        if last_brace != -1:
            selectors_text = parts[i][last_brace+1:].strip()
        else:
            selectors_text = parts[i].strip()
            
        if anchor in selectors_text:
            return [s.strip() for s in selectors_text.split(',') if s.strip()]
    return []

# Groups we want to extract
layout_sels = get_selectors_for(".rfa-aftercare-layout")
header_sels = get_selectors_for(".rfa-aftercare-header")
title_sels = get_selectors_for(".rfa-aftercare-title")
subtitle_sels = get_selectors_for(".rfa-aftercare-subtitle")
media_sels = get_selectors_for(".rfa-aftercare-media")
image_sels = get_selectors_for(".rfa-aftercare-image")
panel_sels = get_selectors_for(".rfa-aftercare-panel")
item_sels = get_selectors_for(".rfa-aftercare-item,")
item_title_sels = get_selectors_for(".rfa-aftercare-item-title")
item_body_sels = get_selectors_for(".rfa-aftercare-item-body")
divider_sels = get_selectors_for(".rfa-aftercare-divider")

layout_sels_str = ",\n".join(layout_sels)
header_sels_str = ",\n".join(header_sels)
title_sels_str = ",\n".join(title_sels)
title_after_sels_str = ",\n".join(title_sels).replace("-title", "-title::after")
subtitle_sels_str = ",\n".join(subtitle_sels)
media_sels_str = ",\n".join(media_sels)
image_sels_str = ",\n".join(image_sels)
panel_sels_str = ",\n".join(panel_sels)
item_sels_str = ",\n".join(item_sels)
item_hover_sels_str = ",\n".join(item_sels).replace("-item", "-item:hover")
item_title_sels_str = ",\n".join(item_title_sels)
item_body_sels_str = ",\n".join(item_body_sels)
divider_sels_str = ",\n".join(divider_sels)
layout_sels_str2 = ",\n  ".join(layout_sels)

new_css = f"""/* Treatment Aftercare / Expect Layout Component */

{layout_sels_str} {{
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 clamp(24px, 5vw, 48px) clamp(40px, 6vw, 80px);
  align-items: center;
}}

@media (min-width: 768px) {{
  {layout_sels_str2} {{
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(40px, 6vw, 80px);
  }}
}}

{header_sels_str} {{
  text-align: center;
  margin-bottom: clamp(40px, 6vw, 64px);
  max-width: 800px;
  margin-inline: auto;
  padding: 0 20px;
}}

{title_sels_str} {{
  margin: 0 0 24px;
  font-size: clamp(2.2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: #0f4681;
  line-height: 1.15;
  letter-spacing: -0.02em;
  position: relative;
  display: inline-block;
}}

{title_after_sels_str} {{
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #ffc166;
  border-radius: 4px;
}}

{subtitle_sels_str} {{
  font-size: clamp(1rem, 2vw, 1.1rem);
  line-height: 1.6;
  color: #4b5563;
  margin: 0 0 8px;
}}

{media_sels_str} {{
  background-color: #f1f5f9;
  border-radius: 24px;
  padding: clamp(24px, 5vw, 48px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 10px rgba(15, 23, 42, 0.03);
}}

{image_sels_str} {{
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
  display: block;
}}

{panel_sels_str} {{
  display: flex;
  flex-direction: column;
  gap: 24px;
}}

{item_sels_str} {{
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: none;
  box-shadow: none;
  border: none;
  padding: 0;
}}

{item_hover_sels_str} {{
  transform: none;
  box-shadow: none;
}}

{item_title_sels_str} {{
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f4681;
}}

{item_body_sels_str} {{
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #4b5563;
}}

{divider_sels_str} {{
  width: 100%;
  height: 1px;
  background-color: rgba(15, 23, 42, 0.06);
  margin: 0;
}}
"""

with open("src/styles/components/TreatmentAftercare.css", "w") as f:
    f.write(new_css)

print("TreatmentAftercare.css generated.")
