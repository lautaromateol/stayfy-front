import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './Components/Cart/CartContext/CartContext';
import { UserProvider } from './Context/UserContext'; 
import Home from './Views/Home/Home';
import Create from './Views/Create/Create';
import Detail from './Components/Detail/Detail';
import Nav from './Components/Nav/Nav';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import LogIn from './Views/LogIn/LogIn';
import Books from './Views/Books/books';
import Success from './Components/Success/Success';
import Register from './Views/Register/Register';
import Users from './Components/Admin dashboard/Users/Users';
import CartList from './Components/Cart/CartList/CartList';
import UserDetail from './Components/Admin dashboard/Detail/UserDetail';
import Footer from './Components/Footer/Footer';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const isLoggedIn = !!localStorage.getItem("jwtToken");

  return (
    <div className={darkMode ? 'dark' : ''}>
      <UserProvider>
        <CartProvider>
          <Nav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            {/* Proteger rutas Libres */}

            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/product-page/:id" element={<Detail />} />
            <Route path="/books" element={<Books />} />
            <Route path="/review" element={<ReviewForm />} />

            {/* Proteger rutas privadas */}
            {isLoggedIn ? (
              <>
                <Route path="/order-approved" element={<Success />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/users/:id" element={<UserDetail />} />
                <Route path="/cart" element={<CartList />} />
              </>
            ) : null}

            {/* Rutas de autenticación */}
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LogIn />} />
            <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
          </Routes>
          <Footer />
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
