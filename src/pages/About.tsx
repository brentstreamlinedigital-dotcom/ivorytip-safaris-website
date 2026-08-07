import React from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Compass, 
  Heart, 
  ArrowRight,
  MapPin,
  Check,
  Award,
  Users
} from "lucide-react";
import { motion } from "motion/react";

export default function About() {
  const guideStats = [
    { value: "2015", label: "Year Founded" },
    { value: "10,000", label: "Hectares Managed Farm" },
    { value: "30,000", label: "Hectares Concessions" },
    { value: "100%", label: "Fair Chase Walk & Stalk" }
  ];

  const coreValues = [
    {
      title: "Lineage of Trust",
      desc: "Our stalks are built on personal bonds. You enter as a client, but you walk the bush as a partner and leave as a lifetime friend of the Crous family.",
      icon: Users
    },
    {
      title: "Anti Poaching Unit",
      desc: "Sustainable hunting operations directly help fund our dedicated anti-poaching patrol units, keeping the area secure from illegal snaring.",
      icon: Shield
    },
    {
      title: "Savanna Stewardship",
      desc: "We maintain local water points, monitor wildlife health, and support conservation initiatives in our surrounding district.",
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-[#0d0906] flex flex-col items-center">
      
      {/* Immersive Hero (Full Screen Viewport) */}
      <div className="relative min-h-screen md:h-[75vh] w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/about_page_hero.jpg" 
            alt="About Ivorytip Heritage" 
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
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 md:space-y-6">
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase block">
              Eastern Cape, South Africa
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              Born From
              <br />
              The Bush
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              A family-run hunting safari operation rooted in the Eastern Cape. Andre & Jenna Crous have dedicated their lives to ethical walk-and-stalk hunting and genuine South African hospitality.
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

      {/* Personal Hosts Story Section (Meet Andre & Jenna) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 w-full space-y-24 z-20">
        
        {/* Host 1: Andre Crous */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-amber-500/20 p-2 bg-white/[0.02] shadow-xl group">
            <img 
              src="/assets/Andre 1.jpg" 
              alt="Andre Crous - Professional Hunter" 
              className="w-full h-96 md:h-[500px] object-cover rounded-xl brightness-[0.8] group-hover:scale-102 transition-transform duration-750"
            />
            <div className="absolute bottom-6 left-6 bg-black/85 border border-amber-500/25 px-4 py-2 rounded backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">Professional Hunter</span>
              <span className="text-xs font-semibold text-white uppercase block mt-0.5">Lead Tracker & Guide</span>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold block">The Spirit of the Stalk</span>
            <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-tight">
              Andre Crous: <br />
              Guiding with Respect
            </h3>
            <div className="h-0.5 w-16 bg-amber-500/50 rounded" />
            <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed">
              Andre grew up tracking in the South African bushveld, shaping him into a dedicated hunting outfitter. With years spent reading sand spoor, monitoring valley drafts, and walking alongside local trackers, he guides the walk-and-stalk hunting trips at Ivorytip Safaris. Andre believes a true hunt is an authentic test of camouflage, stealth, and patience.
            </p>
            <p className="text-stone-400 text-xs md:text-sm leading-relaxed font-light">
              Under his guidance, guests do not hunt from vehicles; they walk the acacia corridors, match thermals, and stalk target animals on foot. It is an honest stalk that honors the code of fair chase, ensuring that every harvest is an ethical, hard-earned connection with the wild.
            </p>
            <div className="bg-black/35 p-5 rounded-xl border border-white/5 flex gap-4 text-xs font-light text-stone-300">
              <Award className="w-8 h-8 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-white uppercase block">Guiding Credentials</span>
                <p className="leading-relaxed">Licensed Professional Hunter, tracking logistics, and CITES framework compliance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Host 2: Jenna Crous */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <span className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold block">Wilderness Comfort & Hospitality</span>
            <h3 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-tight">
              Jenna Crous: <br />
              Hosting the Lodge Heart
            </h3>
            <div className="h-0.5 w-16 bg-amber-500/50 rounded" />
            <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed">
              While the adventure is defined in the field, the experience is completed within our lodges. Jenna coordinates the hospitality and culinary arrangements at Kikuyu and Emanzini. She ensures that every guest is welcomed as an extension of the Crous family, creating a warm, intimate atmosphere.
            </p>
            <p className="text-stone-400 text-xs md:text-sm leading-relaxed font-light">
              From coordinating dinners in our lodge dining areas to setting up fireside stargazing setups, Jenna's touch makes the lodge feel like home. She believes that trust, shared laughter, and late-night fireside stories are the true core of South African hospitality.
            </p>
            <div className="bg-black/35 p-5 rounded-xl border border-white/5 flex gap-4 text-xs font-light text-stone-300">
              <Heart className="w-8 h-8 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-white uppercase block">A Focus on Comfort</span>
                <p className="leading-relaxed">Fresh local ingredients, custom dietary planning, and warm lodge hospitality.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-amber-500/20 p-2 bg-white/[0.02] shadow-xl group order-1 lg:order-2">
            <img 
              src="/assets/Jenna 1.jpg" 
              alt="Jenna Crous - Hospitality Host" 
              className="w-full h-96 md:h-[500px] object-cover rounded-xl brightness-[0.85] group-hover:scale-102 transition-transform duration-750"
            />
            <div className="absolute bottom-6 left-6 bg-black/85 border border-amber-500/25 px-4 py-2 rounded backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">Hospitality Director</span>
              <span className="text-xs font-semibold text-white uppercase block mt-0.5">Stewardship Host</span>
            </div>
          </div>
        </div>

      </section>

      {/* Stewardship / Conservation Pillars */}
      <section className="w-full bg-[#120e0a] border-y border-amber-900/10 py-24 px-6 lg:px-12 z-20">
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

    </div>
  );
}
