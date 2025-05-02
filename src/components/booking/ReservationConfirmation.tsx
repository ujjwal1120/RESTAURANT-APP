import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { tables } from '../../utils/mockData';

interface ReservationConfirmationProps {
  reservationId: string;
  date: string;
  time: string;
  tableId: string;
  partySize: number;
  name: string;
}

const ReservationConfirmation: React.FC<ReservationConfirmationProps> = ({
  reservationId,
  date,
  time,
  tableId,
  partySize,
  name
}) => {
  // Find the selected table
  const selectedTable = tables.find(table => table.id === tableId);
  
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
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Reservation Confirmed!</h2>
        <p className="text-gray-600">
          Thank you, {name}! Your reservation has been successfully placed.
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Reservation Details</h3>
          <p className="text-sm text-gray-500">ID: {reservationId}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-burgundy-600 mr-3 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Date</p>
              <p>{formatDate(date)}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-burgundy-600 mr-3 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Time</p>
              <p>{formatTime(time)}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Users className="h-5 w-5 text-burgundy-600 mr-3 mt-1" />
            <div>
              <p className="font-medium text-gray-700">Party Size</p>
              <p>{partySize} {partySize === 1 ? 'person' : 'people'}</p>
            </div>
          </div>
          
          {selectedTable && (
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-burgundy-600 mr-3 mt-1" />
              <div>
                <p className="font-medium text-gray-700">Table</p>
                <p>Table {selectedTable.number}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 space-y-3 text-center">
        <p className="text-gray-600">
          We've sent a confirmation email with all the details of your reservation. 
          You can also check your reservation status anytime.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <Link to="/status">
            <Button variant="primary">Check Reservation Status</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Return to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmation;