"use client";

import { useState } from "react";

export default function ComplaintSystem() {

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [busNumber, setBusNumber] = useState(""); // Initialize with 0
  const [tripNumber, setTripNumber] = useState(""); // Initialize with 0
  const [complaint, setComplaint] = useState(""); // Initialize with an empty string
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Full name: ", fullname);
    console.log("Email: ", email);
    console.log("Bus Number: ", busNumber);
    console.log("Trip Number: ", tripNumber);
    console.log("Complaint: ", complaint);

    const res = await fetch("api/Complaint", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          busNumber,
          tripNumber,
          complaint
        }),
      });
  
      const { msg, success } = await res.json();
      setError(msg);
      setSuccess(success);

      if (success){

      setFullname(""); // Reset to an empty string
      setEmail(""); // Reset to an empty string
      setBusNumber(""); // Reset to an empty string
      setTripNumber(""); // // Reset to an empty stringy
      setComplaint(""); // Reset to an empty string

      setTimeout(() => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000); // 3000 milliseconds 
      }, 1000); // Simulated delay for 1 second before showing the popu
    }




      }
  





  return (
     <>
      <form onSubmit={handleSubmit}
 
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            type="text"
            id="fullname"
            placeholder="max schneider"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="email"
            placeholder="max@yahoo.com"
          />
        </div>

        <div className="w-1/2">
          <label htmlFor="busNumber">Number of Bus</label>
          <input
            onChange={(e) => setBusNumber(e.target.value)}
            value={busNumber}
            type="number" // Use type="number" for numeric input
            id="busNumber"
            placeholder="Please write the bus Number "
          />
        </div>

        <div className="w-1/2">
          <label htmlFor="tripNumber">Number of Trip</label>
          <input
            onChange={(e) => setTripNumber(e.target.value)}
            value={tripNumber}
            type="number" // Use type="number" for numeric input
            id="tripNumber"
            placeholder="Please write the trip Number "
          />
        </div>

        <div>
          <label htmlFor="complaint">Your Complaint</label>
          <textarea
            onChange={(e) => setComplaint(e.target.value)}
            value={complaint}
            className="h-32"
            id="complaint"
            placeholder="Type your complaint here..."
          ></textarea>
        </div>

        <button className="bg-lime-400 p-3 text-slate-950 font-bold rounded-full w-1/4  mx-auto " type="submit">
          Send
        </button>
      </form>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p>Your complaint sent successfully!</p>
          </div>
        </div>
      )} 

      
       <div className="bg-slate-100 flex flex-col">
        {error &&
          error.map((e) => (
            <div
              className={`${
                success ? "text-gray-800" : "text-red-700"
              } px-5 py-2`}
            >
              {e}
            </div>
          ))}
      </div>


      
    </>
  );
}
