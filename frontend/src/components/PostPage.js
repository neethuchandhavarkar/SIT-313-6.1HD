import React, { useState } from 'react'; // Importing React and useState hook
import { Container, Form, Button, Radio, Input, TextArea, Message } from 'semantic-ui-react'; // Importing components from Semantic UI
import { storage, db } from '../firebase'; // Firebase setup for storage and database
import { addDoc, collection, updateDoc } from 'firebase/firestore'; // Firestore methods for adding and updating documents
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Storage methods for uploading files and getting URLs
import './PostPage.css'; // Custom CSS for styles
import PostHeader from './PostHeader'; // Import the PostHeader component

const PostPage = () => {
  // State variables for managing post data and UI feedback
  const [postType, setPostType] = useState('question'); // 'question' or 'article'
  const [title, setTitle] = useState(''); // State for post title
  const [description, setDescription] = useState(''); // State for post description
  const [abstract, setAbstract] = useState(''); // New state for article abstract
  const [tags, setTags] = useState(''); // New state for tags
  const [image, setImage] = useState(null); // State for storing the selected image
  const [error, setError] = useState(''); // State for error messages
  const [success, setSuccess] = useState(false); // State for success messages

  // Handle image selection
  const handleImageChange = (e) => {
    if (e.target.files[0]) { // Check if a file is selected
      setImage(e.target.files[0]); // Update state with selected image file
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setError(''); // Reset error state
    setSuccess(false); // Reset success state

    // Validate input fields
    if (title === '' || description === '' || (postType === 'article' && abstract === '')) {
      setError('Title, description, and abstract (for articles) are required.'); // Set error message if validation fails
      return;
    }

    try {
      // Save the post to Firestore
      const postRef = await addDoc(collection(db, 'posts'), {
        title,
        description,
        abstract, // Include abstract for articles
        tags: tags.split(',').map(tag => tag.trim()), // Split tags into an array and trim whitespace
        postType,
        createdAt: new Date(), // Add creation timestamp
      });

      // If the post type is 'article' and an image is uploaded, save it to Firebase Storage
      if (postType === 'article' && image) {
        const imageRef = ref(storage, `posts/${postRef.id}/${image.name}`); // Reference for the image in storage
        await uploadBytes(imageRef, image); // Upload the image file
        const imageUrl = await getDownloadURL(imageRef); // Get the download URL of the uploaded image

        // Update the post document with the image URL
        await updateDoc(postRef, { imageUrl });
      }

      setSuccess(true); // Set success state to true
      // Reset input fields after successful submission
      setTitle('');
      setDescription('');
      setAbstract(''); // Reset abstract
      setTags(''); // Reset tags
      setImage(null); // Reset image
    } catch (error) {
      console.error('Error creating post:', error); // Log error to the console
      setError('Failed to create the post. Please try again.'); // Set error message
    }
  };

  return (
    <Container className="post-container"> {/* Main container for the post page */}
      <PostHeader /> {/* Add PostHeader component */}
      <h2>Create a New Post</h2>

      {/* Post Type Selection */}
      <Form>
        <Form.Field>
          <Radio
            label='Question'
            name='postType'
            value='question'
            checked={postType === 'question'} // Check if 'question' is selected
            onChange={() => setPostType('question')} // Update post type on selection
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Article'
            name='postType'
            value='article'
            checked={postType === 'article'} // Check if 'article' is selected
            onChange={() => setPostType('article')} // Update post type on selection
          />
        </Form.Field>

        {/* Conditionally render fields based on post type */}
        {postType === 'question' ? (
          <>
            <Form.Field>
              <label>Question Title</label>
              <Input
                placeholder='Enter the question title' // Placeholder for question title input
                value={title} // Bind value to title state
                onChange={(e) => setTitle(e.target.value)} // Update title state on change
              />
            </Form.Field>
            <Form.Field>
              <label>Question Description</label>
              <TextArea
                placeholder='Enter the question details' // Placeholder for question description
                value={description} // Bind value to description state
                onChange={(e) => setDescription(e.target.value)} // Update description state on change
              />
            </Form.Field>
            <Form.Field>
              <label>Tags</label>
              <Input
                placeholder='Enter tags' // Placeholder for tags input
                value={tags} // Bind value to tags state
                onChange={(e) => setTags(e.target.value)} // Update tags state on change
              />
            </Form.Field>
          </>
        ) : (
          <>
            <Form.Field>
              <label>Article Title</label>
              <Input
                placeholder='Enter the article title' // Placeholder for article title input
                value={title} // Bind value to title state
                onChange={(e) => setTitle(e.target.value)} // Update title state on change
              />
            </Form.Field>
            <Form.Field>
              <label>Article Description</label>
              <TextArea
                placeholder='Enter the article content' // Placeholder for article description
                value={description} // Bind value to description state
                onChange={(e) => setDescription(e.target.value)} // Update description state on change
              />
            </Form.Field>
            <Form.Field>
              <label>Abstract</label>
              <TextArea
                placeholder='Enter the article abstract' // Placeholder for article abstract input
                value={abstract} // Bind value to abstract state
                onChange={(e) => setAbstract(e.target.value)} // Update abstract state on change
              />
            </Form.Field>
            <Form.Field>
              <label>Tags</label>
              <Input
                placeholder='Enter tags' // Placeholder for tags input
                value={tags} // Bind value to tags state
                onChange={(e) => setTags(e.target.value)} // Update tags state on change
              />
            </Form.Field>
            {/* Image Upload for Article only */}
            <Form.Field>
              <label>Upload Image </label>
              <Input type='file' accept="image/*" onChange={handleImageChange} /> {/* File input for image selection */}
            </Form.Field>
          </>
        )}

        <Button primary onClick={handleSubmit}>Post</Button> {/* Button to submit the form */}
        {error && <Message negative>{error}</Message>} {/* Display error message if exists */}
        {success && <Message positive>Post created successfully!</Message>} {/* Display success message */}
      </Form>
    </Container>
  );
};

export default PostPage; // Exporting the PostPage component
