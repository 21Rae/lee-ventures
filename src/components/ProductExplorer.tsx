import React, { useState } from "react";
import { Search, Plus, Minus, Check, Star, AlertCircle, Sparkles, ChevronDown, ChevronUp, Phone, Mail } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS, CATEGORIES } from "../data";

interface ProductExplorerProps {
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  selectedCategory?: string;
  setSelectedCategory?: (c: string) => void;
  setActiveTab?: (tab: string) => void;
}

export default function ProductExplorer({ 
  searchQuery: propSearchQuery,
  setSearchQuery: propSetSearchQuery,
  selectedCategory: propSelectedCategory,
  setSelectedCategory: propSetSelectedCategory,
  setActiveTab
}: ProductExplorerProps) {
  const [localCategory, localSetCategory] = useState("All Products");
  const [localSearch, localSetSearch] = useState("");

  const selectedCategory = propSelectedCategory !== undefined ? propSelectedCategory : localCategory;
  const setSelectedCategory = propSetSelectedCategory !== undefined ? propSetSelectedCategory : localSetCategory;

  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : localSearch;
  const setSearchQuery = propSetSearchQuery !== undefined ? propSetSearchQuery : localSetSearch;

  const [expandedProductFeatures, setExpandedProductFeatures] = useState<Record<string, boolean>>({});

  // Toggle features list expansion
  const toggleFeatures = (productId: string) => {
    setExpandedProductFeatures(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Filter products based on search query and category
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-zinc-50 text-zinc-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Title Section */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-block px-3.5 py-1 border border-[#cf2027] text-[#cf2027] text-[10px] uppercase tracking-[0.3em] font-mono font-bold mb-1 rounded-sm">
            Product Directory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-zinc-900">
            Equipment Procurement & Solutions
          </h2>
          <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-semibold">
            Browse our certified catalog of premium safety equipment below. All items comply with West African oil & gas and industrial safety regulation mandates.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white p-4 rounded border border-zinc-200 shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="Search products, subcategories or safety standards (e.g., SOLAS, EN)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#cf2027] transition-colors"
            />
          </div>

          {/* Quick Stats */}
          <div className="text-xs text-zinc-500 font-mono flex items-center gap-2">
            <span className="bg-[#cf2027]/5 text-[#cf2027] px-2.5 py-1 rounded border border-[#cf2027]/20 uppercase tracking-wider font-bold">
              Found {filteredProducts.length} Safety items
            </span>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="hover:text-[#cf2027] underline cursor-pointer font-bold"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex items-center space-x-1 sm:space-x-3 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-200">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 text-xs font-extrabold uppercase tracking-widest rounded whitespace-nowrap cursor-pointer transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-[#cf2027] border border-[#cf2027] text-white"
                  : "bg-white border border-zinc-200 text-zinc-600 hover:text-[#cf2027] hover:border-[#cf2027]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded border border-zinc-200 border-dashed space-y-3">
            <AlertCircle size={40} className="mx-auto text-[#cf2027]/50" />
            <h3 className="text-lg font-bold text-zinc-700">No equipment matches found</h3>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto font-semibold">
              We couldn't find any products matching your search criteria. Check your spelling or try asking our **Safety AI Advisor** for custom sourcing.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isExpanded = !!expandedProductFeatures[product.id];

              return (
                <div 
                  key={product.id}
                  className="bg-white rounded border border-zinc-200 flex flex-col justify-between overflow-hidden shadow-sm hover:border-[#cf2027] hover:shadow transition-all duration-200 group"
                >
                  {/* Image & Standard Header */}
                  <div className="relative aspect-video w-full bg-zinc-100 overflow-hidden border-b border-zinc-200">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    {/* Compliance standard label */}
                    <span className="absolute top-3 left-3 bg-[#cf2027] text-[10px] text-white font-extrabold uppercase px-2.5 py-1 rounded tracking-widest">
                      {product.standard.split(" / ")[0]}
                    </span>

                    {/* Subcategory Label */}
                    <span className="absolute bottom-3 left-3 bg-black/85 text-[10px] text-zinc-200 font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded border border-white/10">
                      {product.subcategory}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-white">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-extrabold text-sm text-zinc-900 tracking-tight leading-snug group-hover:text-[#cf2027] transition-colors duration-200 uppercase">
                          {product.name}
                        </h3>
                      </div>

                      {/* Ratings stars */}
                      <div className="flex items-center gap-1 text-[#fedd00] text-xs">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              className={i < Math.floor(product.rating) ? "fill-current" : "text-zinc-200"} 
                            />
                          ))}
                        </div>
                        <span className="text-zinc-400 font-mono text-[10px]">({product.rating})</span>
                      </div>

                      <p className="text-zinc-600 text-xs leading-relaxed font-semibold">
                        {product.description}
                      </p>
                    </div>

                    {/* Features Dropdown Drawer inside Card */}
                    <div className="pt-2 border-t border-zinc-200">
                      <button
                        onClick={() => toggleFeatures(product.id)}
                        className="w-full flex items-center justify-between text-xs text-zinc-500 hover:text-zinc-800 py-1 cursor-pointer transition-colors"
                      >
                        <span className="font-extrabold flex items-center gap-1.5 text-[#cf2027] uppercase tracking-wider text-[11px]">
                          <Sparkles size={12} />
                          Technical Specifications
                        </span>
                        {isExpanded ? <ChevronUp size={14} className="text-[#cf2027]" /> : <ChevronDown size={14} className="text-[#cf2027]" />}
                      </button>

                      {isExpanded && (
                        <ul className="mt-2 space-y-1.5 pl-1.5 transition-all duration-300">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="text-[11px] text-zinc-500 flex items-start gap-1.5 leading-snug font-semibold">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#cf2027] mt-1.5 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Order Information */}
                    <div className="text-[10px] text-zinc-500 font-mono uppercase flex justify-between items-center bg-zinc-50 p-2.5 rounded border border-zinc-200">
                      <span>UOM: <strong className="text-zinc-700">{product.unit}</strong></span>
                      <span className="flex items-center gap-1 text-emerald-600 font-extrabold">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Stock Ready
                      </span>
                    </div>

                    {/* Sourcing Inquiry Action */}
                    <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-3">
                      <div className="text-[10px] text-zinc-500 font-mono uppercase">
                        Brand: <strong className="text-zinc-700">{product.name.split(" ")[0]}</strong>
                      </div>
                      <button
                        onClick={() => {
                          if (setActiveTab) {
                            setActiveTab("contact");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }
                        }}
                        className="px-4 py-2.5 bg-[#cf2027] hover:bg-[#b0161d] text-white text-xs font-extrabold uppercase tracking-widest rounded transition-colors duration-150 cursor-pointer shadow-sm shadow-[#cf2027]/10"
                      >
                        Inquire Details
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
