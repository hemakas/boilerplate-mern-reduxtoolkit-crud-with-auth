import React, {useState} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { createEvent } from '../features/events/eventSlice'

function ExampleForm() {
    const dispatch = useDispatch()
    
    // converting dates for the datepicker to YYYY-MM-DD
    const startDateConverted = moment(new Date()).format('YYYY-MM-DD')
    const endDateConverted = moment(new Date()).format('YYYY-MM-DD')
    
    // form feilds
    const [form, setForm] = useState({
        title: '', 
        description: '', 
        startDate: startDateConverted, 
        endDate: endDateConverted, 
        assignee: ''
    })

    const { title, description, startDate, endDate, assignee } = form 

    // form errors
    const [errors, setErrors] = useState({})

    // onchange set form data
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        if (!!errors[field]) {
            setErrors({
                ...errors,
                [field]: null
            })
        }
    }

    // form validation rules
    const validateForm = () => {
        const newErrors = {}

        if (!title || title === '')
            newErrors.title = 'Please enter the title of the event'
        else if (title.length < 3)
            newErrors.title = 'The title should be longer than 3 characters'
        
        if (!description || description === ''){
            newErrors.description = 'Please enter event description'
        } else if (description.length < 3) {
            newErrors.description = 'The title should be longer than 3 characters'
        }
            
        if (!startDate || startDate === '')
            newErrors.startDate = 'Please add start date'
        
        if (!endDate || endDate === '')
            newErrors.endDate = 'Please add end date'
        else if (endDate < startDate) 
            newErrors.endDate = 'End date should be a date after the start date'
        
        return newErrors;
    }

    // handle submit
    const handleSubmit = e => {
        e.preventDefault()

        const formErrors = validateForm()

        // check for errors
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
            console.log('got errors')
        } else {
            // submit form
            dispatch(createEvent({ form }))
            setForm({})
            console.log('ready to submit')
        }


    }

    return (
        <section>
            <Form>
                
                {/* title */}
                <Form.Group controlId='title' className='mb-3'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' placeholder='Enter event title'
                        onChange={(e) => setField('title', e.target.value)} 
                        value={title}
                        isValid={!!errors.title}>
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.title}
                    </Form.Control.Feedback>
                </Form.Group>   

                {/* description */}
                <Form.Group controlId='description' className='mb-3'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='textarea' rows={4} type='text' placeholder='Enter event title'
                        onChange={(e) => setField('description', e.target.value)} 
                        value={description}
                        isValid={!!errors.description}>   
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                        {errors.description}
                    </Form.Control.Feedback>
                </Form.Group>

                <Row>
                    <Col>
                        {/* start date */}
                        <Form.Group controlId='startDate' className='mb-3'>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type='date'
                                onChange={(e) => setField('startDate', e.target.value)} 
                                value={startDate}
                                isValid={!!errors.startDate}>   
                            </Form.Control>

                            {/* <DatePicker 
                                selected={form.startDate} 
                                onChange={(e) => setField('startDate', e.target.value)} 
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                                dateFormat={'dd/MM/yyyy'}
                            />   */}
                            <Form.Control.Feedback type='invalid'>
                                {errors.startDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col>
                        {/* end date */}
                        <Form.Group controlId='endDate' className='mb-3'>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type='date'
                                onChange={(e) => setField('endDate', e.target.value)} 
                                value={endDate}
                                isValid={!!errors.endDate}>   
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.endDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                
                {/* assignee */}
                <Form.Group controlId='assignee' className='mb-3'>
                    <Form.Label>Assignee</Form.Label>
                    <Form.Select placeholder='Select assignee'
                        onChange={(e) => setField('assignee', e.target.value)} 
                        value={assignee}
                        isValid={!!errors.assignee}
                    >
                        <option disabled>Select..</option>
                        <option value='1'>Alex</option>
                        <option value='2'>Sadio</option>
                        <option value='3'>Lucas</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        {errors.assignee}
                    </Form.Control.Feedback>
                </Form.Group>

                {/* submit button */}
                <Form.Group controlId='submit'>
                    <Button type='submit' onClick={handleSubmit} variant='primary'>Submit</Button>
                </Form.Group>
            </Form>
        </section>
    )
}

export default ExampleForm
