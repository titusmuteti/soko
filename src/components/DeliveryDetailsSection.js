import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";

function DeliveryDetailsSection({ selectedAddress, isVisible, onNext }) {
  const [deliveryOption, setDeliveryOption] = useState("doorstep");
  const [showNextButton, setShowNextButton] = useState(false);

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  const handleNext = () => {
    setShowNextButton(false);
    onNext();
  };

  return (
    <div className="container col-m-4 p-4" style={{ display: isVisible ? 'block' : 'none', backgroundColor: "white", maxWidth: "60em", marginTop: "20px", position: "relative", height: "100%" }}>
      <h5>2. DELIVERY OPTIONS</h5>
      <hr />
      <Form>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={12}>
            Select Delivery Option:
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Doorstep Delivery"
              value="doorstep"
              checked={deliveryOption === "doorstep"}
              onChange={(e) => {
                handleDeliveryOptionChange(e);
                setShowNextButton(true);
              }}
            />
            <Form.Check
              type="radio"
              label="Delivery Shops (Ksh 200)"
              value="shop"
              checked={deliveryOption === "shop"}
              onChange={(e) => {
                handleDeliveryOptionChange(e);
                setShowNextButton(true);
              }}
            />
          </Col>
          {showNextButton && (
            <Button onClick={handleNext} variant="transparent" style={{ float: "right", display:"flex",  alignItems: "center", gap: "10px", color: "orange", marginTop: "20px" }}>
              NEXT 
            </Button>
          )}
        </Form.Group>
      </Form>
    </div>
  );
}

export default DeliveryDetailsSection;
