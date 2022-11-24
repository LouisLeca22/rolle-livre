import { valueAsDate } from "../../utils/functions";
import "./Edit.scss";
import { AiOutlineStop } from "react-icons/ai"
import { AiOutlineCheckCircle } from "react-icons/ai"
import "./Edit.scss"
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  updateBook } from "../../features/book/bookSlice";

const Edit = ({ book }) => {
    const dispatch = useDispatch()
    const [form, setForm] = useState(
        {...book, date: book.date ? valueAsDate(book.date) : valueAsDate() }
    )


    const handleChange = (e) => {
        if(e.target.name === "date"){
            setForm(prev => ({ ...prev, [e.target.name]: e.target.value}))
        }
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const changeStatus = (value) => {
        setForm(prev =>({...prev, status: value}))
    }

    

  const update = () => {

    if(disabled){
        return
    } else {
        const date = new Date(form.date).getTime()

        const newBook = {...form, date }
        dispatch(updateBook(newBook))
    }
   
  }

  const disabled = !form.title || !form.author || (form.status && (!form.borrower || !form.date ))

    return (
        <>
     
        <article>
            <div className="left">
                <div className="group">
                    <h3>Titre: </h3>
                    <input name="title" value={form.title} onChange={handleChange} />
                </div>
                <div className="group">
                    <h3>Auteur: </h3>
                    <input name="author" value={form.author} onChange={handleChange} />
                </div>
                <div className="group">
                    <h3>Statut: </h3>
                    <div> 
                        <AiOutlineCheckCircle 
                            onClick={() => changeStatus(false)} 
                            style={{ color: "teal", fontSize: "3rem", marginRight: ".5rem", cursor: "pointer" }} 
                            className={form.status ? "" : "active"} 
                            />  
                        <AiOutlineStop
                            onClick={() => changeStatus(true)} 
                            style={{ color: "salmon", fontSize: "3rem", cursor: "pointer" }} 
                            className={form.status ? "active" : ""} 
                            />
                    </div>
                </div>
            </div>

            <div className="right">
                {form.status ? <>
                    <div className="group">
                        <h3>Emprunteur: </h3>
                        <input value={form.borrower ? form.borrower :""} name="borrower" onChange={handleChange}  />
                    </div>
                    <div className="group">
                        <h3>Date: </h3>
                        <input type="date" name="date" value={form.date} min={valueAsDate()} onChange={handleChange} />
                    </div>
            
                </> : <div className="group">
                    <h1>Le livre est disponible</h1>
                </div>}
            </div>
        
      
        </article>
          <button disabled={disabled} style={{width: "30%"}} onClick={() => update()}>Modifier</button>
          </>
    )
}
export default Edit