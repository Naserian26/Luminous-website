import os
import re

def split_css():
    with open('/home/ubuntu/Desktop/luminous-website/style.css', 'r', encoding='utf-8') as f:
        content = f.read()

    os.makedirs('/home/ubuntu/Desktop/luminous-website/css', exist_ok=True)

    # We will split by "/* ========================================"
    parts = re.split(r'/\*\s*={30,}\s*\n', content)
    
    global_css = parts[0] + "\n/* ====\n" + parts[1] # The first part is the header, second is tokens/reset/utility
    
    with open('/home/ubuntu/Desktop/luminous-website/css/global.css', 'w', encoding='utf-8') as f:
        f.write(global_css)

    for part in parts[2:]:
        # Extract the name from the first line
        match = re.match(r'\s*([A-Z\s]+)\s*\n\s*={30,}\s*\*/', part)
        if match:
            name = match.group(1).strip().lower().replace(' ', '_')
            
            # Map some names to the file names we want
            if 'why us' in name: name = 'why_us'
            elif 'core values' in name: name = 'values'
            elif 'business concept' in name: name = 'business'
            elif 'company structure' in name: name = 'structure'
            elif 'scroll to top' in name: name = 'global_components' # Just to keep it somewhere
            elif 'reveal animation' in name: name = 'animations'
            elif 'logo styles' in name: name = 'logo'
            elif 'responsive' in name: name = 'responsive'
            
            with open(f'/home/ubuntu/Desktop/luminous-website/css/{name}.css', 'w', encoding='utf-8') as f:
                f.write(f"/* ========================================\n{part}")

if __name__ == '__main__':
    split_css()
