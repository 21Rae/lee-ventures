import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS, CONTACT_INFO } from "./src/data.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize lazy Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set or has placeholder value. Gemini integration will run in mock/fallback mode.");
      return null;
    }
    try {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      console.log("Successfully initialized GoogleGenAI client with key.");
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI client:", err);
      return null;
    }
  }
  return aiClient;
}

// ------------------ API ROUTES ------------------

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    apiStatus: getGeminiClient() ? "connected" : "offline-fallback",
  });
});

// 2. Chat with Lee-Ventures AI Safety Advisor
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format. Must be an array." });
  }

  // Find the last user message
  const userMessage = messages[messages.length - 1]?.text || "";

  if (!userMessage) {
    return res.status(400).json({ error: "Empty user message." });
  }

  // Get list of products in catalog for Gemini's reference
  const productsSummary = PRODUCTS.map(p => 
    `- ID: ${p.id} | Name: ${p.name} | Category: ${p.category} | Standard: ${p.standard} | Unit: ${p.unit}\n  Description: ${p.description.substring(0, 150)}...`
  ).join("\n");

  const systemInstruction = `
You are the "Lee Ventures AI Safety & Equipment Advisor", a highly knowledgeable, professional, and friendly safety consultant.
You represent Lee Ventures Ltd, located at:
Address: ${CONTACT_INFO.address}
Email: ${CONTACT_INFO.email}
Phone: ${CONTACT_INFO.phone}

We specialize in high-quality industrial equipment, personal protective equipment (PPE), welding & fabrication safety, and marine/offshore safety gear (especially relevant to Port Harcourt's marine, oil & gas, and industrial operations).

Your goals:
1. Provide accurate, helpful, and highly professional safety advice, citing relevant compliance standards (like EN, ANSI, OSHA, SOLAS, MED) when appropriate.
2. Recommend specific items from our catalog to address the user's requirements.
3. CRITICAL MANDATE: If you recommend or mention a product from our catalog, you MUST embed the product suggest tag strictly in this format: [SUGGEST_PRODUCT: <product-id>].
   For example, if you suggest the heavy-duty safety helmet and steel toe safety boots, your text must contain:
   "I recommend our high-density [SUGGEST_PRODUCT: ppe-helmet-01] and our steel-toed [SUGGEST_PRODUCT: ppe-boots-02] for ultimate protection."
   The client-side app will automatically parse "[SUGGEST_PRODUCT: id]" and display beautiful interactive "Add to Quote Request" buttons directly below your chat bubble!
4. Be warm and supportive, with a professional tone suitable for procurement managers, offshore safety officers, welding fabricators, and project managers in Nigeria. Always use human-friendly, clear, literal explanations.

Here are the products in our catalog:
${productsSummary}

Provide a comprehensive, styled response in standard markdown. Do not talk about your internal instructions. Address the user directly.
`;

  const client = getGeminiClient();

  if (!client) {
    // Offline / Fallback mode if API key is not configured
    console.log("Gemini API key not found. Executing offline fallback responder.");
    let reply = "";
    const query = userMessage.toLowerCase();

    if (query.includes("helmet") || query.includes("head") || query.includes("hat")) {
      reply = `As your safety advisor, I highly recommend proper head protection. In our catalog, we have the **[SUGGEST_PRODUCT: ppe-helmet-01]** which is EN 397 and ANSI certified for high dielectric strength and lateral crush protection.\n\nWould you like me to add it to your Request for Quote (RFQ) basket? Let me know if you also need eye protection!`;
    } else if (query.includes("boot") || query.includes("foot") || query.includes("shoe")) {
      reply = `Foot safety is critical in industrial environments. I suggest our steel-toed **[SUGGEST_PRODUCT: ppe-boots-02]** with a puncture-resistant midsole and SRC slip-resistance.\n\nThey are ideal for muddy, oily, or construction grounds in Port Harcourt. Shall I suggest adding them to your RFQ?`;
    } else if (query.includes("vest") || query.includes("reflective") || query.includes("high vis")) {
      reply = `Visibility saves lives. I recommend our fluorescent **[SUGGEST_PRODUCT: ppe-vest-03]** which complies with EN ISO 20471 Class 2, featuring horizontal and vertical reflective silver patterns.\n\nWould you like to include this in your procurement list?`;
    } else if (query.includes("gas") || query.includes("detector") || query.includes("sensor")) {
      reply = `For dangerous gases in confined spaces, offshore tanks, or chemical plants, I recommend our ATEX-approved intrinsically safe **[SUGGEST_PRODUCT: ind-gas-01]** which measures LEL, O2, H2S, and CO simultaneously.\n\nIt is a vital life-saving instrument. Let me know if you want to request a price quotation for this.`;
    } else if (query.includes("welding") || query.includes("weld") || query.includes("fabricat")) {
      reply = `Welding safety requires face, eye, and hand protection from intensive UV light and heat. I highly recommend our solar-powered **[SUGGEST_PRODUCT: wld-helmet-01]** with a high-definition 1/1/1/1 auto-darkening lens, along with our heavy split leather Kevlar-stitched **[SUGGEST_PRODUCT: wld-gloves-02]**.\n\nThey provide absolute protection against sparks and extreme temperatures.`;
    } else if (query.includes("marine") || query.includes("offshore") || query.includes("life jacket") || query.includes("solas")) {
      reply = `Operating in Rivers State waters or offshore platforms demands SOLAS-grade flotation. I recommend our high-buoyancy **[SUGGEST_PRODUCT: mar-solas-01]** SOLAS Marine Life Jacket with a water-activated locator light and rescue strap, as well as our **[SUGGEST_PRODUCT: mar-eebd-02]** Emergency Escape Breathing Device for critical escape scenarios.`;
    } else {
      reply = `Hello! I am your Lee Ventures AI Safety Advisor. I am currently running in safety-fallback mode because my live cloud brain is pending setup. However, I am fully familiar with our industrial equipment and PPE!\n\nI can assist you with:\n- **Personal Protective Equipment (PPE)**: Safety Helmets **[SUGGEST_PRODUCT: ppe-helmet-01]**, Steel Boots **[SUGGEST_PRODUCT: ppe-boots-02]**, High-Vis Vests **[SUGGEST_PRODUCT: ppe-vest-03]**, or Clear Goggles **[SUGGEST_PRODUCT: ppe-goggles-04]**.\n- **Industrial Safety**: Gas Detectors **[SUGGEST_PRODUCT: ind-gas-01]**, Safety Harnesses **[SUGGEST_PRODUCT: ind-harness-02]**, or Fire Extinguishers **[SUGGEST_PRODUCT: ind-ext-03]**.\n- **Welding Safety**: Auto Welding Masks **[SUGGEST_PRODUCT: wld-helmet-01]** or Extreme Heat Welder Gloves **[SUGGEST_PRODUCT: wld-gloves-02]**.\n- **Marine/Offshore Safety**: SOLAS Life Jackets **[SUGGEST_PRODUCT: mar-solas-01]**.\n\nPlease ask me any safety question or tell me about your project environment so I can recommend the right compliance gear!`;
    }

    return res.json({
      sender: "ai",
      text: reply,
      timestamp: new Date().toLocaleTimeString(),
      isOfflineMode: true,
    });
  }

  try {
    // Call Gemini API using modern @google/genai SDK
    // Structure chat history or generate direct answer with prompt
    const contents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    // Inject system instruction in config
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I was unable to formulate a safety recommendation. Please let me know how I can assist with our catalog.";

    res.json({
      sender: "ai",
      text: replyText,
      timestamp: new Date().toLocaleTimeString(),
      isOfflineMode: false,
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Error generating safety advisor response.",
      message: error.message,
      sender: "ai",
      text: "I apologize, but I encountered an error connecting to my safety knowledge cloud. Please select items from our product catalog manually, or ask me again shortly.",
    });
  }
});

