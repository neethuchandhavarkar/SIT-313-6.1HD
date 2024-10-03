import React, { useState } from 'react'; // Import React and useState hook for managing state
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; // Import Stripe components for payment processing

const CheckoutForm = () => {
  const stripe = useStripe(); // Get the Stripe instance for processing payments
  const elements = useElements(); // Get the Elements instance for managing form elements
  const [error, setError] = useState(null); // State to hold error messages
  const [success, setSuccess] = useState(false); // State to indicate successful payment

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const cardElement = elements.getElement(CardElement); // Get the CardElement for card details

    // Create a payment method using the card details entered by the user
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card', // Specify the type of payment method
      card: cardElement, // Attach the CardElement
    });

    // Check for errors in payment method creation
    if (error) {
      setError(error.message); // Set the error state with the error message
    } else {
      setSuccess(true); // Set success state to true
      // Handle successful payment method (e.g., save it in Firestore)
      console.log('Payment method created:', paymentMethod); // Log the created payment method for debugging
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* Attach the handleSubmit function to the form */}
      <CardElement /> {/* Render the CardElement for entering card details */}
      <button type="submit" disabled={!stripe}>Pay</button> {/* Disable button if Stripe is not loaded */}
      {error && <div>{error}</div>} {/* Display error message if exists */}
      {success && <div>Payment successful!</div>} {/* Display success message if payment was successful */}
    </form>
  );
};

export default CheckoutForm; // Export the CheckoutForm component for use in other parts of the application
