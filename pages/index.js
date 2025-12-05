/********************************************************************************* 
*  WEB422 – Assignment 3 
* 
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
*  
*  Name: Aidan Ramos-Gonsalves Student ID: 033266149 Date: 05/12/2025
* 
*  Vercel App (Deployed) Link: _____________________________________________________ 
* 
********************************************************************************/  



import PageHeader from "@/components/PageHeader";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useRouter } from "next/router";



export default function Home() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();

    function onSubmit(data) {
        router.push({
            pathname: '/books',
            query: Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== ''))
        });
    }

    // Dropdown of years to published year
    const startYear = 1600
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - startYear + 1}, (_, i) => currentYear - i);

    return(
        <>
            <PageHeader text='Search Books Here' subtext='Find your favorite books on OpenLibrary.org, by completing the form below'/>

            <Form onSubmit={handleSubmit(onSubmit)}>

                <Row>
                    <Col xs={12}>
                    <Form.Group controlId="formAuthor" className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter author"
                        isInvalid={!!errors.author}
                        {...register("author", { required: "Author is required" })}
                        />
                        <Form.Control.Feedback type="invalid">
                        {errors.author?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col lg={6}>
                    <Form.Group controlId="formTitle" className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter title"
                        {...register("title")}
                        />
                    </Form.Group>
                    </Col>

                    <Col lg={6}>
                    <Form.Group controlId="formSubject" className="mb-3">
                        <Form.Label>Subject (contains)</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter subject keyword"
                        {...register("subject")}
                        />
                    </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col lg={6}>
                    <Form.Group controlId="formLanguage" className="mb-3">
                        <Form.Label>Language Code</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Enter language code (e.g. eng)"
                        maxLength="3"
                        {...register("language")}
                        />
                    </Form.Group>
                    </Col>

                    <Col lg={6}>
                    <Form.Group controlId="first_publish_year" className="mb-3">
                        <Form.Label>First Published (Year)</Form.Label>
                        <Form.Select
                        {...register("first_publish_year")}
                        className=""
                        defaultValue=""
                        >
                        <option value="">Select year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                            {year}
                            </option>
                        ))}
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={12}>
                    <Button variant="primary" type="submit" className="w-100 py-3 fs-5">
                        Search
                    </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}