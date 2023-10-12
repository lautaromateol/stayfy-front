import UserDetail from "../../Components/Admin dashboard/Detail/UserDetail";
import Users from "../../Components/Admin dashboard/Users/Users";
import Orders from "../../Components/Orders/Orders";
import Products from "../../Components/Products/Products";

const DashboardAdmin = () => {
  return( 
  <div>
    <UserDetail />
    <hr></hr>
    <Users />
    <hr></hr>
    <Orders />
    <hr></hr>
    <Products />
  </div>
  )
};

export default DashboardAdmin;
