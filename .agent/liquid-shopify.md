# Liquid Shopify Rules - Sculptique Clone

## 🎯 Project Overview
**Objective:** Clone Sculptique product page using Liquid templating  
**Timeline:** 7-10 days  
**Media Source:** `/Users/thanglee/PATI-test/media_all` (99+ assets)

---

## 📁 Structure

```
Sculptique/
├── assets/      # CSS, JS, images (copy media_all here)
├── blocks/      # Reusable schema blocks
├── layout/      # Base templates (theme.liquid)
├── sections/    # Page sections with schema
├── snippets/    # Reusable Liquid components
└── templates/   # Page templates
```

---

## 🎨 Asset Management

### Copy Media to Theme
```bash
cp -r /Users/thanglee/PATI-test/media_all/* /Users/thanglee/PATI-test/Sculptique/assets/
```

### Image Loading
```liquid
{% assign img = 'imgi_117_LymoPDPImagesArtboard1_8e287aa1-576e-42b1-9a87-ce2fcdaded3a_grande.jpg' | asset_url %}
<img src="{{ img }}" alt="{{ product.title }}" loading="lazy" width="1662" height="1080">
```

### SVG Icons
```liquid
{{ 'download.svg' | asset_url | img_tag: class: 'icon', alt: 'Icon' }}
{% render 'icon', name: 'checkmark', file: 'imgi_115_check-mark_17013456_2_1.png' %}
```

---

## 🧩 Component Patterns

### Section with Schema
```liquid
{% comment %} sections/product-selector.liquid {% endcomment %}
<div class="product-selector">
  {% for block in section.blocks %}
    <div class="variant-card">
      <span class="badge">{{ block.settings.badge_text }}</span>
      <h3>{{ block.settings.title }}</h3>
      <div class="price">
        <span class="original">{{ block.settings.original_price }}</span>
        <span class="sale">{{ block.settings.sale_price }}</span>
      </div>
    </div>
  {% endfor %}
</div>

{% schema %}
{
  "name": "Product Selector",
  "blocks": [
    {
      "type": "variant_option",
      "name": "Variant Option",
      "settings": [
        {"type": "text", "id": "badge_text", "label": "Badge Text"},
        {"type": "text", "id": "title", "label": "Title"},
        {"type": "text", "id": "original_price", "label": "Original Price"},
        {"type": "text", "id": "sale_price", "label": "Sale Price"}
      ]
    }
  ]
}
{% endschema %}
```

### Reusable Snippet
```liquid
{% comment %} snippets/icon.liquid {% endcomment %}
<img src="{{ file | asset_url }}" alt="{{ alt | default: name }}" class="icon icon--{{ name }}">
```

---

## 💅 Styling

```css
/* assets/main.css */
:root {
  --color-primary: #FF6B9D;
  --color-secondary: #FFB6C1;
  --font-primary: 'Lora', serif;
  --font-secondary: 'Nunito', sans-serif;
  --spacing-md: 2rem;
}

.variant-card {
  border: 2px solid transparent;
  border-radius: 12px;
  padding: var(--spacing-md);
  transition: all 0.3s ease;
}

.variant-card:hover {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.2);
}

@media (min-width: 768px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
}
```

---

## 🔧 Liquid Patterns

### Product Data
```liquid
<h1>{{ product.title }}</h1>
<div class="price">{{ product.price | money }}</div>

{% for variant in product.variants %}
  <div data-variant-id="{{ variant.id }}">{{ variant.title }}</div>
{% endfor %}
```

### Conditionals & Loops
```liquid
{% if section.settings.show_badge %}
  <span class="badge">{{ section.settings.badge_text }}</span>
{% endif %}

{% assign icons = 'imgi_78_ship-min.png,imgi_79_support-min.png' | split: ',' %}
{% for icon in icons %}
  <img src="{{ icon | asset_url }}" alt="Trust badge">
{% endfor %}
```

---

## 🛒 E-commerce

### Add to Cart
```liquid
{% form 'product', product, class: 'product-form' %}
  <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
  <input type="number" name="quantity" value="1" min="1">
  <button type="submit" {% unless product.available %}disabled{% endunless %}>
    {% if product.available %}Add to Cart{% else %}Sold Out{% endif %}
  </button>
{% endform %}
```

### Variant Selection
```liquid
<div class="variant-selector">
  {% for option in product.options_with_values %}
    {% for value in option.values %}
      <input type="radio" name="option-{{ option.position }}" value="{{ value }}" 
        id="opt-{{ forloop.index }}" {% if option.selected_value == value %}checked{% endif %}>
      <label for="opt-{{ forloop.index }}">{{ value }}</label>
    {% endfor %}
  {% endfor %}
</div>
```

