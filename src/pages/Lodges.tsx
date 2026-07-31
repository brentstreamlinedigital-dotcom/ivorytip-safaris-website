import React, { useState, useRef } from "react";
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
  Moon
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
            src="/assets/hero_bg.jpg" 
            alt="Ivorytip Luxury Lodges" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 origin-center" 
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0906] via-[#110c08]/85 to-transparent pointer-events-none z-10" />
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
              Exclusive Accommodations
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              The Sanctuaries
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Explore Kikuyo and Emanzini, two distinct architectural outposts offering absolute seclusion, conservation stewardship, and world-class boma hospitality.
            </p>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="relative z-30 pb-12 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-semibold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent" />
        </div>
      </div>

      {/* Lodges Collection List (Modular Tabbed Showcase) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full text-left z-20">
        
        {/* Modular Navigation Tabs */}
        <div className="flex justify-center border-b border-white/10 mb-16 pb-0.5">
          <div className="flex gap-8 md:gap-12">
            {LODGES_LIST.map((lodge) => (
              <button
                key={lodge.id}
                onClick={() => setActiveTab(lodge.id)}
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

        {/* Active Lodge Content with Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Image Showcase Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="col-span-2 relative rounded-2xl overflow-hidden border border-amber-500/20 p-1.5 bg-white/[0.02] group shadow-xl">
                <img 
                  src={selectedLodge.heroImage} 
                  alt={selectedLodge.name} 
                  className="w-full h-72 md:h-96 object-cover rounded-xl brightness-[0.8] group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-black/80 border border-amber-500/30 px-3 py-1.5 rounded text-[9px] font-bold uppercase tracking-wider backdrop-blur-md">
                  Overview
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-white/5 p-1 bg-white/[0.01]">
                <img 
                  src={selectedLodge.bedroomImage} 
                  alt={`${selectedLodge.name} bedroom`} 
                  className="w-full h-32 md:h-44 object-cover rounded-lg brightness-[0.85]"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden border border-white/5 p-1 bg-white/[0.01]">
                <img 
                  src={selectedLodge.bathroomImage} 
                  alt={`${selectedLodge.name} interior`} 
                  className="w-full h-32 md:h-44 object-cover rounded-lg brightness-[0.85]"
                />
              </div>
            </div>

            {/* Lodge Content Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedLodge.location}</span>
                </div>
                <h3 className="font-display text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mt-3">{selectedLodge.name}</h3>
              </div>
              
              <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light">
                {selectedLodge.overview}
              </p>

              <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-200 block">Design Philosophy</span>
                <p className="text-stone-400 text-xs font-light leading-relaxed">{selectedLodge.architecture}</p>
              </div>
              
              <div className="h-px w-full bg-gradient-to-r from-amber-500/20 to-transparent" />

              {/* Amenities Grid */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block">Wilderness Amenities</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedLodge.amenities.map((amenity, idx) => {
                    const IconComponent = iconMap[amenity.iconName] || Sparkles;
                    return (
                      <div key={idx} className="flex items-start gap-3 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                        <IconComponent className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <h4 className="font-sans text-xs font-bold text-white uppercase">{amenity.name}</h4>
                          <p className="text-[10px] text-stone-400 font-light leading-normal">{amenity.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
                <Link
                  to={`/lodge/${selectedLodge.id}`}
                  className="btn-shimmer inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-4 px-8 rounded-lg tracking-wider text-[10px] uppercase cursor-pointer"
                >
                  View Full Outpost Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setActiveModal("availability")}
                  className="px-8 py-4 border border-amber-500/20 hover:border-amber-400 hover:bg-amber-400/5 text-amber-200 hover:text-amber-100 bg-black/40 rounded-lg text-[10px] uppercase font-bold tracking-wider cursor-pointer text-center transition-all"
                >
                  Book Secure Stay
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Comparison Matrix Table (Dynamic & Modular) */}
      <section className="w-full bg-[#120e0a] border-t border-amber-900/10 py-24 px-6 lg:px-12 text-left z-20">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Sanctuary Specs</span>
            <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">Side-by-Side Comparison</h3>
          </div>

          <div className="overflow-x-auto border border-white/5 rounded-2xl bg-black/20 pr-1">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-black/40 text-stone-400 uppercase tracking-widest text-[9px] font-bold sticky top-0 z-10 font-sans">
                  <th className="p-4 md:p-6">Outpost Specification</th>
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

      {/* Culinary Highlight (Handcrafted Savanna Gastronomy) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left z-20">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 p-2 bg-white/[0.02] order-2 lg:order-1 shadow-xl">
          <img 
            src="/assets/lodge_signature_dining.jpg" 
            alt="Savanna Fine Dining Boma" 
            className="w-full h-80 md:h-[450px] object-cover rounded-xl brightness-[0.7]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-6 order-1 lg:order-2">
          <span className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold block">Wilderness Gastronomy</span>
          <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">The Fire Boma Feast</h3>
          <div className="h-0.5 w-16 bg-amber-500/50 rounded" />
          <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed">
            Stalking game across Eastern Cape hills builds an ancient hunger. We satisfy this in our circular boma rings under towering acacia leaves. Each evening, our resident chefs prepare aged, wood-fired cuts of wild gemsbuck, kudu, or eland, paired with private collection Pinotage and Cabernet reserves from South Africa.
          </p>
          <div className="flex items-center gap-3 text-xs text-amber-200 bg-white/[0.02] border border-white/5 p-4 rounded-xl">
            <UtensilsCrossed className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Traditional open coals cooking, Sommelier reserve pairings, 100% locally sourced.</span>
          </div>
        </div>
      </section>

    </div>
  );
}
