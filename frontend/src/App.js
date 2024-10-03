import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HomePage from './components/MainHomePage'; // Import homepage
import Login from './components/LoginPage';
import SignUp from './components/SignUpPage';
import PostPage from './components/PostPage'; // Import PostPage for posting questions
import FindQuestionPage from './components/FindQuestionPage'; // Import FindQuestionPage
import PricingPlans from './components/PricingPlans'; // Import PricingPlans component
import PostQuestion from './components/PostQuestion'; // Import PostQuestion component
import SecondHomePage from './components/SecondHomePage'; // Import SecondHomePage
import UploadVideo from './components/VideoUpload';
import TutorialPage from './components/VideoGallery';
import ChatGPT from './components/ChatGPT'; // Import ChatGPT component
import TwoFactorAuth from './components/2FA'; // Import 2FA component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Landing page route */}
        <Route path="/home" element={<HomePage />} /> {/* Homepage route */}
        <Route path="/second-home" element={<SecondHomePage />} /> {/* Second HomePage route */}
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/signup" element={<SignUp />} /> {/* Sign Up route */}
        <Route path="/post" element={<PostPage />} /> {/* Post Page route for posting questions */}
        <Route path="/find-questions" element={<FindQuestionPage />} /> {/* Find Question Page route */}
        <Route path="/pricing" element={<PricingPlans />} /> {/* Pricing Plans route */}
        <Route path="/post-question" element={<PostQuestion />} /> {/* Post Question route */}
        <Route path="/video-upload" element={<UploadVideo />} />
        <Route path="/video-gallery" element={<TutorialPage />} />
        <Route path="/chatgpt" element={<ChatGPT />} /> {/* New route for ChatGPT service */}
        <Route path="/2fa" element={<TwoFactorAuth />} /> {/* 2FA route */}
      </Routes>
    </Router>
  );
};

export default App;
