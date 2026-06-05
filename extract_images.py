import base64
import re

def extract_images():
    with open('/home/ubuntu/Desktop/luminous-website/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find logo
    logo_match = re.search(r'navbar-brand.*?src="data:image/jpeg;base64,([^"]+)"', content, re.DOTALL)
    if logo_match:
        with open('/home/ubuntu/Desktop/luminous-website/images/logo.jpg', 'wb') as f_out:
            f_out.write(base64.b64decode(logo_match.group(1).strip()))
        print("Extracted logo.jpg")

    # Find hero image (if base64)
    hero_match = re.search(r'hero-image-container.*?src="data:image/jpeg;base64,([^"]+)"', content, re.DOTALL)
    if hero_match:
        with open('/home/ubuntu/Desktop/luminous-website/images/hero.jpg', 'wb') as f_out:
            f_out.write(base64.b64decode(hero_match.group(1).strip()))
        print("Extracted hero.jpg")

if __name__ == '__main__':
    extract_images()
