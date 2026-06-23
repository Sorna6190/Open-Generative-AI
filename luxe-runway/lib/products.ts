/**
 * Typed product catalog for LUXE RUNWAY.
 *
 * Each gown is rendered procedurally in Three.js (no binary GLB required), driven by:
 *   - `silhouette` → which parametric dress geometry to build
 *   - `fabric`     → which PBR material profile (silk / satin / velvet)
 *   - `colors`     → real-time switchable color variants
 *
 * To use real GLB models later, add an optional `model: '/models/foo.glb'` field and
 * branch on it inside <Dress /> (loader path is documented in README).
 */

export type Fabric = "silk" | "satin" | "velvet";
export type Silhouette = "aline" | "mermaid" | "ballgown" | "sheath" | "empire";
export type Occasion = "wedding" | "gala" | "party" | "redcarpet";
export type Category = "gown" | "bridal" | "cocktail";

export interface ColorVariant {
  name: string;
  /** Base/bodice color */
  hex: string;
  /** Optional accent used for trims & skirt gradient; falls back to hex */
  accent?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  designer: string;
  price: number;
  category: Category;
  occasion: Occasion[];
  fabric: Fabric;
  silhouette: Silhouette;
  colors: ColorVariant[];
  description: string;
  details: string[];
  /** Featured on the home runway hero */
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "lr-001",
    slug: "aurelia-silk-gown",
    name: "Aurélia",
    designer: "Maison Lumen",
    price: 4200,
    category: "gown",
    occasion: ["gala", "redcarpet"],
    fabric: "silk",
    silhouette: "mermaid",
    featured: true,
    colors: [
      { name: "Champagne", hex: "#c8a45d", accent: "#e6cf9a" },
      { name: "Noir", hex: "#14121a", accent: "#3a3340" },
      { name: "Burgundy", hex: "#5c1024", accent: "#8a1f3a" },
    ],
    description:
      "A liquid-silk mermaid gown that pours over the figure and breaks into a dramatic train. Cut on the bias for a moving, mirror-like sheen.",
    details: ["Bias-cut mulberry silk", "Sweeping chapel train", "Hand-finished hem", "Concealed back zip"],
  },
  {
    id: "lr-002",
    slug: "celestine-ballgown",
    name: "Céleste",
    designer: "Atelier Voile",
    price: 6800,
    category: "gown",
    occasion: ["gala", "wedding"],
    fabric: "satin",
    silhouette: "ballgown",
    featured: true,
    colors: [
      { name: "Ivory", hex: "#f6f1e7", accent: "#e6cf9a" },
      { name: "Powder Rose", hex: "#e7c4c0", accent: "#f3dad6" },
      { name: "Midnight", hex: "#0e1430", accent: "#27407a" },
    ],
    description:
      "An architectural satin ballgown with a sculpted bodice and a voluminous skirt that catches every spotlight on the runway.",
    details: ["Duchess satin", "Boned corset bodice", "Layered tulle understructure", "Cathedral volume"],
  },
  {
    id: "lr-003",
    slug: "noir-velvet-sheath",
    name: "Obsidienne",
    designer: "Maison Lumen",
    price: 3400,
    category: "cocktail",
    occasion: ["party", "redcarpet"],
    fabric: "velvet",
    silhouette: "sheath",
    featured: true,
    colors: [
      { name: "Noir", hex: "#0b0a0f", accent: "#2a2730" },
      { name: "Emerald", hex: "#0b3b2e", accent: "#1c6b50" },
      { name: "Sapphire", hex: "#0d2347", accent: "#2247a0" },
    ],
    description:
      "A column of deep crushed velvet — minimalist, light-drinking and unmistakably modern for the red carpet.",
    details: ["Crushed silk velvet", "Floor-grazing column", "Plunge back", "Invisible side seams"],
  },
  {
    id: "lr-004",
    slug: "seraphine-bridal",
    name: "Séraphine",
    designer: "Atelier Voile",
    price: 9200,
    category: "bridal",
    occasion: ["wedding"],
    fabric: "satin",
    silhouette: "aline",
    colors: [
      { name: "Ivory", hex: "#f6f1e7", accent: "#fffaf0" },
      { name: "Blush", hex: "#f1ddd4", accent: "#fbeee7" },
    ],
    description:
      "A timeless A-line bridal gown in luminous satin, with a softly structured bodice and an effortless floor sweep.",
    details: ["Italian satin", "A-line silhouette", "Buttoned back", "Detachable train"],
  },
  {
    id: "lr-005",
    slug: "vesper-empire-gown",
    name: "Vesper",
    designer: "Maison Lumen",
    price: 3900,
    category: "gown",
    occasion: ["gala", "party"],
    fabric: "silk",
    silhouette: "empire",
    colors: [
      { name: "Burgundy", hex: "#5c1024", accent: "#8a1f3a" },
      { name: "Champagne", hex: "#c8a45d", accent: "#e6cf9a" },
      { name: "Forest", hex: "#1f3a2c", accent: "#3c6b50" },
    ],
    description:
      "An empire-waist silk gown with a fluid, candle-lit drape — romantic, weightless, and endlessly photogenic.",
    details: ["Charmeuse silk", "Empire waist", "Flowing column skirt", "Draped neckline"],
  },
  {
    id: "lr-006",
    slug: "lumiere-mermaid",
    name: "Lumière",
    designer: "Atelier Voile",
    price: 5100,
    category: "gown",
    occasion: ["redcarpet", "gala"],
    fabric: "satin",
    silhouette: "mermaid",
    colors: [
      { name: "Liquid Gold", hex: "#b8860b", accent: "#f0d98c" },
      { name: "Onyx", hex: "#101015", accent: "#34303c" },
      { name: "Ruby", hex: "#6e0f24", accent: "#a51e3e" },
    ],
    description:
      "A high-shine satin mermaid gown engineered to reflect flashbulbs — every step sends light rippling down the train.",
    details: ["Mirror satin", "Fishtail train", "Sculpted hips", "Corseted interior"],
  },
  {
    id: "lr-007",
    slug: "aria-cocktail",
    name: "Aria",
    designer: "Maison Lumen",
    price: 2200,
    category: "cocktail",
    occasion: ["party"],
    fabric: "silk",
    silhouette: "sheath",
    colors: [
      { name: "Rosé", hex: "#d98a9e", accent: "#efb9c6" },
      { name: "Ivory", hex: "#f6f1e7", accent: "#fffaf0" },
      { name: "Noir", hex: "#14121a", accent: "#3a3340" },
    ],
    description:
      "A knee-grazing silk cocktail dress with a fluid drape — the effortless answer to any soirée.",
    details: ["Washed silk", "Cocktail length", "Cowl neck", "Slip lining"],
  },
  {
    id: "lr-008",
    slug: "imperatrice-ballgown",
    name: "Impératrice",
    designer: "Atelier Voile",
    price: 7600,
    category: "gown",
    occasion: ["gala", "redcarpet"],
    fabric: "velvet",
    silhouette: "ballgown",
    colors: [
      { name: "Burgundy", hex: "#5c1024", accent: "#8a1f3a" },
      { name: "Imperial Purple", hex: "#3a1054", accent: "#6a2a98" },
      { name: "Midnight", hex: "#0e1430", accent: "#27407a" },
    ],
    description:
      "A regal velvet ballgown with a commanding silhouette and a skirt that moves like molten shadow.",
    details: ["Silk velvet", "Off-shoulder bodice", "Full circle skirt", "Grand train"],
  },
];

