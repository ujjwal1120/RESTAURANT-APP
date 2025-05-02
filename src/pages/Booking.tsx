import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import DateTimePicker from '../components/booking/DateTimePicker';
import TableSelector from '../components/booking/TableSelector';
import GuestDetailsForm from '../components/booking/GuestDetailsForm';
import BookingSummary from '../components/booking/BookingSummary';
import Button from '../components/common/Button';
import { useBooking } from '../context/BookingContext';

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const { createReservation } = useBooking();

  // Current step in the booking process
  const [currentStep, setCurrentStep] = useState(1);
  
  // Booking information state
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [partySize, setPartySize] = useState<number>(2);
  const [tableId, setTableId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Steps validation
  const isDateTimeValid = date && time;
  const isTableValid = tableId;
  const isGuestDetailsValid = name && email && phone;
  
  // Handle step navigation
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle final submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Create the reservation
    const reservationId = createReservation({
      name,
      email,
      phone,
      date,
      time,
      partySize,
      tableId,
      specialRequests
    });
    
    // Simulate a delay for processing
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to the confirmation page with the reservation ID
      navigate(`/confirmation/${reservationId}`);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Reserve Your Table</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete the steps below to secure your preferred table at Gourmet Table.
            </p>
          </div>
          
          {/* Booking Steps Indicator */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="grid grid-cols-3 gap-2">
              <div 
                className={`py-3 px-4 rounded-lg text-center transition-colors 
                  ${currentStep >= 1 ? 'bg-burgundy-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <span className="block font-medium">Date & Time</span>
              </div>
              <div 
                className={`py-3 px-4 rounded-lg text-center transition-colors
                  ${currentStep >= 2 ? 'bg-burgundy-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <span className="block font-medium">Table Selection</span>
              </div>
              <div 
                className={`py-3 px-4 rounded-lg text-center transition-colors
                  ${currentStep >= 3 ? 'bg-burgundy-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <span className="block font-medium">Guest Details</span>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              {/* Step 1: Date and Time Selection */}
              {currentStep === 1 && (
                <div>
                  <DateTimePicker
                    selectedDate={date}
                    selectedTime={time}
                    onDateChange={setDate}
                    onTimeChange={setTime}
                  />
                  
                  <div className="mt-8 flex justify-end">
                    <Button 
                      variant="primary" 
                      onClick={nextStep}
                      disabled={!isDateTimeValid}
                    >
                      Continue to Table Selection
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Table Selection */}
              {currentStep === 2 && (
                <div>
                  <TableSelector
                    date={date}
                    time={time}
                    partySize={partySize}
                    selectedTableId={tableId}
                    onSelectTable={setTableId}
                  />
                  
                  <div className="mt-8 flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={prevStep}
                    >
                      Back to Date & Time
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={nextStep}
                      disabled={!isTableValid}
                    >
                      Continue to Guest Details
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Guest Details */}
              {currentStep === 3 && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <GuestDetailsForm
                      name={name}
                      email={email}
                      phone={phone}
                      partySize={partySize}
                      specialRequests={specialRequests}
                      onNameChange={setName}
                      onEmailChange={setEmail}
                      onPhoneChange={setPhone}
                      onPartySizeChange={setPartySize}
                      onSpecialRequestsChange={setSpecialRequests}
                    />
                    
                    <div className="mt-8 flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={prevStep}
                      >
                        Back to Table Selection
                      </Button>
                      <Button 
                        variant="primary" 
                        onClick={nextStep}
                        disabled={!isGuestDetailsValid}
                      >
                        Review Reservation
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg self-start">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Your Reservation So Far</h3>
                    <p className="mb-2"><span className="font-medium">Date:</span> {date}</p>
                    <p className="mb-2"><span className="font-medium">Time:</span> {time}</p>
                    <p className="mb-2"><span className="font-medium">Party Size:</span> {partySize} {partySize === 1 ? 'person' : 'people'}</p>
                    <p className="mb-2"><span className="font-medium">Table ID:</span> {tableId}</p>
                  </div>
                </div>
              )}
              
              {/* Step 4: Review and Confirm */}
              {currentStep === 4 && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-6">Review Your Reservation</h3>
                    <p className="text-gray-600 mb-6">
                      Please review all the details of your reservation below. 
                      If everything looks correct, click "Confirm Reservation" to proceed.
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-800 mb-3">Cancellation Policy</h4>
                      <p className="text-sm text-gray-600">
                        Reservations can be cancelled or modified up to 24 hours before your scheduled time.
                        For same-day cancellations, please contact us directly by phone.
                      </p>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={prevStep}
                      >
                        Back to Guest Details
                      </Button>
                    </div>
                  </div>
                  
                  <BookingSummary
                    date={date}
                    time={time}
                    partySize={partySize}
                    tableId={tableId}
                    name={name}
                    email={email}
                    phone={phone}
                    specialRequests={specialRequests}
                    onConfirm={handleSubmit}
                    isLoading={isSubmitting}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;