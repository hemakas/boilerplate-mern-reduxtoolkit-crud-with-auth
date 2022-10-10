import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { deleteEvent } from '../../features/event/eventSlice'
import { getUserById, reset } from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'
import { FaTrash, FaEdit } from 'react-icons/fa'

function EventItem({ event, index }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // fetch users from authSlice state > users array
  const { isLoading, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    // log error messages
    if (isError) {
      console.log(message)
    }

    // get users by id
    dispatch(getUserById(event.userId))

    return () => {
      dispatch(reset())
    }

  }, [dispatch, isError])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <tr>
      <td>{  }</td>
      <td>{ event.title }</td>
      <td>{ event.description }</td>
      <td>{ moment(new Date(event.start)).format('yyyy-MM-D') }</td>
      <td>{ moment(new Date(event.end)).format('yyyy-MM-D') }</td>
      <td>{ event.name }</td>
      <td>{ event.googleId }</td>
      
      {/* edit button */}
      <td><button onClick={() => navigate(`/event/update/${event._id}`)}><FaEdit /></button></td>
      
      {/* delete button */}
      <td><button className='close' onClick={() => dispatch(deleteEvent(event._id))}><FaTrash /></button></td>
    </tr>
  )
}

export default EventItem