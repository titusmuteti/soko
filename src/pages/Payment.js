import React from "react";
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import customAddressCard from "../components/customAddressCard";

function Payment() {
      // Extract user's name and addresses from the URL query params
  const searchParams = new URLSearchParams(window.location.search);
  const firstName = searchParams.get("first_name");
  const addresses = JSON.parse(searchParams.get("addresses"));

  // Define a function to render custom address cards
  const renderCustomAddressCards = () => {
    if (addresses && addresses.length > 0) {
      return addresses.map((address, index) => (
        <customAddressCard key={index} address={address} />
      ));
    } else {
      return <p>No addresses found.</p>;
    }
  };

  useEffect(() => {
    // You can use firstName in your component as needed
    console.log("User's first name:", firstName);
  }, [firstName]);


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

  return (
    <>
      <div
        className="container col-m-4 p-4"
        style={{ backgroundColor: "white", maxWidth: "60em", marginTop: "20px", position: "relative" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {generateLabel(1)}
          <h6>CUSTOM ADDRESS</h6> 
        </div>
        <div style={{ borderBottom: "1px solid black", width: "100%", marginTop: "10px" }}></div> 
        <div>
        {renderCustomAddressCards()}
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
    </>
  );
}

export default Payment;