import React from "react";
import { MapPin, Phone, Mail, ShieldAlert, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-[#121212] text-zinc-300 font-sans text-xs border-t-4 border-[#cf2027]">
      {/* 1. Main Footer Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Brand Block (Left Column) */}
        <div className="md:col-span-4 space-y-5">
          <div 
            className="flex items-baseline font-black tracking-tight text-xl cursor-pointer select-none" 
            onClick={() => setActiveTab("home")}
          >
            <span className="text-[#cf2027] italic font-serif mr-1">Lee</span>
            <span className="text-white">Ventures</span>
            <span className="text-[#cf2027] ml-0.5">✓</span>
          </div>
          
          <p className="text-zinc-400 leading-relaxed text-[11px] max-w-sm">
            Lee Ventures Industry & Safety Ltd is West Africa's leading family-owned industrial distributor, supplying certified offshore safety gear, protective breathing solutions, and heavy construction equipment.
          </p>

          <div className="space-y-2.5 text-zinc-300 font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-[#cf2027]" />
              <a href="tel:08032560337" className="hover:text-white transition-colors">
                (800) 451-3077 / 08032560337
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-[#cf2027]" />
              <a href="mailto:leeventure001@gmail.com" className="hover:text-white transition-colors">
                leeventure001@gmail.com
              </a>
            </div>
          </div>

          {/* CONTACT US Button */}
          <button 
            onClick={() => setActiveTab("contact")}
            className="px-5 py-2.5 border border-zinc-500 hover:border-[#cf2027] hover:text-[#cf2027] text-white font-extrabold uppercase tracking-widest text-[10px] rounded-sm transition-all duration-200 cursor-pointer"
          >
            CONTACT US
          </button>

          {/* Social Icons */}
          <div className="flex items-center space-x-4 pt-1 text-zinc-400">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Facebook size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Twitter size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* Directory Links - Column 2: Ritz Safety */}
        <div className="md:col-span-2 space-y-3 md:col-start-5">
          <h4 className="font-extrabold text-white uppercase tracking-widest text-[10px] font-mono border-l-2 border-[#cf2027] pl-2">
            Ritz Safety / Lee
          </h4>
          <ul className="space-y-2 text-zinc-400 font-semibold">
            <li>
              <button onClick={() => setActiveTab("home")} className="hover:text-[#cf2027] transition-colors text-left cursor-pointer">
                Why Lee Ventures
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("contact")} className="hover:text-[#cf2027] transition-colors text-left cursor-pointer">
                Our Locations
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab("products"); }} className="hover:text-[#cf2027] transition-colors text-left cursor-pointer">
                Brands We Carry
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("contact")} className="hover:text-[#cf2027] transition-colors text-left cursor-pointer">
                Terms & Conditions
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("contact")} className="hover:text-[#cf2027] transition-colors text-left cursor-pointer">
                Privacy & Cookie Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Directory Links - Column 3: Customer Service */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-extrabold text-white uppercase tracking-widest text-[10px] font-mono border-l-2 border-[#cf2027] pl-2">
            Customer Service
          </h4>
          <ul className="space-y-2 text-zinc-400 font-semibold">
            <li>
              <button onClick={() => setActiveTab("ai")} className="hover:text-[#cf2027] transition-colors text-left cursor-pointer">
                Register for a Portal
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("products")} className="hover:text-[#cf2027] transition-colors text-left cursor-pointer">
                Request a Catalog
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("ai")} className="hover:text-[#cf2027] transition-colors text-left cursor-pointer">
                FAQs & Support
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("contact")} className="hover:text-[#cf2027] transition-colors text-left cursor-pointer">
                Returns & Exchanges
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab("contact")} className="hover:text-[#cf2027] transition-colors text-left cursor-pointer">
                Shipping Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Directory Links - Column 4: Services */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-extrabold text-white uppercase tracking-widest text-[10px] font-mono border-l-2 border-[#cf2027] pl-2">
            Safety Solutions & Services
          </h4>
          <ul className="space-y-2 text-zinc-400 font-semibold">
            <li className="flex items-center gap-1.5">
              <span className="h-1 w-1 bg-[#cf2027] rounded-full"></span>
              <span>Bulk Order Pricing Programs</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-1 w-1 bg-[#cf2027] rounded-full"></span>
              <span>Custom Logo PPE & Embroidery</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-1 w-1 bg-[#cf2027] rounded-full"></span>
              <span>On-Site Training & Audits</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-1 w-1 bg-[#cf2027] rounded-full"></span>
              <span>Gas Detector Re-calibration</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-1 w-1 bg-[#cf2027] rounded-full"></span>
              <span>Safety Equipment Rentals</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 2. Bottom Copyright Bar (Black Background) */}
      <div className="bg-black py-6 border-t border-zinc-800 text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-wider font-mono">
          <div>
            &copy; {new Date().getFullYear()} Lee Ventures Ltd • Ritz Safety Solutions. All Rights Reserved. Co. Registration No: RC-001083 Nigeria.
          </div>
          <div className="flex items-center gap-1.5 text-[#cf2027] font-bold">
            <ShieldAlert size={12} className="animate-pulse" />
            CE • ANSI • SOLAS CERTIFIED SAFETY DISTRIBUTOR
          </div>
        </div>
      </div>
    </footer>
  );
}
