import axios, { type AxiosInstance } from "axios";

export interface Beds24Booking {
  id?: number;
  arrival: string;
  departure: string;
  propertyId: number;
  roomId: number;
  firstName: string;
  lastName: string;
  email: string;
  numAdult: number;
  status?: string;
  apiSource?: string;
}

export class Beds24Client {
  private client: AxiosInstance;

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: "https://api.beds24.com/v2",
      headers: {
        token: apiKey,
        "Content-Type": "application/json",
      },
    });
  }

  async getBookings(params?: any) {
    const response = await this.client.get("/bookings", { params });
    return response.data;
  }

  async createBooking(booking: Beds24Booking) {
    const response = await this.client.post("/bookings", booking);
    return response.data;
  }

  async getCalendar(params: {
    propertyId: number;
    startDate: string;
    endDate: string;
  }) {
    const response = await this.client.get("/calendar", { params });
    return response.data;
  }

  async getProperties() {
    const response = await this.client.get("/properties");
    return response.data;
  }
}
