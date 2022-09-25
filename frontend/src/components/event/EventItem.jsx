import { useDispatch } from 'react-redux'
import { deleteEvent } from '../../features/event/eventSlice'

function EventItem({ event }) {
  const dispatch = useDispatch()

  return (
    <tr>
      <td>{ event._id }</td>
      <td>{ event.title }</td>
      <td>{ event.description }</td>
      <td>{ new Date(event.start).toLocaleString('en-US') }</td>
      <td>{ new Date(event.end).toLocaleString('en-US') }</td>
      <td>{ event.userId }</td>
      <td>{ event.googleId }</td>
      <td><button className='close' onClick={() => dispatch(deleteEvent(event._id))}>X</button></td>
    </tr>
  )
}

export default EventItem