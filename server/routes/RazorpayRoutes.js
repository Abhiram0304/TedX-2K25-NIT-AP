const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const axios = require("axios");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const router = express.Router();
const { generateBookingConfirmationEmail } = require("../utils/emailTemplate");

let serialNo = 1;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Order
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    if (!amount || !receipt) {
      return res.status(400).json({ error: "Amount and receipt are required" });
    }

    const options = {
      amount: amount * 100, // paise
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

// ✅ Verify Payment
router.post("/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData,
      amount,
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

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const htmlContent = generateBookingConfirmationEmail(bookingData, {
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        amount: amount || 1,
      }, serialNo++);

      await transporter.sendMail({
        from: {
          name: "TEDx NIT Andhra Pradesh",
          address: process.env.EMAIL_USER,
        },
        to: bookingData.email,
        subject: `TEDx NIT Andhra Pradesh - Booking Confirmation (${razorpay_order_id})`,
        html: htmlContent,
      });

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
    res.status(500).json({ success: false, error: "Failed to verify payment" });
  }
});

module.exports = router;
