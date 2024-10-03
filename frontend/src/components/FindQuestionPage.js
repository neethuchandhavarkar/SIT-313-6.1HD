import React, { useEffect, useState } from 'react'; // Import necessary hooks from React
import { Container, Card, Input, Button, Form } from 'semantic-ui-react'; // Import UI components from Semantic UI
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Import Firestore database instance

const FindQuestionPage = () => {
  const [questions, setQuestions] = useState([]); // State to hold all questions fetched from Firestore
  const [search, setSearch] = useState(''); // State to hold the search input
  const [filteredQuestions, setFilteredQuestions] = useState([]); // State to hold filtered questions based on search input

  // Fetch questions from Firestore
  const fetchQuestions = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts')); // Get documents from the 'posts' collection
    const questionsData = querySnapshot.docs.map((doc) => ({ // Map documents to an array of questions
      id: doc.id, // Include the document ID
      ...doc.data(), // Spread the document data
    }));
    setQuestions(questionsData); // Set questions state
    setFilteredQuestions(questionsData); // Initialize filtered questions with all questions
  };

  // Filter questions based on search input
  useEffect(() => {
    if (search) {
      const filtered = questions.filter((q) => 
        q.title.toLowerCase().includes(search.toLowerCase()) // Filter questions that match the search term
      );
      setFilteredQuestions(filtered); // Update filtered questions state
    } else {
      setFilteredQuestions(questions); // If no search input, display all questions
    }
  }, [search, questions]); // Depend on search and questions state

  // Delete a question
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id)); // Delete the question document from Firestore
    fetchQuestions(); // Refresh the list after deletion
  };

  useEffect(() => {
    fetchQuestions(); // Fetch questions when the component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <Container>
      <h2>Find Questions</h2>

      {/* Search Input */}
      <Form>
        <Input
          placeholder="Search by title" // Placeholder text for the search input
          value={search} // Controlled input value
          onChange={(e) => setSearch(e.target.value)} // Update search state on input change
          fluid // Make the input fluid to take full width
        />
      </Form>

      {/* Question Cards */}
      <Card.Group>
        {filteredQuestions.map((question) => ( // Map over filtered questions to create cards
          <Card key={question.id}>
            <Card.Content>
              <Card.Header>{question.title}</Card.Header> {/* Display question title */}
              <Card.Description>{question.description}</Card.Description> {/* Display question description */}
              <Button icon="trash" color="red" onClick={() => handleDelete(question.id)} /> {/* Button to delete question */}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export default FindQuestionPage; // Export the FindQuestionPage component for use in other parts of the application
