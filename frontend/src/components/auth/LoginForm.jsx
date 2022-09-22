import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {Form, Button, Row} from 'react-bootstrap'
import { login, reset } from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'

function LoginForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

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

        if (!email || !password) {
            toast.error('Both email and password need to be filled')
        } else {
            const userData = {
                email,
                password,
            }
        
            dispatch(login(userData))
        }
    }

    // show spinner while loading
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <Form>
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

                {/* login button */}
                <Form.Group>
                    <Button type='submit' onClick={handleSubmit} variant='primary'>Login</Button>
                </Form.Group>
            </Form>
        </>
    )

}

export default LoginForm