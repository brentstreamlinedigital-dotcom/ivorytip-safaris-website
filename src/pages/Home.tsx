import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Compass, 
  ChevronDown, 
  Check, 
  Sunset, 
  Coffee, 
  Clock, 
  Sparkles,
  Star,
  Quote,
  FileText,
  CheckCircle2,
  Camera,
  Twitter,
  Instagram,
  Facebook,
  X
} from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Canvas } from '@react-three/fiber';
import ParticleSystem from '../components/ParticleSystem';

// @ts-ignore
import bgImage from "../../assets/hero_bg.jpg";
// @ts-ignore
import fairHuntImage from "../../assets/'Fair Hunt' Image.jpg";
// @ts-ignore
import ctaBgImage from "../../assets/CTA BG.jpg";
// @ts-ignore
import mainLodgeImage from "../../assets/lodge_signature_bedroom.jpg";
// @ts-ignore
import couplesRetreatImage from "../../assets/lodge_couples_bedroom.jpg";
// @ts-ignore
import woodCabinImage from "../../assets/lodge_timber_lounge.jpg";
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
import giraffePoolImage from "../../assets/gallery_giraffe.jpg";

interface OutletContextType {
  booking: any;
  setBooking: React.Dispatch<React.SetStateAction<any>>;
  activeModal: string | null;
  setActiveModal: React.Dispatch<React.SetStateAction<string | null>>;
  inquiryForm: any;
  setInquiryForm: React.Dispatch<React.SetStateAction<any>>;
  lenisRef: React.RefObject<any>;
  handleNavClick: (sectionId?: string) => void;
}

