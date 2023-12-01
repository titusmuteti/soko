import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddAddressPopup = ({ onCancel, onSubmit }) => {
  const [newAddress, setNewAddress] = useState({
    region: '',
    city: '',
  });

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className="popup-container m-4">
      <div className="popup">
        <Form>
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
