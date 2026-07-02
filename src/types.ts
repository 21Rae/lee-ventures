export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  features: string[];
  imageUrl: string;
  standard: string; // Safety Compliance standard (e.g., CE EN 397, ANSI Z87.1)
  rating: number;
  inStock: boolean;
  unit: string; // e.g. "Pair", "Piece", "Set", "Roll"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  suggestedProducts?: string[]; // IDs of products to suggest to user
}

export interface QuoteRequest {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  notes: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unit: string;
  }[];
}

export interface QuoteResponse {
  success: boolean;
  quoteId: string;
  date: string;
  validUntil: string;
  clientName: string;
  email: string;
  phone: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unit: string;
  }[];
  totalItemsCount: number;
  status: "Pending Review" | "Approved" | "Processing";
  notes: string;
}
