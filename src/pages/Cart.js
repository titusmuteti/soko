import React from 'react';
import { useCart } from '../CartContext';

const Cart = () => {
  const { items, dispatch } = useCart(); // Updated to use 'items' instead of 'state'

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  return (
    <div>
      <h2>Cart</h2>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
