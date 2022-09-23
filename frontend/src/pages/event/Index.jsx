import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Col, Row, Container, Card, Button } from 'react-bootstrap'
// import EventCreateForm from '../../components/event/EventCreateForm'

function Index() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  // redirect if user not found
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

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