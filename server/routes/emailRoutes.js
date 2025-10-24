const express = require("express");
const dotenv = require("dotenv");
const { sendTicketEmail } = require("../utils/ticketService"); 

dotenv.config();

const router = express.Router();

let lastSerialNo = 1;

router.post("/send-confirmation-email", async (req, res) => {
  try {
    const { bookingData, paymentData } = req.body;

    if (!bookingData || !paymentData) {
      return res.status(400).json({ error: "Booking data and payment data are required" });
    }

    const serialNo = ++lastSerialNo;

    const ticketDetails = {
      name: bookingData.name,
      rollNo: bookingData.rollNo,
      serialNo: serialNo,
      email: bookingData.email,
      paymentId: paymentData.order_id, 
    };

    const info = await sendTicketEmail(ticketDetails);

    res.status(200).json({
      success: true,
      message: "Confirmation email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Error in email route:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send confirmation email",
      details: error.message,
    });
  }
});

module.exports = router;