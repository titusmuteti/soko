import React from "react";
import Form from 'react-bootstrap/Form';

function CartSummary() {
    return (
        <div className="card">
          <div className="card-body">
            <p className="card-title">CART SUMMARY</p>
            <small>Delivery fee not included</small>
            <hr/>
            <p className="card-text">Subtotal</p>
            <hr />
            <button style={{ marginTop: '20px' }}>CHECKOUT</button>
          </div>
        </div>
    );
}

export default CartSummary;