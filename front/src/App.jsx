import { Routes, Route } from 'react-router-dom'
import Home from './Views/Home/Home'
import Create from './Views/Create/Create'
import Detail from './Components/Detail/Detail'
import Nav from './Components/Nav/Nav'
import ReviewForm from './Components/ReviewForm/ReviewForm'
import LogIn from "./Views/LogIn/LogIn"
import Books from "./Views/Books/books"
import Success from './Components/Success/Success'
import { useState } from 'react'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
          <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/product-page/:id' element={<Detail/>}/>
          <Route path='/review' element={<ReviewForm/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/books' element={<Books/>}/>
          <Route path='/order-approved' element={<Success/>}/>
          <Route path='/review' element={<ReviewForm/>}/>


        </Routes>
      </div>
  )
}

export default App
