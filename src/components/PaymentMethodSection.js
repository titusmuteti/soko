import React, {useState} from "react";
import mpesa from '../assests/images/mpesa.png';

function PaymentMethodSection() {
  const [isSelected, setIsSelected] = useState(false);

  const handleImageClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="container col-m-4 p-4" style={{ backgroundColor: "white", maxWidth: "60em", marginTop: "20px", position: "relative", height: "100%" }}>
      <h5>3. PAYMENT METHODS</h5>
      <hr/>
      <div>
        <input type="radio" id="mpesa" name="paymentMethod" value="mpesa" style={{ display: "none" }} />
        <label htmlFor="mpesa" onClick={handleImageClick} style={{ cursor: "pointer", border: isSelected ? "2px solid blue" : "2px solid transparent" }}>
          <img src={mpesa} alt="M-Pesa" style={{ width: "100px", height: "auto", borderRadius:"5px" }} />
        </label>
      </div>
    </div>
  );
}

export default PaymentMethodSection;
