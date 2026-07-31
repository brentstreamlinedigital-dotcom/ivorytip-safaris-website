import React from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Compass, 
  Clock, 
  Users, 
  Heart, 
  ArrowRight,
  MapPin,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";

// @ts-ignore
import fairHuntImage from "../../assets/'Fair Hunt' Image.jpg";

export default function About() {
  const guideStats = [
    { value: "40+", label: "Years Trust" },
    { value: "100%", label: "Fair Chase" },
    { value: "80k+", label: "Hectares Private Land" },
    { value: "1:1", label: "Guide Ratio" }
  ];

  const coreValues = [
    {
      title: "Ancestral Guiding",
      desc: "Our trackers are native bushmen who carry generations of tracking wisdom, decoding sand footprints, broken branches, and bird calls.",
      icon: Compass
    },
    {
      title: "Anti-Poaching Leadership",
      desc: "We fund and field our own dedicated anti-poaching security patrol squads. Over 10% of every booking goes directly to habitat and wildlife protection.",
      icon: Shield
    },
    {
      title: "Community Upliftment",
      desc: "We build water access infrastructure and supply primary school classrooms in the adjacent communal conservancy districts.",
      icon: Heart
    }
  ];

  const guides = [
    {
      name: "Jaco van der Merwe",
      role: "Lead Master Professional Hunter",
      bio: "Over 25 years of big game stalking experience. Renowned for tracking dangerous cape buffalo in dense river thorn scrub.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "Tsumeb /Kae",
      role: "Chief Bushman Tracker",
      bio: "Born in the Kalahari sands, Tsumeb reads the desert like an open book. Able to trace aged trails over gravel plains.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80"
    },
    {
      name: "Jofred Botha",
      role: "Outpost Range Coordinator",
      bio: "Coordinates conservancy biology, anti-poaching logistics, and custom high-caliber safari arms administration.",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d0906] flex flex-col items-center">
      
      {/* Immersive Hero (Full Screen Viewport) */}
      <div className="relative min-h-screen md:h-screen w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={fairHuntImage} 
            alt="About Ivorytip Heritage" 
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
              The Legend & Legacy
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              About Ivorytip Safaris
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Honoring the code of fair chase, preserving high-conservation habitats, and delivering the absolute pinnacle of wilderness comfort since 1984.
            </p>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="relative z-30 pb-12 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-semibold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent" />
        </div>
      </div>

      {/* Stats Board */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 -mt-10 relative z-20">
        <div className="bg-[#1c130e] border border-amber-900/30 rounded-2xl p-6 md:p-10 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {guideStats.map((stat, idx) => (
            <div key={idx} className="space-y-1.5 border-r border-white/5 last:border-r-0">
              <span className="block font-sans text-2xl md:text-4xl font-bold text-amber-400 font-mono">
                {stat.value}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Narrative Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold block">Forty Years in South Africa</span>
          <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase tracking-tight leading-tight">
            Our Ancient Soil, <br />
            Our Modern Sanctuary
          </h3>
          <div className="h-0.5 w-16 bg-amber-500/50 rounded" />
          <p className="text-stone-300 text-sm font-light leading-relaxed">
            Founded by veteran professional hunters, Ivorytip Safaris was established to combat mass hunting tourism and replace it with highly selective, conservation-first hunting expeditions. We believe that true hunting is a sacred connection with the wilderness—a physical stalk that respects the animal's natural senses.
          </p>
          <p className="text-stone-400 text-xs leading-relaxed font-light">
            Our private Eastern Cape conservancy features no interior fences, allowing herds of kudu, gemsbuck, eland, and zebra to migrate naturally alongside large native predators. This open land layout ensures genuine chase and natural challenges on every hunt.
          </p>
        </div>
        <div className="relative rounded-2xl overflow-hidden border border-white/10 p-2 bg-white/[0.02]">
          <img 
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80" 
            alt="Savanna Wilderness Landscape" 
            className="w-full h-80 object-cover rounded-xl brightness-[0.7]"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Core Values / Anti-Poaching Showcase */}
      <section className="w-full bg-[#120e0a] border-y border-amber-900/10 py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Conservation Pillars</span>
            <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">Our Sacred Stewardship</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {coreValues.map((value, idx) => (
              <div key={idx} className="bg-black/20 border border-white/5 rounded-2xl p-8 space-y-4 hover:border-amber-500/20 transition-all duration-300">
                <value.icon className="w-8 h-8 text-amber-400" />
                <h4 className="font-sans text-base font-bold text-white uppercase tracking-wider">{value.title}</h4>
                <p className="text-stone-400 text-xs leading-relaxed font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Profiles */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Field Masters</span>
          <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">Meet Your Trackers & PHs</h3>
          <p className="text-stone-400 text-xs leading-relaxed font-light">
            Walk alongside experts carrying absolute command over local biology, ballistic handling, and custom field preparation logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {guides.map((guide, idx) => (
            <div key={idx} className="bg-[#1c130e]/40 border border-amber-900/15 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/20 transition-all duration-300">
              <img 
                src={guide.img} 
                alt={guide.name} 
                className="w-full h-64 object-cover object-center grayscale hover:grayscale-0 transition-all duration-500" 
                referrerPolicy="no-referrer"
              />
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold">{guide.role}</span>
                  <h4 className="font-sans text-base font-bold text-white uppercase mt-0.5">{guide.name}</h4>
                  <p className="text-stone-400 text-xs leading-relaxed font-light mt-2">{guide.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
