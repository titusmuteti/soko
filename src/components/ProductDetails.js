import React, { useState, useEffect } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { Modal, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, increaseQuantity } from '../redux/cartActions';

import DeliveryInfo from './DeliveryInfo';
import ProductSpecification from './ProductSpecifications';
import Rating from './Rating';

function ProductDetail({ product }) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.items);
  const isInCart = cartItems.some((item) => item.id === product.id)

  
  function handleAddToCart() {
    if (!isInCart) {
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  }

  function handleRemoveFromCart() {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    }
  }

  function handleIncreaseQuantity() {
    dispatch(increaseQuantity(product.id));
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
                <h3 className="fw-bold">KSh{product.price}</h3>

                {/* Product Rating */}
                <Rating product={product} />
                {isInCart ? (
                  <div className="d-flex justify-content-between align-items-center m-4" style={{ width: '20em' }}>
                    <button className="btn btn-primary" onClick={handleRemoveFromCart}>
                      -
                    </button>
                    <span>{cartItems.find((item) => item.id === product.id).quantity}</span>
                    <button className="btn btn-primary" onClick={handleIncreaseQuantity}>
                      + {/* Change the button to trigger increaseQuantity */}
                    </button>
                    <small className="d-inline">({cartItems.find((item) => item.id === product.id).quantity} item(s) added to cart)</small>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary m-4" style={{ width: '100%' }} onClick={handleAddToCart}>
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
