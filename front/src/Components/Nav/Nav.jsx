import SearchBar from "../SearchBar/SearchBar"
import style from "./Nav.module.css"
import {Link} from "react-router-dom"

const Nav = ()=>{
    return (
        <div className={style.nav}>
            <button>Books</button>
            <button>
                <Link to="/create">Create</Link>
            </button>
            <SearchBar />
            <button>Log In</button>
        </div>
    )
}

export default Nav