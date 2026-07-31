import React, { useState, useEffect, useRef } from "react";
import { 
  Camera, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Check, 
  Info,
  Calendar,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useOutletContext } from "react-router-dom";

interface GalleryItem {
  id: string;
  title: string;
  desc: string;
  category: "lodge" | "hunt" | "wild" | "landscape" | "camp";
  src: string;
  detail: string;
  location: string;
  date: string;
  gear: string;
  // If it's lodge/accommodation, add detailed meta
  accommodationInfo?: {
    lodgeName: string;
    roomType: string;
    amenities: string[];
    capacity: string;
  };
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Gold-Merit Southern Greater Kudu",
    desc: "Harvested under high camelthorn brush after a tense 4-hour walk-and-stalk sequence.",
    category: "hunt",
    src: "/assets/Kudu.jpg",
    detail: "Spread: 53 Inches | Caliber: .300 Win Mag | Weight: 620 lbs",
    location: "Highland Riverbed Area",
    date: "June 2026",
    gear: "Sony A1 + 70-200mm f/2.8 GM II"
  },
  {
    id: "2",
    title: "Boma Hearth Fire Dinner",
    desc: "Gourmet wild game cuisine and private estate Sommelier wine pairings served around the logs.",
    category: "camp",
    src: "/assets/Dinner.jpg",
    detail: "Menu: Slow-roasted Wildebeest & Pinotage | Fireside capacity: 16 guests max",
    location: "Kikuyo Ridge Main Boma",
    date: "July 2026",
    gear: "Fujifilm GFX 100S + 45mm f/2.8"
  },
  {
    id: "3",
    title: "Savanna Cheetah Stalking",
    desc: "Spotting a mature cheetah tracking springbuck across the dunes of the northern sector.",
    category: "wild",
    src: "/assets/cheetah.jpg",
    detail: "Sub-adult male group | Tracking velocity: 65mph peak | Conservation ID: #382",
    location: "North Dunes Conservancy Ring",
    date: "May 2026",
    gear: "Canon R3 + 400mm f/2.8 L IS"
  },
  {
    id: "4",
    title: "Mature Cape Buffalo",
    desc: "Dangerous game expedition successfully tracking buffalo under dense river valley scrub.",
    category: "hunt",
    src: "/assets/Bufallo.jpg",
    detail: "Boss Spread: 44.5 Inches | Caliber: .375 H&H | Guide: PH Jaco v/d Merwe",
    location: "Eastern Cape Highland Ridges",
    date: "April 2026",
    gear: "Nikon Z9 + 24-70mm f/2.8 S"
  },
  {
    id: "5",
    title: "Desert Stargazing Fire",
    desc: "Reflecting on the day's tracks with trackers under the high glowing arc of the Milky Way.",
    category: "camp",
    src: "/assets/campfire.jpg",
    detail: "Spirit: 12-Year reserve local brandy | Sound: Kalahari wind & jackal calls",
    location: "Dunes Camp Outpost",
    date: "June 2026",
    gear: "Leica M11 + 35mm f/1.4 Summilux"
  },
  {
    id: "6",
    title: "Kikuyo Master Bedroom Suite",
    desc: "Elegant high-thatch suite blending colonial grandeur with sliding glass mountain vistas.",
    category: "lodge",
    src: "/assets/lodge_signature_bedroom.jpg",
    detail: "Colonial stone construction | Natural geological cooling ventilation",
    location: "Kikuyo Lodge North Wing",
    date: "July 2026",
    gear: "Hasselblad X2D + 38mm f/2.5",
    accommodationInfo: {
      lodgeName: "Kikuyo Lodge",
      roomType: "Master Thatch Suite",
      amenities: ["Private fireplace", "Freestanding copper tub", "Mountain deck", "Butler call"],
      capacity: "2 Adults max"
    }
  },
  {
    id: "7",
    title: "Emanzini Floating Valley Pool",
    desc: "Natural spring-fed plunge pool built into the floating teak valley waterways deck.",
    category: "lodge",
    src: "/assets/lodge_couples_bedroom.jpg",
    detail: "Spring filtration system | Sunken fire boma adjacent",
    location: "Emanzini Secluded Valley",
    date: "July 2026",
    gear: "Hasselblad X2D + 38mm f/2.5",
    accommodationInfo: {
      lodgeName: "Emanzini Lodge",
      roomType: "Couples Wetland Suite",
      amenities: ["Private pool", "Canvas zip-up paneling", "Borehole hot tub", "Stargazing sky-roof"],
      capacity: "2 Guests (Buyout)"
    }
  },
  {
    id: "8",
    title: "Savanna Tall Giraffes",
    desc: "A sub-adult pair drinking at the natural springs watering hole near the main ridge.",
    category: "wild",
    src: "/assets/gallery_giraffe.jpg",
    detail: "Sub-adult pair | Height: 15 & 16 feet | Health check: Stable",
    location: "Kalahari Plains Waterhole",
    date: "May 2026",
    gear: "Canon R5 + 600mm f/4 L IS"
  },
  {
    id: "9",
    title: "Eastern Cape Skyline",
    desc: "Topographic sweeps of the unfenced private valley mountains during the golden hour sunset.",
    category: "landscape",
    src: "/assets/hero_bg.jpg",
    detail: "Topography: 80,000 hectares | Valley elevation: 1,200 meters",
    location: "Conservancy South Ridge",
    date: "April 2026",
    gear: "Phase One XT + 70mm lens"
  }
];

