import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredBooks, getGenres } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const CollectionsNav = ()=> {

    const navigate = useNavigate();

    const handleNavigation = (genre) => {
        navigate(`/genre/${genre}`);
        dispatch(getFilteredBooks({ genre: genre }));
      };
    
    const genres = useSelector((state) => state.genres)

    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(getGenres())
    }, [])


    return (
        <div className="flex justify-around items-center w-full h-10 bg-green-700 sm:flex hidden">
            {genres.map((genre) => {
                return(
                    <a className="cursor-pointer text-white font-medium text-sm underline" onClick={() => handleNavigation(genre)}>{genre}</a>
                )
            })}
        </div>
    )

}

export default CollectionsNav;