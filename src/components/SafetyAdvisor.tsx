import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, ShieldCheck, RefreshCw, Sparkles, Plus, Check, Info } from "lucide-react";
import { ChatMessage, Product } from "../types";
import { PRODUCTS } from "../data";

export default function SafetyAdvisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am your **Lee Ventures Safety AI Advisor**. I am specialized in industrial safety standards (CE, ANSI, OSHA, SOLAS) and heavy equipment compliance.\n\nTell me about your current task or workspace (e.g. *'welding in a refinery'*, *'offshore oil rig crew transfer'*, or *'confined space hazard checks'*) and I will recommend compliant equipment and safety solutions!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle prompt suggestions
  const handlePresetClick = (presetText: string) => {
    if (isLoading) return;
    setInput(presetText);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text: trimmedInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Build session list of messages to send
      const requestMessages = [...messages, userMsg].map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: requestMessages })
      });

      if (!response.ok) {
        throw new Error("Failed to receive safety advice.");
      }

      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        sender: "ai",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-error`,
        sender: "ai",
        text: "I apologize, but I had trouble reaching my safety knowledge database. Please ensure your network is connected and try asking me again shortly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        text: "Hello! I am your **Lee Ventures Safety AI Advisor**. I am specialized in industrial safety standards (CE, ANSI, OSHA, SOLAS) and heavy equipment compliance.\n\nTell me about your current task or workspace (e.g. *'welding in a refinery'*, *'offshore oil rig crew transfer'*, or *'confined space hazard checks'*) and I will recommend compliant equipment and safety solutions!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }
    ]);
  };

  // Helper function to extract product suggestions from message text
  const extractProductSuggestions = (text: string): { cleanText: string; productIds: string[] } => {
    const regex = /\[SUGGEST_PRODUCT:\s*([a-zA-Z0-9-]+)\s*\]/g;
    const productIds: string[] = [];
    let match;
    
    // Extract IDs
    while ((match = regex.exec(text)) !== null) {
      if (match[1]) {
        productIds.push(match[1].trim());
      }
    }

    // Replace code tokens with simple styled bold inline mentions
    let cleanText = text;
    productIds.forEach(id => {
      const prod = PRODUCTS.find(p => p.id === id);
      const replacementLabel = prod ? `**${prod.name}**` : `**[Equip Ref: ${id}]**`;
      const escapedId = id.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const replaceRegex = new RegExp(`\\[SUGGEST_PRODUCT:\\s*${escapedId}\\s*\\]`, "g");
      cleanText = cleanText.replace(replaceRegex, replacementLabel);
    });

    return { cleanText, productIds: Array.from(new Set(productIds)) };
  };

  return (
    <section className="bg-zinc-50 text-zinc-800 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Prompts & Guidelines Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded border border-zinc-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 text-[#cf2027]">
              <ShieldCheck size={20} />
              <h3 className="font-extrabold text-xs uppercase tracking-widest text-zinc-900">
                Safety Guidance Core
              </h3>
            </div>
            
            <p className="text-xs text-zinc-500 leading-relaxed font-semibold">
              Our AI Advisor provides professional guidance matched to West African offshore, chemical, fabrication, and heavy-duty logistics standards.
            </p>

            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block tracking-wider">
                Click preset to query advisor
              </span>
              
              {[
                { label: "Welding Protection", text: "What personal protective equipment is standard for high-amperage welding in a confined storage tank?" },
                { label: "Confined Space Gas Risks", text: "We are doing maintenance inside a chemical holding vessel. What monitoring equipment do we need?" },
                { label: "Offshore SOLAS Compliance", text: "What life jackets and safety gear are required for boat crew transfers to an offshore oil rig?" },
                { label: "Lockout Tagout (LOTO)", text: "What is the procedure for standard energy isolation on industrial machinery, and what kits should we buy?" }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetClick(preset.text)}
                  className="w-full text-left p-3.5 bg-zinc-50 hover:bg-zinc-100 hover:border-[#cf2027]/30 rounded text-[11px] text-zinc-700 border border-zinc-200 cursor-pointer transition-all duration-200"
                >
                  <strong className="text-[#cf2027] block mb-1 uppercase tracking-wide text-[10px]">{preset.label}</strong>
                  <span className="line-clamp-2 text-zinc-500 leading-normal font-semibold">{preset.text}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-zinc-200 pt-3 flex items-center gap-2 text-[10px] text-zinc-400 leading-snug">
              <Info size={14} className="text-zinc-400 shrink-0" />
              <span>Recommendations are compliant with BS EN, SOLAS, and OSHA codes.</span>
            </div>
          </div>
        </div>

        {/* Right Side: Active Chat Panel */}
        <div className="lg:col-span-8 flex flex-col h-[580px] bg-white rounded border border-zinc-200 overflow-hidden shadow">
          
          {/* Chat Header */}
          <div className="p-4 bg-zinc-100 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 bg-[#cf2027]/5 rounded border border-[#cf2027]/20 flex items-center justify-center text-[#cf2027]">
                <Sparkles size={18} />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Lee Ventures Safety AI Advisor</h3>
                <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider font-mono">
                  Standard Compliance AI • Online
                </p>
              </div>
            </div>

            <button
              onClick={resetChat}
              className="p-1.5 hover:bg-zinc-200 rounded text-zinc-500 hover:text-[#cf2027] transition-colors cursor-pointer text-[10px] uppercase tracking-wider flex items-center gap-1.5 font-bold"
              title="Reset Chat Session"
            >
              <RefreshCw size={13} className="text-[#cf2027]" />
              Reset
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50">
            {messages.map((msg) => {
              const { cleanText, productIds } = extractProductSuggestions(msg.text);
              const isAI = msg.sender === "ai";

              return (
                <div key={msg.id} className={`flex flex-col space-y-2.5 ${isAI ? "items-start" : "items-end"}`}>
                  
                  {/* Bubble body */}
                  <div className={`max-w-[85%] rounded p-4 text-xs leading-relaxed ${
                    isAI 
                      ? "bg-white border border-zinc-200 text-zinc-800 rounded-tl-none shadow-sm" 
                      : "bg-[#cf2027] text-white font-bold rounded-tr-none shadow-sm"
                  }`}>
                    {/* Render message formatting */}
                    <div className="space-y-2 whitespace-pre-wrap">
                      {cleanText.split("\n\n").map((para, pIdx) => {
                        let textNode: React.ReactNode = para;
                        if (para.includes("**")) {
                          const parts = para.split("**");
                          textNode = parts.map((part, partIdx) => 
                            partIdx % 2 === 1 ? <strong key={partIdx} className={isAI ? "text-[#cf2027] font-extrabold" : "text-white font-black"}>{part}</strong> : part
                          );
                        }
                        return <p key={pIdx}>{textNode}</p>;
                      })}
                    </div>
                    
                    <span className={`block text-[9px] mt-2 text-right ${isAI ? "text-zinc-400" : "text-zinc-200"}`}>
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Render Product Suggestions shortcut list if present */}
                  {isAI && productIds.length > 0 && (
                    <div className="w-full max-w-[85%] pl-2 space-y-2">
                      <span className="text-[9px] font-mono text-zinc-400 uppercase block font-bold tracking-wider">
                        Suggested Equipment Shortcuts:
                      </span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {productIds.map(id => {
                          const prod = PRODUCTS.find(p => p.id === id);
                          if (!prod) return null;

                          return (
                            <div 
                              key={id}
                              className="bg-white p-2.5 rounded border border-zinc-200 flex items-center justify-between gap-2.5 text-xs hover:border-[#cf2027]/30 transition-all duration-150 shadow-xs"
                            >
                              <div className="flex items-center gap-2">
                                <img 
                                  src={prod.imageUrl} 
                                  alt={prod.name}
                                  className="h-8 w-8 rounded object-cover border border-zinc-100 grayscale"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="min-w-0">
                                  <h4 className="font-bold text-zinc-800 truncate leading-tight uppercase text-[11px]">{prod.name}</h4>
                                  <span className="text-[9px] text-[#cf2027] font-bold block mt-0.5 uppercase tracking-wide">{prod.standard.split(" / ")[0]}</span>
                                </div>
                              </div>

                              <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100 text-[9px] font-bold shrink-0 uppercase tracking-wider flex items-center gap-1">
                                Compliant
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}

            {/* AI Loading indicator */}
            {isLoading && (
              <div className="flex items-start">
                <div className="bg-white border border-zinc-200 p-4 rounded rounded-tl-none flex items-center gap-3 shadow-xs">
                  <div className="flex space-x-1.5">
                    <span className="h-1.5 w-1.5 bg-[#cf2027] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 bg-[#cf2027] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 bg-[#cf2027] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase font-semibold">
                    Analyzing Risks...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Form Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-zinc-100 border-t border-zinc-200 flex gap-2">
            <input
              type="text"
              required
              disabled={isLoading}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask safety questions (e.g. 'what boots are needed for acid handling?')..."
              className="flex-1 px-4 py-2.5 bg-white border border-zinc-300 rounded text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#cf2027]"
            />
            
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 bg-[#cf2027] hover:bg-[#b0161d] disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-extrabold uppercase tracking-widest text-[11px] rounded transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <Send size={13} />
              Consult
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
