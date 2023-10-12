import { useDispatch } from "react-redux";
import { getFilteredBooks } from "../../redux/actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";





const Buttons = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handlerHorror = () => {
      // navigate('/store')
      useEffect(() => {
        navigate('/store')
        dispatch(getFilteredBooks({
            genre: "Horror",
          })
        );
      }, []);
    };
    
    useEffect(() => {
        Aos.init({duration: 1500})
    }, [])

    return (
        <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-medium text-stone-600 bg-gray-200 w-full py-3 mb-5 shadow-2xl shadow-gray-400 dark:bg-gray-900 px-12 dark:text-gray-100 dark:shadow-transparent dark:border-b-2 dark:border-gray-600">Genres</div>
            <div className="grid grid-cols-[33%_33%_33%] gap-10" data-aos = 'fade-up'>
                <button onClick={handlerHorror}>
                    <img className="rounded-xl shadow-2xl shadow-gray-600 dark:shadow-transparent"  src="https://res.cloudinary.com/dhqudb28a/image/upload/v1697066639/Horror_n7hieu.png" alt="Horror" />
                </button>
                <button>
                    <img className="rounded-xl shadow-2xl shadow-gray-600 dark:shadow-transparent" src="https://res.cloudinary.com/dhqudb28a/image/upload/v1697066639/Self-Help_hx1zlq.png" alt="Self-Help" />
                </button>
                <button>
                    <img className="rounded-xl shadow-2xl shadow-gray-600 dark:shadow-transparent" src="https://res.cloudinary.com/dhqudb28a/image/upload/v1697066640/Sci-Fi_dqnk1g.png" alt="Sci-Fi" />
                </button>
                <button>
                    <img className="rounded-xl shadow-2xl shadow-gray-600 dark:shadow-transparent" src="https://res.cloudinary.com/dhqudb28a/image/upload/v1697066639/Romance_yf4mk7.png" alt="Romance" />
                </button>
                <button>
                    <img className="rounded-xl shadow-2xl shadow-gray-600 dark:shadow-transparent" src="https://res.cloudinary.com/dhqudb28a/image/upload/v1697066639/Detective_ffra1y.png" alt="Mystery & Detective" />
                </button>
                <button>
                    <img className="rounded-xl shadow-2xl shadow-gray-600 dark:shadow-transparent" src="https://res.cloudinary.com/dhqudb28a/image/upload/v1697068675/Comedy_hpy0z0.png" alt="Comedy" />
                </button>
            </div>
        </div>
    )
}

export default Buttons;