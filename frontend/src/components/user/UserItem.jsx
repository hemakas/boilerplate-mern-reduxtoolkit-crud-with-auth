import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'
import { FaEdit, FaTrash } from 'react-icons/fa'

function UserItem({ user }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isLoading, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    // log error messages
    if (isError) {
      console.log(message)
    }

  }, [isError])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <tr>
      <td>{  }</td>
      <td>{ user.name }</td>
      <td>{ user.email }</td>
      <td>{ user.level == 1 ? 'Admin' : user.level == 2 ? 'User' : 'N/A'}</td>
      <td>{ user.status ? 'Active' : 'Inactive' }</td>
      <td>
        {/* edit button */}
        <button onClick={() => navigate(`/users/update/${user._id}`)}><FaEdit /></button>
        
        {/* delete button */}
        {/* <button className='close' onClick={() => dispatch(deleteEvent(event._id))}><FaTrash /></button> */}
      </td>
    </tr>
  )
}

export default UserItem