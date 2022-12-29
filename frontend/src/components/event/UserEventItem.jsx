import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteEvent, updateEvent } from '../../features/event/eventSlice'
import { reset } from '../../features/auth/authSlice'
import moment from 'moment'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { Link } from "react-router-dom"

function UserEventItem({ userEvent, index }) {
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

    // return () => {
    //   dispatch(reset())
    // }  

  }, [dispatch, navigate, isError, message, dispatch])

  return (
    <tr>
      <td>{ ++index }</td>
      <td>{ userEvent.title }</td>
      <td>{ userEvent.description }</td>
      <td>{ moment(new Date(userEvent.start)).format('yyyy-MM-D') }</td>
      <td>{ moment(new Date(userEvent.end)).format('yyyy-MM-D') }</td>
      <td>{ userEvent.googleId }</td>
      <td>
        {/* edit button */}
        <Link to={`/event/update/${userEvent._id}`}>
          <button><FaEdit /></button>
        </Link>

        {/* delete button */}
        <button className='close' onClick={() => dispatch(deleteEvent(userEvent._id))}><FaTrash /></button>
      </td>
    </tr>
  )
}

export default UserEventItem