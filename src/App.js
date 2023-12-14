import React, { useState, useEffect } from 'react';
import AdminProfile from './AdminProfile';

import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Manualsms from './Manualsms';

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          {token ? (
            <>
              <Route path="/adminprofile" element={<AdminProfile />} />
              <Route path="/manualsms" element={<Manualsms />} />
            </>
          ) : null}
        </Routes>
      </Router>
    </>
  );
}

export default App;
