import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Navbar from './Navbar'; 
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';
import Loan from './Loan';
import Dashboard from './Dashboard';
import PaymentForm from './PaymentForm'; // ✅ New payment form
import Products from "./Products";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* User Services */}
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<PaymentForm />} /> {/* ✅ New Route */}
        <Route path="/products" element={<Products />} />
        <Route path="/products" element={<Products />} />


        {/* Optional: 404 page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
