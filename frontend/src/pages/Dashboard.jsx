import Alert from 'react-bootstrap/Alert'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'  

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
   
    if (!user) {
      navigate('/login')
    }
    
  }, [user, navigate])

  return (
    <>
      <Alert variant="success" className='mt-3'>
        <Alert.Heading>Dashboard</Alert.Heading>
      </Alert>
    </>
  )
}

export default Dashboard