import React, { useState, useEffect } from "react";
import Google from "../../Components/Google/Google";
import validation from "./validations/loginValidations";
import { Link } from "react-router-dom";
import loginAction from "../../redux/login";

const LogIn = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [user, setUser] = useState(null)

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setInput({
      username: "",
      password: "",
    })
    try {
      const user = await loginAction.login({
        username: input.username,
        password: input.password
      })
      console.log(user);
      setUser(user)
      
      window.localStorage.setItem("logged", JSON.stringify(user))
    } catch (error) {
      window.alert("Error!")
    }
  }

 

  useEffect(()=> {
    const logged = window.localStorage.getItem("logged")
    const user = JSON.parse(logged)
    setUser(user)
    console.log(user)
  },[])



  return (
    <div className="bg-stone-400 h-screen">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center md:flex-row shadow rounded-3xl max-w-7xl md:w-[50%]  m-2 mt-16 bg-white">
          <div className=" w-full md:w-3/4">
            <div className="text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4">
              <h1 className="font-semibold text-xl md:text-3xl text-gray-600 m-2">
                Login to your account
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8">
              <div className="flex flex-col">
                <h2 className="text-lg text-gray-500 text-semibold">Username</h2>
                <input
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={handleChange}
                  className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                />
                {error.username && <span className="text-red-500">{error.username}</span>}
              </div>
              <div className="flex flex-col">
                <h2 className="m-1 text-lg text-gray-500 text-semibold">Password</h2>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                  className="border-b border-gray-500 focus:outline-none  text-gray-500 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] bg-transparent"
                  />
                  {error.password && <span className="text-red-500">{error.password}</span>}
              </div>
            </div>
            <div className="flex flex-col items-center text-center mt-7">
              <button 
              type="submit"  
              className="lg:w-[340px] px-24 md:px-[118px] lg:px-[110px] py-2 rounded-md text-white bg-stone-600 hover:bg-stone-500  font-medium m-2 mb-3 "
              disabled= {error.username || error.password || !input.username}
              >
                Sign In
              </button>
              <span className="mb-6">Don't have an account? Register <Link to='/register' className="text-yellow-500">here.</Link></span>
            </div>
            <div className="text-center mt-7">
              <button className=" px-24 md:px-[118px] lg:px-[140px] py-2 rounded-md text-white bg-stone-600 hover:bg-stone-500  font-medium m-2 mb-6 ">
                Sign Out
              </button>
            </div>
          </div>
          <div className="h-[100%] w-full md:w-1/2 items-center flex justify-center">
            <div className="text-stone-700 text-base font-semibold text-center my-10 space-y-2 m-2 cursor-pointer">
              <div className="flex justify-center border-2 border-stone-700 px-4 py-2">
                <Google />
                <ion-icon
                  name="logo-google"
                  className="m-1 text-sm md:text-xl text-red-500"
                ></ion-icon>
                <div className="m-1 text-lg"></div>
              </div>
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

export default LogIn;
