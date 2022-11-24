
import "./BookForm.scss"
import { toast } from 'react-toastify'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createBook, reset } from "../../features/book/bookSlice"
import Spinner from "../../components/Spinner/Spinner"



const BookForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.books
  )

  const [formData, setFormData] = useState({
    title: "",
    author: ""
  })


  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success(message)
      navigate("/")
    }

    dispatch(reset())

  }, [isError, isSuccess, message, navigate, dispatch])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBook(formData))
  }


  return (
    <main className="container-bookform" >

      {isLoading ? <Spinner /> :
        <>
          <h1>Ajouter un livre</h1>
          <form onSubmit={handleSubmit}>
            <div className={formData.title.length > 0 ? "field field--has-content" : "field"}>
              <label htmlFor="title" className="field-label">Titre: </label>
              <input type="text" name="title" id="title" placeholder="titre" className="field-input" onChange={handleChange} />
            </div>
            <div className={formData.author.length > 0 ? "field field--has-content" : "field"}>
              <label htmlFor="author" className="field-label">Auteur: </label>
              <input type="text" name="author" id="author" placeholder="auteur" className="field-input" onChange={handleChange} />
            </div>
            <button type="submit" disabled={!formData.title || !formData.author} style={{ width: "50%" }}>
              Ajouter
            </button>
          </form>
        </>
      }

    </main>
  )
}
export default BookForm