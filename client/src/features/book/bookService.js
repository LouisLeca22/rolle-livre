import axios from "axios"

const createBook = async (bookData) => {
    const {data} = await axios.post(`/api/books`, bookData)
    return {book: data.book, message: data.message}
  }
  
  const getBooks = async () => {
    const {data} = await axios.get('/api/books')
    return data
  }
  

  const getBook = async (bookId) => {
    const {data} = await axios.get(`/api/books/${bookId}`)
    return data
  }
  
  const updateBook = async (bookData) => {
    const {data} = await axios.patch(`/api/books`, bookData)
    return {book: data.book, message: data.message}
  }
  
  const deleteBook = async (bookId) => {
    console.log(bookId)
    const {data} = await axios.delete("/api/books", {data: {id: bookId}})
    return {id: bookId, message: data.message }
  }
  
  

  const bookService = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
  }
  
  export default bookService