import type { Collection } from "@/types";

/** Remote images until assets exist under /public/images/collections/ */
const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const collections: Collection[] = [
  {
    id: "1",
    slug: "coffee-beans",
    name: "Single Origin Beans",
    tagline: "Traced to the farm. Roasted to order.",
    description: `Every coffee we carry has a name, a place, and a story. 
    No house blends, no mystery origins — just exceptional single-origin 
    beans sourced directly from producers we visit and trust. Light roasts 
    that sing in pour over. Espresso profiles built for clarity and sweetness. 
    Each one telling you exactly where it came from and why it matters.`,
    image: img("smalldose-beans", 800, 600),
    heroImage: img("smalldose-beans-hero", 1920, 1080),
    theme: "dark",
    accentColor: "#5BB8F5",
    productCount: 12,
    badge: "Most Popular",
  },
  {
    id: "2",
    slug: "brewing-gear",
    name: "Brewing Equipment",
    tagline: "The tools that make the difference.",
    description: `Great coffee deserves great equipment. We curated this 
    collection after years of testing — every item here is something we 
    actually use in the roastery. Pour over drippers, precision kettles, 
    burr grinders, and everything in between. Built to last, designed to 
    improve your cup immediately.`,
    image: img("smalldose-gear", 800, 600),
    heroImage: img("smalldose-gear-hero", 1920, 1080),
    theme: "light",
    accentColor: "#1E6FAD",
    productCount: 8,
    badge: null,
  },
  {
    id: "3",
    slug: "merchandise",
    name: "Smalldose Merchandise",
    tagline: "Wear the obsession.",
    description: `For the ones who think about coffee even when they're 
    not drinking it. Clean designs, quality materials, orbital motifs. 
    Carry the brand that started in a small roastery in Cirebon and 
    grew into something bigger.`,
    image: img("smalldose-merch", 800, 600),
    heroImage: img("smalldose-merch-hero", 1920, 1080),
    theme: "dark",
    accentColor: "#5BB8F5",
    productCount: 6,
    badge: "New",
  },
  {
    id: "4",
    slug: "gift-sets",
    name: "Gift Sets",
    tagline: "The gift for someone who deserves better coffee.",
    description: `Curated bundles that make gifting easy and impressive. 
    A bag of our best beans paired with the right brewer. A tasting flight 
    of three origins. An equipment starter kit for the curious beginner. 
    Every set comes in Smalldose packaging with a hand-written origin card.`,
    image: img("smalldose-gifts", 800, 600),
    heroImage: img("smalldose-gifts-hero", 1920, 1080),
    theme: "light",
    accentColor: "#1E6FAD",
    productCount: 4,
    badge: "Gift Ready",
  },
  {
    id: "5",
    slug: "subscriptions",
    name: "Coffee Subscriptions",
    tagline: "A new origin in your door. Every month.",
    description: `We rotate our subscription offerings based on what's 
    freshest and most exciting at the roastery. Subscribers get first 
    access to new arrivals, harvest updates, and exclusive micro-lots 
    that never hit the main shop. Choose your frequency, your roast 
    preference, and your grind. We handle the rest.`,
    image: img("smalldose-subs", 800, 600),
    heroImage: img("smalldose-subs-hero", 1920, 1080),
    theme: "dark",
    accentColor: "#5BB8F5",
    productCount: 3,
    badge: "Save 15%",
  },
];
