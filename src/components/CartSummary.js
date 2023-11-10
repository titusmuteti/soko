import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function CartSummary({ subtotal }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/payment');
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="card border-primary mb-3">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title">CART SUMMARY</h5>
      </div>
      <div className="card-body">
        <small className="card-text">Delivery fee not included</small>
        <hr />
        <small className="card-text">
          Subtotal: <span className="fs-4" style={{ marginLeft: "80px" }}>KSh{subtotal}</span>
        </small>
        <hr />
        {/* <Link to="/login"> */}
          <button className="btn btn-success w-100" onClick={handleCheckout}>
            CHECKOUT <small>(KSH{subtotal})</small>
          </button>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default CartSummary;
