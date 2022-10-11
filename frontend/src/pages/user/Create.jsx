import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Alert, Col, Row, Container, Card } from 'react-bootstrap'
import UserRegisterForm from '../../components/user/UserRegisterForm'

function UserCreate() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    // redirect if user not found
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Create User</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 
          
          <Col xs={6}>
            <Card>
              <Card.Body>
                <UserRegisterForm />
              </Card.Body>
            </Card>
          </Col>

          <Col></Col> 
        </Row>
      </Container>      
    </>
  )
}

export default UserCreate