import "./Filters.scss";

const Filters = ({options, setOptions}) => {

   const handleChange = (e) => {
      setOptions(prev => ({...prev, [e.target.name] : e.target.value}))
   }


  return (
    <aside className="side">
      <h1>Filtres</h1>
    <form autoComplete="off"  onSubmit={(e) => e.preventDefault()}>
        <div className={options.author.length > 0 ?"field field--has-content" : "field"}>
        <label htmlFor="author" className="field-label" >Auteur: </label>
        <input type="text" name="author" id="author" placeholder="auteur" className="field-input" onChange={handleChange} />
        </div>
        <div className={options.title.length > 0 ?"field field--has-content" : "field"}>
        <label htmlFor="title" className="field-label">Titre: </label>
        <input type="text" name="title" placeholder="titre" id="title" className="field-input" onChange={handleChange} />
        </div>
        <div className={options.id.length > 0 ?"field field--has-content" : "field"}>
        <label htmlFor="id" className="field-label">Identifiant: </label>
        <input type="number" className="field-input" id="id" placeholder="identifiant" name="id" onChange={handleChange} />
        </div>
        <div className="select">
        <label htmlFor="avaiability" className="select--label">Disponibilité</label>
        <select className="select--select" name="availability" id="availability"defaultValue={"all"} onChange={handleChange}>
          <option className="select--option" value="all">tous</option>
          <option className="select--option" value="available">disponible</option>
          <option className="select--option" value="unavailable">indisponible</option>
        </select>
        </div>
    </form>
    </aside>
  )
}
export default Filters