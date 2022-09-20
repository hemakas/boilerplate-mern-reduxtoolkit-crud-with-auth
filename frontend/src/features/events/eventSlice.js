import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventService from './eventService'

const initialState = {
  events: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
      reset: (state) => initialState,
    }
})

export const { reset } = eventSlice.actions
export default eventSlice.reducer