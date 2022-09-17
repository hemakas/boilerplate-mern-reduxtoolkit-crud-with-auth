import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap';


export const Header = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/login"><FaSignInAlt /> Login</Nav.Link>
              <Nav.Link href="/register"><FaUser /> Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}

export default Header
