import React from 'react'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import LoginForm from '../components/auth/LoginForm'

function Login() {
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Login</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 
          
          <Col xs={6}>
            <Card>
              <Card.Body>
                <LoginForm />
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