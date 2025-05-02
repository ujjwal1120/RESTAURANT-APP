import React from 'react';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { Table } from '../../types';
import { tables } from '../../utils/mockData';
import Button from '../common/Button';

interface BookingSummaryProps {
  date: string;
  time: string;
  partySize: number;
  tableId: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  date,
  time,
  partySize,
  tableId,
  name,
  email,
  phone,
  specialRequests,
  onConfirm,
  isLoading = false
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
  
  // Get the location display name
  const getLocationName = (location: string): string => {
    const locationNames: Record<string, string> = {
      window: 'Window Side',
      center: 'Main Dining Area',
      bar: 'Bar Area',
      outdoor: 'Outdoor Patio'
    };
    return locationNames[location] || 'Unknown';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-serif font-semibold text-gray-900 mb-6">Reservation Summary</h3>
      
      <div className="space-y-4 mb-8">
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
              <p>Table {selectedTable.number} ({getLocationName(selectedTable.location)})</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-6">
        <h4 className="text-lg font-medium text-gray-800 mb-3">Guest Information</h4>
        <p className="mb-1"><span className="font-medium">Name:</span> {name}</p>
        <p className="mb-1"><span className="font-medium">Email:</span> {email}</p>
        <p className="mb-1"><span className="font-medium">Phone:</span> {phone}</p>
        
        {specialRequests && (
          <div className="mt-3">
            <p className="font-medium">Special Requests:</p>
            <p className="text-gray-700 italic">{specialRequests}</p>
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-4">
        <p className="text-sm text-gray-600 mb-4">
          By confirming your reservation, you agree to our cancellation policy. Reservations can be cancelled or modified up to 24 hours in advance.
        </p>
      </div>
      
      <Button 
        variant="primary" 
        fullWidth 
        onClick={onConfirm}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Confirm Reservation'}
      </Button>
    </div>
  );
};

export default BookingSummary;