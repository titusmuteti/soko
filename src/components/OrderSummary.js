import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OrderSummary({ subtotal }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
      navigate('/payment');
  }

  return (
    <div className="card border-primary mb-3">
      <div className="card-header bg-primary text-white">
        <small className="card-title">ORDER SUMMARY</small>
      </div>
      <div className="card-body">
        <small className="card-text">Item's Total</small>
        <p><small>Delivery fee</small></p>
        <hr />
        <small className="card-text">
          Total: <span className="fs-5" style={{ marginLeft: "80px" }}>KSh{subtotal}</span>
        </small>
        <hr />
          <button className="btn btn-success w-100" onClick={handleCheckout}>
            CONFIRM ORDER
          </button>
      </div>
    </div>
  );
}

export default OrderSummary;
