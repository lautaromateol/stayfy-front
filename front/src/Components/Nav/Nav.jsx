// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import UserProfile from "../User/Userprofile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from "../Cart/CartContext/CartContext";
import { useUser } from '../../Context/UserContext';
import logo from './img/STAYFY2(2).png'

// import { useSpring, animated } from "react-spring";

// eslint-disable-next-line react/prop-types
const Nav = ({ darkMode, toggleDarkMode }) => {
    // eslint-disable-next-line no-unused-vars
    const { cartCount, addToCart } = useCart();
    const { user, signOut } = useUser();

    return (
        <div className="flex justify-between w-full py-5 bg-gray-200 text-lg">
            <Link to="/" className="h-full ml-6">
                <img className="w-20" src={logo} alt="Logo de la empresa" />    
            </Link>           
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
            <div className="flex justify-center space-x-4 w-80">
                {/* Botón de Modo Oscuro */}
                <button onClick={toggleDarkMode}>
                    {darkMode ? (
                        <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
                    ) : (
                        <FontAwesomeIcon icon={faMoon} className="text-gray-500" />
                    )}
                </button>
                {/* Icono de Carrito con Contador */}
                <button>
                    <Link to='/cart'>
                        <FontAwesomeIcon icon={faShoppingCart} className="text-green-500" />
                        <span className="ml-1">{cartCount}</span>
                    </Link>
                </button>
                {user ? (
                    <>
                    <button onClick={signOut}>Sign Out</button>
                    <p>{user.name}</p>
                    </>
                ) : (
                    <>
                {/* <Link className="mr-5" to='/register'>Register</Link> */}
                <Link to='/login'>Log In</Link>
                    </>
                )}
            
                <button className="mr-8  flex justify-around w-60">
                    <UserProfile/>
                </button>

            </div>

    </div>
);
}

export default Nav;
