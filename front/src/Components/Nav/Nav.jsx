import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from "../Cart/CartContext/CartContext";
// import { useSpring, animated } from "react-spring";

const Nav = ({ darkMode, toggleDarkMode }) => {
    const { cartCount, addToCart } = useCart();

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
            <div className="flex justify-center space-x-4 w-40">
                {/* Botón de Modo Oscuro */}
                <button onClick={toggleDarkMode}>
                    {darkMode ? (
                        <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
                    ) : (
                        <FontAwesomeIcon icon={faMoon} className="text-gray-500" />
                    )}
                </button>
                <Link className="mr-5" to='/register'>Register</Link>
                <Link to='/login'>Log In</Link>
            

                {/* Icono de Carrito con Contador */}
                <button>
                    <Link to='/cart'>
                        <FontAwesomeIcon icon={faShoppingCart} className="text-green-500" />
                        <span className="ml-1">{cartCount}</span>
                    </Link>
                </button>
                <button className="mr-8">
                    <Link to='/login'>Log In</Link>
                </button>
            </div>

        </div>
    )
}

export default Nav