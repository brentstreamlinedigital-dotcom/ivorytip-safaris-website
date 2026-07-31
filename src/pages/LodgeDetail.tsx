import React from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { 
  MapPin, 
  Check, 
  ArrowLeft,
  Coffee,
  Sparkles,
  Shield,
  Clock,
  Waves,
  Moon,
  UtensilsCrossed
} from "lucide-react";
import { motion } from "motion/react";

// @ts-ignore
import mainLodgeImage from "../../assets/lodge_signature_bedroom.jpg";
// @ts-ignore
import couplesRetreatImage from "../../assets/lodge_couples_bedroom.jpg";
// @ts-ignore
import woodCabinImage from "../../assets/lodge_timber_lounge.jpg";
// @ts-ignore
import signatureDiningImage from "../../assets/lodge_signature_dining.jpg";
// @ts-ignore
import couplesBathroomImage from "../../assets/lodge_couples_bathroom.jpg";
// @ts-ignore
import timberInteriorImage from "../../assets/lodge_timber_interior.jpg";

interface LodgeData {
  name: string;
  location: string;
  image: string;
  tagline: string;
  tag: string;
  heroImage: string;
  overview: string;
  architecture: string;
  amenities: { name: string; desc: string; icon: any }[];
  features: string[];
}

const LODGES: Record<string, LodgeData> = {
  "1": {
    name: "Ivorytip Signature Lodge",
    location: "Eastern Cape Sanctuary, South Africa",
    image: mainLodgeImage,
    tagline: "The majestic heartbeat of our wilderness sanctuary, combining colonial opulence with state-of-the-art luxuries.",
    tag: "Sanctuary Grandeur",
    heroImage: signatureDiningImage,
    overview: "Built as the crowning achievement of our South African sanctuary, the Signature Lodge sits atop high ridges overlooking the valleys. Melding traditional colonial thatch architecture with modern high-design elements, it represents the absolute peak of safari hospitality.",
    architecture: "Constructed using locally quarried Eastern Cape granite and solid hand-carved mahogany, the lodge provides natural geothermal cooling, open libraries, and vaulted ceilings that frame panoramic wind drafts.",
    amenities: [
      { name: "Infinity Pool", desc: "Heated panoramic pool jutting directly over the high cliffs.", icon: Waves },
      { name: "Signature Library", desc: "Curated vintage collections of travel journals and rare maps alongside local spirits.", icon: Coffee },
      { name: "High Thatch Stone Suites", desc: "Spacious master suites with freestanding copper baths and open fireplaces.", icon: Moon },
      { name: "Fine Dining Boma", desc: "Traditional circular stone dining boma serving custom game delicacies.", icon: UtensilsCrossed }
    ],
    features: [
      "Central elegant dining hall & library access",
      "Heated panoramic infinity pool",
      "Luxury colonial-style stone suites",
      "Exclusive private game drive vehicles",
      "Full solar grid backup with pure filtration water",
      "24/7 private butler on call"
    ]
  },
  "2": {
    name: "Whispering Valleys Couples Retreat",
    location: "Secluded Valley Outpost",
    image: couplesRetreatImage,
    tagline: "An intimate sanctuary nestled deep in the private valley bushveld, completely secluded from all other guests with a private plunge pool.",
    tag: "Valley Isolation",
    heroImage: couplesBathroomImage,
    overview: "Tucked behind massive valley hills, this couples retreat represents ultimate privacy and romance. Completely visually isolated from the main lodge, the retreat allows you to connect directly with the valley bushveld and your partner under the stars.",
    architecture: "Minimalist canvas and timber architecture that leaves no footprint on the fragile valley. Featuring double sliding glass walls that fully open to integrate the indoor bedroom with the valley deck.",
    amenities: [
      { name: "Sunken Plunge Pool", desc: "Private plunge pool cooling down warm South African afternoons.", icon: Waves },
      { name: "Duo Fire Pit", desc: "Circular sunken fire pit for fireside night chats.", icon: Sparkles },
      { name: "Sky-View Bed", desc: "King-size custom bed aligned perfectly under glass roofs for private stargazing.", icon: Moon },
      { name: "Personal Chef", desc: "Private chef service delivering customized sunset meals.", icon: UtensilsCrossed }
    ],
    features: [
      "Completely secluded private villa structure",
      "King-size panoramic sky-view bed layout",
      "Duo sunken plunge pool & fire pit deck",
      "Private personal host & chef services",
      "Open-air desert rain showers",
      "Vintage optical stargazing telescopes"
    ]
  },
  "3": {
    name: "The Secluded Timber Cabin",
    location: "Off-Grid Wilderness Outpost",
    image: woodCabinImage,
    tagline: "An off-grid raw wooden cabin offering an authentic wilderness experience under the stars with pure essential amenities.",
    tag: "Authentic Off-Grid",
    heroImage: timberInteriorImage,
    overview: "Designed for travelers seeking authentic connection with nature without the noise of modern technology. Constructed from weathered timber and off-grid materials, the cabin sits adjacent to high tracking corridors, letting you sleep to the sounds of cheetahs and jackals.",
    architecture: "Raw timber frames, solar lanterns, wood-burning stoves, and open decks. The design focuses on physical warmth, simplicity, and pure tactile wilderness integration.",
    amenities: [
      { name: "Wood Hot Tub", desc: "Wood-fired cedar hot tub on the open savanna wood deck.", icon: Waves },
      { name: "Wood-Burning Stove", desc: "Traditional cast-iron stove warming highland nights and brewing morning coffee.", icon: Coffee },
      { name: "High View Deck", desc: "Elevated wooden deck overlooking a natural mineral waterhole frequented by wildlife.", icon: Sparkles },
      { name: "Zero Electrical Grid", desc: "Pure off-grid battery setup with no WiFi to ensure absolute peace and digital detox.", icon: Moon }
    ],
    features: [
      "Off-grid natural timber design philosophy",
      "Authentic kitchen layout & classic wood stove",
      "Outdoor wood-fired hot tub experience",
      "No electrical grids for pure stargazing views",
      "Direct waterhole mineral observation deck",
      "Ancestral trackers guided walking tours included"
    ]
  }
};

