import {Link} from "react-router-dom"
import {FaBookReader} from "react-icons/fa" 
import {BsFillPlusCircleFill} from "react-icons/bs"
import "./Header.scss"

const Header = () => {
  return (
    <header>
      <div className="wrapper">

    
    <Link to="/" className="logo">
      <FaBookReader color="midnightblue"/>
      <div><span>Rolle</span>Livre</div>
    </Link>
    <ul className="navbar">
      <li>
        <Link to="/">
          Liste
        </Link>
      </li>
      <li>
        <Link to="/form">
          <div>
          <BsFillPlusCircleFill className="icon" />
          </div>
        </Link>
      </li>
    </ul>
    </div>
  </header>
  )
}
export default Header