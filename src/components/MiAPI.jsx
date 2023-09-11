import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import Buscador from "./Buscador";
import ResetButton from "./ResetButton";

const MiAPI = () => {
  // State variables to manage character data, filters, and pagination
  const [characters, setCharacters] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch characters when filterQuery or currentPage changes
    const fetchCharacters = async () => {
      try {
        // Make an API request to get characters based on the filter and current page
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${currentPage}${filterQuery}`
        );

        // Update the characters state with the response data
        setCharacters(response.data.results);

        // Update the total number of pages for pagination
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    // Trigger fetchCharacters when filterQuery or currentPage changes
    fetchCharacters();
  }, [filterQuery, currentPage]);

  // Handle applying a filter
  const handleFilter = (filter, value) => {
    let newFilterQuery = "";
    if (filter && value) {
      // Build a new filter query based on the selected filter and value
      newFilterQuery = `&${filter}=${value}`;
    }

    // Set the new filter query and reset to the first page
    setFilterQuery(newFilterQuery);
    setCurrentPage(1);
  };

  // Handle resetting filters and pagination
  const handleReset = () => {
    setFilterQuery("");
    setCurrentPage(1);
  };

  // Handle navigating to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle navigating to the previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container className="container">
      {/* Render the Buscador (filter) component */}
      <Buscador onFilter={handleFilter} />

      {/* Render the ResetButton component */}
      <ResetButton onReset={handleReset} />

      <div className="pagination">
        {/* Button to navigate to the previous page */}
        <Button
          className="filterBox"
          variant="secondary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          &#8249; Previous Page
        </Button>

        {/* Button to navigate to the next page */}
        <Button
          className="filterBox"
          variant="secondary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next Page &#8250;
        </Button>
      </div>

      <div className="card-container">
        {characters.length > 0 ? (
          <Row>
            {/* Map and render character cards */}
            {characters.map((character) => (
              <Col key={character.id} sm={6} md={4} lg={3}>
                <div className="card-wrapper">
                  <Card className="characterCard" style={{ height: "420px" }}>
                    <Card.Img variant="top" src={character.image} />
                    <Card.Body>
                      <Card.Title>{character.name}</Card.Title>
                      <Card.Text>
                        Species: {character.species} <br />
                        Status: {character.status} <br />
                        Origin: {character.origin.name}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          // Displayed when no results are found
          <p>No results found.</p>
        )}
      </div>
    </Container>
  );
};

export default MiAPI;
