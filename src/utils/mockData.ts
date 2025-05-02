import { Reservation, Table, TimeSlot } from '../types';

// Mock tables data
export const tables: Table[] = [
  { id: 't1', number: 1, capacity: 2, location: 'window', isAvailable: true },
  { id: 't2', number: 2, capacity: 2, location: 'window', isAvailable: true },
  { id: 't3', number: 3, capacity: 4, location: 'center', isAvailable: true },
  { id: 't4', number: 4, capacity: 4, location: 'center', isAvailable: true },
  { id: 't5', number: 5, capacity: 6, location: 'center', isAvailable: true },
  { id: 't6', number: 6, capacity: 8, location: 'center', isAvailable: true },
  { id: 't7', number: 7, capacity: 2, location: 'bar', isAvailable: true },
  { id: 't8', number: 8, capacity: 2, location: 'bar', isAvailable: true },
  { id: 't9', number: 9, capacity: 4, location: 'outdoor', isAvailable: true },
  { id: 't10', number: 10, capacity: 6, location: 'outdoor', isAvailable: true },
];

// Generate time slots from 5:00 PM to 10:00 PM with 30 min intervals
export const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 17; // 5 PM
  const endHour = 22; // 10 PM

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minutes of [0, 30]) {
      // Don't add 10:30 PM
      if (hour === endHour && minutes === 30) continue;
      
      const hourString = hour.toString().padStart(2, '0');
      const minuteString = minutes.toString().padStart(2, '0');
      const timeString = `${hourString}:${minuteString}`;
      
      slots.push({
        id: `slot-${timeString}`,
        time: timeString,
        available: Math.random() > 0.3, // Randomly set some as unavailable
      });
    }
  }
  
  return slots;
};

// Mock reservations
export const reservations: Reservation[] = [
  {
    id: 'res1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-123-4567',
    date: '2025-04-15',
    time: '19:00',
    partySize: 4,
    tableId: 't3',
    specialRequests: 'Anniversary celebration',
    status: 'confirmed'
  },
  {
    id: 'res2',
    name: 'Emily Smith',
    email: 'emily@example.com',
    phone: '555-987-6543',
    date: '2025-04-15',
    time: '20:00',
    partySize: 2,
    tableId: 't1',
    status: 'confirmed'
  },
  {
    id: 'res3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '555-456-7890',
    date: '2025-04-16',
    time: '18:30',
    partySize: 6,
    tableId: 't5',
    specialRequests: 'Child seat needed',
    status: 'pending'
  }
];

// Function to generate a fake reservation ID
export const generateReservationId = (): string => {
  return 'res' + Math.floor(Math.random() * 10000).toString();
};

// Check if table is available for a given date and time
export const isTableAvailable = (tableId: string, date: string, time: string): boolean => {
  const existingReservation = reservations.find(
    res => res.tableId === tableId && res.date === date && res.time === time && res.status !== 'cancelled'
  );
  
  return !existingReservation;
};

// Get available tables for a specific date, time and party size
export const getAvailableTables = (date: string, time: string, partySize: number): Table[] => {
  return tables.filter(table => {
    const isSizeAppropriate = table.capacity >= partySize && table.capacity <= partySize + 2;
    return isSizeAppropriate && isTableAvailable(table.id, date, time);
  });
};