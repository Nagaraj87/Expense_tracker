'use client'

import React, { useState, useEffect } from 'react';
import app from './../../shared/firebaseConfig';
import { collection, getDocs, getDoc, doc, deleteDoc, getFirestore, updateDoc, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';


export default function ExpenseList() {
  const router = useRouter();
  const [projects, setProjects] = useState([]); // State to store projects
  const [selectedFilter, setSelectedFilter] = useState(''); // State to store the selected filter
  const [selectedProject, setSelectedProject] = useState(null);
  const [totals, setTotals] = useState({ Diesel: 0, FastTag: 0, Maintenance: 0, RentalAmount: 0 });

  useEffect(() => {
    const getProjects = async () => {
      try {
        const db = getFirestore(app);
        let q;

        if (selectedFilter === '') {
          q = query(collection(db, "Expense"), orderBy("Date")); // Initial query for all projects
        } else {
          q = query(collection(db, "Expense"), where("VehicleName", "==", selectedFilter), orderBy("Diesel")); // Filter by VehicleName
        }

        const querySnapshot = await getDocs(q, { useClient: true }); // Fetch data on client-side

        setProjects(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        // Calculate initial totals on data fetch
        const initialTotals = processedProjects.reduce(
          (acc, project) => ({
            Diesel: acc.Diesel + project.Diesel,
            FastTag: acc.FastTag + project.FastTag,
            Maintenance: acc.Maintenance + project.Maintenance,
            RentalAmount: acc.RentalAmount + project.RentalAmount,
          }),

        );
        setTotals(initialTotals);

      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    getProjects(); // Call the function on component mount
  }, [selectedFilter]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter); // Update selected filter state on click
    console.log(filter);
  };



  const handleDeleteClick = async (projectId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this project? This action cannot be undone."
      );
  
      if (confirmDelete) {
        const db = getFirestore(app);
        await deleteDoc(doc(db, "Expense", projectId));
        console.log("Project deleted:", projectId);
  
        // Update local state to reflect deletion (optional)
        setProjects(projects.filter((project) => project.id !== projectId));
      } else {
        console.log("Project deletion cancelled.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  

  return (
    <div className="container mx-auto px-7 py-4 my-0"> {/* Center the content with padding */}
      <div className="filters flex flex-wrap justify-center gap-2 mb-4"> {/* Style filters */}
      <button
          onClick={() => handleFilterClick('Maruthi-Zen')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold text-sm" // Smaller font size
        >
          By MaruthiZen
        </button>
        <button
          onClick={() => handleFilterClick('Bharat-benz')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold text-sm" // Smaller font size
        >
          By BharatBenz
        </button>
        <button
          onClick={() => handleFilterClick('Eicher')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold text-sm"
        >
          By Eicher
        </button>
        <button
          onClick={() => handleFilterClick('Swaraj-madza')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold text-sm"
        >
          By Swaraj Mazda
        </button>
        <button
          onClick={() => handleFilterClick('Mahindra-pickup')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold text-sm"
        >
          By Mahindra Pickup
        </button>
        <button
          onClick={() => handleFilterClick('Rental-vehicle')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold text-sm"
        >
          By Rental Vehicle
        </button>
      </div>

      <table className="w-full divide-y divide-gray-200 mt-10 flex-col justify-center">
        {/* Remove margin-top */}
        <thead>
          <tr className="h-10 bg-gray-500 text-white p-4">
            <th className="px-4 py-2 text-xs">Date</th>
            <th className="px-4 py-2 text-xs">Vehicle Name</th>
            <th className="px-4 py-2 text-xs">Diesel</th>
            <th className="px-4 py-2 text-xs">Fast Tag</th>
            <th className="px-4 py-2 text-xs">Maintenance</th>
            <th className="px-4 py-2 text-xs">Rental Cost</th>
            <th className="px-4 py-2 text-right text-xs text-red-400">Total</th>
            <th className="px-4 py-2 text-xs">Action</th>

          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr
              key={project.id}
              className={`h-10 ${index % 2 === 0 ? 'bg-gray-100 p-4 text-black' : ''}`} // Set text color to black for even rows
            >
              {/* Stacked columns for mobile using flexbox */}
              <td className="px-4 py-2 text-center text-xs">
                <div className="flex flex-col sm:hidden">
                  <span>{project.Date}</span>
                </div>
                <span className="hidden sm:block">{project.Date}</span>
              </td>
              <td className="px-4 py-2 text-center text-xs">
                <div className="flex flex-col sm:hidden">

                  <span>{project.VehicleName}</span>
                </div>
                <span className="hidden sm:block">{project.VehicleName}</span>
              </td>
              {/* Apply same logic for remaining columns */}
              <td className="px-4 py-2 text-center text-xs">
                <div className="flex flex-col sm:hidden">
                  <span>{project.Diesel}</span>
                </div>
                <span className="hidden sm:block">{project.Diesel}</span>
              </td>
              <td className="px-4 py-2 text-center text-xs">
                <div className="flex flex-col sm:hidden">

                  <span>{project.FastTag}</span>
                </div>
                <span className="hidden sm:block">{project.FastTag}</span>
              </td>
              <td className="px-4 py-2 text-center text-xs">
                <div className="flex flex-col sm:hidden">

                  <span>{project.Maintenance}</span>
                </div>
                <span className="hidden sm:block">{project.Maintenance}</span>
              </td>
              <td className="px-4 py-2 text-center text-xs">
                <div className="flex flex-col sm:hidden">

                  <span>{project.RentalAmount}</span>
                </div>
                <span className="hidden sm:block">{project.RentalAmount}</span>
              </td>
              <td className="px-4 text-right text-xs text-red-400">
                {project.Diesel +
                  project.FastTag +
                  project.Maintenance +
                  project.RentalAmount}
              </td>


              <td className="px-6 py-4 text-center text-xs">
                <div className="flex gap-4 justify-center items-center sm:flex-nowrap"> {/* Wrap for responsiveness */}
                  
                  <button
                    className="px-4 py-1 bg-red-500 hover:bg-red-700 rounded text-white text-xs font-bold"
                    onClick={() => handleDeleteClick(project.id)}
                  >
                    Delete
                  </button>
                </div></td>


            </tr>
          ))}
        </tbody>





      </table>




    </div>
  );
}