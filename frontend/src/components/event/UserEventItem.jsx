import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { deleteEvent } from '../../features/event/eventSlice'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'

function UserEventItem({ userEvent }) {
  const dispatch = useDispatch()

  // get athentic user 
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {

  }, [dispatch])

  return (
    <tr>
      <td>{ userEvent._id }</td>
      <td>{ userEvent.title }</td>
      <td>{ userEvent.description }</td>
      <td>{ moment(new Date(userEvent.start)).format('yyyy-MM-D') }</td>
      <td>{ moment(new Date(userEvent.end)).format('yyyy-MM-D') }</td>
      {/* <td>{ user.name }</td> */}
      <td>{ userEvent.userId}</td>
      <td>{ userEvent.googleId }</td>
      <td><button className='close' onClick={() => dispatch(deleteEvent(userEvent._id))}><FaTrash /></button></td>
    </tr>
  )
}

export default UserEventItem