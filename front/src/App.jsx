import { Routes, Route } from 'react-router-dom'
import Home from './Views/Home/Home'
import Create from './Views/Create/Create'
import Detail from './Components/Detail/Detail'
import Nav from './Components/Nav/Nav'
import LogIn from "./Views/LogIn/LogIn"
import Books from "./Views/Books/books"
import Success from './Components/Success/Success'
import './App.css'

function App() {

  return (
      <div>
        <Nav />
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/product-page/:id' element={<Detail/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/books' element={<Books/>}/>
          <Route path='/order-approved' element={<Success/>}/>
        </Routes>
      </div>
  )
}

export default App
