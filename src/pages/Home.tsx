import React, { useState, useEffect, useRef } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Compass, 
  ChevronDown, 
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
  Heart
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

  // Page States
  const [selectedLodgeId, setSelectedLodgeId] = useState<string>("1");
  const activeLodge = LODGES[selectedLodgeId] || LODGES_LIST[0];

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
      <section className="relative min-h-screen md:h-screen w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Immersive Darkened Backdrop */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/assets/hero_bg.jpg"
            alt="Ivorytip Safari Landscape"
            className="w-full h-full object-cover brightness-[0.38] scale-102 origin-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d0906] via-[#110c08]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#110c08]/60 via-transparent to-transparent pointer-events-none z-10" />
        </div>

        {/* Hero Content */}
        <main className="relative z-30 max-w-8xl mx-auto px-8 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full pt-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.65em] font-medium uppercase block">
              Ethical Hunting & Luxury Lodging
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.15em] text-white uppercase drop-shadow-2xl leading-none">
              IVORYTIP SAFARIS
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Step into an intimate South African conservancy where the codes of fair chase merge with five-star thatch opulence.
            </p>
            <div className="pt-4 flex gap-4">
              <button 
                onClick={() => scrollToSection("booking-section")}
                className="btn-shimmer bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-8 rounded-lg tracking-wider text-xs uppercase cursor-pointer"
              >
                Plan Your Safari
              </button>
              <button 
                onClick={() => scrollToSection("about-hosts")}
                className="px-8 py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white rounded-lg text-xs uppercase font-bold tracking-wider cursor-pointer"
              >
                Meet Andre & Jenna
              </button>
            </div>
          </div>
        </main>

        {/* Hero Quick Search Booking Engine Trigger */}
        <div className="relative z-30 w-full bg-white/[0.03] border-t border-white/10 backdrop-blur-md py-6 px-6 lg:px-12 flex-none">
          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">Sole-use Bookings</span>
              <h3 className="font-sans text-sm md:text-base font-bold text-white uppercase">Conservancy Availability is Gated</h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-stone-400 text-xs font-light">Only 3 group coordinates remain for 2026/2027 seasons.</span>
              <button 
                onClick={() => {
                  setBookingStep(1);
                  scrollToSection("booking-section");
                }}
                className="bg-amber-400 hover:bg-amber-500 text-[#110c08] text-xs font-bold uppercase tracking-wider py-2 px-5 rounded-md cursor-pointer transition-colors"
              >
                Check Calendar
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* 2nd Section: Experience Overview (Why Ivorytip) */}
      <section className="relative z-20 py-24 md:py-32 bg-gradient-to-b from-[#0d0906] to-[#120e0a] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">
              EST. 1984 &bull; EASTERN CAPE, SOUTH AFRICA
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] uppercase">
              The Raw Beauty of <span className="text-amber-200">Fair Chase</span>
            </h2>
            <div className="h-0.5 w-16 bg-amber-500/50 rounded" />
            <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed">
              We manage over 80,000 hectares of private, unfenced conservation land. Under the code of fair chase, we track entirely on foot. We target only mature, past-prime specimens, supporting biodiversity and community preservation.
            </p>
            <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed">
              This is not a corporate outfitter. It is an intimate, family-guided exploration of African soil, where deep camaraderie is forged over wood fires and tracking tracks.
            </p>
            <div className="pt-4 flex gap-4">
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-amber-200 hover:text-amber-400 text-xs uppercase font-bold tracking-wider transition-colors"
              >
                <span>Read Our Conservation Promise</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/10 p-2 bg-white/[0.02]">
            <img
              src="/assets/gallery_client_safari.jpg"
              alt="Ivorytip Safari Experience"
              className="w-full h-80 md:h-[450px] object-cover rounded-xl brightness-[0.75]"
            />
          </div>

        </div>
      </section>

      {/* 3rd Section: Luxury Accommodation Redesign (Tab System) */}
      <section className="relative z-20 py-24 md:py-32 bg-[#120e0a] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Curated Sanctuaries</span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">Luxury Accommodations</h2>
            <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed text-center">
              Our outposts are built exclusively for single parties. Click tabs below to swap between our highland stone lodge and our river wetland retreat.
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
            >
              {/* Left Column: Details */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 inline-block">
                    {activeLodge.tag}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase tracking-tight leading-tight">
                    {activeLodge.name}
                  </h3>
                  <p className="text-stone-300 text-xs md:text-sm leading-relaxed font-light">
                    {activeLodge.overview}
                  </p>
                </div>

                <div className="bg-black/30 p-5 rounded-xl border border-white/5 space-y-4">
                  <h4 className="text-xs uppercase tracking-widest text-amber-200 font-bold">Sanctuary Specs</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs font-light text-stone-400">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider block text-stone-500">Capacity</span>
                      <span className="text-stone-200 font-medium">{activeLodge.capacity}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider block text-stone-500">Service Team</span>
                      <span className="text-stone-200 font-medium">{activeLodge.staffRatio}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[9px] uppercase tracking-wider block text-stone-500">Amenities Overview</span>
                      <span className="text-stone-200 font-medium">{activeLodge.poolSpa}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link
                    to={`/lodge/${activeLodge.id}`}
                    className="btn-shimmer inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-6 rounded-lg tracking-wider text-xs uppercase cursor-pointer"
                  >
                    View Outpost Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => {
                      setInquiryForm({
                        ...inquiryForm,
                        lodge: activeLodge.name
                      });
                      scrollToSection("booking-section");
                    }}
                    className="px-6 py-3.5 border border-white/20 hover:border-amber-400 hover:bg-amber-400/5 text-amber-200 hover:text-amber-100 bg-black/40 rounded-lg text-xs uppercase font-bold tracking-wider cursor-pointer text-center"
                  >
                    Inquire Stay
                  </button>
                </div>
              </div>

              {/* Right Column: Large Interactive Image */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-amber-500/15 p-2 bg-white/[0.02]">
                <img 
                  src={activeLodge.heroImage} 
                  alt={activeLodge.name}
                  className="w-full h-80 md:h-full min-h-[350px] object-cover rounded-xl brightness-[0.7] hover:scale-101 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none rounded-2xl" />
                <div className="absolute bottom-6 left-6 text-left">
                  <span className="text-[9px] uppercase tracking-widest text-amber-300 block mb-1">Architecture</span>
                  <p className="text-white text-xs md:text-sm font-light max-w-md">{activeLodge.architecture}</p>
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
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white uppercase tracking-tight leading-tight">
              The Stalk Chronology
            </h2>
            <div className="h-0.5 w-16 bg-amber-500/50 rounded" />
            <p className="text-stone-300 text-sm font-light leading-relaxed">
              We guide you through 10 detailed steps, from pre-departure ballistic configuration to the final fireside toasts inside the stone boma. Discover the rhythm of walk-and-stalk hunting.
            </p>
            <div className="pt-2">
              <Link
                to="/packages"
                className="btn-shimmer inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-3.5 px-6 rounded-lg tracking-wider text-xs uppercase cursor-pointer"
              >
                <span>View Full 10-Step Timeline</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Timeline teaser slider/cards */}
          <div className="lg:col-span-7 space-y-4">
            {previewTimelineSteps.map((step) => (
              <div 
                key={step.stepNumber}
                className="bg-black/20 border border-white/5 rounded-xl p-5 flex items-center justify-between gap-4 hover:border-amber-500/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-amber-400 flex items-center justify-center font-mono text-xs font-bold text-amber-400 shrink-0">
                    {step.stepNumber}
                  </div>
                  <div className="text-left">
                    <h4 className="text-white text-sm font-bold uppercase tracking-wider">{step.title}</h4>
                    <p className="text-stone-400 text-xs font-light line-clamp-1 mt-0.5">{step.shortDesc}</p>
                  </div>
                </div>
                <span className="text-[10px] text-amber-200/60 uppercase font-mono font-medium hidden sm:block shrink-0">{step.duration}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5th Section: Meet Andre & Jenna Crous (Warmth & Trust) */}
      <section id="about-hosts" className="relative z-20 py-24 md:py-32 bg-[#0e0a07] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-amber-500/10 p-2 bg-white/[0.02] grid grid-cols-2 gap-4">
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=600&q=80" 
                alt="Andre Crous PH Guide" 
                className="w-full h-80 object-cover rounded-lg brightness-[0.8]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-4 left-4 text-[9px] uppercase font-bold tracking-widest text-amber-300 bg-black/80 px-2 py-0.5 rounded">Andre Crous</span>
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=600&q=80" 
                alt="Jenna Crous Host" 
                className="w-full h-80 object-cover rounded-lg brightness-[0.85]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-4 left-4 text-[9px] uppercase font-bold tracking-widest text-amber-300 bg-black/80 px-2 py-0.5 rounded">Jenna Crous</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">The People Behind the Tracks</span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white uppercase tracking-tight leading-tight">
              An Intimate Family Welcoming
            </h2>
            <div className="h-0.5 w-16 bg-amber-500/50 rounded" />
            <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed">
              At Ivorytip Safaris, we do not operate a corporate resort. Our outposts represent our family home. Andre Crous coordinates and guides the stalking stalks, bringing decades of animal tracking spoor knowledge. Jenna Crous coordinates boma dinners, stargazing campfire setup, and guest accommodations.
            </p>
            <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed">
              You walk the Eastern Cape bushveld with guides who know every valley and granite peak, and you return to host tables built on trust, laughter, and lifelong friendships.
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
      </section>

      {/* 6th Section: Photo Gallery Showcase */}
      <section className="relative z-20 py-24 md:py-32 bg-gradient-to-b from-[#0e0a07] to-[#120e0a] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold block">Stalk Moments</span>
              <h3 className="font-display text-2xl md:text-4xl font-bold text-white uppercase tracking-tight">Savanna Visual Chronicles</h3>
            </div>
            <Link
              to="/gallery"
              className="px-6 py-3 border border-white/20 hover:border-amber-400 text-white rounded-lg text-xs uppercase font-bold tracking-wider cursor-pointer transition-colors"
            >
              Enter Interactive Gallery
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Gold-Medal Kudu", src: "/assets/Kudu.jpg", cat: "Hunt" },
              { title: "Lakeside Sunset Deck", src: "/assets/Couples Retreat.jpg", cat: "Lodge" },
              { title: "Wetland Plunge Pool", src: "/assets/lodge_couples_bedroom.jpg", cat: "Lodge" }
            ].map((img, idx) => (
              <div 
                key={idx}
                className="relative rounded-xl overflow-hidden border border-white/5 p-1 bg-white/[0.01] h-64 shadow-lg group cursor-pointer"
              >
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover rounded-lg brightness-[0.75] group-hover:scale-102 transition-transform duration-500" 
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none rounded-lg" />
                <div className="absolute bottom-5 left-5 text-left pointer-events-none">
                  <span className="text-[8px] uppercase tracking-widest text-amber-300 block mb-1 font-mono">{img.cat}</span>
                  <h4 className="text-white text-sm font-semibold uppercase">{img.title}</h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7th Section: Guest Reviews (Trust Cards) */}
      <section className="relative z-20 py-24 md:py-32 bg-[#120e0a] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Signature Accolades</span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">Client Testimonials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Arthur Pendelton",
                location: "Dallas, Texas",
                quote: "The tracking team under Andre is genuinely unmatched. Stalking kudu over the ridges on day three was a classic chase. Back in camp, Jenna's boma dinner was absolute perfection.",
                rating: 5,
                trophy: "Greater Kudu Stalk"
              },
              {
                name: "Dr. Elizabeth Vance",
                location: "Munich, Germany",
                quote: "Breathtaking sky-roof suites, intimate boma fires, and highly ethical conservation. Having giraffes drink near your morning patio is a memory my family will cherish forever.",
                rating: 5,
                trophy: "Valleys Photo Safari"
              },
              {
                name: "Francois Du Preez",
                location: "Pretoria, South Africa",
                quote: "I've visited dozens of Eastern Cape outfitters, but Ivorytip's tracking guides and sole-use lodge layout are superior. Clean harvest of Cape Buffalo in dense valley cover.",
                rating: 5,
                trophy: "Buffalo Signature Hunt"
              }
            ].map((review, idx) => (
              <div
                key={idx}
                className="bg-[#1c130e]/40 border border-amber-900/15 p-8 rounded-2xl relative flex flex-col justify-between gap-6"
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
                  <div className="bg-black/35 px-2.5 py-1 rounded border border-white/5 text-[9px] text-amber-300 font-mono border-solid">
                    {review.trophy}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8th Section: Editorial Blog (Magazine Style) */}
      <section className="relative z-20 py-24 md:py-32 bg-gradient-to-b from-[#120e0a] to-[#0e0a07] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Savanna Magazine</span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">Stories & Stalking Advice</h2>
            <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed text-center">
              Read editorial logs authored by Andre and Jenna, detailing ballot configuration, anti-poaching campaigns, and fireside potjie recipes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeBlogArticles.map((post) => (
              <div 
                key={post.id}
                className="bg-[#1c130e]/30 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-amber-500/15 transition-all group"
              >
                <div className="h-52 w-full overflow-hidden relative">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                  />
                  <span className="absolute top-4 left-4 bg-black/80 border border-amber-500/20 px-3 py-1 rounded text-[9px] text-amber-300 font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-stone-400 font-mono font-medium block">{post.date} &bull; {post.readTime}</span>
                    <h4 className="font-sans text-base font-bold text-white uppercase line-clamp-2 leading-snug group-hover:text-amber-200 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-stone-400 text-xs leading-relaxed font-light line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <span className="text-xs text-stone-300 font-medium font-sans">By {post.author}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1">
                      Read Log <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9th Section: Luxury Booking Journey (Progressive Enquiry Widget) */}
      <section id="booking-section" className="relative z-20 py-24 md:py-32 bg-[#0e0a07] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Progressive Enquiry Board */}
          <div className="lg:col-span-8 bg-[#1c130e] border border-amber-900/20 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

            {!isBookingSubmitted ? (
              <div className="space-y-8 z-10 relative">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Reserve Your Outpost</span>
                  <h3 className="font-sans text-2xl md:text-4xl font-bold text-white uppercase tracking-tight leading-none">Draft Your Safari Itinerary</h3>
                  
                  {/* Step Progress Indicators */}
                  <div className="flex items-center gap-2 pt-4">
                    {[1, 2, 3].map(step => (
                      <div key={step} className="flex items-center gap-2 flex-1">
                        <div className={`h-1.5 rounded-full flex-1 transition-all ${
                          bookingStep >= step ? "bg-amber-400" : "bg-white/10"
                        }`} />
                        {step < 3 && <span className="text-[10px] text-stone-600 font-mono">0{step}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  {/* Step 1: Dates & Outpost */}
                  {bookingStep === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Check In Date</label>
                          <input 
                            type="date"
                            value={booking.checkIn}
                            onChange={(e) => setBooking({ ...booking, checkIn: e.target.value })}
                            className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-3.5 text-xs focus:ring-1 focus:ring-amber-400/50 [color-scheme:dark]"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Check Out Date</label>
                          <input 
                            type="date"
                            value={booking.checkOut}
                            min={booking.checkIn}
                            onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })}
                            className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-3.5 text-xs focus:ring-1 focus:ring-amber-400/50 [color-scheme:dark]"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Lodge Priority</label>
                          <select
                            value={inquiryForm.lodge}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, lodge: e.target.value })}
                            className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-3.5 text-xs"
                          >
                            {LODGES_LIST.map((l, i) => (
                              <option key={i} value={l.name} className="bg-[#1c130d] text-white">{l.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Guest Group</label>
                          <select
                            value={booking.guests}
                            onChange={(e) => setBooking({ ...booking, guests: e.target.value })}
                            className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-3.5 text-xs"
                          >
                            <option value="1 Adult" className="bg-[#1c130d]">1 Adult (1:1 PH)</option>
                            <option value="2 Adults" className="bg-[#1c130d]">2 Adults (1:1 or 2:1)</option>
                            <option value="3 Adults" className="bg-[#1c130d]">3 Adults</option>
                            <option value="Family Suite" className="bg-[#1c130d]">Family Suite (2 Adults, 2 Kids)</option>
                          </select>
                        </div>
                      </div>
                      <button 
                        onClick={() => setBookingStep(2)}
                        className="btn-shimmer w-full bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-4 rounded-lg uppercase tracking-wider text-xs"
                      >
                        Continue to Package Selection
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Target Package & Species */}
                  {bookingStep === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Select Curated Package</label>
                          <select
                            value={inquiryForm.package}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, package: e.target.value })}
                            className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-3.5 text-xs"
                          >
                            <option value="The Plains Game Classic" className="bg-[#1c130d]">The Plains Game Classic ($6,500)</option>
                            <option value="The Ivorytip Signature" className="bg-[#1c130d]">The Ivorytip Signature ($12,500)</option>
                            <option value="The Monarch Big Game" className="bg-[#1c130d]">The Monarch Big Game ($19,500)</option>
                            <option value="Custom Bespoke Hunt" className="bg-[#1c130d]">Custom Bespoke Hunt (Flexible)</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Hunter Guide Ratio</label>
                          <select
                            value={booking.safariType}
                            onChange={(e) => setBooking({ ...booking, safariType: e.target.value })}
                            className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-3.5 text-xs"
                          >
                            <option value="1:1 Professional Hunter" className="bg-[#1c130d]">1 PH per 1 Hunter (Standard)</option>
                            <option value="2:1 Professional Hunter" className="bg-[#1c130d]">1 PH per 2 Hunters</option>
                            <option value="Observer Only" className="bg-[#1c130d]">Non-hunting companion observer</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setBookingStep(1)}
                          className="px-6 py-4 border border-white/10 text-white rounded-lg text-xs uppercase font-bold tracking-wider cursor-pointer"
                        >
                          Back
                        </button>
                        <button 
                          onClick={() => setBookingStep(3)}
                          className="btn-shimmer flex-1 bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-4 rounded-lg uppercase tracking-wider text-xs"
                        >
                          Continue to Contact Registry
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Registry */}
                  {bookingStep === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Full Name *</label>
                          <input 
                            type="text"
                            required
                            value={inquiryForm.name}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                            placeholder="Arthur Pendelton"
                            className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-3.5 text-xs focus:ring-1 focus:ring-amber-400/50"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Email Address *</label>
                          <input 
                            type="email"
                            required
                            value={inquiryForm.email}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                            placeholder="arthur@dallaswild.com"
                            className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-3.5 text-xs focus:ring-1 focus:ring-amber-400/50"
                          />
                        </div>
                        <div className="flex flex-col gap-2 sm:col-span-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Bespoke Stalk details & Species targets</label>
                          <textarea 
                            rows={4}
                            value={inquiryForm.message}
                            onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                            placeholder="Detail target species, trophy setup goals, dietary needs, or firearm lease preferences..."
                            className="w-full bg-black/40 text-white border border-white/10 rounded-lg px-4 py-3.5 text-xs focus:ring-1 focus:ring-amber-400/50"
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setBookingStep(2)}
                          className="px-6 py-4 border border-white/10 text-white rounded-lg text-xs uppercase font-bold tracking-wider cursor-pointer"
                        >
                          Back
                        </button>
                        <button 
                          onClick={() => setIsBookingSubmitted(true)}
                          disabled={!inquiryForm.name || !inquiryForm.email}
                          className="btn-shimmer flex-1 bg-amber-400 hover:bg-amber-500 text-[#110c08] disabled:opacity-40 disabled:pointer-events-none font-bold py-4 rounded-lg uppercase tracking-wider text-xs"
                        >
                          Submit Safari Inquiry Draft
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 space-y-6 text-center"
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight">Inquiry Draft Registered</h3>
                <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed font-light">
                  Thank you, <strong className="text-white">{inquiryForm.name}</strong>. A Crous family coordinator will review your dates ({booking.checkIn} to {booking.checkOut}) and lodge priorities, sending a complete customized proposal to <strong className="text-amber-200">{inquiryForm.email}</strong> within 12 hours.
                </p>
                <button
                  onClick={() => {
                    setIsBookingSubmitted(false);
                    setBookingStep(1);
                  }}
                  className="px-6 py-3 border border-white/10 text-stone-400 hover:text-white rounded-lg text-xs uppercase font-bold"
                >
                  Send another inquiry
                </button>
              </motion.div>
            )}
          </div>

          {/* Right: FAQs adjacent to booking steps */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1c130e] border border-amber-900/30 rounded-2xl p-6 text-left space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-amber-200 font-bold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Booking FAQs
              </h4>
              <div className="space-y-4 text-xs font-light text-stone-300">
                <div className="space-y-1">
                  <span className="font-semibold text-white block">Is the conservancy fenced?</span>
                  <p className="leading-relaxed text-stone-400">No. Our 80,000 hectares feature zero interior fencing, ensuring genuine migratory chase stalks.</p>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-white block">Do you supply rifles?</span>
                  <p className="leading-relaxed text-stone-400">Yes. We have high-caliber custom rifles (.30-06, .300 Win Mag, .375 H&H) fitted with premium optics available for hire.</p>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-white block">What airport should I fly to?</span>
                  <p className="leading-relaxed text-stone-400">Fly into Chief Dawid Stuurman International (Gqeberha / Port Elizabeth), where our guides clearance representative meets you.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10th Section: FAQ Accordion Grid */}
      <section className="relative z-20 py-24 md:py-32 bg-[#120e0a] border-b border-amber-900/10 px-6 lg:px-12 w-full text-left">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold block">Clear Logistics</span>
            <h2 className="font-sans text-3xl md:text-5xl font-bold text-white uppercase tracking-tight text-center">Frequently Answered Questions</h2>
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
                  className="w-full p-6 text-left flex items-center justify-between text-white font-sans text-sm md:text-base font-bold uppercase tracking-wider cursor-pointer hover:bg-white/[0.01]"
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
                      className="border-t border-white/5 bg-black/10 text-stone-300 text-xs md:text-sm font-light leading-relaxed p-6"
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
