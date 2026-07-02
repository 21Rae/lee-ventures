import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Ship, Truck, AlertCircle, CheckCircle2 } from "lucide-react";
import { CONTACT_INFO } from "../data";

export default function ContactHQ() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Interactive Map State: Click a hub to see transit details
  const [activeHub, setActiveHub] = useState<string>("Artillery Junction");

  const LOGISTICS_HUBS: Record<string, { distance: string; time: string; route: string; description: string }> = {
    "Artillery Junction": {
      distance: "0.4 km",
      time: "2 Mins",
      route: "Direct access via Old Aba Road",
      description: "Primary crossing junction linking central Port Harcourt to Old Aba Road. Instant accessibility for express pickups."
    },
    "Trans-Amadi Layout": {
      distance: "4.2 km",
      time: "10 Mins",
      route: "Old Aba Road to Trans-Amadi Industrial Ave",
      description: "Major industrial & refinery engineering area. Lee Ventures offers rapid under-15-minute dispatch delivery here."
    },
    "Onne Free Trade Port": {
      distance: "19.5 km",
      time: "35 Mins",
      route: "Aba Expressway to East-West Highway",
      description: "Deep sea oil and gas supply hub. Heavy marine life jackets and breathing apparatus are dispatched daily to vessel agents."
    },
    "Shell Industrial HQ": {
      distance: "3.1 km",
      time: "8 Mins",
      route: "Off Old Aba Road bypass",
      description: "Major corporate engineering and exploration base. Direct compliance equipment transfers happen regularly."
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError("");

    // Simulate sending email backend request
    setTimeout(() => {
      setIsSending(false);
      setSuccess(true);
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    }, 1200);
  };

  return (
    <section className="bg-zinc-50 text-zinc-800 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Title Block */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-sm font-extrabold tracking-[0.2em] uppercase text-[#cf2027] font-mono">
            Port Harcourt Headquarters
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase text-zinc-900">
            Visit Our Warehouse & Dispatch Showroom
          </h3>
          <p className="text-zinc-500 text-xs sm:text-sm uppercase tracking-wider max-w-2xl mx-auto leading-relaxed font-semibold">
            Inspect certifications, browse bulk inventory, or reach us via telephone, email, or direct WhatsApp. Located at Artillery on Old Aba Road.
          </p>
        </div>

        {/* Contact info grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Warehouse Location */}
          <div className="bg-white p-6 rounded border border-zinc-200 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="p-3 bg-[#cf2027]/5 text-[#cf2027] w-fit rounded border border-[#cf2027]/10">
                <MapPin size={22} />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-xs uppercase tracking-widest text-zinc-900">Physical Showroom</h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-semibold uppercase">
                  ONYEJIEKE PLAZA, NO 256 OLD ABA ROAD, OFF ARTILLERY, PORT HARCOURT, RIVERS STATE, NIGERIA
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-100 mt-6 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              Ground Floor, Suites 1-3. Parking available for logistics trucks.
            </div>
          </div>

          {/* Card 2: Support lines */}
          <div className="bg-white p-6 rounded border border-zinc-200 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="p-3 bg-[#cf2027]/5 text-[#cf2027] w-fit rounded border border-[#cf2027]/10">
                <Phone size={22} />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-xs uppercase tracking-widest text-zinc-900">Direct Telephone & WhatsApp</h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-semibold">
                  Main Line: <strong className="text-zinc-900">08032560337</strong> <br />
                  WhatsApp Support: <strong className="text-zinc-900">{CONTACT_INFO.whatsapp}</strong>
                </p>
              </div>
            </div>
            <a 
              href={`https://wa.me/2348032560337?text=Hello%20Lee%20Ventures%2C%20I%20am%20inquiring%20about%20safety%20equipment.`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-widest rounded flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <MessageSquare size={14} />
              Open WhatsApp Sourcing Chat
            </a>
          </div>

          {/* Card 3: Mail & Hours */}
          <div className="bg-white p-6 rounded border border-zinc-200 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="p-3 bg-[#cf2027]/5 text-[#cf2027] w-fit rounded border border-[#cf2027]/10">
                <Clock size={22} />
              </div>
              <div className="space-y-2.5">
                <h3 className="font-extrabold text-xs uppercase tracking-widest text-zinc-900">Opening Schedules</h3>
                <div className="space-y-1.5 text-xs text-zinc-500 font-semibold">
                  {CONTACT_INFO.workingHours.map((wh, idx) => (
                    <div key={idx} className="flex justify-between border-b border-zinc-100 pb-1 text-[11px] uppercase tracking-wider">
                      <span>{wh.days}</span>
                      <span className="font-mono text-zinc-800 font-bold">{wh.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-[10px] text-zinc-400 leading-relaxed font-bold uppercase tracking-wider">
              Inquiries: <strong className="text-zinc-600">leeventure001@gmail.com</strong>
            </div>
          </div>
        </div>

        {/* Map and Contact Form Grid Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
          
          {/* Interactive Vector Map: Column Span 7 */}
          <div className="lg:col-span-7 bg-white rounded border border-zinc-200 p-6 flex flex-col justify-between relative overflow-hidden shadow-xs">
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-xs uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                  <Truck size={16} className="text-[#cf2027]" />
                  Port Harcourt Logistics Transit Map
                </h3>
                <span className="text-[9px] bg-zinc-100 px-2.5 py-1 rounded border border-zinc-200 font-mono text-zinc-500 uppercase tracking-wider">
                  Interactive Sourcing Guide
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-semibold">
                Click a local logistics node or sector below to review real-time dispatch routes and transit schedules from our suites on No. 256 Old Aba Road.
              </p>
            </div>

            {/* Custom SVG Coordinate Layout Map */}
            <div className="relative aspect-video w-full bg-zinc-950 border border-zinc-800 rounded overflow-hidden p-3 flex flex-col justify-between">
              
              {/* SVG Map Lines */}
              <svg className="absolute inset-0 w-full h-full text-zinc-800" xmlns="http://www.w3.org/2000/svg">
                {/* Major Highways */}
                <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#27272a" strokeWidth="6" strokeLinecap="round" /> {/* Old Aba Road */}
                <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#27272a" strokeWidth="6" strokeLinecap="round" /> {/* Artillery Bypass */}
                <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#18181b" strokeWidth="4" strokeDasharray="5,5" /> {/* Trans-Amadi Connect */}
                
                {/* Road Labels */}
                <text x="15%" y="46%" fill="#71717a" fontSize="8" className="font-mono font-bold tracking-widest uppercase">OLD ABA ROAD</text>
                <text x="52%" y="20%" fill="#71717a" fontSize="8" className="font-mono font-bold tracking-widest uppercase" transform="rotate(90, 52, 20)">ARTILLERY WAY</text>
              </svg>

              {/* Interactive Nodes Placed Over SVG */}
              {/* 1. HQ Marker (Onyejieke Plaza) - CENTER POINT */}
              <div 
                onClick={() => setActiveHub("Artillery Junction")}
                className="absolute left-[48%] top-[45%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              >
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cf2027] opacity-75"></span>
                  <div className="relative h-5 w-5 rounded-full bg-black border-2 border-[#cf2027] flex items-center justify-center text-[#cf2027] font-extrabold text-[10px]">
                    LV
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-7 bg-zinc-900 border border-zinc-700 text-[9px] font-black uppercase text-[#cf2027] px-1.5 py-0.5 rounded shadow whitespace-nowrap tracking-wider">
                  HQ (Onyejieke Plaza)
                </div>
              </div>

              {/* 2. Node: Trans-Amadi */}
              <button 
                onClick={() => setActiveHub("Trans-Amadi Layout")}
                className={`absolute left-[20%] top-[30%] px-3 py-1.5 rounded border text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                  activeHub === "Trans-Amadi Layout" 
                    ? "bg-[#cf2027] border-[#cf2027] text-white font-extrabold shadow-md shadow-[#cf2027]/10" 
                    : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                Trans-Amadi Zone
              </button>

              {/* 3. Node: Onne Port */}
              <button 
                onClick={() => setActiveHub("Onne Free Trade Port")}
                className={`absolute right-[15%] top-[65%] px-3 py-1.5 rounded border text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                  activeHub === "Onne Free Trade Port" 
                    ? "bg-[#cf2027] border-[#cf2027] text-white font-extrabold shadow-md shadow-[#cf2027]/10" 
                    : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                Onne Free Port
              </button>

              {/* 4. Node: Shell Industrial HQ */}
              <button 
                onClick={() => setActiveHub("Shell Industrial HQ")}
                className={`absolute left-[65%] top-[20%] px-3 py-1.5 rounded border text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all duration-200 ${
                  activeHub === "Shell Industrial HQ" 
                    ? "bg-[#cf2027] border-[#cf2027] text-white font-extrabold shadow-md shadow-[#cf2027]/10" 
                    : "bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500"
                }`}
              >
                Shell Exploration HQ
              </button>

              {/* Bottom Transit Stat Indicator */}
              <div className="relative z-10 w-full bg-zinc-950/95 border border-zinc-800 p-3 rounded grid grid-cols-3 gap-2 text-[11px] uppercase tracking-wider">
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase block font-bold">Node Name</span>
                  <strong className="text-white truncate block text-[10px]">{activeHub}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase block font-bold">Transit Distance</span>
                  <strong className="text-[#cf2027] block font-mono font-extrabold">{LOGISTICS_HUBS[activeHub]?.distance || "N/A"}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 uppercase block font-bold">Courier Travel</span>
                  <strong className="text-emerald-400 block font-mono font-extrabold">{LOGISTICS_HUBS[activeHub]?.time || "N/A"}</strong>
                </div>
              </div>
            </div>

            {/* Hub description info box */}
            <div className="mt-4 bg-zinc-50 p-4 rounded border border-zinc-200 text-xs shadow-xs">
              <span className="text-[9px] font-mono text-zinc-400 uppercase block font-bold tracking-widest mb-1">
                Logistics Routing Notes:
              </span>
              <p className="text-[#cf2027] font-bold uppercase tracking-wide text-[10px]">{LOGISTICS_HUBS[activeHub]?.route}:</p>
              <p className="text-zinc-600 text-[11px] mt-1.5 leading-relaxed font-semibold">
                {LOGISTICS_HUBS[activeHub]?.description}
              </p>
            </div>

          </div>

          {/* Contact Inquiry Sheet: Column Span 5 */}
          <div className="lg:col-span-5 bg-white rounded border border-zinc-200 p-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-1.5 mb-4">
              <h3 className="font-extrabold text-xs uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                <Send size={16} className="text-[#cf2027]" />
                Sourcing Inquiry Sheet
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-semibold">
                Are you a procurement coordinator or offshore buyer? Submit an inquiry here and we will file an official proposal envelope to your company address.
              </p>
            </div>

            {success ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3 bg-zinc-50 rounded border border-zinc-200 animate-fade-in my-4">
                <CheckCircle2 size={44} className="text-emerald-600 animate-bounce" />
                <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider">Message Successfully Logged</h4>
                <p className="text-zinc-500 text-xs max-w-xs leading-normal font-semibold">
                  Thank you for reaching out to Lee Ventures Ltd. A representative will contact you via email or phone within 15 minutes.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 bg-white border border-zinc-300 rounded text-[10px] uppercase tracking-wider font-extrabold hover:text-[#cf2027] cursor-pointer transition-colors text-zinc-500"
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3 flex-1 flex flex-col justify-between">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">YOUR FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Kingsley"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 rounded text-xs text-zinc-800 focus:outline-none focus:border-[#cf2027]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. buyer@firm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 rounded text-xs text-zinc-800 focus:outline-none focus:border-[#cf2027]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">TELEPHONE *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 08032560337"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 rounded text-xs text-zinc-800 focus:outline-none focus:border-[#cf2027]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">SUBJECT / SPECIFICATION TYPE *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bulk offshore life jacket supply"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 rounded text-xs text-zinc-800 focus:outline-none focus:border-[#cf2027]"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1 flex-1 flex flex-col justify-start">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">MESSAGE & COMPLIANCE REQUIREMENTS *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project, required standards (CE, ANSI, SOLAS), specific quantities, and needed delivery dates..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-300 rounded text-xs text-zinc-800 focus:outline-none focus:border-[#cf2027] flex-1 resize-none min-h-[100px]"
                  />
                </div>

                {error && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded text-[11px] text-red-600 flex items-center gap-1.5">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 bg-[#cf2027] hover:bg-[#b0161d] text-white font-extrabold uppercase text-xs tracking-widest rounded flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow shadow-[#cf2027]/10"
                >
                  {isSending ? (
                    <>
                      <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Dispatching message envelope...
                    </>
                  ) : (
                    <>
                      <Send size={12} />
                      Dispatch Sourcing Request
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
