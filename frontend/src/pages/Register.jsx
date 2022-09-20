import { Alert, Button, Col, Form, InputGroup, Row, Card, Container } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    level: ''
  })

  const { firstName, lastName, email, password, password2, level } = formData 

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      toast.error('Please resolve errors')
    }

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const name = firstName + ' ' + lastName
      
      const userData = {
        name,
        email,
        password,
        level
      }

      dispatch(register(userData))
    }

    setValidated(true)

  }

  if (isLoading) {
    return <Spinner />
  }
  
  return (
    <>
      <Alert variant="success" className='mt-3'>
        <Alert.Heading>Register</Alert.Heading>
      </Alert>

      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Card>
              <Card.Header className="text-center"><h3 className='center'><FaUserAlt /> Register User</h3></Card.Header>
              
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  
                  {/* first name */}
                  <Row className="mb-3">
                    <Form.Group controlId="firstNameValidation">
                      <Form.Label>First name</Form.Label>
                      <Form.Control name="firstName" vaue={firstName} onChange={onChange} required type="text" placeholder="John"/>
                    </Form.Group>
                  </Row>

                  {/* last name */}
                  <Row className="mb-3">
                    <Form.Group controlId="lastNameValidation">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control name="lastName" vaue={lastName} onChange={onChange} required type="text" placeholder="Doe"/>
                    </Form.Group>
                  </Row>

                  {/* email */}
                  <Row className="mb-3">
                    <Form.Group controlId="emailValidation">
                      <Form.Label>Email</Form.Label>
                      <Form.Control name="email" vaue={email} onChange={onChange} required type="text" placeholder="johndoe@example.com"/>
                    </Form.Group>
                  </Row>

                  {/* password */}
                  <Row className="mb-3">
                    <Form.Group controlId="passwordValidation">
                      <Form.Label>Password</Form.Label>
                      <Form.Control name="password" vaue={password} onChange={onChange} required type="password"/>
                    </Form.Group>
                  </Row>

                  {/* confirm password */}
                  <Row className="mb-3">
                    <Form.Group controlId="password2Validation">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control name="password2" vaue={password2} onChange={onChange} required type="password"/>
                    </Form.Group>
                  </Row>

                  {/* register button */}
                  <Button type="submit">Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>  
      </Container>
    </>
  )
}

export default Register