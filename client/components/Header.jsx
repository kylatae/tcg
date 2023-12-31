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
      <img src={'./img/Dwarf.png'} className={"funCharaDwarf"}/>
      <img src={'./img/Elf.png'} className={"funCharaElf"}/>
      <img src={'./img/Human.png'} className={"funCharaHuman"}/>
      <Container className="justify-content-between">
        <Nav.Link  href="/rules">Rules Page</Nav.Link>
        
        
        <Navbar.Brand href="/">Warlords of Ravagea</Navbar.Brand>

          <Nav className="me-center">

            {user?._id !== undefined && (
              <DropdownButton variant="secondary" title="Main Menu">
                <Dropdown.Item href="/viewcards">View Cards</Dropdown.Item>
                <Dropdown.Item href="/cardshop">Card Shop</Dropdown.Item>
                <Dropdown.Item className="dropdown-item" href="/deckbuilder">Deck Builder</Dropdown.Item>
                <Dropdown.Item className="dropdown-item">-----------------</Dropdown.Item>
                <Dropdown.Item className="dropdown-item" href="/gameboard">Start Game</Dropdown.Item>
                <Dropdown.Item className="dropdown-item">-----------------</Dropdown.Item>
                <Dropdown.Item className="dropdown-item" href="/logout">Logout</Dropdown.Item>

              </DropdownButton>

            )}


            {user?._id === undefined && <Nav.Link href="/auth">Login</Nav.Link>}

          </Nav>
      </Container>
    </Navbar>
  );
}
