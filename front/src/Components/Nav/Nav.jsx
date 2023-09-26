import SearchBar from "../SearchBar/SearchBar"
import style from "./Nav.module.css"

const Nav = ()=>{
    return (
        <div className={style.nav}>
            <button>Books</button>
            <SearchBar />
            <button>Log In</button>
        </div>
    )
}

export default Nav