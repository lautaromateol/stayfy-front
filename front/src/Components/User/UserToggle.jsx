// UserProfile.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useUser } from '../../Context/UserContext';


const UserToggle = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user,  } = useUser();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block text-left duration-150 hover:scale-105" onBlur={closeDropdown}>
      <button
        id="avatarButton"
        type="button"
        // onClick={toggleDropdown}
        className="rounded-full cursor-pointer flex justify-center items-center"
      ><a href="/user/profile">
        {/* Aquí podría ir tu imagen de perfil */}
        {user?.name || "profile"}
      </a>
      </button>

      {/* Menú desplegable
      {showDropdown && (
        <div className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow right-0 w-44 dark:bg-gray-700 dark:divide-gray-600">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user.name}</div>
            <div className="font-medium truncate">{user.email}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <a
                href="/user/profile"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Shopping history
              </a>
            </li>
           
          </ul>
          
        </div>
      )} */}
    </div>
  );
};

export default UserToggle;


            




