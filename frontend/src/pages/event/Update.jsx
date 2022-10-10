import React from 'react'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import EventUpdateForm from '../../components/event/EventUpdateForm'

function Update() {

  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Update Event</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 

          <Col xs={6}>
            <Card>
              <Card.Body>
                <EventUpdateForm />
              </Card.Body>
            </Card>
          </Col>

          <Col></Col> 
        </Row>
      </Container>      
    </>
  )
}

export default Update