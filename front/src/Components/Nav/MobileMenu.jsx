import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext"
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getFilteredBooks } from "../../redux/actions"
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

const MobileMenu = () => {

    const { user, signOut } = useUser();

    const [dropdown, setDropdown] = useState(false)

    const dispatch = useDispatch()

    const genres = useSelector((state) => state.genres)

    const navigate = useNavigate();

    const handleNavigation = (genre) => {
        navigate(`/genre/${genre}`);
        dispatch(getFilteredBooks({ genre: genre }));
    };

    useEffect(() => {
        Aos.init({duration: 200})
        dispatch(getGenres())
    }, [])

    return (
        // <div className="min-h-screen">
        <div className="flex flex-col items-end bg-gray-200 pb-4 max-w-2xl border">

            {
                user ?
                    <>
                        <div className="p-2">
                            <p onClick={signOut}>Sign Out</p>
                        </div>
                    </>
                    :
                    <>
                        <div className="p-2">
                            <a href="/login">Login</a>
                        </div>
                        <div className="p-2">
                            <a href="/register">Register</a>
                        </div>
                    </>
            }

            <div className="px-2">
                <span className="underline" onClick={() => setDropdown(!dropdown)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="inline-block mr-1 w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    Collections
                </span> 
            </div>
            {
                dropdown ?
                <div data-aos="fade-down" className="flex flex-col items-end px-2">
                {
                    genres.map((genre) => {
                        return (
                            <p onClick={() => handleNavigation(genre)}>{genre}</p>
                        )
                    })
                }
            </div>
                :
                ""
            }
            
        </div>
        // </div>
    )
}

export default MobileMenu
