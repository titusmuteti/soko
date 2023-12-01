import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa';
import CustomAddressCard from "../components/CustomAddressCard";
import OrderSummary from "../components/OrderSummary";
import AddAddressPopup from "../components/AddAdressPopUp";

function Payment() {
  const user = useSelector((state) => state.auth.user);
  const [showAddAddressPopup, setShowAddAddressPopup] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); 

  const generateLabel = (number) => {
    return (
      <div
        className="label"
        style={{
          backgroundColor: "transparent",
          color: "white",
          padding: "4px 8px",
          borderRadius: "50%",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      >
        {number}.
      </div>
    );
  };

  const handleAddAddressSubmit = async () => {
    setShowAddAddressPopup(false);
  };

  const handleAddAddressCancel = () => {
    setShowAddAddressPopup(false);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address); 
  };

  return (
    <>
      <div
        className="container col-m-4 p-4"
        style={{ backgroundColor: "white", maxWidth: "60em", marginTop: "20px", position: "relative", height:"100%" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {generateLabel(1)}
          <h6>CUSTOM ADDRESS</h6>
        </div>
        <div style={{ borderBottom: "1px solid black", width: "100%", marginTop: "10px" }}></div> 
        <div style={{  maxHeight: "calc(100% - 140px)" }}>
          <small>ADDRESS BOOKS</small>
          {<CustomAddressCard user={user} onSelectAddress={handleSelectAddress} />}
        </div>
        <div style={{marginBottom:"50px"}}>
          {!showAddAddressPopup && ( 
            <Button onClick={() => setShowAddAddressPopup(true)} variant="transparent" style={{ float: "left", display: "flex", alignItems: "center", gap: "10px", color: "orange" }}>
              <FaPlus /> ADD ADDRESS
            </Button>
          )}
          {showAddAddressPopup && (
          <AddAddressPopup onCancel={handleAddAddressCancel} onSubmit={handleAddAddressSubmit} />
          )}        
        </div>
      </div>

      <div
        className="container col-m-4 p-4" 
        style={{ backgroundColor: "white", maxWidth: "60em", marginTop: "20px", position: "relative" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {generateLabel(2)} 
          <h6>DELIVERY DETAILS</h6>
        </div>
        <div style={{ borderBottom: "1px solid black", width: "100%", marginTop: "10px" }}></div>
        <div></div>
      </div>

      <div
        className="container col-m-4 p-4" 
        style={{ backgroundColor: "white", maxWidth: "60em", marginTop: "20px", position: "relative" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {generateLabel(3)}
          <h6>PAYMENT METHOD</h6> 
        </div>
        <div style={{ borderBottom: "1px solid black", width: "100%", marginTop: "10px" }}></div> 
        <div></div>
      </div>
      <Col md={4} className="mt-4 ml-auto" style={{ marginLeft: '40px', width: '18%', position:"absolute", top:100, left:1350 }}>
        <OrderSummary />
      </Col>
    </>
  );
}

export default Payment;