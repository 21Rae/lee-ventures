import { Product } from "./types";

export const PRODUCTS: Product[] = [
  // CATEGORY 1: Personal Protective Equipment (PPE)
  {
    id: "ppe-helmet-01",
    name: "Lee-Ventures Heavy-Duty V-Gard Safety Helmet",
    category: "Personal Protective Equipment",
    subcategory: "Head Protection",
    description: "Premium industrial safety helmet featuring a durable high-density polyethylene (HDPE) shell and a standard 4-point pinlock suspension system. Engineered with lateral crushing protection and high dielectric strength, perfect for heavy construction and power sector environments.",
    features: [
      "High-density HDPE shell for ultimate impact resistance",
      "Lateral crush protection (LD) and electrical insulation (up to 440V)",
      "4-point adjustable textile suspension harness with sweatband",
      "Accessory slots for hearing protection, visors, and headlamps",
      "Under-chin strap anchorage points for additional stability"
    ],
    imageUrl: "/src/assets/images/safety_helmet_1783008297375.jpg",
    standard: "EN 397:2012 + A1:2012 / ANSI/ISEA Z89.1-2014 Type I",
    rating: 4.8,
    inStock: true,
    unit: "Piece"
  },
  {
    id: "ppe-boots-02",
    name: "Titan-Steel 200J Toe Cap Safety Boots",
    category: "Personal Protective Equipment",
    subcategory: "Foot Protection",
    description: "Full-grain heavy industrial leather boots featuring an impact-resistant 200-Joule steel toe cap and puncture-proof steel midsole. Engineered with a dual-density polyurethane sole providing slip-resistant (SRC), oil-resistant, and anti-static performance on rough terrains.",
    features: [
      "Genuine full-grain waterproof leather upper",
      "200J steel toe cap and puncture-resistant steel midsole plate",
      "Dual-density PU/PU sole with SRC slip-resistance rating",
      "Shock-absorbing energy heel and anti-static build",
      "Breathable mesh lining for comfort in hot environments like Port Harcourt"
    ],
    imageUrl: "/src/assets/images/safety_boots_1783008310567.jpg",
    standard: "EN ISO 20345:2011 S3 SRC",
    rating: 4.9,
    inStock: true,
    unit: "Pair"
  },
  {
    id: "ppe-vest-03",
    name: "Reflex-Max Class 2 High-Visibility Safety Vest",
    category: "Personal Protective Equipment",
    subcategory: "Body Protection",
    description: "Heavy-duty neon polyester mesh safety vest featuring 2-inch premium silver reflective tape in a horizontal and vertical cross-pattern. Outfitted with heavy-duty zipper closure, mic tabs, radio pocket, and multiple utility pockets for on-site engineers.",
    features: [
      "100% breathable fluorescent polyester mesh fabric",
      "2-inch wide EN-approved glass-bead reflective tape",
      "Zip-front closure with durable reinforced piping",
      "Multi-pocket configuration: clear ID holder, radio pocket, and pen slots",
      "Machine washable with reflective intensity holding up to 25 washes"
    ],
    imageUrl: "/src/assets/images/safety_vest_1783008324447.jpg",
    standard: "EN ISO 20471 Class 2 / ANSI/ISEA 107-2015 Class 2",
    rating: 4.7,
    inStock: true,
    unit: "Piece"
  },
  {
    id: "ppe-goggles-04",
    name: "ClearVision Splash-Guard Safety Goggles",
    category: "Personal Protective Equipment",
    subcategory: "Eye Protection",
    description: "Indirect-ventilated safety goggles offering top-tier protection against chemical splashes, liquid sprays, and flying high-velocity particulates. Outfitted with dual-coated anti-fog and anti-scratch lenses with 99.9% UV protection.",
    features: [
      "Soft, flexible PVC frame wraps comfortably around the face",
      "Indirect ventilation ports minimize fogging while blocking liquid entry",
      "Dual-pane polycarbonate lens with premium anti-scratch & anti-fog treatments",
      "Adjustable elastic headband for a secure, customized seal",
      "Fits easily over standard optical prescription eyeglasses"
    ],
    imageUrl: "/src/assets/images/safety_goggles_1783008364158.jpg",
    standard: "EN 166 3 4 BT / ANSI Z87.1+ High Impact",
    rating: 4.6,
    inStock: true,
    unit: "Piece"
  },
  {
    id: "ppe-mask-05",
    name: "ComfortBreathe FFP3 Active Carbon Respirator",
    category: "Personal Protective Equipment",
    subcategory: "Respiratory Protection",
    description: "Premium cup-shaped FFP3 respirator with a built-in exhalation valve and activated carbon layer. Designed to filter out fine hazardous dusts, oil-based mists, metal fumes, and organic vapors in refinery or fabrication environments.",
    features: [
      "High-efficiency FFP3 protection (filters up to 99% of particles)",
      "Activated carbon layer absorbs low-level organic fumes and odors",
      "Cool-Flow exhalation valve expels warm humid air to prevent heat build-up",
      "Adjustable nose clip and soft interior foam gasket ensures a tight facial seal",
      "Heavy-duty double elastic headstraps for stable pressure distribution"
    ],
    imageUrl: "/src/assets/images/respirator_mask_1783008378937.jpg",
    standard: "EN 149:2001 + A1:2009 FFP3 NR / NIOSH N99",
    rating: 4.8,
    inStock: true,
    unit: "Box of 20"
  },

  // CATEGORY 2: Industrial Safety & Security
  {
    id: "ind-gas-01",
    name: "Sentry-4 Multi-Gas Monitoring Detector",
    category: "Industrial Safety & Security",
    subcategory: "Gas Detection",
    description: "Intrinsically safe, rugged multi-gas detector that monitors combustibles (LEL), Oxygen (O2), Hydrogen Sulfide (H2S), and Carbon Monoxide (CO) simultaneously. Equipped with a high-decibel audible alarm, flashing LEDs, and vibrating alerts for noisy environments.",
    features: [
      "Simultaneous detection of 4 critical gases: LEL, O2, H2S, and CO",
      "Intrinsically safe design with ATEX Zone 0 and UL Class I Div 1 approvals",
      "IP68 dust/water protection with tough, shockproof rubberized housing",
      "95dB acoustic alarm, high-visibility 360-degree LED bars, and vibration",
      "Rechargeable Li-ion battery with up to 18 hours of continuous runtime"
    ],
    imageUrl: "/src/assets/images/gas_detector_1783008392061.jpg",
    standard: "ATEX II 1G Ex ia IIC T4 Ga / IECEx / UL Class I, Div 1",
    rating: 4.9,
    inStock: true,
    unit: "Set"
  },
  {
    id: "ind-harness-02",
    name: "SafeClimb Fall-Arrest 5-Point Safety Harness",
    category: "Industrial Safety & Security",
    subcategory: "Fall Protection",
    description: "Professional full-body 5-point fall arrest harness engineered for high-altitude electrical, construction, and scaffolding works. Features dorsal and sternal steel D-rings, comfortable padding on shoulders and thighs, and quick-connect buckles.",
    features: [
      "Dorsal and sternal high-tensile steel D-rings for versatile fall arrest lines",
      "5-point adjustment system (shoulders, chest, and leg straps) for tailored fit",
      "Comfort-pad lining on back, shoulders, and legs reduces fatigue and pressure",
      "Rip-indicator seams show if the harness has suffered fall load stress",
      "IP54 high-visibility polyester webbing resistant to oil, dirt, and UV damage"
    ],
    imageUrl: "/src/assets/images/safety_harness_1783008407646.jpg",
    standard: "EN 361:2002 / ANSI Z359.11",
    rating: 4.8,
    inStock: true,
    unit: "Piece"
  },
  {
    id: "ind-ext-03",
    name: "AeroGuard 9KG ABC Dry Powder Fire Extinguisher",
    category: "Industrial Safety & Security",
    subcategory: "Fire Safety",
    description: "High-capacity 9kg multipurpose ABC dry chemical powder fire extinguisher designed to suppress Class A (solids), Class B (liquids), Class C (gases), and Electrical fires. Supplied with standard high-pressure hose, discharge nozzle, wall mounting bracket, and pressure gauge.",
    features: [
      "High suppression efficiency ABC multi-purpose dry chemical agent",
      "Heavy-duty deep-drawn steel cylinder with corrosion-resistant epoxy outer coat",
      "Brass valve and high-pressure discharge rubber hose with directable horn",
      "Easy-to-read pressure indicator gauge for safety inspection checks",
      "Supplied with a sturdy wall-mounting bracket and safety pin lock"
    ],
    imageUrl: "/src/assets/images/fire_extinguisher_1783008421330.jpg",
    standard: "BS EN 3-7 Certified / Marine Equipment Directive (MED) Approved",
    rating: 4.7,
    inStock: true,
    unit: "Piece"
  },
  {
    id: "ind-loto-04",
    name: "Industrial Lockout/Tagout (LOTO) Compliance Station",
    category: "Industrial Safety & Security",
    subcategory: "Safety Compliance",
    description: "Heavy-duty wall-mounted LOTO station pre-stocked with professional safety padlocks, non-conductive HASP lockouts, high-visibility warning tags, and circuit breaker lockouts. Ensures OSHA-compliant energy isolation during machinery servicing.",
    features: [
      "Rigid high-impact polycarbonate yellow display board with key hooks",
      "Includes 5 steel-shackle safety padlocks (keyed different) with tag holders",
      "Includes 2 nylon non-conductive HASP lockouts (6-hole lock points)",
      "Includes 25 heavy-duty vinyl danger warning tags ('Do Not Operate')",
      "Assorted circuit breaker lockouts (universal clamp-on and miniature types)"
    ],
    imageUrl: "/src/assets/images/lockout_station_1783015361366.jpg",
    standard: "OSHA 29 CFR 1910.147 (Energy Control Standard)",
    rating: 4.9,
    inStock: true,
    unit: "Set"
  },

  // CATEGORY 3: Welding & Fabrication Safety
  {
    id: "wld-helmet-01",
    name: "OpticShield Auto-Darkening Welding Helmet",
    category: "Welding & Fabrication Safety",
    subcategory: "Face Protection",
    description: "Advanced solar-powered auto-darkening welding mask with high-definition optical clarity (1/1/1/1 grid rating). Featuring 4 independent arc sensors, adjustable shade ranges DIN 5-9 / 9-13, and a comfortable ergonomic 3D headgear.",
    features: [
      "True-Color liquid crystal filter provides pristine optical viewing clarity",
      "Extremely fast transition time of 1/30,000 second from light to dark state",
      "Shade range DIN 4 (light state) to DIN 5-8 / 9-13 adjustable (dark state)",
      "Four independent light arc sensors reduce risk of blind-spot delay",
      "Perfect for SMAW (Stick), GMAW (MIG/MAG), GTAW (TIG), and plasma cutting"
    ],
    imageUrl: "/src/assets/images/welding_helmet_1783008337862.jpg",
    standard: "EN 175 B / EN 379 1/1/1/1 / ANSI Z87.1 Approved",
    rating: 4.9,
    inStock: true,
    unit: "Piece"
  },
  {
    id: "wld-gloves-02",
    name: "Volcano split-leather Extreme-Heat Welder Gloves",
    category: "Welding & Fabrication Safety",
    subcategory: "Hand Protection",
    description: "Heavy-duty 16-inch split cowhide leather welding gloves lined with thermal Kevlar fabric and soft cotton. Reinforced palm, Kevlar safety stitching, and extra-long cuffs offer extreme protection against sparks, heat, molten metal splashes, and abrasion.",
    features: [
      "Made from premium thick heat-resistant split-cowhide leather",
      "Stitched with bullet-proof Kevlar thread to resist thread burn/tearing",
      "Interior fully lined with sweat-absorbing cotton and insulated Kevlar felt",
      "Reinforced thumbs and palms for superior wear resistance",
      "16-inch length provides full protection up to the mid-forearm"
    ],
    imageUrl: "/src/assets/images/welder_gloves_1783008436367.jpg",
    standard: "EN 388:2016 (4144X) / EN 407:2004 (413X4X) Type A",
    rating: 4.8,
    inStock: true,
    unit: "Pair"
  },

  // CATEGORY 4: Marine & Offshore Safety
  {
    id: "mar-solas-01",
    name: "Lee-Ventures SOLAS Offshore Marine Life Jacket",
    category: "Marine & Offshore Safety",
    subcategory: "Flotation Devices",
    description: "High-buoyancy SOLAS-compliant marine life vest engineered for offshore oil rigs, commercial vessels, and vessel transfers in Rivers State coastal waters. Features dual auto-inflation systems, high-visibility orange canvas, retro-reflective tape, marine safety whistle, and buddies line.",
    features: [
      "Double-chamber automatic inflation system (buoyancy rating: 275N)",
      "SOLAS approved high-intensity water-activated safety location light",
      "Retro-reflective tape (SOLAS Grade) on chest and inflation chambers",
      "Constructed from abrasion-resistant marine-grade nylon shell",
      "Equipped with buddy-line, rescue lifting becket, and non-clog safety whistle"
    ],
    imageUrl: "/src/assets/images/life_jacket_1783008350548.jpg",
    standard: "SOLAS 74 Convention / IMO Resolution MSC.200(80) / MED Approved",
    rating: 5.0,
    inStock: true,
    unit: "Piece"
  },
  {
    id: "mar-eebd-02",
    name: "SafeEscape 15-Minute Marine Emergency Breathing Device",
    category: "Marine & Offshore Safety",
    subcategory: "Breathing Apparatus",
    description: "Compact Emergency Escape Breathing Device (EEBD) providing 15 minutes of constant fresh air flow for rapid escape from hazardous gas filled rooms, machine rooms, and vessel accommodation spaces.",
    features: [
      "Constant-flow compressed air cylinder supplying 15 full minutes of oxygen",
      "Flame-retardant, high-visibility hood with fog-resistant wide viewing visor",
      "Simple, automatic pull-to-activate mechanism for rapid emergency deploy",
      "Built-in visual pressure gauge on carrying case for fast routine check",
      "Heavy-duty orange protective carrying bag with ergonomic shoulder strap"
    ],
    imageUrl: "/src/assets/images/respirator_mask_1783008378937.jpg",
    standard: "SOLAS Chapter II-2 / ISO 23269-1:2008 Compliant",
    rating: 4.9,
    inStock: true,
    unit: "Set"
  }
];

export const CATEGORIES = [
  "All Products",
  "Personal Protective Equipment",
  "Industrial Safety & Security",
  "Welding & Fabrication Safety",
  "Marine & Offshore Safety"
];

export const CONTACT_INFO = {
  name: "Lee Ventures Ltd",
  address: "Onyejieke Plaza, No 256 Old Aba Road, Off Artillery, Port Harcourt, Rivers State, Nigeria",
  email: "leeventure001@gmail.com",
  phone: "08032560337",
  whatsapp: "+2348032560337",
  workingHours: [
    { days: "Monday - Friday", hours: "8:00 AM - 5:30 PM" },
    { days: "Saturday", hours: "9:00 AM - 3:00 PM" },
    { days: "Sunday", hours: "Closed" }
  ],
  nigerianStates: [
    "Rivers State (Port Harcourt)", "Lagos", "Abuja FCT", "Delta (Warri)", 
    "Akwa Ibom", "Bayelsa", "Kano", "Kaduna", "Oyo", "Anambra", "Abia"
  ]
};
