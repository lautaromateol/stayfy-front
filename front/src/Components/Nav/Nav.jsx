// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import UserProfile from "../User/Userprofile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../Cart/CartContext/CartContext";
import { useUser } from "../../Context/UserContext";
import logo from "./img/STAYFY2(2).png";

// import { useSpring, animated } from "react-spring";

// eslint-disable-next-line react/prop-types
const Nav = ({ darkMode, toggleDarkMode }) => {
  // eslint-disable-next-line no-unused-vars
  const { cartCount, addToCart } = useCart();
  const { user, signOut } = useUser();

  return (
    <div className="flex justify-between w-full  bg-gray-200 text-lg dark:bg-slate-800 px-12 dark:text-gray-100 items-center sticky top-0 shadow-2xl z-50">
      <div className="flex justify-around w-60">
        <button>
          <Link to="/store">Store</Link>
        </button>

        <button>
          <Link to="/create">Create</Link>
        </button>
        <button>
          <Link to="/review">Rate us!</Link>
        </button>
      </div>

      <div>
        <Link to="/" className="h-full ">
          <img className="w-24 mb-1 py-2" src={logo} alt="Logo de la empresa" />
        </Link>
      </div>

      <div className="flex justify-center items-center w-90 space-x-10">
        {/* Botón de Modo Oscuro */}
        <button onClick={toggleDarkMode}>
          {darkMode ? (
            <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
          ) : (
            <FontAwesomeIcon icon={faMoon} className="text-gray-500" />
          )}
        </button>

        {user ? (
          <>
            <button onClick={signOut}>Sign Out</button>
            <p>{user.name}</p>
          </>
        ) : (
          <>
            <Link to="/register">
              Register
            </Link>
            <Link to="/login">Log In</Link>
          </>
        )}

        <button>
          {/* <UserProfile /> */}
        </button>
        {/* Icono de Carrito con Contador */}
        <button>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} className="text-green-500" />
            <span className="ml-1">{cartCount}</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Nav;
