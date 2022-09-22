import React from 'react'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import EventCreateForm from '../../components/event/EventCreateForm'

function Create() {
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Create Event</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 
          
          <Col xs={6}>
            <Card>
              <Card.Body>
                <EventCreateForm />
              </Card.Body>
            </Card>
          </Col>

          <Col></Col> 
        </Row>
      </Container>      
    </>
  )
}

export default Create