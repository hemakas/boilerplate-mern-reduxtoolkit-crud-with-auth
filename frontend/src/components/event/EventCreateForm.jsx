import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap'
import Spinner from '../Spinner'
import { getAllUsers } from '../../features/auth/authSlice'
import moment from 'moment'

import { createEvent, reset } from '../../features/event/eventSlice'

function EventCreateForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start: moment(new Date()).format('yyyy-MM-D'),
        end: moment(new Date()).format('yyyy-MM-D'),
        userId: '',
    })

    const { title, description, start, end, userId } = formData

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.event)

    const { user } = useSelector((state) => state.auth)

    const { users } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
          toast.error(message)
        }

        if (!user) {
            navigate('/login')
        }
    
        dispatch(getAllUsers())

        if (isSuccess) {
            toast.success("Event created successfully");
            navigate('/events/userEvents')
        }

        dispatch(reset())
    }, [isError, isSuccess, message, navigate, dispatch])

    // on change form elements
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
        if (!start || start === '')
            toast.error('Please enter start date')
        if (!end || end === '')
            toast.error('Please enter end date')
        
        else {
            let googleId = 'googleIDTEST'
            
            const eventData = {
                userId,
                googleId,
                title,
                description,
                start,
                end,
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
                <FloatingLabel label="Title" className='mb-3'>
                    <Form.Control type="text" name="title" value={title} onChange={onChange} required placeholder="Event title"/>
                </FloatingLabel>

                {/* description */}
                <FloatingLabel label="Description" className='mb-3'>
                    <Form.Control as='textarea' name="description" defaultValue={description} onChange={onChange} placeholder='Enter event description' style={{ height: '100px' }} />
                </FloatingLabel>

                <Row className="mb-3">
                    {/* start date */}
                    <Col>
                        <FloatingLabel label="Start Date" className='mb-3'>
                            <Form.Control type='date' name="start" onChange={onChange} value={start} ></Form.Control>
                        </FloatingLabel>
                    </Col>

                    {/* end date */}
                    <Col>
                        <FloatingLabel label="End Date" className='mb-3'> 
                            <Form.Control type='date' name="end" onChange={onChange} value={end} ></Form.Control>
                        </FloatingLabel>
                    </Col>
                </Row>

                {/* assignee */}
                <FloatingLabel label="Assignee" className='mb-3'>
                    <Form.Select name="userId" onChange={onChange} value={userId} aria-label="Floating label select example">
                        {users.map((user, index) => (
                            <option value={user._id} key={index}>{user.name}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel>

                {/* submit button */}
                <Form.Group>
                    <Button type='submit' onClick={handleSubmit} variant='primary'>Submit</Button>
                </Form.Group>
            </Form>
        </>
    )

}

export default EventCreateForm