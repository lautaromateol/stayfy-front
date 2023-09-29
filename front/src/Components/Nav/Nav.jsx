import {Link} from "react-router-dom"

const Nav = ()=>{
    return (
        <div className="flex justify-between w-full py-5 bg-blue-400 text-lg font-semibold">
            <button className="ml-8">
                <Link to="/">Home</Link>
            </button>
            <div className="flex justify-around w-48">
                <button>
                    <Link to='/books'>Books</Link>
                </button>
                <button>
                    <Link to="/create">Create</Link>
                </button>
            </div>
                <button className="mr-8">
                    <Link to='/login'>Login</Link>
                </button>
        </div>
    )
}

export default Nav