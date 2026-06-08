// Single source of truth for the services shown on the homepage and the
// booking page. Add or edit a service here and both pages update.

export type PriceModel = "storage" | "quote";

export interface ServiceInfo {
  id: string;            // used in the booking URL, e.g. /booking?service=storage
  name: string;          // display title
  icon: string;          // key into the icon map in the components
  tagline: string;       // short line shown on the card
  description: string;   // fuller explanation shown in the popup
  pricing: { label: string; value: string }[];
  priceModel: PriceModel; // "storage" = lane-based instant price; "quote" = price confirmed by email
  highlight?: string;     // optional badge, e.g. "SAME DAY SERVICE"
}

export const SERVICES: ServiceInfo[] = [
  {
    id: "fulfillment",
    name: "Fulfillment - Ecommerce",
    icon: "ShoppingCart",
    tagline: "Pick, pack & ship your online orders.",
    description:
      "We store your products and ship them to your customers as orders come in. You focus on selling; we handle the labeling, boxing, picking, packing, and supplies so every order goes out fast and accurately.",
    pricing: [
      { label: "Label", value: "$1.00" },
      { label: "Box fee", value: "$1.00" },
      { label: "Pick & pack", value: "$1.00" },
      { label: "Supplies", value: "$1.00" },
    ],
    priceModel: "quote",
  },
  {
    id: "crossdocking",
    name: "Crossdocking",
    icon: "Truck",
    tagline: "Same-day freight transfer, no storage needed.",
    description:
      "Freight comes in on one truck and goes straight back out on another the same day — no long-term storage required. Ideal for moving pallets quickly between carriers while keeping costs low.",
    pricing: [
      { label: "Per pallet in", value: "$10" },
      { label: "Per pallet out", value: "$10" },
    ],
    priceModel: "quote",
    highlight: "⚡ SAME DAY SERVICE",
  },
  {
    id: "storage",
    name: "Storage",
    icon: "Package",
    tagline: "Flexible pallet storage — no contracts needed.",
    description:
      "Secure, flexible pallet storage you can reserve by the month. No contracts required, free unloads on 10+ pallets, and a free month when you commit to 3 months. Reserve as many lanes as you need and pick your own dates.",
    pricing: [
      { label: "Per pallet / month", value: "$20" },
      { label: "Free unloads", value: "10+ pallets" },
      { label: "Free month", value: "3-month term" },
    ],
    priceModel: "storage",
  },
  {
    id: "delivery",
    name: "Delivery",
    icon: "Truck",
    tagline: "Custom delivery solutions for your freight.",
    description:
      "Need your freight delivered? We build custom delivery solutions around your routes, timing, and volume. Tell us what you need and we'll put together a personalized quote.",
    pricing: [{ label: "Pricing", value: "Custom quote" }],
    priceModel: "quote",
  },
  {
    id: "labeling",
    name: "Labeling & Rework",
    icon: "Box",
    tagline: "Relabeling, rewrapping & product rework.",
    description:
      "We relabel, rewrap, and rework your products to meet retailer or marketplace requirements — getting your inventory compliant and shelf-ready without you lifting a finger.",
    pricing: [
      { label: "Rewrap work", value: "$25 / pallet" },
      { label: "Relabeling", value: "$1 / label" },
    ],
    priceModel: "quote",
  },
  {
    id: "floor-loading",
    name: "Floor Loading / Unload",
    icon: "Package",
    tagline: "Hand-loading & unloading of floor-loaded containers.",
    description:
      "Floor-loaded container? We'll hand-load or unload it for you, pallet by pallet, carefully and quickly — so your dock keeps moving.",
    pricing: [
      { label: "40 ft container", value: "$500" },
      { label: "53 footer", value: "$800" },
    ],
    priceModel: "quote",
  },
  {
    id: "inventory",
    name: "Inventory Count",
    icon: "Package",
    tagline: "Accurate counts tailored to your warehouse.",
    description:
      "Know exactly what you have on hand. We perform accurate inventory counts tailored to your warehouse and reporting needs. Contact us for pricing based on your volume.",
    pricing: [{ label: "Pricing", value: "Custom quote" }],
    priceModel: "quote",
  },
];

export function getService(id: string | null | undefined): ServiceInfo | undefined {
  if (!id) return undefined;
  return SERVICES.find((s) => s.id === id);
}
