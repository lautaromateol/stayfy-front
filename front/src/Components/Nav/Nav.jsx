import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Nav = ({ darkMode, toggleDarkMode }) => {
    return (
        <div className="flex justify-between w-full py-5 bg-gray-200 text-lg">
            <button className="ml-8 bg-yellow-300 text-black active:bg-yellow-400 text-sm font-bold rounded shadow hover:shadow-lg outline-none focus:outline-none h-10 w-20">
                <Link to="/" className="h-full p-3">HOME</Link>
            </button>
            <div className="flex justify-around w-60">
                {/* <button>
                    <Link to='/books'>Books</Link>
                </button> */}
                <button>
                    <Link to="/create">Create</Link>
                </button>
                <button>
                    <Link to='/review'>Rate us!</Link>
                </button>
            </div>
            <button className="mr-8" onClick={toggleDarkMode}>
                {darkMode ? (
                    <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
                ) : (
                    <FontAwesomeIcon icon={faMoon} className="text-gray-500" />
                )}
                <button className="mr-8">
                </button>
                <Link to='/login'>Log In</Link>
            </button>

        </div>
    )
}

export default Nav