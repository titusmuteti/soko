import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs';
import { Modal, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartActions';
import { initializeCart } from '../redux/cartActions';
import { fetchApi } from '../redux/cartActions';
import { BASE_URL } from '../redux/cartActions';
import DeliveryInfo from './DeliveryInfo';
import ProductSpecification from './ProductSpecifications';
import Rating from './Rating';
import './cart.css';
import FetchOrders from './FetchOrders';

function ProductDetail({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(1); 
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.auth.userId);
  console.log(cartItems);

  // Check if the product is in the cart
  const productInCart = cartItems.find((item) => item && item.id === product.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const orderItems = await FetchOrders(userId, dispatch);
  
          // Check if orderItems is not undefined or null
          if (orderItems) {
            dispatch(initializeCart(orderItems, userId));
  
            // Find the product in the updated cartItems
            const updatedProductInCart = orderItems.find((item) => item && item.id === product.id);
  
          // Update local quantity dynamically from the backend
          setLocalQuantity(updatedProductInCart ? updatedProductInCart.quantity : 0);
        }
        }
      } catch (error) {
        console.error('An error occurred while fetching orders:', error);
      }
    };
  
    fetchData();
  }, [dispatch, userId, product.id]); 

  useEffect(() => {
    // Update local quantity based on the updated cartItems state
    const updatedProductInCart = cartItems.find((item) => item && item.product && item.product.id === product.id);
  
    if (updatedProductInCart) {
      setLocalQuantity(updatedProductInCart.quantity);
    } else {
      // Handle the case where the product is not in the cart
      console.error("Product not found in the cart");
    }
  }, [cartItems, product.id]);
  

  const handleAddToCart = async (event) => {
    event.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
  
      // Use the fetchApi utility function from cartActions.js
      const data = await fetchApi(
        `${BASE_URL}/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: product.id, user_id: userId }),
        }
      );
  
      const orderItemsData = await Promise.all(
        data.order_item_ids.map(async (orderItemId) => {
          return fetchApi(`${BASE_URL}/order_items/${orderItemId}`);
        })
      );
  
      const validOrderItemsData = orderItemsData.filter(item => item !== null);
  
      const matchingOrderItem = validOrderItemsData.find(item => item.product.id === product.id);
  
      const item = {
        id: data.id,
        order: data,
        product: product,
        quantity: matchingOrderItem?.quantity || 1,
        total_price: validOrderItemsData.reduce((acc, item) => acc + item.total_price, 0),
        unit_price: validOrderItemsData.reduce((acc, item) => acc + item.unit_price, 0),
      };
  
      dispatch(addToCart(item.product, data.user_id));
  
      setLocalQuantity(item.quantity);
  
      await new Promise((resolve) => setTimeout(resolve, 0));
  
      const updatedProductInCart = cartItems.find((item) => item && item.product && item.product.id === product.id);
  
      if (updatedProductInCart) {
        setLocalQuantity(updatedProductInCart.quantity);
      } else {
        console.error("Product not found in the cart");
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };  
  
  function handleIncreaseQuantity(productId) {
    // Check if the product is in the cart
    const productInCart = cartItems.find((item) => item && item.id === productId);
  
    console.log(productInCart);
  
    if (!productInCart) {
      console.error("Product not found in the cart");
      return;
    }
  
    if (!productInCart.order_item_ids || productInCart.order_item_ids.length === 0) {
      console.error("Order item IDs not found");
      return;
    }
  
    const increaseQuantityRequest = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ increase_quantity: true }),
    };
  
    console.log('Sending increase quantity request:', increaseQuantityRequest);
  
    // Loop through all order item IDs and send increase quantity request
    productInCart.order_item_ids.forEach((orderItemId) => {
      fetch(`https://sokoapi.onrender.com/order_items/${orderItemId}`, increaseQuantityRequest)
        .then(response => {
          console.log('Received response:', response);
  
          if (response.ok) {
            console.log('Quantity increased successfully');
            // Update local quantity or dispatch an action as needed
          } else {
            console.log('Failed to increase quantity');
            throw new Error('Failed to increase quantity'); 
          }
        })
        .catch(error => {
          console.error('An unexpected error occurred:', error);
        });
    });
  }
  
  function handleDecreaseQuantity() {
    const orderItem = productInCart.order_item_ids.find(id => id === product.orderItemId);

    if (!orderItem) {
      console.error("Order item not found");
      return;
    }

    fetch(`https://sokoapi.onrender.com/order_items/${orderItem}?decrease_quantity=true`, {
      method: 'PATCH',
    })
      .then(response => {
        if (response.ok) {
          console.log('Quantity decreased successfully');
          dispatch(decreaseQuantity(product.id));
          setLocalQuantity(localQuantity - 1); // Update local quantity
        } else {
          dispatch(removeFromCart(product.id));
          return response.json().then(data => {
            console.error('Failed to decrease quantity:', data.errors);
          });
        }
      })
      .catch(error => {
        console.error('An unexpected error occurred:', error);
      });
  }

  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <div className="card" style={{ maxWidth: '1000px', maxHeight: '100%' }}>
          <div className="row g-0">
            <div className="col-md-4" onClick={handleShow} style={{ cursor: 'pointer' }}>
              <img
                src={product.image}
                alt="..."
                className="img-fluid h-100 w-100"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">{product.title}</h3>

                <hr /> {/* Add a horizontal line below the title */}
                <h4 className="fw-bold">KSh{product.price}</h4>

                {/* Product Rating */}
                <Rating product={product} />
                {productInCart ? (
                  <div className="d-flex justify-content-between align-items-center m-4" style={{ width: '20em' }}>
                    <button className="btn btn-primary" onClick={handleDecreaseQuantity}>
                      -
                    </button>
                    <span>{localQuantity !== null ? localQuantity : 'Loading...'}</span>
                    <button className="btn btn-primary" onClick={() => handleIncreaseQuantity(product.id)}>
                      +
                    </button>
                    <small className="d-inline">({localQuantity !== null ? `${localQuantity} item(s) added to cart` : 'Loading...'})</small>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary m-4" style={{ width: '100%' }} onClick={(event) => handleAddToCart(event)}>
                      <span className="me-1"><BsFillCartFill /></span>Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* creating a separate component on the right side  */}
        <Col md={6} style={{ marginLeft: '40px', width: '28%' }}>
          <DeliveryInfo />
        </Col>

        {/* pop up when the product is selected */}
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Product Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={product.image}
              alt="Product"
              className="img-fluid"
            />
          </Modal.Body>
        </Modal>
      </div>

      <ProductSpecification product={product} />
    </>
  );
}

export default ProductDetail;
