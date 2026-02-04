# Sculptique Product Page - LLM Implementation Guide

## 🎯 Objective
Clone the Sculptique product page UI/UX with 99% visual fidelity using Shopify Liquid templating.

**Key Principle**: Focus on visual appearance, not functionality. Replace app logic with Liquid alternatives that produce identical visual output.

---

## 📁 Project Structure

```
Sculptique/
├── assets/          # ✅ All media files already copied here (99+ files)
├── sections/        # Create Liquid sections here
├── snippets/        # Create reusable components here
├── layout/          # theme.liquid
└── templates/       # product.json
```

---

## 🎨 Design System

### Colors
```css
--color-primary: #FF6B9D        /* Pink accent */
--color-background: #FFFFFF
--buttons-radius: 0px           /* Sharp corners */
```

### Typography
```css
--font-body-family: Montserrat, sans-serif
--font-heading-family: Trirong, serif
```

### Key Assets (in `assets/`)
- **Product Images**: `imgi_117_LymoPDPImagesArtboard*.jpg` (13 images)
- **Trust Icons**: `imgi_78-81_*.png` (ship, support, natural, guarantee)
- **UI Icons**: `download.svg` (1-13), `leaves_1247958_1.png`, `vday_1.png`
- **Reviews**: `imgi_76_verified.png`

---

## 🔧 Implementation Steps

### 1. Create Product Gallery Section

**File**: `sections/product-gallery.liquid`

```liquid
<div class="main_product-images">
  <div class="main_product-image-carousel">
    {% for image in product.images %}
      <div class="main_product-image-box">
        <img src="{{ image | img_url: '1200x' }}" 
             alt="{{ product.title }}" 
             loading="{% if forloop.first %}eager{% else %}lazy{% endif %}">
        
        {% if forloop.first %}
          <div class="main_product-nutrition-info">
            <span><img src="{{ 'leaves_1247958_1.png' | asset_url }}"></span>
            <span>Nutritional Information</span>
          </div>
          <img class="main-producT_bf_badge" src="{{ 'vday_1.png' | asset_url }}">
        {% endif %}
      </div>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "Product Gallery",
  "settings": []
}
{% endschema %}
```

---

### 2. Create Variant Selector Section

**File**: `sections/variant-selector.liquid`

```liquid
<div class="product-selector">
  {% for variant in product.variants %}
    <div class="variant-card {% if forloop.first %}active{% endif %}" 
         data-variant-id="{{ variant.id }}">
      
      {% if variant.compare_at_price > variant.price %}
        <span class="badge">SAVE {{ variant.compare_at_price | minus: variant.price | times: 100 | divided_by: variant.compare_at_price }}%</span>
      {% endif %}
      
      <h3>{{ variant.title }}</h3>
      
      <div class="price">
        {% if variant.compare_at_price %}
          <span class="original">${{ variant.compare_at_price | money_without_currency }}</span>
        {% endif %}
        <span class="sale">${{ variant.price | money_without_currency }}</span>
      </div>
    </div>
  {% endfor %}
</div>

{% schema %}
{
  "name": "Variant Selector",
  "settings": []
}
{% endschema %}
```

**CSS** (add to `assets/main.css`):
```css
.variant-card {
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.variant-card.active,
.variant-card:hover {
  border-color: #FF6B9D;
  box-shadow: 0 4px 12px rgba(255, 107, 157, 0.2);
}

.badge {
  background: #FF6B9D;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}
```

---

### 3. Create Trust Badges Section

**File**: `sections/trust-badges.liquid`

```liquid
<div class="trust-badges">
  {% for block in section.blocks %}
    <div class="badge-item">
      <img src="{{ block.settings.icon | asset_url }}" alt="{{ block.settings.title }}">
      <h4>{{ block.settings.title }}</h4>
      <p>{{ block.settings.description }}</p>
    </div>
  {% endfor %}
</div>

{% schema %}
{
  "name": "Trust Badges",
  "blocks": [
    {
      "type": "badge",
      "name": "Badge",
      "settings": [
        {"type": "text", "id": "icon", "label": "Icon Filename"},
        {"type": "text", "id": "title", "label": "Title"},
        {"type": "textarea", "id": "description", "label": "Description"}
      ]
    }
  ],
  "presets": [{
    "name": "Trust Badges",
    "blocks": [
      {"type": "badge", "settings": {"icon": "imgi_78_ship-min.png", "title": "Free Shipping", "description": "On orders over $50"}},
      {"type": "badge", "settings": {"icon": "imgi_79_support-min.png", "title": "24/7 Support", "description": "Expert help anytime"}},
      {"type": "badge", "settings": {"icon": "imgi_80_natural-min.png", "title": "100% Natural", "description": "Organic ingredients"}},
      {"type": "badge", "settings": {"icon": "imgi_81_guarantee-min.png", "title": "Money Back", "description": "60-day guarantee"}}
    ]
  }]
}
{% endschema %}
```

