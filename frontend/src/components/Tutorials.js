import React from 'react';
import { Card, Image } from 'semantic-ui-react'; // Importing UI components from Semantic UI React
import { Link } from 'react-router-dom'; // Importing Link component for navigation

// Array containing tutorial data with title, description, image, and link
const tutorials = [
  {
    title: "React Components Tutorial",
    description: "Learn to create modular components in React.",
    image: "https://picsum.photos/300/200", // Placeholder image URL
    link: "/tutorials/1" // Link to the tutorial
  },
  {
    title: "Working with APIs in React",
    description: "Fetching and handling data in React.",
    image: "https://picsum.photos/300/200", // Placeholder image URL
    link: "/tutorials/2" // Link to the tutorial
  },
  {
    title: "State Management in React",
    description: "A deep dive into state and context in React.",
    image: "https://picsum.photos/300/200", // Placeholder image URL
    link: "/tutorials/3" // Link to the tutorial
  }
];

const Tutorials = () => {
  return (
    <>
      {/* Mapping over the tutorials array to create a Card for each tutorial */}
      {tutorials.map((tutorial, index) => (
        // Card component linking to the tutorial page
        <Card key={index} as={Link} to={tutorial.link} className="tutorial-card" style={{ margin: '1rem' }}>
          <Image src={tutorial.image} wrapped ui={false} /> {/* Displaying tutorial image */}
          <Card.Content>
            <Card.Header>{tutorial.title}</Card.Header> {/* Displaying tutorial title */}
            <Card.Description>{tutorial.description}</Card.Description> {/* Displaying tutorial description */}
          </Card.Content>
        </Card>
      ))}
    </>
  );
};

export default Tutorials; // Exporting Tutorials component for use in other parts of the application
