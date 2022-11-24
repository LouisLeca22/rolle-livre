import { useDispatch } from "react-redux"
import { deleteBook } from "../../features/book/bookSlice"
import "./Modal.scss"

const Modal = ({id, setShowModal}) => {
    const dispatch = useDispatch()

    const handleDelete = () => {
        setShowModal(false)
        dispatch(deleteBook(id))
    }
  return (
    <div className="modal">
        <p>
        Confirmer la suppression ? 
        </p>
        <div>
        <button onClick={handleDelete}>oui</button>
        <button onClick={() => setShowModal(false)}>non</button>
        </div>
    </div>
  )
}
export default Modal