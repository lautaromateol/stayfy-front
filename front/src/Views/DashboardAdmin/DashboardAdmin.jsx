import UserDetail from "../../Components/Admin dashboard/Detail/UserDetail";
import Users from "../../Components/Admin dashboard/Users/Users";
import Orders from "../../Components/Orders/Orders";
import NewProducts from "../../Components/Products/NewProducts";

const DashboardAdmin = () => {
  return( 
  <div>
    <UserDetail />
    <Users />
    <Orders />
    <NewProducts />
  </div>
  )
};

export default DashboardAdmin;
