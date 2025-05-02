import React from 'react';
import Input from '../common/Input';
import Select from '../common/Select';

interface GuestDetailsFormProps {
  name: string;
  email: string;
  phone: string;
  partySize: number;
  specialRequests: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onPartySizeChange: (size: number) => void;
  onSpecialRequestsChange: (requests: string) => void;
}

const GuestDetailsForm: React.FC<GuestDetailsFormProps> = ({
  name,
  email,
  phone,
  partySize,
  specialRequests,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onPartySizeChange,
  onSpecialRequestsChange
}) => {
  // Generate party size options (1-10 people)
  const partySizeOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} ${i === 0 ? 'person' : 'people'}`
  }));

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900">Guest Details</h3>
      
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          required
          fullWidth
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          fullWidth
        />
        
        <Input
          label="Phone Number"
          type="tel"
          placeholder="(555) 123-4567"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          required
          fullWidth
        />
        
        <Select
          label="Party Size"
          options={partySizeOptions}
          value={partySize}
          onChange={(e) => onPartySizeChange(Number(e.target.value))}
          required
          fullWidth
        />
        
        <div className="mb-4">
          <label htmlFor="special-requests" className="block mb-2 text-sm font-medium text-gray-700">
            Special Requests (Optional)
          </label>
          <textarea
            id="special-requests"
            rows={3}
            value={specialRequests}
            onChange={(e) => onSpecialRequestsChange(e.target.value)}
            placeholder="Any allergies, dietary restrictions, or special occasions?"
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500"
          />
        </div>
      </div>
    </div>
  );
};

export default GuestDetailsForm;