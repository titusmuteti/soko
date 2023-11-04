import React from "react";

function Payment() {

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
        <div></div>
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
