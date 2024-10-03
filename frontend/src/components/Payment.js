// Payment.js
import React from 'react'; // Importing React library
import { loadStripe } from '@stripe/stripe-js'; // Importing function to load Stripe
import { Elements } from '@stripe/react-stripe-js'; // Importing Elements component for Stripe integration
import CheckoutForm from './CheckoutForm'; // Importing the CheckoutForm component for payment processing
import './Payment.css'; // Importing custom styles for the payment page
import { FaTimes } from 'react-icons/fa'; // Importing cross icon from react-icons library

// Loading Stripe with the publishable key (replace with your actual key)
const stripePromise = loadStripe('pk_test_51Q3fboDH4uLGjOw0OLKKOTZnR9Kee6ItxiaR8DEeysbgGS0fAMkfRd0HwMGG9fcXsdpIXe56vONCzlbASyhxIivX00ZtzW0PpA'); 

const Payment = ({ onClose }) => { // Defining the Payment component and receiving onClose as a prop
  return (
    <Elements stripe={stripePromise}> {/* Wrapping the payment components with Stripe Elements */}
      <div className="payment-page"> {/* Main container for the payment page */}
        <div className="payment-header"> {/* Header section for the payment page */}
          <h1>Payment Page</h1> {/* Title for the payment page */}
          <h1>Thank you for your payment</h1> {/* Message thanking the user for their payment */}
          <button className="close-button" onClick={onClose}> {/* Button to close the payment page */}
            <FaTimes /> {/* Cross icon indicating the close button */}
          </button>
        </div>
        <CheckoutForm /> {/* Rendering the CheckoutForm component for payment details */}
      </div>
    </Elements>
  );
};

export default Payment; // Exporting the Payment component for use in other parts of the application
