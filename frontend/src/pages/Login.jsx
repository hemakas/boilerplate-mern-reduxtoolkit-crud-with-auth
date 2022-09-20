import { Alert, Button, Col, Form, InputGroup, Row, Card, Container } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


function Login() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData  

  const navigate = useNavigate()
  const dispatch = useDispatch()

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

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Alert variant="success" className='mt-3'>
        <Alert.Heading>Login</Alert.Heading>
      </Alert>

      <Container>
        <Row>
          <Col></Col> 
          <Col>
            <Card>
            <Card.Header className="text-center"><h3 className='center'><FaSignInAlt /> Login</h3></Card.Header>
              
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={onSubmit }>
                  
                  {/* email */}
                  <Row className="mb-3">
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control id="email" name="email" vaue={email} onChange={onChange} required type="text" />
                    </Form.Group>
                  </Row>

                  {/* password */}
                  <Row className="mb-3">
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control id="password" name="password" vaue={password} onChange={onChange} required type="password"/>
                    </Form.Group>
                  </Row>

                  {/* login button   */}
                  <Button type="submit">Login</Button>
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

export default Login