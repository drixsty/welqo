"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beds24Client = void 0;
const axios_1 = __importDefault(require("axios"));
class Beds24Client {
  client;
  constructor(apiKey) {
    this.client = axios_1.default.create({
      baseURL: "https://api.beds24.com/v2",
      headers: {
        token: apiKey,
        "Content-Type": "application/json",
      },
    });
  }
  async getBookings(params) {
    const response = await this.client.get("/bookings", { params });
    return response.data;
  }
  async createBooking(booking) {
    const response = await this.client.post("/bookings", booking);
    return response.data;
  }
  async getCalendar(params) {
    const response = await this.client.get("/calendar", { params });
    return response.data;
  }
  async getProperties() {
    const response = await this.client.get("/properties");
    return response.data;
  }
}
exports.Beds24Client = Beds24Client;
//# sourceMappingURL=index.js.map
