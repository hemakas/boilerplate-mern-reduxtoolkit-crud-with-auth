import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Spinner from '../../components/Spinner'
import DatePicker from 'react-datepicker'

import { createEvent, reset } from '../../features/events/eventSlice'

function EventCreateForm2() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        assignee: '',
    })

    const { title, description, startDate, endDate, assignee } = formData

    // select from state
    const { events, isLoading, isError, isSuccess, message } = useSelector
    (
        (state) => state.events
    )

    // behave according to the state (show errors/ navigate/ dispatch reset)
    useEffect(() => {
        if (isError) {
          toast.error(message)
        }

        if (isSuccess) {
          navigate('/events')
        }

        dispatch(reset())
    }, [events, isError, isSuccess, message, navigate, dispatch])

    // on change events
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    // form submit
    const handleSubmit = (e) => {
        e.preventDefault()

        // form validation rules
        if (!title || title === '')
            toast.error('Please enter event title')
        if (!startDate || startDate === '')
            toast.error('Please enter start date')
        if (!endDate || endDate === '')
            toast.error('Please enter end date')
        
        else {
            const eventData = {
                title,
                description,
                startDate,
                endDate,
                assignee,
            }

            // save event
            dispatch(createEvent(eventData))
        }
    }

    // show spinner while loading
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <Form>
                {/* title */}
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" id="title" vaue={title} onChange={onChange} required placeholder="Event title"/>
                    </Form.Group>
                </Row>

                {/* description */}
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' as='textarea' value={description} onChange={onChange} rows={4} placeholder='Enter event description' />
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

                {/* submit button */}
                <Form.Group>
                    <Button type='submit' onClick={handleSubmit} variant='primary'>Submit</Button>
                </Form.Group>
            </Form>
        </>
    )

}

export default EventCreateForm2