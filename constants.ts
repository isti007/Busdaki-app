
import { Bus, CrowdLevel } from './types';

export const MOCK_BUSES: Bus[] = [
  {
    id: '1',
    routeNumber: '10',
    routeName: 'City Ride',
    origin: 'GEC Circle',
    destination: 'Agrabad',
    currentLocation: 'Wasa More',
    crowdLevel: CrowdLevel.HIGH,
    etaMinutes: 5,
    nextStop: 'Lalkhan Bazar',
    isSafeCertified: true,
    totalSeats: 40,
    availableSeats: 2,
  },
  {
    id: '2',
    routeNumber: '4',
    routeName: 'Metro Probhati',
    origin: 'New Market',
    destination: 'Chittagong University',
    currentLocation: 'Muradpur',
    crowdLevel: CrowdLevel.LOW,
    etaMinutes: 12,
    nextStop: '2 No Gate',
    isSafeCertified: true,
    totalSeats: 52,
    availableSeats: 28,
  },
  {
    id: '3',
    routeNumber: '8',
    routeName: 'Bahaddarhat Express',
    origin: 'Bahaddarhat',
    destination: 'Patenga',
    currentLocation: 'Chawkbazar',
    crowdLevel: CrowdLevel.MODERATE,
    etaMinutes: 8,
    nextStop: 'Andarkilla',
    isSafeCertified: false,
    totalSeats: 36,
    availableSeats: 12,
  },
  {
    id: '4',
    routeNumber: '1',
    routeName: 'Kalurghat Local',
    origin: 'Kalurghat',
    destination: 'Kotwali',
    currentLocation: 'Chandgaon',
    crowdLevel: CrowdLevel.HIGH,
    etaMinutes: 3,
    nextStop: 'Bahaddarhat',
    isSafeCertified: false,
    totalSeats: 40,
    availableSeats: 0,
  }
];

export const SAFETY_TIPS = [
  "Share your live location with trusted contacts via the Safety tab.",
  "Avoid boarding buses marked with Red Crowd Level during peak hours.",
  "Sit near the driver or conductor if traveling alone at night.",
  "Use the 'Report' button immediately if you feel unsafe."
];
