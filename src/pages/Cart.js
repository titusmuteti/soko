import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { removeFromCart } from '../redux/cartActions'; 
import { RiDeleteBin6Line } from 'react-icons/ri';

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
            <div className='container' key={item.id}>
              <div className='card' style={{ maxWidth: '500px', maxHeight: '100%' }}>
              <img
                src={item.image}
                alt="..."
                className="img-fluid"
                style={{height: '100%'}}
              />
              <p>{item.title}</p>
              <button onClick={() => handleRemoveFromCart(item.id)} style={{width:"100px"}} >{<RiDeleteBin6Line />}</button>
              </div>
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
