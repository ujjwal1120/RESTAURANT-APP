import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { Calendar, Clock, Users } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Reservation } from '../types';
import { tables } from '../utils/mockData';

const Admin: React.FC = () => {
  const { reservations, getReservationsByDate, updateReservationStatus } = useBooking();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Get all reservations for the selected date
  const dateReservations = getReservationsByDate(selectedDate);
  
  // Filter reservations by search term
  const filteredReservations = searchTerm
    ? reservations.filter(res => 
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : dateReservations;
  
  // Generate the next 14 days for date selection
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const formattedDate = date.toISOString().split('T')[0];
      const displayDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      
      dates.push({
        value: formattedDate,
        label: displayDate,
        isToday: i === 0
      });
    }
    
    return dates;
  };
  
  const dateOptions = generateDateOptions();
  
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
  
  // Get table details
  const getTableDetails = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    return table ? `Table ${table.number}` : 'Unknown Table';
  };
  
  // Handle status change
  const handleStatusChange = (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    updateReservationStatus(id, status);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Admin Dashboard</h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Manage reservations and view booking details.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative mt-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email, or ID"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500 w-full md:w-64"
                />
              </div>
            </div>
          </div>
          
          {/* Date Select */}
          {!searchTerm && (
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-900 mb-3">Select Date</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {dateOptions.map((date) => (
                  <button
                    key={date.value}
                    type="button"
                    onClick={() => setSelectedDate(date.value)}
                    className={`
                      py-2 px-3 rounded-md text-center transition-all
                      ${selectedDate === date.value
                        ? 'bg-burgundy-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:border-burgundy-500'}
                    `}
                  >
                    <span className="block text-xs font-medium">
                      {date.isToday ? 'Today' : date.label.split(',')[0]}
                    </span>
                    <span className="block mt-1">
                      {date.label.split(',')[1].trim()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Reservations */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-900">
                {searchTerm 
                  ? 'Search Results' 
                  : `Reservations for ${formatDate(selectedDate)}`}
              </h2>
            </div>
            
            {filteredReservations.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="text-gray-500">No reservations found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Guest
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reservation.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{reservation.name}</div>
                          <div className="text-sm text-gray-500">{reservation.email}</div>
                          <div className="text-sm text-gray-500">{reservation.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-burgundy-600 mr-1" />
                            <span className="text-sm text-gray-900">{formatDate(reservation.date)}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-4 w-4 text-burgundy-600 mr-1" />
                            <span className="text-sm text-gray-900">{formatTime(reservation.time)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-burgundy-600 mr-1" />
                            <span className="text-sm text-gray-900">{reservation.partySize} guests</span>
                          </div>
                          <div className="text-sm text-gray-900 mt-1">{getTableDetails(reservation.tableId)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                              reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}
                          >
                            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {reservation.status !== 'confirmed' && (
                              <button 
                                onClick={() => handleStatusChange(reservation.id, 'confirmed')}
                                className="text-green-600 hover:text-green-900 text-sm"
                              >
                                Confirm
                              </button>
                            )}
                            {reservation.status !== 'cancelled' && (
                              <button 
                                onClick={() => handleStatusChange(reservation.id, 'cancelled')}
                                className="text-red-600 hover:text-red-900 text-sm"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;