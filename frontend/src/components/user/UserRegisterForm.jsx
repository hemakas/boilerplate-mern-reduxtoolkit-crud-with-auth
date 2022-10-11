import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Form, Button, Row, FloatingLabel } from 'react-bootstrap'
import Spinner from '../Spinner'
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
        level: '2'
    })

    const { firstName, lastName, email, password, password2, level } = formData

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
          toast.error(message)
        }
    
        if (isSuccess) {
            toast.success("User registered successfully")
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
              level: Number(level)
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
                <FloatingLabel label="First Name" className='mb-3'>
                    <Form.Control type="text" name="firstName" id="firstName" vaue={firstName} onChange={onChange} required placeholder="John"/>
                </FloatingLabel>

                {/* last name */}
                <FloatingLabel label="Last Name" className='mb-3'>
                    <Form.Control type="text" name="lastName" id="lastName" vaue={lastName} onChange={onChange} required placeholder="Doe"/>
                </FloatingLabel>

                {/* email */}
                <FloatingLabel label="Email" className='mb-3'>
                    <Form.Control type="email" name="email" id="email" vaue={email} onChange={onChange} required placeholder="john@example.com"/>
                </FloatingLabel>

                {/* password */}
                <FloatingLabel label="Password" className='mb-3'>
                    <Form.Control type="password" name="password" id="password" vaue={password} onChange={onChange} required />
                </FloatingLabel>

                {/* password2 */}
                <FloatingLabel label="Retype password" className='mb-3'>
                    <Form.Control type="password" name="password2" id="password2" vaue={password2} onChange={onChange} required />
                </FloatingLabel>

                {/* Role */}
                <FloatingLabel label="Role" className='mb-3'>
                    <Form.Select name="level" onChange={onChange} value={level} aria-label="Floating label select example">
                        <option value='1'>Admin</option>
                        <option value='2'>User</option>
                    </Form.Select>
                </FloatingLabel>

                {/* submit button */}
                <Form.Group>
                    <Button type='submit' onClick={handleSubmit} variant='primary'>Register</Button>
                </Form.Group>
            </Form>
        </>
    )

}

export default RegisterForm