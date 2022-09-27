import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { deleteEvent } from '../../features/event/eventSlice'
import moment from 'moment'
import { getUserById } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'

function EventItem({ event }) {
  const dispatch = useDispatch()

  // fetch users from authSlice state > users array
  const { singleUser } = useSelector((state) => state.auth)

  useEffect(() => {
    // get all users from authSlice
    dispatch(getUserById(event.userId))

  }, [dispatch])

  console.log(singleUser)

  return (
    <tr>
      <td>{ event._id }</td>
      <td>{ event.title }</td>
      <td>{ event.description }</td>
      <td>{ moment(new Date(event.start)).format('yyyy-MM-D') }</td>
      <td>{ moment(new Date(event.end)).format('yyyy-MM-D') }</td>
      <td>{ singleUser.name }</td>
      <td>{ event.googleId }</td>
      <td><button className='close' onClick={() => dispatch(deleteEvent(event._id))}>X</button></td>
    </tr>
  )
}

export default EventItem