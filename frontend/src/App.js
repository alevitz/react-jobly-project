import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import Navigation from "./Navigation";
import { decode } from "jsonwebtoken";
import UserContext from "./UserContext";
import JoblyApi from './JoblyAPI';
import "./App.scss";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jobly-token"));
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(() => {
    async function getCurrentUser() {
      try {
        let { username } = decode(token);
        let currentUser = await JoblyApi.getCurrentUser(username);
        setCurrentUser(currentUser);
      } catch (err) {
        setCurrentUser(null);
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const handleLogOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("jobly-token");
    setToken(null);
  }


  if (!infoLoaded) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navigation logOut={handleLogOut} />
          <Routes setToken={setToken} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
