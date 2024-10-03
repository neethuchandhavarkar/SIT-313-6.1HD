import axios from 'axios';  // Import Axios for making HTTP requests

// Directly assign the API key (ensure to keep this secure and not expose it in public repositories)
const API_KEY = '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';

// Define the chatgptService function to interact with the OpenAI API
const chatgptService = async (message) => {
  try {
    // Make a POST request to the OpenAI API for chat completions
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo", // Specify the model to use (can also use "gpt-4")
        messages: [  // Construct the messages array for the chat
          { role: "system", content: "You are a helpful assistant." }, // System message to set assistant behavior
          { role: "user", content: message }, // User message containing input from the user
        ],
      },
      {
        headers: {  // Set headers for the request
          Authorization: `Bearer ${API_KEY}`,  // Inject API key for authentication
          'Content-Type': 'application/json',  // Specify content type
        },
      }
    );

    // Return the content of the assistant's response from the API
    return response.data.choices[0].message.content;
  } catch (error) {
    // Handle any errors that occur during the API call
    return 'Sorry, something went wrong. Please try again later.'; // Return a fallback error message
  }
};

// Export the chatgptService function for use in other parts of the application
export default chatgptService;
