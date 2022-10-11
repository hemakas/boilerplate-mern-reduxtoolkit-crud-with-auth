import React from 'react'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import UserUpdateForm from '../../components/user/UserUpdateForm'

function UserUpdate() {

  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Update User</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 

          <Col xs={6}>
            <Card>
              <Card.Body>
                <UserUpdateForm />
              </Card.Body>
            </Card>
          </Col>

          <Col></Col> 
        </Row>
      </Container>      
    </>
  )
}

export default UserUpdate