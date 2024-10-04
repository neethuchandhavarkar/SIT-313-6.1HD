import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth'; 
import { doc, getDoc } from 'firebase/firestore'; 
import { Container, Header, Form, Button, Message, Icon, Divider } from 'semantic-ui-react';
import './LoginSignUpPage.css'; // Custom CSS for layout

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetMessage, setResetMessage] = useState(''); // State for reset message
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Login handler for Email and Password
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');  // Clear previous errors
  
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Now check if the user exists in Firestore
      const userDocRef = doc(db, 'email', user.email); // 'email' is the collection name
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        // User exists in Firestore, proceed to second homepage
        navigate('/second-home');
      } else {
        // User does not exist in Firestore, show error
        setError('User authenticated but not found in the database.');
        // Optionally sign out the user since the database record is missing
        auth.signOut();
      }
    } catch (error) {
      // Handle Firebase errors
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/user-not-found':
          setError('User not found.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        default:
          setError('An error occurred during login.');
          break;
      }
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Now check if the user exists in Firestore
      const userDocRef = doc(db, 'email', user.email); // 'email' is the collection name
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        // User exists in Firestore, proceed to second homepage
        navigate('/second-home');
      } else {
        // User does not exist in Firestore, show error
        setError('Google account authenticated but not found in the database.');
        // Optionally sign out the user since the database record is missing
        auth.signOut();
      }
    } catch (error) {
      setError('Google sign-in failed.');
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email first.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage('Password reset email sent! Check your inbox.');
      setError('');
    } catch (error) {
      const errorCode = error.code;
      switch (errorCode) {
        case 'auth/user-not-found':
          setError('User not found.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        default:
          setError('Error sending password reset email.');
          break;
      }
    }
  };

  return (
    <Container text>
      <div className="form-container">
        <Header as='h2' textAlign='center'>Login</Header>
        <Form onSubmit={handleLogin}>
          <Form.Field>
            <label>Email</label>
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Field>
          <Button fluid primary type='submit'>Login</Button>
        </Form>

        {error && <Message negative>{error}</Message>}  {/* Display error message if exists */}
        {resetMessage && <Message positive>{resetMessage}</Message>} {/* Display reset success message */}

        <p style={{ textAlign: 'center', marginTop: '1em' }}>
          <a href="#" onClick={handlePasswordReset}>Forgot Password?</a>  {/* Forgot Password Link */}
        </p>

        <Divider horizontal>Or</Divider>

        {/* Google Sign In Button */}
        <Button color='google plus' fluid onClick={handleGoogleSignIn}>
          <Icon name='google' /> Sign In with Google
        </Button>

        <p style={{ textAlign: 'center', marginTop: '1em' }}>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </Container>
  );
};

export default LoginPage;
