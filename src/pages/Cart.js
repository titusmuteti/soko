import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartActions';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  function handleRemoveFromCart(productId) {
    dispatch(removeFromCart(productId));
  }

  function handleIncreaseQuantity(productId) {
    dispatch(increaseQuantity(productId, 1));
  }

  function handleDecreaseQuantity(productId) {
    dispatch(decreaseQuantity(productId, -1));
  }

  return (
    <div className="container col-m-4 d-flex justify-content-center align-items-center p-4" style={{ backgroundColor: "white", maxWidth:"800px", marginTop:"20px" }}>
      <div className='col-m-12'>
        {cartItems.length > 0 ? (
          <div className="cart-items-container">
            {cartItems.map((item) => (
              <div className="card mb-4 m-2" key={item.id} style={{maxHeight:"200px"}}>
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
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="remove-button m-2 bg-transparent"
                      style={{
                        width: "200px",
                        border: "none", 
                        background: "transparent",
                        display: "flex",
                        alignItems: "center",
                        paddingTop: "25px"
                      }}>
                      <RiDeleteBin6Line className='fs-5' style={{ color: 'orange' }} /> REMOVE
                    </button>

                  </div>
                  <div className="col-md-8" style={{ paddingLeft: '15px', paddingTop: '10px' }}>
                    <Link to={`/products/${item.id}`} style={{ textDecoration: "none", textDecorationColor:"none" }}>
                      <p>{item.title}</p>
                    </Link>
                  </div>
                  <div className="col-md-2" style={{ textAlign: 'right' }}>
                    <h5 className="price fw-bold">KSh{item.price}</h5>
                  </div>
                  <div className="d-flex justify-content-between align-items-center m-4" style={{ width: '8em', position: 'absolute', top: 120, right: 0 }}>
                    <button onClick={() => handleDecreaseQuantity(item.id)} className='bg-orange'>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  </div>
                </div>
                <hr />
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
    </div>
  );
};

export default Cart;
