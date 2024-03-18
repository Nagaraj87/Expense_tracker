'use client'

import React, { useState, useEffect } from 'react';

export default function CurrentYearDatePicker() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear(), 0, 1); // Set date to January 1st of current year
    setDate(currentDate);
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleChange = (event) => {
    setDate(new Date(event.target.value));
  };

  return (
    <div className="mb-4">
      <label htmlFor="date" className="text-gray-700 font-medium mb-1">
        Date
      </label>
      <input
        type="date"
        id="date"
        name='Date'
        value={date.toISOString().split('T')[0]} // Extract date part only
        onChange={handleChange}
        className="px-3 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
        required
      />
    </div>
  );
};
