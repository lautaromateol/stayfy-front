import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getGenres, getTitles } from "../../../redux/actions";
import { BACKEND_URL, DEFAULT_IMAGE } from "../../../../utils";

export default function UpdateBook() {
  const dispatch = useDispatch();
  const { genres, titles, allBooks } =  useSelector((state) => state);
//   const sortedBooks = allBooks.sort();


  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const [form, setForm] = useState({
    id: "",
    title: "",
    authors: [],
    publisher: "",
    image: "",
    publishedDate: "",
    pageCount: 0,
    genre: "",
    price: 0,
    description: "",
    rating: 0,
  });

  const [error, setError] = useState({
    id: "",
    title: "",
    authors: [],
    publisher: "",
    image: "",
    publishedDate: "",
    pageCount: "",
    genre: "",
    price: "",
    description: "",
    rating: "",
  });

  const [success, setSuccess] = useState(""); 

  const changeHandlder = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
  };

  const validateID = (id) => {
    if (!id || id === "") {
      setError({ ...error, id: "You must select a book in order to update it." })
      return false;
    } else {
      setError({ ...error, id: "" })
      return true;
    }
  };

  const validateImage = (image) => {
    const regex = /^https?:\/\/(?:www\.)?\S+\.(?:jpg|jpeg|gif|png)$/;
    if (image && !regex.test(image)) {
      setError({ ...error, image: "Invalid image URL." });
      return false;
    } else {
      setError({ ...error, image: "" });
      return true;
    }
  };  
  
  const validatePublishedDate = (publishedDate) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Expresión regular para el formato de fecha (yyyy-mm-dd)
  
    if (publishedDate && !regex.test(publishedDate)) {
      setError({ ...error, publishedDate: "Invalid date of birth. Please use yyyy-mm-dd format." });
      return false;
    } else {
      setError({ ...error, publishedDate: "" });
      return true;
    }
  };


    const validatePageCount = (pageCount) => {
      if (pageCount && !Number.isInteger(pageCount)) {
        setError({ ...error, pageCount: "Page count must be an integer." });
      } else if (pageCount && pageCount < 1) {
        setError({ ...error, pageCount: "Page count must be above 0." });
      } else {
        setError({ ...error, pageCount: "" });
      }
    };
  

  const validatePrice = (price) => {
    if (price && !Number.isInteger(price)){
      setError({ ...error, price: "Price must be an integer." })
    }
    else if (price && price < 1) {
      setError({ ...error, price: "Price must be above 0." })
    } else {
      setError({ ...error, price: "" })
    }
  };

  const validateRating = (rating) => {
    if (rating && !Number.isInteger(rating)){
      setError({ ...error, price: "Price must be an integer." })
    }
    else if (rating && rating < 1) {
      setError({ ...error, rating: "Price must be above 0." })
    } else {
      setError({ ...error, rating: "" })
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateID(form.id)) {
      alert("You must select a book in order to update it.");
      return;
    };
    console.log("Form Data:", form); // VALIDACIÓN EN PROCESO
    axios
    .put(`${BACKEND_URL}/books/update`, {
      ...form,
    //   genres: form.genre,
    })
    .then((res) => {
      setSuccess("Book updated successfully!");
      setError({});
    })
    .catch((err) => {
      setError({ ...error, error: "There was an error." })
      setSuccess("");
    });
  };


  return (
    <div className="container mx-auto mt-8">
      <div className="text-2xl font-semibold mb-4">
        <h2>UPDATE EXISTING BOOK</h2>
      </div>
      {success && <div className="text-green-600 mb-2">{success}</div>}{" "}     {/* Mostrar el mensaje de éxito */}
      {error.error && <div className="text-red-600 mb-2">{error.error}</div>}{" "}  {/* Mostrar el mensaje de error */}
      
      <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
            Select book (id - title):
        </label>
        <select
          required
          value={form.id}
          name="id"
        //   onChange={changeHandlder}
          onChange={(event) => {
            const selectedBook = Array.from(
              event.target.selectedOptions,
              (option) => option.value
            );
            setForm({ ...form, id: selectedBook });
            console.log(form.id);
          }}
          className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          {allBooks.map((book) => (
            <option key={book.id} value={book.id}>
              {book.id}{" - "}{book.title}
            </option>
          ))}
        </select>
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title:
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(event) => {
            changeHandlder(event);
          }}
          name="title"
          className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authors">
            Authors (comma-separated):
        </label>
        <input
          type="text"
          value={form.authors}
          onChange={(event) => {
            const authors = event.target.value
              .split(",")
              .map((author) => author.trim());
            changeHandlder({ target: { name: "authors", value: authors } });
          }}
          name="authors"
          className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publisher">
            Publisher:
        </label>
        <input
          type="text"
          value={form.publisher}
          onChange={(event) => {
            changeHandlder(event);
          }}
          name="publisher"
          className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image:
        </label>
        <input
          type="url"
          value={form.image}
          onChange={(event) => {
            changeHandlder(event);
            validateImage(event.target.value);
          }}
          name="image"
          className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        </div>

        <div className="mb-4"> 
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
            Year of publication:
        </label>
        <input
          type="date"
          value={form.publishedDate}
          onChange={(event) => {
            changeHandlder(event);
            validatePublishedDate(event.target.value);
          }}
          name="publishedDate"
        />
        </div> 

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pageCount">
            Page Count:
        </label>
        <input
          type="intiger"
          value={form.pageCount}
          onChange={(event) => {
            changeHandlder(event);
            validatePageCount(event.target.value);
          }}
          name="pageCount"
          className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        </div>

        <div className="mb-4"> 
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">
            Genre:
        </label>
        <select
          value={form.genre}
          name="genre"
          onChange={(event) => {
            const selectedGenre = Array.from(
              event.target.selectedOptions,
              (option) => option.value
            );
            setForm({ ...form, genre: selectedGenre });
            console.log(form.id);
          }}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price:
        </label>
        <input
          type="intiger"
          value={form.price}
          onChange={(event) => {
            changeHandlder(event);
            validatePrice(event.target.value);
          }}
          name="price"
          className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        </div>


        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description:
        </label>
        <textarea
          value={form.description}
          onChange={(event) => {
            changeHandlder(event);
            validateDescription(event.target.value);
          }}
          name="description"
          className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
            Rating:
        </label>
        <input
          type="intiger"
          value={form.rating}
          onChange={(event) => {
            changeHandlder(event);
            validateRating(event.target.value);
          }}
          name="rating"
          className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            Update Book
          </button>
        </div>

      </form>
    </div>
  );
};