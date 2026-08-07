import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { 
  Check, 
  Clock, 
  Coffee, 
  FileText, 
  Plus, 
  Trash2, 
  ArrowRight,
  Calculator,
  Compass,
  Info,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { HUNTING_STEPS } from "../data/hunting";

const flipVariants = {
  initial: (dir: number) => ({
    rotateY: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.95
  }),
  animate: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: (dir: number) => ({
    rotateY: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  })
};

interface SpeciesSelection {
  species: string;
  price: number;
}

const CALCULATOR_SPECIES = [
  { species: "Greater Kudu Bull", price: 2950 },
  { species: "Cape Buffalo Bull", price: 10000 },
  { species: "Kalahari Gemsbuck (Oryx)", price: 2000 },
  { species: "Cape Eland", price: 3900 },
  { species: "Common Impala", price: 450 },
  { species: "Mountain Zebra", price: 1300 },
  { species: "Common Blesbuck", price: 450 },
  { species: "Limpopo Bushbuck", price: 900 },
  { species: "Warthog", price: 450 },
  { species: "Nyala Bull", price: 2500 },
  { species: "Sable Antelope", price: 6000 },
  { species: "Springbuck", price: 450 }
];

export default function Packages() {
  const { setActiveModal, setInquiryForm, handleNavClick } = useOutletContext<any>();
  
  // Custom calculator states
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesSelection[]>([]);
  const [stayNights, setStayNights] = useState(7);
  const [hunterCount, setHunterCount] = useState(1);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [direction, setDirection] = useState(0);


  const packages = [
    {
      id: "1",
      title: "The Plains Game Starter",
      price: "$4,100",
      rate2to1: "$3,600",
      bonusNote: "Includes 1 free cull Warthog",
      duration: "6 Days / 5 Nights",
      lodge: "Kikuyu Lodge",
      species: "1x Impala, 1x Blesbuck, 1x Blue Wildebeest, 1x Warthog",
      features: [
        "Airport Pick-up & Drop-off (Port Elizabeth)",
        "Dedicated Professional Hunter & Tracker",
        "Luxury Lodge Lodging (Kikuyu Lodge)",
        "3 Meals per Day, Light Beverages & Laundry",
        "Skinner & Field Preparation"
      ],
      excluded: [
        "Rifle Hire & Ammunition",
        "Gratuities / Tips",
        "International Flights & Travel Insurance",
        "Trophy Dip, Pack & Shipping"
      ],
      tag: "Introductory Stalk"
    },
    {
      id: "2",
      title: "The Savanna Classic",
      price: "$5,900",
      rate2to1: "$5,300",
      bonusNote: "Includes 1 free cull Impala or Warthog",
      duration: "7 Days / 6 Nights",
      lodge: "Kikuyu Lodge",
      species: "1x Impala, 1x Blesbuck, 1x Kudu, 1x Blue Wildebeest, 1x Springbuck",
      features: [
        "Airport Pick-up & Drop-off (Port Elizabeth)",
        "Dedicated Professional Hunter & Tracker",
        "Luxury Lodge Lodging (Kikuyu Lodge)",
        "3 Meals per Day, Light Beverages & Laundry",
        "Skinner & Field Preparation"
      ],
      excluded: [
        "Rifle Hire & Ammunition",
        "Gratuities / Tips",
        "International Flights & Travel Insurance",
        "Trophy Dip, Pack & Shipping"
      ],
      tag: "Most Popular",
      featured: true
    },
    {
      id: "3",
      title: "The Big Game Monarch",
      price: "$20,000",
      rate2to1: "$19,000",
      bonusNote: undefined,
      duration: "11 Days / 10 Nights",
      lodge: "Emanzini Lodge",
      species: "1x Buffalo Bull (Under 38\"), 1x Kudu, 1x Blue Wildebeest, 1x Zebra, 1x Blesbuck, 1x Impala",
      features: [
        "Airport Pick-up & Drop-off (Port Elizabeth)",
        "Dedicated Professional Hunter & Tracker",
        "Luxury Lodge Lodging (Emanzini Lodge)",
        "3 Meals per Day, Light Beverages & Laundry",
        "Skinner, Field Preparation & Trophy Export Admin"
      ],
      excluded: [
        "Rifle Hire & Ammunition",
        "Gratuities / Tips",
        "International Flights & Travel Insurance",
        "Trophy Dip, Pack & Shipping"
      ],
      tag: "Ultimate Safari"
    }
  ];

  // Calculator Math
  // Daily guide rates: $380/client (1:1) · $300/client (2:1) — non-package hunts
  const dailyRate = hunterCount === 1 ? 380 : 300;
  const totalDailyFees = dailyRate * stayNights * hunterCount;
  const totalTrophyFees = selectedSpecies.reduce((acc, curr) => acc + curr.price, 0);
  const totalEstimate = totalDailyFees + totalTrophyFees;

  const handleAddSpecies = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    if (!selectedName) return;

    const found = CALCULATOR_SPECIES.find(item => item.species === selectedName);
    if (found && !selectedSpecies.some(item => item.species === selectedName)) {
      setSelectedSpecies([...selectedSpecies, found]);
    }
    e.target.value = ""; // Reset select
  };

  const handleRemoveSpecies = (index: number) => {
    const updated = [...selectedSpecies];
    updated.splice(index, 1);
    setSelectedSpecies(updated);
  };

  const handleSendCustomInquiry = () => {
    const speciesText = selectedSpecies.map(item => item.species).join(", ") || "Custom selection";
    setInquiryForm({
      name: "",
      email: "",
      package: "Custom Bespoke Hunt",
      lodge: "Kikuyu Lodge",
      message: `Bespoke calculator planning draft:\n- Duration: ${stayNights} Nights\n- Hunters: ${hunterCount}\n- Estimated Price: $${totalEstimate.toLocaleString()}\n- Species: ${speciesText}`
    });
    handleNavClick("cta-section");
  };

  return (
    <div className="min-h-screen bg-[#0d0906] flex flex-col items-center">
      
      {/* Immersive Hero (Full Screen Viewport) */}
      <div className="relative min-h-screen md:h-[75vh] w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/packages_hero_new.jpg" 
            alt="Ivorytip Safari Packages" 
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
        <main className="relative z-30 max-w-8xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full min-h-0 pt-24 md:pt-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-3 md:space-y-6">
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase block">
              Safari Expeditions
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.06em] md:tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              Trophies & Packages
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Curated luxury hunting packages, step-by-step stalk timelines, and our interactive bespoke cost planner.
            </p>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="relative z-30 pb-12 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-semibold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent" />
        </div>
      </div>

      {/* 1. Packages Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full space-y-16 z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8 text-left">
          <div className="space-y-1">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-wider">Curated Expeditions</h3>
            <p className="text-stone-400 text-xs font-light">All-inclusive packages matching accommodation sanctuaries and trophy checklists.</p>
          </div>
          <button
            onClick={() => setActiveModal("pricing")}
            className="btn-shimmer flex items-center gap-2 border border-amber-400 text-amber-200 hover:text-amber-100 px-6 py-2.5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-amber-400/10 cursor-pointer bg-black/40 backdrop-blur-sm rounded-lg animate-pulse"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            View Complete Price Catalog
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`pkg-card relative flex flex-col justify-between rounded-2xl p-8 border transition-all duration-500 overflow-hidden text-left ${
                pkg.featured
                  ? "pkg-featured bg-gradient-to-br from-[#1c130e] to-[#150d0a] border-amber-500/50 shadow-2xl shadow-black/80 scale-[1.02] md:scale-105 z-10"
                  : "bg-black/20 border-white/[0.04] hover:bg-white/[0.01] hover:border-white/10"
              }`}
            >
              {pkg.featured && (
                <div className="absolute top-0 right-0 bg-amber-400 text-[#110c08] text-[9px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-bl-lg">
                  {pkg.tag}
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  {!pkg.featured && (
                    <span className="text-[10px] text-stone-400 uppercase font-bold tracking-widest block mb-2">
                      {pkg.tag}
                    </span>
                  )}
                  <h3 className="font-sans text-xl md:text-2xl font-bold text-white leading-tight uppercase">
                    {pkg.title}
                  </h3>
                  <div className="flex flex-col gap-1.5 mt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl md:text-3xl font-bold text-amber-400 font-mono">{pkg.price}</span>
                      <span className="text-[9px] text-stone-400 uppercase font-bold tracking-wider">1:1 Hunter / PH</span>
                    </div>
                    <div className="flex justify-between items-baseline border-t border-white/5 pt-1.5">
                      <span className="text-xl md:text-2xl font-bold text-amber-400/80 font-mono">{pkg.rate2to1}</span>
                      <span className="text-[9px] text-stone-500 uppercase font-bold tracking-wider">2:1 Hunter / PH</span>
                    </div>
                    <span className="text-[9px] text-stone-600 font-light block">Per person</span>
                  </div>
                  {pkg.bonusNote && (
                    <div className="mt-3 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded text-[9px] text-amber-300 font-bold uppercase tracking-wide">
                      🎁 {pkg.bonusNote}
                    </div>
                  )}
                </div>

                <div className="h-px bg-white/10" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
                    <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Lodge: {pkg.lodge}</span>
                  </div>
                  <div className="bg-black/35 p-3 rounded border border-amber-900/10 mt-2 border-solid">
                    <span className="text-[9px] uppercase text-amber-400 font-bold tracking-wider block mb-1">Included Trophies:</span>
                    <p className="text-xs text-amber-100 font-medium font-mono leading-relaxed">{pkg.species}</p>
                  </div>
                </div>

                {/* Included */}
                <div className="space-y-2 pt-1">
                  <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Included</span>
                  {pkg.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-stone-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Excluded */}
                <div className="space-y-2 pt-1 border-t border-white/5">
                  <span className="text-[9px] uppercase tracking-wider text-stone-500 font-bold block">Not Included</span>
                  {pkg.excluded.map((item, eIdx) => (
                    <div key={eIdx} className="flex items-start gap-2.5 text-xs text-stone-500">
                      <span className="text-stone-600 shrink-0 mt-0.5 text-xs">✕</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5">
                <button
                  onClick={() => {
                    setInquiryForm({
                      name: "",
                      email: "",
                      package: pkg.title,
                      lodge: pkg.lodge,
                      message: `Inquiring about package: ${pkg.title}.`
                    });
                    handleNavClick("cta-section");
                  }}
                  className={`py-3 rounded-lg uppercase text-[10px] tracking-wider font-bold cursor-pointer transition-colors text-center ${
                    pkg.featured
                      ? "bg-amber-400 hover:bg-amber-500 text-[#110c08]"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  Inquire
                </button>
                <Link
                  to={`/itinerary/${pkg.id}`}
                  className="py-3 rounded-lg uppercase text-[10px] tracking-wider font-bold transition-all border border-amber-500/20 hover:border-amber-400 text-amber-200 hover:text-amber-100 bg-black/35 hover:bg-amber-400/5 text-center flex items-center justify-center border-solid"
                >
                  Full Itinerary
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Build Your Own — 4th option */}
        <div className="mt-12 bg-gradient-to-br from-[#0f0b08] to-[#1a120c] border border-amber-900/20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">Tailor-Made</span>
            <h3 className="font-sans text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">Build Your Own Safari</h3>
            <p className="text-stone-400 text-sm font-light leading-relaxed">
              Choose from our full 70+ species price list. As premier hunting outfitters in South Africa, we design custom hunting trips in South Africa, Botswana, Namibia, and Zimbabwe. Daily rates are <span className="text-amber-300 font-medium">$380/day (1:1)</span> or <span className="text-amber-300 font-medium">$300/day per client (2:1)</span>. Andre will build a custom itinerary around your target species and budget.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Cape Buffalo", "Greater Kudu", "Sable", "Eland", "Oryx", "Zebra", "Waterbuck", "+ 60 more"].map(s => (
                <span key={s} className="text-[9px] bg-white/5 border border-white/10 text-stone-400 px-2 py-1 rounded font-mono uppercase">{s}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <button
              onClick={() => {
                setInquiryForm({
                  name: "",
                  email: "",
                  package: "Build Your Own — Tailor-Made Safari",
                  lodge: "To be confirmed",
                  message: "I'd like to build a custom safari package. Please share the full species price list and available dates."
                });
                handleNavClick("cta-section");
              }}
              className="bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-10 rounded-lg tracking-wider text-xs uppercase cursor-pointer transition-colors whitespace-nowrap"
            >
              Start Planning
            </button>
            <span className="text-[9px] text-stone-500 text-center uppercase tracking-wide">No obligation · Response within 24hrs</span>
          </div>
        </div>
      </section>

      {/* 2. What To Expect On Your Hunt Section */}
      <section className="w-full bg-[#120e0a] border-y border-amber-900/10 py-24 px-6 lg:px-12 text-left z-20">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header (Consistent with About/Lodges/Home headings) */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 md:space-y-6">
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase block">
              Hunting Overview
            </span>
            <h3 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              What To Expect On Your Hunt
            </h3>
            <p className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              From your initial video call and rifle setup to days spent tracking in the veld and evenings around the braai fire, here is how your safari unfolds.
            </p>
          </div>

          {/* Clean Horizontal Tab Navigation (Matching site card button design) */}
          <div className="bg-[#1c130e] border border-white/10 rounded-2xl p-3 flex overflow-x-auto gap-2 text-xs font-bold uppercase tracking-wider scrollbar-none justify-start md:justify-center shadow-xl">
            {HUNTING_STEPS.map((step, idx) => {
              const isSelected = activeStepIdx === idx;
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => {
                    setDirection(idx > activeStepIdx ? 1 : -1);
                    setActiveStepIdx(idx);
                  }}
                  className={`px-4 py-2.5 rounded-lg border transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap ${
                    isSelected
                      ? "bg-amber-400 border-amber-400 text-[#110c08] shadow-md"
                      : "bg-transparent border-white/5 text-stone-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  Step {step.stepNumber}
                </button>
              );
            })}
          </div>

          {/* Interactive Card Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#1c130e] border border-amber-900/30 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            
            {/* Left Page: Step Photo */}
            <div className="lg:col-span-6 relative min-h-[260px] md:min-h-[380px] w-full [perspective:1200px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeStepIdx}
                  custom={direction}
                  variants={flipVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-full h-full rounded-xl overflow-hidden border border-white/10 bg-black/40 relative shadow-xl origin-left"
                >
                  <img 
                    src={HUNTING_STEPS[activeStepIdx].image} 
                    alt={HUNTING_STEPS[activeStepIdx].title} 
                    className="w-full h-full object-cover brightness-[0.85]" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Page: Narrative & Authentic Advice */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8 py-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStepIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-6 text-left"
                >
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-bold tracking-[0.2em] text-amber-400 block font-sans">
                      {HUNTING_STEPS[activeStepIdx].duration}
                    </span>
                    <h4 className="font-sans text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-tight">
                      Step {HUNTING_STEPS[activeStepIdx].stepNumber}: {HUNTING_STEPS[activeStepIdx].title}
                    </h4>
                  </div>
                  
                  <p className="text-stone-300 text-sm font-light leading-relaxed">
                    {HUNTING_STEPS[activeStepIdx].longDesc}
                  </p>

                  {/* Authentic Host Advice Box */}
                  <div className="bg-black/40 p-4 rounded-xl border border-white/10 text-xs text-stone-300 flex gap-3 shadow-inner">
                    <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">Tip from Andre & Jenna</span>
                      <p className="leading-relaxed font-light text-stone-300">{HUNTING_STEPS[activeStepIdx].tip}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <button
                  disabled={activeStepIdx === 0}
                  onClick={() => {
                    setDirection(-1);
                    setActiveStepIdx(prev => Math.max(0, prev - 1));
                  }}
                  className="flex items-center gap-2 text-stone-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors text-xs uppercase font-bold tracking-wider"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider">
                  Step {activeStepIdx + 1} of 10
                </span>

                <button
                  disabled={activeStepIdx === HUNTING_STEPS.length - 1}
                  onClick={() => {
                    setDirection(1);
                    setActiveStepIdx(prev => Math.min(HUNTING_STEPS.length - 1, prev + 1));
                  }}
                  className="flex items-center gap-2 text-amber-400 hover:text-amber-300 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors text-xs uppercase font-bold tracking-wider"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Dynamic Calculator Section */}
      <section className="w-full py-24 px-6 lg:px-12 text-left z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Inputs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold block flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-amber-400" />
                Dynamic Stalk Planner
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">Estimate Your Custom Safari</h3>
              <p className="text-stone-400 text-xs font-light leading-relaxed">
                Configure your stay nights, hunter count, and stack trophy fees to estimate standard daily guide rates and package summaries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-black/20 p-6 rounded-2xl border border-white/5 border-solid">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Stay Duration (Nights)</label>
                <input 
                  type="number" 
                  min={3}
                  max={21}
                  value={stayNights}
                  onChange={(e) => setStayNights(Math.max(3, parseInt(e.target.value) || 3))}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-lg px-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 border-solid"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Hunters Group Size</label>
                <select 
                  value={hunterCount}
                  onChange={(e) => setHunterCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-lg px-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 border-solid"
                >
                  <option value={1} className="bg-[#1c130d] text-white">1 Hunter (1:1 PH Guide Ratio)</option>
                  <option value={2} className="bg-[#1c130d] text-white">2 Hunters (2:1 PH Guide Ratio)</option>
                  <option value={3} className="bg-[#1c130d] text-white">3 Hunters (Bespoke coordination)</option>
                  <option value={4} className="bg-[#1c130d] text-white">4 Hunters (Exclusive buyout)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Add Target Species Trophy</label>
                <select 
                  onChange={handleAddSpecies}
                  defaultValue=""
                  className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-lg px-4 py-3 text-xs md:text-sm focus:outline-none border-solid"
                >
                  <option value="" disabled className="bg-[#1c130d] text-stone-500">-- Choose animal to add --</option>
                  {CALCULATOR_SPECIES.map((item, idx) => (
                    <option 
                      key={idx} 
                      value={item.species} 
                      disabled={selectedSpecies.some(s => s.species === item.species)}
                      className="bg-[#1c130d] text-white"
                    >
                      {item.species} (+${item.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected checklist */}
            <div className="space-y-3">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Selected Trophies List ({selectedSpecies.length})</h4>
              <div className="space-y-2">
                {selectedSpecies.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/[0.02] border border-white/5 px-4 py-3 rounded-lg border-solid">
                    <span className="text-xs font-medium text-stone-200">{item.species}</span>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs font-bold text-amber-300">${item.price.toLocaleString()}</span>
                      <button 
                        onClick={() => handleRemoveSpecies(idx)}
                        className="text-stone-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                        aria-label="Remove species"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {selectedSpecies.length === 0 && (
                  <div className="text-xs text-stone-500 italic p-4 bg-white/[0.01] border border-white/5 border-dashed rounded-lg text-center">
                    No individual trophy species added yet. Select from the dropdown above.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right panel: Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] bg-[#1c130e] border border-amber-900/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl border-solid">
            <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider">Estimated Cost Draft</h4>
            
            <div className="space-y-3.5 text-xs text-stone-300 font-light">
              <div className="flex items-center justify-between">
                <span>Daily Guide Fees ({stayNights} Nights)</span>
                <span className="font-mono text-white">${totalDailyFees.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Selected Trophy Fees ({selectedSpecies.length} animals)</span>
                <span className="font-mono text-white">${totalTrophyFees.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono italic">
                <span>Guide rate applied</span>
                <span>${dailyRate}/day per Hunter</span>
              </div>

              <div className="h-px bg-white/10 my-2" />

              <div className="flex items-baseline justify-between pt-2">
                <span className="font-semibold text-white uppercase tracking-wider text-xs">Estimated Total</span>
                <span className="text-3xl font-bold text-amber-400 font-mono">${totalEstimate.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleSendCustomInquiry}
                disabled={selectedSpecies.length === 0}
                className="btn-shimmer w-full bg-amber-400 hover:bg-amber-500 text-[#110c08] disabled:opacity-40 disabled:pointer-events-none font-bold py-3.5 px-4 rounded-lg uppercase tracking-wider text-xs shadow-xl cursor-pointer text-center block"
              >
                Inquire This Stalk Plan
              </button>
            </div>

            <div className="h-px bg-white/10" />

            <div className="text-[10px] text-stone-400 font-light flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Daily guide fees cover PHs, trackers, skinners, 4x4 vehicles, luxury lodging, boma dining, and permit administration. Trophy fees are only payable on animals harvested or wounded.
              </span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
