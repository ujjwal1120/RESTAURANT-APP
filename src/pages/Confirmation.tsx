import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ReservationConfirmation from '../components/booking/ReservationConfirmation';
import { useBooking } from '../context/BookingContext';

const Confirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getReservation, updateReservationStatus } = useBooking();
  
  // Find the reservation with the given ID
  const reservation = id ? getReservation(id) : undefined;
  
  // Update the reservation status to confirmed (simulating backend process)
  useEffect(() => {
    if (id && reservation?.status === 'pending') {
      updateReservationStatus(id, 'confirmed');
    }
  }, [id, reservation, updateReservationStatus]);
  
  // Redirect to home page if no reservation is found
  if (!reservation) {
    return <Navigate to="/" />;
  }
  
  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReservationConfirmation
            reservationId={reservation.id}
            date={reservation.date}
            time={reservation.time}
            tableId={reservation.tableId}
            partySize={reservation.partySize}
            name={reservation.name}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Confirmation;