import React from 'react';
import { Table } from '../../types';
import { getAvailableTables } from '../../utils/mockData';

interface TableSelectorProps {
  date: string;
  time: string;
  partySize: number;
  selectedTableId: string;
  onSelectTable: (tableId: string) => void;
}

const TableSelector: React.FC<TableSelectorProps> = ({
  date,
  time,
  partySize,
  selectedTableId,
  onSelectTable
}) => {
  const availableTables = getAvailableTables(date, time, partySize);
  
  // Group tables by location
  const groupedTables: Record<string, Table[]> = {
    window: [],
    center: [],
    bar: [],
    outdoor: []
  };
  
  availableTables.forEach(table => {
    groupedTables[table.location].push(table);
  });
  
  // Location display names
  const locationNames: Record<string, string> = {
    window: 'Window',
    center: 'Main Dining',
    bar: 'Bar Area',
    outdoor: 'Outdoor Patio'
  };

  if (availableTables.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Tables Available</h3>
        <p className="text-gray-600">
          We don't have any tables available that match your criteria.
          Please try a different time or date, or reduce your party size.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-medium text-gray-900">Select Your Preferred Table</h3>
      
      {Object.entries(groupedTables).map(([location, tables]) => (
        tables.length > 0 && (
          <div key={location} className="space-y-4">
            <h4 className="text-lg font-medium text-gray-800">{locationNames[location]}</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {tables.map(table => (
                <button
                  key={table.id}
                  type="button"
                  onClick={() => onSelectTable(table.id)}
                  className={`
                    p-4 border rounded-lg text-center transition-all
                    ${selectedTableId === table.id
                      ? 'border-2 border-burgundy-600 bg-burgundy-50'
                      : 'border-gray-300 hover:border-burgundy-300 bg-white'}
                  `}
                >
                  <div className="flex flex-col items-center">
                    {/* Table icon/shape based on capacity */}
                    <div 
                      className={`
                        w-16 h-16 flex items-center justify-center mb-2 rounded-md
                        ${table.capacity <= 2 ? 'rounded-full' : ''}
                        ${table.capacity >= 6 ? 'w-20' : ''}
                        ${selectedTableId === table.id ? 'bg-burgundy-200' : 'bg-gray-100'}
                      `}
                    >
                      <span className="text-lg font-semibold">
                        {table.number}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      Table {table.number}
                    </span>
                    <span className="text-xs text-gray-600">
                      Seats {table.capacity}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default TableSelector;