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
  const productInCart = cartItems.find((item) => item && item.product && item.product.id === product.id);
  
  
  // Initialize localQuantity from localStorage on component mount
  useEffect(() => {
    const storedQuantity = localStorage.getItem(`localQuantity_${product.id}`);
    setLocalQuantity(storedQuantity ? parseInt(storedQuantity, 10) : 1);
  }, [product.id]);

  // Check if the product is in the cart and set localQuantity accordingly
  useEffect(() => {
    if (productInCart) {
      setLocalQuantity(productInCart.quantity);
    } else {
      setLocalQuantity(1);
    }
  }, [productInCart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          // Call FetchOrders and await the result
          const orderItems = await FetchOrders(userId, dispatch);
  
          // Check if orderItems is defined before proceeding
          if (orderItems) {
            // Dispatch actions to update the Redux store
            dispatch(initializeCart(orderItems, userId));
  
            // Find the updated product in the cart
            const updatedProductInCart = orderItems.find((item) => item && item.id === product.id);
  
            // Set localQuantity based on the updated cart information
            setLocalQuantity(updatedProductInCart ? updatedProductInCart.quantity : 0);
          }
        }
      } catch (error) {
        console.error('An error occurred while fetching orders:', error);
      }
    };
  
    fetchData(); // Call the fetchData function
  
    // Specify the dependencies for the useEffect hook
  }, [dispatch, userId, product.id]);  
  

  useEffect(() => {
    // Update local quantity based on the updated cartItems state
    const updatedProductInCart = cartItems.find((item) => item && item.product && item.product.id === product.id);
  
    if (updatedProductInCart) {
      setLocalQuantity(updatedProductInCart.quantity);
    } else {
      return;
    }
  }, [cartItems, product.id]);

  // Save to localStorage when localQuantity changes
  useEffect(() => {
    localStorage.setItem(`localQuantity_${product.id}`, (localQuantity || 0).toString());
  }, [localQuantity, product.id]);

  const handleAddToCart = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');

      // Use the updated addToCart action to add the product to the cart
      const data = await dispatch(addToCart(product, userId));

      // Use the data returned from the action to update localQuantity and the backend
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

      // Update local quantity
      setLocalQuantity(item.quantity);

      // Update the backend with the new cart information
      const updatedCartData = await fetchApi(`${BASE_URL}/orders/${data.id}`);
      const updatedOrderItemsData = await Promise.all(
        updatedCartData.order_item_ids.map(async (orderItemId) => {
          return fetchApi(`${BASE_URL}/order_items/${orderItemId}`);
        })
      );

      // Assuming updatedCartData is an array of order items, you may need to adapt this based on your API response structure
      dispatch(initializeCart(updatedOrderItemsData, userId));

    } 
    catch (error) {
    }
  };   
  
  function handleIncreaseQuantity() {
    dispatch(increaseQuantity(product.id));
  }
  
  function handleDecreaseQuantity() {
    dispatch(decreaseQuantity(product.id));
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
                    <button className="btn btn-primary" onClick={handleIncreaseQuantity}>
                      +
                    </button>
                    <small className="d-inline">
                      ({localQuantity !== null ? `${localQuantity} item(s) in cart` : 'Loading...'})
                    </small>
                  </div>
                ) : (
              <div className="d-flex justify-content-between align-items-center">
            <Button className="btn btn-primary m-4" style={{ width: '100%' }} onClick={handleAddToCart}>
              <span className="me-1"><BsFillCartFill /></span>Add to Cart
            </Button>
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
