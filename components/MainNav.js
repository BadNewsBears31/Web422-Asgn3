import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const token = readToken();

  function logout() {
    removeToken();
    router.push('/login');
  }

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} href="/">Aidan Ramos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Always visible links */}
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/about">About</Nav.Link>
            </Nav>

            {/* Logged-in user dropdown */}
            {token && (
              <Nav>
                <NavDropdown title={token.userName} id="user-nav-dropdown">
                  <NavDropdown.Item as={Link} href="/favorites">
                    Favourites
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}

            {/* Register link for logged-out users */}
            {!token && (
              <Nav>
                <Nav.Link as={Link} href="/register">Register</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
