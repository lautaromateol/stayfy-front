import { Link } from "react-router-dom";

const AdminButtons = () => {
  return (
    <div className="bg-gray-800 text-white w-1/4 h-screen">
      <div className="flex flex-col p-4">
        <Link to="/admin/users" className="py-2 px-4 block hover:bg-gray-700">
          USERS
        </Link>
        <Link to="/admin/orders" className="py-2 px-4 block hover:bg-gray-700">
          ORDERS
        </Link>
        <Link to="/admin/products" className="py-2 px-4 block hover:bg-gray-700">
          PRODUCTS
        </Link>
      </div>
    </div>
  );
};

export default AdminButtons;
