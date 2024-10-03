// PricingPlans.js
import React, { useState } from 'react';
import Modal from 'react-modal'; // Import Modal component for displaying the payment modal
import Payment from './Payment'; // Import Payment component for handling payments
import './PricingPlans.css'; // Import custom styles for pricing plans

const PricingPlans = () => {
  // State to manage the visibility of the payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false); // Initialize state to false

  // Function to open the payment modal when the upgrade button is clicked
  const handleUpgradeClick = () => {
    setShowPaymentModal(true); // Set state to true to show the payment modal
  };

  // Function to close the payment modal
  const handleCloseModal = () => {
    setShowPaymentModal(false); // Set state to false to hide the payment modal
  };

  return (
    <div className="pricing-container"> {/* Main container for pricing plans */}
      <h1>Pricing Plans</h1> {/* Main title for the pricing plans section */}

      {/* Free Plan details */}
      <div className="plan"> {/* Container for Free Plan */}
        <h2>Free Plan</h2> {/* Title for Free Plan */}
        <p>Access to basic features.</p> {/* Description of Free Plan */}
      </div>

      {/* Premium Plan details */}
      <div className="plan premium"> {/* Container for Premium Plan */}
        <h2>Premium Plan</h2> {/* Title for Premium Plan */}
        <p>Customization features: messages, banners, themes, and analytics dashboard.</p> {/* Description of Premium Plan */}
        
        {/* Button to upgrade to premium, opens payment modal */}
        <button className="upgrade-button" onClick={handleUpgradeClick}>
          Upgrade to Premium {/* Button text for upgrading to Premium */}
        </button>
      </div>

      {/* Payment modal */}
      <Modal isOpen={showPaymentModal} onRequestClose={handleCloseModal}> {/* Modal for payment, controlled by state */}
        <Payment onClose={handleCloseModal} /> {/* Render Payment component and pass close handler */}
      </Modal>
    </div>
  );
};

export default PricingPlans; // Export the PricingPlans component
