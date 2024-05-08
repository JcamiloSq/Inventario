import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './Login.css'; // Importa tu archivo de estilos CSS

function Login() {
  return (
    <div className="login-container">
      <h2>Ingreso sistema inventario</h2>
      <form>
        <div className="input-group">
          <label htmlFor="username"><FontAwesomeIcon icon={faUser} /> Usuario </label>
          <input type="text" id="username" name="username" />
        </div>
        <div className="input-group">
          <label htmlFor="password"><FontAwesomeIcon icon={faLock} /> Contraseña </label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Acceder</button>
      </form>
    </div>
  );
}

export default Login;



