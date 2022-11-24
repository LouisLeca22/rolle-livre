import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Edit from "../../components/Edit/Edit";
import Single from "../../components/Single/Single";
import Spinner from "../../components/Spinner/Spinner";
import { getBook, reset } from "../../features/book/bookSlice";
import "./BookSingle.scss";
import { AiOutlineArrowLeft, AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai"
import Modal from "../../components/Modal/Modal";


const BookSingle = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { book, isLoading, isError, isSuccess, message } = useSelector(state => state.books)
  const [showModal, setShowModal] = useState(false)
  const [edit, setEdit] = useState(false)
  
  useEffect(() => {
    dispatch(getBook(id))

  }, [dispatch, id])

  useEffect(() => {

    if (isSuccess && message) {
      toast.success(message)
      if(edit){
        setEdit(false)
      } else {
        //delete
        navigate("/")
      }
    }

    if (isError && message) {
      toast.error(message)
    }

    dispatch(reset())

  }, [dispatch, edit,navigate,isSuccess, message, isError])





  if (isLoading) {
    <Spinner />
  }
  return (
    <main className="container-single">
     {showModal && <Modal id={book.id} setShowModal={setShowModal} /> } 
      <div className="actions">
        <Link to="/"> <AiOutlineArrowLeft style={{ fontSize: "2rem", color: "midnightblue" }} /></Link>
        <div>
          {edit ?

            <AiOutlineEye onClick={() => setEdit(false)} style={{fontSize: "2rem", color: "midnightblue", cursor: "pointer"}} />
            : 
            <>
              <AiOutlineEdit onClick={() => setEdit(true)} style={{ fontSize: "2rem", color: "midnightblue", cursor: "pointer" }} />
              <AiOutlineDelete style={{ fontSize: "2rem", color: "tomato", cursor: "pointer" }} onClick={() => setShowModal(true)} />
            </>
          }

        </div>
      </div>
      {edit ? <Edit book={book}  /> : <Single book={book} />}
    </main>
  )
}
export default BookSingle