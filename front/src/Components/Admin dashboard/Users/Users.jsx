import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from '../../../redux/actions'

const Users = ()=>{

    const dispatch = useDispatch()

    const {users} = useSelector((state) => state)

    useEffect(()=>{
        dispatch(getUsers())
    }, [])

    return(
        <div>
            <h1 className="text-center text-3xl mt-5">Users admin-dashboard</h1>
            <div className="grid grid-cols-[20%_20%_20%_20%_20%] place-items-center mt-5">
                <div><strong>User Id</strong></div>
                <div><strong>Username</strong></div>
                <div><strong>Email</strong></div>
                <div><strong>Full Name</strong></div>
                <div><strong>Date registered</strong></div>
            </div>
            {users.map((user)=> {
                return(
                    <div className="grid grid-cols-[20%_20%_20%_20%_20%] place-items-center">
                        <div className="mt-2">
                            {user.userId}
                        </div>
                        <div className="mt-2 underline">
                            <Link to={`/admin/users/${user.userId}`}>
                            {user.username}
                            </Link>
                        </div>
                        <div className="mt-2">
                            {user.email}
                        </div>
                        <div className="mt-2">
                            {user.fullName}
                        </div>
                        <div className="mt-2">
                            {user.dateRegistered}
                        </div>
                    </div>
                )
            })}
            </div>
    )
}

export default Users;