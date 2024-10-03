// components/LandingPage.js
import React from 'react'; // Import React library
import { Button, Container, Header } from 'semantic-ui-react'; // Import necessary Semantic UI components
import { Link } from 'react-router-dom'; // Import Link for navigation
import './LandingPage.css'; // Import custom CSS for the landing page

const LandingPage = () => {
  return (
    <div className="landing-page"> {/* Main container for the landing page */}
      <div className="hero-content"> {/* Section for hero content */}
        <Container text textAlign="center"> {/* Centered text container */}
          <Header as="h1" className="landing-title"> {/* Main header for the landing page */}
            Welcome to DEV@Deakin
          </Header>
          <p className="landing-subtitle"> {/* Subtitle under the main header */}
            Your platform to connect, collaborate, and learn with developers around the world.
          </p>
          <Button primary as={Link} to="/home" size="huge" className="get-started-btn"> {/* Button to navigate to home */}
            Get Started
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage; // Export the LandingPage component for use in other parts of the application
