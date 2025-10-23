const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { generateBookingConfirmationEmail } = require("../utils/emailTemplate");

dotenv.config();

const router = express.Router();

let lastSerialNo = 1

router.post("/send-confirmation-email", async (req, res) => {
  try {
    const { bookingData, paymentData } = req.body;

    if (!bookingData || !paymentData) {
      return res.status(400).json({ error: "Booking data and payment data are required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    bookingData.serialNo = ++lastSerialNo;

    await transporter.verify();

    const htmlContent = generateBookingConfirmationEmail(bookingData, paymentData, serialNo);

    const mailOptions = {
      from: {
        name: "TEDx NIT Andhra Pradesh",
        address: process.env.EMAIL_USER,
      },
      to: bookingData.email,
      subject: `TEDx NIT Andhra Pradesh - Booking Confirmation (${paymentData.order_id})`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Confirmation email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send confirmation email",
      details: error.message,
    });
  }
});

module.exports = router;
