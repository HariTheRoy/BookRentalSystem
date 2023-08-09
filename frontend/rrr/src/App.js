import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import MainNavigation from "./Navigation/MainNavigation";

import Home from "./Home";
import Footer from "./Footer";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import AddNewBook from "./books/AddNewBook";


import MyAccount from "./Pages/MyAccount";


import { AuthContext } from "./context/auth-context";
import MyBooks from "./books/MyBooks";

import BookCard from "./books/BookCard";
import UpdateBook from "./books/UpdateBook";
import BookDetails from "./books/BookDetails";

import UpdatePassword from "./Pages/UpdatePassword";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import AllBooks from "./books/AllBooks";

let logoutTimer;

function App() {
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // one hour
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
    window.location.href= `${process.env.REACT_APP_FRONTEND_URL}`;
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/addnewbook" element={<AddNewBook />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/mybooks" element={<MyBooks/>}/>
        <Route path="/updatebook/:bookId" element={<UpdateBook />} />
        <Route path="/bookdetails/:bookId" element={<BookDetails />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<h1>Route Not Found</h1>} />
        <Route path="/allbooks" element={<AllBooks />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contactus" element={<ContactUs />} />
        
        <Route path="/testbookcard" element={<BookCard />} />
        <Route path="/bookdetails/:bookId" element={<BookDetails />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/allbooks" element={<AllBooks />} />
        
        <Route
          path="/"
          element={
          <Home/>
          }
        />
      </Routes>
      
    );
  }

  return (
    
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <nav id="mainnavigation">
          <MainNavigation />
        </nav>
        {routes}
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}
export default App;
