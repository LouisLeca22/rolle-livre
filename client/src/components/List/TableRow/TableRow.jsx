import "./TableRow.scss"

import { AiOutlineStop } from "react-icons/ai"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { AiOutlineWarning } from "react-icons/ai"
import { Link } from "react-router-dom"
import { getDate, mustReturn } from "../../../utils/functions"


const TableRow = ({ book }) => {


  return (
    <tr>

      <td>
        <Link to={`/book/${book.id}`}>
          {book.id}
        </Link>
      </td>
      <td>
        <Link to={`/book/${book.id}`}>
          {book.title}
        </Link>
      </td>
      <td>
        <Link to={`/book/${book.id}`}>
          {book.author}
        </Link>
      </td>
      <td>{book.status ? <AiOutlineStop style={{ color: "salmon" }} className="icon" /> : <AiOutlineCheckCircle style={{ color: "teal" }} className="icon" />}</td>
      <td>{book.date ? getDate(book.date) : "-"}</td>
      {!book.date ?
        <td>-</td>
        : <td>{mustReturn(book.date) ? <AiOutlineWarning style={{ color: "tomato" }} className="icon" /> : "-"}</td>}
    </tr>
  )
}
export default TableRow