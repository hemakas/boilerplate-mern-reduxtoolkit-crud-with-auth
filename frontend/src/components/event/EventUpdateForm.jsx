import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap'
import Spinner from '../Spinner'
import { getAllUsers } from '../../features/auth/authSlice'
import moment from 'moment'

import { updateEvent, reset } from '../../features/event/eventSlice'

function EventUpdateForm({ event }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start: '',
        end: '',
        userId: '',
    })
    
    const { title, description, start, end, userId } = formData

    const { events, isLoading, isError, isSuccess, message } = useSelector((state) => state.events)

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

        return () => {
            dispatch(reset())
        }

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
            dispatch(updateEvent(eventData))
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

                {/* userIds */}
                <FloatingLabel label="userId" className='mb-3'>
                    <Form.Select name="userId" onChange={onChange} value={userId} aria-label="Floating label select example">
                        <option>Select userId</option>
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

export default EventUpdateForm