import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { GrRadialSelected } from "react-icons/gr";
import EditAddressModal from './EditAddressModal';  
import { Modal, Button } from 'react-bootstrap';

function CustomAddressCard({ user, onSelectAddress }) {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://sokoapi.onrender.com/users/`,);

        if (response.ok) {
          const users = await response.json();
          const user = users.find(user => user.id === parseInt(userId, 10));

          if (user) {
            const addresses = user.addresses;
            localStorage.setItem('addresses', JSON.stringify(addresses));
            setLoggedInUser(user);
          } else {
            console.error('User not found');
          }
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [token, userId]);

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
    const address = loggedInUser.addresses[index];
    onSelectAddress(address);
    setShowEditModal(false);
  };  

  const handleEditAddress = (addressId) => {
    setEditAddressId(addressId);
    setShowEditModal(true);
  };  

  return (
    <>
      <div className="container col-md-12 mx-auto p-0" style={{ backgroundColor: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <div className="text-center mb-4"></div>
        {loggedInUser && loggedInUser.addresses.map((address, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', position: 'relative', maxWidth: "100%", marginBottom:"20px" }}>
            <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', cursor: 'pointer' }}>
              <Button onClick={() => handleEditAddress(address.id)} style={{ marginRight: '8px', color: 'white', border: 'none', borderRadius: '4px', padding: '4px' }}>
                <FaRegEdit/>
              </Button>
            </div>
            {index === 0 && (
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', backgroundColor: 'gray', color: 'white', borderRadius: '4px', fontSize: "14px", padding: '4px', textAlign: "center" }}>
                <small>Default Address</small>
              </div>
            )}
            <div className="row">
              <div className="col-md-6" onClick={() => handleAddressSelect(index)}>
                <p style={{ display: 'flex', alignItems: 'center', paddingLeft: index === selectedAddressIndex ? '30px' : '0' }} >
                  {index === selectedAddressIndex && (
                    <GrRadialSelected style={{ color: 'orang', width: '20px', height: '20px', position: 'absolute', left: '8px' }} />
                  )}
                  <small>{loggedInUser.first_name} {loggedInUser.last_name}</small>
                </p>
                <p><small>{address.region} | {address.city} | {loggedInUser.phone_number} | {loggedInUser.email}</small></p>
                <div className="text-end"></div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
      {showEditModal && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditAddressModal
              onCancel={() => setShowEditModal(false)}
              onSubmit={() => {
                setShowEditModal(false);
              }}
              editAddressId={editAddressId}
              onDelete={() => setShowEditModal(false)}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}

export default CustomAddressCard;