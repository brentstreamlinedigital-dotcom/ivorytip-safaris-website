import React, { useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { 
  Clock, 
  Coffee, 
  Compass, 
  Check, 
  ChevronRight, 
  ArrowLeft,
  Calendar,
  Sparkles,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ItineraryData {
  title: string;
  price: string;
  duration: string;
  lodge: string;
  species: string;
  tag: string;
  heroImage: string;
  overview: string;
  days: { day: number; title: string; desc: string; activity: string }[];
  inclusions: string[];
  exclusions: string[];
}

const ITINERARIES: Record<string, ItineraryData> = {
  "1": {
    title: "The Plains Game Starter",
    price: "$4,100 (1:1) / $3,600 (2:1)",
    duration: "6 Days / 5 Nights",
    lodge: "Kikuyu Lodge",
    species: "1x Impala, 1x Blesbuck, 1x Blue Wildebeest, 1x Warthog",
    tag: "Introductory Stalk",
    heroImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=90",
    overview: "Designed for hunters seeking the quintessential South African plains game experience. Across 10,000+ hectares of private Eastern Cape conservancy, you will stalk and harvest four signature plains game species under the guidance of our veteran professional hunter Andre Crous and his expert tracking team.",
    days: [
      { day: 1, title: "Arrival & Sight-In", desc: "Airport reception at Chief Dawid Stuurman Int'l (Port Elizabeth) and private transfer to Kikuyu Lodge. Settle into your stone chalet followed by rifle check and sight-in at our private range. Andre will brief you on the terrain and safety.", activity: "Fireside briefing & welcome drinks" },
      { day: 2, title: "First Light Stalk (Impala)", desc: "Depart before dawn to scout valley bushveld pockets for trophy impala. Walk-and-stalk tactics matching wind thermals — the only way we hunt at Ivorytip.", activity: "Wild game braai dinner" },
      { day: 3, title: "Tracking the Blesbuck", desc: "Track blesbuck herds across the open grassy ridges. A physical stalk testing hunter patience and shot placement.", activity: "Boma storytelling & drinks" },
      { day: 4, title: "Blue Wildebeest Pursuit", desc: "Stalk blue wildebeest herds across open grassland valleys. Work scent lines with the tracking team.", activity: "Scenic lunch stop — Knife's Edge viewpoint" },
      { day: 5, title: "Warthog Walk-Up Hunt", desc: "Scout active watering holes and riverbank tracks to secure a trophy warthog. Close-range stalking in dense riverside bush.", activity: "God's Eye picnic lunch" },
      { day: 6, title: "Farewell & Transfer", desc: "Early morning breakfast. Trophy cataloging with our skinner, then private shuttle transfer back to Port Elizabeth Airport.", activity: "Final team send-off" }
    ],
    inclusions: [
      "Airport Pick-up / Drop-off (Port Elizabeth)",
      "Dedicated Professional Hunter & Tracker",
      "Luxury Lodging — Kikuyu Lodge",
      "3 Meals per Day, Light Beverages & Laundry",
      "Skinner & Field Preparation of Trophies"
    ],
    exclusions: [
      "Rifle Hire & Ammunition",
      "Gratuities / Tips for PH, Tracker & Camp Staff",
      "International Flights & Travel Insurance",
      "Trophy Dip, Pack & Shipping / Export Services"
    ]
  },
  "2": {
    title: "The Savanna Classic",
    price: "$5,900 (1:1) / $5,300 (2:1)",
    duration: "7 Days / 6 Nights",
    lodge: "Kikuyu Lodge",
    species: "1x Impala, 1x Blesbuck, 1x Kudu, 1x Blue Wildebeest, 1x Springbuck",
    tag: "Most Popular",
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=90",
    overview: "Our flagship expedition combining maximum plains game variety with the height of Eastern Cape wilderness. Target five premier African species, including the elusive Kudu, while enjoying Kikuyu Lodge's famous boma hospitality.",
    days: [
      { day: 1, title: "Airport Reception & Transfer", desc: "Airport reception and private transfer to Kikuyu Lodge. Settle into your stone chalet and conduct sight-in checks at the range. Meet Andre and the tracking team.", activity: "Sundowners & dinner feast" },
      { day: 2, title: "Blue Wildebeest Pursuit", desc: "Stalk blue wildebeest herds across open grassland valleys. Work scent lines with the tracking team.", activity: "Fireside drinks" },
      { day: 3, title: "The Grey Ghost Chase (Kudu)", desc: "Devote the day to stalking the majestic Kudu in thick ridge brushes and deep ravines. The highlight of the classic package.", activity: "Knife's Edge scenic drive & potjie dinner" },
      { day: 4, title: "Blesbuck Ridge Tracking", desc: "Scout elevated ridge paths to track and harvest a trophy blesbuck. Physical walking and patience.", activity: "God's Eye hilltop lunch" },
      { day: 5, title: "Impala Stalk & Valley Scouting", desc: "Active walk-and-stalk targeting trophy impala in thornveld country.", activity: "Wine & cheese at the lodge" },
      { day: 6, title: "Springbuck Plains", desc: "Cross the open flats to target Springbuck — fast, challenging, and rewarding. Your final trophy of the expedition.", activity: "Farewell boma dinner" },
      { day: 7, title: "Lodge Departure", desc: "Morning breakfast. Final trophy checks, checkout, and transfer to Port Elizabeth airport.", activity: "Trackers farewell" }
    ],
    inclusions: [
      "Airport Pick-up / Drop-off (Port Elizabeth)",
      "Dedicated Professional Hunter & Tracker",
      "Luxury Lodging — Kikuyu Lodge",
      "3 Meals per Day, Light Beverages & Laundry",
      "Skinner & Field Preparation of Trophies",
      "Includes 1 free cull Impala or Warthog"
    ],
    exclusions: [
      "Rifle Hire & Ammunition",
      "Gratuities / Tips for PH, Tracker & Camp Staff",
      "International Flights & Travel Insurance",
      "Trophy Dip, Pack & Shipping / Export Services"
    ]
  },
  "3": {
    title: "The Big Game Monarch",
    price: "$20,000 (1:1) / $19,000 (2:1)",
    duration: "11 Days / 10 Nights",
    lodge: "Emanzini Lodge",
    species: "1x Buffalo Bull (Under 38\"), 1x Kudu, 1x Blue Wildebeest, 1x Zebra, 1x Blesbuck, 1x Impala",
    tag: "Ultimate Safari",
    heroImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=90",
    overview: "The ultimate big game quest, targeting the legendary Cape Buffalo alongside five supporting plains game species. Live the classic African narrative with sole-use wetland lodge luxury.",
    days: [
      { day: 1, title: "Lodge Welcome", desc: "Airport pickup and private transfer to Emanzini River Lodge. Safety briefings and ballistic sight-in checking.", activity: "Sunset river deck welcome drinks" },
      { day: 2, title: "Cape Buffalo: Spoor Patrol", desc: "Scout river tracks and active dung paths to map the movement of the heavy buffalo herds.", activity: "Traditional boma woodfire dinner" },
      { day: 3, title: "The Buffalo Bull Stalk", desc: "Track and harvest your Cape Buffalo bull (under 38\") in deep thorn thickets. Intense adrenaline stalk.", activity: "Champagne trophy toast celebration" },
      { day: 4, title: "Greater Kudu Stalking", desc: "Pursue the ghost-like kudu along the rocky ridges of the conservancy.", activity: "Sommelier private reserve pairings" },
      { day: 5, title: "Blue Wildebeest Chase", desc: "Stalk herds of blue wildebeest across acacia grasslands.", activity: "Gourmet wild game braai" },
      { day: 6, title: "Zebra Ridge Track", desc: "Track wild zebra herds in challenging highland terrain. Physical stalking.", activity: "Stargazing and telescopes setup" },
      { day: 7, title: "Blesbuck & Impala Pursuit", desc: "Secure the remaining trophies, tracking common impala and blesbuck in savanna zones.", activity: "Riverbend sundowner drinks" },
      { day: 8, title: "Wetland River Cruise", desc: "Rest day featuring private river boating, photography, and wildlife observation.", activity: "Freshwater river crab dinner" },
      { day: 9, title: "Stewardship Walk", desc: "Explore anti-poaching security borders with conservancy rangers.", activity: "Lodge chef specialty feast" },
      { day: 10, title: "Taxidermy Admin & Spa", desc: "Review mounting specs with skinners and coordinate admin. Afternoon spa relaxation.", activity: "Farewell hunters gala dinner" },
      { day: 11, title: "Conservancy Departure", desc: "Checkout, final packing, and private transport shuttle to Port Elizabeth airport.", activity: "Final tracking team salute" }
    ],
    inclusions: [
      "Airport Pick-up / Drop-off (Port Elizabeth)",
      "Dedicated Professional Hunter & Tracker",
      "Luxury Lodging — Emanzini Lodge",
      "3 Meals per Day, Light Beverages & Laundry",
      "Skinner, Field Preparation & Trophy Export Admin"
    ],
    exclusions: [
      "Rifle Hire & Ammunition",
      "Gratuities / Tips for PH, Tracker & Camp Staff",
      "International Flights & Travel Insurance",
      "Trophy Dip, Pack & Shipping / Export Services"
    ]
  }
};

export default function ItineraryDetail() {
  const { id } = useParams<{ id: string }>();
  const { setInquiryForm, handleNavClick } = useOutletContext<any>();
  const [activeDay, setActiveDay] = useState(1);

  const itinerary = ITINERARIES[id || "2"] || ITINERARIES["2"];

  const handleInquire = () => {
    setInquiryForm({
      name: "",
      email: "",
      package: itinerary.title,
      lodge: itinerary.lodge,
      message: `Inquiring about detailed itinerary package: ${itinerary.title}. Preferred duration: ${itinerary.duration}.`
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
            src={itinerary.heroImage} 
            alt={itinerary.title} 
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
        <main className="relative z-30 max-w-8xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full min-h-0 pt-24 md:pt-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 md:space-y-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-stone-400 hover:text-amber-400 text-xs uppercase font-bold tracking-widest transition-colors mb-2 md:mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Hunts
            </Link>
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase block">
              {itinerary.tag}
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              {itinerary.title}
            </h2>
            <div className="flex items-center justify-center gap-6 text-xs md:text-sm font-medium tracking-wide text-stone-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4.5 h-4.5 text-amber-400" />
                {itinerary.duration}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-stone-700" />
              <span className="flex items-center gap-1.5">
                <Coffee className="w-4.5 h-4.5 text-amber-400" />
                Lodge: {itinerary.lodge}
              </span>
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
        
        {/* Left Side: Overview & Daily Timeline */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Overview */}
          <div className="space-y-4 text-left">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-wider">Expedition Overview</h3>
            <div className="h-0.5 w-16 bg-amber-500/50 rounded mb-4" />
            <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed">
              {itinerary.overview}
            </p>
            <div className="bg-black/30 p-4 rounded-xl border border-amber-900/10 flex items-center gap-3">
              <Compass className="w-6 h-6 text-amber-400 shrink-0" />
              <div className="text-xs text-left">
                <span className="text-amber-400 font-bold block uppercase tracking-wider">Species Included:</span>
                <span className="font-mono text-stone-200 font-semibold">{itinerary.species}</span>
              </div>
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="space-y-6 text-left">
            <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-wider">Day-by-Day Schedule</h3>
            <div className="h-0.5 w-16 bg-amber-500/50 rounded mb-6" />

            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/5 scrollbar-thin">
              {itinerary.days.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shrink-0 cursor-pointer ${
                    activeDay === day.day
                      ? "bg-amber-400 text-[#110c08]"
                      : "bg-white/5 text-stone-400 hover:text-white"
                  }`}
                >
                  Day {day.day}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {itinerary.days.map((day) => day.day === activeDay && (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#1c130e]/40 border border-amber-900/15 p-6 md:p-8 rounded-2xl space-y-6 text-left relative overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 text-[120px] font-bold text-white/[0.02] pointer-events-none leading-none select-none">
                    0{day.day}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">Day 0{day.day} Protocol</span>
                    <h4 className="font-display text-lg md:text-xl font-bold text-white uppercase tracking-tight mt-1">{day.title}</h4>
                  </div>
                  <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed">
                    {day.desc}
                  </p>
                  <div className="border-t border-white/5 pt-4 mt-2 flex items-center gap-2.5 text-xs text-amber-100/90 font-light font-mono">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Evening Highlight:</strong> {day.activity}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Quick Stats, Book Sidebar */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[120px]">
          
          <div className="bg-[#1c130e] border border-amber-900/30 rounded-2xl p-6 md:p-8 space-y-6 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Est. Base Price</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl md:text-4xl font-bold text-amber-400 font-mono">{itinerary.price}</span>
                <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">per Hunter</span>
              </div>
              <p className="text-[10px] text-stone-500 font-light mt-1.5">Rates subject to trophy sizes and permits.</p>
            </div>

            <div className="h-px bg-white/15" />

            <div className="space-y-4">
              <button 
                onClick={handleInquire}
                className="btn-shimmer w-full bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-4 rounded-lg uppercase tracking-wider text-xs shadow-xl cursor-pointer text-center"
              >
                Inquire For This Itinerary
              </button>
              <button 
                onClick={() => handleNavClick("cta-section")}
                className="w-full py-3.5 bg-transparent hover:bg-white/5 text-white border border-white/15 hover:border-white/30 rounded-lg text-xs uppercase font-bold tracking-wider cursor-pointer text-center"
              >
                Customize Stalk Species
              </button>
            </div>

            <div className="h-px bg-white/10" />

            <div className="space-y-3.5 text-xs font-light text-stone-300">
              <h5 className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Quick Specs</h5>
              <div className="flex items-center justify-between">
                <span>Duration</span>
                <span className="font-mono font-medium text-white">{itinerary.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Staff Ratio</span>
                <span className="font-mono font-medium text-white">1:1 Hunter to Guide</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Lodge stay</span>
                <span className="font-mono font-medium text-amber-200">Luxury Base Lodge</span>
              </div>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="bg-black/20 border border-white/5 rounded-2xl p-6 text-left space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-amber-200 font-bold">Inclusions Checklist</h4>
            <ul className="space-y-2 text-xs text-stone-300 font-light">
              {itinerary.inclusions.map((inc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
            
            <div className="h-px bg-white/5 my-2" />
            
            <h4 className="text-xs uppercase tracking-widest text-stone-400 font-bold">Exclusions</h4>
            <ul className="space-y-2 text-xs text-stone-400 font-light">
              {itinerary.exclusions.map((exc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-700 mt-1.5 shrink-0" />
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
