import React, { useState } from "react";
import { 
  Search, 
  X, 
  Camera, 
  MapPin, 
  Calendar, 
  Compass, 
  Info,
  SlidersHorizontal,
  ChevronRight,
  Shield,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useOutletContext } from "react-router-dom";

// @ts-ignore
import kuduImage from "../../assets/Kudu.jpg";
// @ts-ignore
import dinnerImage from "../../assets/Dinner.jpg";
// @ts-ignore
import cheetahImage from "../../assets/cheetah.jpg";
// @ts-ignore
import bufalloImage from "../../assets/Bufallo.jpg";
// @ts-ignore
import campfireImage from "../../assets/campfire.jpg";
// @ts-ignore
import clientSafariImage from "../../assets/gallery_client_safari.jpg";
// @ts-ignore
import couplesBathroomImage from "../../assets/lodge_couples_bathroom.jpg";
// @ts-ignore
import giraffeImage from "../../assets/gallery_giraffe.jpg";
// @ts-ignore
import heroBgImage from "../../assets/hero_bg.jpg";

interface GalleryItem {
  id: number;
  title: string;
  desc: string;
  category: "all" | "lodge" | "hunt" | "wild";
  src: string;
  detail: string;
  location: string;
  date: string;
  gear: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Gold-Medal Kudu",
    desc: "Harvested under camelthorn brush after a 4-hour stalking sequence.",
    category: "hunt",
    src: kuduImage,
    detail: "Trophy score: Gold Merit | Caliber: .375 H&H | Guide: PH Jaco v/d Merwe",
    location: "Highland Riverbed Area",
    date: "June 2026",
    gear: "Sony A1 + 70-200mm f/2.8 GM II"
  },
  {
    id: 2,
    title: "Signature Lounge Dining",
    desc: "Gourmet wild game reserve wine pairing dinner under high colonial thatch.",
    category: "lodge",
    src: dinnerImage,
    detail: "Dinner seating: 16 guests max | Chef: Francois Botha | Pairings: Pinotage Select",
    location: "Signature Lodge boma",
    date: "July 2026",
    gear: "Fujifilm GFX 100S + 45mm f/2.8"
  },
  {
    id: 3,
    title: "High Savanna Cheetah",
    desc: "Spotting a hunting cheetah tracking springbuck across open grass plains.",
    category: "wild",
    src: cheetahImage,
    detail: "Stalking velocity: 65mph tracked | Sub-adult male group | Conservation tag #382",
    location: "North Dunes conservancy ring",
    date: "May 2026",
    gear: "Canon R3 + 400mm f/2.8 L IS"
  },
  {
    id: 4,
    title: "Cape Buffalo Harvest",
    desc: "Elite big game expedition successfully tracking buffalo under dense cover.",
    category: "hunt",
    src: bufalloImage,
    detail: "Horn spread: 44 Inches | Target weight: 1,800 lbs | Guide: PH Jaco",
    location: "Eastern Cape Highland Ridges",
    date: "April 2026",
    gear: "Nikon Z9 + 24-70mm f/2.8 S"
  },
  {
    id: 5,
    title: "Desert Campfire Circle",
    desc: "Evening fireside stories with trackers, sipping small-batch brandies.",
    category: "lodge",
    src: campfireImage,
    detail: "Event style: Native stargazing | Drink: 12-Year reserve | Sound: Kalahari wind",
    location: "Dunes Camp Outpost fire-ring",
    date: "June 2026",
    gear: "Leica M11 + 35mm f/1.4 Summilux"
  },
  {
    id: 6,
    title: "Signature Oryx Stalk",
    desc: "A stunning gemsbuck stalked across valley bushveld hills at sunrise.",
    category: "hunt",
    src: clientSafariImage,
    detail: "Horn length: 42 Inches | Caliber: .300 Win Mag | Guide: Chief Tracker Tsumeb",
    location: "Whispering Valleys North Sector",
    date: "July 2026",
    gear: "Sony A7R V + 100-400mm GM"
  },
  {
    id: 7,
    title: "Valley Lookout Suite",
    desc: "Retractable sky-roof lounge deck overlooking the endless Eastern Cape valleys.",
    category: "lodge",
    src: couplesBathroomImage,
    detail: "Layout: Visual isolation | Plunge pool: Heated solar | Beds: Stargazer King",
    location: "Valleys Retreat Suite #2",
    date: "July 2026",
    gear: "Hasselblad X2D + 38mm f/2.5"
  },
  {
    id: 8,
    title: "Cape Giraffe Pair",
    desc: "A pair of Cape giraffes drinking at sunset near the main watering hole.",
    category: "wild",
    src: giraffeImage,
    detail: "Sub-adult pair | Height: 15 & 16 feet | Health check status: Stable",
    location: "Kalahari Plains Waterhole",
    date: "May 2026",
    gear: "Canon R5 + 600mm f/4 L IS"
  }
];

