import React from 'react'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import RegisterForm from '../components/auth/RegisterForm'

function Register() {
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Create New User</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 
          
          <Col xs={6}>
            <Card>
              <Card.Body>
                <RegisterForm />
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