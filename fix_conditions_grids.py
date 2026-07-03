import re

css_file = "src/styles/layout/treatments-legacy-grids.css"

with open(css_file, "r") as f:
    css_content = f.read()

prefixes = ["rfa", "iss", "pnb", "iacsi", "cb", "cryo", "np", "prp", "hd", "btx", "ppm", "hc", "ost", "st", "pt", "ot"]

# Define the selector groups we want to ensure exist.
grid_selectors = [f".{p}-conditions-grid" for p in prefixes] + [".home-care-conditions-grid", ".posture-grid"]

card_selectors = []
for p in prefixes:
    card_selectors.extend([f".{p}-condition", f".{p}-condition-card", f".{p}-conditions-card"])
card_selectors.extend([".home-care-condition-card", ".posture-card"])

card_hover_selectors = [s + ":hover" for s in card_selectors]

title_selectors = []
for p in prefixes:
    title_selectors.extend([f".{p}-condition-title", f".{p}-conditions-card-title", f".{p}-conditions-title"])
title_selectors.extend([".home-care-condition-card-title", ".posture-content h3"])

desc_selectors = []
for p in prefixes:
    desc_selectors.extend([f".{p}-condition-desc", f".{p}-condition-body", f".{p}-conditions-card-body"])
desc_selectors.extend([".home-care-condition-card-body", ".posture-content p"])

copy_selectors = []
for p in prefixes:
    copy_selectors.extend([f".{p}-condition-body", f".{p}-condition-text", f".{p}-condition-copy", f".{p}-conditions-copy"])
copy_selectors.extend([".home-care-condition-card-copy", ".posture-content"])

media_selectors = []
for p in prefixes:
    media_selectors.extend([f".{p}-condition-media", f".{p}-conditions-media"])
media_selectors.extend([".home-care-condition-card-media", ".posture-image"])

image_selectors = []
for p in prefixes:
    image_selectors.extend([f".{p}-condition-image", f".{p}-conditions-image"])
image_selectors.extend([".home-care-condition-card-media img", ".posture-image img"])

header_selectors = [f".{p}-conditions-header" for p in prefixes]

section_title_selectors = [f".{p}-conditions-title" for p in prefixes] + [".posture-correction h2"]

def inject_all(css, anchor, new_selectors):
    parts = css.split('{')
    for i in range(len(parts) - 1):
        last_brace = parts[i].rfind('}')
        if last_brace != -1:
            selectors_text = parts[i][last_brace+1:].strip()
            prefix_text = parts[i][:last_brace+1] + '\n'
        else:
            selectors_text = parts[i].strip()
            prefix_text = ''
            
        if anchor in selectors_text:
            existing_list = [s.strip() for s in selectors_text.split(',') if s.strip()]
            for ns in new_selectors:
                if ns not in existing_list:
                    existing_list.append(ns)
            
            new_selectors_text = ',\n'.join(existing_list)
            parts[i] = prefix_text + new_selectors_text + ' '
            
    return '{'.join(parts)

# Let's verify our anchors by reading the file
css_content = inject_all(css_content, ".rfa-conditions-grid", grid_selectors)
css_content = inject_all(css_content, ".rfa-condition,", card_selectors)
css_content = inject_all(css_content, ".rfa-condition:hover", card_hover_selectors)
css_content = inject_all(css_content, ".rfa-condition-title", title_selectors)
css_content = inject_all(css_content, ".rfa-condition-desc", desc_selectors)
css_content = inject_all(css_content, ".rfa-condition-media", media_selectors)
css_content = inject_all(css_content, ".rfa-condition-image", image_selectors)
css_content = inject_all(css_content, ".rfa-conditions-header", header_selectors)

# Group 6: Card Copy/Text Container (NEW BLOCK)
new_css_block = f"""
/* Container for card text content to ensure proper flex growth */
{', '.join(copy_selectors)} {{
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}}
"""
css_content += "\n" + new_css_block

with open(css_file, "w") as f:
    f.write(css_content)

print("CSS updated successfully.")