import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';




import { useAppCtx } from "../utils/AppProvider"

export default function Header() {
  const { user } = useAppCtx()

  return (
    <Navbar className="bg-body-tertiary navBarHeader" >
      <Container className="justify-content-between">
        <Nav.Link  href="/rules">Rules Page</Nav.Link>
        <Navbar.Brand href="/">Warlords of Traetoria</Navbar.Brand>

          <Nav className="me-center">

            {user?._id !== undefined && (
              <DropdownButton variant="secondary" title="Main Menu">
                <Dropdown.Item href="/viewcards">View Cards</Dropdown.Item>
                <Dropdown.Item href="/cardshop">Card Shop</Dropdown.Item>
                <Dropdown.Item className="dropdown-item" href="/deckbuilder">Deck Builder</Dropdown.Item>
                <Dropdown.Item className="dropdown-item" href="/logout">Logout</Dropdown.Item>
              </DropdownButton>

            )}


            {user?._id === undefined && <Nav.Link href="/auth">Login</Nav.Link>}

          </Nav>
      </Container>
    </Navbar>
  );
}
