export interface ProductStory {
  farmAndProducer: {
    title: string;
    body: string;
    altitude?: string;
    region?: string;
    producer?: string;
  };
  coffeeAndProcess: {
    title: string;
    body: string;
    variety?: string;
    processing?: string;
    harvest?: string;
  };
  brewGuide: {
    recommended: string[];
    ratio?: string;
    temperature?: string;
    grindSize?: string;
    steps: string[];
  };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category:
    | "coffee-beans"
    | "brewing-gear"
    | "merchandise"
    | "gift-sets"
    | "subscriptions";
  origin?: string;
  roastProfile?: "light" | "medium" | "dark" | "espresso";
  tastingNotes?: string[];
  producer?: string;
  harvest?: string;
  story: ProductStory;
  awards?: string[];
  certifications?: string[];
  elevation?: string;
  processingMethod?: string;
  variety?: string;
  weightOptions?: string[];
  grindOptions?: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedWeight?: string;
  selectedGrind?: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  heroImage: string;
  theme: "dark" | "light";
  accentColor: string;
  productCount: number;
  badge: string | null;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  coverImage: string;
  category: "brew-guides" | "origin-stories" | "news" | "recipes";
  author: string;
  publishedAt: string;
  readTime: number;
}
