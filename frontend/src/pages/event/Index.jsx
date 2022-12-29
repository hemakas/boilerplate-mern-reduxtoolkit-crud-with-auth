import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Col, Row, Container, Card, Button, Table } from 'react-bootstrap'
import { getEvents, reset } from '../../features/event/eventSlice'

import EventItem from '../../components/event/EventItem'
import Spinner from '../../components/Spinner'

function Index() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // get athentic user 
  const { user } = useSelector((state) => state.auth)

  // all events
  const { events, isLoading, isError, message } = useSelector((state) => state.event)

  useEffect(() => {
    // log error messages
    if (isError) {
      console.log(message)
    }

    // redirect if user not found
    if (!user) {
      navigate('/login')
    }

    // get all events from eventSlice
    dispatch(getEvents())

    // return () => {
    //   dispatch(reset())
    // }

  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Alert variant="success">
        <Row>
            <Col>
              <Alert.Heading>All Events</Alert.Heading>
            </Col>
            <Col className="justify-content-end">
              {/* <Button href="/event/create" >Create</Button> */}
            </Col>
        </Row>
      </Alert>

      <Container className='mb-3'>
        {events.length > 0 ? (
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Assignees</th>
                <th>GoogleId</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <EventItem key={index} index={index} event={event} />
              ))}
            </tbody>
          </Table>
        ) : (
          <h5>You have not events</h5>
        )}
      </Container>      
    </>
  )
}

export default Index