export default function Gallery() {
  const { setInquiryForm, handleNavClick } = useOutletContext<any>();
  const [activeCategory, setActiveCategory] = useState<"all" | "lodge" | "hunt" | "wild" | "landscape" | "camp">("all");
  
  // Filter items based on active category tab
  const filteredItems = GALLERY_ITEMS.filter(
    item => activeCategory === "all" || item.category === activeCategory
  );
  
  // Active selected item in the main product-style viewport
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeItem = filteredItems[selectedIdx] || filteredItems[0] || GALLERY_ITEMS[0];

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const mainImageRef = useRef<HTMLDivElement>(null);

  // Sync selected index when category changes
  useEffect(() => {
    setSelectedIdx(0);
  }, [activeCategory]);

  // Preload adjacent images for ultra-smooth responsiveness
  useEffect(() => {
    if (filteredItems.length === 0) return;
    const nextIdx = (selectedIdx + 1) % filteredItems.length;
    const prevIdx = (selectedIdx - 1 + filteredItems.length) % filteredItems.length;
    
    [nextIdx, prevIdx].forEach(idx => {
      const img = new Image();
      img.src = filteredItems[idx].src;
    });
  }, [selectedIdx, filteredItems]);

  // Keyboard navigation for lightbox & main viewport
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredItems.length === 0) return;
      if (e.key === "ArrowRight") {
        setSelectedIdx(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedIdx(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredItems]);

  const handleInquire = () => {
    setInquiryForm({
      name: "",
      email: "",
      package: "Custom Bespoke Hunt",
      lodge: activeItem.accommodationInfo?.lodgeName || "Ivorytip Signature Lodge",
      message: `Inquiring about details relating to gallery record: "${activeItem.title}".`
    });
    handleNavClick("cta-section");
  };

  return (
    <div className="min-h-screen bg-[#0d0906] flex flex-col items-center">
      
      {/* Immersive Hero Header (Natural Landscape backdrop) */}
      <div className="relative min-h-[40vh] md:h-[50vh] w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/hero_bg.jpg" 
            alt="Ivorytip Safari Gallery" 
            className="w-full h-full object-cover brightness-[0.45] scale-105 origin-center" 
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d0906] via-[#110c08]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110c08]/60 via-transparent to-transparent pointer-events-none z-10" />
        </div>
        <main className="relative z-30 max-w-8xl mx-auto px-8 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full min-h-0 pt-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase block">
              Wilderness Visual Archives
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              Visual Gallery
            </h2>
          </div>
        </main>
      </div>

      {/* Main Luxury Interactive Workspace */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-24 relative z-20 -mt-16">
        
        {/* Step 1: Category Filter Panel */}
        <div className="bg-[#1c130e] border border-amber-900/30 rounded-2xl p-4 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider justify-center shadow-2xl mb-12">
          {[
            { label: "All Records", filter: "all" },
            { label: "The Hunt", filter: "hunt" },
            { label: "Accommodation", filter: "lodge" },
            { label: "Wildlife", filter: "wild" },
            { label: "Landscape", filter: "landscape" },
            { label: "Camp Life", filter: "camp" }
          ].map((btn) => (
            <button
              key={btn.filter}
              onClick={() => setActiveCategory(btn.filter as any)}
              className={`px-5 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                activeCategory === btn.filter
                  ? "bg-amber-400 border-amber-400 text-[#110c08]"
                  : "bg-transparent border-white/10 text-stone-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Step 2: Main Media Showcase Viewport (Product Gallery Style) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <div 
                ref={mainImageRef}
                className="relative rounded-2xl overflow-hidden border border-amber-500/20 p-2 bg-white/[0.02] flex items-center justify-center min-h-[350px] md:h-[550px] shadow-2xl group"
              >
                {/* Main Feature Image with crossfade transition */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeItem.id}
                    src={activeItem.src}
                    alt={activeItem.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-full h-full object-cover rounded-xl brightness-[0.8] hover:scale-[1.03] transition-transform duration-750 origin-center"
                    style={{ transform: `scale(${zoomScale})` }}
                  />
                </AnimatePresence>

                {/* Ambient vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none rounded-2xl" />

                {/* Left/Right Viewport Controls */}
                <button
                  onClick={() => setSelectedIdx(prev => (prev - 1 + filteredItems.length) % filteredItems.length)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/15 text-white hover:bg-amber-400 hover:text-black transition-colors cursor-pointer focus:outline-none"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedIdx(prev => (prev + 1) % filteredItems.length)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/15 text-white hover:bg-amber-400 hover:text-black transition-colors cursor-pointer focus:outline-none"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Fullscreen Trigger */}
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-6 right-6 p-3 rounded-full bg-black/60 border border-white/10 text-white hover:border-amber-400 hover:text-amber-300 transition-all cursor-pointer focus:outline-none"
                  aria-label="Open fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Floating caption overlay */}
                <div className="absolute bottom-6 left-6 text-left max-w-xl pointer-events-none">
                  <span className="text-[9px] uppercase tracking-widest text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block mb-2 font-mono">
                    Outpost Log #{activeItem.id}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight shadow-sm leading-tight">{activeItem.title}</h3>
                </div>
              </div>

              {/* Horizontal Thumbnail Slider Below Feature */}
              <div className="relative bg-black/20 border border-white/5 p-4 rounded-2xl shadow-inner flex items-center gap-4">
                <div className="flex gap-4 overflow-x-auto py-1 w-full scrollbar-thin scrollbar-thumb-amber-900/50 scrollbar-track-transparent">
                  {filteredItems.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedIdx(idx)}
                      className={`relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden border p-1 bg-[#120e0a] cursor-pointer transition-all duration-300 ${
                        selectedIdx === idx
                          ? "border-amber-400 scale-[1.04]"
                          : "border-white/10 hover:border-white/35 hover:scale-[1.02]"
                      }`}
                    >
                      <img 
                        src={item.src} 
                        alt={item.title} 
                        className="w-full h-full object-cover rounded-lg brightness-[0.7]" 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Detailed Meta Panel (Right column, matching e-commerce look) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              
              {/* Image Details Card */}
              <div className="bg-[#1c130e] border border-amber-900/30 rounded-2xl p-6 md:p-8 space-y-6 text-left shadow-2xl flex-1 flex flex-col justify-between">
                
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 inline-block">
                      {activeItem.category === "hunt" ? "Trophy Stalk" : activeItem.category === "lodge" ? "Accommodation" : activeItem.category === "wild" ? "Wildlife sighting" : activeItem.category === "landscape" ? "Savanna Landscape" : "Camp Life"}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mt-4 leading-tight">{activeItem.title}</h3>
                  </div>

                  <p className="text-stone-300 text-sm leading-relaxed font-light">
                    {activeItem.desc}
                  </p>

                  <div className="h-px bg-white/15" />

                  {/* Stalk/Wildlife spec board */}
                  <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-stone-400 block">Field Record Data</span>
                    <p className="text-amber-200/90 font-mono text-xs leading-relaxed">{activeItem.detail}</p>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-stone-500 block">Location Coordinates</span>
                      <span className="text-stone-300 flex items-center gap-1.5 font-light">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {activeItem.location}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-stone-500 block">Camera Gear</span>
                      <span className="text-stone-300 flex items-center gap-1.5 font-light">
                        <Camera className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        {activeItem.gear}
                      </span>
                    </div>
                  </div>

                  {/* Step 4: Accommodation Contextual panel (If Lodge category) */}
                  {activeItem.accommodationInfo && (
                    <div className="border-t border-white/10 pt-6 space-y-4">
                      <h4 className="text-xs uppercase font-bold tracking-widest text-amber-200 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-400" />
                        Accommodation Info
                      </h4>
                      
                      <div className="text-xs font-light text-stone-300 space-y-2">
                        <div className="flex justify-between">
                          <span>Lodge</span>
                          <span className="font-semibold text-white">{activeItem.accommodationInfo.lodgeName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Capacity</span>
                          <span className="font-mono text-white">{activeItem.accommodationInfo.capacity}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold block">Room Amenities</span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeItem.accommodationInfo.amenities.map((amenity, aIdx) => (
                            <span key={aIdx} className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-stone-300 font-medium">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-white/10 space-y-4">
                  <button
                    onClick={handleInquire}
                    className="btn-shimmer w-full bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-4 rounded-lg uppercase tracking-wider text-xs shadow-xl cursor-pointer text-center"
                  >
                    Inquire Stalk / Booking Setup
                  </button>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="py-20 text-center text-stone-500 font-light text-sm bg-black/20 border border-white/5 rounded-2xl shadow-inner">
            No safari visual records matching this filter found.
          </div>
        )}
      </section>

      {/* Fullscreen Lightbox Modal (with Keyboard & Touch Controls) */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl w-full h-[85vh] flex flex-col justify-between"
            >
              {/* Lightbox Header */}
              <div className="flex items-center justify-between text-white pb-4 border-b border-white/10">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-amber-200">{activeItem.title}</h4>
                  <span className="text-[10px] text-stone-500 font-mono">{activeItem.location} &bull; {activeItem.date}</span>
                </div>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white cursor-pointer focus:outline-none"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Feature Image Frame */}
              <div className="flex-1 flex items-center justify-center relative py-6 overflow-hidden">
                <img 
                  src={activeItem.src} 
                  alt={activeItem.title}
                  className="max-h-full max-w-full object-contain rounded shadow-2xl select-none"
                  referrerPolicy="no-referrer"
                />

                {/* Left/Right Buttons */}
                <button
                  onClick={() => setSelectedIdx(prev => (prev - 1 + filteredItems.length) % filteredItems.length)}
                  className="absolute left-4 p-3 rounded-full bg-black/50 border border-white/10 text-white hover:bg-amber-400 hover:text-black cursor-pointer focus:outline-none"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedIdx(prev => (prev + 1) % filteredItems.length)}
                  className="absolute right-4 p-3 rounded-full bg-black/50 border border-white/10 text-white hover:bg-amber-400 hover:text-black cursor-pointer focus:outline-none"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Footer Caption */}
              <div className="bg-black/60 border-t border-white/10 p-4 text-center rounded-b-xl text-stone-300 text-xs font-light">
                {activeItem.desc} &bull; <span className="font-mono text-amber-200">{activeItem.detail}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
