// src/components/PostHeader.js
import React from 'react'; // Importing React library
import { Link } from 'react-router-dom'; // Importing Link component for navigation
import { Menu } from 'semantic-ui-react'; // Importing Menu component from Semantic UI for layout

const PostHeader = () => { // Defining the PostHeader functional component
  return (
    <Menu> {/* Semantic UI Menu component to create a navigation menu */}
      <Menu.Item header> {/* Header item for the menu */}
        Create a Post {/* Title for the menu */}
      </Menu.Item>
      <Menu.Item as={Link} to="/find-questions"> {/* Link to find questions page */}
        Find Questions
      </Menu.Item>
      <Menu.Item as={Link} to="/home"> {/* Link to home page */}
        Home
      </Menu.Item>
    </Menu>
  );
};

export default PostHeader; // Exporting the PostHeader component for use in other parts of the application
