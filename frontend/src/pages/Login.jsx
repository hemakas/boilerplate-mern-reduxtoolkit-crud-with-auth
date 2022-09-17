import { Alert, Button, Col, Form, InputGroup, Row, Card, Container } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'


function Login() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

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
    }

    setValidated(true);
  };

  const { email, password } = formData
  
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
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  
                  {/* email */}
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom02">
                      <Form.Label>Email</Form.Label>
                      <Form.Control id="email" name="email" vaue={email} onChange={onChange} required type="text" />
                    </Form.Group>
                  </Row>

                  {/* password */}
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom02">
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