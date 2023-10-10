import UserDetail from "../../Components/Admin dashboard/Detail/UserDetail";
import Users from "../../Components/Admin dashboard/Users/Users";
import Orders from "../../Components/Orders/Orders";

const DashboarAdmin = () => {
  return <div>
    <UserDetail />
    <hr></hr>
    <Users />
    <hr></hr>
    <Orders />
  </div>;
};

export default DashboarAdmin;
