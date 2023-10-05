import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { desactivateUser, reactivateUser, deleteUser } from "../../../redux/actions"
import { useDispatch } from "react-redux"

const UserDetail = ()=>{

    const {id} = useParams()

    const [user, setUser] = useState({})

    const [active, setActive] = useState(user.active)

    const dispatch = useDispatch()

    const fetchUser = async()=> {
        try {
            const {data} = await axios.get(`http://localhost:3001/users/${id}`)
            if(data) setUser(data)
        } catch (error) {
            alert("This user doesn't exist")
        }
    }

    const handleDelete = ()=>{
        dispatch(deleteUser(user.userId))
    }

    const handleDesactivate = ()=>{
        dispatch(desactivateUser(user.userId))
        setActive(!active)
    }

    const handleReactivate = ()=> {
        dispatch(reactivateUser(user.userId))
        setActive(!active)
    }

    useEffect(()=>{
        fetchUser()
    }, [active])

    return(
        <div>
            <div className="grid place-items-center">
            <h1 className="text-3xl mt-5">{user.fullName}</h1>
            <p className="mt-2">username: {user.username} - id: {user.userId} - active: {active ? 'true': 'false'}</p>
            {active ? 
                <button className="border border-solid border-black-500 mt-2 bg-blue-800 text-white p-1 rounded-md h-8" onClick={handleDesactivate}>Desactivate</button>
                :
                <button className="border border-solid border-black-500 mt-2 bg-blue-800 text-white p-1 rounded-md h-8" onClick={handleReactivate}>Reactivate</button>
            }
            <button className="border border-solid border-black-500 mt-2 bg-red-800 text-white p-1 rounded-md" onClick={handleDelete}>Delete user</button>
            </div>
            <h2 className="text-2xl mt-10 ml-5">Orders</h2>
        </div>
    )
}

export default UserDetail