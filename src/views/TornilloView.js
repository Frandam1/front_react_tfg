import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TornilloView = () => {
    const [tornillo, setTornillo] = useState(null);
    const [error, setError] = useState('');
    const [tornilloId, setTornilloId] = useState('2');  // Estado inicial para el ID del tornillo

    // Función fetch actualizada para usar el tornilloId
    useEffect(() => {
      const fetchTornillo = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/tornillo/find/${tornilloId}`);
          setTornillo(response.data); // Asumiendo que data es el objeto del tornillo
        } catch (err) {
          setError('Error al obtener datos');
          console.error(err);
        }
      };
  
      if (tornilloId) {
        fetchTornillo();
      }
    }, [tornilloId]);  // Dependencia añadida aquí para re-ejecutar cuando tornilloId cambie

    return (
        <section>
          <h1>Información del Tornillo</h1>
          <input
            type="number"
            value={tornilloId}
            onChange={e => setTornilloId(e.target.value)}
            placeholder="Introduce el ID del tornillo"
          />
          {error && <p>{error}</p>}
          {tornillo ? (
            <div>
              <p><strong>Nombre:</strong> {tornillo.nombre}</p>
              <p><strong>Precio:</strong> {tornillo.price}</p>
              <p><strong>Proveedor ID:</strong> {tornillo.proveedor.id}</p>
              <p><strong>Proveedor Nombre:</strong> {tornillo.proveedor.nombre}</p>
              <p><strong>Proveedor Ciudad:</strong> {tornillo.proveedor.ciudad}</p>
            </div>
          ) : (
            <p>Cargando datos del tornillo...</p>
          )}
        </section>
      );
    };

export default TornilloView;
