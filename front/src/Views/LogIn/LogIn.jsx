/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Google from "../../Components/Google/Google";
import validation from "./validations/loginValidations";
import { Link } from "react-router-dom";
import loginAction from "../../redux/login";
import { useUser } from '../../Context/UserContext';
import { Button, Modal } from 'antd';
import Aos from "aos"
import 'aos/dist/aos.css'

const LogIn = () => {

  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({});

  const [user, setUser] = useState(null)

  const [warning, setWarning] = useState('')

  const {signIn, signOut} = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const lastTab = localStorage.getItem('lastTab')

  const showModal = () => {
    if(warning === 'This user is blocked'){
      setIsModalOpen(true);
    }
}

const handleOk = () => {
  setIsModalOpen(false);
};

const handleCancel = () => {
  setIsModalOpen(false);
};

  const handleChange = (e) => {
    setWarning('')
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
    try {
      const user = await loginAction.login({
        username: input.username,
        password: input.password
      })
      setUser(user)
      
      // window.localStorage.setItem("logged", JSON.stringify(user))
      signIn(JSON.stringify(user));

      setInput({
        username: "",
        password: "",
      })

      window.location.href = lastTab
      
    } catch (error) {
      if (error.response && (error.response.status === 404 || error.response.status === 403)) {
        setWarning(error.response.data)
        showModal()
      } else {
        
        window.alert("Error!");
    }
  }
}
 

  useEffect(()=> {
    Aos.init({duration: 1500})
    // const logged = window.localStorage.getItem("logged")
    // const user = JSON.parse(logged)
    // setUser(user)
    // console.log(user)
  },[])



  return (
    <div className="bg-[#A4BCB3] h-screen dark:bg-gray-900">
      <Modal title="Access Denied" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{warning}</p>
            </Modal>
      <div className="flex justify-center" data-aos = 'fade-up'>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center md:flex-row shadow rounded-3xl max-w-7xl md:w-[50%]  m-2 mt-16 bg-white dark:bg-stone-200">
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
              {warning && warning !== 'This user is blocked' ? <p>{warning}</p> : ''}
              <button 
              type="submit"  
              className="lg:w-[340px] px-24 md:px-[118px] lg:px-[110px] py-2 rounded-md text-white bg-stone-600 hover:bg-stone-500  font-medium m-2 mb-3 "
              disabled= {error.username || error.password || !input.username}
              onClick={handleSubmit}
              >
                Sign In
              </button>
              <span className="mb-6">Don't have an account? Register <Link to='/register' className="text-yellow-500">here.</Link></span>
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <div className="text-center mt-7">
              
            </div>
          </div>
          <div className="h-[100%] w-full md:w-1/2 items-center flex justify-center">
            <div className="text-stone-700 text-base font-semibold text-center my-10 space-y-2 m-2 cursor-pointer">
              <Google/>
              <ion-icon></ion-icon>
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
