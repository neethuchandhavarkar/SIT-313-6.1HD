import React, { useState, useEffect } from 'react'; // Importing React and hooks
import { Container, Card, Button, Icon, Rating } from 'semantic-ui-react'; // Importing Semantic UI components
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore'; // Importing Firestore functions
import { db } from '../firebase'; // Importing Firestore database instance
import './VideoGallery.css'; // Importing custom styles

const VideoGallery = () => {
  const [videos, setVideos] = useState([]); // State to hold video data
  const [rating, setRating] = useState({}); // State to store rating for each video

  useEffect(() => {
    const videoCollection = collection(db, 'videos'); // Reference to the videos collection in Firestore

    // Use onSnapshot to listen for real-time updates from Firestore
    const unsubscribe = onSnapshot(videoCollection, (snapshot) => {
      // Update videos state with new data from Firestore
      setVideos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle video play and update views
  const handlePlay = async (id, views) => {
    const videoRef = doc(db, 'videos', id); // Reference to the specific video document
    try {
      // Update the views count in Firestore
      await updateDoc(videoRef, { views: views + 1 });
    } catch (error) {
      console.error('Error updating video views:', error); // Log any errors
    }
  };

  // Function to handle video rating
  const handleRating = async (id, ratingValue) => {
    const videoRef = doc(db, 'videos', id); // Reference to the specific video document
    const video = videos.find((video) => video.id === id); // Find the video in the current state

    // Calculate new rating sum and total ratings
    const newRatingSum = video.rating.ratingSum + ratingValue;
    const newTotalRatings = video.rating.totalRatings + 1;

    try {
      // Update the rating in Firestore
      await updateDoc(videoRef, {
        rating: {
          ratingSum: newRatingSum,
          totalRatings: newTotalRatings,
        },
      });
      // Update local rating state
      setRating({ ...rating, [id]: ratingValue });
    } catch (error) {
      console.error('Error updating video rating:', error); // Log any errors
    }
  };

  return (
    <Container className="video-gallery-container"> {/* Main container for the gallery */}
      <h2>Video Gallery</h2> {/* Title for the video gallery */}
      <Card.Group itemsPerRow={3}> {/* Grouping cards for the videos */}
        {videos.map((video) => ( // Mapping over the videos array to create a card for each video
          <Card key={video.id}>
            <video
              width="100%"
              height="200px"
              controls // Video controls for play/pause
              controlsList="nodownload" // Prevent download option
              onPlay={() => handlePlay(video.id, video.views)} // Update views on play
              onError={(e) => console.error('Video load error:', e)} // Log video load errors
            >
              <source src={video.videoUrl} type="video/mp4" /> {/* Video source */}
              Your browser does not support the video tag. {/* Fallback message */}
            </video>
            <Card.Content>
              <Card.Header>{video.title}</Card.Header> {/* Display video title */}
              <Card.Meta>Views: {video.views}</Card.Meta> {/* Display view count */}
              <Card.Description>
                Rating:{' '}
                {video.rating && video.rating.ratingSum && video.rating.totalRatings
                  ? (video.rating.ratingSum / video.rating.totalRatings).toFixed(1) // Calculate and display average rating
                  : 'No ratings yet'} {/* Fallback message if no ratings available */}
              </Card.Description>
              <Rating
                icon='star'
                maxRating={5} // Maximum rating
                onRate={(e, { rating }) => handleRating(video.id, rating)} // Handle rating selection
                rating={rating[video.id] || 0} // Get the rating for this video
              />
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default VideoGallery; // Exporting VideoGallery component for use in other parts of the application
