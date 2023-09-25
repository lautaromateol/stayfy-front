import {Routes, Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
      <div>
        <Routes>
        <Route path='/home' element= {<Home/>}/>
        <Route path='/cart' element= {<Cart/>}/>
        </Routes>
      </div>
  )
}

export default App
