import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { desactivateUser, reactivateUser, deleteUser } from "../../../redux/actions"
import { useDispatch } from "react-redux"
import { BACKEND_URL } from "../../../../utils"

const UserDetail = () => {

    const { id } = useParams()

    const [user, setUser] = useState({})

    const [orders, setOrders] = useState([])

    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteUser(user.userId))
    }

    const handleDesactivate = () => {
        dispatch(desactivateUser(user.userId))
    }

    const handleReactivate = () => {
        dispatch(reactivateUser(user.userId))
    }

    useEffect(() => {
        axios(`${BACKEND_URL}/users/${id}`).then(({ data }) => {
            if (data.username) {
                setUser(data);
                setOrders(data.Orders);
            } else {
                window.alert('No hay usuario con ese ID');
            }
        });
        return setUser({});
    }, []);

    return (
        <div className="h-screen">
            <div className="grid place-items-center">
                <h1 className="text-3xl mt-5">{user.fullName}</h1>
                <p className="mt-2">username: {user.username} - id: {user.userId} - active: {user.active ? 'true' : 'false'}</p>
                {user.active ?
                    <button className="border border-solid border-black-500 mt-2 bg-blue-800 text-white p-1 rounded-md h-8" onClick={handleDesactivate}><a href={`/admin/users/${id}`}>Desactivate</a></button>
                    :
                    <button className="border border-solid border-black-500 mt-2 bg-blue-800 text-white p-1 rounded-md h-8" onClick={handleReactivate}><a href={`/admin/users/${id}`}>Reactivate</a></button>
                }
                <button className="border border-solid border-black-500 mt-2 bg-red-800 text-white p-1 rounded-md" onClick={handleDelete}>Delete user</button>
            </div>
            <h2 className="text-2xl mt-10 ml-5 text-center underline">Orders</h2>
            <div className="grid grid-cols-[25%_25%_25%_25%] place-items-center mt-10">
                <strong>Merchant Order</strong>
                <strong>Payment ID</strong>
                <strong>Products</strong>
                <strong>Ammount</strong>
            </div>
            {orders.map((order) => {
                return (
                    <div className="grid grid-cols-[25%_25%_25%_25%] place-items-center">
                        <div className="mt-2">
                            <p>{order.merchantOrder}</p>
                        </div>
                        <div className="mt-2">
                            <p>{order.paymentId}</p>
                        </div>
                        <div className="mt-2">
                            {order.products.map((product) => {

                                return order.products.length > 1 && order.products.indexOf(product) !== order.products.length - 1 ?
                                    <span>{product}, </span> :
                                    <span>{product}</span>

                            })}
                        </div>
                        <div className="mt-2">
                            ${order.spent}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default UserDetail