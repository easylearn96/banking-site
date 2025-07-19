const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number, // in months
    required: true,
  },
  salaryProof: {
    type: String, // path to uploaded file
    required: true,
  },
  status: {
    type: String,
    default: "Pending", // Pending, Approved, Rejected
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Loan", LoanSchema);
