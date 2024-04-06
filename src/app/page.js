


import React from 'react'
import VehicleForm from './add_data'
import ExpenseList from './fetch_data'

const page = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 p-9">
    <div className=" rounded-lg bg-gray-200"> <VehicleForm /></div>
    <div className="rounded-lg bg-gray-200 lg:col-span-2"><ExpenseList /></div>
  </div>
   
     
      
      
  


  )
}

export default page
