import { Alert, Button, Col, Form, InputGroup, Row, Card, Container } from 'react-bootstrap';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
   
    if (!user) {
      navigate('/login')
    }
    
  }, [user, navigate])

  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Dashboard</Alert.Heading>
      </Alert>

      <Container className='mb-3'>
        <Row>
          <Col></Col> 
          
          <Col xs={6}>
          </Col>

          <Col></Col> 
        </Row>
      </Container>

    </>
  )
}

export default Dashboard