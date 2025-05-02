import React, { createContext, useContext, useState } from 'react';
import { Reservation, Table } from '../types';
import { generateReservationId, reservations as mockReservations } from '../utils/mockData';

interface BookingContextType {
  reservations: Reservation[];
  activeReservation: Partial<Reservation> | null;
  setActiveReservation: (reservation: Partial<Reservation> | null) => void;
  createReservation: (reservation: Omit<Reservation, 'id' | 'status'>) => string;
  getReservation: (id: string) => Reservation | undefined;
  updateReservationStatus: (id: string, status: 'pending' | 'confirmed' | 'cancelled') => void;
  getReservationsByDate: (date: string) => Reservation[];
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [activeReservation, setActiveReservation] = useState<Partial<Reservation> | null>(null);

  const createReservation = (reservationData: Omit<Reservation, 'id' | 'status'>) => {
    const id = generateReservationId();
    const newReservation: Reservation = {
      ...reservationData,
      id,
      status: 'pending'
    };
    
    setReservations(prev => [...prev, newReservation]);
    return id;
  };

  const getReservation = (id: string) => {
    return reservations.find(res => res.id === id);
  };

  const updateReservationStatus = (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    setReservations(prev => 
      prev.map(res => 
        res.id === id ? { ...res, status } : res
      )
    );
  };

  const getReservationsByDate = (date: string) => {
    return reservations.filter(res => res.date === date);
  };

  return (
    <BookingContext.Provider 
      value={{ 
        reservations, 
        activeReservation, 
        setActiveReservation, 
        createReservation,
        getReservation,
        updateReservationStatus,
        getReservationsByDate
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};