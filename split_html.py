import os
import re

def split_html():
    with open('/home/ubuntu/Desktop/luminous-website/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    sections = [
        ('navbar', r'<!-- NAVIGATION -->(.*?)<!-- HERO -->'),
        ('hero', r'<!-- HERO -->(.*?)<!-- ABOUT US -->'),
        ('about', r'<!-- ABOUT US -->(.*?)<!-- CORE VALUES -->'),
        ('values', r'<!-- CORE VALUES -->(.*?)<!-- GOALS & OBJECTIVES -->'),
        ('goals', r'<!-- GOALS & OBJECTIVES -->(.*?)<!-- BUSINESS CONCEPT -->'),
        ('business', r'<!-- BUSINESS CONCEPT -->(.*?)<!-- SERVICES -->'),
        ('services', r'<!-- SERVICES -->(.*?)<!-- PRODUCTS -->'),
        ('products', r'<!-- PRODUCTS -->(.*?)<!-- PRICING -->'),
        ('pricing', r'<!-- PRICING -->(.*?)<!-- WHY CHOOSE US -->'),
        ('why_us', r'<!-- WHY CHOOSE US -->(.*?)<!-- COMPANY STRUCTURE -->'),
        ('structure', r'<!-- COMPANY STRUCTURE -->(.*?)<!-- CERTIFICATIONS -->'),
        ('certifications', r'<!-- CERTIFICATIONS -->(.*?)<!-- CONTACT -->'),
        ('contact', r'<!-- CONTACT -->(.*?)<!-- FOOTER -->'),
        ('footer', r'<!-- FOOTER -->(.*?)</body>')
    ]

    os.makedirs('/home/ubuntu/Desktop/luminous-website/partials', exist_ok=True)

    for name, pattern in sections:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            partial_content = match.group(1).strip()
            # Restore the section wrapper which might contain IDs, or just write the raw match
            # Actually, the match.group(1) will include the <section> or <nav> elements!
            partial_content = re.sub(r'src="data:image/[^;]+;base64,[^"]+"', 'src="placeholder.jpg"', partial_content)
            
            with open(f'/home/ubuntu/Desktop/luminous-website/partials/{name}.html', 'w', encoding='utf-8') as out_f:
                out_f.write(partial_content)
                
if __name__ == '__main__':
    split_html()
