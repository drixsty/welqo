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
export declare class Beds24Client {
  private client;
  constructor(apiKey: string);
  getBookings(params?: any): Promise<any>;
  createBooking(booking: Beds24Booking): Promise<any>;
  getCalendar(params: {
    propertyId: number;
    startDate: string;
    endDate: string;
  }): Promise<any>;
  getProperties(): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map
