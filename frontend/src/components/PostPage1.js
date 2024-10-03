import React, { useState } from 'react';
import { Container, Form, Button, TextArea, Message } from 'semantic-ui-react';
import chatgptService from './chatgptService'; // Import the service for ChatGPT interaction

const PostPage1 = () => {
  // State hooks to manage post content, response from ChatGPT, loading state, and error messages
  const [postContent, setPostContent] = useState(''); // Content of the post or bug description
  const [response, setResponse] = useState(''); // Response from ChatGPT
  const [loading, setLoading] = useState(false); // Indicates if the request is in progress
  const [error, setError] = useState(''); // Stores any error messages

  // Handle changes in the post content input field
  const handlePostChange = (e) => {
    setPostContent(e.target.value); // Update the state with the current input value
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Check if the post content is empty
    if (postContent.trim() === '') {
      setError('Please enter a message or bug description.'); // Set error if input is empty
      return; // Exit the function if input is invalid
    }

    setLoading(true); // Set loading state to true when the request starts
    setError(''); // Clear any previous error messages
    setResponse(''); // Clear any previous responses

    try {
      // Call the chatgptService with the post content and await the response
      const chatResponse = await chatgptService(postContent);
      setResponse(chatResponse); // Update the response state with the received response
    } catch (err) {
      setError('Error fetching response from ChatGPT.'); // Set error message if there's a problem with the request
    } finally {
      setLoading(false); // Reset loading state once the request is complete
    }
  };

  return (
    <Container className="post-page-container">
      <h2>Post Your Bug or Question</h2>
      <Form>
        <TextArea
          placeholder="Describe your issue or ask a question..." // Placeholder text for the input area
          value={postContent} // Bind the value to the postContent state
          onChange={handlePostChange} // Handle changes to the textarea
        />
        <Button primary onClick={handleSubmit} loading={loading} disabled={loading}>
          Submit {/* Button to submit the post */}
        </Button>
        {error && <Message negative>{error}</Message>} {/* Display error message if exists */}
        {response && <Message positive>{response}</Message>} {/* Display response message if exists */}
      </Form>
    </Container>
  );
};

export default PostPage1; // Export the PostPage1 component
