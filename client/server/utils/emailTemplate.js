function generateBookingConfirmationEmail(bookingData, paymentData) {
  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #dc2626;">TEDx NIT Andhra Pradesh - Booking Confirmation</h2>
    <p>Dear <strong>${bookingData.name}</strong>,</p>

    <p>Thank you for registering for <strong>TEDx NIT Andhra Pradesh 2025</strong>!</p>

    <h3>Booking Details:</h3>
    <ul>
      <li><strong>Booking ID:</strong> ${paymentData.order_id}</li>
      <li><strong>Payment ID:</strong> ${paymentData.payment_id}</li>
      <li><strong>Tickets:</strong> ${bookingData.tickets}</li>
      <li><strong>Amount Paid:</strong> ₹${paymentData.amount}</li>
    </ul>

    <h3>Event Details:</h3>
    <ul>
      <li><strong>Date:</strong> October 28th, 2025</li>
      <li><strong>Time:</strong> 2:00 PM - 6:00 PM</li>
      <li><strong>Venue:</strong> NIT Andhra Pradesh</li>
    </ul>

    <p>Please arrive 30 minutes early and carry a valid ID for verification.</p>

    <p>We look forward to seeing you at the event!</p>

    <p style="margin-top: 20px;">Best regards,<br>
    <strong>TEDx NIT Andhra Pradesh Team</strong></p>
  </div>
  `;
}

module.exports = {
  generateBookingConfirmationEmail,
};
