import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import EventCreateForm from '../../components/event/EventCreateForm'
import EventCreateForm2 from '../../components/event/EventCreateForm2'

function Create() {
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
        <Alert.Heading>Create Event</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 
          
          <Col xs={6}>
            <Card>
              <Card.Body>
                <EventCreateForm2 />
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