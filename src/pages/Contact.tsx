import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Shield, 
  CheckCircle2, 
  Compass, 
  Clock
} from "lucide-react";
import { motion } from "motion/react";
import { LODGES_LIST } from "../data/lodges";

export default function Contact() {
  const { inquiryForm } = useOutletContext<any>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [contactData, setContactData] = useState({
    name: inquiryForm.name || "",
    email: inquiryForm.email || "",
    phone: "",
    package: inquiryForm.package || "The Ivorytip Signature",
    lodge: inquiryForm.lodge || LODGES_LIST[0].name,
    dates: "",
    hunters: 1,
    observers: 0,
    message: inquiryForm.message || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0d0906] flex flex-col items-center">
      
      {/* Immersive Hero (Full Screen Viewport) */}
      <div className="relative min-h-screen md:h-screen w-full flex flex-col justify-between overflow-hidden flex-none z-10">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/hero_bg.jpg" 
            alt="Contact Ivorytip Safaris" 
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
        <main className="relative z-30 max-w-8xl mx-auto px-8 md:px-12 flex-1 flex flex-col justify-center items-center py-12 md:py-20 text-center w-full min-h-0 pt-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 md:space-y-6">
            <span className="text-amber-200/90 text-xs md:text-sm tracking-[0.6em] font-medium uppercase block">
              Reservation Registry
            </span>
            <h2 className="font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.12em] text-white uppercase drop-shadow-2xl leading-none">
              Secure Booking Consultation
            </h2>
            <p className="text-stone-300 text-xs md:text-sm font-light tracking-wide max-w-xl mx-auto leading-relaxed">
              Register your targets, select dates, and coordinate aircraft transfers. A dedicated hunting specialist responds within 12 hours.
            </p>
          </div>
        </main>

        {/* Scroll Indicator */}
        <div className="relative z-30 pb-12 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.4em] text-stone-500 font-semibold">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500/60 to-transparent" />
        </div>
      </div>

      {/* Split layout: Form vs Coordinates */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10 text-left">
        
        {/* Left Side: Form */}
        <div className="lg:col-span-7 bg-[#1c130e]/40 border border-amber-900/15 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-xl border-solid shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

          {!isSubmitted ? (
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block">Expedition Form</span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white uppercase tracking-tight">Register Registry Request</h3>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="Francois Du Preez"
                    className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm focus:ring-1 focus:ring-amber-400/50 border-solid"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm focus:ring-1 focus:ring-amber-400/50 border-solid"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Phone</label>
                  <input
                    type="tel"
                    required
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    placeholder="+1 (555) 302-8902"
                    className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm focus:ring-1 focus:ring-amber-400/50 border-solid"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Target Dates / Months</label>
                  <input
                    type="text"
                    required
                    value={contactData.dates}
                    onChange={(e) => setContactData({ ...contactData, dates: e.target.value })}
                    placeholder="e.g. July 15-22, 2026"
                    className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm focus:ring-1 focus:ring-amber-400/50 border-solid"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Observers (Non-Hunters)</label>
                  <select
                    value={contactData.observers}
                    onChange={(e) => setContactData({ ...contactData, observers: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white/[0.03] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm border-solid"
                  >
                    <option value={0} className="bg-[#1c130d] text-white">No Observers</option>
                    <option value={1} className="bg-[#1c130d] text-white">1 Companion Observer</option>
                    <option value={2} className="bg-[#1c130d] text-white">2 Observers</option>
                    <option value={3} className="bg-[#1c130d] text-white">3+ Observers</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Selected Lodge Sanctuary</label>
                  <select
                    value={contactData.lodge}
                    onChange={(e) => setContactData({ ...contactData, lodge: e.target.value })}
                    className="w-full bg-white/[0.03] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm border-solid"
                  >
                    {LODGES_LIST.map((l, i) => (
                      <option key={i} value={l.name} className="bg-[#1c130d] text-white">{l.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Selected Package Style</label>
                  <select
                    value={contactData.package}
                    onChange={(e) => setContactData({ ...contactData, package: e.target.value })}
                    className="w-full bg-white/[0.03] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm border-solid"
                  >
                    <option value="The Plains Game Classic" className="bg-[#1c130d] text-white">The Plains Game Classic ($6,500)</option>
                    <option value="The Ivorytip Signature" className="bg-[#1c130d] text-white">The Ivorytip Signature ($12,500)</option>
                    <option value="The Monarch Big Game" className="bg-[#1c130d] text-white">The Monarch Big Game ($19,500)</option>
                    <option value="Custom Bespoke Hunt" className="bg-[#1c130d] text-white">Custom Bespoke Hunt (Flexible)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-amber-200">Bespoke Requests & Target Species List</label>
                  <textarea
                    rows={5}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Specify exact animals (e.g. 1x Kudu, 1x Oryx), required caliber hires, dietary preferences, or flight charter logistics..."
                    className="w-full bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/10 rounded-md px-3.5 py-3 text-xs md:text-sm focus:ring-1 focus:ring-amber-400/50 border-solid"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-shimmer md:col-span-2 w-full bg-amber-400 hover:bg-amber-500 text-[#110c08] font-bold py-4 rounded-lg uppercase tracking-wider text-xs shadow-xl cursor-pointer"
                >
                  Register Secure Booking Request
                </button>

              </form>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-6"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 border-solid">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight">Expedition Logged</h3>
              <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{contactData.name}</strong>. A reservations specialist and guide coordinator has registered your request for <strong className="text-amber-200">{contactData.package}</strong>. We will coordinate dates and email you at <strong className="text-white">{contactData.email}</strong> within 12 hours.
              </p>
            </motion.div>
          )}
        </div>

        {/* Right Side: Coordinates & Contacts */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-[120px]">
          
          {/* Coordinates Map Card */}
          <div className="bg-[#1c130e] border border-amber-900/30 rounded-2xl p-6 md:p-8 space-y-6 border-solid shadow-2xl">
            <h4 className="font-display text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-400" />
              Outpost Location
            </h4>
            
            <div className="space-y-4 text-xs font-light text-stone-300">
              <div className="flex items-center justify-between">
                <span>Territory</span>
                <span className="font-semibold text-white">Eastern Cape, South Africa</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Access</span>
                <span className="font-semibold text-white">2 hours from Gqeberha (Port Elizabeth)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sanctuary Elevation</span>
                <span className="font-mono text-white">850 Meters</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Private Air Runway</span>
                <span className="font-mono text-white">1,200m Grass Runway</span>
              </div>
            </div>

            <div className="h-px bg-white/15" />

            {/* Direct Contact Blocks */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Satellite Communication</span>
                  <span className="text-xs text-stone-200 font-mono">+27 (41) 980-0199</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-amber-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block">Director of Booking</span>
                  <span className="text-xs text-stone-200 font-mono">brent.streamlinedigital@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines and Response Time SLA */}
          <div className="bg-black/20 border border-white/5 rounded-2xl p-6 text-left space-y-4 border-solid">
            <h4 className="text-xs uppercase tracking-widest text-amber-200 font-bold flex items-center gap-1.5">
              <Clock className="w-4.5 h-4.5 text-amber-400" />
              Response SLA
            </h4>
            <p className="text-stone-300 text-xs font-light leading-relaxed">
              We respond to all verified reservations registry drafts within **12 hours**. If coordinating private charter arrivals or complex trophy lists, please provide flight registrations or caliber requirements in the message section.
            </p>
            <div className="h-px bg-white/5 my-2" />
            <div className="text-[10px] text-stone-400 font-light flex items-center gap-2">
              <Shield className="w-4 h-4 text-stone-500 shrink-0" />
              <span>Full confidentiality and private data protection.</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
