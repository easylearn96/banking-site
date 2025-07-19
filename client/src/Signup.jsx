import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import { useState } from "react"; // Import useState hook for state management
import { Link } from 'react-router-dom'; // Import Link component for navigation
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Signup.css"; // Import custom CSS file for styling

function Signup() {
    // State variables for user inputs
    const [name, setName] = useState(""); // Store user's name
    const [email, setEmail] = useState(""); // Store user's email
    const [password, setPassword] = useState(""); // Store user's password
    const [address, setAddress] = useState(""); // Store user's address
    const [contact, setContact] = useState(""); // Store user's contact number
    const [initialDeposit, setInitialDeposit] = useState(""); // Store initial deposit amount
    const [accountType, setAccountType] = useState("savings"); // Store account type, default is "savings"
    const [error, setError] = useState(""); // Store error messages
    const navigate = useNavigate(); // Get navigation function

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate that all fields are filled
        if (!name || !email || !password || !address || !contact || !initialDeposit || !accountType) {
            setError("All fields are required."); // Set error message if any field is missing
            return;
        }

        // Validate that initial deposit is a positive number
        if (isNaN(initialDeposit) || initialDeposit <= 0) {
            setError("Initial deposit must be a positive number."); // Set error message for invalid deposit
            return;
        }

        // Send POST request to register user
        axios.post("http://127.0.0.1:7003/api/user/register", { name, email, password, address, contact, initialDeposit, accountType })
            .then(result => {
                navigate("/login"); // Redirect to login page on successful signup
                console.log("Signup successful!", result); // Log success message
            })
            .catch(err => {
                console.error("Signup error:", err); // Log error details
                setError("An error occurred while registering. Please try again."); // Set error message for failed signup
            });
    };

    return (
        <div className="signup-page"> {/* Container for the signup page */}
            <div className="row justify-content-center align-items-center"> {/* Center the content */}
                
                {/* Left side: Image Section */}
                <div className="col-md-6 col-sm-12 image-container">
                    <img src="/signup.jpg" alt="Signup Image" className="signup-image" /> {/* Display signup image */}
                </div>

                {/* Right side: Signup Form */}
                <div className="col-md-6 col-sm-12">
                    <div className="signup-container shadow p-4 rounded"> {/* Form container with styling */}
                        <h2 className="text-center mb-4">Sign Up</h2> {/* Title */}

                        {/* Display error message if registration fails */}
                        {error && <div className="alert alert-danger">{error}</div>}

                        {/* Signup form */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Enter Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your Name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Enter Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email"
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

                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Enter Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Your Address"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="contact" className="form-label">Enter Contact Number</label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    className="form-control"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    placeholder="Your Contact Number"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="initialDeposit" className="form-label">Initial Deposit ($)</label>
                                <input
                                    type="number"
                                    id="initialDeposit"
                                    name="initialDeposit"
                                    className="form-control"
                                    value={initialDeposit}
                                    onChange={(e) => setInitialDeposit(e.target.value)}
                                    placeholder="Enter Deposit Amount"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="accountType" className="form-label">Select Account Type</label>
                                <select
                                    id="accountType"
                                    name="accountType"
                                    className="form-control"
                                    value={accountType}
                                    onChange={(e) => setAccountType(e.target.value)}
                                    required
                                >
                                    <option value="savings">Savings Account</option>
                                    <option value="current">Current Account</option>
                                </select>
                            </div>

                            <button className="btn btn-primary w-100 mb-3">Register</button> {/* Submit button */}
                        </form>

                        <p className="text-center">
                            Already have an account? <Link to="/login" className="text-decoration-none">Login</Link> {/* Link to login page */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup; // Export Signup component for use