export default function LodgeDetail() {
  const { id } = useParams<{ id: string }>();
  const { setInquiryForm, handleNavClick } = useOutletContext<any>();

  const lodge = LODGES[id || "1"] || LODGES["1"];

  const handleInquire = () => {
    setInquiryForm({
      name: "",
      email: "",
      package: "Custom Bespoke Hunt",
      lodge: lodge.name,
      message: `Inquiring about booking availability at: ${lodge.name}.`
    });
    handleNavClick("cta-section");
  };

  return (
    <div className="min-h-screen bg-[#0d0906] flex flex-col items-center">
      
      {/* Immersive Hero (Full Screen Viewport) */}
      <div className="relative min-h-screen md:h-screen w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={lodge.image} 
            alt={lodge.name} 
            className="w-full h-full object-cover brightness-[0.45] scale-105 origin-center" 
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0906] via-[#110c08]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110c08]/60 via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 pointer-events-none z-[11] opacity-[0.038]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Main Content Block */}
        <main className="relative z-30 max-w-8xl mx-auto px-8 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full min-h-0 pt-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 md:space-y-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 text-xs uppercase font-bold tracking-widest transition-colors mb-2 md:mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Journeys
            </Link>
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase block">
              {lodge.tag}
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              {lodge.name}
            </h2>
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-medium tracking-wide text-amber-200">
              <MapPin className="w-4.5 h-4.5 text-amber-400" />
              {lodge.location}
            </div>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="relative z-30 pb-12 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-semibold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left Side: Overview & Architecture */}
        <div className="lg:col-span-8 space-y-12 text-left">
          
          {/* Overview */}
          <div className="space-y-4">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-wider">The Sanctuary</h3>
            <div className="h-0.5 w-16 bg-amber-500/50 rounded mb-4" />
            <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed">
              {lodge.overview}
            </p>
          </div>

          {/* Architecture */}
          <div className="space-y-4">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-wider">Design & Heritage</h3>
            <div className="h-0.5 w-16 bg-amber-500/50 rounded mb-4" />
            <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed">
              {lodge.architecture}
            </p>
          </div>

          {/* Key Amenities */}
          <div className="space-y-6">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-wider">Luxe Wilderness Amenities</h3>
            <div className="h-0.5 w-16 bg-amber-500/50 rounded mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lodge.amenities.map((item, idx) => (
                <div key={idx} className="bg-[#1c130e]/40 border border-amber-900/15 p-6 rounded-2xl flex gap-4">
                  <item.icon className="w-8 h-8 text-amber-400 shrink-0" />
                  <div className="space-y-1">
                    <h4 className="font-sans text-sm font-bold text-white uppercase">{item.name}</h4>
                    <p className="text-[11px] text-stone-400 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Quick Stats, Book Sidebar */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[120px]">
          
          <div className="bg-[#1c130e] border border-amber-900/30 rounded-2xl p-6 md:p-8 space-y-6 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Availability</span>
              <h4 className="font-sans text-lg font-bold text-white uppercase mt-1">Exclusive Reservation</h4>
              <p className="text-[11px] text-stone-400 font-light mt-1.5">
                Bookings at this sanctuary are managed exclusively for one tracking group at a time to guarantee visual isolation.
              </p>
            </div>

            <div className="h-px bg-white/15" />

            <div className="space-y-4">
              <button 
                onClick={handleInquire}
                className="btn-shimmer w-full bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-4 rounded-lg uppercase tracking-wider text-xs shadow-xl cursor-pointer text-center"
              >
                Inquire Lodge Stay
              </button>
              <Link 
                to="/"
                className="w-full py-3.5 bg-transparent hover:bg-white/5 text-white border border-white/15 hover:border-white/30 rounded-lg text-xs uppercase font-bold tracking-wider cursor-pointer text-center block"
              >
                View Hunting Packages
              </Link>
            </div>

            <div className="h-px bg-white/10" />

            <div className="space-y-3.5 text-xs font-light text-stone-300">
              <h5 className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Cabin Registry Specs</h5>
              <div className="flex items-center justify-between">
                <span>Location</span>
                <span className="font-medium text-white text-[11px] text-right">{lodge.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Guest Capacity</span>
                <span className="font-mono font-medium text-white">Up to 8 guests</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Security details</span>
                <span className="font-mono font-medium text-amber-200">Anti-poaching ring</span>
              </div>
            </div>
          </div>

          {/* Lodge Inclusions */}
          <div className="bg-black/20 border border-white/5 rounded-2xl p-6 text-left space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-amber-200 font-bold">Stay Features</h4>
            <ul className="space-y-2 text-xs text-stone-300 font-light">
              {lodge.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
