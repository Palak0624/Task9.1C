import React, { useEffect, useState } from 'react';
import Login from './login.jsx';
import SignUp from './signup.jsx';
import NavBAR from './navbar.jsx';
import Profile from './profile.jsx';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { auth } from "./firebase.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false); // State to control dialog visibility

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => setUser(null))
      .catch((error) => console.error("Error signing out:", error));
    setShowDialog(false); // Close the dialog after logging out
  };

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return (
    <Router>
      <div className='container'>
        <NavBAR user={user} onSignOut={openDialog} /> {/* Open dialog instead of directly signing out */}
        <div className='app'>
          <Routes>
            <Route path='/' element={user ? <Link to="/profile" /> : <Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
          <ToastContainer />
        </div>

        {showDialog && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <p>Hi {user?.email}</p>
              <p>Are you sure you want to log out?</p>
              <div className="dialog-buttons">
                <button onClick={handleSignOut}>Yes</button>
                <button onClick={closeDialog}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
