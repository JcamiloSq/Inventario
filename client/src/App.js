import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import './App.css';
import { Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>BIENVENIDO AL SISTEMA DE GESTION DE INVENTARIOS</p>
        <Link to="/login">
          <Button
            fullWidth
            variant="contained"
          >Acceder
          </Button>
        </Link>
      </header>
    </div>
  );
}

export default App;









