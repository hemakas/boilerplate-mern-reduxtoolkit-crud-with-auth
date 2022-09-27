import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap'
import Spinner from '../Spinner'
// import DatePicker from "react-datepicker"
import { getUsers } from '../../features/auth/authSlice'
import moment from 'moment'

import { createEvent, reset } from '../../features/event/eventSlice'

function EventCreateForm2() {
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

    // fetch events from eventSlice state > events array
    const { events, isLoading, isError, isSuccess, message } = useSelector((state) => state.events)

    // get athentic user 
    const { user } = useSelector((state) => state.auth)
    // fetch users from authSlice state > users array
    const { users } = useSelector((state) => state.auth)

    // behave according to the state (show errors/ navigate/ dispatch reset)
    useEffect(() => {
        if (isError) {
          toast.error(message)
        }

        // redirect if user not found
        if (!user) {
            navigate('/login')
        }
    
        // get all users from authSlice
        dispatch(getUsers())

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
                            {/* <DatePicker 
                                selected={start || new Date()} 
                                onChange={date => setstart(date)} 
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                                dateFormat={'dd/MM/yyyy'}
                            /> */}
                            <Form.Control type='date' name="start" onChange={onChange} value={start} ></Form.Control>
                        </FloatingLabel>
                    </Col>

                    {/* end date */}
                    <Col>
                        <FloatingLabel label="End Date" className='mb-3'> 
                            {/* <DatePicker 
                                name="end"
                                selected={end || new Date()} 
                                onChange={onChange} 
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                                dateFormat={'dd/MM/yyyy'}
                            /> */}
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

export default EventCreateForm2