// pages/api/send-confirmation-email.js
import nodemailer from 'nodemailer';
import { generateBookingConfirmationEmail } from '@/utils/emailTemplate';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bookingData, paymentData } = req.body;

    if (!bookingData || !paymentData) {
      return res.status(400).json({ error: 'Booking data and payment data are required' });
    }

    // Check if email credentials are configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(400).json({
        success: false,
        error: 'Email credentials not configured',
        details: 'Please set EMAIL_USER and EMAIL_PASS in your .env.local file',
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Verify connection
    try {
      await transporter.verify();
      console.log('Email connection verified successfully');
    } catch (verifyError) {
      console.error('Email connection verification failed:', verifyError);
      return res.status(500).json({
        success: false,
        error: 'Email connection failed',
        details: verifyError.message,
      });
    }

    // Generate HTML email content
    const htmlContent = generateBookingConfirmationEmail(bookingData, paymentData);

    // Email options
    const mailOptions = {
      from: {
        name: 'TEDx NIT Andhra Pradesh',
        address: process.env.EMAIL_USER,
      },
      to: bookingData.email,
      subject: `TEDx NIT Andhra Pradesh - Booking Confirmation (${paymentData.order_id})`,
      html: htmlContent,
      text: `
Dear ${bookingData.name},

Thank you for registering for TEDx NIT Andhra Pradesh!

Booking Details:
- Booking ID: ${paymentData.order_id}
- Payment ID: ${paymentData.payment_id}
- Tickets: ${bookingData.tickets}
- Amount: ₹${paymentData.amount}

Event Details:
- Date: October 5th, 2024
- Time: 2:00 PM - 6:00 PM
- Venue: NIT Andhra Pradesh

Please arrive 30 minutes early and bring a valid ID.

Best regards,
TEDx NIT Andhra Pradesh Team
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    res.status(200).json({
      success: true,
      message: 'Confirmation email sent successfully',
      messageId: info.messageId,
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send confirmation email',
      details: error.message,
    });
  }
}
