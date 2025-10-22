import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";

// const backend = "http://localhost:3000";
const backend = "http://3.111.246.22:3000"

export default function PaymentPage() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("bookingData");
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      navigate("/booking");
    }
  }, [navigate]);

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const displayRazorpay = async () => {
    setLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      setLoading(false);
      return;
    }

    const ticketPrice = 150; // Example price
    const totalAmount = bookingData.tickets * ticketPrice;

    try {
      // ✅ Create order via backend using Axios
      const orderResponse = await axios.post(`${backend}/api/razorpay/create-order`, {
        amount: totalAmount,
        currency: "INR",
        receipt: `tedx_ticket_${Date.now()}`,
      });

      const orderData = orderResponse.data;
      if (!orderData.success) throw new Error(orderData.error || "Failed to create order");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your frontend Razorpay key
        currency: "INR",
        amount: orderData.order.amount,
        order_id: orderData.order.id,
        name: "TEDx NIT Andhra Pradesh",
        description: `Payment for ${bookingData.tickets} ticket(s)`,
        image: "/images/TEDx.png",
        handler: async function (response) {
          try {
            // ✅ Verify payment via backend using Axios
            const verifyResponse = await axios.post(`${backend}/api/razorpay/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingData: bookingData,
              amount: totalAmount,
            });

            const verifyData = verifyResponse.data;
            console.log(verifyData);
            if (verifyData.success) {
              alert("Payment Successful! Confirmation email sent to your email address.");
              sessionStorage.removeItem("bookingData");
              navigate("/payment-success");
            } else {
              alert("Payment verification failed. Please contact support.");
              console.error("Payment verification failed:", verifyData);
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: bookingData.name,
          email: bookingData.email,
          contact: bookingData.phone,
        },
        notes: {
          address: "NIT Andhra Pradesh",
          tickets: bookingData.tickets.toString(),
        },
        theme: { color: "#dc2626" },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create payment order. Please try again.");
      setLoading(false);
    }
  };

  if (!bookingData) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const ticketPrice = 150;
  const totalAmount = bookingData.tickets * ticketPrice;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/booking")}
          className="flex items-center gap-2 text-tedred hover:text-red-400 mb-8 pt-25"
        >
          <IoIosArrowRoundBack size={24} />
          Back
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Complete Your Payment</h1>
          <p className="text-gray-300 text-lg">Secure payment powered by Razorpay</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Name:</span>
                <span>{bookingData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Roll Number:</span>
                <span>{bookingData.rollNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Email:</span>
                <span>{bookingData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Phone:</span>
                <span>{bookingData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Tickets:</span>
                <span>{bookingData.tickets}</span>
              </div>
            </div>
          </div>

          <button
            onClick={displayRazorpay}
            disabled={loading}
            className="w-full bg-tedred hover:bg-red-600 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg"
          >
            {loading ? "Processing..." : "Pay ₹" + totalAmount + " Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
