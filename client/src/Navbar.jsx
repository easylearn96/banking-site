import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Umar Bank Limited</div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/register">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/deposit">Deposit</Link></li>
        <li><Link to="/withdrawal">Withdrawal</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;