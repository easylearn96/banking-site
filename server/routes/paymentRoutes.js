// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

router.post("/payment", async (req, res) => {
  const { name, product, phoneNumber, paymentMethod, amount } = req.body;

  try {
    // Save to DB (optional)

    // Send order confirmation email (or admin email)
    await sendEmail(
      process.env.EMAIL_USER, // send to admin (you)
      "New Order Received",
      `Name: ${name}\nProduct: ${product}\nPhone: ${phoneNumber}\nPayment Method: ${paymentMethod}\nAmount: Rs ${amount}`
    );

    res.json({ success: true, message: "Order received" });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ success: false, message: "Order failed" });
  }
});

module.exports = router;
