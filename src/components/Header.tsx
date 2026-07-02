import React, { useState } from "react";
import { Search, User, MapPin, Phone, Mail, ChevronDown, Menu, X, Shield, Sparkles, LogOut, Check } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (c: string) => void;
  userProfile: { firstName: string; lastName: string; email: string } | null;
  onSignOut: () => void;
  onOpenSignUp: () => void;
  onOpenSignIn: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
  userProfile,
  onSignOut,
  onOpenSignUp,
  onOpenSignIn
}: HeaderProps) {
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setActiveTab("products");
    setSelectedCategory("All Products"); // reset category to search all products
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveTab("products");
    setIsMobileMenuOpen(false);
  };

  const brands = ["Pyramex", "FallTech", "3M", "GGS", "All Sport", "OccuNomix"];

  return (
    <header className="sticky top-0 z-50 w-full font-sans shadow-md">
      {/* 1. Top Black Bar */}
      <div className="w-full bg-black text-[11px] text-zinc-300 py-2 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 hover:text-[#cf2027] transition-colors duration-200 text-zinc-400">
              <MapPin size={12} className="text-[#cf2027]" />
              Artillery, No 256 Old Aba Road, Port Harcourt
            </span>
            <span className="hidden md:inline text-zinc-700">|</span>
            <span className="hidden md:inline text-zinc-400">Co. Reg. No: RC-001083 Nigeria</span>
          </div>
          <div className="flex items-center space-x-5">
            <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
              <Phone size={12} className="text-[#cf2027]" />
              Order Hotline: <strong className="text-white">08032560337</strong>
            </span>
            <span className="text-zinc-700">|</span>
            <span className="hover:text-white transition-colors cursor-pointer text-zinc-400 font-medium uppercase tracking-wider" onClick={() => setActiveTab("contact")}>
              Our Locations
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar (White Background - matching Ritz Safety screenshot) */}
      <div className="w-full bg-white text-zinc-900 border-b border-zinc-200 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Block (Red and Black Ritz Safety style, branded Lee Ventures) */}
          <div 
            onClick={() => {
              setActiveTab("home");
              setSearchQuery("");
              setSearchInput("");
            }} 
            className="flex items-center space-x-1 cursor-pointer select-none shrink-0 group"
          >
            <div className="flex items-baseline font-black tracking-tight text-2xl sm:text-3xl">
              {/* "Lee" in Italic Red */}
              <span className="text-[#cf2027] italic font-serif tracking-tighter mr-1">Lee</span>
              {/* "Ventures" in Bold Black with checkmark */}
              <span className="text-black relative">
                Ventures
                {/* Red checkmark hovering on top right of the S */}
                <span className="absolute -top-1.5 -right-3 text-[#cf2027] text-sm sm:text-base font-bold animate-pulse">
                  ✓
                </span>
              </span>
            </div>
            <div className="hidden lg:block border-l border-zinc-300 pl-3 ml-2">
              <span className="text-[9px] text-[#cf2027] font-extrabold uppercase tracking-[0.2em] block leading-none">
                Safety & Industry
              </span>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest block mt-0.5 leading-none">
                Certified PPE Distributor
              </span>
            </div>
          </div>

          {/* Search bar and Right area removed as requested */}

        </div>
      </div>

      {/* 3. Lower Navigation / Departments Row (White Background - Ritz Safety layout) */}
      <div className="w-full bg-zinc-100 text-zinc-800 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 text-xs font-bold uppercase tracking-wider">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-10">
          
          {/* Main Navigation Links */}
          <div className="flex items-center space-x-6 overflow-x-auto scrollbar-none h-full">
            <button
              onClick={() => {
                setActiveTab("home");
                setSearchQuery("");
              }}
              className={`hover:text-[#cf2027] h-full flex items-center transition-colors border-b-2 ${
                activeTab === "home" ? "border-[#cf2027] text-[#cf2027]" : "border-transparent"
              }`}
            >
              All Products
            </button>
          </div>

          {/* Callout Info Badge on Right */}
          <div className="hidden lg:flex items-center gap-1.5 text-[10px] text-zinc-500 tracking-widest uppercase">
            <Check size={12} className="text-[#cf2027]" />
            CE • ANSI • SOLAS APPROVED
          </div>
        </div>
      </div>

      {/* 4. Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 px-4 py-4 space-y-4 animate-fade-in">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="flex relative">
            <input
              type="text"
              placeholder="Search by keyword..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-3 pr-10 py-2 bg-white border border-zinc-300 rounded-l-md text-sm text-zinc-800"
            />
            <button type="submit" className="bg-[#cf2027] text-white px-4 rounded-r-md">
              <Search size={16} />
            </button>
          </form>

          {/* Nav Items List */}
          <div className="flex flex-col space-y-3 text-sm font-bold text-zinc-800 uppercase">
            <button
              onClick={() => {
                setActiveTab("home");
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#cf2027]"
            >
              Home Page Overview
            </button>
            <button
              onClick={() => handleCategorySelect("All Products")}
              className="text-left py-1 hover:text-[#cf2027]"
            >
              Browse Equipment Catalog
            </button>
            
            {/* Quick Categories list in mobile */}
            <div className="pl-3 border-l-2 border-zinc-200 flex flex-col space-y-2 text-xs font-semibold text-zinc-500 normal-case">
              <button onClick={() => handleCategorySelect("Personal Protective Equipment")} className="text-left hover:text-[#cf2027]">PPE Sourcing</button>
              <button onClick={() => handleCategorySelect("Industrial Safety & Security")} className="text-left hover:text-[#cf2027]">Industrial Fall & Gas</button>
              <button onClick={() => handleCategorySelect("Welding & Fabrication Safety")} className="text-left hover:text-[#cf2027]">Welding Safety</button>
              <button onClick={() => handleCategorySelect("Marine & Offshore Safety")} className="text-left hover:text-[#cf2027]">SOLAS Marine flotation</button>
            </div>

            <button
              onClick={() => {
                setActiveTab("ai");
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#cf2027] flex items-center gap-1"
            >
              <Shield size={14} className="text-[#cf2027]" />
              AI Compliance Advisor
            </button>
            <button
              onClick={() => {
                setActiveTab("contact");
                setIsMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-[#cf2027]"
            >
              HQ Port Harcourt Location
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
