// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import UserToggle from "../User/UserToggle";
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
  const { user, signOut, userData } = useUser();
  // console.log("Es super Admin: ",userData.isSuperAdmin);
  // console.log("ES Admin",userData.isAdmin);
  return (
    <div className="flex justify-between w-full  bg-gray-200 text-lg dark:bg-slate-800 px-12 dark:text-gray-100 items-center sticky top-0 shadow-2xl z-50">
      <div className="flex justify-around w-60">
        <button className="bg-[#477A7D] hover:bg-[#A4BCB3] text-white font-bold py-2 px-4 rounded dark:bg-[#40495C] dark:hover:bg-[#111827]">
          <Link to="/store">STORE</Link>
        </button>
      </div>

      <div>
        <Link to="/" className="h-full">
          <img className="w-24 mb-1 py-2" src={logo} alt="Logo de la empresa" />
        </Link>
      </div>

      <div className="flex justify-center items-center w-90 space-x-10 duration-300">
        {/* Botón de Modo Oscuro */}
        <button onClick={toggleDarkMode}>
          {darkMode ? (
            <FontAwesomeIcon icon={faSun} className="text-yellow-500 ease-in-out hover:rotate-180 hover:duration-1000" />
          ) : (
            <FontAwesomeIcon icon={faMoon} className="text-gray-500 hover:rotate-[360] hover:duration-1000" />
          )}
        </button>
            
        {user ? (
          <>
            <button className="duration-150 hover:scale-105" onClick={signOut}>Sign Out</button>
            <UserToggle  />
          </>
        ) : (
          <>
            <Link className="duration-200 hover:scale-105" to="/register">
              Register
            </Link>
            <Link className="duration-200 hover:scale-105" to="/login">Log In</Link>
          </>
        )}
        {/* Icono de Carrito con Contador */}
        <button>
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} className="text-green-500 hover:rotate-12 duration-150" />
            <span className="ml-1 ">{cartCount}</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Nav;