export default function Gallery() {
  const { setInquiryForm, handleNavClick } = useOutletContext<any>();
  const [galleryFilter, setGalleryFilter] = useState<"all" | "lodge" | "hunt" | "wild">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesCategory = galleryFilter === "all" || item.category === galleryFilter;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0d0906] flex flex-col items-center">
      
      {/* Immersive Hero (Full Screen Viewport) */}
      <div className="relative min-h-screen md:h-screen w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={heroBgImage} 
            alt="Ivorytip Safari Gallery" 
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
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase block">
              Wilderness visual archives
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              Captured Stalk Records
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Browse high-resolution captures of selective hunts, luxury outpost life, and raw African wildlife sightings across South Africa.
            </p>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="relative z-30 pb-12 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-semibold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent" />
        </div>
      </div>

      {/* Filters and Search Bar Section */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8 relative z-20">
        <div className="bg-[#1c130e] border border-amber-900/30 rounded-2xl p-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 shadow-2xl">
          
          {/* Left: Filter Buttons */}
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider justify-start">
            {[
              { label: "All Records", filter: "all" },
              { label: "Trophy Success", filter: "hunt" },
              { label: "Lodge Lifestyle", filter: "lodge" },
              { label: "Savanna Wildlife", filter: "wild" }
            ].map((btn) => (
              <button
                key={btn.filter}
                onClick={() => setGalleryFilter(btn.filter as any)}
                className={`px-4 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                  galleryFilter === btn.filter
                    ? "bg-amber-400 border-amber-400 text-[#110c08]"
                    : "bg-transparent border-white/10 text-stone-400 hover:border-white/30 hover:text-white"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Right: Search bar */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by species, title, or outpost..."
              className="w-full bg-black/40 hover:bg-black/60 text-white border border-white/10 hover:border-white/20 rounded-lg pl-10 pr-8 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors border-solid text-left"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white text-xs cursor-pointer focus:outline-none"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Gallery visual feed */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxImage(item)}
                className="gallery-card relative overflow-hidden rounded-xl border border-white/5 bg-black/10 group cursor-pointer flex flex-col justify-end p-6 h-72 border-solid"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover brightness-[0.7] group-hover:scale-102 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent z-1" />
                
                <div className="relative z-10 space-y-1.5 text-left transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[8px] uppercase font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block border-solid">
                    {item.category === "hunt" ? "Trophy Hunt" : item.category === "lodge" ? "Lodge Life" : "Wildlife"}
                  </span>
                  <h3 className="font-sans text-sm md:text-base font-bold text-white uppercase tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-[10px] text-stone-300 leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-stone-500 font-light text-sm">
            No gallery logs matching your criteria were found.
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-[#1c130e] border border-amber-900/30 rounded-2xl overflow-hidden shadow-2xl p-4 md:p-6 text-left border-solid"
            >
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer z-50 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 h-64 md:h-[450px] rounded-lg overflow-hidden border border-white/5 border-solid">
                  <img 
                    src={lightboxImage.src} 
                    alt={lightboxImage.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="md:col-span-5 space-y-4 text-left">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 inline-block border-solid">
                    Field Log Details
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight">{lightboxImage.title}</h3>
                  <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">{lightboxImage.desc}</p>
                  
                  <div className="bg-black/30 p-4 rounded-lg border border-white/5 border-solid space-y-2 text-xs">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-stone-400 block">Harvest Metrics & Guide Data</span>
                    <p className="text-amber-100 font-mono text-[11px] leading-relaxed">{lightboxImage.detail}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs font-light text-stone-400">
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-stone-500 block">Location</span>
                      <span className="text-stone-200 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {lightboxImage.location}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-stone-500 block">Camera Gear</span>
                      <span className="text-stone-200 flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {lightboxImage.gear.split(" ")[0]} Specs
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setInquiryForm({
                          name: "",
                          email: "",
                          package: "Custom Bespoke Hunt",
                          lodge: "Ivorytip Signature Lodge",
                          message: `Inquiring about trophy style and hunting area from gallery: ${lightboxImage.title}.`
                        });
                        setLightboxImage(null);
                        handleNavClick("cta-section");
                      }}
                      className="btn-shimmer w-full py-3.5 bg-amber-400 hover:bg-amber-500 text-[#110c08] uppercase text-xs tracking-wider font-bold rounded-lg transition-all cursor-pointer text-center block"
                    >
                      Inquire Stalk Setup
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
