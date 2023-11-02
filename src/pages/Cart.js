import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { removeFromCart } from '../redux/cartActions'; 

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch(); 

  function handleRemoveFromCart (productId) {
    // Dispatch the removeFromCart action with the product's ID
    dispatch(removeFromCart(productId));
  };

  return (
    <div className='container m-4' style={{ paddingInline: '50px', margin: 'auto' }}>
      <div className='card'>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove from Cart</button>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>Your cart is empty!</p>
            <button>
              <Link to="/">START SHOPPING</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
