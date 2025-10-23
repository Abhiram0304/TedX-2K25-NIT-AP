// pages/api/razorpay/verify-payment.js
import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

let serialNo = 1;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is authentic
      // Here you can save the payment details to your database
      // and send confirmation emails, etc.
      
      // Send confirmation email
      try {
        // Get booking data from request body (passed from frontend)
        const { bookingData, amount } = req.body;
        
        if (bookingData && bookingData.email) {
          const emailResponse = await fetch(`${req.headers.origin || 'http://localhost:3000'}/api/send-confirmation-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bookingData,
              paymentData: {
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id,
                amount: amount || 1, // Default amount if not provided
              },
              serialNo: ++serialNo,
            }),
          });
          
          const emailResult = await emailResponse.json();
          console.log('Email sending result:', emailResult);
        }
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't fail the payment verification if email fails
      }
      
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to verify payment' 
    });
  }
}
