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
  galleryImages?: string[];
  features: string[];
  amenities: LodgeAmenity[];
  tag: string;
}

// Data
export const LODGES: Record<string, Lodge> = {
  "1": {
    id: "1",
    name: "Kikuyu Lodge",
    location: "Eastern Cape, South Africa (near Alexandria)",
    tagline: "Classic 5-star comfort positioned on the high banks of the Bushmans River.",
    overview: "Kikuyu Lodge is the flagship accommodation of Ivorytip Safaris. Anchored above the Bushmans River, it offers absolute privacy and peaceful views. The lodge features high-thatch vaulted ceilings, handcrafted stone fireplaces, and an open boma dining area. Managed exclusively for single hunting parties, Kikuyu guarantees complete visual and social isolation for you and your companions.",
    architecture: "Constructed using locally quarried slate, ironwood columns, and traditional thatch roofing, the suites are designed to remain naturally comfortable throughout the year.",
    capacity: "Up to 4 guests (2 couples)",
    staffRatio: "Dedicated host, chef, and tracker team",
    poolSpa: "River View Deck",
    powerGrid: "Solar-powered array with clean spring water filtration",
    stargazing: "Fireside boma under clear southern skies",
    heroImage: "/assets/kikuyu/New lodge Hero.jpg",
    bedroomImage: "/assets/kikuyu/Sable room 4.jpg",
    bathroomImage: "/assets/kikuyu/Sable Room Balcony.jpg",
    lifestyleImage: "/assets/kikuyu/DSC08426.jpg",
    galleryImages: [
      "/assets/kikuyu/New lodge Hero.jpg",
      "/assets/kikuyu/Sable Room Balcony.jpg",
      "/assets/kikuyu/Sable room 4.jpg",
      "/assets/kikuyu/DSC08426.jpg",
      "/assets/kikuyu/DSC08463.jpg",
      "/assets/kikuyu/DSC08465.jpg",
      "/assets/kikuyu/DSC08479.jpg",
      "/assets/kikuyu/DSC08492.jpg",
      "/assets/kikuyu/DSC08497.jpg"
    ],
    tag: "Highland Grandeur",
    features: [
      "Exclusive buyout for single hunting groups",
      "Private balconies overlooking the Bushmans River",
      "Traditional boma dining area under acacia canopies",
      "Thatch roof suites (Rhino Room & Sable Room) with en-suite bathrooms",
      "Full gun-room and secure armory storage"
    ],
    amenities: [
      { name: "River View Balconies", desc: "Private balconies overlooking the Bushmans River channel.", iconName: "Waves" },
      { name: "Thatch Roof Suites", desc: "Rhino Room & Sable Room, featuring 5-star comfort and style.", iconName: "Moon" },
      { name: "En-suite Bathrooms", desc: "Private en-suite bathroom layouts in each room.", iconName: "Sparkles" },
      { name: "Circular Dining Boma", desc: "Fireside dining boma serving local dishes prepared over open coals.", iconName: "UtensilsCrossed" }
    ]
  },
  "2": {
    id: "2",
    name: "Emanzini Lodge",
    location: "Eastern Cape, South Africa (near Alexandria)",
    tagline: "An intimate valley retreat, perfect for groups, families, and weddings.",
    overview: "Emanzini Lodge is nestled in a secluded valley, surrounded by open wetlands. Featuring a main lodge with 4 comfortable rooms and 3 private chalets, the camp offers an intimate wilderness experience where wildlife frequently comes up to the fence. The lodge is decorated with traditional taxidermy and rugs, and features an indoor braai built directly into the main dining table.",
    architecture: "A combination of wood, stone, and canvas structures designed to provide standard modern comforts in a classic valley setting.",
    capacity: "Up to 14 guests (3 chalets & 4 rooms, hosting 7 couples)",
    staffRatio: "Dedicated host, chef, and tracker team",
    poolSpa: "Sunken plunge pool on fireside deck",
    powerGrid: "Solar-powered battery backup with borehole spring water",
    stargazing: "Open fireside deck and outdoor lounge",
    heroImage: "/assets/emanzini/Emanzini Internal.jpg",
    bedroomImage: "/assets/emanzini/Emanzini Chalet 2.jpg",
    bathroomImage: "/assets/emanzini/Emanzini Chalet 3.jpg",
    lifestyleImage: "/assets/emanzini/DSC09076.jpg",
    galleryImages: [
      "/assets/emanzini/Emanzini Internal.jpg",
      "/assets/emanzini/Emanzini Chalet 2.jpg",
      "/assets/emanzini/Emanzini Chalet 3.jpg",
      "/assets/emanzini/DSC09076.jpg",
      "/assets/emanzini/DSC09092.jpg",
      "/assets/emanzini/DSC09110.jpg",
      "/assets/emanzini/DSC09127.jpg",
      "/assets/emanzini/DSC09136.jpg"
    ],
    tag: "Lakeside Solitude",
    features: [
      "Perfect for group buyouts, families, and weddings",
      "3 private chalets and 4 main lodge rooms (hosting up to 7 couples)",
      "Indoor braai built directly into the dining table",
      "Wildlife frequently viewing right at the camp fence",
      "Specialized tracker for walking and tracking safaris"
    ],
    amenities: [
      { name: "3 Private Chalets", desc: "Comfortable private chalets, each hosting a couple.", iconName: "Moon" },
      { name: "4 Main Lodge Rooms", desc: "4-star rooms inside the main lodge, supporting couples.", iconName: "Sparkles" },
      { name: "Indoor Dining Braai", desc: "Traditional braai built directly into the dining table setup.", iconName: "UtensilsCrossed" },
      { name: "Plunge Pool Deck", desc: "Plunge pool on the deck with open views of the valley.", iconName: "Waves" }
    ]
  }
};

export const LODGES_LIST = Object.values(LODGES);
