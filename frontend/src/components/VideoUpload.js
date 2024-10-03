import React, { useState } from 'react'; // Importing React and useState hook
import { Container, Form, Button, Input, Message } from 'semantic-ui-react'; // Importing Semantic UI components
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Importing Firebase storage functions
import { storage, db } from '../firebase'; // Importing Firestore database and storage instance
import { addDoc, collection } from 'firebase/firestore'; // Importing Firestore document functions
import './VideoUpload.css'; // Importing custom styles

const VideoUpload = () => {
  const [video, setVideo] = useState(null); // State to hold selected video file
  const [title, setTitle] = useState(''); // State to hold video title
  const [error, setError] = useState(''); // State to hold error messages
  const [success, setSuccess] = useState(false); // State to indicate successful upload

  // Function to handle video file selection
  const handleVideoChange = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]); // Set the selected video file in state
    }
  };

  // Function to handle video upload
  const handleUpload = async () => {
    // Validate that video and title are provided
    if (!video || title === '') {
      setError('Please provide a title and select a video.'); // Set error message if validation fails
      return; // Exit function if validation fails
    }

    try {
      const videoRef = ref(storage, `videos/${video.name}`); // Create a reference to the video in Firebase storage
      const uploadTask = uploadBytesResumable(videoRef, video); // Start the upload task

      // Monitor the state of the upload
      uploadTask.on('state_changed', 
        null, // No callback for progress updates
        (err) => setError(err.message), // Handle any errors during upload
        async () => {
          const videoUrl = await getDownloadURL(videoRef); // Get the download URL after upload completes

          // Add video information to Firestore database
          await addDoc(collection(db, 'videos'), {
            title, // Title of the video
            videoUrl, // Download URL of the video
            views: 0, // Initialize views count to 0
            rating: 0, // Initialize rating to 0
            createdAt: new Date(), // Timestamp of upload
          });

          // Update UI state for successful upload
          setSuccess(true); // Set success flag
          setTitle(''); // Reset title input
          setVideo(null); // Reset video input
        }
      );
    } catch (err) {
      setError('Failed to upload the video. Please try again.'); // Handle any errors during the upload process
    }
  };

  return (
    <Container className="video-upload-container"> {/* Main container for the upload form */}
      <h2>Upload a Video</h2> {/* Title for the upload section */}
      <Form>
        <Form.Field>
          <label>Video Title</label>
          <Input
            placeholder="Enter the video title" // Placeholder for title input
            value={title} // Bind input value to title state
            onChange={(e) => setTitle(e.target.value)} // Update title state on change
          />
        </Form.Field>
        <Form.Field>
          <label>Upload Video</label>
          <Input type="file" accept="video/*" onChange={handleVideoChange} /> {/* File input for video selection */}
        </Form.Field>
        <Button primary onClick={handleUpload}>Upload</Button> {/* Button to trigger upload */}
        {error && <Message negative>{error}</Message>} {/* Display error message if any */}
        {success && <Message positive>Video uploaded successfully!</Message>} {/* Display success message */}
      </Form>
    </Container>
  );
};

export default VideoUpload; // Exporting VideoUpload component for use in other parts of the application