export default function Home() {
  const { 
    booking, 
    setBooking, 
    activeModal, 
    setActiveModal, 
    inquiryForm, 
    setInquiryForm, 
    lenisRef, 
    handleNavClick 
  } = useOutletContext<OutletContextType>();

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const heritageSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: heritageScrollYProgress } = useScroll({
    target: heritageSectionRef,
    offset: ["start end", "end start"]
  });

  const heroBgY = useTransform(heroScrollYProgress, [0, 1], ["0%", "20%"]);
  const heroBgScale = useTransform(heroScrollYProgress, [0, 1], [1.05, 1.15]);
  const heritageImgY = useTransform(heritageScrollYProgress, [0, 1], ["-10%", "10%"]);

  // Local Home UI states
  const [selectedDestinationIndex, setSelectedDestinationIndex] = useState(0);
  const [selectedLodgeIndex, setSelectedLodgeIndex] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState<"all" | "lodge" | "hunt" | "wild">("all");
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; desc: string; detail?: string } | null>(null);
  const [isInquirySubmitted, setIsInquirySubmitted] = useState(false);
  const [bgMood, setBgMood] = useState<"giraffe-pool" | "savanna-sunrise">("giraffe-pool");
  const [bgSrc, setBgSrc] = useState(bgImage);

  const guestOptions = [
    "1 Adult",
    "2 Adults",
    "3 Adults",
    "4 Adults",
    "Family Suite (2 Adults, 2 Kids)"
  ];

  const safariTypes = [
    "Luxury Safari",
    "Private Guided Expedition",
    "Exclusive Balloon Safari",
    "Family Lodge Adventure"
  ];

  const destinations = [
    "Serengeti National Park, Tanzania",
    "Masai Mara Reserve, Kenya",
    "Okavango Delta, Botswana",
    "Kruger National Park, South Africa",
    "Ngorongoro Crater, Tanzania"
  ];

  const lodges = [
    {
      name: "Ivorytip Signature Lodge",
      location: "Eastern Cape Sanctuary, South Africa",
      image: mainLodgeImage,
      tagline: "The majestic heartbeat of our wilderness sanctuary, combining colonial opulence with state-of-the-art luxuries.",
      features: ["Central elegant dining hall & library", "Heated panoramic infinity pool", "Luxury colonial-style stone suites", "Exclusive private game drive vehicles"]
    },
    {
      name: "Whispering Valleys Couples Retreat",
      location: "Secluded Valley Outpost",
      image: couplesRetreatImage,
      tagline: "An intimate sanctuary nestled deep in the private valley bushveld, completely secluded from all other guests with a private plunge pool.",
      features: ["Completely secluded private villa", "King-size panoramic sky-view bed", "Duo sunken plunge pool & fire pit", "Private personal host & chef service"]
    },
    {
      name: "The Secluded Timber Cabin",
      location: "Off-Grid Wilderness Outpost",
      image: woodCabinImage,
      tagline: "An off-grid raw wooden cabin offering an authentic wilderness experience under the stars with pure essential amenities.",
      features: ["Off-grid natural timber design", "Authentic basic kitchen & wood stove", "Outdoor wood-fired hot tub", "No electrical grids for pure stargazing"]
    }
  ];

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const diffTime = Math.max(0, checkOutDate.getTime() - checkInDate.getTime());
  const stayNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const bgImages = {
    "giraffe-pool": giraffePoolImage,
    "savanna-sunrise": bgImage
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenisRef?.current) {
      lenisRef.current.scrollTo(element, { duration: 1.4 });
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (new Date(booking.checkOut) <= new Date(booking.checkIn)) {
      const nextDate = new Date(booking.checkIn);
      nextDate.setDate(nextDate.getDate() + 7);
      setBooking((prev: any) => ({ ...prev, checkOut: nextDate.toISOString().split('T')[0] }));
    }
  }, [booking.checkIn]);

  return (
    <div className="flex flex-col w-full">

      {/* 1st Fold: Immersive Hero (Full Screen Viewport) */}
      <div ref={heroContainerRef} className="relative min-h-screen md:h-screen w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Dynamic Immersive Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden transition-all duration-1000 ease-in-out">
          <motion.img
            src={bgSrc}
            onError={() => {
              if (bgSrc !== bgImages["giraffe-pool"]) {
                setBgSrc(bgImages["giraffe-pool"]);
              }
            }}
            alt="Ivorytip Safari Luxury Background"
            className="w-full h-full object-cover brightness-[0.75] origin-center"
            style={{ y: heroBgY, scale: heroBgScale }}
            referrerPolicy="no-referrer"
            id="hero-bg-image"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0906] via-[#110c08]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110c08]/70 via-transparent to-[#110c08]/90 pointer-events-none z-10" />
          <div className="absolute inset-0 pointer-events-none z-[11] opacity-[0.038]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>

        <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Main Hero Body Section */}
        <main className="relative z-30 max-w-8xl mx-auto px-8 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full min-h-0 pt-32" id="hero-main-content">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto animate-fade-in" id="hero-main-title-block">
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase mb-4 md:mb-6"
            >
              UNFORGETTABLE AFRICAN JOURNEYS
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none"
            >
              IVORYTIP SAFARIS
            </motion.h2>
          </div>
        </main>

        {/* Translucent Booking Engine Widget */}
        <div className="relative z-40 w-full bg-white/[0.04] border-t border-white/10 backdrop-blur-md py-6 md:py-8 px-6 lg:px-12 flex-none animate-fade-in" id="booking-engine-widget">
          <div className="max-w-8xl mx-auto w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-end">
              
              <div className="lg:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-amber-200/90 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Check In
                </label>
                <input 
                  type="date"
                  value={booking.checkIn}
                  onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })}
                  className="w-full bg-white/[0.05] hover:bg-white/[0.09] text-white/90 border border-white/10 hover:border-white/20 rounded-md px-3.5 py-3 text-xs md:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-amber-400/50 cursor-pointer [color-scheme:dark] transition-colors"
                />
              </div>

              <div className="lg:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-amber-200/90 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  Check Out
                </label>
                <input 
                  type="date"
                  value={booking.checkOut}
                  min={booking.checkIn}
                  onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })}
                  className="w-full bg-white/[0.05] hover:bg-white/[0.09] text-white/90 border border-white/10 hover:border-white/20 rounded-md px-3.5 py-3 text-xs md:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-amber-400/50 cursor-pointer [color-scheme:dark] transition-colors"
                />
              </div>

              <div className="lg:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-amber-200/90 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  Guests
                </label>
                <div className="relative">
                  <select 
                    value={booking.guests}
                    onChange={(e) => setBooking({ ...booking, guests: e.target.value })}
                    className="w-full bg-white/[0.05] hover:bg-white/[0.09] text-white/90 border border-white/10 hover:border-white/20 rounded-md px-3.5 py-3 text-xs md:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-amber-400/50 appearance-none cursor-pointer transition-colors"
                  >
                    {guestOptions.map((opt, idx) => (
                      <option key={idx} value={opt} className="bg-[#1c130d] text-white">{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-amber-400/70 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="lg:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-amber-200/90 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  Safari Type
                </label>
                <div className="relative">
                  <select 
                    value={booking.safariType}
                    onChange={(e) => setBooking({ ...booking, safariType: e.target.value })}
                    className="w-full bg-white/[0.05] hover:bg-white/[0.09] text-white/90 border border-white/10 hover:border-white/20 rounded-md px-3.5 py-3 text-xs md:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-amber-400/50 appearance-none cursor-pointer transition-colors"
                  >
                    {safariTypes.map((type, idx) => (
                      <option key={idx} value={type} className="bg-[#1c130d] text-white">{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-amber-400/70 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="lg:col-span-4 w-full">
                <button 
                  onClick={() => {
                    setActiveModal("availability");
                  }}
                  className="btn-shimmer w-full bg-[#e8dec9]/90 hover:bg-[#d9cdb4] text-[#110c08] hover:text-[#000] font-bold py-3.5 px-4 rounded-md tracking-wider text-xs uppercase text-center cursor-pointer transition-all duration-300 shadow-xl whitespace-nowrap"
                  id="check-availability-submit"
                >
                  Check Availability
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 2nd Section: Our Heritage & Story (Sticky Scroll Narrative) */}
      <section id="about-section" ref={heritageSectionRef} className="relative z-20 py-24 md:py-40 bg-gradient-to-b from-[#0d0906] to-[#120e0a] border-b border-amber-900/10 px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 relative items-start">
          
          <div className="lg:w-5/12 space-y-6 md:space-y-8 text-left flex flex-col justify-center lg:sticky lg:top-40 h-fit pb-12 lg:pb-0">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">
              EST. 1984 &bull; EASTERN CAPE, SOUTH AFRICA
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] uppercase"
            >
              A Legend of <span className="text-amber-200">Fair Chase</span> & Unrivaled Comfort
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
              className="h-0.5 w-24 bg-amber-500/50 rounded"
              style={{ transformOrigin: 'left center' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
              className="text-stone-300 text-sm md:text-base leading-relaxed font-light"
            >
              Deep within the pristine, sun-drenched Eastern Cape bushveld, <strong className="text-white font-medium">Ivorytip Safaris</strong> stands as the ultimate sanctuary for selective sportsmen and wilderness seekers. Across over 80,000 hectares of private, unfenced conservation land, we honor the ancient code of the hunting stalk.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="text-stone-400 text-sm leading-relaxed font-light"
            >
              Our professional trackers carry decades of ancestral knowledge, guiding you through acacia thickets and rolling hills to encounter Africa's most legendary species. Yet, the adventure only begins in the field; it is perfected within our architectural, five-star accommodations.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
              {[
                { value: "80K+", label: "Acres Conservancy" },
                { value: "100%", label: "Fair Chase Stalks" },
                { value: "1:1", label: "Guide to Hunter" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.12 }}
                  className="border-l-2 border-amber-500/40 pl-4 py-2 text-left"
                >
                  <span className="block font-sans text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold block mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-7/12 space-y-12 md:space-y-24 relative">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden border border-amber-500/20 p-2 bg-white/[0.02]"
            >
              <motion.img
                src={fairHuntImage}
                alt="Ivorytip Safari Fair Chase Hunt"
                className="w-full h-full rounded-xl object-cover scale-110 origin-center"
                style={{ y: heritageImgY }}
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full h-[60vh] md:h-[80vh] rounded-2xl overflow-hidden border border-amber-500/20 p-2 bg-white/[0.02]"
            >
              <img
                src={cheetahImage}
                alt="Cheetah in the wild"
                className="w-full h-full rounded-xl object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* 3rd Section: Accommodations Room Showcase Section */}
      <section id="lodges-section" className="relative z-20 py-24 md:py-32 bg-[#120e0a] border-b border-amber-900/10 px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Curated Sanctuaries</span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">Stunning Lodges & Suites</h2>
            <p className="text-stone-400 text-xs md:text-sm leading-relaxed font-light text-center">
              Experience absolute rest under high thatch and hand-carved stone walls. Each lodge features deep vintage baths, endless plains view decks, and direct interactions with native wildlife.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                {lodges.map((lodge, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedLodgeIndex(idx)}
                    className={`lodge-tab w-full p-6 text-left border rounded-xl transition-all duration-300 cursor-pointer ${
                      selectedLodgeIndex === idx
                        ? "lodge-active bg-[#1c130e] border-amber-500/30 text-white shadow-lg"
                        : "bg-black/10 border-white/5 text-stone-400 hover:text-stone-200 hover:bg-white/[0.01]"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-1">Outpost {idx + 1}</span>
                    <h3 className="font-sans text-base font-bold uppercase">{lodge.name}</h3>
                    <p className="text-[11px] text-stone-500 mt-1 font-light">{lodge.location}</p>
                  </button>
                ))}
              </div>

              <div className="border border-white/10 rounded-xl p-6 bg-black/20 space-y-4 text-left">
                <h4 className="text-xs uppercase tracking-widest text-amber-200 font-bold">Lodge Inclusions</h4>
                <ul className="space-y-2 text-xs text-stone-400 font-light">
                  {lodges[selectedLodgeIndex].features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-amber-500/15 p-2 bg-white/[0.02] flex flex-col justify-between min-h-[400px] lg:min-h-0">
              <div className="absolute inset-0 z-0">
                <img 
                  src={lodges[selectedLodgeIndex].image} 
                  alt={lodges[selectedLodgeIndex].name}
                  className="w-full h-full object-cover rounded-xl brightness-[0.7] transition-all duration-700 scale-100 group-hover:scale-105" 
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-1" />

              <div className="relative z-10 w-full p-8 md:p-12 mt-auto text-left space-y-4 max-w-2xl">
                <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase tracking-tight leading-tight">
                  {lodges[selectedLodgeIndex].name}
                </h3>
                <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">
                  {lodges[selectedLodgeIndex].tagline}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button 
                    onClick={() => {
                      setInquiryForm({
                        ...inquiryForm,
                        lodge: lodges[selectedLodgeIndex].name,
                        message: `Inquiring about booking availability for: ${lodges[selectedLodgeIndex].name}.`
                      });
                      scrollToSection("cta-section");
                    }}
                    className="py-3 bg-amber-400 hover:bg-amber-500 text-[#110c08] uppercase text-[10px] tracking-wider font-bold rounded-lg cursor-pointer transition-colors text-center"
                  >
                    Reserve / Inquire Stay
                  </button>
                  <Link 
                    to={`/lodge/${selectedLodgeIndex + 1}`}
                    className="py-3 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white uppercase text-[10px] tracking-wider font-bold rounded-lg text-center flex items-center justify-center transition-all"
                  >
                    View Lodge Details
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4th Section: Photo Gallery (Bento Box) */}
      <section id="gallery-section" className="relative z-20 py-24 md:py-32 bg-gradient-to-b from-[#120e0a] to-[#0e0a07] border-b border-amber-900/10 px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Wilderness Visuals</span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">Captured Stalk Moments</h2>
            <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed text-center">
              A visual testament to legendary stalks, trophy-room celebrations, and the raw beauty of South Africa. Filter through our lodge, client successes, and native wildlife.
            </p>

            <div className="flex flex-wrap justify-center gap-2 pt-4 text-xs font-bold uppercase tracking-wider">
              {[
                { label: "All Records", filter: "all" },
                { label: "Trophy Hunts", filter: "hunt" },
                { label: "Lodge Life", filter: "lodge" },
                { label: "Wildlife", filter: "wild" }
              ].map((btn) => (
                <button
                  key={btn.filter}
                  onClick={() => setGalleryFilter(btn.filter as any)}
                  className={`px-4 py-2 rounded-full border transition-all duration-300 cursor-pointer ${
                    galleryFilter === btn.filter
                      ? "bg-amber-400 border-amber-400 text-[#110c08]"
                      : "bg-transparent border-white/10 text-stone-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" id="gallery-bento-grid">
            {[
              {
                id: 1,
                title: "Gold-Medal Kudu",
                desc: "Harvested under camelthorn brush after a 4-hour stalking sequence.",
                category: "hunt",
                src: kuduImage,
                detail: "Client: Francois Du Preez | Caliber: .375 H&H | Trophy score: Gold Merit",
                span: "sm:col-span-2 md:col-span-4"
              },
              {
                id: 2,
                title: "Signature Lounge Dining",
                desc: "Gourmet wild game reserve wine pairing dinner under high colonial thatch.",
                category: "lodge",
                src: dinnerImage,
                detail: "Chef: Francois Botha | Wine: Pinotage Reserve | Seating: 16 maximum",
                span: "sm:col-span-1 md:col-span-1"
              },
              {
                id: 3,
                title: "High Savanna Cheetah",
                desc: "Spotting a hunting cheetah tracking springbuck across open grass plains.",
                category: "wild",
                src: cheetahImage,
                detail: "Location: North Dunes | Camera: 400mm f/2.8 | Time: Sunrise",
                span: "sm:col-span-1 md:col-span-1"
              },
              {
                id: 5,
                title: "Desert Campfire Circle",
                desc: "Evening fireside stories with trackers, sipping small-batch brandies.",
                category: "lodge",
                src: campfireImage,
                detail: "Activity: Stargazing Guide | Spirit: 12-Year reserve | Guests: 8 max",
                span: "sm:col-span-1 md:col-span-1"
              },
              {
                id: 4,
                title: "Cape Buffalo Harvest",
                desc: "Elite big game expedition successfully tracking buffalo under dense cover.",
                category: "hunt",
                src: bufalloImage,
                detail: "Guide: PH Jaco van der Merwe | Range: 45 Yards | Score: 44 Inches",
                span: "sm:col-span-1 md:col-span-1"
              }
            ].filter(item => galleryFilter === "all" || item.category === galleryFilter).map((item, idx) => {
              const isFirst = idx === 0;
              const isEven = idx % 2 === 0;

              if (isFirst) {
                return (
                  <div
                    key={item.id}
                    onClick={() => setLightboxImage(item)}
                    className={`bg-[#1c130e] border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[360px] md:h-[360px] group cursor-pointer shadow-xl relative border-solid ${item.span}`}
                  >
                    {/* Left side: Content */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-center text-left space-y-4 z-10 relative">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 inline-block self-start border-solid">
                        Featured {item.category === "hunt" ? "Trophy Hunt" : item.category === "lodge" ? "Lodge Life" : "Wildlife"}
                      </span>
                      <h3 className="font-sans text-2xl md:text-4xl font-bold text-white uppercase tracking-tight leading-none">
                        {item.title}
                      </h3>
                      <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed max-w-xl">
                        {item.desc}
                      </p>
                      <div className="pt-4 border-t border-white/5 border-solid">
                        <span className="text-[10px] text-amber-200/70 font-mono tracking-wider block uppercase mb-1">Field Records & Metrics</span>
                        <p className="text-stone-400 font-mono text-[11px] leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                    {/* Right side: Image with gradient fade */}
                    <div className="w-full md:w-[50%] h-[240px] md:h-full relative overflow-hidden shrink-0">
                      <img 
                        src={item.src} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000 brightness-[0.8]"
                      />
                      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1c130e] to-transparent hidden md:block pointer-events-none" />
                      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1c130e] to-transparent md:hidden pointer-events-none" />
                    </div>
                  </div>
                );
              }

              // Alternating layout for other cards
              if (isEven) {
                // Image on top, text at bottom
                return (
                  <div
                    key={item.id}
                    onClick={() => setLightboxImage(item)}
                    className={`bg-[#1c130e] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[380px] group cursor-pointer shadow-xl relative border-solid ${item.span}`}
                  >
                    <div className="w-full h-[180px] rounded-xl overflow-hidden border border-white/5 border-solid relative mb-4">
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-750 brightness-[0.8]" />
                    </div>
                    <div className="space-y-2 text-left mt-auto flex-1 flex flex-col justify-end">
                      <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block self-start border-solid">
                        {item.category === "hunt" ? "Trophy Hunt" : item.category === "lodge" ? "Lodge Life" : "Wildlife"}
                      </span>
                      <h3 className="font-sans text-sm md:text-base font-bold text-white uppercase tracking-tight line-clamp-1">{item.title}</h3>
                      <p className="text-[11px] text-stone-400 leading-relaxed font-light line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              } else {
                // Text on top, image at bottom
                return (
                  <div
                    key={item.id}
                    onClick={() => setLightboxImage(item)}
                    className={`bg-[#1c130e] border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-[380px] group cursor-pointer shadow-xl relative border-solid ${item.span}`}
                  >
                    <div className="space-y-2 text-left mb-4 flex-1">
                      <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block border-solid">
                        {item.category === "hunt" ? "Trophy Hunt" : item.category === "lodge" ? "Lodge Life" : "Wildlife"}
                      </span>
                      <h3 className="font-sans text-sm md:text-base font-bold text-white uppercase tracking-tight line-clamp-1">{item.title}</h3>
                      <p className="text-[11px] text-stone-400 leading-relaxed font-light line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    <div className="w-full h-[180px] rounded-xl overflow-hidden border border-white/5 border-solid relative mt-auto">
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-750 brightness-[0.8]" />
                    </div>
                  </div>
                );
              }
            })}
          </div>

        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImage && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl w-full bg-[#1c130e] border border-amber-900/30 rounded-2xl overflow-hidden shadow-2xl p-4 md:p-6 text-left"
              >
                <button 
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer z-50 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 h-64 md:h-[450px] rounded-lg overflow-hidden border border-white/5">
                    <img 
                      src={lightboxImage.src} 
                      alt={lightboxImage.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-5 space-y-4 text-left">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 inline-block">
                      Field Record
                    </span>
                    <h3 className="font-sans text-xl md:text-2xl font-bold text-white uppercase tracking-tight">{lightboxImage.title}</h3>
                    <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">{lightboxImage.desc}</p>
                    
                    <div className="bg-black/30 p-4 rounded-lg border border-white/5 space-y-2">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block">Harvest Metrics & Logistics</span>
                      <p className="text-amber-100 font-mono text-xs">{lightboxImage.detail}</p>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setInquiryForm({
                            ...inquiryForm,
                            message: `Inquiring about trophy style and stalk setup: ${lightboxImage.title}.`
                          });
                          setLightboxImage(null);
                          scrollToSection("cta-section");
                        }}
                        className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-[#110c08] uppercase text-xs tracking-wider font-bold rounded-lg transition-all cursor-pointer text-center block"
                      >
                        Inquire This Stalk Type
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 5th Section: Hunting Trophies & Packages Section */}
      <section id="packages-section" className="relative z-20 py-24 md:py-32 bg-[#0e0a07] border-b border-amber-900/10 px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Elite Expeditions</span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">Hunting Trophies & Packages</h2>
            <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed text-center">
              Our bespoke hunting expeditions combine elite 1:1 professional tracking teams, field preparation, taxidermy oversight, and five-star luxury lodge stays.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => setActiveModal("pricing")}
                className="btn-shimmer flex items-center gap-2 border border-amber-400/85 hover:border-amber-400 text-amber-200 hover:text-amber-100 px-6 py-2.5 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-amber-400/10 cursor-pointer bg-black/40 backdrop-blur-sm rounded-lg"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                View 2026 Price List
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center relative z-10 w-full max-w-4xl mx-auto pb-32">
            {[
              {
                title: "The Plains Game Classic",
                price: "$6,500",
                duration: "5 Days / 4 Nights",
                lodge: "Whispering Valleys Couples Retreat",
                species: "1x Kudu, 1x Wildebeest, 1x Impala",
                features: [
                  "1:1 professional hunter guide ratio",
                  "Elite off-road tracking vehicle",
                  "Gourmet wild game bush feasts",
                  "Field dressing & caping preparation",
                  "Airport return shuttle (Port Elizabeth)"
                ],
                tag: "Classic Adventure"
              },
              {
                title: "The Ivorytip Signature",
                price: "$12,500",
                duration: "7 Days / 6 Nights",
                lodge: "Ivorytip Signature Lodge",
                species: "1x Eland, 1x Oryx, 1x Zebra, 1x Bushbuck",
                features: [
                  "Senior professional tracker & master skinners",
                  "Custom rifle caliber hire (.300 Win Mag)",
                  "5-star private butler & gourmet chef",
                  "Full taxidermy export handling & admin",
                  "Hot-air balloon sunrise champagne tour"
                ],
                tag: "Most Popular",
                featured: true
              },
              {
                title: "The Monarch Big Game",
                price: "$19,500",
                duration: "10 Days / 9 Nights",
                lodge: "The Secluded Timber Cabin",
                species: "1x Cape Buffalo, 1x Waterbuck, 1x Blue Wildebeest, 1x Warthog",
                features: [
                  "Legendary native tracking team & canine units",
                  "Helicopter fly-in conservancy transfers",
                  "Private Sommelier reserve wine pairings",
                  "Professional field photographer overlay",
                  "Global custom trophy export logistics"
                ],
                tag: "Ultimate Signature"
              }
            ].map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: idx * 0.15 }}
                style={{ top: `calc(15vh + ${idx * 40}px)`, zIndex: idx + 10 }}
                className={`pkg-card sticky w-full flex flex-col justify-between rounded-2xl p-8 border transition-all duration-500 overflow-hidden text-left mb-24 last:mb-0 shadow-2xl ${
                  pkg.featured
                    ? "pkg-featured bg-gradient-to-br from-[#1c130e] to-[#150d0a] border-amber-500/50 shadow-black/80"
                    : "bg-gradient-to-br from-[#110c08] to-[#0a0705] border-white/10 shadow-black/90 hover:border-white/20"
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
                    <h3 className="font-sans text-xl md:text-3xl font-bold text-white leading-tight">
                      {pkg.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="text-3xl md:text-5xl font-bold text-amber-400">{pkg.price}</span>
                      <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Base Rate</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-amber-500/20 via-white/5 to-transparent" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
                        <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Lodge: {pkg.lodge}</span>
                      </div>
                      <div className="bg-black/40 p-4 rounded-xl border border-white/5 mt-4">
                        <span className="text-[9px] uppercase text-amber-400 font-bold tracking-wider block mb-2">Included Trophies:</span>
                        <p className="text-xs text-amber-100/90 font-medium font-mono leading-relaxed">{pkg.species}</p>
                      </div>
                    </div>

                    <div className="space-y-3 border-l border-white/5 pl-0 md:pl-8">
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block mb-4">Expedition Details:</span>
                      {pkg.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-stone-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-6 border-t border-white/5">
                  <button
                    onClick={() => {
                      setInquiryForm({
                        ...inquiryForm,
                        package: pkg.title,
                        lodge: pkg.lodge
                      });
                      scrollToSection("cta-section");
                    }}
                    className={`py-3 px-8 rounded-lg uppercase text-[10px] tracking-wider font-bold cursor-pointer transition-colors text-center flex-1 ${
                      pkg.featured
                        ? "bg-amber-400 hover:bg-amber-500 text-[#110c08]"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    }`}
                  >
                    Inquire
                  </button>
                  <Link
                    to={`/itinerary/${idx + 1}`}
                    className="py-3 px-8 rounded-lg uppercase text-[10px] tracking-wider font-bold transition-all border border-amber-500/20 hover:border-amber-400 text-amber-200 hover:text-amber-100 bg-black/35 hover:bg-amber-400/5 text-center flex items-center justify-center flex-1"
                  >
                    Full Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Custom Species Pricing Callout Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-16 md:mt-20 border border-amber-500/10 rounded-2xl p-6 md:p-10 bg-gradient-to-r from-black/40 to-[#1c130e]/40 backdrop-blur-sm flex flex-col lg:flex-row items-center justify-between gap-8 text-left"
          >
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 inline-block">
                Bespoke Species Catalog
              </span>
              <h4 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight">Looking to customize your expedition?</h4>
              <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed">
                View our complete 2026 species trophy price list and daily guide rates to customize a tailor-made safari matching your exact goals.
              </p>
            </div>
            
            <button
              onClick={() => setActiveModal("pricing")}
              className="btn-shimmer shrink-0 bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-4 px-8 rounded-lg tracking-wider text-xs uppercase text-center cursor-pointer transition-all duration-300 shadow-xl flex items-center gap-2"
            >
              <FileText className="w-4.5 h-4.5 shrink-0" />
              View Individual Pricing
            </button>
          </motion.div>

        </div>
      </section>

      {/* 6th Section: Client Testimonials Section */}
      <section id="reviews-section" className="relative z-20 py-24 md:py-32 bg-gradient-to-b from-[#0e0a07] to-[#110c08] border-b border-amber-900/10 px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Signature Accolades</span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">Client Testimonials</h2>
            <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed text-center">
              Hear from our global hunting partners and adventurers who have walked the South African tracks with our world-class field guiding team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                name: "Arthur Pendelton",
                location: "Dallas, Texas",
                quote: "The tracking team at Ivorytip is genuinely unmatched. We stalked a gold-medal kudu over valley brushveld on day three. The attention to skinning detail is world-class, and the evening service at the Manor is absolute perfection.",
                rating: 5,
                trophy: "Gold-Medal Kudu Hunt"
              },
              {
                name: "Dr. Elizabeth Vance",
                location: "Munich, Germany",
                quote: "Breathtaking glass domes, beautiful stargazing campfires, and highly respectful wildlife ethics. Having giraffes walk right up to your breakfast patio is a memory my family will cherish forever. An eco-luxury triumph.",
                rating: 5,
                trophy: "Plains Game Photo Safari"
              },
              {
                name: "Francois Du Preez",
                location: "Pretoria, South Africa",
                quote: "I've visited dozens of farms across southern Africa, but Ivorytip's terrain density and tracking hospitality is superior. We harvested a master-grade Cape Buffalo under extreme brush cover. Professional hunters here are elite.",
                rating: 5,
                trophy: "Big Game Signature Hunt"
              }
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: idx * 0.15 }}
                className="review-card bg-[#1c130e]/40 border border-amber-900/15 p-8 rounded-2xl relative flex flex-col justify-between gap-6 text-left"
              >
                <Quote className="w-10 h-10 text-amber-500/10 absolute top-6 right-6 pointer-events-none" />
                <div className="space-y-4">
                  <div className="flex gap-1 justify-start">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-300 text-xs md:text-sm leading-relaxed italic font-light">
                    "{review.quote}"
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-white text-sm font-semibold">{review.name}</h4>
                    <span className="text-[10px] text-stone-400 block uppercase tracking-wider">{review.location}</span>
                  </div>
                  <div className="bg-black/35 px-2.5 py-1 rounded border border-white/5 text-[9px] text-amber-300 font-mono">
                    {review.trophy}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
