import { useState, useEffect } from "react"; // Import React hooks for state management and side effects
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Import axios for making HTTP requests
import "./Loan.css"; // Import custom CSS file for styling

function Loan() {
  // State variables for form inputs
  const [customerId, setCustomerId] = useState(""); // Store customer ID input
  const [loanAmount, setLoanAmount] = useState(""); // Store loan amount input
  const [duration, setDuration] = useState(""); // Store loan duration in months
  const [salaryProof, setSalaryProof] = useState(null); // Store uploaded salary proof file
  const navigate = useNavigate(); // Hook for handling navigation

  // Redirect to login if the user is not authenticated
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
    if (!token) { // If no token exists, show alert and redirect to login
      alert("Please log in to apply for a loan.");
      navigate("/login");
    }
  }, [navigate]); // Dependency array ensures this runs when navigate changes

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!salaryProof) { // Ensure salary proof file is uploaded
      alert("Please upload salary proof.");
      return;
    }

    // Create a FormData object for handling file upload
    const formData = new FormData();
    formData.append("customerId", customerId); // Add customer ID to form data
    formData.append("loanAmount", loanAmount); // Add loan amount to form data
    formData.append("duration", duration); // Add loan duration to form data
    formData.append("salaryProof", salaryProof); // Add salary proof file to form data

    try {
      const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
      const response = await axios.post(
        "http://localhost:7001/api/user/loan", // API endpoint for loan application
        formData,
        {
          headers: { // Attach token and content type in headers for authentication
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) { // Check if loan application was successful
        alert("✅ Loan application submitted successfully!"); // Show success alert

        // Optionally reset form fields
        setCustomerId("");
        setLoanAmount("");
        setDuration("");
        setSalaryProof(null);

        navigate("/dashboard"); // Redirect to the dashboard page
      } else { // Handle unsuccessful loan application
        alert(response.data.message || "Loan submission failed.");
      }
    } catch (error) { // Handle API request failure
      console.error("Loan submission error:", error);
      if (error.response && error.response.status === 401) { // Handle session expiration
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        alert("An error occurred during loan submission.");
      }
    }
  };

  return (
    <div className="loan-container"> {/* Container for the loan application form */}
      <h2>Loan Application</h2> {/* Title for the loan application page */}
      <form onSubmit={handleSubmit} encType="multipart/form-data"> {/* Loan application form */}
        
        <label>Customer ID</label>
        <input
          type="text"
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />

        <label>Loan Amount</label>
        <input
          type="number"
          placeholder="Enter Loan Amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
        />

        <label>Duration (Months)</label>
        <input
          type="number"
          placeholder="Loan Duration in Months"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <label>Salary Proof</label> {/* File upload input for salary proof */}
        <input
          type="file"
          accept=".pdf,.jpg,.png" // Restrict allowed file types
          onChange={(e) => setSalaryProof(e.target.files[0])}
          required
        />

        <button type="submit" className="btn btn-primary mt-3">
          Apply for Loan
        </button> {/* Submit button */}
      </form>
    </div>
  );
}

export default Loan; // Export Loan component