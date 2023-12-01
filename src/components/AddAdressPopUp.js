import React, { useState } from 'react';

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
    <div className="popup-container">
      <div className="popup">
        <h2>Add New Address</h2>
        <form onSubmit={(e) => onSubmit(e, newAddress)}>
          {/* Input fields for new address */}
          <label>
            Region:
            <input
              type="text"
              name="region"
              value={newAddress.region}
              onChange={handleNewAddressChange}
            />
          </label>
          {/* Add other input fields as needed */}
          <button type="submit">Add Address</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddressPopup;
