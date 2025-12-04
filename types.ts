
export enum CrowdLevel {
  LOW = 'LOW',         // Green
  MODERATE = 'MODERATE', // Yellow
  HIGH = 'HIGH'        // Red
}

export interface Bus {
  id: string;
  routeNumber: string;
  routeName: string; // e.g., "No. 10 Route"
  origin: string;
  destination: string;
  currentLocation: string;
  crowdLevel: CrowdLevel;
  etaMinutes: number;
  nextStop: string;
  isSafeCertified: boolean; // For women safety
  totalSeats: number;
  availableSeats: number;
}

export interface Report {
  id: string;
  type: 'harassment' | 'overcrowding' | 'driver_behavior' | 'cleanliness' | 'other';
  description: string;
  timestamp: Date;
  status: 'pending' | 'resolved';
}

export interface RouteSuggestion {
  routeId: string;
  duration: string;
  cost: string;
  crowdPrediction: string;
  safetyScore: number; // 1-10
  description: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  favorites: string[];
  emergencyContacts: { name: string; phone: string }[];
}

export enum TicketType {
  REGULAR = 'REGULAR',
  STUDENT = 'STUDENT'
}

export enum PaymentMethod {
  BKASH = 'BKASH',
  NAGAD = 'NAGAD',
  CARD = 'CARD'
}

export interface Ticket {
  id: string;
  from: string;
  to: string;
  count: number;
  type: TicketType;
  totalPrice: number;
  date: Date;
  status: 'active' | 'used';
  paymentMethod: PaymentMethod;
}
