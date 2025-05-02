import React from 'react';
import { generateTimeSlots } from '../../utils/mockData';

interface DateTimePickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange
}) => {
  // Generate the next 14 days for selection
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
  const timeSlots = generateTimeSlots();
  
  // Convert 24-hour format to 12-hour format for display
  const formatTimeDisplay = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Select a Date</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {dateOptions.map((date) => (
            <button
              key={date.value}
              type="button"
              onClick={() => onDateChange(date.value)}
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
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Select a Time</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              disabled={!slot.available}
              onClick={() => onTimeChange(slot.time)}
              className={`
                py-2 px-3 rounded-md text-center transition-all
                ${selectedTime === slot.time 
                  ? 'bg-burgundy-600 text-white' 
                  : slot.available 
                    ? 'bg-white border border-gray-300 text-gray-700 hover:border-burgundy-500'
                    : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'}
              `}
            >
              {formatTimeDisplay(slot.time)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateTimePicker;