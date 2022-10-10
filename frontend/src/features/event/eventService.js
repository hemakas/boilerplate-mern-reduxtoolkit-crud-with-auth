import axios from 'axios'

const API_URL = '/api/events/'

// Create new event
const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, eventData, config)

  return response.data
}

// update event
const updateEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const updateData = {
    title: eventData.title,
    description: eventData.description,
    start: eventData.start,
    end: eventData.end,
    userId: eventData.userId,
    googleId: eventData.googleId
  }
  const response = await axios.put(API_URL + eventData._id, updateData, config)
  return response.data
}

// Get all events
const getEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

// Get event by event id
const getEventById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + id, config)
  return response.data
}

// Get events by user id
const getUserEvents = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'user/' + id, config)
  return response.data
}

// Delete event
const deleteEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + eventId, config)
  return response.data
}

const eventService = {
  createEvent,
  updateEvent,
  getEvents,
  deleteEvent,
  getUserEvents,
  getEventById
}

export default eventService

