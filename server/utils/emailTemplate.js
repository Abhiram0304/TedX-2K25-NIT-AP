function generateBookingConfirmationEmail(bookingData, paymentData, serialNo) {
  return ` 
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #dc2626;">TEDx NIT Andhra Pradesh - Booking Confirmation</h2>
    <p>Dear <strong>${bookingData.name}</strong>,</p>

    <p>Thank you for registering for <strong>TEDx NIT Andhra Pradesh 2025</strong>!</p>

    <h3>Booking Details:</h3>
    <ul>
      <li><strong>Student Roll NO:</strong> ${bookingData.rollNo}</li>
      <li><strong>Booking ID:</strong> ${paymentData.order_id}</li>
      <li><strong>Payment ID:</strong> ${paymentData.payment_id}</li>
      <li><strong>Ticket No:</strong> ${bookingData.serialNo}</li>
    </ul>

    <h3>Event Details:</h3>
    <ul>
      <li><strong>Date:</strong> October 28th, 2025</li>
      <li><strong>Time:</strong> 2:00 PM - 6:00 PM</li>
      <li><strong>Venue:</strong> NIT Andhra Pradesh</li>
    </ul>

    <p>Please arrive 15 minutes early and carry a college ID card for verification.</p>

    <p>We look forward to seeing you at the event!</p>

    <p style="margin-top: 20px;">Best regards,<br>
    <strong>TEDx NIT Andhra Pradesh Team</strong></p>
  </div>
  `;

  // return (
  //   `<div style="position: relative; width: 600px; height: 270px; margin: 0 auto;">
    
  //   <img src="../assets/ticket.png" 
  //        alt="Ticket" 
  //        style="width: 100%; height: 100%; display: block;"/>
    
  //   <div style="
  //     position: absolute;
  //     left: 32%;
  //     top: 54.2%;
  //     font-weight: bold;
  //     color: white;
  //     font-size: 12px;">
  //     {bookingData.name}
  //   </div>

  //   <div style="
  //     position: absolute;
  //     left: 41.5%;
  //     top: 59.5%;
  //     font-weight: bold;
  //     color: white;
  //     font-size: 12px;">
  //     {bookingData.rollNo}
  //   </div>

  //   <div style="
  //     position: absolute;
  //     left: 38.7%;
  //     top: 64.4%;
  //     font-weight: bold;
  //     color: white;
  //     font-size: 12px;">
  //     {bookingData.serialNo}
  //   </div>

  // </div>`
  // )
}

module.exports = {
  generateBookingConfirmationEmail,
};