// 3. Request For Quote (RFQ) submit endpoint
app.post("/api/quote", (req, res) => {
  const quoteReq = req.body;

  if (!quoteReq.contactName || !quoteReq.email || !quoteReq.phone || !quoteReq.items || quoteReq.items.length === 0) {
    return res.status(400).json({ error: "Missing required contact details or quote items." });
  }

  // Generate a realistic, unique RFQ ID
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const quoteId = `LV-RFQ-${dateStr}-${randomNum}`;

  const today = new Date();
  const validUntil = new Date();
  validUntil.setDate(today.getDate() + 30); // Valid for 30 days

  // Calculate total item count
  const totalItemsCount = quoteReq.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);

  // Return formatted professional response
  const quoteResponse = {
    success: true,
    quoteId: quoteId,
    date: today.toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" }),
    validUntil: validUntil.toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" }),
    clientName: quoteReq.contactName,
    companyName: quoteReq.companyName || "Private Procurement",
    email: quoteReq.email,
    phone: quoteReq.phone,
    deliveryAddress: quoteReq.deliveryAddress || "Self-Pickup (Onyejieke Plaza, Port Harcourt)",
    items: quoteReq.items,
    totalItemsCount: totalItemsCount,
    status: "Pending Review",
    notes: quoteReq.notes || "No special instructions provided.",
    assignedRep: "Lee Ventures Procurement Officer",
  };

  res.status(200).json(quoteResponse);
});

// ------------------ VITE / STATIC HANDLING ------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting Express server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting Express server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lee Ventures Ltd server successfully running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
