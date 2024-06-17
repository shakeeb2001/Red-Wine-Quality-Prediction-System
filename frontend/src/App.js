import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Prediction from './pages/prediction/prediction';
import Dashboard from './pages/dashboard/dashboard';
import Result from './pages/result/result';
import Navbar from './component/navbar';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      <Router>
        <Navbar username={username} />
        <Routes>
          <Route path='/login' element={<Login setUsername={setUsername} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/prediction' element={<Prediction />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
