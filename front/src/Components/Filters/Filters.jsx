import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getFilteredBooks } from "../../redux/actions";
import Aos from "aos";
import "aos/dist/aos.css";

const Filters = () => {

    const dispatch = useDispatch()

    const { genres, authors, publishers } = useSelector((state) => state)
    const totalPages = useSelector((state) => state.totalPages);

    const [selectedGenre, setGenre] = useState('')
    const [selectedAuthor, setAuthor] = useState('')
    const [selectedPublisher, setPublisher] = useState('')
    const [sort, setSort] = useState('')
    const [publishedDate, setPublishedDate] = useState('')
    const [bookName, setBookName] = useState('')
    const [selectedRating, setRating] = useState(0)
    const [selectedPage, setSelectedPage] = useState(0); // Inicialmente seleccionamos la página 
    const ratingArray = [1, 2, 3, 4, 5];


    const handlePreviousPage = () => {
      if (selectedPage >= 1) {
        setSelectedPage(selectedPage - 1);
      }
    };
    
    const handleNextPage = () => {
      if (selectedPage < totalPages - 1) {
        setSelectedPage(selectedPage + 1);
      }
    };


    useEffect(() => {
        Aos.init({duration: 1500})
        dispatch(getFilteredBooks({ 
            sort,
            genre: selectedGenre,
            author: selectedAuthor,
            publisher: selectedPublisher,
            title: bookName,
            page: selectedPage,
            rating: selectedRating,
            publishedDate,
        })
        );
    }, [sort, selectedGenre, selectedAuthor, selectedPublisher, bookName, selectedPage, selectedRating, publishedDate])

    return (
      <div data-aos = 'fade-up'>
        <div className="grid grid-cols-[20%_20%_20%_20%_20%]">
          <div className="mt-5 mx-auto">
            <select
              className="rounded-3xl dark:bg-[#434c60] dark:text-[#F2F3F5]"
              onChange={(e) => setGenre(e.target.value)}
            >
              {/* <option hidden value="">
                Genre
              </option> */}
              <option value={""}>Select Genre 🔍︎</option>
              {genres.map((genre) => {
                return <option>{genre}</option>;
              })}
            </select>
            {/* <div className="flex justify-center mt-2">
              <p className="text-center mr-0.5 text-white border-black-500  rounded-xl p-1">
                {selectedGenre}
              </p>
              {selectedGenre ? (
                <button className="w-5 h-5 mt-1" onClick={() => setGenre("")}>
                  ✖{" "}
                </button>
              ) : (
                ""
              )}
            </div> */}
          </div>

          <div className="mt-5 mx-auto">
            <select
              className="rounded-3xl dark:bg-[#434c60] dark:text-[#F2F3F5]"
              onChange={(e) => setPublisher(e.target.value)}
            >
              <option value={""}>Select Publisher 🔍︎</option>
              {publishers.map((publisher) => {
                return <option>{publisher}</option>;
              })}
            </select>
            {/* <div className="flex justify-center mt-2 ">
              <p className="text-center mr-0.5 text-white border-black-500 rounded-xl p-1">
                {selectedPublisher}
              </p>
              {selectedPublisher ? (
                <button
                  className="w-5 h-5 mt-1"
                  onClick={() => setPublisher("")}
                >
                  ✖{" "}
                </button>
              ) : (
                ""
              )}
            </div> */}
          </div>

          <div className="mt-5 mx-auto">
            <select
              className="rounded-3xl dark:bg-[#434c60] dark:text-[#F2F3F5]"
              onChange={(e) => setAuthor(e.target.value)}
            >
              <option value={""}>Select Author 🔍︎</option>
              {authors.map((author) => {
                return <option>{author}</option>;
              })}
            </select>
            {/* <div className="flex justify-center mt-2">
              <p className="text-center mr-0.5 text-white border-black-500 rounded-xl p-1">
                {selectedAuthor}
              </p>
              {selectedAuthor ? (
                <button className="w-5 h-5 mt-1" onClick={() => setAuthor("")}>
                  ✖{" "}
                </button>
              ) : (
                ""
              )}
            </div> */}
          </div>


          <div className="mt-5 mx-auto">
          <select
            className= "rounded-3xl dark:bg-[#434c60] dark:text-[#F2F3F5]"
            value={selectedRating}
            name="rating"
            onChange={(e) => setRating(e.target.value)}    
          >
            <option value={""}>Min rating 🔍︎</option>
            {ratingArray.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="mt-5 mx-auto"> <p> Sort By:</p></div> */}

          <div className="mt-5 mx-auto">
            <select
              className="rounded-3xl dark:bg-[#434c60] dark:text-[#F2F3F5]"
              onChange={(e) =>
                setSort({ field: "title", direction: e.target.value })
              }
            >
              <option value={""}>Sort By Title</option>
              <option value="ASC">A-Z</option>
              <option value="DESC">Z-A</option>
            </select>
            {/* <div className="flex justify-center mt-2">
              <p className="text-center mr-0.5 text-white border-black-500 rounded-xl p-1">
                {sort.direction}
              </p>
              {sort.direction ? (
                <button className="w-5 h-5 mt-1" onClick={() => setSort("")}>
                  ✖{" "}
                </button>
              ) : (
                ""
              )}
            </div> */}
          </div>

          <div className="mt-5 mx-auto">
            <select
              className="rounded-3xl dark:bg-[#434c60] dark:text-[#F2F3F5]"
              onChange={(e) => setPublishedDate(e.target.value)} 
            >
              <option value={""}> Sort By Date </option>
              <option value="ASC">Latest</option>
              <option value="DESC">Older</option>
            </select>
          </div>



        <div className="grid place-content-center">
          <input
            className="rounded-3xl dark:bg-[#434c60] dark:text-[#F2F3F5]"
            type="text"
            placeholder="Search by name...           🔍︎"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          ></input>
        </div>

</div>

        {/* PAGINADO */}
        <div class="flex items-center justify-center border-gray-200 bg-[#74A89B] bg-opacity-30 p-3"
        style={{
          
          backgroundClip: 'padding-box',  // Evita que el fondo se extienda a través del borde

          boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.35)'  // Aplica un efecto de sombra para lograr un borde difuminado
        }}>
  <button
    onClick={handlePreviousPage}
    disabled={selectedPage === 0}
    class="inline-flex items-center rounded-full border border-gray-300 bg-white dark:bg-stone-400 dark:hover:bg-stone-500 dark:boder-stone-400 px-3 py-1 text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none"
  >
    {"<"}
  </button>

  {Array.from({ length: totalPages }, (_, i) => i).map((buttonPage) => (
    <button
      onClick={() => {
        setSelectedPage(buttonPage);  
      }}
      key={buttonPage}
      class={`mx-2 inline-flex items-center px-4 py-2 text-base font-semibold rounded-full ${
        buttonPage === selectedPage
          ? 'bg-[#756558] text-white dark:bg-blue-800'
          : 'bg-white text-gray-700 hover:bg-gray-200 dark:bg-stone-400 dark:hover:bg-stone-500 dark:boder-stone-400'
      }`}
    >
      {buttonPage + 1}
    </button>
  ))}

  <button
    onClick={handleNextPage}
    disabled={selectedPage === totalPages - 1}
    class="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none dark:bg-stone-400 dark:hover:bg-stone-500 dark:boder-stone-400"
  >
    {">"}
  </button>
</div>

        </div>


    );
}

export default Filters;