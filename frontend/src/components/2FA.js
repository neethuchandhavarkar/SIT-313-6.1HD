import React, { useState, useEffect } from 'react';  // Import React and hooks
import axios from 'axios';  // Import axios for making HTTP requests
import './2FA.css'; // Import the CSS for styling the Two-Factor Authentication component

// Define the TwoFactorAuth functional component
const TwoFactorAuth = () => {
  // State hooks to manage component state
  const [qrCode, setQrCode] = useState(null);  // To store the QR code image
  const [secret, setSecret] = useState('');    // To store the secret for OTP verification
  const [otp, setOtp] = useState('');          // To manage user input for OTP
  const [message, setMessage] = useState('');  // To display messages to the user (success/error)
  const [loading, setLoading] = useState(true);  // To track loading state while fetching the QR code
  const [error, setError] = useState('');      // To store any error messages

  // useEffect hook to generate the QR code when the component mounts
  useEffect(() => {
    // Make a POST request to the server to generate the 2FA QR code
    axios.post('http://localhost:3001/api/generate-2fa')
      .then((response) => {
        // Set the QR code image and secret from the response
        setQrCode(response.data.qrCode);  // Set QR code image
        setSecret(response.data.secret);  // Save the secret for OTP verification
        setLoading(false);  // Set loading to false as QR code is loaded
      })
      .catch((error) => {
        // Handle errors during the QR code generation
        setError('Error generating QR code. Please try again.');  // Set error message
        setLoading(false);  // Set loading to false
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to handle OTP submission
  const handleOtpSubmit = () => {
    // Make a POST request to verify the OTP entered by the user
    axios.post('http://localhost:3001/api/verify-otp', {
      token: otp,  // Pass the entered OTP
      secret: secret // Send the secret for verification
    })
      .then((response) => {
        // On successful verification, display the response message
        setMessage(response.data.message);
      })
      .catch((error) => {
        // Handle errors if the OTP verification fails
        setMessage('Invalid OTP. Please try again.');  // Set invalid OTP message
      });
  };

  // Render the component
  return (
    <div className="two-factor-container">  
      <h2 className="two-factor-header">Two-Factor Authentication (2FA)</h2>

     
      {loading && <p className="loading-message">Loading QR Code...</p>}

    
      {qrCode && <img src={qrCode} alt="Scan QR code with Google Authenticator" className="qr-code" />}
      
      {error && <p className="error-message">{error}</p>}
      
     
      <p className="qr-instructions">Scan the QR code with your authenticator app</p>

      
      <input
        type="text"
        placeholder="Enter the OTP"  // Placeholder text in the input field
        value={otp}  // Bind the input value to otp state
        onChange={(e) => setOtp(e.target.value)}  // Update otp state on input change
        className="otp-input"  // CSS class for styling
      />
     
      <button onClick={handleOtpSubmit} className="verify-button">Verify OTP</button>

      
      {message && <p className="result-message">{message}</p>}
    </div>
  );
};

// Export the TwoFactorAuth component for use in other parts of the application
export default TwoFactorAuth;
