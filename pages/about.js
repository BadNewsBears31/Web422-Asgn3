import Link from "next/link"; 
import Card from "react-bootstrap/Card"; 
import BookDetails from "@/components/BookDetails"; 
import PageHeader from "@/components/PageHeader";

export default function About({ book }) {
    return (
      <>
        <PageHeader text="About the Developer: Aidan Ramos" />

        <Card className="text-center mx_auto">
          <Card.Body>
            <p>
              Hi, I&apos;m Aidan Ramos, a Seneca Computer Programming student currently in my last semester.
              We are currently learning about Next.js and React, and have been tasked with building this
              website in order to learn and test our skills.
            </p>
            <p>
              I find this stuff mildly confusing as there are so many terms and processes to memorize.
              But I&apos;m improving step by step.
            </p>
            <p>
              My absolute favourite book is <strong>{book.title}</strong>, written by J.R.R Tolkien.
              Below you can find out the details that have been fetched from the OpenLibrary Books API.
            </p>
          </Card.Body>
       </Card>

      <br />
      
      <BookDetails book={book} workId="OL27513W" showFavouriteBtn={false} />
      </>
    );     
  }

  export async function getStaticProps() {
      const res = await fetch('https://openlibrary.org/works/OL27513W.json' );
      const data = await res.json();

      return {
        props: {
          book: data
        },
      };
  }