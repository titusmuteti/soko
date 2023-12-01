import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddAddressPopup = ({ onCancel, onSubmit }) => {
  const [newAddress, setNewAddress] = useState({
    region: '',
    city: '',
  });
  const token = localStorage.getItem('token');
  const addresses = JSON.parse(localStorage.getItem('addresses'));
  const userId = localStorage.getItem('user_id');
  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://sokoapi.onrender.com/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          address: {
            ...newAddress,
            user_id: userId,
          },
        }), 
      });
  
      if (response.ok) {
        // Assuming the backend returns the updated addresses array
        const updatedAddresses = await response.json();
  
        // Update the addresses in localStorage
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
  
        // Trigger any callback or action needed upon successful submission
        onSubmit();
      } else {
        console.error('Error adding new address:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding new address:', error);
    }
  };
  return (
    <div className="popup-container m-4">
      <div className="popup">
        <Form onSubmit={handleAddAddress}>
          <h5>Add New Address</h5>
          <div className="form-group">
            <label htmlFor="region">Region</label>
            <Form.Control
              type="text"
              placeholder="Enter region"
              name="region"
              value={newAddress.region}
              onChange={handleNewAddressChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={newAddress.city}
              onChange={handleNewAddressChange}
            />
          </div>
          <Button type="submit" className="m-4">
            Add Address
          </Button>
          <Button type="button" onClick={onCancel} className="m-4">
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddAddressPopup;