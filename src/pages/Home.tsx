import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Compass, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Check, 
  Sparkles,
  Star,
  Quote,
  FileText,
  CheckCircle2,
  Camera,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  Heart,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LODGES_LIST, LODGES } from "../data/lodges";
import { HUNTING_STEPS } from "../data/hunting";
import { BLOG_POSTS } from "../data/blog";
import { FAQS } from "../data/faq";

interface OutletContextType {
  booking: any;
  setBooking: React.Dispatch<React.SetStateAction<any>>;
  activeModal: string | null;
  setActiveModal: React.Dispatch<React.SetStateAction<string | null>>;
  inquiryForm: any;
  setInquiryForm: React.Dispatch<React.SetStateAction<any>>;
  lenisRef: React.RefObject<any>;
  handleNavClick: (sectionId?: string) => void;
  isVideoPreview: boolean;
  setIsVideoPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const TESTIMONIALS_ROW_1 = [
  {
    name: "Arthur Pendelton",
    location: "Dallas, Texas",
    quote: "The tracking team under Andre is genuinely unmatched. Stalking kudu over the ridges on day three was a classic chase. Back in camp, Jenna's boma dinner was absolute perfection.",
    rating: 5,
    trophy: "Greater Kudu Stalk",
    code: "ST-09"
  },
  {
    name: "Dr. Elizabeth Vance",
    location: "Munich, Germany",
    quote: "Breathtaking sky-roof suites, intimate boma fires, and highly ethical conservation. Having giraffes drink near your morning patio is a memory my family will cherish forever.",
    rating: 5,
    trophy: "Valleys Photo Safari",
    code: "PH-12"
  },
  {
    name: "Francois Du Preez",
    location: "Pretoria, South Africa",
    quote: "I've visited dozens of Eastern Cape outfitters, but Ivorytip's tracking guides and sole-use lodge layout are superior. Clean harvest of Cape Buffalo in dense valley cover.",
    rating: 5,
    trophy: "Buffalo Signature Hunt",
    code: "ST-04"
  }
];

const TESTIMONIALS_ROW_2 = [
  {
    name: "Col. Robert Henderson",
    location: "Atlanta, Georgia",
    quote: "Walking the thorny flats on foot requires intense focus and discipline. The guides have an encyclopedic knowledge of sand spoor. The hospitality and wine cellar were stellar.",
    rating: 5,
    trophy: "Sable Antelope Expedition",
    code: "ST-15"
  },
  {
    name: "Catherine Moreau",
    location: "Paris, France",
    quote: "Deep night stargazing, conservation talks, and absolute solitude. We booked a full lodge buyout and the custom itineraries prepared by Jenna were outstanding.",
    rating: 5,
    trophy: "Wilderness Photo Tour",
    code: "PH-08"
  },
  {
    name: "J.P. van der Westhuizen",
    location: "Johannesburg, SA",
    quote: "True ethical hunting. We spent days match-walking the valleys, tracking animal patterns. The level of lodging, food, and security is world-class.",
    rating: 5,
    trophy: "Plains Game Track",
    code: "ST-22"
  }
];

export default function Home() {
  const { 
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
  } = useOutletContext<OutletContextType>();

  // Page States
  const [selectedLodgeId, setSelectedLodgeId] = useState<string>("1");
  const activeLodge = LODGES[selectedLodgeId] || LODGES_LIST[0];
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsVideoPreview(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide header when previewing video
  useEffect(() => {
    const header = document.getElementById("header-nav");
    if (!header) return;
    
    if (isVideoPreview) {
      header.classList.add("-translate-y-full");
    } else {
      header.classList.remove("-translate-y-full");
    }
  }, [isVideoPreview]);

  const activeLodgeImages = activeLodge.galleryImages && activeLodge.galleryImages.length > 0
    ? activeLodge.galleryImages
    : [
        activeLodge.heroImage,
        activeLodge.bedroomImage,
        activeLodge.bathroomImage,
        activeLodge.lifestyleImage
      ].filter(Boolean);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [selectedLodgeId]);

  const [faqCategory, setFaqCategory] = useState<string>("all");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  
  // Progressive booking journey state (1: Dates/Lodge, 2: Packages, 3: Guest details)
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [isBookingSubmitted, setIsBookingSubmitted] = useState<boolean>(false);

  const activeBlogArticles = BLOG_POSTS.slice(0, 3); // Top 3 featured articles
  const previewTimelineSteps = HUNTING_STEPS.slice(0, 4); // Teaser of timeline steps

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && lenisRef?.current) {
      lenisRef.current.scrollTo(element, { duration: 1.4 });
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#0d0906]">

      {/* 1st Section: Hero (Full Viewport) */}
      <section className="relative h-screen w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Immersive Darkened Backdrop with Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover scale-102 origin-center transition-all duration-1000 ${
              isVideoPreview ? "brightness-100" : "brightness-[0.35]"
            }`}
          >
            <source src="/assets/Ivorytip VSL.mp4" type="video/mp4" />
            <img
              src="/assets/hero_bg.jpg"
              alt="Ivorytip Safari Landscape"
              className={`w-full h-full object-cover scale-102 origin-center transition-all duration-1000 ${
                isVideoPreview ? "brightness-100" : "brightness-[0.38]"
              }`}
            />
          </video>
          <div className={`absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0906] via-[#110c08]/80 to-transparent pointer-events-none z-10 transition-opacity duration-700 ${
            isVideoPreview ? "opacity-0" : "opacity-100"
          }`} />
          <div className={`absolute inset-0 bg-gradient-to-b from-[#110c08]/60 via-transparent to-transparent pointer-events-none z-10 transition-opacity duration-700 ${
            isVideoPreview ? "opacity-0" : "opacity-100"
          }`} />
        </div>

        {/* Backdrop overlay listener to exit preview mode when clicking anywhere */}
        {isVideoPreview && (
          <div 
            onClick={() => setIsVideoPreview(false)}
            className="absolute inset-0 z-30 cursor-pointer"
            title="Click anywhere to exit preview"
          />
        )}

        {/* Exit Preview Floating Button */}
        <AnimatePresence>
          {isVideoPreview && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 right-6 md:right-12 z-40 pointer-events-auto"
            >
              <button 
                onClick={() => setIsVideoPreview(false)}
                className="px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/10 hover:border-amber-400 text-stone-200 hover:text-amber-300 transition-colors cursor-pointer text-[10px] uppercase tracking-widest font-extrabold shadow-2xl"
              >
                Close Preview
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Content */}
        <main className="relative z-30 max-w-8xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full pt-24 md:pt-32 pointer-events-none">
          <AnimatePresence>
            {!isVideoPreview && (
              <motion.div 
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 pointer-events-auto"
              >
                <motion.h2
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.1em] md:tracking-[0.15em] text-white uppercase drop-shadow-2xl leading-none"
                >
                  IVORYTIP SAFARIS
                </motion.h2>

                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                  }}
                  className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed"
                >
                  Embark on authentic walk-and-stalk hunting trips in the Eastern Cape of South Africa. Hosted by Andre & Jenna Crous, we offer fair-chase hunts on our managed farm and private concessions, combined with comfortable lodge hospitality.
                </motion.p>
                
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                  }}
                  className="pt-4 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
                >
                  <button 
                    onClick={() => scrollToSection("lodges-section")}
                    className="btn-shimmer w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-8 rounded-lg tracking-wider text-xs uppercase cursor-pointer"
                  >
                    Explore Our Hunting Packages
                  </button>
                  <button 
                    onClick={() => scrollToSection("about-hosts")}
                    className="w-full sm:w-auto px-8 py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white rounded-lg text-xs uppercase font-bold tracking-wider cursor-pointer"
                  >
                    Meet Andre & Jenna
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Component 2: Quick Reserve Glassmorphic Widget */}
        <AnimatePresence>
          {!isVideoPreview && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30, transition: { duration: 0.4 } }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-30 w-full px-4 md:px-12 pb-6 md:pb-8 flex-none"
            >
              <div className="max-w-5xl mx-auto bg-black/45 backdrop-blur-xl border border-white/10 p-4 md:p-6 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.65)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 items-end text-left border-solid">
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-amber-200 block">Private Lodge</label>
                  <select
                    value={booking.destination}
                    onChange={(e) => setBooking({ ...booking, destination: e.target.value })}
                    className="w-full bg-white/[0.04] text-white border border-white/10 rounded-lg px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-amber-400/50 border-solid"
                  >
                    <option value="Kikuyu Lodge" className="bg-[#1c130d] text-white">Kikuyu Lodge (Highland Stone)</option>
                    <option value="Emanzini Lodge" className="bg-[#1c130d] text-white">Emanzini Lodge (River Wetland)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-amber-200 block">Check In Date</label>
                  <input 
                    type="date"
                    value={booking.checkIn}
                    onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })}
                    className="w-full bg-white/[0.04] text-white border border-white/10 rounded-lg px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-amber-400/50 border-solid [color-scheme:dark]"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] uppercase font-bold tracking-widest text-amber-200 block">Observers / Hunters</label>
                  <select
                    value={booking.guests}
                    onChange={(e) => setBooking({ ...booking, guests: e.target.value })}
                    className="w-full bg-white/[0.04] text-white border border-white/10 rounded-lg px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-amber-400/50 border-solid"
                  >
                    <option value="1 Hunter" className="bg-[#1c130d] text-white">1 Hunter (1:1 PH)</option>
                    <option value="2 Hunters" className="bg-[#1c130d] text-white">2 Hunters (2:1 PH)</option>
                    <option value="1 Hunter, 1 Observer" className="bg-[#1c130d] text-white">1 Hunter, 1 Observer</option>
                    <option value="Family Buyout (4+ Guests)" className="bg-[#1c130d] text-white">Family Lodge Buyout</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setInquiryForm({
                      ...inquiryForm,
                      lodge: booking.destination
                    });
                    setActiveModal("availability");
                  }}
                  className="btn-shimmer w-full bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-4 rounded-lg uppercase tracking-wider text-xs shadow-md cursor-pointer transition-colors text-center"
                >
                  Book Lodge Stay
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* 3rd Section: Luxury Accommodation Redesign (Tab System) */}
      <section id="lodges-section" className="relative z-20 py-24 md:py-32 bg-[#120e0a] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Our Lodges</span>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase">Lodge Accommodations</h2>
            <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed text-center">
              Our lodges are built exclusively for single parties. Click tabs below to swap between our highland stone lodge and our river wetland retreat.
            </p>
          </div>

          {/* Modular Tabs Selector */}
          <div className="flex justify-center border-b border-white/10 pb-0.5">
            <div className="flex gap-8 md:gap-12">
              {LODGES_LIST.map(lodge => (
                <button
                  key={lodge.id}
                  onClick={() => setSelectedLodgeId(lodge.id)}
                  className={`py-4 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 cursor-pointer relative ${
                    selectedLodgeId === lodge.id
                      ? "text-amber-400 border-b-2 border-amber-400"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {lodge.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLodgeId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Left Column: Details & Specs */}
              <div className="lg:col-span-5 flex flex-col gap-6 justify-center self-center h-fit">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 inline-block border-solid">
                    {activeLodge.tag}
                  </span>
                  <h3 className="font-sans text-2xl md:text-4xl font-bold text-white uppercase tracking-tight leading-tight">
                    {activeLodge.name}
                  </h3>
                  <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">
                    {activeLodge.overview}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Link
                    to={`/lodge/${activeLodge.id}`}
                    className="btn-shimmer inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-6 rounded-lg tracking-wider text-xs uppercase cursor-pointer"
                  >
                    View Lodge Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => {
                      setInquiryForm({
                        ...inquiryForm,
                        lodge: activeLodge.name
                      });
                      setActiveModal("availability");
                    }}
                    className="px-6 py-3.5 border border-white/20 hover:border-amber-400 hover:bg-amber-400/5 text-amber-200 hover:text-amber-100 bg-black/40 rounded-lg text-xs uppercase font-bold tracking-wider cursor-pointer text-center"
                  >
                    Inquire Stay
                  </button>
                </div>
              </div>

              {/* Right Column: Large Interactive Image Slider */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-amber-500/15 p-2 bg-white/[0.02] border-solid shadow-xl group/slider">
                
                {/* Main Feature Image with crossfade transition */}
                <div className="relative h-96 md:h-full min-h-[420px] rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${selectedLodgeId}-${activeImageIdx}`}
                      src={activeLodgeImages[activeImageIdx]}
                      alt={activeLodge.name}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="w-full h-full object-cover brightness-[0.7] group-hover/slider:scale-101 transition-transform duration-[2000ms] ease-out"
                    />
                  </AnimatePresence>
                  
                  {/* Ambient vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Left/Right Viewport Controls - always visible on mobile */}
                <button
                  onClick={() => setActiveImageIdx(prev => (prev - 1 + activeLodgeImages.length) % activeLodgeImages.length)}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-white/10 text-white hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all cursor-pointer opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 focus:outline-none z-20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveImageIdx(prev => (prev + 1) % activeLodgeImages.length)}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 border border-white/10 text-white hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all cursor-pointer opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 focus:outline-none z-20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4.5 h-4.5" />
                </button>



                {/* Right Bottom Dots Selector */}
                <div className="absolute bottom-8 right-8 flex gap-2 z-20">
                  {activeLodgeImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeImageIdx === idx ? "bg-amber-400 w-5" : "bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* 4th Section: Hunting Experience Timeline Teaser */}
      <section className="relative z-20 py-24 md:py-32 bg-gradient-to-b from-[#120e0a] to-[#0e0a07] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Scroll Timeline</span>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-tight">
              The Stalk Chronology
            </h2>
            <p className="text-stone-300 text-sm font-light leading-relaxed">
              We guide you through 10 detailed steps, from pre-departure ballistic configuration to the final fireside toasts around the campfire. Discover the rhythm of walk-and-stalk hunting. Click each stage to expand its details.
            </p>
          </div>

          {/* Timeline teaser slider/cards */}
          <div className="lg:col-span-7 space-y-4">
            {previewTimelineSteps.map((step) => {
              const isExpanded = expandedFaq === `step-${step.stepNumber}`;
              return (
                <div 
                  key={step.stepNumber}
                  onClick={() => setExpandedFaq(isExpanded ? null : `step-${step.stepNumber}`)}
                  className="bg-black/20 border border-white/5 rounded-xl p-5 hover:border-amber-500/20 transition-all cursor-pointer space-y-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-amber-400 flex items-center justify-center font-mono text-xs font-bold text-amber-400 shrink-0">
                        {step.stepNumber}
                      </div>
                      <div className="text-left">
                        <h4 className="font-sans text-base md:text-lg font-bold text-white uppercase tracking-wider">{step.title}</h4>
                        <span className="text-[10px] text-amber-200/60 uppercase font-mono font-medium sm:hidden block mt-0.5">{step.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-amber-200/60 uppercase font-mono font-medium hidden sm:block shrink-0">{step.duration}</span>
                      <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${isExpanded ? "rotate-180 text-amber-400" : ""}`} />
                    </div>
                  </div>
                  
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden text-stone-300 text-xs font-light leading-relaxed pt-2 border-t border-white/5 space-y-3"
                      >
                        <p>{step.shortDesc}</p>
                        <p className="text-stone-400 text-[11px] italic">{step.longDesc}</p>
                        {step.tip && (
                          <div className="bg-amber-500/5 border border-amber-500/10 p-2.5 rounded text-[11px] text-amber-300/95">
                            <strong>Andre & Jenna's advice:</strong> {step.tip}
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5th Section: Meet Andre & Jenna Crous (Warmth & Trust Redesign) */}
      <section id="about-hosts" className="relative z-20 py-24 md:py-32 bg-[#0e0a07] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Hunting Hospitality</span>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight text-center">Meet Your Hosts</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            
            {/* Left: Asymmetric Double Portraits with central overlay */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative">
              
              {/* Andre Card */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/10 p-2 bg-white/[0.01] shadow-xl group lg:translate-y-[-12px] border-solid">
                <div className="relative h-[280px] sm:h-[360px] md:h-[400px] overflow-hidden rounded-xl">
                  <img 
                    src="/assets/Andre 1.jpg" 
                    alt="Andre Crous - PH Guide" 
                    className="w-full h-full object-cover brightness-[0.75] group-hover:scale-103 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 text-left">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-amber-300 block mb-0.5">Professional Hunter</span>
                    <span className="text-xs font-semibold text-white uppercase block">Andre Crous</span>
                  </div>
                </div>
              </div>

              {/* Jenna Card */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/10 p-2 bg-white/[0.01] shadow-xl group lg:translate-y-[12px] border-solid">
                <div className="relative h-[280px] sm:h-[360px] md:h-[400px] overflow-hidden rounded-xl">
                  <img 
                    src="/assets/Jenna 1.jpg" 
                    alt="Jenna Crous - Hostess" 
                    className="w-full h-full object-cover brightness-[0.8] group-hover:scale-103 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 text-left">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-amber-300 block mb-0.5">Savanna Hospitality</span>
                    <span className="text-xs font-semibold text-white uppercase block">Jenna Crous</span>
                  </div>
                </div>
              </div>



            </div>

            {/* Right: Narrative Description */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">The People Behind the Tracks</span>
              <h3 className="font-sans text-2xl md:text-4xl font-bold text-white uppercase tracking-tight leading-tight">
                An Intimate Family Welcoming
              </h3>
              <div className="h-0.5 w-16 bg-amber-500/50 rounded" />
              <p className="text-stone-300 text-xs md:text-sm font-light leading-relaxed">
                At Ivorytip Safaris, we do not operate a corporate resort. As hunting outfitters in South Africa, we host bespoke walk-and-stalk hunting trips tailored to single private parties. Andre Crous guides our fair-chase hunts on foot, utilizing years of experience in the Eastern Cape bushveld. Jenna Crous orchestrates the lodge hospitality, home-cooked local cuisine, and fireside campfire evenings.
              </p>
              <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed">
                You walk the Eastern Cape terrain with guides who know every ridge and riverbed, and you return to host tables built on trust, laughter, and shared stories of the hunt.
              </p>
              <div className="pt-2">
                <Link 
                  to="/about"
                  className="btn-shimmer inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-6 rounded-lg tracking-wider text-xs uppercase cursor-pointer"
                >
                  <span>Hear Our Family Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>



      {/* 7th Section: Guest Reviews (Immersive Marquee Layout) */}
      <section className="relative z-20 py-24 md:py-32 bg-[#120e0a] border-b border-amber-900/10 w-full overflow-hidden text-left">
        <div className="space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 px-6">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Signature Accolades</span>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase">Client Testimonials</h2>
            <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed max-w-lg mx-auto">
              Real diaries recorded in the Ivorytip registers by guests who have walked our tracks and shared our fire.
            </p>
          </div>

          {/* Infinite Marquee Container */}
          <div className="relative w-full space-y-8 select-none py-4">
            
            {/* Masking Gradient Overlays */}
            <div className="absolute top-0 left-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-[#120e0a] to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-[#120e0a] to-transparent pointer-events-none z-10" />

            {/* Row 1: Leftward Scrolling */}
            <div className="w-full overflow-hidden flex">
              <div className="animate-marquee-left flex gap-6">
                {[...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1].map((review, idx) => (
                  <div
                    key={`r1-${idx}`}
                    className="w-[300px] md:w-[400px] bg-[#1c130e]/40 border border-amber-900/15 p-6 md:p-8 rounded-2xl relative flex flex-col justify-between gap-6 hover:border-amber-500/20 transition-all duration-300 shadow-xl shrink-0"
                  >
                    <Quote className="w-10 h-10 text-amber-500/10 absolute top-6 right-6 pointer-events-none" />
                    <div className="space-y-4">
                      <div className="flex gap-1 justify-start">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-stone-300 text-xs md:text-sm leading-relaxed italic font-light">
                        "{review.quote}"
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-4 flex items-center justify-between border-solid">
                      <div>
                        <h4 className="text-white text-xs md:text-sm font-semibold">{review.name}</h4>
                        <span className="text-[9px] text-stone-400 block uppercase tracking-wider mt-0.5">{review.location}</span>
                      </div>
                      <div className="bg-black/35 px-2.5 py-1 rounded border border-white/5 text-[9px] text-amber-300 font-mono border-solid">
                        {review.trophy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Rightward Scrolling */}
            <div className="w-full overflow-hidden flex">
              <div className="animate-marquee-right flex gap-6">
                {[...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2].map((review, idx) => (
                  <div
                    key={`r2-${idx}`}
                    className="w-[300px] md:w-[400px] bg-[#1c130e]/40 border border-amber-900/15 p-6 md:p-8 rounded-2xl relative flex flex-col justify-between gap-6 hover:border-amber-500/20 transition-all duration-300 shadow-xl shrink-0"
                  >
                    <Quote className="w-10 h-10 text-amber-500/10 absolute top-6 right-6 pointer-events-none" />
                    <div className="space-y-4">
                      <div className="flex gap-1 justify-start">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-stone-300 text-xs md:text-sm leading-relaxed italic font-light">
                        "{review.quote}"
                      </p>
                    </div>

                    <div className="border-t border-white/5 pt-4 flex items-center justify-between border-solid">
                      <div>
                        <h4 className="text-white text-xs md:text-sm font-semibold">{review.name}</h4>
                        <span className="text-[9px] text-stone-500 block uppercase tracking-wider mt-0.5">{review.location}</span>
                      </div>
                      <div className="bg-black/35 px-2.5 py-1 rounded border border-white/5 text-[9px] text-amber-300 font-mono border-solid">
                        {review.trophy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>
      <section className="relative z-20 py-24 md:py-32 bg-gradient-to-b from-[#120e0a] to-[#0e0a07] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Savanna Magazine</span>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight uppercase">Hunting Stalks & Stories</h2>
            <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed text-center">
              Read editorial logs authored by Andre and Jenna, detailing ballistics configuration, anti-poaching campaigns, and fireside potjie recipes.
            </p>
          </div>

          {/* Magazine Horizontal Cards List */}
          <div className="space-y-8 max-w-5xl mx-auto">
            {activeBlogArticles.map((post, idx) => (
              <Link 
                key={post.id}
                to="/blog"
                state={{ postId: post.id }}
                className="bg-[#1c130e]/30 border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:border-amber-500/15 transition-all duration-300 group relative border-solid shadow-xl md:h-64 cursor-pointer text-left"
              >
                {/* Image */}
                <div className="md:w-2/5 h-48 md:h-full overflow-hidden relative shrink-0">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out" 
                  />
                  <span className="absolute top-4 left-4 bg-black/80 border border-amber-500/20 px-3 py-1 rounded text-[9px] text-amber-300 font-bold uppercase tracking-wider border-solid">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-between flex-1 min-w-0">
                  <div className="space-y-2.5">
                    <span className="text-[10px] text-stone-400 font-mono font-medium block">
                      {post.date} &bull; {post.readTime}
                    </span>
                    <h4 className="font-sans text-lg md:text-xl font-bold text-white uppercase leading-snug group-hover:text-amber-200 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-stone-400 text-xs leading-relaxed font-light line-clamp-2 md:line-clamp-3">
                      {post.summary}
                    </p>
                    <span className="text-[8px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded uppercase inline-block border-solid">
                      Focus: {Array.isArray(post.relatedSpecies) ? post.relatedSpecies.join(" | ") : (post.relatedSpecies || "General Safari")}
                    </span>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between border-solid">
                    <span className="text-xs text-stone-300 font-medium font-sans">By {post.author}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1">
                      Read Log <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Hover progress bar */}
                <div className="w-full h-1 bg-white/5 absolute bottom-0 left-0 overflow-hidden">
                  <div className="w-0 group-hover:w-full h-full bg-amber-400 transition-all duration-700 ease-out" />
                </div>
              </Link>
            ))}
          </div>

          {/* Read All Button */}
          <div className="flex justify-center pt-4">
            <Link 
              to="/blog"
              className="bg-transparent hover:bg-amber-400 border border-amber-400 hover:border-amber-400 text-amber-400 hover:text-black text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded-lg transition-all duration-300 inline-flex items-center gap-2 cursor-pointer border-solid"
            >
              Read All Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 10th Section: FAQ Accordion Grid */}
      <section className="relative z-20 py-24 md:py-32 bg-[#120e0a] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Clear Logistics</span>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight text-center">Frequently Answered Questions</h2>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS.map(faq => (
              <div 
                key={faq.id}
                className="bg-black/20 border border-white/5 rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between text-white font-sans text-xs md:text-sm font-medium uppercase tracking-[0.15em] cursor-pointer hover:bg-white/[0.01]"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4.5 h-4.5 text-amber-400 shrink-0 transition-transform duration-300 ${
                    expandedFaq === faq.id ? "rotate-180" : ""
                  }`} />
                </button>
                <AnimatePresence initial={false}>
                  {expandedFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5 bg-black/10 text-stone-400 text-[11px] md:text-xs font-light leading-relaxed p-6"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
