import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";



export default function BookDetails({ book, workId, showFavouriteBtn = true }) {

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);
  
  async function favouritesClicked() {
    if (showAdded) {
      const updated = await removeFromFavourites(workId);
      setFavouritesList(updated);
    } else {
      const updated = await addToFavourites(workId);
      setFavouritesList(updated);
    }
  }
  
  
  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null; // Prevent infinite loop
              event.target.src =
                "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Cover Image"
          />
          <br />
          <br />

        </Col>

        <Col lg="8">
          <h3>{book.title}</h3>
          {book.description && ( 
            <p> 
              {typeof book.description === "string" ? book.description : book.description.value} 
            </p>
          )}
          <br />

          <h5>Characters</h5>
          <p>
            {book.subject_people?.length > 0
              ? book.subject_people.join(", ")
              : "No character data available."}
          </p>
          <br /><br />

          <h5>Settings</h5>
          <p>
            {book.subject_places?.length > 0
              ? book.subject_people.join(", ")
              : "No setting data available."}
          </p>
          <br /><br />

          <h5>More Information</h5>
          <p>
            {book.links?.length > 0 ? (
              book.links.map((link, index) => (
                <span key={index}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.title}
                  </a>
                  <br />
                </span>
              ))
            ) : (
              <span>No additional links available.</span>
            )}
          </p>

          {showFavouriteBtn && (
            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={favouritesClicked}
            >
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          )}

        </Col>
      </Row>
    </Container>
  );
}