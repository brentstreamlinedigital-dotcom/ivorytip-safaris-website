import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { 
  Menu, 
  X, 
  Calendar, 
  Users, 
  Compass, 
  ChevronDown, 
  Facebook, 
  Instagram, 
  Youtube, 
  Check, 
  CheckCircle2, 
  Shield, 
  Clock, 
  Coffee, 
  Sparkles,
  Search,
  Mail,
  FileText,
  Info,
  Twitter,
  Camera
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { Canvas } from '@react-three/fiber';
import ParticleSystem from '../components/ParticleSystem';
import { LODGES_LIST, LODGES } from "../data/lodges";
import { FAQS } from "../data/faq";
import { submitForm } from "../lib/forms";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface BookingDetails {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  safariType: string;
}

interface SpeciesPrice {
  species: string;
  price: string;
}

const SPECIES_PRICES: SpeciesPrice[] = [
  { species: "African wild cat", price: "POA" },
  { species: "Aardwolf", price: "POA" },
  { species: "Aardvark", price: "POA" },
  { species: "Baboon", price: "$300" },
  { species: "Bat-eared fox", price: "POA" },
  { species: "Blesbuck common", price: "$450" },
  { species: "Blesbuck white", price: "$990" },
  { species: "Blesbuck sadle back", price: "POA" },
  { species: "Blesbuck copper", price: "POA" },
  { species: "Bontebok", price: "$2,000" },
  { species: "Bushbuck", price: "$900" },
  { species: "Bushpig", price: "$990" },
  { species: "Buffalo Bulls under 40’", price: "$10,000" },
  { species: "Buffalo Bulls under 45’", price: "$12,000" },
  { species: "Buffalo Bulls over 45’", price: "POA" },
  { species: "Buffalo cows", price: "$3,000" },
  { species: "Barbary sheep", price: "$3,000" },
  { species: "Caracal", price: "$1,500" },
  { species: "Caracal with dogs", price: "$2,000" },
  { species: "Cape Eland", price: "$3,900" },
  { species: "Cape Grysbuck", price: "$3,500" },
  { species: "Civet", price: "POA" },
  { species: "Crocodile", price: "POA" },
  { species: "Dik dik", price: "POA" },
  { species: "Duiker common", price: "$450" },
  { species: "Duiker blue", price: "$3,800" },
  { species: "Duiker red", price: "POA" },
  { species: "Fallow deer", price: "$1,400" },
  { species: "Gemsbuck common", price: "$2,000" },
  { species: "Gemsbuck golden", price: "POA" },
  { species: "Gemsbuck red", price: "POA" },
  { species: "Genet small", price: "POA" },
  { species: "Genet large spotted", price: "POA" },
  { species: "Giraffe", price: "$3,500" },
  { species: "Hippopotamus", price: "POA" },
  { species: "Honey badger", price: "POA" },
  { species: "Hyena", price: "POA" },
  { species: "Impala common", price: "$450" },
  { species: "Impala black", price: "$2,350" },
  { species: "Impala sadle back", price: "POA" },
  { species: "Impala white flank", price: "POA" },
  { species: "Impala mottled", price: "POA" },
  { species: "Jackal", price: "$300" },
  { species: "Klipspringer", price: "$2,800" },
  { species: "Kudu Bull under 50’", price: "$1,950" },
  { species: "Kudu Bull under 55’", price: "$2,950" },
  { species: "Kudu Bull over 55’", price: "$4,950" },
  { species: "Lion male", price: "POA" },
  { species: "Lion female", price: "POA" },
  { species: "Nyala", price: "$2,500" },
  { species: "Oribi", price: "$4,500" },
  { species: "Ostrich", price: "$800" },
  { species: "Porcupine", price: "POA" },
  { species: "Reedbuck common", price: "$1,950" },
  { species: "Reedbuck mountain", price: "$800" },
  { species: "Red Ledgwe", price: "$2,800" },
  { species: "Red Hartebeest", price: "$1,700" },
  { species: "Rhebuck vaal", price: "$2,800" },
  { species: "Rowan", price: "POA" },
  { species: "Sable", price: "$6,000" },
  { species: "Scimitar oryx", price: "POA" },
  { species: "Serval", price: "POA" },
  { species: "Sharpe’s Grysbuck", price: "POA" },
  { species: "Springbuck common", price: "$450" },
  { species: "Springbuck black", price: "$900" },
  { species: "Springbuck white", price: "$1,700" },
  { species: "Springbuck copper", price: "$800" },
  { species: "Steenbuck", price: "$390" },
  { species: "Suni", price: "POA" },
  { species: "Tsessebe", price: "POA" },
  { species: "Vervet Monkey", price: "POA" },
  { species: "Warthog", price: "$450" },
  { species: "Waterbuck under 28’", price: "$2,000" },
  { species: "Waterbuck over 28’", price: "POA" },
  { species: "Wildebeest blue", price: "$1,300" },
  { species: "Wildebeest golden", price: "$2,800" },
  { species: "Wildebeest king", price: "POA" },
  { species: "Wildebeest white (royal)", price: "POA" },
  { species: "Wildebeest black", price: "$1,500" },
  { species: "Zebra burchell", price: "$1,300" },
  { species: "Zebra mountain", price: "POA" }
];

export default function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const lenisRef = useRef<InstanceType<typeof Lenis> | null>(null);

  // Global shared state
  const [activeModal, setActiveModal] = useState<"availability" | "safaris" | "lodges" | "experiences" | "about" | "pricing" | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [selectedLodge, setSelectedLodge] = useState(LODGES_LIST[0].name);

  const [booking, setBooking] = useState<BookingDetails>({
    destination: "Ivorytip Highlands Conservancy, South Africa",
    checkIn: "2026-07-15",
    checkOut: "2026-07-22",
    guests: "2 Adults",
    safariType: "Luxury 1:1 Safari",
  });

  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    package: "The Ivorytip Signature",
    lodge: LODGES_LIST[0].name,
    message: ""
  });

  const [isInquirySubmitted, setIsInquirySubmitted] = useState(false);

  // Lead capture pricing state
  const [isPricingUnlocked, setIsPricingUnlocked] = useState(() => {
    try {
      return localStorage.getItem("ivorytip_pricing_unlocked") === "true";
    } catch {
      return false;
    }
  });
  const [pricingEmail, setPricingEmail] = useState(() => {
    try {
      return localStorage.getItem("ivorytip_pricing_email") || "";
    } catch {
      return "";
    }
  });
  const [pricingName, setPricingName] = useState(() => {
    try {
      return localStorage.getItem("ivorytip_pricing_name") || "";
    } catch {
      return "";
    }
  });
  const [pricingSearchQuery, setPricingSearchQuery] = useState("");
  const [isVideoPreview, setIsVideoPreview] = useState<boolean>(false);

  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const diffTime = Math.max(0, checkOutDate.getTime() - checkInDate.getTime());
  const stayNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Sync scroll positioning on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
    setIsInquirySubmitted(false);
    if (location.pathname !== "/") {
      setIsVideoPreview(false);
    }
  }, [location.pathname]);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenisRef.current = lenis;
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); gsap.ticker.remove(onTick); };
  }, []);

  // Pause scroll on modal open
  useEffect(() => {
    if (activeModal) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [activeModal]);

  const handleNavClick = (sectionId?: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = sectionId ? document.getElementById(sectionId) : null;
        if (element) {
          lenisRef.current?.scrollTo(element, { duration: 1.4 });
        } else {
          lenisRef.current?.scrollTo(0, { duration: 1.4 });
        }
      }, 150);
    } else {
      const element = sectionId ? document.getElementById(sectionId) : null;
      if (element) {
        lenisRef.current?.scrollTo(element, { duration: 1.4 });
      } else {
        lenisRef.current?.scrollTo(0, { duration: 1.4 });
      }
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBookingConfirmed(true);
    await submitForm({
      formType: "booking",
      name: userName,
      email: userEmail,
      phone: userPhone,
      lodge: selectedLodge,
      package: booking.safariType,
      dates: `${booking.checkIn} to ${booking.checkOut}`,
      observers: booking.guests
    });
  };

  // Structured SEO Metadata Schemas
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Ivorytip Safaris",
    "image": "https://ivorytip-safaris-website-official.vercel.app/assets/hero_bg.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Eastern Cape",
      "addressCountry": "ZA"
    },
    "description": "Ethical South African walk-and-stalk hunting safari conservancy offering bespoke five-star lodge buyouts.",
    "telephone": "+27-71-011-6427",
    "priceRange": "$$$$",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -32.9011,
      "longitude": 25.8902
    },
    "elevation": "850m"
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ivorytip-safaris-website-official.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": location.pathname.substring(1) || "Home",
        "item": `https://ivorytip-safaris-website-official.vercel.app${location.pathname}`
      }
    ]
  };

  return (
    <div className="relative min-h-screen font-sans text-stone-100 bg-[#0d0906] overflow-x-hidden selection:bg-[#e8dec9] selection:text-[#110c08] flex flex-col scroll-smooth">
      
      {/* Dynamic SEO JSON-LD injection */}
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbsSchema)}</script>

      {/* 3D Particle System Canvas Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none mix-blend-screen opacity-35">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ParticleSystem count={600} />
        </Canvas>
      </div>

      {/* Global Header */}
      <header className="absolute top-0 left-0 right-0 z-40 max-w-8xl mx-auto px-4 md:px-12 pt-5 md:pt-12 w-full animate-fade-in transition-transform duration-700 ease-in-out" id="header-nav">
        <div className="grid grid-cols-3 items-center pb-5 md:pb-12">
          
          {/* Left: Desktop links & Hamburger */}
          <div className="flex items-center gap-6 lg:gap-10 justify-start">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden group p-2 -ml-1 text-white hover:text-amber-200 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
              id="hamburger-menu-btn"
            >
              <Menu className="w-5 h-5 transform group-hover:scale-110 transition-transform" />
            </button>
            
            <nav className="hidden lg:flex items-center gap-4 lg:gap-6 text-[10px] font-semibold tracking-[0.25em] text-white/90 uppercase">
              <Link to="/about" className="nav-link hover:text-amber-200 transition-colors cursor-pointer text-left bg-transparent border-none">About</Link>
              <Link to="/lodges" className="nav-link hover:text-amber-200 transition-colors cursor-pointer text-left bg-transparent border-none">The Lodges</Link>
              <Link to="/packages" className="nav-link hover:text-amber-200 transition-colors cursor-pointer text-left bg-transparent border-none">Packages</Link>
              <Link to="/gallery" className="nav-link hover:text-amber-200 transition-colors cursor-pointer text-left bg-transparent border-none">Gallery</Link>
              <Link to="/blog" className="nav-link hover:text-amber-200 transition-colors cursor-pointer text-left bg-transparent border-none">Stories</Link>
              <Link to="/contact" className="nav-link hover:text-amber-200 transition-colors cursor-pointer text-left bg-transparent border-none">Contact Us</Link>
            </nav>
          </div>

          {/* Center: Logo */}
          <div className="text-center">
            <Link to="/" className="inline-flex flex-col items-center gap-1 group cursor-pointer transition-all duration-300 text-center focus:outline-none bg-transparent border-none">
              <div className="h-8 md:h-12 aspect-[689/840] overflow-hidden">
                <img 
                  src="/assets/logo.png" 
                  alt="Ivorytip Safaris Logo Mark" 
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03] select-none"
                />
              </div>
              <span className="font-sans text-[9px] md:text-xs font-bold tracking-[0.2em] text-[#e8dec9] uppercase group-hover:text-white transition-colors">
                Ivorytip Safaris
              </span>
            </Link>
          </div>

          {/* Right: Booking CTA */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-3 md:gap-4 lg:gap-6">
            <button 
              onClick={() => {
                setIsVideoPreview(true);
                if (location.pathname !== "/") {
                  navigate("/");
                }
              }}
              className="btn-shimmer border border-amber-400/50 hover:border-amber-400 hover:text-amber-100 text-amber-200 p-2 sm:px-3 sm:py-2 md:px-5 md:py-2.5 text-[9px] md:text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white/5 cursor-pointer bg-black/10 backdrop-blur-sm flex items-center gap-1"
              id="preview-safari-header-btn"
              aria-label="Preview Safari Video"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button 
              onClick={() => { setActiveModal("availability"); }}
              className="btn-shimmer border border-white/70 hover:border-amber-200 hover:text-amber-100 text-white p-2 sm:px-3 sm:py-2 md:px-5 md:py-2.5 text-[9px] md:text-xs font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white/5 cursor-pointer bg-black/10 backdrop-blur-sm flex items-center justify-center gap-1"
              id="book-safari-header-btn"
              aria-label="Book Your Hunt"
            >
              <Calendar className="w-3.5 h-3.5 sm:hidden" />
              <span className="hidden sm:inline">Book Your Hunt</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Outlet for Sub-Pages */}
      <main className="relative flex-1 z-10 w-full">
        <Outlet context={{ 
          booking, 
          setBooking, 
          activeModal, 
          setActiveModal, 
          inquiryForm, 
          setInquiryForm, 
          lenisRef, 
          handleNavClick,
          isVideoPreview,
          setIsVideoPreview
        }} />
      </main>

      {/* Global Booking / Inquiry CTA Section */}
      {location.pathname !== "/contact" && (
        <section 
          id="cta-section" 
          className="relative z-20 min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat py-20 px-6 lg:px-12 w-full overflow-hidden"
          style={{ backgroundImage: `url('/assets/rhino_room_balcony.jpg')` }}
        >
          <div className="absolute inset-0 bg-stone-950/85 pointer-events-none" />
          
          <div className="max-w-4xl w-full mx-auto border border-white/10 rounded-3xl bg-black/40 backdrop-blur-xl p-8 md:p-16 relative overflow-hidden text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border-solid z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
            
            {!isInquirySubmitted ? (
              <div className="space-y-10">
                <div className="space-y-4 max-w-2xl mx-auto">
                  <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Book Your Safari</span>
                  <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase leading-none"
                  >
                    Begin Your Hunt
                  </motion.h2>
                  <p className="text-stone-300 text-xs md:text-sm font-light text-center">
                    Complete this gold-draft inquiry. Our professional hunters and lodge coordinators will contact you within 12 hours with a bespoke, customized itinerary draft.
                  </p>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsInquirySubmitted(true);
                    await submitForm({
                      formType: "cta_inquiry",
                      name: inquiryForm.name,
                      email: inquiryForm.email,
                      lodge: inquiryForm.lodge,
                      package: inquiryForm.package,
                      message: inquiryForm.message
                    });
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
                      placeholder="Francois Du Preez"
                      className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm focus:ring-1 focus:ring-amber-400/50 border-solid"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Email Address</label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      placeholder="francois@buffalo.com"
                      className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm focus:ring-1 focus:ring-amber-400/50 border-solid"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Selected Package Style</label>
                    <select
                      value={inquiryForm.package}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, package: e.target.value })}
                      className="w-full bg-white/[0.03] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm border-solid"
                    >
                      <option value="The Plains Game Classic" className="bg-[#1c130d] text-white">The Plains Game Classic ($6,500)</option>
                      <option value="The Ivorytip Signature" className="bg-[#1c130d] text-white">The Ivorytip Signature ($12,500)</option>
                      <option value="The Monarch Big Game" className="bg-[#1c130d] text-white">The Monarch Big Game ($19,500)</option>
                      <option value="Custom Bespoke Hunt" className="bg-[#1c130d] text-white">Custom Bespoke Hunt (Flexible)</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Preferred Lodge</label>
                    <select
                      value={inquiryForm.lodge}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, lodge: e.target.value })}
                      className="w-full bg-white/[0.03] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm border-solid"
                    >
                      {LODGES_LIST.map((l, idx) => (
                        <option key={idx} value={l.name} className="bg-[#1c130d] text-white">{l.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Bespoke Requests & Species List</label>
                    <textarea
                      rows={4}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder="Specify trophy lists (e.g. 1x Kudu Bull, 1x Oryx), preferred rifle configurations, or companion packages..."
                      className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm focus:ring-1 focus:ring-amber-400/50 border-solid"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-shimmer md:col-span-2 w-full bg-[#e8dec9] hover:bg-[#d9cdb4] text-[#110c08] font-bold py-4 rounded-lg uppercase tracking-wider text-xs shadow-xl cursor-pointer"
                  >
                    Send Safari Draft Inquiry
                  </button>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 space-y-6"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight">Inquiry Submitted</h3>
                <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for your draft request, <strong className="text-white">{inquiryForm.name}</strong>. A professional hunter and custom itinerary manager will contact you at <strong className="text-amber-200">{inquiryForm.email}</strong> within 12 hours with a bespoke proposal.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Global Footer */}
      <footer className="w-full bg-[#120e0a] text-stone-400 py-10 px-6 lg:px-12 border-t border-amber-900/10 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="text-white font-sans text-xl font-bold tracking-tight uppercase">
              Ivorytip Safaris
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-stone-300 font-medium">
              <Link to="/about" className="hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer">About</Link>
              <Link to="/lodges" className="hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer">The Lodges</Link>
              <Link to="/blog" className="hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer">Stories</Link>
              <Link to="/contact" className="hover:text-amber-400 transition-colors bg-transparent border-none cursor-pointer">Contact Us</Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-center w-full">
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
            <div className="text-xs text-stone-500 font-light space-y-1">
              <div className="flex flex-wrap justify-center gap-x-2">
                <span>Andre (PH): <a href="tel:+27710116427" className="text-stone-400 hover:text-amber-400 transition-colors">071 011 6427</a></span>
                <span className="hidden sm:inline">·</span>
                <span>Jenna (Accom): <a href="tel:+27710144010" className="text-stone-400 hover:text-amber-400 transition-colors">071 014 4010</a></span>
              </div>
              <div>
                <a href="mailto:ivorytipsafaris.info@gmail.com" className="text-stone-400 hover:text-amber-400 transition-colors">ivorytipsafaris.info@gmail.com</a>
              </div>
              <div>Nearest Airport: Port Elizabeth (PLZ)</div>
            </div>
            <div className="text-[11px] text-stone-600 font-light">
              © 2026 Ivorytip Safaris. All rights reserved.
            </div>
          </div>

        </div>
      </footer>

      {/* Global Shared Modals */}
      <AnimatePresence>
        {activeModal && activeModal !== "pricing" && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-[#1c130e] border border-amber-900/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-10"
              id="luxury-interactive-modal"
            >
              
              <button 
                onClick={() => {
                  setActiveModal(null);
                  setIsBookingConfirmed(false);
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer z-50"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              {activeModal === "availability" && (
                <div>
                  {!isBookingConfirmed ? (
                    <div>
                      <div className="border-b border-white/10 pb-6 mb-8 text-left">
                        <span className="text-xs uppercase tracking-widest text-amber-200">Luxury Booking Draft</span>
                        <h3 className="font-sans text-2xl md:text-3xl font-bold text-white mt-1">Review Your Exclusive Hunt</h3>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 bg-black/25 p-4 rounded-lg text-xs font-mono">
                          <div>
                            <span className="text-stone-400 block mb-1">Destination</span>
                            <span className="font-medium text-white">{booking.destination.split(",")[0]}</span>
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
                            <span className="text-stone-400 block mb-1">Select Tier</span>
                            <span className="font-medium text-amber-300">{booking.safariType}</span>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleBookingSubmit} className="space-y-6 text-left">
                        <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-400 font-serif">Hunter & Guest Registry</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Full Name</label>
                            <input 
                              type="text" 
                              required
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                              placeholder="Francois Du Preez"
                              className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm focus:ring-1 focus:ring-amber-400/50"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Email Address</label>
                            <input 
                              type="email" 
                              required
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                              placeholder="hunter@safari.com"
                              className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm focus:ring-1 focus:ring-amber-400/50"
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Phone</label>
                            <input 
                              type="tel" 
                              required
                              value={userPhone}
                              onChange={(e) => setUserPhone(e.target.value)}
                              placeholder="+1 (555) 382-9011"
                              className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm focus:ring-1 focus:ring-amber-400/50"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Selected Lodge Priority</label>
                          <select 
                            value={selectedLodge}
                            onChange={(e) => setSelectedLodge(e.target.value)}
                            className="w-full bg-white/[0.03] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm"
                          >
                            {LODGES_LIST.map((l, idx) => (
                              <option key={idx} value={l.name} className="bg-[#1c130d] text-white">{l.name}</option>
                            ))}
                          </select>
                        </div>

                        <button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-4 rounded-lg uppercase tracking-wider text-xs">
                          Confirm Secure Booking Consultation
                        </button>
                      </form>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 space-y-6">
                      <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 border-solid">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-sans text-3xl font-bold text-white uppercase tracking-tight">Expedition Reserved</h3>
                      <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                        Thank you, <strong className="text-white">{userName}</strong>. A safari coordinator has registered your request for <strong className="text-amber-200">{booking.safariType}</strong> on your selected dates. We will reach out to you within 12 hours.
                      </p>
                    </motion.div>
                  )}
                </div>
              )}

              {activeModal === "safaris" && (
                <div className="space-y-6 text-left">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs uppercase tracking-widest text-amber-200">Wilderness Expeditions</span>
                    <h3 className="font-sans text-3xl font-bold text-white mt-1">Our Premium Safari Tiers</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["Luxury 1:1 Safari", "Private Group Expedition", "Companion Observer Program"].map((type, idx) => (
                      <div key={idx} className="bg-black/20 border border-white/5 rounded-xl p-6 space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <Compass className="w-8 h-8 text-amber-400" />
                          <h4 className="font-serif text-lg font-bold text-white uppercase">{type}</h4>
                          <p className="text-stone-400 text-xs leading-relaxed font-light">
                            Our customized options are tailored for perfect comfort, private PH guiding layout, or family-based luxury lodges.
                          </p>
                        </div>
                        <button 
                          onClick={() => {
                            setBooking({ ...booking, safariType: type });
                            setActiveModal("availability");
                          }}
                          className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs uppercase font-bold mt-4"
                        >
                          Select This Style
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModal === "lodges" && (
                <div className="space-y-6 text-left">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs uppercase tracking-widest text-amber-200">Accommodations</span>
                    <h3 className="font-sans text-3xl font-bold text-white mt-1">Signature Lodges</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {LODGES_LIST.map((l, idx) => (
                      <div key={idx} className="bg-black/20 border border-white/5 rounded-xl overflow-hidden flex flex-col justify-between">
                        <img src={l.heroImage} alt={l.name} className="w-full h-48 object-cover" />
                        <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h4 className="font-serif text-base font-bold text-white uppercase">{l.name}</h4>
                            <p className="text-[11px] text-stone-400 leading-relaxed font-light">{l.tagline}</p>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedLodge(l.name);
                              setActiveModal("availability");
                            }}
                            className="w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-[#110c08] rounded-lg text-xs uppercase font-bold"
                          >
                            Inquire Lodge Stay
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModal === "experiences" && (
                <div className="space-y-6 text-left">
                  <div className="border-b border-white/10 pb-4">
                    <span className="text-xs uppercase tracking-widest text-amber-200">Wilderness Craft</span>
                    <h3 className="font-sans text-3xl font-bold text-white mt-1">Bespoke Stalk & Photography Services</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: "Ancestral Trackers", icon: Compass, desc: "Walk the dry riverbeds alongside guides carrying centuries of local track knowledge. Find kudu and cheetah stalks." },
                      { title: "Gourmet Savanna Dining", icon: Coffee, desc: "End the long hot game stalk with candlelit dining tables set up directly under massive acacia canopies." },
                      { title: "Trophy Export Admin", icon: Shield, desc: "Full-handling taxidermy oversight, state permits processing, and custom shipping handling globally included." },
                      { title: "Balloon Champagne Sunrises", icon: Sparkles, desc: "Floating weightlessly over Eastern Cape valleys in premium private balloons, popping champagne as the sun clears the horizon." },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-black/20 border border-white/5 rounded-xl p-6 flex gap-4">
                        <item.icon className="w-8 h-8 text-amber-400 shrink-0" />
                        <div className="space-y-2">
                          <h4 className="font-serif text-sm font-bold text-white uppercase">{item.title}</h4>
                          <p className="text-[11px] text-stone-400 leading-relaxed font-light">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}

        {/* Modal - Gated Pricing list */}
        {activeModal === "pricing" && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-[#1c130e] border border-amber-900/30 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-10 z-50"
              id="luxury-interactive-modal"
            >
              <button 
                onClick={() => {
                  setActiveModal(null);
                  setPricingSearchQuery("");
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer focus:outline-none"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-xs uppercase tracking-widest text-amber-200">Catalog Access</span>
                    <h3 className="font-sans text-2xl md:text-3xl font-bold text-white mt-1">2026 Hunting Price List</h3>
                  </div>
                  {isPricingUnlocked && (
                    <button
                      onClick={() => {
                        setIsPricingUnlocked(false);
                        try {
                          localStorage.removeItem("ivorytip_pricing_unlocked");
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="text-stone-400 hover:text-white text-xs underline cursor-pointer text-left font-light self-start md:self-auto"
                    >
                      Reset Email Info
                    </button>
                  )}
                </div>

                {!isPricingUnlocked ? (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto py-8 space-y-6 text-center"
                  >
                    <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-white uppercase tracking-wider">Unlock Species Pricing Catalog</h4>
                      <p className="text-stone-400 text-xs leading-relaxed font-light">
                        Enter your details below to instantly view the complete 2026 trophy fees list (for over 80 species) and daily professional guide rates.
                      </p>
                    </div>

                    <form 
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (pricingEmail.trim()) {
                          setIsPricingUnlocked(true);
                          try {
                            localStorage.setItem("ivorytip_pricing_unlocked", "true");
                            localStorage.setItem("ivorytip_pricing_email", pricingEmail);
                            localStorage.setItem("ivorytip_pricing_name", pricingName);
                          } catch (err) {
                            console.error(err);
                          }
                          await submitForm({
                            formType: "price_list_view",
                            name: pricingName,
                            email: pricingEmail,
                            message: "Pricing catalog unlock requested."
                          });
                        }
                      }}
                      className="space-y-4 text-left"
                    >
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block">Full Name</label>
                        <input 
                          type="text"
                          value={pricingName}
                          onChange={(e) => setPricingName(e.target.value)}
                          placeholder="Your Name (Optional)"
                          className="w-full bg-black/30 hover:bg-black/50 text-white border border-white/10 hover:border-white/20 rounded-md px-3.5 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors border-solid"
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block">Email Address *</label>
                        <input 
                          type="email"
                          required
                          value={pricingEmail}
                          onChange={(e) => setPricingEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-black/30 hover:bg-black/50 text-white border border-white/10 hover:border-white/20 rounded-md px-3.5 py-3 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors border-solid"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="btn-shimmer w-full bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-4 rounded-md tracking-wider text-xs uppercase text-center cursor-pointer transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Access Price List
                      </button>
                    </form>
                    
                    <div className="text-[10px] text-stone-500 font-light flex items-center justify-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-stone-600 shrink-0" />
                      <span>Private & secure. We value your confidentiality.</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-r from-amber-950/20 to-black/40 border border-amber-500/20 rounded-xl p-5 md:p-6 text-left border-solid">
                      <div className="space-y-2">
                        <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1.5 font-serif">
                          <Clock className="w-4 h-4 text-amber-400" />
                          Daily Hunting Rates
                        </h4>
                        <p className="text-[11px] text-stone-400 font-light leading-relaxed">
                          Rates apply per hunting day and include professional hunter services, tracking/skinner teams, hunting vehicles, and luxury camp hospitality.
                        </p>
                      </div>
                      <div className="flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-stone-300 font-medium font-sans">1 Client / 1 Professional Hunter (PH)</span>
                          <span className="font-mono font-bold text-amber-300 text-sm">$380 <span className="text-[10px] text-stone-400">/ day</span></span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-stone-300 font-medium font-sans">2 Clients / 1 Professional Hunter (PH)</span>
                          <span className="font-mono font-bold text-amber-300 text-sm">$300 <span className="text-[10px] text-stone-400">/ day</span></span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                        <div className="relative flex-1">
                          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input 
                            type="text"
                            value={pricingSearchQuery}
                            onChange={(e) => setPricingSearchQuery(e.target.value)}
                            placeholder="Search species (e.g. Kudu, Springbuck, Buffalo...)"
                            className="w-full bg-black/30 hover:bg-black/50 text-white border border-white/10 hover:border-white/20 rounded-md pl-10 pr-8 py-2.5 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 transition-colors border-solid text-left"
                          />
                          {pricingSearchQuery && (
                            <button
                              onClick={() => setPricingSearchQuery("")}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white text-xs cursor-pointer focus:outline-none"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                        <div className="text-right text-[11px] text-stone-400 self-center">
                          Showing <span className="text-white font-medium">{
                            SPECIES_PRICES.filter(item => 
                              item.species.toLowerCase().includes(pricingSearchQuery.toLowerCase())
                            ).length
                          }</span> of <span className="text-white font-medium">{SPECIES_PRICES.length}</span> species
                        </div>
                      </div>

                      <div className="overflow-y-auto max-h-[300px] border border-white/5 rounded-lg bg-black/20 pr-1">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-white/10 bg-black/40 text-stone-400 uppercase tracking-widest text-[9px] font-bold sticky top-0 z-10 font-sans">
                              <th className="p-3 md:p-4">Species / Animal</th>
                              <th className="p-3 md:p-4 text-right">2026 Trophy Fee (USD)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {SPECIES_PRICES.filter(item => 
                              item.species.toLowerCase().includes(pricingSearchQuery.toLowerCase())
                            ).map((item, idx) => (
                              <tr 
                                key={idx} 
                                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                              >
                                <td className="p-3 md:p-4 font-medium text-stone-200">
                                  {item.species}
                                </td>
                                <td className="p-3 md:p-4 text-right font-mono font-semibold">
                                  {item.price === "POA" ? (
                                    <span className="text-[10px] tracking-widest text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 uppercase border-solid">
                                      POA
                                    </span>
                                  ) : (
                                    <span className="text-amber-200">{item.price}</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                            {SPECIES_PRICES.filter(item => 
                              item.species.toLowerCase().includes(pricingSearchQuery.toLowerCase())
                            ).length === 0 && (
                              <tr>
                                <td colSpan={2} className="p-8 text-center text-stone-500 font-light">
                                  No species matching "{pricingSearchQuery}" found.
                                  </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-left">
                        <div className="text-[11px] text-stone-400 font-light flex items-start gap-1.5 max-w-md">
                          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <span>
                            <strong>Note:</strong> Trophy fees are payable only for animals harvested or wounded. POA (Price on Application) prices depend on the availability of trophies and permits.
                          </span>
                        </div>
                        
                        <button
                          onClick={() => {
                            const searchMsg = pricingSearchQuery 
                              ? `Inquiring about a custom hunt involving species matching "${pricingSearchQuery}".`
                              : "Inquiring about custom species selection and trophy packaging.";
                            setInquiryForm({
                              ...inquiryForm,
                              message: searchMsg
                            });
                            setActiveModal(null);
                            handleNavClick("cta-section");
                          }}
                          className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-500 text-[#110c08] uppercase text-xs tracking-wider font-bold rounded-lg transition-all cursor-pointer text-center"
                        >
                          Inquire Custom Hunt
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Component 1: Mobile Full-Screen Menu Drawer */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-50 bg-[#120e0a] flex flex-col justify-between p-6 md:p-12 text-left overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-5">
              <div>
                <span className="text-[10px] tracking-[0.45em] text-amber-200 uppercase font-medium">Ivorytip</span>
                <span className="text-[8px] tracking-[0.4em] text-stone-400 uppercase font-medium block">Safaris</span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
                aria-label="Close Mobile Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 my-auto text-left">
              <Link 
                to="/about" 
                onClick={() => setIsMenuOpen(false)} 
                className="font-serif text-3xl sm:text-4xl font-bold text-white hover:text-amber-200 uppercase tracking-wider transition-colors"
              >
                About
              </Link>
              <Link 
                to="/lodges" 
                onClick={() => setIsMenuOpen(false)} 
                className="font-serif text-3xl sm:text-4xl font-bold text-white hover:text-amber-200 uppercase tracking-wider transition-colors"
              >
                The Lodges
              </Link>
              <Link 
                to="/packages" 
                onClick={() => setIsMenuOpen(false)} 
                className="font-serif text-3xl sm:text-4xl font-bold text-white hover:text-amber-200 uppercase tracking-wider transition-colors"
              >
                Packages
              </Link>
              <Link 
                to="/gallery" 
                onClick={() => setIsMenuOpen(false)} 
                className="font-serif text-3xl sm:text-4xl font-bold text-white hover:text-amber-200 uppercase tracking-wider transition-colors"
              >
                Gallery
              </Link>
              <Link 
                to="/blog" 
                onClick={() => setIsMenuOpen(false)} 
                className="font-serif text-3xl sm:text-4xl font-bold text-white hover:text-amber-200 uppercase tracking-wider transition-colors"
              >
                Stories
              </Link>

              <Link 
                to="/contact" 
                onClick={() => setIsMenuOpen(false)} 
                className="font-serif text-3xl sm:text-4xl font-bold text-white hover:text-amber-200 uppercase tracking-wider transition-colors"
              >
                Contact Us
              </Link>
            </nav>

            <div className="border-t border-white/5 pt-8 grid grid-cols-2 gap-4 text-xs font-light text-stone-400">
              <div>
                <span className="text-[9px] uppercase tracking-widest block text-stone-500 mb-1">Geolocations</span>
                <span className="text-stone-300 block font-mono">32.9011° S, 25.8902° E</span>
                <span className="text-[10px] text-stone-500">Eastern Cape Reserve</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest block text-stone-500 mb-1">Satellite Line</span>
                <span className="text-stone-300 block font-mono">+27 (41) 980-0199</span>
                <span className="text-[10px] text-stone-500">24/7 Operations Duty</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
