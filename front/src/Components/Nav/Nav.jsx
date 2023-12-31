// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import UserToggle from "../User/UserToggle";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faShoppingCart,
  faBars,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../Cart/CartContext/CartContext";
import { useUser } from "../../Context/UserContext";
import logo from "./img/STAYFY2(2).png";
import Aos from "aos";
import "aos/dist/aos.css";

const Nav = ({ darkMode, toggleDarkMode }) => {

  const { cartCount, addToCart } = useCart();

  const { user, signOut, userData } = useUser();

  const [openMobileMenu, setOpenMobileMenu] = useState(false)

  useEffect(() => {
    Aos.init({ duration: 200 })
  }, [])

  return (
    <div>
      <div className="flex justify-between w-full  bg-gray-200 text-lg dark:bg-slate-800 px-12 dark:text-gray-100 items-center sticky top-0 shadow-2xl z-50 sm:flex hidden">

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
              <UserToggle />
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
      <nav class="md:hidden py-1 flex justify-between items-center bg-gray-200 text-lg dark:bg-slate-800 dark:text-gray-100">
        <a href="/"><img src={logo} alt="Logo" class="ml-5 w-20 h-15" /></a>
        <div>
          {
            user
              ?
              <a href="/user/profile">
                <FontAwesomeIcon icon={faUserCircle} className="w-6 h-6" />
              </a>
              :
              ""
          }

          <button className="m-4">
            <a href="/cart">
              <FontAwesomeIcon icon={faShoppingCart} className="w-6 h-6 text-green-500 hover:rotate-12 duration-150" />
              {
                <span className="ml-1 ">{cartCount ? cartCount : ""}</span>
              }
            </a>
          </button>
          <FontAwesomeIcon onClick={() => setOpenMobileMenu(!openMobileMenu)} className="w-6 h-6 mr-4" icon={faBars} />
        </div>
      </nav>
      {
        openMobileMenu ?
          <div className="md:hidden" data-aos="fade-down">
            <MobileMenu />
          </div>
          :
          ""
      }
    </div>

  );
};

export default Nav;
