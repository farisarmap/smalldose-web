# Coffee Shop Platform — Page Map

## Reference Site
https://archerscoffee.com

## Brand
- Name: Smalldose
- Tagline: [YOUR TAGLINE]
- Market: Indonesia (primary) with global support
- Aesthetic: luxury editorial, dark earthy tones, cinematic photography, serif + sans typography

---

## Pages

### 1. Homepage `/`
**Purpose:** First impression, brand story, drive to shop

**Sections:**
- Sticky Navbar (transparent → solid on scroll, with currency switch `Rp / $`)
- Hero — full-viewport, dark overlay, serif headline, 2 CTAs
- Featured Collections — 3 cards (Beans, Gear, Merch)
- Bestsellers — 4-column product grid
- Brand Story Teaser — 50/50 image + text
- Blog/Brew Guides Preview — 3 article cards
- Footer

**Components used:** Navbar, HeroSection, CollectionCard, ProductCard, Footer

---

### 2. Shop `/shop`
**Purpose:** Browse and filter all products

**Sections:**
- Page header (title + breadcrumb)
- Sidebar filters (desktop) / Drawer filters (mobile)
- Product grid (3 col desktop, 2 tablet, 1 mobile)
- Sort dropdown
- Pagination or infinite scroll

**Filters:**
- Category: Coffee Beans, Brewing Equipment, Merchandise
- Roast: Light, Medium, Dark, Espresso
- Origin: Ethiopia, Colombia, Panama, Rwanda, Guatemala, Indonesia
- Price range

**Components used:** ProductCard, FilterSidebar, SortDropdown

---

### 3. Product Detail `/shop/[slug]`
**Purpose:** Convert visitor to buyer — most important page

**Sections:**
- Breadcrumb
- Image gallery (main + thumbnails)
- Product info (origin tag, name, producer, tasting notes, price)
- Options (weight selector, grind selector)
- Quantity + Add to Cart + Wishlist
- Shipping note
- Tabs: Description | Brew Guide | Farm Story | Reviews
- Related products (4 cards)

**Components used:** ProductGallery, TastingNotes, OptionSelector, QuantityPicker, ProductCard

---

### 4. Collections `/collections/[slug]`
**Purpose:** Curated product groupings

**Slugs:** coffee-beans, brewing-gear, merchandise, gift-sets, subscriptions

**Sections:**
- Full-width collection hero (image + title + description)
- Filtered product grid (same as /shop but pre-filtered)

---

### 5. Cart (Drawer — not a page)
**Purpose:** Review items before checkout

**Content:**
- Slide-in drawer from right
- Cart items (image, name, options, quantity controls, remove)
- Order summary (subtotal, shipping estimate, total)
- Checkout CTA button
- Continue Shopping link

**State:** Zustand cartStore

---

### 6. Checkout `/checkout`
**Purpose:** Complete the purchase

**Flow:**
- Stripe Checkout session (hosted) OR custom form
- Fields: email, shipping address, payment
- Order summary sidebar

**API route:** `/app/checkout/route.ts` → creates Stripe session

---

### 7. Order Success `/checkout/success`
**Purpose:** Confirm order and delight the customer

**Sections:**
- Thank you message + order number
- Order summary (items, total, address)
- Estimated delivery
- CTAs: Continue Shopping, View Account

---

### 8. Our Story `/about`
**Purpose:** Build brand trust and emotional connection

**Sections:**
- Full-width hero image with headline
- Brand origin story (text + images)
- Values (3–4 icons with short descriptions)
- Team / roasters section
- CTA to shop

---

### 9. Blog `/blog`
**Purpose:** SEO + educate customers (brew guides, origin stories)

**Sections:**
- Page header
- Featured article (large)
- Article grid (3 columns)
- Category filter tabs (Brew Guides, Origin Stories, News, Recipes)

---

### 10. Blog Post `/blog/[slug]`
**Purpose:** Long-form editorial content

**Sections:**
- Article header (category, title, date, author, read time)
- Hero image
- Rich text body (headings, images, pull quotes)
- Author bio
- Related articles (3 cards)

---

### 11. Account `/account`
**Purpose:** Customer self-service

**Sub-pages:**
- `/account` — Dashboard (recent orders, quick links)
- `/account/orders` — Order history
- `/account/orders/[id]` — Order detail
- `/account/profile` — Edit name, email, password
- `/account/addresses` — Saved addresses

**Auth:** NextAuth.js or Clerk

---

### 12. Auth Pages
- `/login` — Email + password, Google OAuth option
- `/register` — Sign up form
- `/forgot-password` — Reset flow

