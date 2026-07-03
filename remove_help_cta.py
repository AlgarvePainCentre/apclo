import os
import glob
import re

pages_dir = "src/pages/treatments"
files = glob.glob(f"{pages_dir}/**/*.jsx", recursive=True) + glob.glob(f"{pages_dir}/**/*.tsx", recursive=True)

count = 0
for file in files:
    with open(file, 'r') as f:
        content = f.read()
        
    new_content = re.sub(r'\s*<div className="[a-z]+-help-cta"[^>]*>[\s\S]*?</div>\s*</div>', '', content)
    
    if new_content != content:
        with open(file, 'w') as f:
            f.write(new_content)
        count += 1
        print(f"Removed CTA from {file}")

print(f"Updated {count} files.")