import { FaSignInAlt, FaSignOutAlt, FaUser, FaUserClock, FaAddressBook, FaCalendar } from 'react-icons/fa'
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
          <Navbar.Brand href="/">Calendar App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
            {user ? (
              <>
                <Nav.Link href="/events"><FaCalendar /> Events</Nav.Link>
                <Nav.Link href="/events/userEvents"><FaUserClock /> User Events</Nav.Link>
                <Nav.Link href="/users"><FaCalendar /> Users</Nav.Link>
                <button className='btn' onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>

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
