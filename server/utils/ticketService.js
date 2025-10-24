const nodemailer = require("nodemailer");
const path = require("path");
const Jimp = require("jimp");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendTicketEmail(ticketDetails) {
  const { name, rollNo, serialNo, email, paymentId } = ticketDetails;

  try {
    const templatePath = path.join(__dirname, "../assets", "ticket.png");
    const image = await Jimp.read(templatePath);

    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

    const nameCoords = { x: 431, y: 322 };
    const rollCoords = { x: 558, y: 350 };
    const serialCoords = { x: 518, y: 385 };

    // const paymentIdText = "PAYMENTID : " + paymentId.toUpperCase();
    // const paymentIdCoords = { x: 344, y: 564 };

    // Print text
    image.print(font, nameCoords.x, nameCoords.y, name.toUpperCase());
    image.print(font, rollCoords.x, rollCoords.y, rollNo.toUpperCase());
    image.print(font, serialCoords.x, serialCoords.y, serialNo.toString());
    // image.print(font, paymentIdCoords.x, paymentIdCoords.y, paymentIdText);

    // Get final image buffer
    const finalTicketBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

    // --- Send email ---
    const mailOptions = {
      from: {
        name: "TEDx NIT Andhra Pradesh",
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: `TEDx NIT Andhra Pradesh - Booking Confirmation (${paymentId})`,
      html: `
        <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
  
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: left;">
              <h2 style="color: #eb0028; font-size: 24px; font-weight: 700; margin: 0;">
                TEDx NIT Andhra Pradesh - Booking Confirmation
              </h2>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 0px 40px 30px 40px; text-align: left; font-size: 16px;">
              <p style="margin: 0 0 20px 0;">Dear <strong>${name}</strong>,</p>
              <p style="margin: 0;">Thank you for registering for <strong>TEDx NIT Andhra Pradesh 2025</strong>! We're excited to have you join us.</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="font-size: 16px; margin: 0 0 10px 0;">Your personalized ticket is attached below:</p>
              <img src="cid:tedxticket" alt="Your TEDx Ticket" style="width: 100%; max-width: 520px; height: auto; border: 1px solid #eeeeee; border-radius: 4px;">
            </td>
          </tr>
          
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <h3 style="font-size: 18px; color: #333; margin: 0 0 15px 0; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
                Booking Details
              </h3>
              <p style="font-size: 16px; margin: 0;">
                Payment ID: <strong style="color: #eb0028;">${paymentId}</strong>
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 0 40px 40px 40px; background-color: #fafafa; border-top: 1px solid #eeeeee;">
              <h3 style="font-size: 18px; color: #333; margin: 30px 0 15px 0;">
                Event Details
              </h3>
              <p style="font-size: 16px; margin: 0 0 10px 0;">
                Please arrive 15 minutes early and carry your college ID card for verification.
              </p>
              <p style="font-size: 16px; margin: 20px 0 0 0;">
                We look forward to seeing you at the event!
              </p>
              <p style="margin: 30px 0 0 0; font-size: 16px; line-height: 1.7;">
                Best regards,<br>
                <strong>The TEDx NIT Andhra Pradesh Team</strong>
              </p>
            </td>
          </tr>
          
        </table>
        </td>
    </tr>
    
    <tr>
      <td align="center" style="padding: 20px 40px; font-size: 12px; color: #888;">
        <p style="margin: 0;">© 2025 TEDx NIT Andhra Pradesh. This is an automated email.</p>
      </td>
    </tr>
  </table>
  </div>
      `,
      attachments: [
        {
          filename: "TEDx-Ticket.png",
          content: finalTicketBuffer,
          cid: "tedxticket",
        },
      ],
    };

    // Verify and send
    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ Ticket sent successfully to ${email}`);
    return info; // Return the info to the route handler
  } catch (error) {
    console.error("❌ Error sending ticket:", error);
    throw new Error("Failed to send ticket email.");
  }
}

module.exports = { sendTicketEmail };