import React from "react";

function CartSummary({ subtotal }) {
  return (
    <div className="card border-primary mb-3">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title">CART SUMMARY</h5>
      </div>
      <div className="card-body">
        <small className="card-text">Delivery fee not included</small>
        <hr />
        <small className="card-text">Subtotal: <span className="fs-4" style={{marginLeft:"80px"}}>KSh{subtotal}</span></small>
        <hr />
        <button className="btn btn-success w-100">CHECKOUT (KSH{subtotal})</button>
      </div>
    </div>
  );
}

export default CartSummary;
