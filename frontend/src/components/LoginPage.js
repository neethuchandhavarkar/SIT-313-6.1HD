// components/LoginPage.js
import React, { useState } from 'react'; // Import React and useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { auth, db } from '../firebase'; // Import Firebase authentication and Firestore database
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'; // Import authentication methods
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore document methods
import { Container, Header, Form, Button, Message, Icon, Divider } from 'semantic-ui-react'; // Import Semantic UI components
import './LoginSignUpPage.css'; // Import custom CSS for layout

const LoginPage = () => {
  // State variables for email, password, errors, and reset messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState(''); // State for password reset message
  const navigate = useNavigate(); // Hook to programmatically navigate
  const provider = new GoogleAuthProvider(); // Provider for Google authentication

  // Login handler for Email and Password
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError('');  // Clear previous errors
  
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // Get authenticated user
  
      // Now check if the user exists in Firestore
      const userDocRef = doc(db, 'users', user.email); // Reference to the user's document in Firestore
      const userDocSnapshot = await getDoc(userDocRef); // Get the document snapshot
  
      if (userDocSnapshot.exists()) {
        // User exists in Firestore, proceed to second homepage
        navigate('/second-home'); // Navigate to second homepage
      } else {
        // User does not exist in Firestore, show error
        setError('User authenticated but not found in the database.');
        // Optionally sign out the user since the database record is missing
        auth.signOut(); // Sign out the user
      }
    } catch (error) {
      // Handle Firebase errors
      const errorCode = error.code; // Get error code
      switch (errorCode) {
        case 'auth/user-not-found':
          setError('User not found.'); // Specific error message for user not found
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.'); // Specific error message for wrong password
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.'); // Specific error message for invalid email
          break;
        default:
          setError('An error occurred during login.'); // General error message
          break;
      }
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Sign in with Google
      const user = result.user; // Get authenticated user
      
      // Now check if the user exists in Firestore
      const userDocRef = doc(db, 'users', user.email); // Reference to the user's document in Firestore
      const userDocSnapshot = await getDoc(userDocRef); // Get the document snapshot
  
      if (userDocSnapshot.exists()) {
        // User exists in Firestore, proceed to second homepage
        navigate('/second-home'); // Navigate to second homepage
      } else {
        // User does not exist in Firestore, show error
        setError('Google account authenticated but not found in the database.');
        // Optionally sign out the user since the database record is missing
        auth.signOut(); // Sign out the user
      }
    } catch (error) {
      setError('Google sign-in failed.'); // Handle Google sign-in errors
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email first.'); // Check if email is provided
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email); // Send password reset email
      setResetMessage('Password reset email sent! Check your inbox.'); // Success message
      setError(''); // Clear error message
    } catch (error) {
      const errorCode = error.code; // Get error code
      switch (errorCode) {
        case 'auth/user-not-found':
          setError('User not found.'); // Specific error message for user not found
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.'); // Specific error message for invalid email
          break;
        default:
          setError('Error sending password reset email.'); // General error message
          break;
      }
    }
  };

  return (
    <Container text>
      <div className="form-container"> {/* Main form container */}
        <Header as='h2' textAlign='center'>Login</Header> {/* Login header */}
        <Form onSubmit={handleLogin}> {/* Login form */}
          <Form.Field>
            <label>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required // Make field required
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required // Make field required
            />
          </Form.Field>
          <Button fluid primary type='submit'>Login</Button> {/* Submit button */}
        </Form>

        {error && <Message negative>{error}</Message>}  {/* Display error message if exists */}
        {resetMessage && <Message positive>{resetMessage}</Message>} {/* Display reset success message */}

        <p style={{ textAlign: 'center', marginTop: '1em' }}>
          <a href="#" onClick={handlePasswordReset}>Forgot Password?</a>  {/* Forgot Password Link */}
        </p>

        <Divider horizontal>Or</Divider> {/* Divider for alternative sign-in method */}

        {/* Google Sign In Button */}
        <Button color='google plus' fluid onClick={handleGoogleSignIn}>
          <Icon name='google' /> Sign In with Google
        </Button>

        <p style={{ textAlign: 'center', marginTop: '1em' }}>
          Don't have an account? <a href="/signup">Sign Up</a> {/* Link to sign-up page */}
        </p>
      </div>
    </Container>
  );
};

export default LoginPage; // Export the LoginPage component for use in other parts of the application
