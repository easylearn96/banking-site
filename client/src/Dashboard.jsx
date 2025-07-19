import { useEffect, useState } from "react"; // Import necessary hooks from React
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Dashboard.css"; // Import custom CSS file for styling

const Dashboard = () => {
  const [user, setUser] = useState(null); // State variable to store user data
  const navigate = useNavigate(); // Hook for handling navigation

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
        if (!token) { // If no token exists, redirect to login page
          console.warn("No token found! Redirecting to login...");
          navigate("/login");
          return;
        }

        // Make a GET request to fetch user details
        const response = await axios.get("http://127.0.0.1:7003/api/user/me", {
          headers: { Authorization: `Bearer ${token}` }, // Attach token in headers
        });

        if (response.data) { // If response contains data, set it in state
          setUser(response.data);
        } else { // Handle unexpected response structure
          console.error("Error: Invalid response structure", response.data);
          navigate("/login"); // Redirect to login page if data is invalid
        }
      } catch (error) { // Handle API request failure
        console.error("Error fetching user data:", error.message);
        navigate("/login"); // Redirect to login on error
      }
    };

    fetchUserData();
  }, [navigate]); // Runs when the component mounts or if navigate changes

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to home page
  };

  // If user data is not yet available, show a loading message
  if (!user) return <h2>Loading Dashboard...</h2>;

  return (
    <div className="dashboard-container"> {/* Container for the dashboard */}
      <h2>Welcome, {user.name}!</h2> {/* Display user name */}
      <p><strong>Account Number:</strong> {user.accountNumber || "Not Available"}</p> {/* Show account number */}
      <p><strong>Bank Balance:</strong> Rs {user.initialDeposit !== undefined ? user.initialDeposit : "Not Available"}</p> {/* Show balance */}

      {/* Buttons for depositing and withdrawing money */}
      <div>
        <button onClick={() => navigate("/deposit")}>Deposit Money</button>
        <button onClick={() => navigate("/withdrawal")}>Withdraw Money</button>
      </div>

      {/* Logout button */}
      <div>
        <button onClick={handleLogout} style={{ marginTop: "20px", backgroundColor: "red", color: "white" }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard; // Export the Dashboard component