import {Routes, Route} from 'react-router-dom'
import Create from './views/Create/Create'
import './App.css'
import Home from './Views/Home/Home'

function App() {

  return (
      <div>
        <Routes>
          {/* <Route path='/home' element= {<Home/>}/>
          <Route path='/cart' element= {<Cart/>}/> */}
          <Route path='/create' element={<Create/>}/>

        <Route path='/' element= {<Home/>}/>

        </Routes>
      </div>
  )
}

export default App