---

## Shared Components

| Component | Location | Used On |
|---|---|---|
| Navbar | /components/Navbar.tsx | All pages |
| Footer | /components/Footer.tsx | All pages |
| ProductCard | /components/ProductCard.tsx | Shop, Homepage, Related |
| CartDrawer | /components/CartDrawer.tsx | All pages (global) |
| CollectionCard | /components/CollectionCard.tsx | Homepage, Collections |
| ArticleCard | /components/ArticleCard.tsx | Blog, Homepage |
| FilterSidebar | /components/FilterSidebar.tsx | Shop, Collections |
| SearchBar | /components/SearchBar.tsx | Navbar |

---

## UI Primitives (`/components/ui/`)

| Component | Variants |
|---|---|
| Button | primary, secondary, ghost, outline |
| Badge | origin tag, roast tag, category tag |
| Container | default (max-w-7xl centered) |
| Section | default (vertical padding) |
| Input | text, email, password, search |
| Select | default dropdown |
| Tabs | underline style |
| Skeleton | card, text, image (loading states) |

---

## Data & State

| File | Purpose |
|---|---|
| /data/products.ts | Mock product data (8+ items) |
| /data/collections.ts | Mock collection data |
| /data/articles.ts | Mock blog post data |
| /store/cartStore.ts | Zustand cart state |
| /store/uiStore.ts | Zustand UI state (cart open, menu open) |
| /lib/currency.ts | Currency formatting/conversion (IDR default, USD optional) |
| /lib/stripe.ts | Stripe client setup |
| /lib/sanity.ts | Sanity CMS client (optional) |
| /types/index.ts | Shared TypeScript interfaces |

---

## TypeScript Interfaces (`/types/index.ts`)
```ts
export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number // stored in IDR
  images: string[]
  category: 'coffee-beans' | 'brewing-gear' | 'merchandise'
  origin?: string
  roastProfile?: 'light' | 'medium' | 'dark' | 'espresso'
  tastingNotes?: string[]
  producer?: string
  harvest?: string
  weightOptions?: string[]
  grindOptions?: string[]
  isFeatured?: boolean
  isBestseller?: boolean
}

export interface CartItem extends Product {
  quantity: number
  selectedWeight?: string
  selectedGrind?: string
}

export interface Collection {
  id: string
  slug: string
  name: string
  description: string
  image: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  coverImage: string
  category: 'brew-guides' | 'origin-stories' | 'news' | 'recipes'
  author: string
  publishedAt: string
  readTime: number
}
```

---

## File Structure
```
/app
  /(shop)
    /shop
      /[slug]/page.tsx
      page.tsx
    /collections
      /[slug]/page.tsx
  /(checkout)
    /checkout
      /success/page.tsx
      route.ts
  /(content)
    /blog
      /[slug]/page.tsx
      page.tsx
    /about
      page.tsx
  /(auth)
    /login/page.tsx
    /register/page.tsx
  /account
    /orders/page.tsx
    /profile/page.tsx
  layout.tsx
  page.tsx

/components
  /ui
    Button.tsx
    Badge.tsx
    Container.tsx
    Section.tsx
    Input.tsx
    Skeleton.tsx
    Tabs.tsx
  Navbar.tsx
  Footer.tsx
  ProductCard.tsx
  CartDrawer.tsx
  CollectionCard.tsx
  ArticleCard.tsx
  FilterSidebar.tsx
  ProductGallery.tsx
  TastingNotes.tsx
  OptionSelector.tsx

/store
  cartStore.ts
  uiStore.ts

/data
  products.ts
  collections.ts
  articles.ts

/types
  index.ts

/lib
  stripe.ts
  sanity.ts

/styles
  globals.css

/docs
  page-map.md        ← this file
  prompts/
    new-page.md
    new-component.md

/public
  /images

.cursorrules
.env.example
```

---

## Build Order (recommended)

1. Design system (`globals.css`, `tailwind.config.ts`)
2. TypeScript interfaces (`/types/index.ts`)
3. Mock data (`/data/`)
4. Zustand stores (`/store/`)
5. UI primitives (`/components/ui/`)
6. Shared layout components (Navbar, Footer, CartDrawer)
7. Homepage
8. Shop page
9. Product detail page
10. Cart + Checkout
11. Remaining pages (About, Blog, Account)

---

## Localization & Currency

- Default storefront currency: `IDR` (Rupiah)
- Optional secondary currency: `USD`
- Currency switcher appears in Navbar and affects product cards, cart, and checkout totals
- Product mock `price` values should be stored in IDR, then converted for USD display