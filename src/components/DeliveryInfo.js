import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import CitySelector from './CitySelector';

const regionOptions = ["Bomet", "Eldoret", "Homabay", "Kajiado", "Kakamega", "Kiambu", "Kilifi", "Kisumu", 
"Kitui", "Liaikipia", "Machakos", "Makueni", "Mombasa","Muranga", "Nairobi", "Nakuru", "Narok", "Nyeri", "TransNzoia", "Vihiga"];

function DeliveryInfo() {
  const [region, setRegion] = useState('');
  const [city, setCity] = useState([]);

  const handleRegionChange = (event) => {
    event.preventDefault();
    const selectedRegion = event.target.value;
    setRegion(selectedRegion);
    setCity('');
  };

  return (
    <div className="card">
      <div className="card-body">
        <p className="card-title">Delivery & Returns</p>
        <p className="card-text">Choose your location</p>
        <hr />
        <Form className="d-grid pl-4" style={{ width: '20em', marginLeft: '0em' }}>
            <Form.Select style={{ marginBottom: '20px' }} onChange={handleRegionChange} value={region}>
              <option>Select Region</option>
              {regionOptions.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </Form.Select>
            <CitySelector selectedRegion={region} onCityChange={setCity} />
        </Form>
        <hr />
        <p style={{ marginTop: '20px' }}>Warranty: 1 year</p>
      </div>
    </div>
  );
}

export default DeliveryInfo;
