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

print("Layout:", len(get_selectors_for(".rfa-aftercare-layout")))
print("Header:", len(get_selectors_for(".rfa-aftercare-header")))
print("Title:", len(get_selectors_for(".rfa-aftercare-title")))
print("Subtitle:", len(get_selectors_for(".rfa-aftercare-subtitle")))
print("Media:", len(get_selectors_for(".rfa-aftercare-media")))
print("Image:", len(get_selectors_for(".rfa-aftercare-image")))
print("Panel:", len(get_selectors_for(".rfa-aftercare-panel")))
print("Item:", len(get_selectors_for(".rfa-aftercare-item,")))
print("Item Title:", len(get_selectors_for(".rfa-aftercare-item-title")))
print("Item Body:", len(get_selectors_for(".rfa-aftercare-item-body")))
print("Divider:", len(get_selectors_for(".rfa-aftercare-divider")))
