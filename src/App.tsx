import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductExplorer from "./components/ProductExplorer";
import SafetyAdvisor from "./components/SafetyAdvisor";
import ContactHQ from "./components/ContactHQ";
import Footer from "./components/Footer";
import { Product } from "./types";
import { PRODUCTS, CONTACT_INFO } from "./data";
import { CheckCircle, ShieldAlert } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");

  // Search and Category outer state synchronization
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");

  // User auth state
  const [userProfile, setUserProfile] = useState<{ firstName: string; lastName: string; email: string } | null>(() => {
    try {
      const saved = localStorage.getItem("lee_ventures_user_profile");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // Form states
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpFirst, setSignUpFirst] = useState("");
  const [signUpLast, setSignUpLast] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpCompany, setSignUpCompany] = useState("");

  // Persist user profile
  useEffect(() => {
    try {
      if (userProfile) {
        localStorage.setItem("lee_ventures_user_profile", JSON.stringify(userProfile));
      } else {
        localStorage.removeItem("lee_ventures_user_profile");
      }
    } catch (err) {
      console.error(err);
    }
  }, [userProfile]);

  const handleRegisterSuccess = (profile: { firstName: string; lastName: string; email: string }) => {
    setUserProfile(profile);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signInEmail) {
      // Simulate successful login
      const mockFirstName = signInEmail.split("@")[0];
      setUserProfile({
        firstName: mockFirstName.charAt(0).toUpperCase() + mockFirstName.slice(1),
        lastName: "Member",
        email: signInEmail
      });
      setIsSignInOpen(false);
      setSignInEmail("");
      setSignInPassword("");
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpFirst && signUpEmail) {
      setUserProfile({
        firstName: signUpFirst,
        lastName: signUpLast || "Member",
        email: signUpEmail
      });
      setIsSignUpOpen(false);
      setSignUpFirst("");
      setSignUpLast("");
      setSignUpEmail("");
      setSignUpCompany("");
    }
  };

  const handleSignOut = () => {
    setUserProfile(null);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-800 font-sans selection:bg-[#cf2027] selection:text-white flex flex-col justify-between">
      
      {/* Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
        userProfile={userProfile}
        onSignOut={handleSignOut}
        onOpenSignUp={() => setIsSignUpOpen(true)}
        onOpenSignIn={() => setIsSignInOpen(true)}
      />

      {/* Main Tabbed View Routing */}
      <main className="flex-1">
        {activeTab === "home" && (
          <Hero 
            setActiveTab={setActiveTab} 
            setSelectedCategory={setSelectedCategory}
            setSearchQuery={setSearchQuery}
            onRegisterSuccess={handleRegisterSuccess}
            userProfile={userProfile}
          />
        )}

        {activeTab === "products" && (
          <ProductExplorer 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "ai" && (
          <SafetyAdvisor />
        )}

        {activeTab === "contact" && (
          <ContactHQ />
        )}
      </main>

      {/* Global Business Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* SIMULATED SIGN IN MODAL */}
      {isSignInOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-zinc-900 rounded shadow-2xl max-w-md w-full border-t-4 border-[#cf2027] overflow-hidden">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                <h4 className="text-lg font-black uppercase text-zinc-900 tracking-tight font-mono">
                  SIGN IN TO PORTAL
                </h4>
                <button 
                  onClick={() => setIsSignInOpen(false)}
                  className="text-zinc-400 hover:text-[#cf2027] font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. buyer@shell-nigeria.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded p-2.5 text-xs font-semibold text-zinc-800"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded p-2.5 text-xs font-semibold text-zinc-800"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#cf2027] hover:bg-[#b0161d] text-white text-xs font-black py-3 uppercase tracking-widest rounded transition-colors cursor-pointer shadow-md"
                  >
                    LOGIN TO ACCOUNT
                  </button>
                </div>
              </form>

              <div className="text-center text-xs text-zinc-500 pt-2 border-t border-zinc-100">
                Don't have an account?{" "}
                <button 
                  onClick={() => {
                    setIsSignInOpen(false);
                    setIsSignUpOpen(true);
                  }}
                  className="text-[#cf2027] font-bold hover:underline"
                >
                  Register Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIMULATED SIGN UP MODAL */}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white text-zinc-900 rounded shadow-2xl max-w-md w-full border-t-4 border-[#cf2027] overflow-hidden">
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                <h4 className="text-lg font-black uppercase text-zinc-900 tracking-tight font-mono">
                  REGISTER CORPORATE ACCOUNT
                </h4>
                <button 
                  onClick={() => setIsSignUpOpen(false)}
                  className="text-zinc-400 hover:text-[#cf2027] font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={signUpFirst}
                      onChange={(e) => setSignUpFirst(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded p-2.5 text-xs font-semibold text-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={signUpLast}
                      onChange={(e) => setSignUpLast(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-300 rounded p-2.5 text-xs font-semibold text-zinc-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded p-2.5 text-xs font-semibold text-zinc-800"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">Company / Rig Contractor</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NLNG Operator"
                    value={signUpCompany}
                    onChange={(e) => setSignUpCompany(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-300 rounded p-2.5 text-xs font-semibold text-zinc-800"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#cf2027] hover:bg-[#b0161d] text-white text-xs font-black py-3 uppercase tracking-widest rounded transition-colors cursor-pointer shadow-md"
                  >
                    CREATE FREE ACCOUNT
                  </button>
                </div>
              </form>

              <div className="text-center text-xs text-zinc-500 pt-2 border-t border-zinc-100">
                Already have an account?{" "}
                <button 
                  onClick={() => {
                    setIsSignUpOpen(false);
                    setIsSignInOpen(true);
                  }}
                  className="text-[#cf2027] font-bold hover:underline"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
