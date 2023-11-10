import React from 'react';

function CustomAddressData({ user }) {
  return (
    <>
      <div className="container col-md-6 mx-auto p-4" style={{ backgroundColor: "white", marginTop: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <div className="text-center mb-4">
        </div>
        {user.addresses.map((address, index) => (
          <div key={index}>
            <div className="row">
              <div className="col-md-6">
                <div className="text-end">
                  <p className="fw-bold">Name:</p>
                  <p className="fw-bold">Region:</p>
                  <p className="fw-bold">City:</p>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  {/* Correctly access user data */}
                  <p>{user.first_name} {user.last_name}</p>
                  <p>{address.region}</p>
                  <p>{address.city}</p>
                </div>
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
