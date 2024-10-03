import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; // Import Firebase authentication and Firestore database
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Import Firestore document functions
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; // Import Google Auth provider and user creation methods
import { Container, Header, Form, Button, Message, Icon, Divider } from 'semantic-ui-react'; // Import UI components from Semantic UI
import './LoginSignUpPage.css'; // Custom CSS for layout

const SignUpPage = () => {
  // State variables for user input
  const [firstName, setFirstName] = useState(''); // Store first name
  const [lastName, setLastName] = useState(''); // Store last name
  const [email, setEmail] = useState(''); // Store email
  const [password, setPassword] = useState(''); // Store password
  const [reEnterPassword, setReEnterPassword] = useState(''); // Store re-entered password
  const [error, setError] = useState(''); // Store error messages
  const navigate = useNavigate(); // Hook for navigation
  const provider = new GoogleAuthProvider(); // Google Auth provider instance

  // Password validation function for special characters
  const containsSpecialCharacter = (password) => {
    const specialCharacterRegex = /[!@#%*]/; // Regex for special characters
    return specialCharacterRegex.test(password); // Test if password contains special characters
  };

  // Function to check if email exists in Firestore
  const checkEmailExists = async (email) => {
    const docRef = doc(db, 'email', email); // Reference to Firestore document
    const docSnap = await getDoc(docRef); // Get document snapshot
    return docSnap.exists(); // Return true if document exists
  };

  // Main sign-up handler function
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError('');  // Clear previous errors

    // Password matching and validation
    if (password !== reEnterPassword) {
      setError("Passwords do not match! Please re-enter your password."); // Error if passwords do not match
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters long."); // Error for short password
      return;
    }
    if (!containsSpecialCharacter(password)) {
      setError("Password must contain at least one special character (!@#%*)."); // Error for missing special characters
      return;
    }

    try {
      // Check if email already exists
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        setError('This email is already registered in the system.'); // Error if email is already registered
        return;
      }

      // Proceed with sign-up if email doesn't exist
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Create user with email and password
      const user = userCredential.user; // Get user information

      // Save user details in the 'email' collection (document ID as email)
      await setDoc(doc(db, 'email', user.email), {
        name: `${firstName} ${lastName}`, // Save user's full name
        email: user.email, // Save user's email
        createdAt: new Date(), // Capture the signup time
      });

      // Redirect to the second homepage after successful sign-up
      navigate('/second-home'); // Navigate to another route
    } catch (error) {
      // Handle Firebase errors
      const errorCode = error.code; // Get error code
      switch (errorCode) {
        case 'auth/email-already-in-use':
          setError('This email is already in use.'); // Handle already in use error
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.'); // Handle invalid email error
          break;
        case 'auth/weak-password':
          setError('Password is too weak.'); // Handle weak password error
          break;
        default:
          setError('An error occurred during sign-up.'); // Handle other errors
          break;
      }
    }
  };

  // Google sign-in handler with email check
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Sign in with Google
      const user = result.user; // Get user information

      // Check if email already exists in Firestore
      const emailExists = await checkEmailExists(user.email);
      if (emailExists) {
        setError('This email is already registered in the system.'); // Error if email is already registered
        return;
      }

      // Save Google user details in Firestore
      await setDoc(doc(db, 'email', user.email), {
        name: user.displayName, // Save user's display name
        email: user.email, // Save user's email
        createdAt: new Date(), // Capture the signup time
      });

      // Redirect to the second homepage
      navigate('/second-home'); // Navigate to another route
    } catch (error) {
      setError('Google sign-up failed.'); // Handle Google sign-up error
    }
  };

  return (
    <Container text>
      <div className="form-container">
        <Header as='h2' textAlign='center'>Sign Up</Header>
        <Form onSubmit={handleSignUp}> {/* Form submission handler */}
          <Form.Field>
            <label>First Name</label>
            <input
              type='text'
              placeholder='Enter your first name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} // Update first name state
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input
              type='text'
              placeholder='Enter your last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} // Update last name state
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Re-enter Password</label>
            <input
              type='password'
              placeholder='Re-enter your password'
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)} // Update re-entered password state
              required
            />
          </Form.Field>
          <Button fluid primary type='submit'>Sign Up</Button> {/* Sign up button */}
        </Form>

        {error && <Message negative>{error}</Message>}  {/* Display error message if exists */}

        <Divider horizontal>Or</Divider>

        {/* Google Sign Up Button */}
        <Button color='google plus' fluid onClick={handleGoogleSignUp}>
          <Icon name='google' /> Sign Up with Google {/* Icon for Google sign-up */}
        </Button>

        <p style={{ textAlign: 'center', marginTop: '1em' }}>
          Already have an account? <a href="/login">Login</a> {/* Link to login page */}
        </p>
      </div>
    </Container>
  );
};

export default SignUpPage; // Export the SignUpPage component
