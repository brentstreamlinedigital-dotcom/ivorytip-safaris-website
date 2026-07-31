import React, { useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { 
  Waves, 
  Moon, 
  Coffee, 
  UtensilsCrossed, 
  Check, 
  ArrowRight,
  Sparkles,
  Zap,
  Users
} from "lucide-react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// @ts-ignore
import mainLodgeImage from "../../assets/lodge_signature_bedroom.jpg";
// @ts-ignore
import couplesRetreatImage from "../../assets/lodge_couples_bedroom.jpg";
// @ts-ignore
import woodCabinImage from "../../assets/lodge_timber_lounge.jpg";
// @ts-ignore
import heroBgImage from "../../assets/hero_bg.jpg";
// @ts-ignore
import signatureDiningImage from "../../assets/lodge_signature_dining.jpg";

export default function Lodges() {
  const { setActiveModal } = useOutletContext<any>();
  const horizontalSectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (!horizontalSectionRef.current || !trackRef.current) return;
      const track = trackRef.current;
      const totalWidth = track.scrollWidth;
      const amountToScroll = totalWidth - window.innerWidth;
      
      gsap.to(track, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          start: "top top",
          end: () => `+=${amountToScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });
    });
    return () => mm.revert();
  }, { scope: horizontalSectionRef });

  const lodgList = [
    {
      id: "1",
      name: "Ivorytip Signature Lodge",
      location: "Eastern Cape Sanctuary, South Africa",
      image: mainLodgeImage,
      tagline: "The majestic heartbeat of our wilderness sanctuary, combining colonial opulence with state-of-the-art luxuries.",
      desc: "Perched high on granite ridges overlooking the winding riverbeds below, the Signature Lodge is our flagship outpost. Featuring massive high-thatch vaulted ceilings, stone fireplaces, and an open boma dining setup, it serves as the base for our core hunting groups. Each suite offers visual isolation and private panorama decks.",
      features: ["Central elegant dining hall & library", "Heated panoramic infinity pool", "Luxury colonial-style stone suites", "Exclusive private game drive vehicles", "Full solar grid backup", "24/7 private butler on call"]
    },
    {
      id: "2",
      name: "Whispering Valleys Couples Retreat",
      location: "Secluded Valley Outpost",
      image: couplesRetreatImage,
      tagline: "An intimate sanctuary nestled deep in the private valley bushveld, completely secluded from all other guests with a private plunge pool.",
      desc: "Designed specifically for companion and couples travel, this retreat sits visual miles away from the main camp, embedded inside the private valley bushveld. Fully off-grid yet packing high-design luxury, it offers complete solitude. Slide back double-height glass doors to sleep directly adjacent to pristine valley ridges under the Milky Way.",
      features: ["Completely secluded private villa", "King-size panoramic sky-view bed", "Duo sunken plunge pool & fire pit", "Private personal host & chef service", "Open-air valley rain showers", "Vintage optical stargazing telescopes"]
    },
    {
      id: "3",
      name: "The Secluded Timber Cabin",
      location: "Off-Grid Wilderness Outpost",
      image: woodCabinImage,
      tagline: "An off-grid raw wooden cabin offering an authentic wilderness experience under the stars with pure essential amenities.",
      desc: "A raw, rustic wooden cabin built alongside major wildlife corridors. Intended for hunters and adventurers looking to completely disconnect from modern schedules, the cabin operates without active electrical grids or WiFi, using solar lanterns and wood-burning stoves for an authentic wilderness experience.",
      features: ["Off-grid natural timber design", "Authentic basic kitchen & wood stove", "Outdoor wood-fired hot tub", "No electrical grids for pure stargazing", "Direct waterhole mineral observation deck", "Guided walking bush tours included"]
    }
  ];

  const specs = [
    { label: "Guest Capacity", signature: "12 Guests max", couples: "2 Guests (Private buyout)", timber: "6 Guests max" },
    { label: "Staff-to-Guest Ratio", signature: "2:1 staff ratio", couples: "3:1 private team", timber: "1:1 tracker guide" },
    { label: "Pool / Spa Setup", signature: "Heated infinity pool", couples: "Private plunge pool", timber: "Wood-fired cedar hot tub" },
    { label: "Power & Utility Grid", signature: "Full solar & filtration", couples: "Silent battery backup", timber: "Pure off-grid (Solar lantern)" },
    { label: "Visual Stargazing", signature: "Panoramic suites", couples: "Retractable sky-roof bed", timber: "Open high wood deck" }
  ];

  return (
    <div className="min-h-screen bg-[#0d0906] flex flex-col items-center">
      
      {/* Immersive Hero (Full Screen Viewport) */}
      <div className="relative min-h-screen md:h-screen w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={heroBgImage} 
            alt="Ivorytip Luxury Lodges" 
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
              Exclusive Accommodations
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              Signature Lodges
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Three distinct architectural outposts providing absolute solitude, native wildlife integration, and top-tier hospitality.
            </p>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="relative z-30 pb-12 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-semibold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent" />
        </div>
      </div>

      {/* Lodges Collection List (Horizontal Scroll on Desktop) */}
      <section 
        ref={horizontalSectionRef} 
        className="w-full bg-[#120e0a] overflow-hidden hidden lg:block border-y border-amber-900/10"
      >
        <div 
          ref={trackRef} 
          className="flex h-screen items-center px-[5vw]"
          style={{ width: "max-content" }}
        >
          {lodgList.map((lodge, idx) => (
            <div 
              key={lodge.id}
              className="w-[85vw] max-w-[1200px] shrink-0 mx-8 flex gap-16 items-center"
            >
              {/* Image Block */}
              <div className="w-1/2 relative rounded-2xl overflow-hidden border border-amber-500/20 p-2 bg-white/[0.02]">
                <img 
                  src={lodge.image} 
                  alt={lodge.name} 
                  className="w-full h-[60vh] object-cover rounded-xl brightness-[0.8] hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-black/80 border border-amber-500/30 px-3 py-1.5 rounded text-[10px] text-amber-300 font-bold uppercase tracking-wider backdrop-blur-md">
                  Outpost 0{lodge.id}
                </div>
              </div>

              {/* Text details */}
              <div className="w-1/2 space-y-8 text-left pr-12">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded border border-amber-500/20">{lodge.location}</span>
                  <h3 className="font-display text-4xl xl:text-5xl font-bold text-white uppercase tracking-tight mt-6">{lodge.name}</h3>
                </div>
                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  {lodge.desc}
                </p>
                
                <div className="h-px w-full bg-gradient-to-r from-amber-500/20 to-transparent" />

                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block">Outpost Features</span>
                  <div className="grid grid-cols-2 gap-4 text-xs text-stone-300">
                    {lodge.features.slice(0, 4).map((feat, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Link
                    to={`/lodge/${lodge.id}`}
                    className="btn-shimmer inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-4 px-8 rounded-lg tracking-wider text-[10px] uppercase cursor-pointer"
                  >
                    View Outpost Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setActiveModal("availability")}
                    className="px-8 py-4 border border-amber-500/20 hover:border-amber-400 hover:bg-amber-400/5 text-amber-200 hover:text-amber-100 bg-black/40 rounded-lg text-[10px] uppercase font-bold tracking-wider cursor-pointer text-center transition-all"
                  >
                    Inquire Stay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lodges Collection List (Mobile/Tablet Fallback) */}
      <section className="lg:hidden max-w-7xl mx-auto px-6 py-20 w-full space-y-24 text-left">
        {lodgList.map((lodge, idx) => (
          <div 
            key={lodge.id}
            className="flex flex-col gap-8 items-center"
          >
            <div className="w-full relative rounded-2xl overflow-hidden border border-amber-500/20 p-2 bg-white/[0.02]">
              <img 
                src={lodge.image} 
                alt={lodge.name} 
                className="w-full h-80 object-cover rounded-xl brightness-[0.75]"
              />
              <div className="absolute top-6 left-6 bg-black/80 border border-amber-500/30 px-3 py-1.5 rounded text-[10px] text-amber-300 font-bold uppercase tracking-wider backdrop-blur-md">
                Outpost 0{lodge.id}
              </div>
            </div>

            <div className="w-full space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">{lodge.location}</span>
                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mt-1">{lodge.name}</h3>
              </div>
              <p className="text-stone-300 text-xs leading-relaxed font-light">
                {lodge.desc}
              </p>
              
              <div className="h-px bg-white/10" />

              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block">Outpost Features</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                  {lodge.features.slice(0, 4).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to={`/lodge/${lodge.id}`}
                  className="btn-shimmer inline-flex justify-center items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-6 rounded-lg tracking-wider text-xs uppercase cursor-pointer"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setActiveModal("availability")}
                  className="px-6 py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white rounded-lg text-xs uppercase font-bold tracking-wider cursor-pointer text-center"
                >
                  Inquire
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Comparison Matrix Table */}
      <section className="w-full bg-[#120e0a] border-t border-amber-900/10 py-20 px-6 lg:px-12 text-left">
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
                  <th className="p-4 md:p-6 text-amber-200">Signature Lodge</th>
                  <th className="p-4 md:p-6 text-amber-200">Whispering Valleys</th>
                  <th className="p-4 md:p-6 text-amber-200">Timber Cabin</th>
                </tr>
              </thead>
              <tbody className="group/table">
                {specs.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="border-b border-white/5 transition-colors duration-300 group-hover/table:opacity-40 hover:!opacity-100 hover:bg-white/[0.04]"
                  >
                    <td className="p-4 md:p-6 font-semibold text-stone-300 font-sans">
                      {row.label}
                    </td>
                    <td className="p-4 md:p-6 text-stone-400 font-light">
                      {row.signature}
                    </td>
                    <td className="p-4 md:p-6 text-stone-400 font-light">
                      {row.couples}
                    </td>
                    <td className="p-4 md:p-6 text-stone-400 font-light">
                      {row.timber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Culinary highlight */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 p-2 bg-white/[0.02] order-2 lg:order-1">
          <img 
            src={signatureDiningImage} 
            alt="Savanna Fine Dining Boma" 
            className="w-full h-80 object-cover rounded-xl brightness-[0.7]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-6 order-1 lg:order-2">
          <span className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold block">Wilderness Gastronomy</span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">The Fire boma Feast</h3>
          <div className="h-0.5 w-16 bg-amber-500/50 rounded" />
          <p className="text-stone-300 text-sm font-light leading-relaxed">
            Stalking game across Eastern Cape hills builds an ancient hunger. We satisfy this in our circular boma rings under towering acacia leaves. Each evening, our resident chefs prepare aged, wood-fired cuts of wild gemsbuck, kudu, or eland, paired with private collection Pinotage and Cabernet reserves from South Africa.
          </p>
          <div className="flex items-center gap-3 text-xs text-amber-200">
            <UtensilsCrossed className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Traditional cooking, Sommelier reserve pairings, 100% locally sourced.</span>
          </div>
        </div>
      </section>

    </div>
  );
}
