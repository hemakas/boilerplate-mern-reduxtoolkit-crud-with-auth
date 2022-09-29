import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { deleteEvent } from '../../features/event/eventSlice'
import { getUserById, reset } from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'

function EventItem({ event }) {
  const dispatch = useDispatch()

  // fetch users from authSlice state > users array
  const { eventUsers, isLoading, isError, message } = useSelector((state) => state.auth)

  // const { eventUsers, isLoading, isError, message } = useSelector((state) => ({ ...state.auth }))

  console.log(eventUsers)

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
      <td>{ event._id }</td>
      <td>{ event.title }</td>
      <td>{ event.description }</td>
      <td>{ moment(new Date(event.start)).format('yyyy-MM-D') }</td>
      <td>{ moment(new Date(event.end)).format('yyyy-MM-D') }</td>
      <td>{ 
          eventUsers.map((eventUser) => {
            if(eventUser._id == event.userId) {
              return eventUser.name
            }
          })
      }</td>
      <td>{ event.googleId }</td>
      <td><button className='close' onClick={() => dispatch(deleteEvent(event._id))}>X</button></td>
    </tr>
  )
}

export default EventItem