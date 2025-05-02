import React, { useState } from 'react';
import { Search, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useBooking } from '../context/BookingContext';
import { Reservation } from '../types';

const ReservationStatus: React.FC = () => {
  const { getReservation, updateReservationStatus } = useBooking();
  
  const [reservationId, setReservationId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [foundReservation, setFoundReservation] = useState<Reservation | null>(null);
  const [error, setError] = useState<string>('');
  
  // Handle lookup form submission
  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setError('');
    
    // Simulate API lookup with a small delay
    setTimeout(() => {
      const reservation = getReservation(reservationId);
      
      if (!reservation) {
        setError('No reservation found with that ID');
        setFoundReservation(null);
      } else if (reservation.email.toLowerCase() !== email.toLowerCase()) {
        setError('Email does not match the reservation');
        setFoundReservation(null);
      } else {
        setFoundReservation(reservation);
      }
      
      setSearching(false);
    }, 800);
  };
  
  // Handle reservation cancellation
  const handleCancel = () => {
    if (foundReservation) {
      updateReservationStatus(foundReservation.id, 'cancelled');
      // Refresh reservation data
      setFoundReservation({
        ...foundReservation,
        status: 'cancelled'
      });
    }
  };
  
  // Get status icon component based on reservation status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-6 w-6 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format time for display (convert from 24h to 12h format)
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Check Your Reservation Status</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter your reservation ID and email to check the status of your booking.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-2xl mx-auto">
            {!foundReservation ? (
              <form onSubmit={handleLookup} className="space-y-4">
                <Input
                  label="Reservation ID"
                  type="text"
                  value={reservationId}
                  onChange={(e) => setReservationId(e.target.value)}
                  placeholder="Enter your reservation ID"
                  required
                  fullWidth
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter the email used for booking"
                  required
                  fullWidth
                />
                
                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-md">
                    {error}
                  </div>
                )}
                
                <div className="pt-2">
                  <Button 
                    variant="primary" 
                    fullWidth 
                    type="submit" 
                    disabled={searching}
                    className="flex items-center justify-center"
                  >
                    {searching ? (
                      <span>Searching...</span>
                    ) : (
                      <>
                        <Search className="h-5 w-5 mr-2" />
                        <span>Find My Reservation</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-gray-900">Reservation Found</h2>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-2">
                      {getStatusIcon(foundReservation.status)}
                      <span className="ml-1 capitalize">{foundReservation.status}</span>
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-3 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Reservation ID</dt>
                      <dd className="text-sm text-gray-900 col-span-2">{foundReservation.id}</dd>
                    </div>
                    <div className="py-3 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="text-sm text-gray-900 col-span-2">{foundReservation.name}</dd>
                    </div>
                    <div className="py-3 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Date</dt>
                      <dd className="text-sm text-gray-900 col-span-2">{formatDate(foundReservation.date)}</dd>
                    </div>
                    <div className="py-3 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Time</dt>
                      <dd className="text-sm text-gray-900 col-span-2">{formatTime(foundReservation.time)}</dd>
                    </div>
                    <div className="py-3 grid grid-cols-3 gap-4">
                      <dt className="text-sm font-medium text-gray-500">Party Size</dt>
                      <dd className="text-sm text-gray-900 col-span-2">
                        {foundReservation.partySize} {foundReservation.partySize === 1 ? 'person' : 'people'}
                      </dd>
                    </div>
                    {foundReservation.specialRequests && (
                      <div className="py-3 grid grid-cols-3 gap-4">
                        <dt className="text-sm font-medium text-gray-500">Special Requests</dt>
                        <dd className="text-sm text-gray-900 col-span-2">{foundReservation.specialRequests}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                
                <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFoundReservation(null);
                      setReservationId('');
                      setEmail('');
                    }}
                  >
                    Look Up Another Reservation
                  </Button>
                  
                  {foundReservation.status !== 'cancelled' && (
                    <Button 
                      variant="danger" 
                      onClick={handleCancel}
                    >
                      Cancel Reservation
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReservationStatus;