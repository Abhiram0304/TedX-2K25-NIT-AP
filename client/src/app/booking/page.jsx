"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function BookingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
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
    router.push("/payment");
  };

  const ticketPrice = 1; // Rs 1 per ticket as mentioned
  const totalAmount = formData.tickets * ticketPrice;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-tedred hover:text-red-400 mb-8"
        >
          <IoIosArrowRoundBack size={24} />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
            Book Your Tickets
          </h1>
          <p className="text-gray-300 text-lg">
            TEDx NIT Andhra Pradesh - October 5th, 2024
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

            <div>
              <label htmlFor="tickets" className="block text-sm font-medium mb-2">
                Number of Tickets *
              </label>
              <select
                id="tickets"
                name="tickets"
                value={formData.tickets}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-tedred text-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Ticket" : "Tickets"}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tickets ({formData.tickets})</span>
                  <span>₹{ticketPrice} × {formData.tickets}</span>
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
