import {
  PropertySummary,
  PropertySearchFilters,
  Property,
  BookingQuote,
} from "@welqo/types";

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
      errorMessage =
        typeof message === "string" ? message : JSON.stringify(message);
    } catch {
      errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

const MOCK_PROPERTIES: any[] = [
  {
    id: "prop-1",
    slug: "appartement-bordelais",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop",
        isCover: true,
      },
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop",
        isCover: false,
      },
      {
        url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop",
        isCover: false,
      },
    ],
    amenities: [
      { key: "wifi", label: "Wifi fibre" },
      { key: "kitchen", label: "Cuisine équipée" },
      { key: "tv", label: "TV Ultra HD" },
      { key: "coffee", label: "Machine Nespresso" },
    ],
    titleFr: "Le Bordelais — Élégance & Confort",
    titleEn: "The Bordelais — Elegance & Comfort",
    descFr:
      "Un superbe appartement haussmannien en plein cœur de ville, décoré avec soin et offrant des prestations haut de gamme pour les voyageurs les plus exigeants.",
    descEn:
      "A superb Haussmannian apartment in the heart of the city, decorated with care and offering high-end services for the most demanding travelers.",
    address: "12 Rue de la Bourse, Lille",
    city: "Lille",
    latitude: 50.6372,
    longitude: 3.0633,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    surface: 75,
    basePricePerNight: 140,
    cleaningFee: 50,
    touristTax: 1.5,
  },
  {
    id: "prop-2",
    slug: "loft-industriel",
    photos: [
      {
        url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop",
        isCover: true,
      },
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2000&auto=format&fit=crop",
        isCover: false,
      },
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000&auto=format&fit=crop",
        isCover: false,
      },
    ],
    amenities: [
      { key: "wifi", label: "Wifi fibre" },
      { key: "kitchen", label: "Cuisine équipée" },
      { key: "tv", label: "TV Ultra HD" },
      { key: "ac", label: "Climatisation" },
    ],
    titleFr: "Le Loft Industriel — Design & Espace",
    titleEn: "The Industrial Loft — Design & Space",
    descFr:
      "Ancien atelier réhabilité en un loft spectaculaire avec de hauts plafonds, une verrière d'artiste et une décoration industrielle chinée.",
    descEn:
      "Former workshop rehabilitated into a spectacular loft with high ceilings, an artist's glass roof and a vintage industrial decoration.",
    address: "45 Avenue du Peuple Belge, Lille",
    city: "Lille",
    latitude: 50.6415,
    longitude: 3.0645,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    surface: 110,
    basePricePerNight: 195,
    cleaningFee: 75,
    touristTax: 2.2,
  },
];

export async function getProperties(
  filters: PropertySearchFilters = {},
): Promise<{ properties: PropertySummary[]; distribution: number[] }> {
  try {
    const query = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => query.append(key, String(v)));
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
      ],
    }));

    return { ...data, properties };
  } catch (error) {
    console.warn("API offline, falling back to mock properties data.");
    const properties: PropertySummary[] = MOCK_PROPERTIES.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.titleFr, // default fallback
      location: {
        address: p.address,
        city: p.city,
        latitude: p.latitude,
        longitude: p.longitude,
      },
      capacity: {
        maxGuests: p.maxGuests,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        surface: p.surface,
      },
      price: {
        base: p.basePricePerNight,
        cleaning: p.cleaningFee,
      },
      coverPhoto: p.photos[0].url,
      images: p.photos.map((ph: any) => ph.url),
      rating: 0,
      reviewsCount: 0,
    }));
    return {
      properties,
      distribution: [100, 150, 200],
    };
  }
}

export async function getProperty(slug: string): Promise<Property | null> {
  try {
    return await fetchApi(`/properties/${slug}`);
  } catch (error) {
    const mock = MOCK_PROPERTIES.find((p) => p.slug === slug);
    if (mock) {
      console.warn(
        `API offline, falling back to mock property data for ${slug}.`,
      );
      return mock as any;
    }
    if (error instanceof Error && error.message.includes("404")) {
      return null;
    }
    return null;
  }
}

export async function getQuote(params: {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}): Promise<BookingQuote> {
  try {
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
  } catch (error) {
    console.warn("API offline, returning mock booking quote.");
    const mockProperty =
      MOCK_PROPERTIES.find((p) => p.id === params.propertyId) ||
      MOCK_PROPERTIES[0];
    const base = mockProperty.basePricePerNight;
    const cleaning = mockProperty.cleaningFee;
    const touristTax = mockProperty.touristTax || 1.5;
    const nights = 3;
    const totalNights = base * nights;
    const totalTouristTax = touristTax * nights * params.guests;
    const totalGross = totalNights + cleaning + totalTouristTax;
    return {
      propertyId: params.propertyId,
      checkIn: params.checkIn,
      checkOut: params.checkOut,
      guests: params.guests,
      nightsCount: nights,
      priceBreakdown: {
        nightlyRate: base,
        totalNights,
        cleaningFee: cleaning,
        touristTax: totalTouristTax,
        totalGross,
      },
      securityDeposit: 300,
    };
  }
}
