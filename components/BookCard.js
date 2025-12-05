import useSWR from "swr";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import Error from "next/error";


export default function BookCard( {workId} ) {
    const fetcher = url => fetch(url).then(res => res.json());
    const {data, error} = useSWR(workId ? `https://openlibrary.org/works/${workId}.json` : null, fetcher);

  
    
    if(error || !data) {
        return <Error statusCode={404}/>
    }


    return (
        <Card>
            <Card.Img 
            variant="top"
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
            alt="Cover Image"
            onError={(event) => {
                event.target.onerror = null; 

                event.target.src =
                  "https://placehold.co/400x600?text=Cover+Not+Available";
              }}
            />
            <Card.Body>
                <Card.Title>{data.title || ""}</Card.Title>
                <Card.Text>{data.first_publish_date || "N/A"}</Card.Text>
                <Link href={`/works/${workId}`}>View Details</Link>
            </Card.Body>

        </Card>
    )
}