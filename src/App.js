import Nav from './components/Navigation/Nav';
import './App.scss';
import {
  BrowserRouter as Router

} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import AppRoute from './routes/AppRoutes';

function App() {

  return (
    <>
      <Router>
        <div className='app-header'>
          <Nav />
        </div>
        <div className='app-container'>
          <AppRoute />
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;