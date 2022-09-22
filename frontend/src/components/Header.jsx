import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              
            {user ? (
                <>
                  <Nav.Link href="/events"><FaSignInAlt /> Events</Nav.Link>
                  
                  <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </>
            ) : (
              <>
                <Nav.Link href="/login"><FaSignInAlt /> Login</Nav.Link>
                <Nav.Link href="/register"><FaUser /> Register</Nav.Link>
              </>
            )}
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  )
}

export default Header
