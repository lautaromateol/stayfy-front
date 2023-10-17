import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { BACKEND_URL } from '../utils'
import { CartProvider } from "./Components/Cart/CartContext/CartContext";
import { useUser } from './Context/UserContext'; 
import {Create} from './Views/Create/Create'
import Home from './Views/Home/Home'
import Detail from './Components/Detail/Detail'
import Nav from './Components/Nav/Nav'
import ReviewForm from './Components/ReviewForm/ReviewForm'
import LogIn from "./Views/LogIn/LogIn"
import Books from "./Views/Books/books"
import Success from './Components/Success/Success'
import Register from './Views/Register/Register'
import Users from './Components/Admin dashboard/Users/Users'
import CartList from './Components/Cart/CartList/CartList'
import UserDetail from './Components/Admin dashboard/Detail/UserDetail'
import Store from './Views/Store/Store';
import Footer from './Components/Footer/Footer';
import './App.css'
import UserProfile from './Components/User/Userprofile'
import NotFound from './Views/NotFound/NotFound';
import NoPermissions from './Views/NotFound/NoPermissions';
import Address from './Components/Address Form/Address';
import UpdateBook from './Components/Admin dashboard/UpdateBook/UpdateBook';
import BookActivation from './Components/Admin dashboard/UpdateBook/BookActivation';

//import TestComponent from './TestComponent/TestComponent'
//import { BACKEND_URL } from '../utils'

function App() {
  const { user, userData } = useUser();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
          <CartProvider>
            <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/create' 
          // element={<Create/>}
          element={userData.isSuperAdmin || userData.isAdmin ? <Create /> : <NoPermissions />}
          />
          {/* comentar o borrar para proteger ruta y descomentar línea 61 */}
          <Route path='/admin/update-book' element={<UpdateBook/>}/>
          <Route path='/admin/activate-book' element={<BookActivation/>}/> 
          <Route path='/product-page/:id' element={<Detail/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path = '/user' element ={<UserProfile/>}/>
          <Route path='/books' element={<Books/>}/>
          <Route path="/permissions" element={<NoPermissions />} />
          <Route path='/order-approved' element={<Success/>}/>
          {userData.isSuperAdmin || userData.isAdmin ? (
            <>
              <Route path='/review' element={<ReviewForm/>}/>
              <Route path='/admin/users' element={<Users/>}/>
              <Route path='/admin/users/:id' element={<UserDetail/>}/>
              {/* <Route path='/admin/update-book' element={<UpdateBook/>}/> descomentar para habilitar ruta protegida */}
              {/* <Route path='/admin/activate-book' element={<BookActivation/>}/> descomentar para habilitar ruta protegida */}
            </>
          ) :   null
        }
          <Route path='/cart' element={<CartList/>}/>
          <Route path='/store' element={<Store/>}/>
          <Route path='/address' element={<Address/>}/>
          <Route path="/*" element={<NotFound />} />
        </Routes>
          <Footer/>
        </CartProvider>
      </div>
  )
}

export default App
