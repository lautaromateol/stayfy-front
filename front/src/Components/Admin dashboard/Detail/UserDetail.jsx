import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { desactivateUser, reactivateUser, deleteUser } from "../../../redux/actions"
import { useDispatch } from "react-redux"

const UserDetail = ()=>{

    const {id} = useParams()

    const [user, setUser] = useState({})

    const dispatch = useDispatch()

    const handleDelete = ()=>{
        dispatch(deleteUser(user.userId))
    }

    const handleDesactivate = ()=>{
        dispatch(desactivateUser(user.userId))
    }

    const handleReactivate = ()=> {
        dispatch(reactivateUser(user.userId))
    }

    useEffect(() => {
        axios(`http://localhost:3001/users/${id}`).then(({ data }) => {
           if (data.username) {
              setUser(data);
           } else {
              window.alert('No hay usuario con ese ID');
           }
        });
        return setUser({});
     }, []);

    return(
        <div>
            <div className="grid place-items-center">
            <h1 className="text-3xl mt-5">{user.fullName}</h1>
            <p className="mt-2">username: {user.username} - id: {user.userId} - active: {user.active ? 'true': 'false'}</p>
            {user.active ? 
                <button className="border border-solid border-black-500 mt-2 bg-blue-800 text-white p-1 rounded-md h-8" onClick={handleDesactivate}><a href={`/admin/users/${id}`}>Desactivate</a></button>
                :
                <button className="border border-solid border-black-500 mt-2 bg-blue-800 text-white p-1 rounded-md h-8" onClick={handleReactivate}><a href={`/admin/users/${id}`}>Reactivate</a></button>
            }
            <button className="border border-solid border-black-500 mt-2 bg-red-800 text-white p-1 rounded-md" onClick={handleDelete}>Delete user</button>
            </div>
            <h2 className="text-2xl mt-10 ml-5">Orders</h2>
        </div>
    )
}

export default UserDetail