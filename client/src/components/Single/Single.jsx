import { getDate, mustReturn } from "../../utils/functions"
import "./Single.scss"
import { AiOutlineStop } from "react-icons/ai"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { AiOutlineWarning } from "react-icons/ai"
import {AiOutlineDash} from "react-icons/ai"


const Single = ({ book }) => {

    
    return (
        <article>
            <div className="left">
            <div className="group">
                <h3>Titre: </h3>
                <h1>{book.title}</h1>
            </div>
            <div className="group">
                <h3>Auteur: </h3>
                <h1>{book.author}</h1>
            </div>
            <div className="group">
                <h3>Statut: </h3>
                <h1>{book.status ? <AiOutlineStop style={{ color: "salmon", fontSize: "3rem" }} /> : <AiOutlineCheckCircle style={{ color: "teal", fontSize: "3rem" }} />}</h1>
            </div>
            </div>

             <div className="right">
                {book.status ? <>
                    <div className="group">
                    <h3>Emprunteur: </h3>
                    <h1>{book.borrower}</h1>
                </div>
                <div className="group">
                    <h3>Date: </h3>
                    <h1>{getDate(book.date)}</h1>
                </div>
                <div className="group">
                    <h3>Doit être retourné: </h3>
                    <h1>{mustReturn(book.date) ? <AiOutlineWarning style={{color: "tomato", fontSize: "3rem"}}/> : <AiOutlineDash style={{fontSize: "3rem"}} />} </h1>
                </div>
                </>: <div className="group">
                    <h1>Le livre est disponible</h1>
                </div>}
               

            </div>

        </article>
    )
}
export default Single