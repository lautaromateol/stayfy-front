import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getFilteredBooks } from "../../redux/actions";

const Filters = () => {

    const dispatch = useDispatch()

    const { genres, authors, publishers } = useSelector((state) => state)
    const totalPages = useSelector((state) => state.totalPages);

    const [selectedGenre, setGenre] = useState('')
    const [selectedAuthor, setAuthor] = useState('')
    const [selectedPublisher, setPublisher] = useState('')
    const [sort, setSort] = useState('')
    const [bookName, setBookName] = useState('')
    const [selectedPage, setSelectedPage] = useState(1); // Inicialmente seleccionamos la página 


    const handlePreviousPage = () => {
      if (selectedPage > 1) {
        setSelectedPage(selectedPage - 1);
      }
    };
    
    const handleNextPage = () => {
      if (selectedPage < totalPages) {
        setSelectedPage(selectedPage + 1);
      }
    };


    useEffect(() => {
        dispatch(getFilteredBooks({ 
            sort,
            genre: selectedGenre,
            author: selectedAuthor,
            publisher: selectedPublisher,
            title: bookName,
            page: selectedPage,
        })
        );
    }, [sort, selectedGenre, selectedAuthor, selectedPublisher, bookName, selectedPage])

    return (
      <div>
        <div className="grid grid-cols-[25%_25%_25%_25%]">
          <div className="mt-5 mx-auto">
            <select
              className="rounded-3xl "
              onChange={(e) => setGenre(e.target.value)}
            >
              <option hidden value="">
                Genre
              </option>
              {genres.map((genre) => {
                return <option>{genre}</option>;
              })}
            </select>
            <div className="flex justify-center mt-2">
              <p className="text-center mr-0.5 text-white border-black-500  rounded-xl p-1">
                {selectedGenre}
              </p>
              {selectedGenre ? (
                <button className="w-5 h-5 mt-1" onClick={() => setGenre("")}>
                  ❌{" "}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="mt-5 mx-auto">
            <select
              className="rounded-3xl"
              onChange={(e) => setPublisher(e.target.value)}
            >
              <option hidden value="">
                Publisher
              </option>
              {publishers.map((publisher) => {
                return <option>{publisher}</option>;
              })}
            </select>
            <div className="flex justify-center mt-2 ">
              <p className="text-center mr-0.5 text-white border-black-500 rounded-xl p-1">
                {selectedPublisher}
              </p>
              {selectedPublisher ? (
                <button
                  className="w-5 h-5 mt-1"
                  onClick={() => setPublisher("")}
                >
                  ❌{" "}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="mt-5 mx-auto">
            <select
              className="rounded-3xl"
              onChange={(e) => setAuthor(e.target.value)}
            >
              <option hidden value="">
                Author
              </option>
              {authors.map((author) => {
                return <option>{author}</option>;
              })}
            </select>
            <div className="flex justify-center mt-2">
              <p className="text-center mr-0.5 text-white border-black-500 rounded-xl p-1">
                {selectedAuthor}
              </p>
              {selectedAuthor ? (
                <button className="w-5 h-5 mt-1" onClick={() => setAuthor("")}>
                  ❌{" "}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="mt-5 mx-auto">
            <select
              className="rounded-3xl"
              onChange={(e) =>
                setSort({ field: "title", direction: e.target.value })
              }
            >
              <option hidden value="">
                Title
              </option>
              <option value="ASC">A-Z</option>
              <option value="DESC">Z-A</option>
            </select>
            <div className="flex justify-center mt-2">
              <p className="text-center mr-0.5 text-white border-black-500 rounded-xl p-1">
                {sort.direction}
              </p>
              {sort.direction ? (
                <button className="w-5 h-5 mt-1" onClick={() => setSort("")}>
                  ❌{" "}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="grid place-content-center">
          <input
            className="rounded-3xl h-9 mt-9 "
            type="text"
            placeholder="Search by name...    🔍︎"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          ></input>
        </div>

        <div className="mt-5 mx-auto flex space-x-4">

        <button
          onClick={handlePreviousPage}
          disabled={selectedPage === 1}
          className="rounded-full w-8 h-8 flex items-center justify-center bg-blue-500 text-white"
        >
          {"<"}
        </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
             (buttonPage) => (
            <button
              // key={i + 1}
              onClick={() => {
                setSelectedPage(buttonPage - 1);
              }}
              className={`rounded-full w-8 h-8 flex items-center justify-center bg-blue-500 text-white ${
                buttonPage - 1 === selectedPage ? "bg-blue-600" : ""
              }`}
            >
              {buttonPage}
            </button>
          ))}

        <button
          onClick={handleNextPage}
          disabled={selectedPage === totalPages}
          className="rounded-full w-8 h-8 flex items-center justify-center bg-blue-500 text-white"
        >
          {">"}
        </button> 

        </div>

      </div>
    );
}

export default Filters;