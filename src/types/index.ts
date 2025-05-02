export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  tableId: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  location: 'window' | 'center' | 'bar' | 'outdoor';
  isAvailable: boolean;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}