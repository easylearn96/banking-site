const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const Loan = require("../models/Loan");
const sendEmail = require("../utils/sendEmail");
require("dotenv").config();

const router = express.Router();

// ✅ Generate Unique Account Number
const generateAccountNumber = async () => {
  let accountNumber;
  let existingUser;
  do {
    accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    existingUser = await User.findOne({ accountNumber });
  } while (existingUser);
  return accountNumber;
};

// ✅ JWT Auth Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded._id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, address, contact, initialDeposit, accountType } = req.body;

    if (!name || !email || !password || !address || !contact || !initialDeposit || !accountType) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const accountNumber = await generateAccountNumber();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      contact,
      initialDeposit: parseFloat(initialDeposit),
      accountType,
      accountNumber,
    });

    await sendEmail(
      email,
      "Welcome to Your Bank – Your Account Number",
      `Hi ${name},\n\nThank you for registering.\nYour account number is: ${accountNumber}\nYour initial deposit is: RS${initialDeposit}\n\nBest regards,\nThe Bank Team`
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      accountNumber,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Registration failed", error: error.message });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { accountNumber, password } = req.body;

    if (!accountNumber || !password) {
      return res.status(400).json({ success: false, message: "Account number and password are required" });
    }

    const user = await User.findOne({ accountNumber });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid account number or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid account number or password" });
    }

    const jwtToken = jwt.sign(
      { accountNumber: user.accountNumber, _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      jwtToken,
      accountNumber: user.accountNumber,
      name: user.name,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login failed", error: error.message });
  }
});

// ✅ Get User Info
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("GET /me error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch user", error: error.message });
  }
});

// ✅ Deposit (no auth)
router.post("/deposit", async (req, res) => {
  try {
    const { account, amount } = req.body;

    if (!account || !amount || isNaN(amount)) {
      return res.status(400).json({ success: false, message: "Invalid account number or amount" });
    }

    const user = await User.findOne({ accountNumber: account });
    if (!user) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    user.initialDeposit += parseFloat(amount);
    await user.save();

    await sendEmail(
      user.email,
      "Deposit Confirmation",
      `Hi ${user.name},\n\nYou deposited RS ${amount} into account ${account}.\nYour new balance is RS${user.initialDeposit.toFixed(2)}.\n\nThank you,\nYour Bank`
    );

    res.status(200).json({
      success: true,
      message: "Deposit successful",
      newBalance: user.initialDeposit,
    });
  } catch (error) {
    console.error("Deposit error:", error);
    res.status(500).json({ success: false, message: "Deposit failed", error: error.message });
  }
});

// ✅ Withdrawal
router.post("/withdrawal", authMiddleware, async (req, res) => {
  try {
    const { account, amount } = req.body;

    if (!account || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid account or amount" });
    }

    const user = await User.findOne({ accountNumber: account });
    if (!user) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    const currentBalance = parseFloat(user.initialDeposit);
    const withdrawalAmount = parseFloat(amount);

    if (withdrawalAmount > currentBalance) {
      return res.status(400).json({ success: false, message: "Insufficient funds" });
    }

    user.initialDeposit = currentBalance - withdrawalAmount;
    await user.save();

    // Send email **before responding**
    await sendEmail(
      user.email,
      "Withdrawal Confirmation",
      `Hi ${user.name},\n\nYou have withdrawn RS ${amount} from your account ${account}.\nYour new balance is RS${user.initialDeposit.toFixed(2)}.\n\nThank you,\nYour Bank`
    );

    // Respond after everything is completed
    res.status(200).json({
      success: true,
      message: "Withdrawal successful",
      newBalance: user.initialDeposit,
    });

  } catch (error) {
    console.error("Withdrawal error:", error);
    res.status(500).json({ success: false, message: "Withdrawal failed", error: error.message });
  }
});

// ✅ Loan Application (with auth)
router.post("/loan", authMiddleware, async (req, res) => {
  try {
    if (!req.files || !req.files.salaryProof) {
      return res.status(400).json({ success: false, message: "Salary proof is required" });
    }

    const { customerId, loanAmount, duration } = req.body;
    const salaryProofFile = req.files.salaryProof;

    const uploadPath = path.join(__dirname, "..", "uploads", salaryProofFile.name);
    await salaryProofFile.mv(uploadPath);

    const loan = await Loan.create({
      customerId,
      loanAmount,
      duration,
      salaryProof: `/uploads/${salaryProofFile.name}`,
    });

    res.status(201).json({
      success: true,
      message: "Loan application submitted",
      loanId: loan._id,
    });
  } catch (error) {
    console.error("Loan error:", error);
    res.status(500).json({ success: false, message: "Loan submission failed", error: error.message });
  }
});

module.exports = router;
