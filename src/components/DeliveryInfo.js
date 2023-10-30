import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function DeliveryInfo() {
  const locationOptions = ["Nairobi", "Machakos", "Mombasa", "Nakuru", "Kisumu", "Malindi", "Kakamega", "Eldoret",
    "Garissa", "Nyeri", "Muranga", "Nanyuki", "Bomet", "Kitui", "Wote", "Kitale", "Homabay", "Vihiga"
  ];

  const [selectedLocation, setSelectedLocation] = useState(""); // Use setSelectedLocation with a lowercase "s"
  const [deliveryLocation, setDeliveryLocation] = useState([]);

  const handleLocationChange = (event) => {
    event.preventDefault();
    const selectedValue = event.target.value;
    setSelectedLocation(selectedValue); // Use setSelectedLocation with a lowercase "s"

    if (selectedValue === "Nairobi") {
      setDeliveryLocation(["CBD", "Wendani", "Ruiru", "Kangemi", "Westlands", "Hurlingam", "Kawangware", "Githurai", "Njiru", "Pipeline", "South B"]); // Corrected "Pipepline" to "Pipeline"
    } else if (selectedValue === "Mombasa") {
      setDeliveryLocation(["CBD", "Changamwe", "Bombolulu", "Nyali", "Bamburi"]);
    } else if (selectedValue === "Nakuru"){
      setDeliveryLocation(["CBD", "Pipeline", "Kayole"]);
    } else if (selectedValue === "Kisumu"){
        setDeliveryLocation(["CBD"])
    } else {
        setDeliveryLocation([deliveryLocation])
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <p className="card-title">Delivery & Returns</p>
        <p className="card-text">Choose your location</p>
        <hr />
        <Form className="d-grid pl-4" style={{ width: '20em', marginLeft: '0em' }}>
          <Form.Select style={{ marginBottom: '20px' }} onChange={handleLocationChange} value={selectedLocation}>
            <option>Select Location</option>
            {locationOptions.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </Form.Select>

          <Form.Select style={{ marginBottom: '20px' }}>
            <option value="">Delivery point</option>
            {deliveryLocation.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </Form>
        <hr />
        <p style={{ marginTop: '20px' }}>Warranty: 1 year</p>
      </div>
    </div>
  );
}

export default DeliveryInfo;
