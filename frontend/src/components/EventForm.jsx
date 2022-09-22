import { Alert, Button, Col, Form, InputGroup, Row, Card, Container } from 'react-bootstrap';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaCalendarAlt } from 'react-icons/fa'
import DatePicker from 'react-datepicker'


function EventForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [validated, setValidated] = useState(false);
    
    // form data
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        assignee: '',
    })


    const { title, description, startDate, endDate, assignee } = formData 

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }

    const handleSubmit = (event) => {}
  
    return (
    <>
      <Container>

            <Card>
              <Card.Header className="text-center"><h3 className='center'><FaCalendarAlt /> Create New Event</h3></Card.Header>
              
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  
                  {/* title */}
                  <Row className="mb-3">
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control name="title" vaue={title} onChange={onChange} required type="text" placeholder="Event Title"/>
                    </Form.Group>
                  </Row>

                  {/* description */}
                  <Row className="mb-3">
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" name="description" vaue={description} onChange={onChange} required type="text" placeholder="Event Description"/>
                    </Form.Group>
                  </Row>

                  {/* start date */}
                  <Row className="mb-3">
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <DatePicker selected={startDate} onChange={onChange} />
                    </Form.Group>
                  </Row>

                  {/* end date */}
                  <Row className="mb-3">
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <DatePicker selected={endDate} onChange={onChange} />
                    </Form.Group>
                  </Row>

                  {/* assignee */}
                    <Form.Group>
                        <Form.Label>assignee</Form.Label>
                        <Form.Control as="select" value={assignee} onChange={onChange}>
                            <option value="DICTUM">Dictamen</option>
                            <option value="CONSTANCY">Constancia</option>
                            <option value="COMPLEMENT">Complemento</option>
                        </Form.Control>
                    </Form.Group>

                  {/* register button */}
                  <Button type="submit">Create</Button>
                </Form>
              </Card.Body>
            </Card>

      </Container>
    </>
  )
}

export default EventForm