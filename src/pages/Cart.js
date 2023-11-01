import React from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, dispatch } = useCart();

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  return (
    <div className='container m-4' style={{ paddingInline: '50px', margin: 'auto' }}>
      <div className='card'>
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
              <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
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
