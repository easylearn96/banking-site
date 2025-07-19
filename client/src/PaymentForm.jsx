import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function PaymentForm() {
  const location = useLocation();
  const { productName, productPrice } = location.state || {};

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("JazzCash");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:7003/api/user/payment", {
      name,
      product: productName,
      phoneNumber,
      paymentMethod,
      amount: productPrice,
    });

    if (response.data.success) {
      alert("Order placed! Please pay manually.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <p><strong>Product:</strong> {productName}</p>
        <p><strong>Price:</strong> Rs {productPrice}</p>

        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Phone Number</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

        <label>Payment Method</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="JazzCash">JazzCash</option>
          <option value="EasyPaisa">EasyPaisa</option>
        </select>

        <button className="btn btn-primary mt-3">Place Order</button>
      </form>
    </div>
  );
}

export default PaymentForm;
