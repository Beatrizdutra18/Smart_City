import React, { useEffect, useState } from 'react';
import './historico.css';
import axios from 'axios';

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataInicio, setDataInicio] = useState('');
  const [sensorFiltro, setSensorFiltro] = useState('');
  const [error, setError] = useState('');
  const [sensoresDisponiveis, setSensoresDisponiveis] = useState([]);

  const fetchHistorico = (inicio, sensor) => {
    setLoading(true);
    setError('');

    const url = "http://localhost:8000/api/historico-all/";
    const params = {};

    if (inicio) params['data_inicio'] = inicio;
    if (sensor) params['sensor'] = sensor;

    axios.get(url, { params })
      .then((res) => {
        setHistorico(res.data);
        setLoading(false);

        // Atualiza lista de sensores
        const sensores = [...new Set(res.data.map(item => item.sensor))];
        setSensoresDisponiveis(sensores);
      })
      .catch((err) => {
        console.error("Erro ao buscar histórico:", err);
        setError('Erro ao buscar dados. Tente novamente.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  const handleFiltrar = () => {
    fetchHistorico(dataInicio, sensorFiltro);
  };

  return (
    <div className="historico-container">
      <h1 className="historico-title">HISTÓRICO DE MEDIÇÕES</h1>

      <div className="filtros-container">
        <label>
          Sensor:{' '}
          <select
            value={sensorFiltro}
            onChange={(e) => setSensorFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            {sensoresDisponiveis.map((sensor, index) => (
              <option key={index} value={sensor}>{sensor}</option>
            ))}
          </select>
        </label>

        <label>
          Data Início:{' '}
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </label>

        <button onClick={handleFiltrar}>Filtrar</button>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <table className="historico-tabela">
        <thead>
          <tr>
            <th>SENSOR</th>
            <th>AMBIENTE</th>
            <th>VALOR</th>
            <th>TIMESTAMP</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>Carregando...</td></tr>
          ) : historico.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center', color: 'white' }}>Nenhum dado encontrado.</td></tr>
          ) : (
            historico.map((item, index) => (
              <tr key={index}>
                <td>{item.sensor}</td>
                <td>{item.ambiente}</td>
                <td>{item.valor}</td>
                <td>{new Date(item.timestamp).toLocaleString('pt-BR', {
                  dateStyle: 'short',
                  timeStyle: 'short'
                })}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Historico;
