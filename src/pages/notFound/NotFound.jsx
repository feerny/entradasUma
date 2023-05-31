import React from 'react';
import './notFoundCss.css';
import { Link } from 'react-router-dom';


function NotFound(props) {
    return (
        <div className="not-found">
          <h1>404 Not Found</h1>
          <p>Oops! La página que estás buscando no existe.</p>
          <Link className="home-link" to="/home">Ir al inicio</Link>
        </div>
      );
}

export default NotFound;