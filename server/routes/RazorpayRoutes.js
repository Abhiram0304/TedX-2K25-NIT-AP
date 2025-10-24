const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const axios = require("axios");
const dotenv = require("dotenv");
// const nodemailer = require("nodemailer"); 
const { sendTicketEmail } = require("../utils/ticketService"); 

dotenv.config();

const router = express.Router();
//  const { generateBookingConfirmationEmail } = require("../utils/emailTemplate");

let serialNo = 42; 

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    if (!amount || !receipt) {
      return res.status(400).json({ error: "Amount and receipt are required" });
    }

    const options = {
      amount: amount * 100, 
      currency,
      receipt,
      notes: {
        payment_for: "TEDx NIT Andhra Pradesh Tickets",
      },
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

// ✅ Verify Payment (This route is UPDATED)
router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData, 
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {

      const ticketDetails = {
        name: bookingData.name,
        rollNo: bookingData.rollNo,
        serialNo: serialNo++, 
        email: bookingData.email,
        paymentId: razorpay_order_id, 
      };

      await sendTicketEmail(ticketDetails);
      
      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      });

    } else {
      res.status(400).json({ success: false, error: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    // Send a generic error to the frontend
    res.status(500).json({ 
      success: false, 
      error: "Failed to verify payment or send email" 
    });
  }
});

module.exports = router;