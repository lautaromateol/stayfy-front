/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Aos from "aos"
import 'aos/dist/aos.css'
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
  });
  const [error, setError] = useState({});
  // eslint-disable-next-line no-unused-vars
  
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/users/forgot-password", { email: input.email }) // Pass email from input state
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

    useEffect(()=> {
    Aos.init({duration: 1500})
    // const logged = window.localStorage.getItem("logged")
    // const user = JSON.parse(logged)
    // setUser(user)
    // console.log(user)
  },[])

  





  return (
    <div className="bg-[#A4BCB3] h-screen dark:bg-gray-900">
      <div className="flex justify-center" data-aos = 'fade-up'>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center md:flex-row shadow rounded-3xl max-w-7xl md:w-[50%]  m-2 mt-16 bg-white">
          <div className=" w-full md:w-3/4">
            <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
              <h1 className="font-semibold text-xl md:text-3xl text-gray-600 m-2">
                Reset password
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
              <div className="flex flex-col">
                <h2 className="text-lg text-gray-500 text-semibold">Email</h2>
                <input
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                  className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                />
                {error.email && <span className="text-red-500">{error.email}</span>}
              </div>
            </div>
            <div className="flex flex-col items-center text-center mt-7">
              <button 
              type="submit"  
              className="lg:w-[340px] px-24 md:px-[118px] lg:px-[110px] py-2 rounded-md text-white bg-stone-600 hover:bg-stone-500  font-medium m-2 mb-3 "
              onClick={handleSubmit}
              >
                Send
              </button>
              <span className="mb-6">Don't have an account? Register <Link to='/register' className="text-yellow-500">here.</Link></span>
            </div>
          </div>
        </form>
      </div>
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </div>
  );
};

export default ForgotPassword;
