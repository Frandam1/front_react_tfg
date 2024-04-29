import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaBaby } from 'react-icons/fa'; // Importa íconos específicos que desees usar
import 'bulma/css/bulma.min.css'; // Asegúrate de que Bulma está importado
import Home from './views/Home';  // Importa Home
import Test from './views/Test';  // Importa Test
import TornilloView from './views/TornilloView'; // Asegúrate de importar el nuevo componente

import './App.css'; 
import { Lumiflex } from "uvcanvas"


const App = () => {
  return (
    <Router>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">Inicio</Link>
          <Link className="navbar-item" to="/test">Prueba</Link>
          <Link className="navbar-item" to="/tornillo">Tornillo</Link> {/* Nuevo enlace a la vista del tornillo */}

        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/tornillo" element={<TornilloView />} />
      </Routes>
    </Router>
  );
};

export default App;
