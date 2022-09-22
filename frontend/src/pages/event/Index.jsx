import React from 'react'
import { Alert, Col, Row, Container, Card, Button } from 'react-bootstrap'
// import EventCreateForm from '../../components/event/EventCreateForm'

function Index() {
  return (
    <>
      <Alert variant="success">
        <Row>
            <Col>
                <Alert.Heading>All Events</Alert.Heading>
            </Col>
            <Col>
                <Button href="/event/create">Create</Button>
            </Col>  
        </Row>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 
          
          <Col xs={6}>
            <Card>
              <Card.Body>
                {/* <EventCreateForm /> */}
                Events list
              </Card.Body>
            </Card>
          </Col>

          <Col></Col> 
        </Row>
      </Container>      
    </>
  )
}

export default Index