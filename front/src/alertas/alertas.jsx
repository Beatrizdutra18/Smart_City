import React, { useState } from 'react';
import './Alertas.css';

const Alertas = () => {
  const [filtros, setFiltros] = useState({
    data: '',
    sensor: '',
    tipo: '',
  });

  const alertas = [
    { data: '24/04/2025', hora: '16:35', sensor: 'Sensor 1', alerta: 'Temperatura acima do normal', tipo: 'Visual' },
    { data: '23/04/2025', hora: '14:20', sensor: 'Sensor 3', alerta: 'Temperatura acima do normal', tipo: 'Sonoro' },
    { data: '22/04/2025', hora: '09:52', sensor: 'Sensor 1', alerta: 'Temperatura acima do normal', tipo: 'Vibratório' },
    { data: '21/04/2025', hora: '18:17', sensor: 'Sensor 7', alerta: 'Temperatura acima do normal', tipo: 'Visual' },
    { data: '20/04/2025', hora: '11:04', sensor: 'Sensor 3', alerta: 'Temperatura acima do normal', tipo: 'Visual' },
  ];

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const alertasFiltrados = alertas.filter((alerta) => {
    return (
      (filtros.data === '' || alerta.data === filtros.data) &&
      (filtros.sensor === '' || alerta.sensor === filtros.sensor) &&
      (filtros.tipo === '' || alerta.tipo === filtros.tipo)
    );
  });

  return (
    <div className="alertas-container">
      <h1>ALERTAS</h1>
      <div className="filtros">
        <div className="filtro">
          <label>Data</label>
          <select name="data" value={filtros.data} onChange={handleFiltroChange}>
            <option value="">Selecione</option>
            {Array.from(new Set(alertas.map(a => a.data))).map((data) => (
              <option key={data} value={data}>{data}</option>
            ))}
          </select>
        </div>
        <div className="filtro">
          <label>Sensor</label>
          <select name="sensor" value={filtros.sensor} onChange={handleFiltroChange}>
            <option value="">Selecione</option>
            {Array.from(new Set(alertas.map(a => a.sensor))).map((sensor) => (
              <option key={sensor} value={sensor}>{sensor}</option>
            ))}
          </select>
        </div>
        <div className="filtro">
          <label>Tipo de alerta</label>
          <select name="tipo" value={filtros.tipo} onChange={handleFiltroChange}>
            <option value="">Selecione</option>
            {Array.from(new Set(alertas.map(a => a.tipo))).map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>
        <button className="filtrar-btn">FILTRAR</button>
      </div>

      <h2>ALERTAS GERADOS AUTOMATICAMENTE</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Sensor</th>
            <th>Alerta</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {alertasFiltrados.map((alerta, index) => (
            <tr key={index}>
              <td>{alerta.data}</td>
              <td>{alerta.hora}</td>
              <td>{alerta.sensor}</td>
              <td>{alerta.alerta}</td>
              <td><span className={`tipo-alerta ${alerta.tipo.toLowerCase()}`}>{alerta.tipo}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alertas;
