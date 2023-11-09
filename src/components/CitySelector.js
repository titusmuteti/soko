import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function CitySelector(props) {
  const { selectedRegion, onCityChange } = props;

  const citiesByRegion = {
    Nairobi: ["CBD", "Wendani", "Ruiru", "Ngong", "Westlands", "Hurlingam", "Kawangware", "Githurai", "Njiru", "Westlands", "Hurlingham", "Dagoretti", "Karen", "Ongata Rongai", "Embakasi"],
    Machakos: ["CBD", "Tala", "Athiriver", "Syokimau"],
    Mombasa: ["CBD", "Changamwe", "Bombolulu", "Nyali", "Bamburi", "Nyali", "Mariakani"],
    Nakuru: ["CBD", "Naivasha", "Gilgil", "Molo", "Njoro", "Bahati", "Rongai", "Kabarak"],
    Kisumu: ["CBD", "Ahero", "Kondele", "Bondo", "Dunga Beach"],
    Malindi: ["CBD"],
    Kakamega: ["CBD", "Mumias", "Webuye", "Butere"],
    Eldoret: ["CBD", "Moi's Bridge"],
    Laikipia: ["Nanyuki"],
    Bomet: ["Bomet Town"],
    Kitui: ["Kitui Town"],
    Makueni: ["Wote"],
    TransNzoia: ["Kitale"],
    Homabay: ["Homabay Town"],
    Vihiga: ["Vihiga Town"]
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    onCityChange(selectedCity);
  };

  return (
    <Form.Select style={{ marginBottom: '20px' }} onChange={handleCityChange}>
      <option value="">Select City</option>
      {citiesByRegion[selectedRegion]?.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </Form.Select>
  );
}

export default CitySelector;
