function EventItem({ event }) {
  return (
    <tr>
      <td>{ event._id }</td>
      <td>{ event.title }</td>
      <td>{ event.description }</td>
      <td>{ new Date(event.start).toLocaleString('en-US') }</td>
      <td>{ new Date(event.end).toLocaleString('en-US') }</td>
      <td>{ event.userId }</td>
      <td>{ event.googleId }</td>
      <td><button className='close'>X</button></td>
    </tr>
  )
}

export default EventItem