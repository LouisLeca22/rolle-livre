import { configureStore } from '@reduxjs/toolkit'
import bookReducer from '../features/book/bookSlice'

export const store = configureStore({
  reducer: {
    books: bookReducer
  },
})