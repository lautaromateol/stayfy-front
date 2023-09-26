import {Routes, Route} from 'react-router-dom'
// import './App.css'
import Create from './views/Create/Create'

function App() {

  return (
      <div>
        <Routes>
          {/* <Route path='/home' element= {<Home/>}/>
          <Route path='/cart' element= {<Cart/>}/> */}
          <Route path='/create' element={<Create/>}/>
        </Routes>
      </div>
  )
}

export default App
