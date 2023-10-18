import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminButtons = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="relative">
      <div
        className="bg-[#477A7D] text-white flex flex-col p-4"
        onMouseEnter={() => setMenuVisible(true)}
        onMouseLeave={() => setMenuVisible(false)}
      >
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰ Admin Dashboard
        </div>
        {menuVisible && (
          <div className="flex flex-col mt-2">
            <Link
              to="/admin/users"
              className="py-2 px-4 block"
            >
              USERS
            </Link>
            <Link
              to="/admin/orders"
              className="py-2 px-4 block"
            >
              ORDERS
            </Link>
            <Link
              to="/admin/products"
              className="py-2 px-4 block"
            >
              PRODUCTS
            </Link>
            <Link
            to="/admin/create"
            className="py-2 px-4 block"
            >
              CREATE BOOK
            </Link>
            <Link
              to="/admin/update-book"
              className="py-2 px-4 block"
            >
              UPDATE BOOK
            </Link>
            <Link
              to="/admin/activate-book"
              className="py-2 px-4 block"
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
