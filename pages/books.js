/********************************************************************************* 
*  WEB422 – Assignment 1 
* 
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
*  
*  Name: Aidan Ramos-Gonsalves Student ID: 033266149 Date: 09/29/2025 
* 
********************************************************************************/ 

import PageHeader from "@/components/PageHeader";
import useSWR from "swr";
import { useState, useEffect} from "react";
import { useRouter } from "next/router";
import { Pagination, Table } from "react-bootstrap";

export default function Books() {
  const [page, setPage] = useState(1)
  const [pageData, setPageData] = useState([])
  const router = useRouter()
  const query = router.query
  const queryString = new URLSearchParams(query).toString(); 
  const { data, error } = 
  useSWR(`https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`);

  useEffect(() => { 
    if (data) { 
    setPageData(data.docs); 
    } 
    }, [data]);

    function previous(){
      if (page > 1){
        setPage(page => page - 1)
      }
    }

    function next(){
      setPage(page => page + 1)
    }

  return (
    <>
      <PageHeader text="Search Results: " subtext={
        Object.entries(query).map(([key, value]) => (
          <span key={key} style={{ marginRight: '1rem'}}>
            <strong>{key}:</strong>{' '}
            <span style={{ fontWeight: 'normal' }}>{value}</span>
          </span>
        ))
      }/>

      <Table striped hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((book) => (
            <tr
              key={book.key}
              onClick={() => router.push(book.key)}  
              style={{ cursor: "pointer" }}          
            >
              <td>{book.title}</td>
              <td>{book.first_publish_year || "N/A"}</td>
            </tr>
          ))}
        </tbody>
     </Table>

     <Pagination>
            <Pagination.Prev onClick={previous} disabled={page === 1} />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next onClick={next} />
     </Pagination>
    </>
  );     
}
