import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';  
import CustomAddressCard from "./CustomAddressCard";
import AddAddressModal from "./AddAdressModal";
import EditAddressModal from "./EditAddressModal";
import { selectAddress } from '../redux/addressActions';  

function CustomAddressSection({ user, onSelectAddress, selectedAddress, onAddAddress, onNext }) {
  const dispatch = useDispatch();  // Initialize useDispatch hook
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(true);
  const [showOneAddress, setShowOneAddress] = useState(false);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);

  const storedAddresses = localStorage.getItem('addresses');
  const addresses = JSON.parse(storedAddresses) || [];
  const numberOfAddresses = addresses.length;

  const storedSelectedAddress = localStorage.getItem('selectedAddress');
  const storedSelectedAddressObj = JSON.parse(storedSelectedAddress);
  const [selectedAddressFromStorage, setSelectedAddressFromStorage] = useState(storedSelectedAddressObj);

  const handleModal = (modalType) => {
    const modalHandlers = {
      add: {
        show: () => setShowAddAddressModal(true),
        hide: () => setShowAddAddressModal(false),
      },
      edit: {
        show: () => setShowEditAddressModal(true),
        hide: () => setShowEditAddressModal(false),
      },
    };

    return modalHandlers[modalType];
  };

  const { show: showAddModal, hide: hideAddModal } = handleModal("add");
  const { show: showEditModal, hide: hideEditModal } = handleModal("edit");

  const handleNext = (e) => {
    e.preventDefault();
    setShowAllAddresses((prevState) => !prevState);
    setShowOneAddress(true);
    setNextButtonClicked(true);
    if (showAllAddresses) {
      onNext();
    }
  };

  const handleSelectAddress = (address) => {
    dispatch(selectAddress(address));
    setSelectedAddressFromStorage(address);
    onSelectAddress(address);
  };

  useEffect(() => {
    localStorage.setItem('selectedAddress', JSON.stringify(selectedAddressFromStorage));
  }, [selectedAddressFromStorage]);

  return (
    <>
      <h6></h6>
      <div className="container col-m-4 p-4" style={{ backgroundColor: "white", maxWidth: "60em", marginTop: "20px", position: "relative", height: "100%" }}>
        <h5>1. CUSTOM ADDRESS</h5>
        <hr/>
        <small className="m-2">Address books ({numberOfAddresses})</small>
        
        {/* Show either all addresses or just one based on showOneAddress */}
        {showOneAddress ? (
          <>
            {selectedAddress && (
              <div>
                <p>{selectedAddress.address}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <CustomAddressCard user={user} onSelectAddress={handleSelectAddress} />
            {selectedAddress && (
              <div>
                <p>{selectedAddress.address}</p>
              </div>
            )}
          </>
        )}

        {/* Show the "Add Address" button only if "Next" button is not clicked */}
        {!nextButtonClicked && (
          <Button onClick={onAddAddress} variant="transparent" style={{ float: "left", display: "flex", alignItems: "center", gap: "10px", color: "orange" }}>
            <FaPlus /> ADD ADDRESS
          </Button>
        )}

        {/* Show the "Next" button only if "Next" button is not clicked */}
        {!nextButtonClicked && selectedAddress && (
          <Button onClick={handleNext} variant="transparent" style={{ float: "right", display: "flex", alignItems: "center", gap: "10px", color: "orange" }}>
            NEXT
          </Button>
        )}

        {showAddAddressModal && <AddAddressModal onCancel={hideAddModal} onSubmit={onAddAddress} />}
        {showEditAddressModal && <EditAddressModal onCancel={hideEditModal} onSubmit={onAddAddress} />}
        <div style={{ borderBottom: "1px solid black", width: "100%", marginTop: "10px", marginBottom: "20px" }}></div>
      </div>
    </>
  );
}

export default CustomAddressSection;
