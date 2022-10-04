import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Col, Row, Container, Card, Button, Table } from 'react-bootstrap'
import { getUserEvents, reset } from '../../features/event/eventSlice'

import UserEventItem from '../../components/event/UserEventItem'
import Spinner from '../../components/Spinner'

function IndexUser() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // get athentic user 
  const { user } = useSelector((state) => state.auth)

  // events by user id
  const { userEvents, isLoading, isError, message } = useSelector(
    (state) => state.userEvents
  )

  useEffect(() => {
    // log error messages
    if (isError) {
      console.log(message)
    }

    // redirect if user not found
    if (!user) {
      navigate('/login')
    }

    // get events by user id
    dispatch(getUserEvents(user._id))

    return () => {
      dispatch(reset())
    }

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
          <Col>
            <Button href="/event/create">Create</Button>
          </Col>  
        </Row>
      </Alert>

      <Container className='mb-3'>
        {userEvents.length > 0 ? (
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
              {userEvents.map((userEvent, index) => (
                <UserEventItem key={index} userEvent={userEvent} />
              ))}
            </tbody>
          </Table>
        ) : (
          <h5>You have not set any events</h5>
        )}
      </Container>      
    </>
  )
}

export default IndexUser