
'use client'

import React, { useState, useEffect } from 'react';
import app from './../../shared/firebaseConfig';
import { addDoc, getFirestore, collection } from "firebase/firestore";
import Toast from './Toast';
import './styles.css'; // Import your CSS file

export default function VehicleForm() {
  const [formData, setFormData] = useState({
    VehicleName: '',
    Date: '',
    Diesel: 0,
    FastTag: 0,
    Maintenance: 0,
    RentalAmount: 0,
  });
  const vehicleOptions = [
    { value: 'Maruthi-Zen', label: 'Maruthi-Zen' },
    { value: 'Eicher', label: 'Eicher' },
    { value: 'Bharat-benz', label: 'Bharat Benz' },
    { value: 'Mahindra-pickup', label: 'Mahindra Pickup' },
    { value: 'Swaraj-madza', label: 'Swaraj Mazda' },
    { value: 'Rental-vehicle', label: 'Rental Vehicle' },
  ];
  const [showToast, setShowToast] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const db = getFirestore(app);

  const handleChange = (event) => {
    const { name, type, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) || 0 : event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Add document to Firestore collection
      const docRef = await addDoc(collection(db, 'Expense'), formData);
      console.log('Document written with ID:', docRef.id);
      setShowToast(true);

      // Replace with your form submission logic (e.g., send to server)
      console.log('Form data:', formData);

      // Reset form after submission (optional)
      setTimeout(() => {
        setFormData({
          VehicleName: '',
          Date: '',
          Diesel: 0,
          FastTag: 0,
          Maintenance: 0,
          RentalAmount: 0,
        });
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle form visibility on button click
  };

  return (
    <div className="flex justify-center items-center mt-8 mb-8">
      {/* Button to toggle form visibility */}
      {!showForm && (
        <button
          type="button"
          onClick={toggleForm}
          className="px-4 py-2 rounded-full  text-black hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          <span className="mr-2">ADD EXPENSE</span>
          <span className=" p-2 mr-2 font-bold">+</span>
        </button>
      )}

      
      {/* Expense form (conditionally rendered) */}
      {showForm && (
        <div className="border-gray-300 bg-white-200 shadow-md p-4 rounded-md w-[390px]">
          <form onSubmit={handleSubmit} className="p-4">
            <h4 className="text-xl text-black mb-4">Add Expense</h4>
            <div className="flex flex-col space-y-4"> {/* Vertical alignment for inputs */}
              <div className="flex gap-16 items-center mb-1"> {/* Minor adjustment for label spacing */}
                <label htmlFor="date" className=" font-medium text-black text-xs mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleChange}
                  className="px-3 py-2 rounded-md border text-xs text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-4 items-center mb-1">
                <label htmlFor="vehicleName" className=" font-medium text-xs text-black">
                  Vehicle Name
                </label>
                <select
                  id="vehicleName"
                  name="VehicleName"
                  value={formData.VehicleName}
                  onChange={handleChange}
                  className="px-3 py-2 text-xs rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="" className="text-xs">Select Vehicle</option>
                  {vehicleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-14 items-center mb-1">
                <label htmlFor="diesel" className=" font-medium text-black text-xs">
                  Diesel
                </label>
                <input
                  type="number"
                  id="diesel"
                  name="Diesel"
                  value={formData.Diesel}
                  onChange={handleChange}
                  className="px-3 text-xs py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex gap-12 items-center mb-1">
                <label htmlFor="fastTag" className="text-xs font-medium text-black">
                  FastTag
                </label>
                <input
                  type="number"
                  id="fastTag"
                  name="FastTag"
                  value={formData.FastTag}
                  onChange={handleChange}
                  className="text-xs px-3 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-6 items-center mb-1">
                <label htmlFor="maintenance" className=" text-xs font-medium text-black">
                  Maintenance
                </label>
                <input
                  type="number"
                  id="maintenance"
                  name="Maintenance"
                  value={formData.Maintenance}
                  onChange={handleChange}
                  className="px-3 text-xs py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4 items-center mb-1">
                <label htmlFor="rentalAmount" className="text-xs font-medium text-black">
                  Rental Amount
                </label>
                <input
                  type="number"
                  id="rentalAmount"
                  name="RentalAmount"
                  value={formData.RentalAmount}
                  onChange={handleChange}
                

                  className="px-3 py-2 text-xs rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-3 text-xs py-2 mt-5 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </form>

          {/* Toast component */}
          {showToast && <Toast message="Form submitted successfully!" onClose={handleToastClose} />}

          <button // Close button
    type="button"
    onClick={() => setShowForm(false)} // Hide form on click
    className=" text-white text-xs absolute top-0 right-0 p-2 rounded-full bg-red-700 hover:bg-black-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
  >
    Close
  </button>
        </div>
      )}
    </div>
  );
}
