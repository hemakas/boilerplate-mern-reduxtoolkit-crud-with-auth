import { Alert, Button, Col, Form, InputGroup, Row, Card, Container } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'


function Register() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    level: ''
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

  const { firstName, lastName, email, password, password2, level } = formData
  
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
                    <Form.Group controlId="validationCustom01">
                      <Form.Label>First name</Form.Label>
                      <Form.Control id="firstName" name="firstName" vaue={firstName} onChange={onChange} required type="text" placeholder="John"/>
                    </Form.Group>
                  </Row>

                  {/* last name */}
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom02">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control id="lastName" name="lastName" vaue={lastName} onChange={onChange} required type="text" placeholder="Doe"/>
                    </Form.Group>
                  </Row>

                  {/* email */}
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom02">
                      <Form.Label>Email</Form.Label>
                      <Form.Control id="email" name="email" vaue={email} onChange={onChange} required type="text" placeholder="johndoe@example.com"/>
                    </Form.Group>
                  </Row>

                  {/* password */}
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom02">
                      <Form.Label>Password</Form.Label>
                      <Form.Control id="password" name="password" vaue={password} onChange={onChange} required type="password"/>
                    </Form.Group>
                  </Row>

                  {/* confirm password */}
                  <Row className="mb-3">
                    <Form.Group controlId="validationCustom02">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control id="password2" name="password2" vaue={password2} onChange={onChange} required type="password"/>
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