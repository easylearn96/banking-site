import { useState } from "react"; // Import useState hook for managing component state
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Import axios for making HTTP requests

function Withdrawal() {
  const [account, setAccount] = useState(""); // State variable for storing account number input
  const [amount, setAmount] = useState(""); // State variable for storing withdrawal amount input
  const navigate = useNavigate(); // Hook for handling navigation

  // Function to handle withdrawal submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
    if (!token) { // If no token exists, show alert and redirect to login
      alert("You're not logged in!");
      navigate("/login");
      return;
    }

    try {
      // Send POST request to withdrawal API with user data
      const response = await axios.post(
        "http://localhost:7003/api/user/withdrawal", // API endpoint for withdrawal
        { account, amount: parseFloat(amount) }, // Convert amount input to a number before sending
        {
          headers: { // Attach token in headers for authentication
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) { // Check if withdrawal was successful
        alert("Withdrawal successful!"); // Show success alert
        navigate("/dashboard"); // Redirect to dashboard page
      } else { // Handle unsuccessful withdrawal
        alert(response.data.message || "Withdrawal failed");
      }
    } catch (err) { // Handle API request failure
      console.error("Withdrawal error:", err);
      alert("An error occurred while withdrawing money.");
    }
  };

  return (
    <div> {/* Container for the withdrawal form */}
      <h1 id="i5">Withdrawal</h1> {/* Title for the withdrawal page */}
      <form onSubmit={handleSubmit}> {/* Withdrawal form */}
        Enter Account Number:
        <input
          type="text"
          name="account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
        /><br /> {/* Input field for account number */}

        Enter Amount:
        <input
          type="number"
          min="1" // Minimum withdrawal amount limit
          max="50000" // Maximum withdrawal amount limit
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        /><br /> {/* Input field for withdrawal amount */}

        <button className="btn btn-success">Withdraw</button> {/* Submit button */}
      </form>
    </div>
  );
}

export default Withdrawal; // Export Withdrawal component