import { Alert, Button, Col, Form, InputGroup, Row, Card, Container } from 'react-bootstrap';
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'


function EventCreateForm() {
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
          <Form.Group controlId='description' className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control as='textarea' value={description} onChange={onChange} rows={4} type='text' placeholder='Enter event title' />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          {/* start date */}
          <Col>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <DatePicker selected={startDate} onChange={onChange} />
            </Form.Group>
          </Col>

          {/* end date */}
          <Col>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <DatePicker selected={endDate} onChange={onChange} />
            </Form.Group>
          </Col>
        </Row>

        {/* assignee */}
        <Row className="mb-3">
          <Form.Group>
              <Form.Label>assignee</Form.Label>
              <Form.Control as="select" value={assignee} onChange={onChange}>
                  <option value="DICTUM">Dictamen</option>
                  <option value="CONSTANCY">Constancia</option>
                  <option value="COMPLEMENT">Complemento</option>
              </Form.Control>
          </Form.Group>
        </Row>

        {/* create button */}
        <Button type="submit">Create</Button>
      </Form>
    </>
  )
}

export default EventCreateForm