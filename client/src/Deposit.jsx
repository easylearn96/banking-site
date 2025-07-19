import { useState } from "react"; // Import useState hook for managing component state
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from 'axios'; // Import axios for making HTTP requests
import "./Deposit.css"; // Import custom CSS file for styling

function Deposit() {
  const [account, setAccount] = useState(""); // State variable for storing account number input
  const [amount, setAmount] = useState(""); // State variable for storing deposit amount input
  const navigate = useNavigate(); // Hook for handling navigation

  // Function to handle deposit submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
    if (!token) { // If no token exists, show alert and redirect to login
      alert("You're not logged in!");
      navigate("/login");
      return;
    }

    try {
      // Send POST request to deposit API with user data
      const response = await axios.post("http://localhost:7003/api/user/deposit", {
        account, // Account number to deposit into
        amount: parseFloat(amount), // Convert amount input to a number before sending
      }, {
        headers: { // Attach token in headers for authentication
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) { // Check if deposit was successful
        alert("Deposit successful!"); // Show success alert
        navigate("/dashboard"); // Redirect to dashboard page
      } else { // Handle unsuccessful deposit
        alert(response.data.message || "Deposit failed");
      }
    } catch (err) { // Handle API request failure
      console.error("Deposit error:", err);
      alert("An error occurred while depositing money.");
    }
  };

  return (
    <div> {/* Container for the deposit form */}
      <h1 id="i4">Deposit</h1> {/* Title for the deposit page */}
      <form onSubmit={handleSubmit}> {/* Deposit form */}
        Enter Account Number:
        <input type="text" name="account" value={account} onChange={(e) => setAccount(e.target.value)} required /><br /> {/* Input field for account number */}

        Enter Amount:
        <input type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required /><br /> {/* Input field for deposit amount */}

        <button className="btn btn-success">Deposit</button> {/* Submit button */}
      </form>
    </div>
  );
}

export default Deposit; // Export Deposit component