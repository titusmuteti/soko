import React, { useState, useEffect } from 'react';

function CustomAddressData() {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://sokoapi.onrender.com/users/`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.ok) {
          const users = await response.json();
          const user = users.find(user => user.id === parseInt(userId, 10));

          if (user) {
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
  };

  return (
    <>
      <div className="container col-md-12 mx-auto p-0" style={{ backgroundColor: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <div className="text-center mb-4"></div>
        {loggedInUser && loggedInUser.addresses.map((address, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '8px', position: 'relative', maxWidth: "100%" }}>
            {index === selectedAddressIndex && (
              <div style={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', cursor: 'pointer' }} onClick={() => handleAddressSelect(index)}>
                <div style={{ backgroundColor: 'green', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: 'white', fontSize: '16px' }}>✔</span>
                </div>
              </div>
            )}
            {index === 0 && (
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', backgroundColor: 'gray', color: 'white', borderRadius: '4px', fontSize: "14px", padding: '4px', textAlign: "center" }}>
                <small>Default Address</small>
              </div>
            )}
            <div className="row">
              <div className="col-md-6">
                <p style={{ display: 'flex', alignItems: 'center' }}>
                  <small>{loggedInUser.first_name} {loggedInUser.last_name}</small>
                  {index === selectedAddressIndex && (
                    <div style={{ marginLeft: '4px', backgroundColor: 'green', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontSize: '12px' }}>✔</span>
                    </div>
                  )}
                </p>
                <p><small>{address.region} | {address.city} | {loggedInUser.phone_number} | {loggedInUser.email}</small></p>
                <div className="text-end"></div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}

export default CustomAddressData;
