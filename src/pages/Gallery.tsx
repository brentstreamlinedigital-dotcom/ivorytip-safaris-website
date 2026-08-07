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
    id: "dsc-08496",
    title: "Gallery Image DSC08496",
    desc: "Ivorytip Safaris wilderness experience in the Eastern Cape.",
    category: "wild",
    src: "/assets/DSC08496.jpg",
    detail: "Alexandria Region | Eastern Cape",
    location: "Ivorytip Lands",
    date: "August 2026",
    gear: "Professional Field Gear"
  },
  {
    id: "dsc-08520",
    title: "Gallery Image DSC08520",
    desc: "Ivorytip Safaris wilderness experience in the Eastern Cape.",
    category: "hunt",
    src: "/assets/DSC08520.jpg",
    detail: "Alexandria Region | Eastern Cape",
    location: "Ivorytip Lands",
    date: "August 2026",
    gear: "Professional Field Gear"
  },
  {
    id: "dsc-08537",
    title: "Gallery Image DSC08537",
    desc: "Ivorytip Safaris wilderness experience in the Eastern Cape.",
    category: "wild",
    src: "/assets/DSC08537.jpg",
    detail: "Alexandria Region | Eastern Cape",
    location: "Ivorytip Lands",
    date: "August 2026",
    gear: "Professional Field Gear"
  },
  {
    id: "dsc-08564",
    title: "Gallery Image DSC08564",
    desc: "Ivorytip Safaris wilderness experience in the Eastern Cape.",
    category: "lodge",
    src: "/assets/DSC08564.jpg",
    detail: "Alexandria Region | Eastern Cape",
    location: "Ivorytip Lands",
    date: "August 2026",
    gear: "Professional Field Gear"
  },
  {
    id: "dsc-08616",
    title: "Gallery Image DSC08616",
    desc: "Ivorytip Safaris wilderness experience in the Eastern Cape.",
    category: "hunt",
    src: "/assets/DSC08616.jpg",
    detail: "Alexandria Region | Eastern Cape",
    location: "Ivorytip Lands",
    date: "August 2026",
    gear: "Professional Field Gear"
  },
  {
    id: "dsc-08638",
    title: "Gallery Image DSC08638",
    desc: "Ivorytip Safaris wilderness experience in the Eastern Cape.",
    category: "wild",
    src: "/assets/DSC08638.jpg",
    detail: "Alexandria Region | Eastern Cape",
    location: "Ivorytip Lands",
    date: "August 2026",
    gear: "Professional Field Gear"
  },
  {
    id: "dsc-08706",
    title: "Gallery Image DSC08706",
    desc: "Ivorytip Safaris wilderness experience in the Eastern Cape.",
    category: "wild",
    src: "/assets/DSC08706.jpg",
    detail: "Alexandria Region | Eastern Cape",
    location: "Ivorytip Lands",
    date: "August 2026",
    gear: "Professional Field Gear"
  },
  {
    id: "dsc-08784",
    title: "Gallery Image DSC08784",
    desc: "Ivorytip Safaris wilderness experience in the Eastern Cape.",
    category: "hunt",
    src: "/assets/DSC08784.jpg",
    detail: "Alexandria Region | Eastern Cape",
    location: "Ivorytip Lands",
    date: "August 2026",
    gear: "Professional Field Gear"
  },
  {
    id: "dsc-08981",
    title: "Gallery Image DSC08981",
    desc: "Ivorytip Safaris wilderness experience in the Eastern Cape.",
    category: "camp",
    src: "/assets/DSC08981.jpg",
    detail: "Alexandria Region | Eastern Cape",
    location: "Ivorytip Lands",
    date: "August 2026",
    gear: "Professional Field Gear"
  },
  {
    id: "dsc-09003",
    title: "Gallery Image DSC09003",
    desc: "Ivorytip Safaris wilderness experience in the Eastern Cape.",
    category: "wild",
    src: "/assets/DSC09003.jpg",
    detail: "Alexandria Region | Eastern Cape",
    location: "Ivorytip Lands",
    date: "August 2026",
    gear: "Professional Field Gear"
  },
  {
    id: "dsc-09030",
    title: "Gallery Image DSC09030",
    desc: "Ivorytip Safaris wilderness experience in the Eastern Cape.",
    category: "landscape",
    src: "/assets/DSC09030.jpg",
    detail: "Alexandria Region | Eastern Cape",
    location: "Ivorytip Lands",
    date: "August 2026",
    gear: "Professional Field Gear"
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
      <div className="relative min-h-screen md:h-[75vh] w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/gallery_page_hero.jpg" 
            alt="Ivorytip Safari Gallery" 
            className="w-full h-full object-cover brightness-[0.6] scale-105 origin-center" 
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d0906] via-[#110c08]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110c08]/60 via-transparent to-transparent pointer-events-none z-10" />
        </div>
        <main className="relative z-30 max-w-8xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full min-h-0 pt-24 md:pt-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase block">
              Wilderness Visual Archives
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              Visual Gallery
            </h2>
          </div>
        </main>
      </div>

      {/* Pixieset-Style Masonry Gallery Workspace */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-24 relative z-20 -mt-16">
        


        {/* Masonry Grid */}
        {filteredItems.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id} 
                className="break-inside-avoid relative rounded-2xl overflow-hidden border border-white/5 bg-[#1c130e]/30 group cursor-pointer shadow-xl transition-all duration-300 hover:border-amber-500/20"
                onClick={() => {
                  setSelectedIdx(idx);
                  setIsLightboxOpen(true);
                }}
              >
                {/* Image */}
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-auto object-cover rounded-2xl brightness-[0.85] group-hover:brightness-95 group-hover:scale-[1.015] transition-all duration-700 ease-out" 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-stone-500 font-light text-sm bg-black/20 border border-white/5 rounded-2xl shadow-inner">
            No safari visual records matching this filter found.
          </div>
        )}
      </section>

      {/* Fullscreen Pixieset-style Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6 md:p-10 select-none"
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between z-10">
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">
                  Safari Visual Archives
                </span>
                <h4 className="text-white font-sans text-sm md:text-base font-bold uppercase tracking-tight mt-1">
                  Slide {selectedIdx + 1} of {filteredItems.length}
                </h4>
              </div>
              <button
                onClick={() => {
                  setIsLightboxOpen(false);
                  setZoomScale(1);
                }}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-stone-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer focus:outline-none"
                aria-label="Close fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewport Frame */}
            <div className="flex-1 flex items-center justify-center relative min-h-0 my-4">
              <button
                onClick={() => setSelectedIdx(prev => (prev - 1 + filteredItems.length) % filteredItems.length)}
                className="absolute left-4 p-4 rounded-full bg-black/60 border border-white/10 text-white hover:bg-amber-400 hover:text-[#110c08] transition-all cursor-pointer z-10 focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="max-w-6xl max-h-[70vh] md:max-h-[75vh] w-full h-full overflow-hidden flex items-center justify-center relative p-2">
                <motion.img
                  key={activeItem.id}
                  src={activeItem.src}
                  alt={activeItem.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              <button
                onClick={() => setSelectedIdx(prev => (prev + 1) % filteredItems.length)}
                className="absolute right-4 p-4 rounded-full bg-black/60 border border-white/10 text-white hover:bg-amber-400 hover:text-[#110c08] transition-all cursor-pointer z-10 focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption and Inquire Button */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 z-10 border-t border-white/5 pt-6">
              <div className="text-left max-w-xl">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block font-mono">
                  {activeItem.category.toUpperCase()} RECORD
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight mt-2">
                  {activeItem.title}
                </h3>
                <p className="text-stone-300 text-xs md:text-sm mt-1 leading-relaxed font-light max-w-lg">
                  {activeItem.desc}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2.5 text-[9px] font-mono text-stone-500 font-light">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {activeItem.location}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Camera className="w-3 h-3 text-amber-400" />
                    {activeItem.gear}
                  </span>
                </div>
              </div>
              
              <div className="shrink-0 w-full md:w-auto">
                <button
                  onClick={handleInquire}
                  className="btn-shimmer w-full md:w-auto bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-6 rounded-lg uppercase tracking-wider text-[10px] shadow-xl cursor-pointer text-center block"
                >
                  Inquire Stalk / Stay
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
