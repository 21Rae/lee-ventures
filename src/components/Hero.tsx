import React, { useState } from "react";
import { 
  ShieldAlert, ChevronRight, Award, Flame, Ship, HardHat, Shield, 
  Eye, Wind, Activity, Key, LifeBuoy, Heart, Headphones, AlertTriangle, 
  MapPin, CheckCircle, UserCheck, Star, Sparkles, BookOpen 
} from "lucide-react";

interface HeroProps {
  setActiveTab: (tab: string) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  onRegisterSuccess: (profile: { firstName: string; lastName: string; email: string }) => void;
  userProfile: { firstName: string; lastName: string; email: string } | null;
}

export default function Hero({ 
  setActiveTab, 
  setSelectedCategory, 
  setSearchQuery,
  onRegisterSuccess,
  userProfile
}: HeroProps) {
  // Modal states
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  // Newsletter state
  const [newsForm, setNewsForm] = useState({ firstName: "", lastName: "", email: "" });
  const [newsSubmitted, setNewsSubmitted] = useState(false);

  // Registration form state
  const [regForm, setRegForm] = useState({ firstName: "", lastName: "", email: "", companyName: "", phone: "" });

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsForm.email) {
      setNewsSubmitted(true);
      setTimeout(() => {
        setNewsForm({ firstName: "", lastName: "", email: "" });
        setNewsSubmitted(false);
      }, 5000);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regForm.firstName && regForm.lastName && regForm.email) {
      onRegisterSuccess({
        firstName: regForm.firstName,
        lastName: regForm.lastName,
        email: regForm.email
      });
      setIsRegisterOpen(false);
    }
  };

  const categoriesList = [
    { name: "FALL PROTECTION", category: "Industrial Safety & Security", search: "Fall Protection", icon: <Shield className="text-[#cf2027]" size={28} /> },
    { name: "WORK GLOVES", category: "Welding & Fabrication Safety", search: "Hand Protection", icon: <Flame className="text-[#cf2027]" size={28} /> },
    { name: "SAFETY EYEWEAR", category: "Personal Protective Equipment", search: "Eye Protection", icon: <Eye className="text-[#cf2027]" size={28} /> },
    { name: "RESPIRATORY", category: "Personal Protective Equipment", search: "Respiratory Protection", icon: <Wind className="text-[#cf2027]" size={28} /> },
    { name: "GAS DETECTION", category: "Industrial Safety & Security", search: "Gas Detection", icon: <Activity className="text-[#cf2027]" size={28} /> },
    { name: "PROTECTIVE APPAREL", category: "Personal Protective Equipment", search: "Body Protection", icon: <HardHat className="text-[#cf2027]" size={28} /> },
    { name: "HEAD PROTECTION", category: "Personal Protective Equipment", search: "Head Protection", icon: <Award className="text-[#cf2027]" size={28} /> },
    { name: "FIRST AID SOLUTIONS", category: "Personal Protective Equipment", search: "First Aid", icon: <Heart className="text-[#cf2027]" size={28} /> },
    { name: "HEARING PROTECTION", category: "Personal Protective Equipment", search: "hearing", icon: <Headphones className="text-[#cf2027]" size={28} /> },
    { name: "LOCKOUT TAGOUT", category: "Industrial Safety & Security", search: "LOTO", icon: <Key className="text-[#cf2027]" size={28} /> },
  ];

  const brandsList = [
    { name: "PYRAMEX", search: "Pyramex" },
    { name: "FALLTECH", search: "FallTech" },
    { name: "3M SAFETY", search: "3M" },
    { name: "GGS WELDING", search: "GGS" }
  ];

  const handleCategoryClick = (cat: typeof categoriesList[0]) => {
    setSelectedCategory(cat.category);
    setSearchQuery(cat.search);
    setActiveTab("products");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrandClick = (brandName: string) => {
    setSearchQuery(brandName);
    setSelectedCategory("All Products");
    setActiveTab("products");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-zinc-800 font-sans">
      
      {/* 1. TOP BOLD BANNER (Ritz style dark alert teaser) */}
      <div className="w-full bg-[#1e1e1e] text-white py-3 px-4 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2.5 text-xs font-black uppercase tracking-wider">
            <span className="bg-[#cf2027] text-white px-2 py-0.5 text-[10px] rounded font-mono animate-pulse">ALERT</span>
            <span>YOUR PROTECTION, OUR PRIORITY • SOLAS MARINE & ANSI INDUSTRIAL COMPLIANCE IS MANDATED</span>
          </div>
          <button 
            onClick={() => setActiveTab("contact")}
            className="text-[11px] font-bold text-white hover:text-[#cf2027] flex items-center gap-1 uppercase tracking-widest transition-colors cursor-pointer"
          >
            CONTACT OUR REPS TODAY <ChevronRight size={14} className="text-[#cf2027]" />
          </button>
        </div>
      </div>

      {/* 2. HERO SPLIT ROW (Founder's Story vs BullShark Gloves and Falltech) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (65% Span 8) - Ritz Peter Merkl style Founder Quote card */}
          <div className="lg:col-span-8 bg-zinc-950 text-white p-8 sm:p-12 rounded-lg relative overflow-hidden flex flex-col justify-between shadow-lg group border border-zinc-800">
            {/* Dark abstract overlay mimicking an industrial container structure */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,rgba(207,32,39,0.35),transparent_70%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-900 rounded-full translate-x-12 -translate-y-12 opacity-30 blur-2xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10 max-w-xl">
              <span className="text-xs text-[#cf2027] font-black uppercase tracking-[0.3em] font-mono block">
                Since 1998 • Family Owned Business
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase leading-[1.1] text-zinc-100 italic font-serif">
                “SINCE 1998, WE'VE BEEN A FAMILY OWNED BUSINESS WITH A PASSION FOR PROTECTING HARD-WORKING PROFESSIONALS.”
              </h2>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white uppercase tracking-widest font-mono">
                  — FOUNDER, LEE VENTURES LTD
                </p>
                <p className="text-xs text-zinc-400 uppercase tracking-widest font-mono">
                  Port Harcourt Logistics HQ & Gulf of Guinea Supply Chain
                </p>
              </div>
            </div>

            <div className="pt-8 sm:pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
              {/* Decorative Safety badge */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-sm">
                <div className="bg-[#cf2027] text-white p-1.5 rounded-full">
                  <Shield size={16} />
                </div>
                <div className="text-[10px] uppercase font-mono tracking-wider">
                  <p className="font-bold text-white">NIGERIA 280</p>
                  <p className="text-zinc-400">Compliance Standard</p>
                </div>
              </div>

              <button
                onClick={() => setIsStoryOpen(true)}
                className="bg-[#fedd00] hover:bg-[#e6c800] text-black font-extrabold py-3.5 px-8 uppercase text-xs tracking-widest rounded transition-all duration-200 cursor-pointer shadow-md"
              >
                OUR STORY &gt;
              </button>
            </div>
          </div>

          {/* Right Column (35% Span 4) - Two secondary banners */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Banner 1: Bullshark Gloves */}
            <div className="bg-zinc-100 p-6 rounded-lg flex flex-col justify-between h-[210px] border border-zinc-200 hover:border-[#cf2027]/30 transition-colors duration-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-full opacity-10 pointer-events-none bg-[radial-gradient(circle,rgba(207,32,39,0.2),transparent)]" />
              <div className="space-y-2">
                <span className="text-[10px] text-[#cf2027] font-extrabold uppercase tracking-widest block font-mono">BULLSHARK SERIES</span>
                <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight leading-tight">
                  WELDING & WORK GLOVES: INNOVATION MEETS QUALITY
                </h3>
              </div>
              <button 
                onClick={() => handleBrandClick("GGS")}
                className="text-xs font-black text-[#cf2027] hover:text-black flex items-center gap-1 uppercase tracking-widest mt-4 transition-colors cursor-pointer"
              >
                SHOP TODAY &gt;
              </button>
            </div>

            {/* Banner 2: Fall Protection */}
            <div className="bg-zinc-900 text-white p-6 rounded-lg flex flex-col justify-between h-[210px] border border-zinc-800 hover:border-[#cf2027]/30 transition-colors duration-200 shadow-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-36 h-full opacity-10 pointer-events-none bg-[radial-gradient(circle,rgba(254,221,0,0.1),transparent)]" />
              <div className="space-y-2">
                <span className="text-[10px] text-[#fedd00] font-extrabold uppercase tracking-widest block font-mono">FALLTECH COMPLIANT</span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight leading-tight">
                  FALL PROTECTION: OVER 40 YEARS OF SAFETY EXPERTISE
                </h3>
              </div>
              <button 
                onClick={() => handleBrandClick("FallTech")}
                className="text-xs font-black text-[#fedd00] hover:text-white flex items-center gap-1 uppercase tracking-widest mt-4 transition-colors cursor-pointer"
              >
                SHOP TODAY &gt;
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. POPULAR CATEGORIES GRID (Ritz Style layout) */}
      <section className="bg-zinc-50 border-y border-zinc-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="border-l-4 border-[#cf2027] pl-3">
            <h3 className="text-xl font-black text-zinc-900 uppercase tracking-tight">
              POPULAR CATEGORIES
            </h3>
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-mono mt-0.5">
              Click any department to filter our certified safety inventory
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categoriesList.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => handleCategoryClick(cat)}
                className="bg-white border border-zinc-200 rounded p-5 flex flex-col items-center text-center justify-between h-36 hover:border-[#cf2027] hover:shadow-md cursor-pointer transition-all duration-200 group"
              >
                <div className="p-3 bg-zinc-50 rounded-full border border-zinc-100 group-hover:bg-[#cf2027]/5 group-hover:border-[#cf2027]/20 transition-all duration-200">
                  {cat.icon}
                </div>
                <span className="text-[11px] font-black text-zinc-800 uppercase tracking-tight group-hover:text-[#cf2027] transition-colors">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE ALTERNATING SERVICES SECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Section 1: Real People */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3.5 py-1.5 bg-[#cf2027]/5 border border-[#cf2027]/20 text-[#cf2027] text-[10px] uppercase tracking-[0.2em] font-mono font-bold rounded-sm">
              REAL PEOPLE. REAL SOLUTIONS.
            </div>
            <h3 className="text-3xl font-extrabold text-zinc-900 uppercase tracking-tight leading-none">
              WHEN IT COMES TO SAFETY, YOU NEED A TRUSTED PARTNER
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              At Lee Ventures, we do more than ship boxes of PPE. We provide personal consultations, tailored bulk pricing models, and strict regulatory compliance verification. Our safety representatives reside locally right in Port Harcourt, ready to support onshore and offshore drilling platforms with same-day emergency logistics.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab("contact")}
                className="bg-[#fedd00] hover:bg-[#e6c800] text-black font-extrabold py-3.5 px-8 uppercase text-xs tracking-widest rounded transition-all duration-200 cursor-pointer shadow"
              >
                GET IN TOUCH TODAY &gt;
              </button>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-zinc-100">
            <img 
              src="/assets/images/safety_solutions_1783008492761.jpg" 
              alt="Real safety specialists" 
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xs font-mono uppercase tracking-wider font-bold">Lee Ventures Safety HQ</p>
              <p className="text-[10px] text-zinc-300">Onyejieke Plaza Safety Crew</p>
            </div>
          </div>
        </div>

        {/* Section 2: Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 relative aspect-video rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-zinc-100">
            <img 
              src="/assets/images/safety_boots_1783008310567.jpg" 
              alt="Safety Training Services" 
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xs font-mono uppercase tracking-wider font-bold">Rig Sizing & Compliance audits</p>
              <p className="text-[10px] text-zinc-300">Certified OSHA safety instruction</p>
            </div>
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <div className="inline-block px-3.5 py-1.5 bg-[#cf2027]/5 border border-[#cf2027]/20 text-[#cf2027] text-[10px] uppercase tracking-[0.2em] font-mono font-bold rounded-sm">
              OUR SERVICES
            </div>
            <h3 className="text-3xl font-extrabold text-zinc-900 uppercase tracking-tight leading-none">
              BEYOND PRODUCTS: ON-SITE TRAINING & AUDITS
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed font-normal">
              Safety isn't just an item in a cart, it's an operational mandate. We provide full fit testing, gas detector calibration, on-site safety audits, and offshore marine flotation safety demonstrations. We also host custom web portals for key corporate partners to simplify purchase logistics.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab("ai")}
                className="bg-[#fedd00] hover:bg-[#e6c800] text-black font-extrabold py-3.5 px-8 uppercase text-xs tracking-widest rounded transition-all duration-200 cursor-pointer shadow"
              >
                FIND OUT MORE &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Create Account Portal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3.5 py-1.5 bg-[#cf2027]/5 border border-[#cf2027]/20 text-[#cf2027] text-[10px] uppercase tracking-[0.2em] font-mono font-bold rounded-sm">
              NIGERIAN CORPORATE PORTALS
            </div>
            <h3 className="text-3xl font-extrabold text-zinc-900 uppercase tracking-tight leading-none">
              CREATE A CUSTOMER ACCOUNT TODAY
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              Ritz Safety and Lee Ventures provide convenient access to bulk discounted safety equipment, specialized RFQ response times, credit terms for accredited oilfield contractors, and full order shipment tracking throughout Rivers State and nationwide.
            </p>
            <div className="pt-2">
              {userProfile ? (
                <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-xs uppercase tracking-widest font-mono">
                  <CheckCircle size={18} />
                  Corporate Account Setup Complete!
                </div>
              ) : (
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="bg-[#cf2027] hover:bg-[#b0161d] text-white font-extrabold py-3.5 px-8 uppercase text-xs tracking-widest rounded transition-all duration-200 cursor-pointer shadow-md"
                >
                  GET SET UP &gt;
                </button>
              )}
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-zinc-200 bg-zinc-100">
            <img 
              src="/assets/images/safety_warehouse_1783015380162.jpg" 
              alt="HQ Warehousing facility" 
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xs font-mono uppercase tracking-wider font-bold">Logistics & warehousing hub</p>
              <p className="text-[10px] text-zinc-300">Port Harcourt Central Warehouse</p>
            </div>
          </div>
        </div>

      </section>

      {/* 5. BRANDS MATRIX (Ritz Style brand grid) */}
      <section className="bg-zinc-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-extrabold tracking-widest uppercase font-mono text-[#fedd00]">
              OFFICIAL AUTHORIZED DISTRIBUTOR
            </h3>
            <p className="text-zinc-500 text-[11px] uppercase tracking-[0.25em] font-mono">
              Certified Brands for Construction, Marine & Fabrication Safety
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brandsList.map((br, idx) => (
              <div
                key={idx}
                className="bg-zinc-900 border border-zinc-800 rounded p-6 flex flex-col justify-between items-center text-center h-32 hover:border-[#cf2027] transition-all duration-200"
              >
                <div className="font-mono font-black text-white text-base tracking-widest">
                  {br.name}
                </div>
                <button
                  onClick={() => handleBrandClick(br.search)}
                  className="text-[10px] font-bold text-zinc-400 hover:text-[#cf2027] uppercase tracking-wider transition-colors"
                >
                  SHOP NOW &gt;
                </button>
              </div>
            ))}
          </div>

          {/* 2026 HEAT RELIEF BANNER */}
          <div className="bg-gradient-to-r from-[#cf2027] to-[#801014] text-white p-6 sm:p-8 rounded-lg flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg border border-[#cf2027]/30">
            <div className="space-y-2 text-center md:text-left">
              <span className="bg-black/40 text-white px-2.5 py-1 text-[10px] font-black tracking-widest uppercase rounded font-mono">
                2026 SEASON SAFETY
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-none">
                2026 HEAT RELIEF: BUILT FOR HIGH TEMPERATURES. DESIGNED FOR SAFETY.
              </h3>
              <p className="text-zinc-200 text-xs font-mono uppercase tracking-widest">
                Brands: All Sport • OccuNomix • Radians • Ergodyne
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery("Respiratory");
                setSelectedCategory("Personal Protective Equipment");
                setActiveTab("products");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-[#fedd00] hover:bg-[#e6c800] text-black font-black py-3 px-8 uppercase text-xs tracking-widest rounded transition-all duration-200 cursor-pointer shadow shrink-0"
            >
              CATALOG &gt;
            </button>
          </div>
        </div>
      </section>

      {/* 6. "WHY LEE VENTURES?" PARALLAX BANNER (Offshore Rig background visual) */}
      <section className="relative py-24 text-center text-white overflow-hidden bg-zinc-900">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img 
            src="/assets/images/offshore_rig_1783015395159.jpg" 
            alt="Offshore Rig Climber Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <div className="inline-block p-1.5 bg-[#cf2027] rounded-full text-white mx-auto animate-pulse">
            <Ship size={24} />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-none">
            WHY CHOOSE LEE VENTURES?
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal max-w-2xl mx-auto">
            Since 1998, we have set the benchmark for safety procurement in Port Harcourt. With an unmatched dedication to regulatory compliance, direct manufacturer partnerships, and dedicated customer portals, we are the absolute premier supplier of SOLAS, EN, and ANSI safety equipment in Nigeria.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => setActiveTab("contact")}
              className="bg-[#fedd00] hover:bg-[#e6c800] text-black font-extrabold py-3.5 px-8 uppercase text-xs tracking-widest rounded transition-all duration-200 cursor-pointer shadow"
            >
              ABOUT US &gt;
            </button>
          </div>
        </div>
      </section>

      {/* 7. STAY CONNECTED & GET UPDATES NEWSLETTER (Ritz style bright red banner) */}
      <section className="bg-[#cf2027] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-lg">
            <h3 className="text-2xl font-black uppercase tracking-tight">
              STAY CONNECTED & GET REGULATORY UPDATES
            </h3>
            <p className="text-zinc-100 text-xs font-mono uppercase tracking-widest">
              Subscribe to receive updates on safety standards, new arrivals, and regulatory alerts.
            </p>
          </div>

          <div className="w-full lg:max-w-md shrink-0">
            {newsSubmitted ? (
              <div className="bg-black/20 border border-white/20 p-5 rounded text-center text-xs font-bold uppercase tracking-wider">
                <CheckCircle className="mx-auto text-white mb-2" size={24} />
                Successfully Subscribed to Safety Alerts!
              </div>
            ) : (
              <form onSubmit={handleNewsSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={newsForm.firstName}
                  onChange={(e) => setNewsForm({ ...newsForm, firstName: e.target.value })}
                  className="w-full bg-white text-zinc-900 border-0 rounded p-2.5 text-xs font-bold focus:outline-none placeholder-zinc-400"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={newsForm.lastName}
                  onChange={(e) => setNewsForm({ ...newsForm, lastName: e.target.value })}
                  className="w-full bg-white text-zinc-900 border-0 rounded p-2.5 text-xs font-bold focus:outline-none placeholder-zinc-400"
                />
                <div className="sm:col-span-3 flex">
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={newsForm.email}
                    onChange={(e) => setNewsForm({ ...newsForm, email: e.target.value })}
                    className="flex-1 bg-white text-zinc-900 border-0 rounded-l p-2.5 text-xs font-bold focus:outline-none placeholder-zinc-400"
                  />
                  <button
                    type="submit"
                    className="bg-black hover:bg-zinc-900 text-white font-extrabold px-6 rounded-r uppercase text-xs tracking-widest transition-colors cursor-pointer"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* MODAL 1: OUR STORY DETAIL DIALOG */}
      {isStoryOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-zinc-900 rounded shadow-2xl max-w-2xl w-full border-t-4 border-[#cf2027] overflow-hidden flex flex-col justify-between">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                <h4 className="text-lg font-black uppercase text-zinc-900 tracking-tight font-mono">
                  OUR SAFETY LEGACY SINCE 1998
                </h4>
                <button 
                  onClick={() => setIsStoryOpen(false)}
                  className="text-zinc-400 hover:text-[#cf2027] font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3.5 text-zinc-600 text-xs sm:text-sm leading-relaxed max-h-[350px] overflow-y-auto pr-2">
                <p>
                  Established in <strong>1998</strong>, Lee Ventures Ltd began as a small family-owned warehouse operation in Port Harcourt, Rivers State, servicing the immediate safety equipment needs of local fabricators and oil services operators.
                </p>
                <p>
                  Recognizing the high stakes of marine offshore and gas platform operations, we committed ourselves entirely to sourcing only <strong>internationally certified, genuine safety gear</strong>. We forged partnerships with premium brands like Pyramex, FallTech, 3M, and GGS to supply head-to-toe compliance protection.
                </p>
                <p>
                  Today, operating from <strong>Onyejieke Plaza on Old Aba Road</strong>, we serve as West Africa's premium destination for industrial and marine safety hardware. Our family values dictate that we treat every worker's protection as our absolute highest calling.
                </p>
                <p className="font-bold text-[#cf2027] uppercase tracking-wider text-xs">
                  "YOUR PROTECTION IS NOT OUR JOB — IT IS OUR LIFETIME WORK."
                </p>
              </div>
            </div>

            <div className="bg-zinc-50 px-6 sm:px-8 py-4 border-t border-zinc-200 flex justify-end">
              <button
                onClick={() => setIsStoryOpen(false)}
                className="bg-[#cf2027] text-white text-xs font-black px-6 py-2 uppercase tracking-widest rounded hover:bg-black transition-colors"
              >
                CLOSE STORY
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CORPORATE REGISTRATION DIALOG */}
      {isRegisterOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-zinc-900 rounded shadow-2xl max-w-md w-full border-t-4 border-[#cf2027] overflow-hidden flex flex-col justify-between">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                <h4 className="text-lg font-black uppercase text-zinc-900 tracking-tight font-mono">
                  CREATE PORTAL ACCOUNT
                </h4>
                <button 
                  onClick={() => setIsRegisterOpen(false)}
                  className="text-zinc-400 hover:text-[#cf2027] font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={regForm.firstName}
                      onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded p-2 text-xs font-semibold text-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={regForm.lastName}
                      onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded p-2 text-xs font-semibold text-zinc-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded p-2 text-xs font-semibold text-zinc-800"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Shell Nigeria, Chevron Subcontractor"
                    required
                    value={regForm.companyName}
                    onChange={(e) => setRegForm({ ...regForm, companyName: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded p-2 text-xs font-semibold text-[#cf2027]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded p-2 text-xs font-semibold text-zinc-800"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#cf2027] hover:bg-[#b0161d] text-white text-xs font-black py-3 uppercase tracking-widest rounded transition-colors cursor-pointer shadow-md"
                  >
                    REGISTER PORTAL ACCOUNT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
