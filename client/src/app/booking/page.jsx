import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function BookingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rollNo:"",
    email: "",
    phone: "",
    serialNo: 0, // hidden in form. meant for booking data
    tickets: 1, // fixed to 1 ticket
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("bookingData", JSON.stringify(formData));
    navigate("/payment"); // navigate to payment page
  };

  const ticketPrice = 150; // ₹150 per ticket
  const totalAmount = ticketPrice; // always 1 ticket

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")} // go back
          className="flex items-center gap-2 text-tedred hover:text-red-400 mb-8 pt-25"
        >
          <IoIosArrowRoundBack size={24} />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
            Book Your Ticket
          </h1>
          <p className="text-gray-300 text-lg">
            TEDx NIT Andhra Pradesh — October 28th, 2025
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-tedred text-white"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="rollNo" className="block text-sm font-medium mb-2">
                Roll Number *
              </label>
              <input
                type="text"
                id="rollNo"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-tedred text-white"
                placeholder="Enter your Roll Number"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-tedred text-white"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-tedred text-white"
                placeholder="Enter your phone number"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tickets (1)</span>
                  <span>₹{ticketPrice}</span>
                </div>
                <div className="border-t border-gray-600 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-tedred">₹{totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-tedred hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-lg"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
