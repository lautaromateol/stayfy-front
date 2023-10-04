import { useSelector } from "react-redux";

const Users = ()=>{

    const users = [
        {
        userId: '1',
        username: 'lautaromateol',
        email: 'lau@gmail',
        passwordHash: '211',
        fullName: 'Lautaro Mateo Leguizamon',
        dateRegistered: '22/12/2023',
        isAdmin: false,
    },
    {
        userId: '2',
        username: 'lautaromateol',
        email: 'lau@gmail',
        passwordHash: '211',
        fullName: 'Lautaro Mateo Leguizamon',
        dateRegistered: '22/12/2023',
        isAdmin: false
    },
    {
        userId: '3',
        username: 'lautaromateol',
        email: 'lau@gmail',
        passwordHash: '211',
        fullName: 'Lautaro Mateo Leguizamon',
        dateRegistered: '22/12/2023',
        isAdmin: false
    },
    {
        userId: '4',
        username: 'lautaromateol',
        email: 'lau@gmail',
        passwordHash: '211',
        fullName: 'Lautaro Mateo Leguizamon',
        dateRegistered: '22/12/2023',
        isAdmin: false
    }
]

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
                        <div className="mt-2">
                            {user.username}
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