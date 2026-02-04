#!/usr/bin/env python3
"""
Extract clean UI/UX HTML from dom.html
Removes third-party scripts, analytics, and app-specific code
Keeps only visual CSS and essential UI JavaScript
"""

import re
from pathlib import Path

# File paths
DOM_HTML = Path("/Users/thanglee/PATI-test/dom.html")
OUTPUT_HTML = Path("/Users/thanglee/PATI-test/refined-dom.html")

def extract_css_variables(content):
    """Extract CSS custom properties from :root"""
    pattern = r':root\s*{([^}]+)}'
    matches = re.findall(pattern, content, re.DOTALL)
    return '\n'.join(matches) if matches else ''

def remove_script_tags(content):
    """Remove all script tags except essential UI ones"""
    # Keep only slick carousel and essential UI scripts
    essential_patterns = [
        r'slick',
        r'carousel',
        r'slider'
    ]
    
    # Remove all scripts first
    content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL | re.IGNORECASE)
    
    return content

def remove_app_blocks(content):
    """Remove Shopify app blocks"""
    # Remove app block comments and their content
    content = re.sub(
        r'<!-- BEGIN app block:.*?<!-- END app block -->',
        '',
        content,
        flags=re.DOTALL
    )
    
    # Remove app snippets
    content = re.sub(
        r'<!-- BEGIN app snippet:.*?<!-- END app snippet -->',
        '',
        content,
        flags=re.DOTALL
    )
    
    return content

def extract_body_content(content):
    """Extract content between <body> and </body>"""
    match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL)
    return match.group(1) if match else ''

def clean_inline_styles(content):
    """Remove dynamic inline styles from Slick carousel"""
    # Remove width: 0px and transform styles
    content = re.sub(r'style="[^"]*width:\s*0px[^"]*"', '', content)
    content = re.sub(r'style="[^"]*transform:[^"]*"', '', content)
    content = re.sub(r'style="[^"]*opacity:\s*[01][^"]*"', '', content)
    
    return content

def extract_essential_css(content):
    """Extract only visual CSS, remove app-specific styles"""
    css_blocks = []
    
    # Extract all style tags
    style_pattern = r'<style[^>]*>(.*?)</style>'
    styles = re.findall(style_pattern, content, re.DOTALL)
    
    # Filter out app-specific CSS
    skip_patterns = [
        'kaching-cart',
        'jdgm-',
        'klaviyo',
        'shopify-section-cart',
        'analytics'
    ]
    
    for style in styles:
        if not any(pattern in style.lower() for pattern in skip_patterns):
            css_blocks.append(style)
    
    return '\n'.join(css_blocks)

def main():
    print("🔍 Reading dom.html...")
    content = DOM_HTML.read_text(encoding='utf-8')
    
    print("✂️  Removing third-party scripts...")
    content = remove_script_tags(content)
    
    print("🧹 Removing app blocks...")
    content = remove_app_blocks(content)
    
    print("🎨 Extracting CSS...")
    css = extract_essential_css(content)
    css_vars = extract_css_variables(content)
    
    print("📦 Extracting body content...")
    body = extract_body_content(content)
    body = clean_inline_styles(body)
    
    print("✨ Building refined HTML...")
    refined_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sculptique Product Page - UI Reference</title>
    
    <!-- REFINED CSS - Visual Styles Only -->
    <style>
        /* CSS Variables */
        :root {{
            {css_vars}
        }}
        
        /* Component Styles */
        {css}
    </style>
</head>
<body class="gradient">
    <!-- CLEAN UI STRUCTURE -->
    {body}
    
    <!-- Essential UI JavaScript (Carousel/Slider only) -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    
    <script>
        // Initialize image carousel
        $(document).ready(function(){{
            $('.main_product-image-carousel').slick({{
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: false,
                asNavFor: '.main_product-image-carousel_thumbs'
            }});
            
            $('.main_product-image-carousel_thumbs').slick({{
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '.main_product-image-carousel',
                dots: false,
                centerMode: false,
                focusOnSelect: true
            }});
        }});
    </script>
</body>
</html>"""
    
    print(f"💾 Writing to {OUTPUT_HTML}...")
    OUTPUT_HTML.write_text(refined_html, encoding='utf-8')
    
    # Stats
    original_size = len(content)
    refined_size = len(refined_html)
    reduction = ((original_size - refined_size) / original_size) * 100
    
    print(f"\n✅ Done!")
    print(f"📊 Original: {original_size:,} bytes")
    print(f"📊 Refined: {refined_size:,} bytes")
    print(f"📊 Reduction: {reduction:.1f}%")

if __name__ == "__main__":
    main()
