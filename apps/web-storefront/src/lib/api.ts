import { PropertySummary, PropertySearchFilters, Property, BookingQuote } from "@welqo/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/v1";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorMessage: string = "An error occurred";
    try {
      const errorData = await response.json();
      const message = errorData.message || errorData.error || errorData;
      errorMessage = typeof message === "string" ? message : JSON.stringify(message);
    } catch (e) {
      errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export async function getProperties(filters: PropertySearchFilters = {}): Promise<{ properties: PropertySummary[], distribution: number[] }> {
  const query = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach(v => query.append(key, String(v)));
      } else {
        query.append(key, String(value));
      }
    }
  });

  const data = await fetchApi(`/properties?${query.toString()}`, {
    next: { revalidate: 60 }, // Cache for 1 min
  });

  // 🪄 UI Enhancement: Inject mock images for the hover gallery
  const properties = data.properties.map((p: PropertySummary) => ({
    ...p,
    images: [
      p.coverPhoto,
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop",
    ]
  }));

  return { ...data, properties };
}

export async function getProperty(slug: string): Promise<Property | null> {
  try {
    return await fetchApi(`/properties/${slug}`);
  } catch (error) {
    if (error instanceof Error && error.message.includes("404")) {
      return null;
    }
    throw error;
  }
}

export async function getQuote(params: {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}): Promise<BookingQuote> {
  const query = new URLSearchParams({
    propertyId: params.propertyId,
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    guests: params.guests.toString(),
  }).toString();
  
  const res = await fetch(`${API_URL}/booking/quote?${query}`, {
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error("Failed to fetch quote");
  return res.json();
}
