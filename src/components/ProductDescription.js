import React, { useState } from 'react';
import { BsFillCartFill } from "react-icons/bs";
import { Modal, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import DeliveryInfo from './DeliveryInfo';
import ProductSpecification from './ProductSpecifications';
import Rating from './Rating';

function ProductDescription({ product }) {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
    <div className="container d-flex justify-content-center mt-5">
      <div className="card" style={{ maxWidth: '700px' }}>
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
              <Rating product={product}/>

              <Button className="btn btn-primary w-100 m-4">
                <span className='me-3'><BsFillCartFill/></span>Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* creating a separate component on the right side  */}
      <Col md={6} style={{marginLeft:'40px', width:"28%"}}>
          <DeliveryInfo /> 
      </Col>


      {/* pop up when product is selected */}
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

    <ProductSpecification product={product}/>
    </>
  );
}

export default ProductDescription;
