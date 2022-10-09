import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import EventUpdateForm from '../../components/event/EventUpdateForm'

import { getEventById } from '../../features/event/eventSlice'

function Update() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { id } = useParams()

  // events by user id
  const { event } = useSelector((state) => state.event)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    dispatch(getEventById(id))

  }, [user, navigate, dispatch])
  
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
                <EventUpdateForm event={event} />
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