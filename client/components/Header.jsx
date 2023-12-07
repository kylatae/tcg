import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



import { useAppCtx } from "../utils/AppProvider"

export default function Header() {
  const { user } = useAppCtx()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">HomePage</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {user?._id !== undefined && (
              <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                <Nav.Link class="dropdown-item" href="/private">Private Page</Nav.Link>
                <Nav.Link class="dropdown-item" href="/deckbuilder">Deck Builder</Nav.Link>
                <Nav.Link href="/logout">Logout</Nav.Link>


              </DropdownButton>

            )}


            {user?._id !== undefined ? (
              <Nav.Link href="/logout">Logout</Nav.Link>
            ) : (
              <Nav.Link href="/auth">Login</Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
