import React, { useState } from "react";
import { BsFillCartFill } from "react-icons/bs";

function Cart () {
    const [cartItems, setCartItems] = useState([]);

    return (
        <div className="container d-flex justify-content-center mt-5" style={{maxHeight:"100em", backgroundColor:"white"}}>
            <div className="card" >
                            {/* <h2>Shopping Cart</h2> */}
                {cartItems.length === 0 ? (
                <p>Your cart is empty!</p>
                ) : (
                <ul>
                    {cartItems.map((item, index) => (
                    <li key={index}>{item.title}</li>
                    ))}
                </ul>
                )}
                <button style={{backgroundColor:"orange"}}>START SHOPPING</button>
            </div>
        </div>
    );
}

export default Cart;