### Bundle Pricing
```liquid
{% assign original = product.price | times: 3 %}
{% assign discount = original | times: 0.15 %}
{% assign final = original | minus: discount %}
<span class="original">${{ original | money_without_currency }}</span>
<span class="sale">${{ final | money_without_currency }}</span>
```

---

## 📱 Key Sections

### Trust Badges
```liquid
{% comment %} sections/trust-badges.liquid {% endcomment %}
<div class="badges-grid">
  {% for block in section.blocks %}
    <div class="badge-item">
      <img src="{{ block.settings.icon | asset_url }}" alt="{{ block.settings.title }}">
      <h4>{{ block.settings.title }}</h4>
    </div>
  {% endfor %}
</div>

{% schema %}
{
  "name": "Trust Badges",
  "blocks": [
    {
      "type": "badge",
      "settings": [
        {"type": "text", "id": "icon", "default": "imgi_78_ship-min.png"},
        {"type": "text", "id": "title", "label": "Title"}
      ]
    }
  ],
  "presets": [{
    "name": "Trust Badges",
    "blocks": [
      {"type": "badge", "settings": {"icon": "imgi_78_ship-min.png", "title": "Free Shipping"}},
      {"type": "badge", "settings": {"icon": "imgi_79_support-min.png", "title": "24/7 Support"}}
    ]
  }]
}
{% endschema %}
```

### Subscription Toggle
```liquid
<div class="purchase-toggle">
  <button class="active" data-type="subscription" data-discount="15">
    Subscribe & Save <span>15% OFF</span>
  </button>
  <button data-type="onetime">One-time Purchase</button>
</div>

<script>
document.querySelectorAll('.purchase-toggle button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.purchase-toggle button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updatePricing(btn.dataset.type, btn.dataset.discount);
  });
});
</script>
```

### Before/After Slider
```liquid
<div class="before-after-slider">
  <img src="{{ 'imgi_91_before-min_png.png' | asset_url }}" class="before-image">
  <img src="{{ 'imgi_82_greendeskt-min.png' | asset_url }}" class="after-image">
  <div class="slider-handle" style="left: 50%"></div>
</div>

<script>
const slider = document.querySelector('.slider-handle');
slider.addEventListener('mousedown', () => {
  document.addEventListener('mousemove', (e) => {
    const rect = e.target.closest('.before-after-slider').getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    slider.style.left = percent + '%';
    document.querySelector('.after-image').style.clipPath = `inset(0 ${100-percent}% 0 0)`;
  });
});
</script>
```

---

## 🚀 Performance

### Responsive Images
```liquid
<img src="{{ 'product.jpg' | asset_url }}"
  srcset="{{ 'product.jpg' | asset_url | img_url: '400x' }} 400w,
          {{ 'product.jpg' | asset_url | img_url: '800x' }} 800w"
  sizes="(max-width: 768px) 100vw, 50vw" loading="lazy">
```

### Critical CSS
```liquid
<head>
  <style>{{ 'critical.css' | asset_url | stylesheet_tag }}</style>
  <link rel="preload" href="{{ 'main.css' | asset_url }}" as="style" onload="this.rel='stylesheet'">
</head>
```

---

## 🔌 Development

```bash
# Setup
brew install shopify-cli
cd /Users/thanglee/PATI-test/Sculptique

# Dev server
shopify theme dev

# Deploy
shopify theme push
```

---

## ✅ Checklist

- [ ] Copy media_all to assets/
- [ ] Optimize images (WebP)
- [ ] Test responsive (mobile/tablet/desktop)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Performance > 80 (Lighthouse)
- [ ] Cart functionality works
- [ ] All forms validated
- [ ] SEO meta tags added

---

## 📚 Key Assets

**Icons:** download.svg (1-13), imgi_115-116 (checkmarks)  
**Products:** imgi_117-118 (main images)  
**Trust:** imgi_78-81 (ship, support, natural, guarantee)  
**Reviews:** imgi_76 (verified checkmark)  
**Before/After:** imgi_82, imgi_91  
**Folders:** trustpilot/, payments/, listings/, add-on pop up/

---

## 🎯 Success Criteria

✅ 95%+ visual match  
✅ All interactions work  
✅ Lighthouse > 80  
✅ Mobile responsive  
✅ WCAG 2.1 AA  
✅ Clean code  
✅ Cart/checkout functional  
✅ 7-10 day timeline
