import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Views/Home/Home'
import Create from './Views/Create/Create'
import Detail from './Components/Detail/Detail'
import Nav from './Components/Nav/Nav'
import LogIn from './Components/LogIn/LogIn'
import Books from './Components/Books/Books'

function App() {

  return (
      <div>
        <Nav />
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/product-page/:id' element={<Detail/>}/>
          <Route path='/login' element={<LogIn/>}></Route>
          <Route path='/books' element={<Books/>}></Route>
        </Routes>
      </div>
  )
}

export default App
