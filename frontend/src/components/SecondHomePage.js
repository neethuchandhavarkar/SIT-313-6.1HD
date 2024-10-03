// src/components/SecondHomePage.js
import React from 'react';
import './SecondHomePage.css'; // Import external CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import navigation hook from React Router
import { auth } from '../firebase'; // Import the auth object from Firebase

// HomePage component definition
function SecondHomePage() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle sign-out
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        // Sign-out successful, redirect to login page
        navigate('/login');
      })
      .catch((error) => {
        // Handle sign-out errors
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className="home-container">
      {/* Header section of the homepage */}
      <header className="home-header">
        <h1>DEV@DEAKIN</h1>
        <p>Welcome to the Home Page! Enhance your learning and productivity.</p>
        <button onClick={handleSignOut} className="signout-button">
          Sign Out
        </button> {/* Sign-out button */}
      </header>
      
      {/* Main content area featuring cards */}
      <main className="home-main">
        <section className="feature-card">
          <h2>Explore Our Features</h2>
          <p>Discover various tools and resources to boost your productivity.</p>
        </section>
        <section className="feature-card">
          <h2>Connect with Peers</h2>
          <p>Collaborate and grow with others in your learning journey.</p>
        </section>
        <section className="feature-card">
          <h2>Track Your Progress</h2>
          <p>Stay updated with your achievements and milestones.</p>
        </section>
      </main>
      
      {/* Footer section */}
      <footer className="home-footer">
        <p>&copy; 2024 DEV@DEAKIN. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default SecondHomePage; // Exporting the HomePage component
