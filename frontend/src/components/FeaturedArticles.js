import React from 'react'; // Import React library for creating components
import { Card, Image } from 'semantic-ui-react'; // Import Card and Image components from Semantic UI
import { Link } from 'react-router-dom'; // Import Link for navigation between routes

const articles = [
  {
    title: "What is life", // Article title
    description: "A comprehensive guide.", // Article description
    image: "https://picsum.photos/300/200", // Image URL for the article
    link: "/articles/1" // Link to the article's detailed page
  },
  {
    title: "Life lessons", // Article title
    description: "Learnings.", // Article description
    image: "https://picsum.photos/300/200", // Image URL for the article
    link: "/articles/2" // Link to the article's detailed page
  },
  {
    title: "Tips for navigation", // Article title
    description: "Navigating through apps", // Article description
    image: "https://picsum.photos/300/200", // Image URL for the article
    link: "/articles/3" // Link to the article's detailed page
  }
];

const FeaturedArticles = () => {
  return (
    <>
      {articles.map((article, index) => ( // Map through the articles array to create a Card for each article
        <Card key={index} as={Link} to={article.link} className="article-card" style={{ margin: '1rem' }}>
          <Image src={article.image} wrapped ui={false} /> {/* Render article image */}
          <Card.Content>
            <Card.Header>{article.title}</Card.Header> {/* Render article title */}
            <Card.Description>{article.description}</Card.Description> {/* Render article description */}
          </Card.Content>
        </Card>
      ))}
    </>
  );
};

export default FeaturedArticles; // Export the FeaturedArticles component for use in other parts of the application
