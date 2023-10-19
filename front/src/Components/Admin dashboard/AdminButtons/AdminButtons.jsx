import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminButtons = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="relative" style={{ zIndex: 1 }}>
      <div
        className="bg-[#477A7D] text-white flex flex-col p-4 "
      >
        <div className="menu-toggle text-lg " onClick={toggleMenu}>
          ☰ ADMIN DASHBOARD
        </div>
        {menuVisible && (
          <div className="flex flex-col mt-2 border-t-2 border-[#B2D1C5] ">
            <Link
              to="/admin/users"
              className="py-2 px-4 block duration-200 hover:translate-x-4"
            >
              USERS
            </Link>
            <Link
              to="/admin/orders"
              className="py-2 px-4 block duration-200 hover:translate-x-4"
            >
              ORDERS
            </Link>
            <Link
              to="/admin/products"
              className="py-2 px-4 block duration-200 hover:translate-x-4"
            >
              PRODUCTS
            </Link>
            <Link
            to="/admin/create"
            className="py-2 px-4 block duration-200 hover:translate-x-4"
            >
              CREATE BOOK
            </Link>
            <Link
              to="/admin/update-book"
              className="py-2 px-4 block duration-200 hover:translate-x-4"
            >
              UPDATE BOOK
            </Link>
            <Link
              to="/admin/activate-book"
              className="py-2 px-4 block duration-200 hover:translate-x-4"
            >
              ACTIVATE BOOK
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminButtons;

