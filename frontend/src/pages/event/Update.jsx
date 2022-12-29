import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import EventUpdateForm from '../../components/event/EventUpdateForm'
import { getEventById } from '../../features/event/eventSlice'
import Spinner from '../../components/Spinner'

function Update() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { eventId } = useParams()
  const { event } = useSelector((state) => state.event)

  console.log('event id .... ' + eventId)

  useEffect(() => {
    if (!user) {
      navigate('/')
    }

    dispatch(getEventById(eventId))

  }, [user, navigate, eventId, dispatch])


  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Update Event</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 

          <Col xs={6}>

          { event ? (
            
            <Card>
              <Card.Body>
                <EventUpdateForm event={event} />
              </Card.Body>
            </Card>

          ) : (
            <Spinner />
          )}

          </Col>

          <Col></Col> 
        </Row>
      </Container>      
    </>
  )
}

export default Update