import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Button, Row } from 'react-bootstrap'
import Spinner from '../../components/Spinner'
import { register, reset } from '../../features/auth/authSlice'

function RegisterForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        level: ''
    })

    const { firstName, lastName, email, password, password2, level } = formData

    // select from state
    const { user, isLoading, isError, isSuccess, message } = useSelector
    (
        (state) => state.auth
    )

    // behave according to the state (show errors/ navigate/ dispatch reset)
    useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

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
        if (!firstName || firstName === '' && !lastName || lastName === '')
            toast.error('Please enter either first name or last name')
        if (!email || email === '')
            toast.error('Please enter email')
        if (!password || password === '')
            toast.error('Please enter password')
        else if (password.length < 6)
            toast.error('Password should be of minimum 6 characters')
        if (!password2 || password2 === '')
            toast.error('Please retype password')
        else if (password !== password2)
            toast.error('Passwords do not match')
        else {
            let name = firstName + ' ' + lastName
            
            const userData = {
              name,
              email,
              password,
              level
            }
            
            // register user
            dispatch(register(userData))
        }
    }

    // show spinner while loading
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <Form>
                {/* first name */}
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" name="firstName" id="firstName" vaue={firstName} onChange={onChange} required placeholder="John"/>
                    </Form.Group>
                </Row>

                {/* last name */}
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" name="lastName" id="lastName" vaue={lastName} onChange={onChange} required placeholder="Doe"/>
                    </Form.Group>
                </Row>

                {/* email */}
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" id="email" vaue={email} onChange={onChange} required placeholder="john@example.com"/>
                    </Form.Group>
                </Row>

                {/* password */}
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" id="password" vaue={password} onChange={onChange} required />
                    </Form.Group>
                </Row>

                {/* password2 */}
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Label>Retype Password</Form.Label>
                        <Form.Control type="password" name="password2" id="password2" vaue={password2} onChange={onChange} required />
                    </Form.Group>
                </Row>

                {/* level */}
                <Row className="mb-3">
                    <Form.Group>
                        <Form.Label>Level</Form.Label>
                        <Form.Select onChange={onChange} value={level} >
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                {/* submit button */}
                <Form.Group>
                    <Button type='submit' onClick={handleSubmit} variant='primary'>Submit</Button>
                </Form.Group>
            </Form>
        </>
    )

}

export default RegisterForm