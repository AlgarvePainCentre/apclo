import os
import glob
import re

pages_dir = "src/pages/treatments"

files = glob.glob(f"{pages_dir}/**/*.jsx", recursive=True) + glob.glob(f"{pages_dir}/**/*.tsx", recursive=True)

count = 0
for file in files:
    with open(file, 'r') as f:
        content = f.read()
        
    if re.search(r'<h3 className="[a-z]+-step-title">', content):
        new_content = re.sub(
            r'(<div className="treatments-feature-accent"></div>\s*)?<h3 className="([a-z]+)-step-title">',
            r'<div className="treatments-feature-accent"></div>\n                  <h3 className="\2-step-title">',
            content
        )
        
        if new_content != content:
            with open(file, 'w') as f:
                f.write(new_content)
            count += 1
            print(f"Updated {file}")

print(f"Updated {count} files.")