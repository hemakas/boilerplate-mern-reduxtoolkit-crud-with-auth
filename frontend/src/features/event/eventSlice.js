import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventService from './eventService'

const initialState = {
  events: [],
  userEvents: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new event
export const createEvent = createAsyncThunk('events/create', async (eventData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await eventService.createEvent(eventData, token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// get all events
export const getEvents = createAsyncThunk('events/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await eventService.getEvents(token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// get events by user id
export const getUserEvents = createAsyncThunk('events/getAllUserEvents', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await eventService.getUserEvents(id, token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Delete event
export const deleteEvent = createAsyncThunk('events/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await eventService.deleteEvent(id, token)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// builder methods
export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      
      // create events cases
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.events.push(action.payload)
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // get events cases
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.events = action.payload
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // get events by user id cases
      .addCase(getUserEvents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserEvents.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userEvents = action.payload
      })
      .addCase(getUserEvents.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      // delete event cases
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.events = state.events.filter(
          (event) => event._id !== action.payload.id
        )
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = eventSlice.actions
export default eventSlice.reducer