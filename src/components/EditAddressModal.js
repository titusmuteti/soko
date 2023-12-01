import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const EditAddressModal = ({ onCancel, onSubmit, onDelete, editAddressId }) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

  const [editedAddress, setEditedAddress] = useState({
    region: '',
    city: '',
    user_id: userId,
  });

  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        if (editAddressId) {
          const response = await fetch(`https://sokoapi.onrender.com/addresses/${editAddressId}`,);

          if (response.ok) {
            const addressData = await response.json();
            console.log(addressData);
            setEditedAddress({
              region: addressData.region,
              city: addressData.city,
            });
          } else {
            console.error('Error fetching address details:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching address details:', error);
      }
    };

    fetchAddressDetails();
  }, [editAddressId, token]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `https://sokoapi.onrender.com/addresses/${editAddressId}`;

      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ address: editedAddress }),
      });

      if (response.ok) {
        const updatedAddress = await response.json();
        onSubmit(updatedAddress);
      } else {
        console.error('Error updating address:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const apiUrl = `https://sokoapi.onrender.com/addresses/${editAddressId}`;

      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("address deleted successfully");
        onDelete();
      } else {
        console.error('Error deleting address:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <Modal show={true} onHide={onCancel} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
        <div className="form-group">
            <label htmlFor="region">Region</label>
            <Form.Control
              type="text"
              placeholder="Enter region"
              name="region"
              value={editedAddress.region}
              onChange={(e) => setEditedAddress({ ...editedAddress, region: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              name="city"
              value={editedAddress.city}
              onChange={(e) => setEditedAddress({ ...editedAddress, city: e.target.value })}
            />
          </div>
          <Button type="submit" className="m-4">
            Save
          </Button>
          <Button type="button" onClick={onCancel} className="m-4">
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} className="m-4">
            Delete Address
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditAddressModal;
