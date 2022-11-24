import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Filters from "../../components/Filters/Filters"
import List from "../../components/List/List"
import Spinner from "../../components/Spinner/Spinner"
import {  setBooks } from "../../features/book/bookSlice"
import "./BookList.scss"

const BookList = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsloading] = useState(false)    
    const [filtered, setFiltered] = useState([])
    const {books} = useSelector(state => state.books)
    useEffect(() => {
       const fetchBooks = async () => {
        setIsloading(true)
        try {
            const {data} = await axios.get("/api/books")
            dispatch(setBooks(data))
            setFiltered(data)
        } catch (error) {
            console.log(error.message)
        }
        finally {
         setIsloading(false)
        }
       }

       fetchBooks()
    }, [dispatch])
  
    const [options, setOptions] = useState({
        title: "",
        author: "",
        id: "",
        availability: "all",
    })

    const filter = (array, option, value) => {
        if(option === "id"){
            return array.filter(book => String(book[option]).includes(value))
        }

        if(option === "availability"){
            if(value === "available"){
                return array.filter(book => book.status === false)
            } else if ( value === "unavailable"){
                return array.filter(book => book.status === true)
            } else {
                return array
            }
        }
        return array.filter(book => book[option].includes(value))
    }
    

    useEffect(() => {
    let result = books 
    result = filter(result, "title", options.title)
    result = filter(result, "author", options.author)
    result = filter(result, "id", options.id)
    result = filter(result, "availability", options.availability)
    setFiltered(result)
    }, [options, books])
    
    return (
        <main className="container-booklist">
        {isLoading ? <Spinner /> : <>
        <List books={filtered} /> 
        <Filters options={options} setOptions={setOptions}/>
        </> }
        </main>
    )
}
export default BookList