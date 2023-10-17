import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getGenres, getTitles } from "../../../redux/actions";
import { BACKEND_URL, DEFAULT_IMAGE } from "../../../../utils";
import { Link } from "react-router-dom";

export default function UpdateBook() {
  const dispatch = useDispatch();
  const { genres, titles, allBooks } =  useSelector((state) => state);
  const ratingArray = [0, 1, 2, 3, 4, 5];

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const [form, setForm] = useState({
    id: "",
    title: "",
    authors: [""],
    publisher: "",
    image: "",
    publishedDate: 0,
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
  // const [authors, setAuthors] = useState([""]);


  // const updateAuthor = (index, value) => {
  //   const updatedAuthors = [...authors];
  //   updatedAuthors[index] = value;
  //   setAuthors(updatedAuthors);
  //   setForm({
  //     ...form,
  //     authors: updatedAuthors,
  //   });
  // };

  // const removeAuthor = (index) => {
  //   const updatedAuthors = authors.filter((_, i) => i !== index);
  //   setAuthors(updatedAuthors);
  //   setForm({
  //     ...form,
  //     authors: updatedAuthors,
  //   });
  // }
  
  // const addAuthorInput = () => {
  //   setAuthors([...authors, ""]);
  // };

  const updateAuthor = (index, value) => {
    const updatedAuthors = [...form.authors];
    updatedAuthors[index] = value;
    setForm({
      ...form,
      authors: updatedAuthors,
    });
  };

  const removeAuthor = (index) => {
    const updatedAuthors = form.authors.filter((_, i) => i !== index);
    setForm({
      ...form,
      authors: updatedAuthors,
    });
  };



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
  
  // const validatePublishedDate = (publishedDate) => {
  //   const regex = /^\d{4}-\d{2}-\d{2}$/; // Expresión regular para el formato de fecha (yyyy-mm-dd)
  
  //   if (publishedDate && !regex.test(publishedDate)) {
  //     setError({ ...error, publishedDate: "Invalid publucation date. Please use yyyy-mm-dd format." });
  //     return false;
  //   } else {
  //     setError({ ...error, publishedDate: "" });
  //     return true;
  //   }
  // };

  const validatePublishedDate = (publishedDate) => {
  
      if (publishedDate && !Number.isInteger(publishedDate)) {
        setError({ ...error, publishedDate: "Year of publication must be an integer." });
        return false;
      } else if (publishedDate && publishedDate < 1) {
        setError({ ...error, publishedDate: "Year of publication must be above 0." });
        return false;
      } else if (publishedDate && publishedDate > 2023) {
        setError({ ...error, publishedDate: "The input year has not come yet." });
        return false;
      } else {
        setError({ ...error, publishedDate: "" });
        return true;
      }
    };

    const validatePageCount = (pageCount) => {
      if (pageCount && !Number.isInteger(pageCount)) {
        setError({ ...error, pageCount: "Page count must be an integer." });
        return false;
      } else if (pageCount && pageCount < 1) {
        setError({ ...error, pageCount: "Page count must be above 0." });
        return false;
      } else {
        setError({ ...error, pageCount: "" });
        return true;
      }
    };
  

  const validatePrice = (price) => {
    if (price && !Number.isInteger(price)){
      setError({ ...error, price: "Price must be an integer." })
      return false;
    }
    else if (price && price < 1) {
      setError({ ...error, price: "Price must be above 0." })
      return false;
    } else {
      setError({ ...error, price: "" })
      return true;
    }
  };

  // const validateRating = (rating) => {
  //   if (rating && !Number.isInteger(rating)){
  //     setError({ ...error, price: "Rating must be an integer." })
  //     return false;
  //   }
  //   else if (rating && rating < 1) {
  //     setError({ ...error, rating: "Rating must be between 1 and 5" })
  //     return false;
  //   }
  //   else if (rating && rating > 5) {
  //     setError({ ...error, rating: "Rating must be between 1 and 5" })
  //     return false;
  //   } else {
  //     setError({ ...error, rating: "" })
  //     return true;
  //   }
  // };

  const validateForm = ( title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating ) => {
    if (
      (!title || title === "") &&
      (!authors || authors.length === 0 || authors == [] || authors == [""]) &&
      (!publisher || publisher === "") &&
      (!image || image === "") &&
      (!publishedDate || publishedDate === "") &&
      (!pageCount || pageCount == 0) &&
      (!genre || genre === "") &&
      (!price || price == 0) &&
      (!description || description === "") &&
      (!rating || rating === "" || rating == 0))
    {
      return false;
    } else {
      return true;
    }
  };
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateID(form.id)) {
      alert("You must select a book in order to update it.");
      return;
    };
    const { title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating } = form 
    if (!validateForm( title, authors, publisher, image, publishedDate, pageCount, genre, price, description, rating )){
      alert("You must select at least one parameter to update the book.");
      return;
    };
    console.log("Form Data:", form); // VALIDACIÓN EN PROCESO
    axios
    .put(`${BACKEND_URL}/books/update`, {
      ...form,
      genre: form.genre.toString(),
      rating: parseInt(form.rating),
    })
    .then((res) => {
      setSuccess("Book updated successfully!");
      setError({});
      alert("Book updated successfully!");
    })
    .catch((err) => {
      setError({ ...error, error: "There was an error." });
      setSuccess("");
      alert("There was an error.");
    });
  };


  return (
    <div className="container mx-auto mt-8">
      <div className="text-2xl font-semibold mb-4">
        <h2>UPDATE EXISTING BOOK</h2>
      </div>
      {success && <div className="text-green-600 mb-2">{success}</div>}{" "}
      {/* Mostrar el mensaje de éxito */}
      {error.error && (
        <div className="text-red-600 mb-2">{error.error}</div>
      )}{" "}
      {/* Mostrar el mensaje de error */}
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="id"
          >
            Select book (id - title):
          </label>
          <select
            required
            value={form.id}
            name="id"
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
            <option value={""}> Select book </option>
            {allBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.id}
                {" - "}
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
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

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="authors"
          >
            Authors:
          </label>
          {form.authors.map((author, index) => (
            <div key={index}>
              <input
                type="text"
                value={author}
                onChange={(e) => updateAuthor(index, e.target.value)}
              />
              <button onClick={() => removeAuthor(index)}>Remove</button>
            </div>
          ))}
        </div>

        {/* Input adicional para agregar automáticamente un nuevo autor */}
        <input
          type="text"
          value=""
          onChange={(e) => {
            const newAuthor = e.target.value;
            if (newAuthor) {
              setForm({
                ...form,
                authors: [...form.authors, newAuthor],
              });
            }
          }}
          placeholder="Add Author"
        />

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="publisher"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="publishedDate"
          >
            Year of Publication:
          </label>
          <input
            type="intiger"
            value={form.publishedDate}
            onChange={(event) => {
              changeHandlder(event);
              validatePublishedDate(event.target.value);
            }}
            name="publishedDate"
            className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="pageCount"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="genre"
          >
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
            <option value={""}> Select genre </option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="rating"
          >
            Rating:
          </label>
          <select
            value={form.rating}
            name="rating"
            onChange={(event) => {
              const selectedRating = Array.from(
                event.target.selectedOptions,
                (option) => option.value
              );
              setForm({ ...form, rating: selectedRating });
              console.log(form.id);
            }}
          >
            <option value={""}> Select rating </option>
            {ratingArray.map((rating) => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          {!success && (
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Update Book
            </button>
          )}
        </div>

        <div className="mb-4">
          {success && (
            <a
              href="/admin/update-book"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Update another book
            </a>
          )}
        </div>

        <div className="mb-4">
          {success && (
            <Link
              to={`/product-page/${form.id}`}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-green-300"
            >
              View updated book
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};