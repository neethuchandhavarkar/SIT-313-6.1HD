// components/HomePage.js
import React from 'react';
import { Container, Header, Grid } from 'semantic-ui-react';
import Header1 from './Header1';  // Importing the fixed header component
import FeaturedArticles from './FeaturedArticles';  // Importing the component for featured articles
import Tutorials from './Tutorials';  // Importing the component for tutorials
import './MainHomePage.css'; // Custom CSS for styling the homepage

const HomePage = () => {
  return (
    <div className="homepage">  {/* Main container for the homepage */}
      {/* Fixed Header */}
      <Header1 />  {/* Rendering the fixed header component */}

      {/* Main Content */}
      <div className="main-content">  {/* Container for the main content */}
        <Container textAlign="center" className="homepage-header">
          <Header as="h1" className="homepage-title">  {/* Main title of the homepage */}
            Welcome to DEV@Deakin
          </Header>
          <p className="homepage-description">  {/* Description of the platform */}
            Explore the latest articles, tutorials, and more. Learn, share, and collaborate with developers.
          </p>
        </Container>

        {/* Featured Articles Section */}
        <Container className="section">  {/* Container for the featured articles section */}
          <Header as="h2" className="section-title">  {/* Section title */}
            Featured Articles
          </Header>
          <Grid columns={3} doubling stackable padded>  {/* Grid layout for featured articles */}
            <FeaturedArticles />  {/* Rendering the FeaturedArticles component */}
          </Grid>
        </Container>

        {/* Tutorials Section */}
        <Container className="section">  {/* Container for the tutorials section */}
          <Header as="h2" className="section-title">  {/* Section title */}
            Latest Tutorials
          </Header>
          <Grid columns={3} doubling stackable padded>  {/* Grid layout for tutorials */}
            <Tutorials />  {/* Rendering the Tutorials component */}
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;  // Exporting the HomePage component for use in other parts of the application
