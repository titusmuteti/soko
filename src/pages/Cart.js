import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartActions';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Col } from 'react-bootstrap';
import CartSummary from '../components/CartSummary';
import soko from '../assests/images/soko.png';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();


  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  localStorage.setItem('cartItemCount', cartItemCount);

  //calculating subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0).toFixed(2);
  localStorage.setItem('subtotal', subtotal);

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
    <>
    <div className="container col-m-4 d-flex justify-content-center align-items-center p-4" style={{ backgroundColor: "white", maxWidth:"800px", marginTop:"20px" }}>
      <div className='col-m-12'>
        {cartItems.length > 0 && (
              <h5>Cart ({cartItemCount})</h5> 
        )} 
        <hr/>
        {cartItems.length > 0 ? (
          <div className="cart-items-container">
            {cartItems.map((item) => (
              <div className="card mb-4 m-2" key={item.id} style={{maxHeight:"200px"}}>
                <div className="cart-item row m-4">
                  <div className="col-md-2">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.product.image}
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
                        // display: "flex",
                        alignItems: "center",
                        paddingTop: "25px",
                        position:"relative",
                        left: "100px"
                      }}>
                      <RiDeleteBin6Line className='fs-5' style={{ color: 'orange' }} /> REMOVE
                    </button>

                  </div>
                  <div className="col-md-8" style={{ paddingLeft: '15px', paddingTop: '10px' }}>
                    <Link to={`/products/${item.product.id}`} style={{ textDecoration: "none", textDecorationColor:"none" }}>
                      <p>{item.product.title}</p>
                    </Link>
                  </div>
                  <div className="col-md-2" style={{ textAlign: 'right' }}>
                    <h5 className="price fw-bold">KSh{item.product.price}</h5>
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
            <img src={soko} alt='soko logo' style={{height:"190px", width:"200px", marginBottom:"50px"}}/>
            <p>Your cart is empty!</p>
            <button style={{marginRight:"20px", backgroundColor:"orangered"}}>
              <Link to="/" style={{textDecoration:"none", color:"white"}}>START SHOPPING</Link>
            </button>
          </div>
        )}
        
      </div>
    </div>
    {/* creating a separate component on the right side  */}

    {cartItems.length > 0 && (
          <Col md={4} className="mt-4 ml-auto" style={{ marginLeft: '40px', width: '18%', position:"absolute", top:100, left:1350 }}>
            <CartSummary subtotal={subtotal}/>
          </Col>
        )}
    </>
  );
};

export default Cart;