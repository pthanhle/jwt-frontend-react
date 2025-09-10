import Nav from './components/Navigation/Nav';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Users from './components/ManageUsers/Users';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import _ from 'lodash';

function App() {

  const [account, setAccount] = useState({})

  useEffect(() => {
    let session = sessionStorage.getItem('account')
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, [])

  return (
    <>
      <Router>
        <div className='app-container'>
          {account && !_.isEmpty(account) && account.isAuth && <Nav />}

          <Switch>
            <Route path="/news">
              news
            </Route>
            <Route path="/about">
              about
            </Route>
            <Route path="/contact">
              contact
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/" exact>
              home
            </Route>
            <Route path="*">
              404 NOT FOUND
            </Route>
          </Switch>
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