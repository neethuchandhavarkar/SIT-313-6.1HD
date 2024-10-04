import React, { useState } from 'react';  // Import React and the useState hook
import chatgptService from './chatgptService'; // Import the ChatGPT service function to handle requests
import './ChatGPT.css'; // Import the CSS for styling the ChatGPT component

// Define the ChatGPT functional component
const ChatGPT = () => {
  // State hooks to manage component state
  const [inputMessage, setInputMessage] = useState(''); // State for user input message
  const [responses, setResponses] = useState([]); // State to hold responses from ChatGPT
  const [loading, setLoading] = useState(false); // State to indicate loading status during API calls
  const [error, setError] = useState(null); // State to hold any error messages

  // Function to handle input change in the text field
  const handleInputChange = (event) => {
    setInputMessage(event.target.value); // Update the input message state with user input
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading to true to indicate that a request is in progress
    setError(null); // Reset error state to ensure previous errors are cleared
    // Add the user's message to the responses state for display
    setResponses((prevResponses) => [
      ...prevResponses,
      { role: 'user', content: inputMessage },
    ]);

    try {
      // Call the ChatGPT service with the input message and await the response
      const response = await chatgptService(inputMessage);
      // Add the ChatGPT response to the responses state
      setResponses((prevResponses) => [
        ...prevResponses,
        { role: 'assistant', content: response }, // Store the assistant's response
      ]);
    } catch (err) {
      // Handle errors from the ChatGPT service call
      setError('Sorry, there was an error communicating with ChatGPT.'); // Set error message
      console.error('ChatGPT Error:', err); // Log the error for debugging
    } finally {
      setInputMessage(''); // Clear the input message field after submission
      setLoading(false); // Reset loading state
    }
  };

  // Render the component
  return (
    <div className="chat-container"> 
      <h2 className="chat-header">ChatGPT Service</h2>  
      {error && <div className="error-message">{error}</div>} {/* Display error message if exists */}
      <div className="messages-container"> 
        {responses.map((msg, index) => (  // Map through responses to render each message
          <div key={index} className={`message ${msg.role}`}> 
            <strong>{msg.role === 'user' ? 'You' : 'ChatGPT'}:</strong> {msg.content} {/* Display message content */}
          </div>
        ))}
      </div>
      <form className="input-form" onSubmit={handleSubmit}>  
        <input
          type="text"
          value={inputMessage}  // Bind input value to inputMessage state
          onChange={handleInputChange}  // Update inputMessage state on input change
          placeholder="Type your message..."  // Placeholder text in the input field
          className="chat-input"  // CSS class for styling
        />
        <button type="submit" className="send-button" disabled={loading}>  
          {loading ? 'Sending...' : 'Send'}  
        </button>
      </form>
    </div>
  );
};

// Export the ChatGPT component for use in other parts of the application
export default ChatGPT;
