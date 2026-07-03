import re

css_file = "src/styles/layout/treatments-legacy-grids.css"

with open(css_file, "r") as f:
    css_content = f.read()

prefixes = ["rfa", "iss", "pnb", "iacsi", "cb", "cryo", "np", "prp", "hd", "btx", "ppm", "hc", "ost", "st", "pt", "ot"]

bad_selectors = [f".{p}-conditions-title" for p in prefixes]

# We need to remove bad_selectors from the block that has font-size: 1.4rem;
parts = css_content.split('{')
for i in range(len(parts) - 1):
    if 'font-size: 1.4rem;' in parts[i+1]:
        # This is the card titles block!
        last_brace = parts[i].rfind('}')
        if last_brace != -1:
            selectors_text = parts[i][last_brace+1:].strip()
            prefix_text = parts[i][:last_brace+1] + '\n'
        else:
            selectors_text = parts[i].strip()
            prefix_text = ''
            
        existing_list = [s.strip() for s in selectors_text.split(',') if s.strip()]
        new_list = [s for s in existing_list if s not in bad_selectors]
        
        new_selectors_text = ',\n'.join(new_list)
        parts[i] = prefix_text + new_selectors_text + ' '
        break

css_content = '{'.join(parts)

# Also, the posture-correction section needs to be properly styled.
# Let's add styles for `.posture-correction` section header
# .rfa-conditions-header maps to .posture-correction (actually it should be text-align: center)

# Let's add `.posture-correction` to `.rfa-conditions-header` block
header_selectors = [".posture-correction"]
parts = css_content.split('{')
for i in range(len(parts) - 1):
    if 'text-align: center;' in parts[i+1] and 'margin-bottom: 48px;' in parts[i+1]:
        last_brace = parts[i].rfind('}')
        if last_brace != -1:
            selectors_text = parts[i][last_brace+1:].strip()
            prefix_text = parts[i][:last_brace+1] + '\n'
        else:
            selectors_text = parts[i].strip()
            prefix_text = ''
            
        if '.rfa-conditions-header' in selectors_text:
            existing_list = [s.strip() for s in selectors_text.split(',') if s.strip()]
            for hs in header_selectors:
                if hs not in existing_list:
                    existing_list.append(hs)
            
            new_selectors_text = ',\n'.join(existing_list)
            parts[i] = prefix_text + new_selectors_text + ' '
            break

css_content = '{'.join(parts)

# Let's add `.posture-correction p` to `.rfa-conditions-subtitle` if it exists.
# The subtitle is .rfa-aftercare-subtitle, .rfa-benefits-subtitle, etc.
subtitle_selectors = [".posture-correction p"]
parts = css_content.split('{')
for i in range(len(parts) - 1):
    if 'max-width: 800px;' in parts[i+1] and 'margin: 0 auto;' in parts[i+1] and 'font-size: 1.125rem;' in parts[i+1]:
        last_brace = parts[i].rfind('}')
        if last_brace != -1:
            selectors_text = parts[i][last_brace+1:].strip()
            prefix_text = parts[i][:last_brace+1] + '\n'
        else:
            selectors_text = parts[i].strip()
            prefix_text = ''
            
        existing_list = [s.strip() for s in selectors_text.split(',') if s.strip()]
        for ss in subtitle_selectors:
            if ss not in existing_list:
                existing_list.append(ss)
        
        new_selectors_text = ',\n'.join(existing_list)
        parts[i] = prefix_text + new_selectors_text + ' '
        break

css_content = '{'.join(parts)

with open(css_file, "w") as f:
    f.write(css_content)

print("Fixed CSS titles successfully.")