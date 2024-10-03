import React from 'react'; // Import React library
import { Menu, Button } from 'semantic-ui-react'; // Import Menu and Button components from Semantic UI
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Header1.css'; // Import custom styles for the header

const Header1 = () => {
  return (
    <Menu secondary fixed="top" className="main-header"> {/* Fixed top menu for navigation */}
      <Menu.Item>
        <Link to="/" className="logo"> {/* Link to the home page */}
          DEV@Deakin
        </Link>
      </Menu.Item>

      <Menu.Menu position="right"> {/* Align menu items to the right */}
        <Menu.Item>
          <Button as={Link} to="/login" className="header-btn" primary> {/* Button to navigate to the login page */}
            Login
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button as={Link} to="/post" className="header-btn" secondary> {/* Button to navigate to the post page */}
            Post
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button as={Link} to="/pricing" className="header-btn" secondary> {/* Button for the pricing plan page */}
            Pricing Plan
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button as={Link} to="/post-question" className="header-btn" secondary> {/* Button to post a question */}
            Post a Question
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button as={Link} to="/video-upload" className="header-btn" secondary> {/* Button to upload a video */}
            Upload Video
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button as={Link} to="/video-gallery" className="header-btn" secondary> {/* Button for the video gallery page */}
            Video Gallery
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button as={Link} to="/chatgpt" className="header-btn" secondary> {/* Button to access ChatGPT service */}
            ChatGPT Service
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button as={Link} to="/2FA" className="header-btn" secondary> {/* Button to enable two-factor authentication */}
            Enable 2FA
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header1; // Export the Header1 component for use in other parts of the application
