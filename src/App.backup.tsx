import React, { useState, useEffect, useRef } from "react";
import { 
  Menu, 
  X, 
  Calendar, 
  Users, 
  MapPin, 
  Compass, 
  ChevronDown, 
  Facebook, 
  Instagram, 
  Youtube, 
  Check, 
  CheckCircle2, 
  Shield, 
  Sunset, 
  Coffee, 
  Waves, 
  Moon, 
  Clock, 
  UtensilsCrossed, 
  Sparkles,
  Star,
  Award,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Quote,
  Camera,
  Heart,
  Twitter
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Canvas } from '@react-three/fiber';
import ParticleSystem from './components/ParticleSystem';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// @ts-ignore
import bgImage from "../assets/robin-stuart-B_Asz7tHO6g-unsplash.jpg";
// @ts-ignore
import fairHuntImage from "../assets/'Fair Hunt' Image.jpg";
// @ts-ignore
import ctaBgImage from "../assets/CTA BG.jpg";
// @ts-ignore
import mainLodgeImage from "../assets/Main Lodge Internal.jpg";
// @ts-ignore
import couplesRetreatImage from "../assets/Couples Retreat.jpg";
// @ts-ignore
import woodCabinImage from "../assets/Wood Cabin.jpg";
// @ts-ignore
import kuduImage from "../assets/Kudu.jpg";
// @ts-ignore
import dinnerImage from "../assets/Dinner.jpg";
// @ts-ignore
import cheetahImage from "../assets/cheetah.jpg";
// @ts-ignore
import bufalloImage from "../assets/Bufallo.jpg";
// @ts-ignore
import campfireImage from "../assets/campfire.jpg";

// Types for our interactive safari booking
interface BookingDetails {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  safariType: string;
}

interface SafariPackage {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  duration: string;
  image: string;
  description: string;
  highlights: string[];
  amenities: string[];
}

