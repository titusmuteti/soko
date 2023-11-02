import React, { useState, useEffect } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { Modal, Button, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeliveryInfo from './DeliveryInfo';
import ProductSpecification from './ProductSpecifications';
import Rating from './Rating';
import { useCart } from '../CartContext';

function ProductDetail({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  const { dispatch, items } = useCart();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    // Calculate cart items count from the context
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    setCartItems(itemCount);
    setIsInCart(itemCount > 0);
  }, [items]);

  function handleAddToCart() {
    const item = { // Construct the 'item' object
      id: product.id,
      title: product.title,
      quantity: 1,
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: item });
    
    const updatedCartItems = cartItems + 1;
    setCartItems(updatedCartItems);
    setIsInCart(updatedCartItems > 0);

    // Update localStorage with the new cart items count.
    localStorage.setItem('cartItems', updatedCartItems);
  }

  function handleRemoveFromCart() {
    const existingItem = items.find(item => item.id === product.id);

    if (existingItem && existingItem.quantity > 1) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: { id: product.id } });
    } else {
      dispatch({ type: 'REMOVE_FROM_CART', payload: { id: product.id } });
    }
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
                    <Button className="btn btn-primary" onClick={handleRemoveFromCart}>
                      -
                    </Button>
                    <span>{cartItems}</span>
                    <Button className="btn btn-primary" onClick={handleAddToCart}>
                      +
                    </Button>
                    <small className="d-inline">({cartItems} item(s) added to cart)</small>
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
