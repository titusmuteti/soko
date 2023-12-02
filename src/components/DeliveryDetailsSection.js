import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

function DeliveryDetailsSection({ selectedAddress }) {
  const [deliveryOption, setDeliveryOption] = useState("doorstep");

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  return (
    <div className="container col-m-4 p-4" style={{ backgroundColor: "white", maxWidth: "60em", marginTop: "20px", position: "relative", height: "100%" }}>
      <h5>2. DELIVERY OPTIONS</h5>
      <hr/>
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
              onChange={handleDeliveryOptionChange}
            />
            <Form.Check
              type="radio"
              label="Delivery Shops (Ksh 200)"
              value="shop"
              checked={deliveryOption === "shop"}
              onChange={handleDeliveryOptionChange}
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default DeliveryDetailsSection;
