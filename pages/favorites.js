import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import { Row, Col } from "react-bootstrap";
import dynamic from "next/dynamic";

const BookCard = dynamic(() => import("@/components/BookCard"), { ssr: false });

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  // Guard: wait until favouritesList is loaded
  if (!favouritesList) return null;

  return (
    <>
      {favouritesList.length > 0 ? (
        <>
          <PageHeader text="Favourites" subtext="Your Favourite Books" />
          <Row className="gy-4">
            {favouritesList.map((workId) => (
              <Col key={workId} lg={3} md={6}>
                <BookCard workId={workId} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <PageHeader text="Nothing Here" subtext="Add a book to your favourites!" />
        </>
      )}
    </>
  );
}
