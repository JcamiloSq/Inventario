import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>BIENVENIDO AL SISTEMA DE GESTION DE INVENTARIOS</p>
        <Link to="/login">
          <button>INGRESAR</button>
        </Link>
      </header>
    </div>
  );
}

export default App;









