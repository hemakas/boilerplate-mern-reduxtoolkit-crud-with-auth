import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Col, Row, Container, Card, Button, Table } from 'react-bootstrap'
import { getAllUsers, reset } from '../../features/auth/authSlice'

import UserItem from '../../components/user/UserItem'
import Spinner from '../../components/Spinner'

function UserIndex() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const { users, isLoading, isError, message } = useSelector((state) => state.auth)

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
    dispatch(getAllUsers())

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
              <Alert.Heading>All Users</Alert.Heading>
            </Col>
            <Col className="justify-content-end">
              <Button href="/user/create" >Create</Button>
            </Col>
        </Row>
      </Alert>

      <Container className='mb-3'>
        {users.length > 0 ? (
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <UserItem key={index} user={user} />
              ))}
            </tbody>
          </Table>
        ) : (
          <h5>No users found</h5>
        )}
      </Container>      
    </>
  )
}

export default UserIndex