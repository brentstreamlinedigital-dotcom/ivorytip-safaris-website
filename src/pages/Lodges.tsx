import React, { useState, useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { 
  Check, 
  ArrowRight,
  UtensilsCrossed,
  MapPin,
  Users,
  Sun,
  Sparkles,
  Waves,
  Coffee,
  Moon,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LODGES_LIST, Lodge } from "../data/lodges";

// Helper to map icon names to Lucide icons
const iconMap = {
  Waves,
  Coffee,
  Moon,
  UtensilsCrossed,
  Sparkles
};

export default function Lodges() {
  const { setActiveModal } = useOutletContext<any>();
  const [activeTab, setActiveTab] = useState<string>("1");
  const selectedLodge = LODGES_LIST.find(l => l.id === activeTab) || LODGES_LIST[0];

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const lodgeImages = selectedLodge.galleryImages && selectedLodge.galleryImages.length > 0
    ? selectedLodge.galleryImages.map((src, i) => ({
        src,
        title: i === 0 ? "Emanzini Internal Lounge" : `Emanzini View ${i + 1}`
      }))
    : [
        { src: selectedLodge.heroImage, title: "Overview" },
        { src: selectedLodge.bedroomImage, title: "Master Bedroom Suite" },
        { src: selectedLodge.bathroomImage, title: "En-suite Bathroom" },
        { src: selectedLodge.lifestyleImage, title: "Camp & Dining" }
      ];

  // Sync selected index when lodge changes
  useEffect(() => {
    setActiveImageIdx(0);
  }, [activeTab]);

  // Keyboard navigation for image cycling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveImageIdx(prev => (prev + 1) % lodgeImages.length);
      } else if (e.key === "ArrowLeft") {
        setActiveImageIdx(prev => (prev - 1 + lodgeImages.length) % lodgeImages.length);
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const specLabels = [
    { key: "capacity" as keyof Lodge, label: "Guest Capacity" },
    { key: "staffRatio" as keyof Lodge, label: "Staff-to-Guest Ratio" },
    { key: "poolSpa" as keyof Lodge, label: "Pool & Spa Setup" },
    { key: "powerGrid" as keyof Lodge, label: "Power & Utility Grid" },
    { key: "stargazing" as keyof Lodge, label: "Visual Stargazing" }
  ];

  return (
    <div className="min-h-screen bg-[#0d0906] flex flex-col items-center">
      
      {/* Immersive Hero (Full Screen Viewport) */}
      <div className="relative min-h-screen md:h-[80vh] w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/lodge_drone_hero.png" 
            alt="Ivorytip Luxury Lodges" 
            className="w-full h-full object-cover brightness-[0.5] scale-105 origin-center" 
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0906] via-[#110c08]/85 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110c08]/60 via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 pointer-events-none z-[11] opacity-[0.038]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Main Content Block */}
        <main className="relative z-30 max-w-8xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full min-h-0 pt-24 md:pt-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-3 md:space-y-6">
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase block">
              Exclusive Accommodations
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.08em] md:tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              The Lodges
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Explore Kikuyu and Emanzini, two distinct architectural masterpieces offering absolute seclusion, conservation stewardship, and warm lodge hospitality.
            </p>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="relative z-30 pb-12 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-semibold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent" />
        </div>
      </div>

      {/* Lodges Collection List (Interactive Workspace Showcase) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full text-left z-20">
        
        {/* Modular Navigation Tabs */}
        <div className="flex justify-center border-b border-white/10 mb-16 pb-0.5">
          <div className="flex gap-8 md:gap-12">
            {LODGES_LIST.map((lodge) => (
              <button
                key={lodge.id}
                onClick={() => {
                  setActiveTab(lodge.id);
                  setActiveImageIdx(0);
                }}
                className={`py-4 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 cursor-pointer relative ${
                  activeTab === lodge.id
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {lodge.name}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Image Showcase Viewport */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div 
              ref={mainImageRef}
              className="relative rounded-2xl overflow-hidden border border-amber-500/20 p-2 bg-white/[0.02] flex items-center justify-center min-h-[300px] md:h-[550px] shadow-2xl group"
            >
              {/* Main Feature Image with crossfade transition */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${activeTab}-${activeImageIdx}`}
                  src={lodgeImages[activeImageIdx].src}
                  alt={lodgeImages[activeImageIdx].title}
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

              {/* Left/Right Viewport Controls - always visible on mobile */}
              <button
                onClick={() => setActiveImageIdx(prev => (prev - 1 + lodgeImages.length) % lodgeImages.length)}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-black/60 border border-white/15 text-white hover:bg-amber-400 hover:text-black transition-colors cursor-pointer focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => setActiveImageIdx(prev => (prev + 1) % lodgeImages.length)}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 p-2.5 md:p-3 rounded-full bg-black/60 border border-white/15 text-white hover:bg-amber-400 hover:text-black transition-colors cursor-pointer focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Fullscreen Trigger */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-6 right-6 p-3 rounded-full bg-black/60 border border-white/10 text-white hover:border-amber-400 hover:text-amber-300 transition-all cursor-pointer focus:outline-none"
                aria-label="Open fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

            </div>

            {/* Horizontal Thumbnail Slider Below Feature */}
            <div className="relative bg-black/20 border border-white/5 p-3 md:p-4 rounded-2xl shadow-inner flex items-center gap-4">
              <div className="flex gap-3 md:gap-4 overflow-x-auto py-1 w-full scrollbar-thin scrollbar-thumb-amber-900/50 scrollbar-track-transparent">
                {lodgeImages.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden border p-1 bg-[#120e0a] cursor-pointer transition-all duration-300 ${
                      activeImageIdx === idx
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

          {/* Right Column: Focused Lodge Details Card */}
          <div className="lg:col-span-4 bg-[#1c130e] border border-amber-900/30 rounded-2xl p-5 md:p-8 text-left shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 inline-block">
                  {selectedLodge.tag}
                </span>
                <h3 className="font-sans text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mt-4 leading-tight">
                  {selectedLodge.name}
                </h3>
              </div>

              <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">
                {selectedLodge.overview}
              </p>

              {/* Quick Specs Row */}
              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
                <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-stone-400 block font-sans">Location</span>
                  <span className="text-stone-200 flex items-center gap-1.5 font-light text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    {selectedLodge.location.split(",")[0]}
                  </span>
                </div>
                <div className="bg-black/30 p-3 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-stone-400 block font-sans">Hosting Limit</span>
                  <span className="text-stone-200 flex items-center gap-1.5 font-light text-[11px]">
                    <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    {selectedLodge.capacity}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="border-t border-white/10 pt-6 space-y-3 mt-6">
              <Link
                to={`/lodge/${selectedLodge.id}`}
                className="btn-shimmer w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 rounded-lg tracking-wider text-xs uppercase cursor-pointer"
              >
                View Full Lodge Details
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setActiveModal("availability")}
                className="w-full py-3.5 border border-amber-500/20 hover:border-amber-400 hover:bg-amber-400/5 text-amber-200 hover:text-amber-100 bg-black/40 rounded-lg text-xs uppercase font-bold tracking-wider cursor-pointer text-center transition-all"
              >
                Book Secure Stay
              </button>
            </div>
          </div>

        </div>

        {/* Lodge Features, Amenities & Specs (Full-width Section Below Main Showcase) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
          
          {/* Left: Architecture & Design Philosophy */}
          <div className="lg:col-span-5 bg-[#1c130e] border border-white/10 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block font-sans">
                Architecture & Construction
              </span>
              <h4 className="font-sans text-xl font-bold text-white uppercase tracking-wider">
                Design Philosophy
              </h4>
              <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed">
                {selectedLodge.architecture}
              </p>
            </div>
            
            <div className="border-t border-white/5 pt-4 flex items-center gap-2 text-stone-400 text-xs font-light">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Handcrafted Eastern Cape architecture & local materials</span>
            </div>
          </div>

          {/* Right: Wilderness Amenities Bento Grid */}
          <div className="lg:col-span-7 bg-[#1c130e] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block font-sans">
                Guest Comforts
              </span>
              <h4 className="font-sans text-xl font-bold text-white uppercase tracking-wider mt-1">
                Lodge Features & Amenities
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedLodge.amenities.map((amenity, idx) => {
                const IconComponent = iconMap[amenity.iconName] || Sparkles;
                return (
                  <div key={idx} className="flex items-start gap-3.5 bg-black/30 border border-white/5 p-4 rounded-xl">
                    <IconComponent className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 min-w-0">
                      <h5 className="font-sans text-xs font-bold text-white uppercase tracking-wide">{amenity.name}</h5>
                      <p className="text-[11px] text-stone-400 font-light leading-relaxed">{amenity.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </section>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6 md:p-10 select-none"
          >
            {/* Header controls */}
            <div className="flex items-center justify-end z-10">
              <button
                onClick={() => {
                  setIsLightboxOpen(false);
                  setZoomScale(1);
                }}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-stone-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                aria-label="Close fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewport content */}
            <div className="flex-1 flex items-center justify-center relative min-h-0 my-4">
              <button
                onClick={() => setActiveImageIdx(prev => (prev - 1 + lodgeImages.length) % lodgeImages.length)}
                className="absolute left-4 p-4 rounded-full bg-black/60 border border-white/10 text-white hover:bg-amber-400 hover:text-[#110c08] transition-all cursor-pointer z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="max-w-6xl max-h-[70vh] md:max-h-[75vh] w-full h-full overflow-hidden flex items-center justify-center relative p-2">
                <motion.img
                  key={activeImageIdx}
                  src={lodgeImages[activeImageIdx].src}
                  alt={lodgeImages[activeImageIdx].title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </div>

              <button
                onClick={() => setActiveImageIdx(prev => (prev + 1) % lodgeImages.length)}
                className="absolute right-4 p-4 rounded-full bg-black/60 border border-white/10 text-white hover:bg-amber-400 hover:text-[#110c08] transition-all cursor-pointer z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom thumbnail indicators */}
            <div className="flex justify-center gap-4 overflow-x-auto py-2 z-10">
              {lodgeImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border p-0.5 bg-zinc-900 transition-all cursor-pointer ${
                    activeImageIdx === idx 
                      ? "border-amber-400 scale-105" 
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover rounded" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Matrix Table (Dynamic & Modular) */}
      <section className="w-full bg-[#120e0a] border-t border-amber-900/10 py-24 px-6 lg:px-12 text-left z-20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Lodge Specifications</span>
            <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">Side-by-Side Comparison</h3>
          </div>

          <div className="overflow-x-auto border border-white/5 rounded-2xl bg-black/20 pr-1">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/40 text-stone-400 uppercase tracking-widest text-[9px] font-bold sticky top-0 z-10 font-sans">
                  <th className="p-4 md:p-6">Lodge Specification</th>
                  {LODGES_LIST.map((lodge) => (
                    <th key={lodge.id} className="p-4 md:p-6 text-amber-200">{lodge.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="group/table">
                {specLabels.map((spec, idx) => (
                  <tr 
                    key={idx} 
                    className="border-b border-white/5 transition-colors duration-300 group-hover/table:opacity-40 hover:!opacity-100 hover:bg-white/[0.04]"
                  >
                    <td className="p-4 md:p-6 font-semibold text-stone-300 font-sans">
                      {spec.label}
                    </td>
                    {LODGES_LIST.map((lodge) => (
                      <td key={lodge.id} className="p-4 md:p-6 text-stone-400 font-light">
                        {lodge[spec.key] as string}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* South African Braai Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Image collage */}
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-3">
            {/* Large left image - outdoor fire */}
            <div className="col-span-2 relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <img
                src="/assets/outdoor_fire.jpg"
                alt="Outdoor fire at Ivorytip Lodge"
                className="w-full h-56 md:h-72 object-cover brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-black/70 border border-amber-500/20 px-3 py-1.5 rounded backdrop-blur-md">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">Every Evening</span>
                <span className="text-xs font-semibold text-white uppercase block mt-0.5">Around the Fire</span>
              </div>
            </div>
            {/* Two smaller images side by side */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <img
                src="/assets/braai_meat_1.jpg"
                alt="Braai meat on the coals"
                className="w-full h-40 md:h-52 object-cover brightness-[0.88]"
              />
            </div>
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <img
                src="/assets/braai_meat_2.jpg"
                alt="Traditional South African braai"
                className="w-full h-40 md:h-52 object-cover brightness-[0.88]"
              />
            </div>
          </div>

          {/* Right: Copy */}
          <div className="space-y-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold block">South African Tradition</span>
            <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">The Braai</h3>
            <div className="h-0.5 w-16 bg-amber-500/50 rounded" />
            <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed">
              After a hard day in the veld, nothing beats a proper South African braai. Most evenings we fire up the coals, throw on the wors, chops, and steaks, and gather around the fire with a cold one in hand. No fuss, no pretension — just great meat, good company, and the sounds of the African bush around you.
            </p>
            <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed">
              We braai traditional boerewors, lamb chops, and game meat from the day's hunt. It's a lekker time every night — the kind of fireside evening you'll be talking about long after you've flown home.
            </p>
            <div className="flex items-center gap-3 text-xs text-amber-200 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
              <UtensilsCrossed className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Traditional open-fire braai most nights. Boerewors, chops, game meat, and ice-cold beverages.</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
