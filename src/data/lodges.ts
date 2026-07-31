import { Waves, Coffee, Moon, UtensilsCrossed, Sparkles } from "lucide-react";

// Types
export interface LodgeAmenity {
  name: string;
  desc: string;
  iconName: "Waves" | "Coffee" | "Moon" | "UtensilsCrossed" | "Sparkles";
}

export interface Lodge {
  id: string;
  name: string;
  location: string;
  tagline: string;
  overview: string;
  architecture: string;
  capacity: string;
  staffRatio: string;
  poolSpa: string;
  powerGrid: string;
  stargazing: string;
  heroImage: string;
  bedroomImage: string;
  bathroomImage: string;
  lifestyleImage: string;
  features: string[];
  amenities: LodgeAmenity[];
  tag: string;
}

// Data
export const LODGES: Record<string, Lodge> = {
  "1": {
    id: "1",
    name: "Kikuyo Lodge",
    location: "Ivorytip Highlands Conservancy, South Africa",
    tagline: "Colonial opulence meeting the ridge height of the savanna, crafted for custom groups who demand absolute grandeur.",
    overview: "Kikuyo Lodge is the majestic crown jewel of the Ivorytip conservancy. Anchored into ancient granite ridges, it commands infinite sweeps of the savanna below. This flagship sanctuary features high-thatch vaulted ceilings, handcrafted stone fireplaces, and an open boma dining setup where stories are shared over local vintage wines. Kikuyo is managed exclusively for single hunting parties, guaranteeing complete visual and social isolation.",
    architecture: "Constructed using locally quarried slate, ironwood columns, and thatch, the lodge blends seamlessly into the ridge. Floor-to-ceiling glass paneling slides open to harness natural breezes, cooling the luxury suites naturally.",
    capacity: "Up to 12 guests",
    staffRatio: "2:1 private hosting ratio",
    poolSpa: "Heated infinity pool overlooking the savanna canyon",
    powerGrid: "Hybrid solar array with multi-stage mineral water filtration",
    stargazing: "Elevated stargazing tower with vintage optical telescope",
    heroImage: "/assets/Main Lodge Internal.jpg",
    bedroomImage: "/assets/lodge_signature_bedroom.jpg",
    bathroomImage: "/assets/lodge_signature_dining.jpg",
    lifestyleImage: "/assets/Dinner.jpg",
    tag: "Highland Grandeur",
    features: [
      "Exclusive buyout for single hunting groups",
      "Heated panoramic canyon infinity pool",
      "Private custom off-road hunting vehicles",
      "Traditional open boma dining under camelthorn canopies",
      "Dedicated professional hunter suite wings",
      "Full gun-room and secure armory storage"
    ],
    amenities: [
      { name: "Canyon Infinity Pool", desc: "Heated pool hanging over a 200-meter drop.", iconName: "Waves" },
      { name: "Ancestral Library", desc: "Curated collection of early African hunting diaries and single-malt brandies.", iconName: "Coffee" },
      { name: "Thatch Vault Suites", desc: "Su suites with freestanding copper tubs and open stone fireplaces.", iconName: "Moon" },
      { name: "Circular Dining Boma", desc: "Chef-hosted circular fire boma serving aged kudu and gemsbuck steaks.", iconName: "UtensilsCrossed" }
    ]
  },
  "2": {
    id: "2",
    name: "Emanzini Lodge",
    location: "Secluded Valley Waterways, South Africa",
    tagline: "An intimate, luxury canvas oasis tucked into secluded valley wetlands, designed for ultimate privacy and wild proximity.",
    overview: "Emanzini Lodge is nestled adjacent to the natural springs of the private valley floor, visual miles from any other structure. It is a sanctuary of canvas, teak, and water. Slide back the canvas walls to listen to wild kudu drinking at the natural pool just yards from your bed, or relax in the sunken deck watching leopards follow the river tracks. Ideal for companions and couples seeking luxury in pure isolation.",
    architecture: "Floating wooden decks, double-layered canvas ceilings, and heavy canvas walls that zip completely open. Designed to integrate indoor comforts directly with the wet bushveld habitat.",
    capacity: "2 to 4 guests (Intimate buyout)",
    staffRatio: "3:1 private team (Butler, tracker, chef)",
    poolSpa: "Sunken hot-tub plunge pool on private floating deck",
    powerGrid: "Off-grid silent battery grid with pure borehole spring water",
    stargazing: "Retractable sky-roof bed layout for sleeping directly under the stars",
    heroImage: "/assets/Couples Retreat.jpg",
    bedroomImage: "/assets/lodge_couples_bedroom.jpg",
    bathroomImage: "/assets/lodge_couples_bathroom.jpg",
    lifestyleImage: "/assets/campfire.jpg",
    tag: "Lakeside Solitude",
    features: [
      "Total visual isolation in private valley coordinates",
      "Retractable stargazing bedroom canvas panels",
      "Sunken plunge pool and fireside deck directly on the stream",
      "Open-air copper rain showers under acacia branches",
      "Private guide and specialized tracker for walking safaris",
      "Chef-prepared bush picnic tables set up on remote ridges"
    ],
    amenities: [
      { name: "Sunken Wetland Tub", desc: "Sunken hot tub on a floating teak deck.", iconName: "Waves" },
      { name: "Valley Plunge Pool", desc: "Duo plunge pool fed by natural spring water.", iconName: "Sparkles" },
      { name: "Sky-View Bed", desc: "King-size bed aligned under clear canopy inserts for raw stargazing.", iconName: "Moon" },
      { name: "Private Table Boma", desc: "Intimate two-seat dining boma beside the valley river.", iconName: "UtensilsCrossed" }
    ]
  }
};

export const LODGES_LIST = Object.values(LODGES);
