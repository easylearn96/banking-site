import { Link } from "react-router-dom";  
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Background Image Section */}
      <div className="home-container">
        <div className="home-content">
          <h1>Be part of something bigger.</h1>
          <h2>Your local customer-owned bank.</h2>
          <button className="find-out-more">Find out more</button>
        </div>
      </div>

      {/* Featured Services Section */}
      <div className="featured-services">
        <h2>Our Featured Services</h2>
        <div className="services-container">
          <Link to="/loan" className="service">  {/* Loan is now clickable */}
            <img src="/8.png" alt="Loan Service" />
            <h3>Loans</h3>
            <p>Get easy financing with our tailored loan options.</p>
          </Link>
          <div className="service">
            <img src="/7.png" alt="Investment Service" />
            <h3>Investments</h3>
            <p>Grow your wealth with secure investment plans.</p>
          </div>
          <div className="service">
            <img src="/6.png" alt="Insurance Service" />
            <h3>Insurance</h3>
            <p>Protect your future with reliable insurance coverage.</p>
          </div>
        </div>
      </div>

      {/* Our Products Section */}
      <div className="our-products">
        <h2>Our Products</h2>
        <div className="products-container">
          <div className="product">
            <img src="/credit-card.png" alt="Credit Cards" />
            <h3>Credit Cards</h3>
            <p>Flexible and secure payment solutions.</p>
          </div>
          <div className="product">
            <img src="/home-loan.png" alt="Home Loans" />
            <h3>Home Loans</h3>
            <p>Affordable financing for your dream home.</p>
          </div>
          <div className="product">
            <img src="/savings-account.png" alt="Savings Account" />
            <h3>Savings Account</h3>
            <p>High-interest savings options for your future.</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-left">
          <p>© 2025 Umar Bank Limited. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <p>Follow Us</p>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <img src="17.png" alt="Facebook" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="16.png" alt="Instagram" />
            </a>
            <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer">
              <img src="15.png" alt="WhatsApp" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;