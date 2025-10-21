"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";
import { RAZORPAY_CONFIG } from "@/config/razorpay";

export default function PaymentPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("bookingData");
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      router.push("/booking");
    }
  }, [router]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    setLoading(true);

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    const ticketPrice = 1; // Rs 1 per ticket
    const totalAmount = bookingData.tickets * ticketPrice;

    try {
      // Create order on backend
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'INR',
          receipt: `tedx_ticket_${Date.now()}`,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || RAZORPAY_CONFIG.keyId,
        currency: "INR",
        amount: orderData.order.amount,
        order_id: orderData.order.id,
        name: "TEDx NIT Andhra Pradesh",
        description: `Payment for ${bookingData.tickets} ticket(s)`,
        image: "/images/TEDx.png",
        handler: async function (response) {
          try {
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingData: bookingData, // Pass booking data for email
                amount: totalAmount, // Pass amount for email
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              alert("Payment Successful! Confirmation email has been sent to your email address.");
              console.log("Payment verified:", verifyData);
              
              sessionStorage.removeItem("bookingData");
              router.push("/payment-success");
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
        theme: {
          color: "#dc2626",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
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

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-tedred mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const ticketPrice = 1;
  const totalAmount = bookingData.tickets * ticketPrice;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
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
            Complete Your Payment
          </h1>
          <p className="text-gray-300 text-lg">
            Secure payment powered by Razorpay
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Booking Summary */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-300">Name:</span>
                <span>{bookingData.name}</span>
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

          {/* Payment Summary */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 mb-8">
            <h3 className="text-xl font-semibold mb-4">Payment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tickets ({bookingData.tickets})</span>
                <span>₹{ticketPrice} × {bookingData.tickets}</span>
              </div>
              <div className="border-t border-gray-600 pt-2">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-tedred">₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={displayRazorpay}
            disabled={loading}
            className="w-full bg-tedred hover:bg-red-600 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              "Pay ₹" + totalAmount + " Now"
            )}
          </button>

          {/* Security Notice */}
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>🔒 Your payment is secured by Razorpay</p>
            <p>We accept all major credit cards, debit cards, UPI, and net banking</p>
          </div>
        </div>
      </div>
    </div>
  );
}
