import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const AddAddressModal = ({ onCancel, onSubmit }) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');
  const [newAddress, setNewAddress] = useState({
    region: '',
    city: '',
    user_id: userId,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'https://sokoapi.onrender.com/addresses';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ address: newAddress }),
      });

      if (response.ok) {
        const createdAddress = await response.json();
        onSubmit(createdAddress);
      } else {
        console.error('Error adding address:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <Modal show={true} onHide={onCancel} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="region">Region</label>
            <Form.Control
              type="text"
              placeholder="Enter region"
              name="region"
              value={newAddress.region}
              onChange={(e) => setNewAddress({ ...newAddress, region: e.target.value })}
              />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              />
          </div>
          <Button type="submit" className="m-4">
            Add Address
          </Button>
          <Button type="button" onClick={onCancel} className="m-4">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddAddressModal;