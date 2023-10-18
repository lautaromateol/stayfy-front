import React, { useState } from "react";
import validation from "./validation";
import { useDispatch } from "react-redux";
import { postBook } from "../../redux/actions";
import axios from "axios";
import { BACKEND_URL } from "../../../utils";

const AddBook = () => {
  
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    title: "",
    authors: "",
    publisher: "",
    image: "",
    publishedDate: "",
    pageCount: "",
    genre: "",
    price: "",
    description: "",
  });

  const [error, setError] = useState({});

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setError(
      validation({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleImageChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        console.error("Tipo de archivo no válido");
        return;
      }

      // formData.append("file", file);
      formData.append("image", file);

      try {
        const response = await axios.post(
          `${BACKEND_URL}/books/uploads`,
          // "http://localhost:3001/books/uploads",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          setInput((prevInput) => ({
            ...prevInput,
            image: response.data.secure_url,
          }));
        } else {
          console.error("Error al cargar la imagen_1");
        }
      } catch (error) {
        console.error("Error al cargar la imagen_2", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(postBook(input));
    alert("Your book has been added succesfully");
    setInput({
      title: "",
      authors: "",
      publisher: "",
      image: "",
      publishedDate: "",
      pageCount: "",
      genre: "",
      price: "",
      description: "",
    });
  };

  return (
    <div className="bg-[#A4BCB3] dark:bg-gray-900 h-screen">
      <div className="flex justify-center w-full">
        <div className="flex flex-col justify-center items-center max-w-7xl w-[90%]">
          <div className="flex flex-col justify-center text-center space-y-3 my-9">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-300">
              Add a new book
            </h1>
            <p className="text-gray-700 text-lg dark:text-gray-300">
              Add your favorite book in just a few steps.
            </p>
          </div>
          <div className="flex flex-col justify-center lg:w-full lg:flex-row items-center lg:space-x-10 xl:space-x-24 ">
            <form className="bg-gray-200 shadow-2xl flex justify-center md:w-full mb-7 md:mx-16 lg:mx-0 px-8 py-4  lg:py-8 rounded-lg">
              <div className="w-full">
                <div className="flex flex-col justify-between items-center lg:flex-row space-y-1 lg:space-y-0 my-5">
                  <div className="flex flex-col w-full items-center">
                    <h1 className="font-semibold mb-2 text-lg">Title</h1>
                    <input
                      className="bg-slate-100 rounded-lg  px-2 py-1 placeholder:text-gray-600 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500"
                      name="title"
                      type="text"
                      value={input.title}
                      onChange={handleChange}
                    />
                    {error.title && <span className="text-red-500">{error.title}</span>}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center lg:flex-row space-y-1 lg:space-y-0  my-5">
                  <div className="flex flex-col w-full items-center">
                    <h1 className="font-semibold mb-2 text-lg">Authors</h1>
                    <input
                      className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-600 w-[80%] lg:w-[60%] focus:border   focus:outline-none focus:border-blue-500"
                      name="authors"
                      type="text"
                      value={input.authors}
                      onChange={handleChange}
                    />
                    {error.authors && <span className="text-red-500">{error.authors}</span>}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center lg:flex-row space-y-1 lg:space-y-0  my-5">
                  <div className="flex flex-col w-full items-center">
                    <h1 className="font-semibold mb-2 text-lg">Publisher</h1>{" "}
                    <input
                      className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-600 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500"
                      name="publisher"
                      type="text"
                      value={input.publisher}
                      onChange={handleChange}
                    />
                    {error.publisher && <span className="text-red-500">{error.publisher}</span>}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center lg:flex-row space-y-1 lg:space-y-0  my-5">
                  <div className="flex flex-col w-full items-center">
                    <h1 className="font-semibold mb-2 text-lg">Image</h1>
                    <input
                      className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-600 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500"
                      name="image"
                      type="file"
                      accept=".jpg,.jpeg,.png" 
                      onChange={handleImageChange}
                    />
                    {/* value={input.image}onChange={handleChange} */}
                    {error.image && <span className="text-red-500">{error.image}</span>}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-center lg:flex-row space-y-1 lg:space-y-0  my-5">
                  <div className="flex flex-col w-full items-center">
                    <h1 className="font-semibold mb-2 text-lg">Year of publication</h1>
                    <input
                      className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-600 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500"
                      name="publishedDate"
                      type="text"
                      value={input.publishedDate}
                      onChange={handleChange}
                    />
                    {error.publishedDate && <span className="text-red-500">{error.publishedDate}</span>}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex flex-col justify-between items-center lg:flex-row space-y-1 lg:space-y-0 my-5">
                    <div className="flex flex-col w-full items-center">
                    <h1 className="font-semibold mb-2 text-lg">Number of pages</h1>
                    <input
                        name="pageCount"
                        type="text"
                        value={input.pageCount}
                        onChange={handleChange}
                        className="bg-slate-100 rounded-lg px-2 py-1 w-[80%] lg:w-[60%] placeholder:text-gray-300 focus:border focus:outline-none focus:border-blue-500"
                    />
                    {error.pageCount && <span className="text-red-500">{error.pageCount}</span>}
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center lg:flex-row space-y-1 lg:space-y-0 my-5">
                    <div className="flex flex-col w-full items-center">
                    <h1 className="font-semibold mb-2 text-lg">Genre</h1>
                    <select 
                        name="genre"
                        type="select"
                        value={input.genre}
                        onChange={handleChange}
                        className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-300 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500">
                          <option value='' disabled defaultValue>Genre</option>
                          <option value="Self-help">Self help</option>
                          <option value="Horror">Horror</option>
                          <option value="Sci-Fi">Science Fiction</option>
                          <option value="Mystery & Detective">Mystery & Detective</option>
                          <option value="Comedy">Comedy</option>
                          <option value="Romance">Romance</option>
                    </select>
                    {error.genre && <span className="text-red-500">{error.genre}</span>}
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center lg:flex-row space-y-1 lg:space-y-0 my-5">
                    <div className="flex flex-col w-full items-center">
                    <h1 className="font-semibold mb-2 text-lg">Price</h1>
                    <input
                        name="price"
                        type="text"
                        value={input.price}
                        onChange={handleChange}
                        className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-300 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500"
                    />
                    {error.price && <span className="text-red-500">{error.price}</span>}
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center lg:flex-row space-y-1 lg:space-y-0 my-5">
                    <div className="flex flex-col w-full items-center">
                    <h1 className="font-semibold mb-2 text-lg">Description</h1>
                    <input
                        name="description"
                        type="text"
                        value={input.description}
                        onChange={handleChange}
                        className="bg-slate-100 rounded-lg px-2 py-1 placeholder:text-gray-300 w-[80%] lg:w-[60%] focus:border focus:outline-none focus:border-blue-500"
                    />
                    {error.description && <span className="text-red-500">{error.description}</span>}
                    </div>
                </div>
                <div className="w-4/5 flex justify-end">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-stone-500 text-white mt-7 px-6 py-3 rounded-md before:ease relative h-12 w-40 overflow-hidden border border-stone-500  shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-stone-500 hover:before:-translate-x-40"
                        disabled={error.title || error.authors || error.publisher || !input.image || error.publishedDate || error.pageCount || error.genre || error.price || error.description || !input.title}
                    >
                        Add Book
                    </button>
                </div>
                </div>
              {/* <div className="text-center md:text-left lg:text-right text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5  mr-2 mb-2  my-5">  */}
              {/* </div>  */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;