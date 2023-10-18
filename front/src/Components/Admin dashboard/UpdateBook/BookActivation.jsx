import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getGenres } from "../../../redux/actions";
import { BACKEND_URL } from "../../../../utils";
import { Link } from "react-router-dom";

export default function BookActivation() {
  const dispatch = useDispatch();
  const { allBooks } = useSelector((state) => state);
  const [form, setForm] = useState({
    id: "",
  });

  const [error, setError] = useState({
    id: "",
  });

  const [success, setSuccess] = useState("");

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.id) {
      alert("You must select a book to update its status.");
      return;
    }

    let resStatus = null;
    const status = (res) => {
        if(res.data.active === true){
            resStatus = "active";
        } else if (res.data.active === false){
            resStatus = "inactive";
        }
    }
    axios
      .put(`${BACKEND_URL}/books/activation`, form)
      .then((res) => {
        status(res);
        setSuccess(`Book status updated successfully to ${resStatus}`);
        setError({});
        alert(`Book status updated successfully to ${resStatus}`);
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
        <h2>ACTIVATE OR DEACTIVATE EXISTING BOOK</h2>
      </div>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error.error && <div className="text-red-600 mb-2">{error.error}</div>}

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
            onChange={changeHandler}
            className="block w-full mt-1 py-2 px-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select book</option>
            {allBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.id} - {book.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          {success && (
            <Link
              to={`/product-page/${form.id}`}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-green-300"
            >
              View Updated Book
            </Link>
          )}
        </div>

        <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Change Book Status
            </button>
        </div>

        <div className="mb-4">
          {success && (
            <a
              href="/admin/activate-book"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Update Another Book Status
            </a>
          )}
        </div>


        <div className="mb-4">
            <Link
              to={"/admin/update-book"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
            >
              Update Books Properties
            </Link>
        </div>

      </form>
    </div>
  );
}