/* ----------------------------- selectors ----------------------------- */

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeatured(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

/**
 * Simple content-based "You may also like" — ranks by shared occasion + fabric,
 * excluding the current product. Stands in for an ML recommender.
 */
export function getRecommendations(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return PRODUCTS.slice(0, limit);

  return PRODUCTS.filter((p) => p.slug !== slug)
    .map((p) => {
      const sharedOccasion = p.occasion.filter((o) => current.occasion.includes(o)).length;
      const sameFabric = p.fabric === current.fabric ? 1 : 0;
      const sameCategory = p.category === current.category ? 1 : 0;
      return { p, score: sharedOccasion * 2 + sameFabric + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export const PRICE_BOUNDS = {
  min: Math.min(...PRODUCTS.map((p) => p.price)),
  max: Math.max(...PRODUCTS.map((p) => p.price)),
};

export const ALL_OCCASIONS: Occasion[] = ["wedding", "gala", "party", "redcarpet"];
export const ALL_CATEGORIES: Category[] = ["gown", "bridal", "cocktail"];

export const OCCASION_LABELS: Record<Occasion, string> = {
  wedding: "Wedding",
  gala: "Gala",
  party: "Party",
  redcarpet: "Red Carpet",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  gown: "Evening Gown",
  bridal: "Bridal",
  cocktail: "Cocktail",
};
