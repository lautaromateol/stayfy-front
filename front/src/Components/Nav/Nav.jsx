import {Link} from "react-router-dom"

const Nav = ({ darkMode, toggleDarkMode }) => {
    return (
        <div className="flex justify-between w-full py-5 bg-gray-200 text-lg">
            <button className="ml-8 bg-yellow-300 text-black active:bg-yellow-400 text-sm font-bold rounded shadow hover:shadow-lg outline-none focus:outline-none h-10 w-20">
                <Link  to="/" className=" p-3">HOME</Link>
            </button>
            <div className="flex justify-around w-60">
                <button>
                    <Link to='/books'>Books</Link>
                </button>
                <button>
                    <Link to="/create">Create</Link>
                </button>
                <button>
                    <Link to='/review'>Rate us!</Link>
                </button>
            </div>
                <button className="mr-8" onClick={toggleDarkMode}>
                    {darkMode ? (
                    <>
                        <span className="mr-2">Modo Claro</span>
                        {/* <FontAwesomeIcon icon={faSun} className="text-yellow-500" /> */}
                    </>
                    ) : (
                    <>
                        <span className="mr-2">Modo Oscuro</span>
                        {/* <FontAwesomeIcon icon={faMoon} className="text-gray-500" /> */}
                    </>
                    )}
                <button className="mx-8">
                    <Link to='/login'>Log In</Link>
                </button>
                </button>

        </div>
    )
}

export default Nav