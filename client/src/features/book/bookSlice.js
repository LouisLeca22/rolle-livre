import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookService from './bookService'

const initialState = {
  books: [],
  book: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Create new book
export const createBook = createAsyncThunk(
  'books/create',
  async (bookData, thunkAPI) => {
    try {
      return await bookService.createBook(bookData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// get books
export const getBooks = createAsyncThunk(
  'books/getAll',
  async (_, thunkAPI) => {
    try {
      return await bookService.getBooks()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getBook = createAsyncThunk(
    'book/get',
    async (bookId, thunkAPI) => {
      try {
        return await bookService.getBook(bookId)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

// Delete book
export const deleteBook = createAsyncThunk(
  'books/delete',
  async (bookId, thunkAPI) => {
    try {

      return await bookService.deleteBook(bookId)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Update book
export const updateBook = createAsyncThunk(
    'books/update',
    async (bookData, thunkAPI) => {
      try {
        return await bookService.updateBook(bookData)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const goalSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false 
      state.isLoading = false
      state.isSuccess = false
      state.message = ""
    },
    setBooks: (state, action) => {
      state.books = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.books.push(action.payload.book)
        state.message = action.payload.message
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.books = action.payload
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.books = state.books.filter(
          (book) => book.id !== action.payload.id
        )
        state.message = action.payload.message
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.book = action.payload
      })
      .addCase(getBook.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.book = action.payload.book
        state.books = state.books.map(book => book.id === action.payload.book.id ? (action.payload.book) : book)
        state.message = action.payload.message
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, setBooks } = goalSlice.actions
export default goalSlice.reducer