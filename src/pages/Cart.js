import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartActions';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  function handleRemoveFromCart(productId) {
    // Dispatch the removeFromCart action with the product's ID
    dispatch(removeFromCart(productId));
  }

  return (
    <div className="container m-2 d-flex justify-content-center align-items-center">
      {cartItems.length > 0 ? (
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div className="card" style={{ width: "50em", marginBottom: "10px", position: 'relative' }} key={item.id}>
              <div className="cart-item row m-4">
                <div className="col-md-2">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt="..."
                      className="img-fluid"
                      style={{ height: '100px', width: '100px' }}
                    />
                  </Link>
                </div>
                <div className="col-md-8" style={{ paddingLeft: '15px', paddingTop: '10px' }}>
                  <Link to={`/products/${item.id}`} style={{textDecorationLine:"none"}}>
                    <p>{item.title}</p>
                  </Link>
                  <div className="d-flex justify-content-between align-items-center">
                    <button onClick={() => handleRemoveFromCart(item.id)}>
                      {<RiDeleteBin6Line />} REMOVE
                    </button>
                  </div>
                </div>
                <div className="col-md-2" style={{ textAlign: 'right' }}>
                  <h5 className="price fw-bold">KSh{item.price}</h5>
                </div>
                <div className="item-quantity" style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                  Quantity: {item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>Your cart is empty!</p>
          <button>
            <Link to="/">START SHOPPING</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
