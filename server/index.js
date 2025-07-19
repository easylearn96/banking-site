const express = require("express"); // Import Express framework for creating the server
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interactions
const cors = require("cors"); // Import CORS middleware for handling cross-origin requests
const fileUpload = require("express-fileupload"); // ✅ Import middleware for handling file uploads
const path = require("path"); // Import Path module for file system operations
const paymentRoutes = require("./routes/paymentRoutes");
require("dotenv").config(); // Load environment variables from .env file

const app = express(); // Initialize Express application
const PORT = process.env.PORT || 7002; // Define port number, use environment variable or default to 7002

// ✅ Middleware configuration
app.use(cors()); // Enable CORS for allowing requests from different origins
app.use(express.json()); // Enable parsing JSON request bodies
app.use(fileUpload()); // Enable file upload handling
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files as static resources

app.use("/api/payment", paymentRoutes);

// ✅ MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // Use new URL parser for MongoDB connection
  useUnifiedTopology: true, // Enable new Server Discover and Monitoring engine
})
.then(() => console.log("✅ Connected to MongoDB")) // Log success message on connection
.catch((err) => console.error("❌ MongoDB connection error:", err)); // Log error message on failure

// ✅ Import & Use Routes for handling API endpoints
const userRoutes = require("./routes/userRoutes"); // Import user-related API routes
app.use("/api/user", userRoutes); // Register user routes under the "/api/user" path

// ✅ Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`); // Log server startup message
});