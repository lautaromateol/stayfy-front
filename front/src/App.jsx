import {Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './Views/Home/Home'
import Create from './views/Create/Create'
import Detail from './Components/Detail/Detail'
import Google from './Components/Google/Google'

function App() {

  return (
      <div>
        <Google/>
        <Routes>
          {/* <Route path='/home' element= {<Home/>}/>
          <Route path='/cart' element= {<Cart/>}/> */}
          <Route path='/' element= {<Home/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/product-page/:id' element={<Detail/>}/>


        </Routes>
      </div>
  )
}

export default App
