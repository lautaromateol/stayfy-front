import SearchBar from "../SearchBar/SearchBar"
import {Link} from "react-router-dom"

const Nav = ()=>{
    return (
        <div>
            <button>
                <Link to="/">Home</Link>
            </button>
            <button>
                <Link to="/books">Books</Link>
            </button>
            <button>
                <Link to="/create">Create</Link>
            </button>
            <SearchBar />
            <button>Log In</button>
        </div>
    )
}

export default Nav