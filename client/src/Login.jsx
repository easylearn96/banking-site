import { useState } from "react"; // Import useState hook for managing component state
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Import axios for making HTTP requests
import "./Login.css"; // Import custom CSS file for styling

const Login = () => {
  // State variables for user inputs
  const [accountNumber, setAccountNumber] = useState(""); // Store account number input
  const [password, setPassword] = useState(""); // Store password input
  const navigate = useNavigate(); // Get navigation function

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to login API with user credentials
      const response = await axios.post("http://127.0.0.1:7003/api/user/login", {
        accountNumber,
        password,
      });

      if (response.data.success) { // Check if login was successful
        localStorage.setItem("token", response.data.jwtToken); // Store JWT token in localStorage
        navigate("/dashboard"); // Redirect user to the dashboard page
      }
    } catch (error) {
      console.error("Login error:", error); // Log error details
      alert("Login failed: " + (error.response?.data?.message || "Unknown error")); // Show alert message for login failure
    }
  };

  return (
    <div className="login-page"> {/* Container for the login page */}
      <div className="row justify-content-center align-items-center"> {/* Center content */}
        <div className="col-md-6 col-sm-12"> {/* Form section */}
          <div className="login-container shadow p-4 rounded"> {/* Styled container */}
            <h2 className="text-center mb-4">Login</h2> {/* Title */}

            {/* Login form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="accountNumber" className="form-label">Enter Account Number</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  className="form-control"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Your Account Number"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Enter Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password"
                  required
                />
              </div>

              <button className="btn btn-primary w-100 mb-3">Login</button> {/* Submit button */}
            </form>
          </div>
        </div>

        {/* Right side: Image section */}
        <div className="col-md-6 col-sm-12 image-container">
          <img src="/signup.jpg" alt="Login Image" className="login-image" /> {/* Display login-related image */}
        </div>
      </div>
    </div>
  );
};

export default Login; // Export Login component for use