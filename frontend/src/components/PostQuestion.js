import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'; // CodeMirror component for code editing
import ReactMarkdown from 'react-markdown'; // Component to render Markdown content as HTML
import 'codemirror/lib/codemirror.css'; // Import CodeMirror CSS for styling
import 'codemirror/theme/material.css'; // Import Material theme for CodeMirror
import 'codemirror/mode/javascript/javascript'; // Import JavaScript mode for syntax highlighting
import './PostQuestion.css'; // Import custom styles for the post editor

const PostQuestion = () => {
  // State to manage the code input, markdown content, and list of posts
  const [code, setCode] = useState(''); // State to store the code input
  const [markdownContent, setMarkdownContent] = useState(''); // State to store the markdown input
  const [posts, setPosts] = useState([]); // State to store the list of posts

  // Handle changes in the CodeMirror editor
  const handleEditorChange = (editor, data, value) => {
    setCode(value); // Update the code state with the current value from the editor
  };

  // Handle changes in the Markdown editor
  const handleMarkdownChange = (event) => {
    setMarkdownContent(event.target.value); // Update the markdown content state with the current textarea value
  };

  // Handle post submission
  const handlePostSubmit = () => {
    // Check if there's any code or markdown content to submit
    if (code || markdownContent) {
      const newPost = { code, markdownContent }; // Create a new post object with the current code and markdown content
      setPosts([newPost, ...posts]); // Add the new post to the top of the posts list
      setCode(''); // Clear the code editor after submission
      setMarkdownContent(''); // Clear the markdown editor after submission
    }
  };

  return (
    <>
      <div className="post-editor-container">
        <h1 className="editor-title">Create a New Post</h1>
        
        {/* Code Editor Section */}
        <div className="editor-section">
          <h2>Code Editor</h2>
          <CodeMirror
            value={code} // Bind the current code value to the CodeMirror editor
            options={{
              mode: 'javascript', // Set the syntax highlighting mode to JavaScript
              theme: 'material', // Use Material theme for the editor
              lineNumbers: true, // Show line numbers in the editor
            }}
            onBeforeChange={handleEditorChange} // Handle changes in the editor
          />
        </div>
        
        {/* Markdown Editor Section */}
        <div className="editor-section">
          <h2>Markdown Editor</h2>
          <textarea
            value={markdownContent} // Bind the current markdown content to the textarea
            onChange={handleMarkdownChange} // Handle changes in the textarea
            placeholder="Write your markdown content here..." // Placeholder for the textarea
          />
        </div>
        
        {/* Preview Section */}
        <div className="preview-section">
          <h2>Preview</h2>
          <ReactMarkdown>{markdownContent}</ReactMarkdown> {/* Render the markdown content as HTML */}
        </div>
        
        {/* Post Button */}
        <button onClick={handlePostSubmit}>Post</button> {/* Button to submit the post */}
        
        {/* Posts List */}
        <div className="posts-list">
          <h2>Posts</h2>
          {posts.length === 0 && <p>No posts yet. Create a post to get started!</p>} {/* Message when there are no posts */}
          {posts.map((post, index) => ( // Map through the posts array and render each post
            <div key={index} className="post-card"> {/* Unique key for each post */}
              <h3>Post {index + 1}</h3> {/* Display the post number */}
              <div className="post-code">
                <h4>Code:</h4>
                <CodeMirror
                  value={post.code} // Display the code from the post
                  options={{
                    mode: 'javascript', // Set the syntax highlighting mode to JavaScript
                    theme: 'material', // Use Material theme for the editor
                    lineNumbers: true, // Show line numbers in the editor
                    readOnly: true, // Make it read-only for display
                  }}
                />
              </div>
              <div className="post-markdown">
                <h4>Markdown:</h4>
                <ReactMarkdown>{post.markdownContent}</ReactMarkdown> {/* Render the markdown content from the post */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostQuestion; // Export the PostQuestion component
