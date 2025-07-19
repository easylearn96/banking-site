const nodemailer = require("nodemailer"); // Import Nodemailer module for sending emails
require("dotenv").config(); // Load environment variables from .env file

// Function to send an email
const sendEmail = async (email, subject, message) => {
  try {
    console.log("⏳ Preparing to send email to:", email); // Log email sending process start

    // Create a transporter object using Gmail service
    const transporter = nodemailer.createTransport({
      service: "gmail", // Specify the email service provider
      auth: { // Provide authentication credentials
        user: process.env.EMAIL_USER, // Email username from environment variables
        pass: process.env.EMAIL_PASS, // Email password from environment variables
      },
    });

    // Define email options including recipient, subject, and content
    const mailOptions = {
      from: `"Your Bank" <${process.env.EMAIL_USER}>`, // Sender's email
      to: email, // Recipient's email
      subject: subject, // Email subject
      text: message, // Email body as plain text
    };

    // Send the email using the transporter object
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response); // Log success message with response details
  } catch (error) {
    console.error("❌ Email error:", error); // Log error if email sending fails
  }
};

module.exports = sendEmail; // Export the function for use in other parts of the application