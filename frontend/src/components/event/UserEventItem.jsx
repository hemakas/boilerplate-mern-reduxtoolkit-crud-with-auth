import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteEvent } from '../../features/event/eventSlice'
import moment from 'moment'
import { FaTrash } from 'react-icons/fa'

function UserEventItem({ userEvent }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // get athentic user 
  const { user, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    // redirect if user not found
    if (!user) {
      navigate('/login')
    }
  }, [dispatch, navigate, isError, message, dispatch])

  return (
    <tr>
      <td>{ userEvent._id }</td>
      <td>{ userEvent.title }</td>
      <td>{ userEvent.description }</td>
      <td>{ moment(new Date(userEvent.start)).format('yyyy-MM-D') }</td>
      <td>{ moment(new Date(userEvent.end)).format('yyyy-MM-D') }</td>
      <td>{ user.name }</td>
      <td>{ userEvent.googleId }</td>
      <td><button className='close' onClick={() => dispatch(deleteEvent(userEvent._id))}><FaTrash /></button></td>
    </tr>
  )
}

export default UserEventItem