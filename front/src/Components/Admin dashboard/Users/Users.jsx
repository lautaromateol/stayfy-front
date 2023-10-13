import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers } from '../../../redux/actions'

const Users = () => {

    const dispatch = useDispatch()

    const { users } = useSelector((state) => state)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <div className="h-screen">
            <div>
                <h1 className="text-center text-3xl mt-5">Users admin-dashboard</h1>
                <div className="grid grid-cols-[20%_20%_20%_20%_20%] place-items-center mt-5">
                    <strong>User Id</strong>
                    <strong>Username</strong>
                    <strong>Email</strong>
                    <strong>Full Name</strong>
                    <strong>Date registered</strong>
                </div>
                {users.map((user) => {
                    return (
                        <div className="grid grid-cols-[20%_20%_20%_20%_20%] place-items-center">
                            <div className="mt-2">
                                <p>
                                {user.userId}
                                </p>
                                    
                            </div>
                            <div className="mt-2 underline">
                            <Link to={`/admin/users/${user.userId}`}>
                            {user.username}
                            </Link>
                            </div>
                            <div className="mt-2">
                                <p>
                                {user.email}
                                </p>
                            </div>
                            <div className="mt-2">
                                <p>
                                {user.fullName}
                                </p>
                            </div>
                            <div className="mt-2">
                                <p>
                                {user.dateRegistered}    
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Users;