export default function App() {
  // Refs and parallax values for subtle scroll effects
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const heritageSectionRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<InstanceType<typeof Lenis> | null>(null);

  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: heritageScrollYProgress } = useScroll({
    target: heritageSectionRef,
    offset: ["start end", "end start"]
  });

  // Subtle background shifting down as we scroll down
  const heroBgY = useTransform(heroScrollYProgress, [0, 1], ["0%", "20%"]);
  // Subtle scaling effect for immersive feel
  const heroBgScale = useTransform(heroScrollYProgress, [0, 1], [1.05, 1.15]);

  // Subtle heritage image shifting as it enters/leaves viewport
  const heritageImgY = useTransform(heritageScrollYProgress, [0, 1], ["-10%", "10%"]);

  // Booking state
  const [booking, setBooking] = useState<BookingDetails>({
    destination: "Serengeti National Park, Tanzania",
    checkIn: "2026-07-15",
    checkOut: "2026-07-22",
    guests: "2 Adults",
    safariType: "Luxury Safari",
  });

  // UI state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<"availability" | "safaris" | "lodges" | "experiences" | "about" | null>(null);
  const [selectedDestinationIndex, setSelectedDestinationIndex] = useState(0);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [selectedLodge, setSelectedLodge] = useState("Ivorytip Sovereign Lodge");
  const [selectedDayTab, setSelectedDayTab] = useState(1);

  // New interactive states for the newly built out section features
  const [selectedLodgeIndex, setSelectedLodgeIndex] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState<"all" | "lodge" | "hunt" | "wild">("all");
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; desc: string; detail?: string } | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    package: "The Ivorytip Sovereign",
    lodge: "Ivorytip Sovereign Lodge",
    message: ""
  });
  const [isInquirySubmitted, setIsInquirySubmitted] = useState(false);

  // Background toggle mood
  // Users can toggle backgrounds to view "Giraffe Sunset Pool" (2nd image concept) or "Savanna Wilderness Sunrise"
  const [bgMood, setBgMood] = useState<"giraffe-pool" | "savanna-sunrise">("giraffe-pool");
  const [bgSrc, setBgSrc] = useState(bgImage);

  // Premium mock packages for our search modal
  const packages: SafariPackage[] = [
    {
      id: "pkg-1",
      name: "The Serengeti Great Migration Expedition",
      location: "Serengeti National Park, Tanzania",
      pricePerNight: 1450,
      rating: 4.9,
      duration: "7 Days / 6 Nights",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=1200",
      description: "Witness millions of wildebeest, zebras, and gazelles traverse the endless plains in search of fresh grazing land, guided by our world-class trackers.",
      highlights: [
        "Exclusive private safari vehicle with field guides",
        "Two daily game drives in high-density wildlife zones",
        "Private bush dinners under the African sky",
        "Luxury tented suite overlooking the Mara River"
      ],
      amenities: ["Private Deck", "En-suite Bathroom", "Infinity Pool Access", "Personal Butler", "Stargazing Telescope"]
    },
    {
      id: "pkg-2",
      name: "The Masai Mara Private Sanctuary Sojourn",
      location: "Masai Mara Reserve, Kenya",
      pricePerNight: 1250,
      rating: 4.95,
      duration: "5 Days / 4 Nights",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200",
      description: "Immerse yourself in Maasai culture and unmatched big-cat tracking in an exclusive conservancy away from standard tourist tracks.",
      highlights: [
        "Premium walking safaris led by local Maasai warriors",
        "Hot air balloon flight over the Mara plains at sunrise",
        "Spectacular photography setups with specialized vehicle mounts",
        "Evening cultural storytelling fireside chats"
      ],
      amenities: ["Plunge Pool", "Outdoor Rainfall Shower", "Fine Dining", "Wellness Spa", "Premium Beverages Included"]
    },
    {
      id: "pkg-3",
      name: "The Okavango Delta Aquatic Safari",
      location: "Okavango Delta, Botswana",
      pricePerNight: 1850,
      rating: 5.0,
      duration: "6 Days / 5 Nights",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200",
      description: "Navigate the winding water channels and flooded lagoons in traditional wooden mokoro canoes to view swimming elephants and rare river life.",
      highlights: [
        "Silent dugout mokoro canoe excursions",
        "Helicopter transfer with panoramic aerial views",
        "Exclusive night safaris spotting nocturnal predators",
        "Eco-luxe elevated wooden villas"
      ],
      amenities: ["Private Plunge Pool", "A/C & Solar Power", "Butler Service", "Elevated Viewing Deck", "All-inclusive Premium Bar"]
    }
  ];

  // Lodges details
  const lodges = [
    {
      name: "Ivorytip Sovereign Lodge",
      location: "Namibian Highland Sanctuary",
      image: mainLodgeImage,
      tagline: "The majestic heartbeat of our wilderness sanctuary, combining colonial opulence with state-of-the-art luxuries.",
      features: ["Central elegant dining hall & library", "Heated panoramic infinity pool", "Luxury colonial-style stone suites", "Exclusive private game drive vehicles"]
    },
    {
      name: "Whispering Dunes Couples Retreat",
      location: "Secluded Desert Outpost",
      image: couplesRetreatImage,
      tagline: "An intimate sanctuary nestled deep in the private dunes, completely secluded from all other guests with a private plunge pool.",
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

  const destinations = [
    "Serengeti National Park, Tanzania",
    "Masai Mara Reserve, Kenya",
    "Okavango Delta, Botswana",
    "Kruger National Park, South Africa",
    "Ngorongoro Crater, Tanzania"
  ];

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

  // Calculate length of stay
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const diffTime = Math.max(0, checkOutDate.getTime() - checkInDate.getTime());
  const stayNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Background Images
  // We use Unsplash images configured to fit the specific requested visuals beautifully.
  // "giraffe-pool" uses a beautiful representation of a luxury infinity pool and sunset with giraffe tones
  const bgImages = {
    "giraffe-pool": "https://images.unsplash.com/photo-1574068468668-a05a11f871da?auto=format&fit=crop&w=2000&q=90",
    "savanna-sunrise": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=90"
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingConfirmed(true);
    setTimeout(() => {
      // Auto close/reset state after displaying success nicely
    }, 5000);
  };

  // Preset the date selection values if they are invalid
  useEffect(() => {
    if (new Date(booking.checkOut) <= new Date(booking.checkIn)) {
      const nextDate = new Date(booking.checkIn);
      nextDate.setDate(nextDate.getDate() + 7);
      setBooking(prev => ({ ...prev, checkOut: nextDate.toISOString().split('T')[0] }));
    }
  }, [booking.checkIn]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, { duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // === Lenis smooth scroll ===
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenisRef.current = lenis;
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); gsap.ticker.remove(onTick); };
  }, []);

  // Pause Lenis when a modal / lightbox is open
  useEffect(() => {
    if (activeModal || lightboxImage) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [activeModal, lightboxImage]);

  // Custom cursor removed

  return (
    <div className="relative min-h-screen font-sans text-stone-100 bg-[#0d0906] overflow-x-hidden selection:bg-[#e8dec9] selection:text-[#110c08] flex flex-col scroll-smooth">



      {/* 1st Fold: Immersive Hero & Header (Full Screen Viewport) */}
      <div ref={heroContainerRef} className="relative min-h-screen md:h-screen w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Dynamic Immersive Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden transition-all duration-1000 ease-in-out">
          <motion.img
            src={bgSrc}
            onError={() => {
              if (bgSrc !== "https://images.unsplash.com/photo-1574068468668-a05a11f871da?auto=format&fit=crop&w=2000&q=90") {
                setBgSrc("https://images.unsplash.com/photo-1574068468668-a05a11f871da?auto=format&fit=crop&w=2000&q=90");
              }
            }}
            alt="Ivorytip Safari Luxury Background - Lady and the Giraffe at Sunset Pool"
            className="w-full h-full object-cover animate-pulse-slow brightness-[0.75] origin-center"
            style={{ y: heroBgY, scale: heroBgScale }}
            referrerPolicy="no-referrer"
            id="hero-bg-image"
          />
          
          {/* 3D Particle System Overlay */}
          <div className="absolute inset-0 z-[1] opacity-70 pointer-events-none mix-blend-screen">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
              <ParticleSystem count={1500} />
            </Canvas>
          </div>
          
          {/* Dynamic Water Reflection / Infinity Pool Overlay (For giraffe-pool theme) */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0906] via-[#110c08]/80 to-transparent pointer-events-none z-10" />
          
          {/* Cinematic gradient vignette overlays for perfect typography readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#110c08]/70 via-transparent to-[#110c08]/90 pointer-events-none z-10" />
          {/* Film grain texture overlay */}
          <div className="absolute inset-0 pointer-events-none z-[11] opacity-[0.038]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        </div>

        {/* Floating Sparkles Ambient Glow */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Main Luxury Header */}
        <header className="relative z-40 max-w-8xl mx-auto px-8 md:px-12 pt-8 md:pt-12 w-full flex-none" id="header-nav">
          <div className="grid grid-cols-3 items-center pb-8 md:pb-12">
            
            {/* Left: Hamburger menu & primary links for desktop */}
            <div className="flex items-center gap-6 lg:gap-10 justify-start">
              <button 
                onClick={() => {
                  setIsMenuOpen(true);
                  setActiveModal("safaris");
                }}
                className="lg:hidden group p-2 -ml-2 text-white hover:text-amber-200 focus:outline-none transition-colors"
                aria-label="Toggle Menu"
                id="hamburger-menu-btn"
              >
                <Menu className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
              </button>
              
              <nav className="hidden lg:flex items-center gap-6 lg:gap-8 text-xs font-semibold tracking-[0.2em] text-white/90 uppercase">
                <button onClick={() => scrollToSection("about-section")} className="nav-link hover:text-amber-200 transition-colors cursor-pointer text-left">About</button>
                <button onClick={() => scrollToSection("lodges-section")} className="nav-link hover:text-amber-200 transition-colors cursor-pointer text-left">The Lodges</button>
                <button onClick={() => scrollToSection("gallery-section")} className="nav-link hover:text-amber-200 transition-colors cursor-pointer text-left">Gallery</button>
                <button onClick={() => scrollToSection("packages-section")} className="nav-link hover:text-amber-200 transition-colors cursor-pointer text-left">Packages</button>
              </nav>
            </div>

            {/* Center: Central Logo - clean, borderless, perfectly centered */}
            <div className="text-center">
              <button onClick={() => lenisRef.current ? lenisRef.current.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" })} className="inline-block group cursor-pointer transition-colors text-center focus:outline-none">
                <h1 className="font-sans text-xl md:text-3xl font-bold tracking-[0.35em] text-white group-hover:text-amber-100 transition-colors leading-none" id="main-brand-logo">
                  IVORYTIP
                </h1>
                <p className="font-sans text-[8px] md:text-[10px] tracking-[0.5em] text-amber-200/80 uppercase font-medium mt-1.5 leading-none transition-colors group-hover:text-amber-300">
                  S A F A R I S
                </p>
              </button>
            </div>

          {/* Right: CTAs */}
          <div className="flex items-center justify-end gap-4 lg:gap-8">
            <button 
              onClick={() => { setActiveModal("availability"); }}
              className="btn-shimmer border border-white/70 hover:border-amber-200 hover:text-amber-100 px-4 py-2.5 md:px-6 md:py-2.5 text-[9px] md:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/5 cursor-pointer bg-black/10 backdrop-blur-sm"
              id="book-safari-header-btn"
            >
              Book Your Safari
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Body Section */}
      <main className="relative z-30 max-w-8xl mx-auto px-8 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full min-h-0 -translate-y-12 md:-translate-y-24" id="hero-main-content">
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

      {/* 1:1 Accurate Translucent Booking Engine Widget - Placed flush at the absolute bottom of the screen */}
      <div className="relative z-40 w-full bg-white/[0.04] border-t border-white/10 backdrop-blur-md py-6 md:py-8 px-6 lg:px-12 flex-none animate-fade-in" id="booking-engine-widget">
        <div className="max-w-8xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-end">
            
            {/* Check In Date */}
            <div className="lg:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-amber-200/90 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Check In
              </label>
              <div className="relative">
                <input 
                  type="date"
                  value={booking.checkIn}
                  onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })}
                  className="w-full bg-white/[0.05] hover:bg-white/[0.09] text-white/90 border border-white/10 hover:border-white/20 rounded-md px-3.5 py-3 text-xs md:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-amber-400/50 cursor-pointer [color-scheme:dark] transition-colors"
                />
              </div>
            </div>

            {/* Check Out Date */}
            <div className="lg:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-amber-200/90 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Check Out
              </label>
              <div className="relative">
                <input 
                  type="date"
                  value={booking.checkOut}
                  min={booking.checkIn}
                  onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })}
                  className="w-full bg-white/[0.05] hover:bg-white/[0.09] text-white/90 border border-white/10 hover:border-white/20 rounded-md px-3.5 py-3 text-xs md:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-amber-400/50 cursor-pointer [color-scheme:dark] transition-colors"
                />
              </div>
            </div>

            {/* Guests Dropdown selection */}
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
                    <option key={idx} value={opt} className="bg-[#1c130d] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-amber-400/70 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Safari Type Selection */}
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
                    <option key={idx} value={type} className="bg-[#1c130d] text-white">
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-amber-400/70 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Big Solid Check Availability Action Button */}
            <div className="lg:col-span-4 w-full">
              <button 
                onClick={() => {
                  setIsBookingConfirmed(false);
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
      </div> {/* Close booking-engine-widget */}
      
      </div> {/* Close 1st Fold: Immersive Hero & Header (Full Screen Viewport) */}

      {/* 2nd Section: Our Heritage & Story */}
      <section id="about-section" ref={heritageSectionRef} className="relative z-20 py-24 md:py-32 bg-gradient-to-b from-[#0d0906] to-[#120e0a] border-b border-amber-900/10 px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 lg:items-stretch">
          
          <div className="lg:col-span-5 space-y-6 md:space-y-8 text-left flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">
              EST. 1984 &bull; NAMIBIA SAVANNA
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
              Deep within the pristine, sun-drenched Namibian bushveldt, <strong className="text-white font-medium">Ivorytip Safaris</strong> stands as the ultimate sanctuary for selective sportsmen and wilderness seekers. Across over 80,000 hectares of private, unfenced conservation land, we honor the ancient code of the hunting stalk.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="text-stone-400 text-sm leading-relaxed font-light"
            >
              Our professional trackers carry decades of ancestral knowledge, guiding you through camelthorn thickets and sand dunes to encounter Africa's most legendary species. Yet, the adventure only begins in the field; it is perfected within our architectural, five-star accommodations.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
              {[
                { value: "80K+", label: "Acres Conservancy", span: "" },
                { value: "100%", label: "Fair Chase Stalks", span: "" },
                { value: "1:1", label: "Guide to Hunter", span: "col-span-2 md:col-span-1" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.12 }}
                  className={`border-l-2 border-amber-500/40 pl-4 py-2 text-left ${stat.span}`}
                >
                  <span className="block font-sans text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold block mt-1">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7 relative flex flex-col h-full min-h-[350px] lg:min-h-0"
          >
            <div className="absolute inset-0 bg-amber-500/10 rounded-2xl blur-3xl pointer-events-none" />
            <div className="relative border border-amber-500/20 rounded-2xl p-2 bg-white/[0.02] overflow-hidden group flex-1 flex flex-col h-full">
              <motion.img
                src={fairHuntImage}
                alt="Ivorytip Safari Fair Chase Hunt"
                className="w-full h-full rounded-xl object-cover flex-1 scale-110 origin-center"
                style={{ y: heritageImgY }}
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3rd Section: Accommodations Room Showcase Section (Hotel Style) */}
      <section id="lodges-section" className="relative z-20 py-24 md:py-32 bg-[#120e0a] border-b border-amber-900/10 px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Curated Sanctuaries</span>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase"
            >
              Stunning Lodges & Suites
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
              className="text-stone-400 text-xs md:text-sm leading-relaxed font-light text-center"
            >
              Experience absolute rest under high thatch and hand-carved stone walls. Each lodge features deep vintage baths, endless plains view decks, and direct interactions with native wildlife.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Interactive Room Selection Tabs & Amenities */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-start">
              <div className="space-y-3">
                {lodges.map((lodge, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: idx * 0.1 }}
                    onClick={() => setSelectedLodgeIndex(idx)}
                    className={`lodge-tab w-full text-left p-5 rounded-xl border transition-all duration-500 cursor-pointer flex flex-col gap-1.5 focus:outline-none ${
                      selectedLodgeIndex === idx
                        ? "lodge-active bg-[#1c130e] border-amber-500/40 shadow-xl shadow-black/30"
                        : "bg-black/10 border-white/[0.04] hover:bg-white/[0.02] hover:border-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest">
                        {lodge.location.split("&")[0]}
                      </span>
                      {selectedLodgeIndex === idx && (
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      )}
                    </div>
                    <h3 className="font-sans text-lg md:text-xl font-bold text-white">{lodge.name}</h3>
                    <p className="text-xs text-stone-400 line-clamp-1 font-light">{lodge.tagline}</p>
                  </motion.button>
                ))}

                {/* Selected Div: Dynamic Elite Amenities & Trust features */}
                <div className="bg-black/20 border border-amber-500/15 p-5 rounded-xl space-y-4 text-left shadow-lg">
                  <div>
                    <h4 className="text-[10px] uppercase text-amber-400 font-bold tracking-[0.25em] mb-3">Elite Amenities Included:</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {lodges[selectedLodgeIndex].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-stone-300">
                          <div className="w-4.5 h-4.5 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
                            <Check className="w-2.5 h-2.5 text-amber-400" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-px bg-white/5 my-2" />

                  <div className="space-y-3.5">
                    <div className="flex items-start gap-3">
                      <Coffee className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-[10px] font-semibold text-white uppercase tracking-wider">All-Inclusive Dining</h5>
                        <p className="text-stone-400 text-[10px] leading-relaxed mt-0.5">Three daily gourmet courses designed by Michelin-starred teams.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Waves className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-[10px] font-semibold text-white uppercase tracking-wider">Private Wilderness Deck</h5>
                        <p className="text-stone-400 text-[10px] leading-relaxed mt-0.5">Personal elevated viewing terrace equipped with plunge pools.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Beautiful Featured Lodge Spotlight */}
            <div className="lg:col-span-8 bg-[#1c130e]/40 border border-amber-900/15 rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 to-transparent pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedLodgeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 md:space-y-8"
                >
                  {/* Spotlight Image with Zoom Hover */}
                  <div className="relative h-64 md:h-[400px] w-full rounded-xl overflow-hidden border border-white/5 group shadow-inner">
                    <img
                      src={lodges[selectedLodgeIndex].image}
                      alt={lodges[selectedLodgeIndex].name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                      <div className="text-left">
                        <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest bg-black/60 px-2.5 py-1 rounded border border-white/10 backdrop-blur-sm">
                          {lodges[selectedLodgeIndex].location}
                        </span>
                        <h4 className="font-sans text-xl md:text-2xl font-bold text-white mt-2">
                          {lodges[selectedLodgeIndex].name}
                        </h4>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase text-stone-400 block font-bold tracking-widest">Starting Day Rate</span>
                        <span className="text-lg md:text-2xl font-bold text-amber-400">$1,250 <span className="text-xs text-stone-300 font-light">/ Adult</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Description */}
                  <div className="space-y-4 text-left">
                    <p className="text-amber-100/90 text-sm md:text-base italic font-light leading-relaxed">
                      "{lodges[selectedLodgeIndex].tagline}"
                    </p>
                    <div className="h-px w-full bg-white/10" />
                  </div>

                  {/* Room Inquiry Call */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/5">
                    <button
                      onClick={() => {
                        setInquiryForm({
                          ...inquiryForm,
                          lodge: lodges[selectedLodgeIndex].name
                        });
                        scrollToSection("cta-section");
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-[#110c08] uppercase text-xs tracking-wider font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 group"
                    >
                      Inquire About {lodges[selectedLodgeIndex].name}
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedLodge(lodges[selectedLodgeIndex].name);
                        setBooking({
                          ...booking,
                          destination: lodges[selectedLodgeIndex].name.includes("Giraffe") ? "Masai Mara Reserve, Kenya" : "Serengeti National Park, Tanzania"
                        });
                        setActiveModal("availability");
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white uppercase text-xs tracking-wider font-bold rounded-lg transition-all cursor-pointer"
                    >
                      Check Room Availability
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 4th Section: Trophy & Wilderness Photo Gallery (Bento Box Style) */}
      <section id="gallery-section" className="relative z-20 py-24 md:py-32 bg-gradient-to-b from-[#120e0a] to-[#0e0a07] border-b border-amber-900/10 px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div className="space-y-3 text-left">
              <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Wilderness Chronicles</span>
              <motion.h2
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase"
              >
                Stories & Field Gallery
              </motion.h2>
              <p className="text-stone-400 text-xs md:text-sm max-w-xl font-light text-left">
                A visual testament to legendary stalks, trophy-room celebrations, and the raw beauty of Namibia. Filter through our lodge, client successes, and native wildlife.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-start">
              {[
                { label: "All Photos", filter: "all" },
                { label: "Trophy Hunts", filter: "hunt" },
                { label: "Lodge Life", filter: "lodge" },
                { label: "Wildlife", filter: "wild" }
              ].map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => setGalleryFilter(btn.filter as any)}
                  className={`px-4 py-2 text-[10px] md:text-xs tracking-wider uppercase font-bold rounded transition-all focus:outline-none cursor-pointer ${
                    galleryFilter === btn.filter
                      ? "bg-amber-400 text-[#110c08] shadow"
                      : "bg-white/5 hover:bg-white/10 text-stone-300 border border-white/5"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bento Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: kuduImage,
                category: "hunt",
                title: "Gold-Medal Kalahari Kudu Stalk",
                desc: "Harvested by Arthur Pendelton on Day 3 of his Sovereign Safari.",
                detail: "Weapon: .300 Win Mag | Distance: 240 Yards | Guide: Tracker Naude",
                gridSpan: "col-span-1"
              },
              {
                src: dinnerImage,
                category: "lodge",
                title: "Chobe Sundowner Ridge Dinner",
                desc: "An ambient starlit feast prepared over native wood fire for our guests.",
                detail: "Lodge: The Secluded Timber Cabin | Menu: Flame Grilled Eland Tenderloin",
                gridSpan: "col-span-1"
              },
              {
                src: cheetahImage,
                category: "wild",
                title: "Camouflage Plains Cheetah Scan",
                desc: "An incredible morning encounter with a Kalahari hunter surveying the savanna.",
                detail: "Location: North Conservancy | Encounter time: 06:42 AM",
                gridSpan: "col-span-1"
              },
              {
                src: bufalloImage,
                category: "hunt",
                title: "Majestic Waterberg Cape Buffalo",
                desc: "A true classic deep-thicket tracking effort led by our professional hunters.",
                detail: "Client: Francois Du Preez | Caliber: .375 H&H | Trophy score: Gold Merit",
                gridSpan: "col-span-1"
              },
              {
                src: campfireImage,
                category: "lodge",
                title: "Savanna Ridge Evening Campfire",
                desc: "Sharing hunting tales under the Milky Way with native liqueurs.",
                detail: "Location: Serengeti Edge Heights | Campfire storytelling",
                gridSpan: "col-span-1"
              }
            ].filter(item => galleryFilter === "all" || item.category === galleryFilter).map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={idx}
                className={`gallery-card relative group overflow-hidden rounded-xl border border-white/5 cursor-pointer bg-stone-900/40 h-80 ${item.gridSpan}`}
                onClick={() => setLightboxImage(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover brightness-[0.8]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#110c08] via-black/20 to-transparent opacity-90 transition-opacity duration-300 pointer-events-none" />
                
                {/* Information Overlay */}
                <div className="absolute inset-x-5 bottom-5 space-y-2 text-left z-20">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-amber-400 text-[#110c08]">
                      {item.category === "hunt" ? "Trophy Hunt" : item.category === "lodge" ? "Lodge Life" : "Wildlife"}
                    </span>
                    <Camera className="w-3.5 h-3.5 text-stone-400" />
                  </div>
                  <h4 className="font-sans text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-stone-300 text-xs font-light line-clamp-2">
                    {item.desc}
                  </p>
                  <p className="text-stone-400 font-mono text-[10px] hidden group-hover:block transition-all mt-1 border-t border-white/10 pt-1.5">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5th Section: Hunting Trophies & Packages Section */}
      <section id="packages-section" className="relative z-20 py-24 md:py-32 bg-[#0e0a07] border-b border-amber-900/10 px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Elite Expeditions</span>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase"
            >
              Hunting Trophies & Packages
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
              className="text-stone-400 text-xs md:text-sm font-light leading-relaxed text-center"
            >
              Our bespoke hunting expeditions combine elite 1:1 professional tracking teams, field preparation, taxidermy oversight, and five-star luxury lodge stays.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                title: "The Plains Game Pioneer",
                price: "$6,500",
                duration: "5 Days / 4 Nights",
                lodge: "Whispering Dunes Couples Retreat",
                species: "1x Kudu, 1x Wildebeest, 1x Impala",
                features: [
                  "1:1 professional hunter guide ratio",
                  "Elite off-road tracking vehicle",
                  "Gourmet wild game bush feasts",
                  "Field dressing & caping preparation",
                  "Airport return shuttle (Namibia Hub)"
                ],
                tag: "Classic Adventure"
              },
              {
                title: "The Ivorytip Sovereign",
                price: "$12,500",
                duration: "7 Days / 6 Nights",
                lodge: "Ivorytip Sovereign Lodge",
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
                tag: "Ultimate Sovereign"
              }
            ].map((pkg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: idx * 0.15 }}
                className={`pkg-card relative flex flex-col justify-between rounded-2xl p-8 border transition-all duration-500 overflow-hidden text-left ${
                  pkg.featured
                    ? "pkg-featured bg-[#1c130e] border-amber-500/50 shadow-2xl shadow-black/40 scale-[1.02] md:scale-105 z-10"
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
                    <h3 className="font-sans text-xl md:text-2xl font-bold text-white leading-tight">
                      {pkg.title}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="text-3xl md:text-4xl font-bold text-amber-400">{pkg.price}</span>
                      <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Base Rate</span>
                    </div>
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
                    <div className="bg-black/35 p-3 rounded border border-amber-900/10 mt-2">
                      <span className="text-[9px] uppercase text-amber-400 font-bold tracking-wider block mb-1">Included Trophies:</span>
                      <p className="text-xs text-amber-100 font-medium font-mono">{pkg.species}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Expedition Details:</span>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-white/5">
                  <button
                    onClick={() => {
                      setInquiryForm({
                        ...inquiryForm,
                        package: pkg.title,
                        lodge: pkg.lodge
                      });
                      scrollToSection("cta-section");
                    }}
                    className={`w-full py-3 rounded-lg uppercase text-xs tracking-wider font-bold cursor-pointer transition-colors text-center ${
                      pkg.featured
                        ? "bg-amber-400 hover:bg-amber-500 text-[#110c08]"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    }`}
                  >
                    Select & Customise Package
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6th Section: Client Testimonials Section */}
      <section id="reviews-section" className="relative z-20 py-24 md:py-32 bg-gradient-to-b from-[#0e0a07] to-[#110c08] border-b border-amber-900/10 px-6 lg:px-12 w-full">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Sovereign Accolades</span>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase"
            >
              Client Testimonials
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
              className="text-stone-400 text-xs md:text-sm font-light leading-relaxed text-center"
            >
              Hear from our global hunting partners and adventurers who have walked the Namibian sands with our world-class field guiding team.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                name: "Arthur Pendelton",
                location: "Dallas, Texas",
                quote: "The tracking team at Ivorytip is genuinely unmatched. We stalked a gold-medal kudu over camelthorn dunes on day three. The attention to skinning detail is world-class, and the evening service at the Manor is absolute perfection.",
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
                trophy: "Big Game Sovereign Hunt"
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

      {/* 7th Section: Custom Booking / Inquiry CTA Section */}
      <section 
        id="cta-section" 
        className="relative z-20 min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat py-20 px-6 lg:px-12 w-full overflow-hidden"
        style={{ backgroundImage: `url(${ctaBgImage})` }}
      >
        {/* Deep, rich overlay for readability of text */}
        <div className="absolute inset-0 bg-stone-950/75 pointer-events-none" />
        
        <div className="max-w-4xl w-full mx-auto border border-white/10 rounded-3xl bg-black/40 backdrop-blur-xl p-8 md:p-16 relative overflow-hidden text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          {!isInquirySubmitted ? (
            <div className="space-y-10">
              <div className="space-y-4 max-w-2xl mx-auto">
                <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Reserve Your Sanctuary</span>
                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase leading-none"
                >
                  Begin Your Journey
                </motion.h2>
                <p className="text-stone-300 text-xs md:text-sm font-light text-center">
                  Complete this gold-draft inquiry. Our professional hunters and lodge coordinators will contact you within 12 hours with a bespoke, customized itinerary draft.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsInquirySubmitted(true);
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Full Name</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    placeholder="e.g., Arthur Pendelton"
                    className="w-full bg-black/40 text-white border border-white/10 focus:border-amber-400 rounded-lg px-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Email Address</label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    placeholder="e.g., arthur@huntingpartners.com"
                    className="w-full bg-black/40 text-white border border-white/10 focus:border-amber-400 rounded-lg px-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Desired Hunting Package</label>
                  <select
                    value={inquiryForm.package}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, package: e.target.value })}
                    className="w-full bg-black/40 text-stone-200 border border-white/10 focus:border-amber-400 rounded-lg px-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors cursor-pointer"
                  >
                    <option value="The Plains Game Pioneer" className="bg-[#1c130d] text-white">The Plains Game Pioneer ($6,500)</option>
                    <option value="The Ivorytip Sovereign" className="bg-[#1c130d] text-white">The Ivorytip Sovereign ($12,500)</option>
                    <option value="The Monarch Big Game" className="bg-[#1c130d] text-white">The Monarch Big Game ($19,500)</option>
                    <option value="Custom Bespoke Safari / Photo Only" className="bg-[#1c130d] text-white">Custom Safari / Photo Only</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Preferred Lodging</label>
                  <select
                    value={inquiryForm.lodge}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, lodge: e.target.value })}
                    className="w-full bg-black/40 text-stone-200 border border-white/10 focus:border-amber-400 rounded-lg px-4 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors cursor-pointer"
                  >
                    <option value="Ivorytip Sovereign Lodge" className="bg-[#1c130d] text-white">Ivorytip Sovereign Lodge</option>
                    <option value="Whispering Dunes Couples Retreat" className="bg-[#1c130d] text-white">Whispering Dunes Couples Retreat</option>
                    <option value="The Secluded Timber Cabin" className="bg-[#1c130d] text-white">The Secluded Timber Cabin</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Custom Stalk, Caliber & Taxidermy Requests</label>
                  <textarea
                    rows={4}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    placeholder="e.g., Requesting custom .300 Win Mag firearm hire, gold-medal kudu tag guidance, and shipping oversight back to Dallas."
                    className="w-full bg-black/40 text-white border border-white/10 focus:border-amber-400 rounded-lg p-4 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors resize-none"
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="btn-shimmer w-full py-4 bg-amber-400 hover:bg-amber-500 text-[#110c08] uppercase text-xs tracking-widest font-bold rounded-lg transition-all cursor-pointer shadow-xl shadow-amber-900/10 flex items-center justify-center gap-2"
                  >
                    Submit Gold Reservation Inquiry
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 py-12"
            >
              <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
                <Award className="w-8 h-8" />
              </div>
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.4em] text-amber-400 font-bold block">Inquiry Received</span>
                <h3 className="font-sans text-2xl md:text-3xl font-bold text-white uppercase">
                  Salutations, {inquiryForm.name}
                </h3>
                <p className="text-stone-300 text-xs md:text-sm max-w-lg mx-auto font-light leading-relaxed text-center">
                  Your customized reservation draft for the <strong className="text-white">{inquiryForm.package}</strong> lodging at <strong className="text-white">{inquiryForm.lodge}</strong> has been logged in our secure ledger.
                </p>
                <p className="text-stone-400 text-xs max-w-md mx-auto font-light text-center">
                  A senior professional hunter and custom taxidermy coordinator will contact you at <strong className="text-white">{inquiryForm.email}</strong> within 12 hours with a bespoke itinerary.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsInquirySubmitted(false);
                    setInquiryForm({ name: "", email: "", package: "The Ivorytip Sovereign", lodge: "Ivorytip Sovereign Lodge", message: "" });
                  }}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs uppercase font-bold tracking-wider rounded transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 8th Section: Simple Premium Footer */}
      <footer className="w-full bg-[#120e0a] text-stone-400 py-12 px-6 lg:px-12 border-t border-amber-900/10 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left / Center-Left: Logo, Divider, and Links */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full md:w-auto">
            <div className="text-white font-sans text-xl font-bold tracking-tight uppercase shrink-0">
              Ivorytip Safaris
            </div>
            
            {/* Vertical Divider line - aligned perfectly to stretch with content */}
            <div className="hidden md:block w-px bg-stone-800 self-stretch my-1" />
            
            {/* Links and Copyright info */}
            <div className="flex flex-col gap-2 items-center md:items-start">
              <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-1.5 text-xs text-stone-300 font-medium">
                <a href="#about-section" className="hover:text-amber-400 transition-colors">About</a>
                <a href="#lodges-section" className="hover:text-amber-400 transition-colors">Benefits</a>
                <a href="#packages-section" className="hover:text-amber-400 transition-colors">Career</a>
                <a href="#cta-section" className="hover:text-amber-400 transition-colors">Support</a>
              </div>
              <div className="text-[11px] text-stone-500 font-light">
                © 2026 Ivorytip Safaris. All rights reserved.
              </div>
            </div>
          </div>

          {/* Right Side: Social Media & Support */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right w-full md:w-auto">
            <div className="flex items-center gap-4 text-stone-400 py-1">
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <div className="text-xs text-stone-500 font-light">
              Support: <span className="text-stone-400 hover:text-amber-400 transition-colors cursor-pointer">brent.streamlinedigital@gmail.com</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Dynamic Interactive Modal Screens */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-[#1c130e] border border-amber-900/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-10"
              id="luxury-interactive-modal"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => {
                  setActiveModal(null);
                  setIsBookingConfirmed(false);
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal - Availability Checkout & Dynamic Itinerary Preview */}
              {activeModal === "availability" && (
                <div>
                  {!isBookingConfirmed ? (
                    <div>
                      {/* Sub-header detailing chosen inputs */}
                      <div className="border-b border-white/10 pb-6 mb-8">
                        <span className="text-xs uppercase tracking-widest text-amber-200">Luxury Booking Draft</span>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-white mt-1">Review Your Exclusive Journey</h3>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 bg-black/25 p-4 rounded-lg text-xs">
                          <div>
                            <span className="text-stone-400 block mb-1">Destination</span>
                            <span className="font-medium text-white">{booking.destination}</span>
                          </div>
                          <div>
                            <span className="text-stone-400 block mb-1">Duration</span>
                            <span className="font-medium text-white">{stayNights} Nights ({booking.checkIn} to {booking.checkOut})</span>
                          </div>
                          <div>
                            <span className="text-stone-400 block mb-1">Guests Group</span>
                            <span className="font-medium text-white">{booking.guests}</span>
                          </div>
                          <div>
                            <span className="text-stone-400 block mb-1">Safari Type</span>
                            <span className="font-medium text-white">{booking.safariType}</span>
                          </div>
                        </div>
                      </div>

                      {/* Itinerary Preview Tabs */}
                      <div className="mb-8">
                        <h4 className="text-xs uppercase tracking-widest text-amber-200 mb-3 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-amber-400" />
                          Curated Itinerary Breakdown
                        </h4>
                        <div className="flex border-b border-white/10 mb-4 overflow-x-auto">
                          {[1, 2, 3].map((day) => (
                            <button
                              key={day}
                              onClick={() => setSelectedDayTab(day)}
                              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                                selectedDayTab === day 
                                  ? "border-amber-400 text-white" 
                                  : "border-transparent text-stone-400 hover:text-white"
                              }`}
                            >
                              Day {day}
                            </button>
                          ))}
                        </div>
                        <div className="bg-black/30 p-5 rounded-lg border border-amber-900/10 min-h-[140px]">
                          {selectedDayTab === 1 && (
                            <div className="space-y-2">
                              <h5 className="font-semibold text-white text-sm">Arrival, Airport Lounge & Sunset Game Drive</h5>
                              <p className="text-stone-300 text-xs leading-relaxed">
                                Arrive at the private airstrip where your dedicated professional field guide awaits with cold champagne and gourmet snacks. Enjoy a brief scenic transfer to Ivorytip Lodge, checking into your suite before departing on a breathtaking sunset game drive through key predator migration tracks.
                              </p>
                              <div className="flex gap-4 mt-3 text-[10px] text-amber-200 uppercase font-bold">
                                <span className="flex items-center gap-1"><Sunset className="w-3.5 h-3.5" /> Golden Hour Drive</span>
                                <span className="flex items-center gap-1"><UtensilsCrossed className="w-3.5 h-3.5" /> Savanna Dinner</span>
                              </div>
                            </div>
                          )}
                          {selectedDayTab === 2 && (
                            <div className="space-y-2">
                              <h5 className="font-semibold text-white text-sm">Hot Air Balloon Safari & Toast over the Plains</h5>
                              <p className="text-stone-300 text-xs leading-relaxed">
                                Wake up before dawn for a spectacular hot air balloon launch. Lift off as the sun crests the horizon, granting breathtaking aerial views of wildebeest herds roaming the endless savanna. Lands safely for a luxury champagne bush breakfast prepared by our master chefs.
                              </p>
                              <div className="flex gap-4 mt-3 text-[10px] text-amber-200 uppercase font-bold">
                                <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Hot Air Flight</span>
                                <span className="flex items-center gap-1"><Coffee className="w-3.5 h-3.5" /> Champagne Breakfast</span>
                              </div>
                            </div>
                          )}
                          {selectedDayTab === 3 && (
                            <div className="space-y-2">
                              <h5 className="font-semibold text-white text-sm">Private Infinite Pool Lounge & Elephant Bathing Watching</h5>
                              <p className="text-stone-300 text-xs leading-relaxed">
                                Indulge in a tranquil morning at the estate. Enjoy an interactive brunch on the wooden deck beside the infinity pool, where magnificent giraffes and herds of wild elephants regularly wander up to browse acacia branches directly alongside you.
                              </p>
                              <div className="flex gap-4 mt-3 text-[10px] text-amber-200 uppercase font-bold">
                                <span className="flex items-center gap-1"><Waves className="w-3.5 h-3.5" /> Pool Deck Brunch</span>
                                <span className="flex items-center gap-1"><Moon className="w-3.5 h-3.5" /> Stargazing Lounge</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pricing Table & Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
                        <div className="bg-black/30 p-6 rounded-lg border border-amber-900/10">
                          <h4 className="text-xs uppercase tracking-widest text-amber-200 mb-4">Investment Summary</h4>
                          <div className="space-y-3 text-xs">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                              <span className="text-stone-400">Exclusive Safari Rate</span>
                              <span className="text-white">$1,450 / night</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                              <span className="text-stone-400">Length of Stay</span>
                              <span className="text-white">{stayNights} Nights</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                              <span className="text-stone-400">Subtotal for Lodge Suite</span>
                              <span className="text-white">${(1450 * stayNights).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                              <span className="text-stone-400">Luxury Guided Service Charge</span>
                              <span className="text-white">Included</span>
                            </div>
                            <div className="flex justify-between pt-2 text-sm font-bold">
                              <span className="text-amber-200">Total Est. Pricing</span>
                              <span className="text-white">${(1450 * stayNights).toLocaleString()} USD</span>
                            </div>
                          </div>
                          <div className="mt-5 flex items-center gap-2 text-[10px] text-stone-400 bg-white/5 p-2 rounded">
                            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>All bookings include 100% full travel insurance & local medical rescue evacuation coverage.</span>
                          </div>
                        </div>

                        {/* Interactive Form */}
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                          <h4 className="text-xs uppercase tracking-widest text-amber-200">Secure Safari Request</h4>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Full Name</label>
                            <input 
                              type="text" 
                              required
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="e.g. Honorable Brent Streamline"
                              className="w-full bg-black/40 text-stone-100 border border-amber-900/30 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Email Address</label>
                              <input 
                                type="email" 
                                required
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="brent@example.com"
                                className="w-full bg-black/40 text-stone-100 border border-amber-900/30 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Phone Number</label>
                              <input 
                                type="tel" 
                                required
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                placeholder="+1 (555) 019-2834"
                                className="w-full bg-black/40 text-stone-100 border border-amber-900/30 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Special Preferences / Requests</label>
                            <textarea 
                              rows={2}
                              placeholder="Dietary requests, private aircraft landing, helicopter transfers, balloon flight confirmation..."
                              className="w-full bg-black/40 text-stone-100 border border-amber-900/30 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
                            />
                          </div>
                          <button 
                            type="submit"
                            className="w-full bg-[#e8dec9] hover:bg-[#d9cdb4] text-[#110c08] hover:text-[#000] font-bold py-3 rounded text-xs uppercase tracking-widest transition-colors cursor-pointer"
                          >
                            Submit Booking Request
                          </button>
                        </form>
                      </div>
                    </div>
                  ) : (
                    // Success Screen
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-6"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                      
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-widest text-emerald-400">Request Received Successfully</span>
                        <h3 className="font-display text-3xl md:text-4xl font-bold text-white">Your African Odyssey Awaits</h3>
                        <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                          Thank you, <strong className="text-white">{userName || "Brent"}</strong>. Our Ivorytip Safari Concierge team has reserved your preliminary request for <strong className="text-amber-200">{booking.destination}</strong>.
                        </p>
                      </div>

                      <div className="bg-black/30 p-5 rounded-lg border border-amber-900/10 max-w-md mx-auto text-xs text-left space-y-2">
                        <div className="flex justify-between"><span className="text-stone-400">Booking Reference:</span><span className="font-mono text-white">IVT-2026-9284</span></div>
                        <div className="flex justify-between"><span className="text-stone-400">Dates Selected:</span><span className="text-white">{booking.checkIn} to {booking.checkOut}</span></div>
                        <div className="flex justify-between"><span className="text-stone-400">Group Size:</span><span className="text-white">{booking.guests}</span></div>
                        <div className="flex justify-between"><span className="text-stone-400">Contact Email:</span><span className="text-white">{userEmail || "brent.streamlinedigital@gmail.com"}</span></div>
                      </div>

                      <p className="text-xs text-stone-400 italic">
                        A private travel liaison will contact you by telephone within 2 hours to coordinate custom aircraft charter flights.
                      </p>

                      <button 
                        onClick={() => {
                          setActiveModal(null);
                          setIsBookingConfirmed(false);
                        }}
                        className="px-6 py-2.5 border border-white/20 hover:border-white rounded text-xs uppercase tracking-widest text-stone-300 hover:text-white transition-all cursor-pointer"
                      >
                        Return to Homepage
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Modal - Curated Safaris Showcase */}
              {activeModal === "safaris" && (
                <div className="space-y-8">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs uppercase tracking-widest text-amber-200">Elite Journeys</span>
                    <h3 className="font-display text-3xl font-bold text-white mt-1">Curated Safaris & Expeditions</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                      <div key={pkg.id} className="bg-black/20 border border-amber-900/10 rounded-lg overflow-hidden flex flex-col justify-between">
                        <div>
                          <div className="relative h-44">
                            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-amber-200 text-[10px] font-bold px-2 py-1 rounded">
                              {pkg.duration}
                            </div>
                          </div>
                          <div className="p-5 space-y-3">
                            <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">{pkg.location}</span>
                            <h4 className="font-display text-lg font-bold text-white leading-tight">{pkg.name}</h4>
                            <p className="text-stone-300 text-xs leading-relaxed line-clamp-3">{pkg.description}</p>
                            
                            <div className="pt-2">
                              <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Lodge Amenities</span>
                              <div className="flex flex-wrap gap-1">
                                {pkg.amenities.slice(0, 3).map((am, i) => (
                                  <span key={i} className="text-[9px] bg-white/5 px-2 py-0.5 rounded text-stone-300">{am}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                          <div>
                            <span className="text-[9px] text-stone-400 block uppercase">Est. Nightly Rate</span>
                            <span className="text-amber-200 font-bold text-sm">${pkg.pricePerNight} USD</span>
                          </div>
                          <button 
                            onClick={() => {
                              setBooking({
                                ...booking,
                                destination: pkg.location,
                                safariType: pkg.name.includes("Migration") ? "Luxury Safari" : "Private Guided Expedition"
                              });
                              setActiveModal("availability");
                            }}
                            className="bg-[#e8dec9] hover:bg-[#d9cdb4] text-[#110c08] text-[10px] uppercase font-bold px-3 py-1.5 rounded transition-colors cursor-pointer"
                          >
                            Choose
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal - Luxury Lodges */}
              {activeModal === "lodges" && (
                <div className="space-y-8">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs uppercase tracking-widest text-amber-200">Curated Sanctuaries</span>
                    <h3 className="font-display text-3xl font-bold text-white mt-1">Our Award-Winning Wilderness Camps</h3>
                  </div>

                  <div className="space-y-6">
                    {lodges.map((lodge, idx) => (
                      <div 
                        key={idx} 
                        className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-black/20 border border-amber-900/15 p-5 rounded-lg items-center"
                      >
                        <div className="md:col-span-5 h-48 rounded overflow-hidden">
                          <img src={lodge.image} alt={lodge.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                        </div>
                        <div className="md:col-span-7 space-y-3">
                          <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">{lodge.location}</span>
                          <h4 className="font-display text-xl font-bold text-white">{lodge.name}</h4>
                          <p className="text-amber-100/90 text-xs italic">{lodge.tagline}</p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                            {lodge.features.map((feat, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                                <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3">
                            <button 
                              onClick={() => {
                                setSelectedLodge(lodge.name);
                                setBooking({
                                  ...booking,
                                  destination: lodge.name.includes("Giraffe") ? "Masai Mara Reserve, Kenya" : "Serengeti National Park, Tanzania"
                                });
                                setActiveModal("availability");
                              }}
                              className="px-4 py-2 bg-transparent hover:bg-[#e8dec9] border border-[#e8dec9] text-[#e8dec9] hover:text-[#110c08] text-[10px] uppercase font-bold tracking-wider rounded transition-all cursor-pointer"
                            >
                              Inquire About {lodge.name}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal - Luxury Experiences */}
              {activeModal === "experiences" && (
                <div className="space-y-8">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs uppercase tracking-widest text-amber-200">Wilderness Curations</span>
                    <h3 className="font-display text-3xl font-bold text-white mt-1">Unforgettable Safari Moments</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="h-52 rounded overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80" alt="Hot Air Balloon Over Serengeti" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="font-display text-lg font-bold text-white">Sunrise Hot Air Ballooning</h4>
                      <p className="text-stone-300 text-xs leading-relaxed">
                        Rise silently into the cool dawn air. Float effortlessly with the warm wind currents over thousands of migrating wild herds, followed by a royal white-glove champagne breakfast served on elegant porcelain deep inside the wilderness.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="h-52 rounded overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80" alt="Private Savanna Starlit Dinners" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="font-display text-lg font-bold text-white">Private Savanna Starlit Dinners</h4>
                      <p className="text-stone-300 text-xs leading-relaxed">
                        Feast on wood-fired delicacies designed by Michelin-starred culinary teams on a high, private viewing deck. Savor select vintage wines paired perfectly, accompanied by live cultural melodies and the ambient roars of the distant pride.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal - About */}
              {activeModal === "about" && (
                <div className="space-y-6">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs uppercase tracking-widest text-amber-200">The Legend</span>
                    <h3 className="font-display text-3xl font-bold text-white mt-1">Our Heritage & Promise</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 text-xs text-stone-300 leading-relaxed">
                      <p>
                        Established over four decades ago, <strong>Ivorytip Safaris</strong> stands as the absolute pinnacle of African adventure travel. We believe true luxury lies not in gilded fixtures, but in pristine proximity to raw wilderness, flawless guiding, and absolute visual isolation.
                      </p>
                      <p>
                        Our camps and sanctuaries are situated on exclusive private land conservancies, keeping you safe and far removed from crowded mass tourist tracks. 
                      </p>
                      <p>
                        Every detail is crafted with environmental preservation at the forefront. We fund and manage critical local anti-poaching squads, water access pipelines, and native education foundations with a fixed portion of every safari booking.
                      </p>
                      <div className="pt-4 flex gap-4">
                        <div className="border-l-2 border-amber-400 pl-4">
                          <span className="block font-display text-2xl font-bold text-white">40+</span>
                          <span className="text-[10px] text-stone-400 uppercase tracking-widest">Years of Trust</span>
                        </div>
                        <div className="border-l-2 border-amber-400 pl-4">
                          <span className="block font-display text-2xl font-bold text-white">100%</span>
                          <span className="text-[10px] text-stone-400 uppercase tracking-widest">Carbon Neutral</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <img 
                        src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80" 
                        alt="Ivorytip Safari Heritage" 
                        className="w-full rounded border border-amber-900/10 shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Gallery Lightbox Modal */}
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
                    referrerPolicy="no-referrer"
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



    </div>
  );
}
