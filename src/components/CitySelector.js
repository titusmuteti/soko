import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

function CitySelector(props) {
  const { selectedRegion, onCityChange } = props;

  const citiesByRegion = {
    Bomet: ["Bomet Town"],
    Eldoret: ["CBD", "Moi's Bridge", "Langas", "Huruma"],
    Homabay: ["Homabay Town", "Kendu Bay", "Oyugis"],
    Kajiado: ["Ongata Rongai", "Kajiado Town", "Kitengela", "Kiserian", "Isinya"],
    Kakamega: ["CBD", "Mumias", "Webuye", "Butere"], 
    Kiambu: ["Kiambu Town", "Thika", "Kikuyu", "Githurai", "Ruiru", "Limuru", "Kabete"],
    Kilifi: ["Kilifi Town", "Malindi", "Mtwapa", "Watamu", "Vipingo", "Kilifi Creek"],
    Kisumu: ["CBD", "Ahero", "Kondele", "Bondo", "Dunga Beach"],
    Kitui: ["Kitui Town", "Mwingi"],
    Laikipia: ["Nanyuki"],
    Machakos: ["Machakos Town", "Tala", "Athiriver", "Syokimau", "Matuu"],
    Makueni: ["Wote", "Emali", "Mtito Andei"],
    Mombasa: ["CBD", "Changamwe", "Bombolulu", "Nyali", "Bamburi", "Likoni", "Kisauni", "Mikindani"],
    Muranga: ["Muranga Town", "Gatanga"],
    Nairobi: ["CBD", "Kilimani", "Ruiru", "Westlands", "Hurlingam", "Kawangware", "Njiru", "Westlands", "Hurlingham", "Dagoretti", "Karen", "Nairobi West", "South C", "South B", "Donholm", "Pipeline", "Kasarani", "Kahawa West", "Kayole", "Eastleigh"],
    Nakuru: ["CBD", "Naivasha", "Gilgil", "Molo", "Njoro", "Bahati", "Rongai", "Kabarak"],
    Narok: ["Narok Town"],
    Nyeri: ["Nyeri Town", "Othaya" ],
    TransNzoia: ["Kitale"],
    Vihiga: ["Mbale", "Chavakali"]
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