---

### 4. Create Reviews Section

**File**: `sections/product-reviews.liquid`

```liquid
<div class="reviews-section">
  <div class="reviews-header">
    <h2>Customer Reviews</h2>
    <div class="reviews-summary">
      <div class="star-rating">
        {% for i in (1..5) %}
          <span class="star filled">★</span>
        {% endfor %}
      </div>
      <p>Based on {{ product.metafields.reviews.count | default: 1247 }} reviews</p>
    </div>
  </div>
  
  <div class="reviews-list">
    {% for review in section.blocks %}
      <div class="review-card">
        <div class="review-header">
          <div class="star-rating">
            {% for i in (1..review.settings.rating) %}
              <span class="star filled">★</span>
            {% endfor %}
          </div>
          <span class="verified">
            <img src="{{ 'imgi_76_verified.png' | asset_url }}" alt="Verified">
            Verified Purchase
          </span>
        </div>
        
        <h4>{{ review.settings.title }}</h4>
        <p>{{ review.settings.content }}</p>
        
        <div class="review-author">
          <strong>{{ review.settings.author }}</strong>
          <span>{{ review.settings.date }}</span>
        </div>
      </div>
    {% endfor %}
  </div>
</div>

{% schema %}
{
  "name": "Product Reviews",
  "blocks": [
    {
      "type": "review",
      "name": "Review",
      "settings": [
        {"type": "range", "id": "rating", "min": 1, "max": 5, "default": 5, "label": "Rating"},
        {"type": "text", "id": "title", "label": "Review Title"},
        {"type": "textarea", "id": "content", "label": "Review Content"},
        {"type": "text", "id": "author", "label": "Author Name"},
        {"type": "text", "id": "date", "label": "Date"}
      ]
    }
  ]
}
{% endschema %}
```

---

### 5. Add CSS to `assets/main.css`

Extract styles from `/Users/thanglee/PATI-test/refined-dom.html` and add to `assets/main.css`:

```css
/* Copy CSS variables from refined-dom.html lines 11-133 */
:root {
  --font-body-family: Montserrat, sans-serif;
  --font-heading-family: Trirong, serif;
  --buttons-radius: 0px;
  --color-primary: #FF6B9D;
  /* ... rest of variables */
}

/* Copy component styles from refined-dom.html lines 136-800+ */
```

---

### 6. Add JavaScript for Carousel

**File**: `assets/product-ui.js`

```javascript
// Initialize Slick Carousel
$(document).ready(function() {
  $('.main_product-image-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    asNavFor: '.main_product-image-carousel_thumbs'
  });
  
  $('.main_product-image-carousel_thumbs').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.main_product-image-carousel',
    dots: false,
    centerMode: false,
    focusOnSelect: true
  });
});
```

Add to `layout/theme.liquid`:
```liquid
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
{{ 'product-ui.js' | asset_url | script_tag }}
```

---

### 7. Update `templates/product.json`

```json
{
  "sections": {
    "product-gallery": {
      "type": "product-gallery"
    },
    "variant-selector": {
      "type": "variant-selector"
    },
    "trust-badges": {
      "type": "trust-badges"
    },
    "product-reviews": {
      "type": "product-reviews"
    }
  },
  "order": [
    "product-gallery",
    "variant-selector",
    "trust-badges",
    "product-reviews"
  ]
}
```

---

## 🔄 App Replacements

| Original App | Liquid Alternative |
|--------------|-------------------|
| Kaching Cart | Shopify Ajax Cart + custom CSS |
| Kaching Bundles | Liquid variant loop |
| Judge.me Reviews | Static Liquid blocks (above) |
| Analytics | Add via Shopify theme settings |

---

## ✅ Testing

```bash
cd /Users/thanglee/PATI-test/Sculptique
shopify theme dev
```

Open preview URL and verify:
- [ ] Product images display in carousel
- [ ] Variant cards show with pink borders
- [ ] Trust badges render correctly
- [ ] Reviews section displays
- [ ] Mobile responsive layout works

---

## 📚 Reference Files

- **Clean HTML**: `/Users/thanglee/PATI-test/refined-dom.html`
- **Detailed Guide**: `/Users/thanglee/.gemini/antigravity/brain/.../ui-cloning-instructions.md`
- **Assets**: `/Users/thanglee/PATI-test/Sculptique/assets/` (99+ files)

---

**Last Updated**: 2026-02-04  
**Status**: Ready for implementation
