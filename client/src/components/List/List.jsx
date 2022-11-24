import TableRow from "./TableRow/TableRow"
import "./List.scss"

const List = ({ books }) => {

  return (
    <section>
         <table>
         <thead>
           <tr>
             <th>Identifiant</th>
             <th>Titre</th>
             <th>Auteur</th>
             <th>Statut</th>
             <th>Date d'emprunt</th>
             <th>à rendre </th>
           </tr>
         </thead>
         <tbody>
           {books.map(book => (
             <TableRow book={book} key={book.id} />
           ))}
         </tbody>
       </table> 
    
     
    </section>
  )
}
export default List