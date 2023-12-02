import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa6";
import CustomAddressSection from "../components/CustomAddressSection";
import DeliveryDetailsSection from "../components/DeliveryDetailsSection";
import PaymentMethodSection from "../components/PaymentMethodSection";
import OrderSummary from "../components/OrderSummary";
import EditAddressModal from "../components/EditAddressModal";

function Payment() {
  const user = useSelector((state) => state.auth.user);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [activeContainer, setActiveContainer] = useState(1);

  const handleBackArrow = () => {
    setActiveContainer(activeContainer - 1);
  };

  const handleNext = () => {
    setActiveContainer(activeContainer + 1);
  };

  return (
    <>
      <CustomAddressSection
        user={user}
        onSelectAddress={(address) => {
          setSelectedAddress(address);
          setEditAddressId(address.id);
          setShowEditAddressModal(true);
        }}
        selectedAddress={selectedAddress}
        onAddAddress={() => setShowEditAddressModal(true)}
        onNext={handleNext}
        isVisible={activeContainer === 1}
      />

      <DeliveryDetailsSection
        selectedAddress={selectedAddress}
        isVisible={activeContainer === 2}
      />

      <PaymentMethodSection
        isVisible={activeContainer === 3}
      />

      <Col md={4} className="mt-4 ml-auto" style={{ marginLeft: '40px', width: '18%', position:"absolute", top:0, left:1350 }}>
        <OrderSummary />
      </Col>

      {showEditAddressModal && (
        <EditAddressModal
          onCancel={() => setShowEditAddressModal(false)}
          onSubmit={(editedAddress) => {
            setShowEditAddressModal(false);
          }}
          editAddressId={editAddressId}
          onDelete={() => {
            setShowEditAddressModal(false);
            setSelectedAddress(null);
          }}
        />
      )}
    </>
  );
}

export default Payment;