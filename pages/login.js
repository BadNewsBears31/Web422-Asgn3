import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store"; 
import { authenticateUser } from "@/lib/authenticate";
import { getFavorites } from "@/lib/userData"; 
import { Card, Form, Button, Alert } from "react-bootstrap";

export default function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [favoritesList, setFavoritesList] = useAtom(favouritesAtom);
  const router = useRouter();

  async function updateAtom() {
    const data = await getFavorites();
    setFavoritesList(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    try {
      const ok = await authenticateUser(userName, password);
      if (ok) {
        await updateAtom();
        router.push("/"); 
      }
    } catch (err) {
      setErrorMsg(err.message || "Login failed");
    }
  }


  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Login</h2>
          Enter your login information below:
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">
          Login
        </Button>
      </Form>

      {/* Step 5: Error alert */}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
    </>
  );
}
