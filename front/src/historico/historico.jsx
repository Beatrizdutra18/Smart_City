import React, { useEffect, useState } from 'react';
import './historico.css';
import axios from 'axios';
import splitTimestamp from './historico_methods';
import { useNavigate } from 'react-router-dom';

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const [todosDados, setTodosDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataInicio, setDataInicio] = useState('');
  const [sensorFiltro, setSensorFiltro] = useState('');
  const [error, setError] = useState('');
  const [sensoresDisponiveis, setSensoresDisponiveis] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/historico-all/')
      .then((res) => {
        setTodosDados(res.data);
        setHistorico(res.data);
        const sensores = [...new Set(res.data.map(item => item.sensor))];
        setSensoresDisponiveis(sensores);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar histórico:", err);
        setError('Erro ao buscar dados. Tente novamente.');
        setLoading(false);
      });
  }, []);

  const handleFiltrar = () => {
    setError('');
    setLoading(true);
    
    const filtrado = todosDados.filter(item => {
      const filterDateOrSensor = dataInicio ? splitTimestamp(item.timestamp) === dataInicio :
       sensorFiltro  ? item.sensor === Number(sensorFiltro) : item;
      return filterDateOrSensor;
    });

    setHistorico(filtrado);
    setLoading(false);
  };

  return (
    <div className="historico-container">
      <button className="btn-voltar" onClick={() => navigate("/home")}>
        ← Voltar para Home
      </button>

      <header className="historico-header">
        <h1>HISTÓRICO DE MEDIÇÕES</h1>
        <p>Consulte registros anteriores dos sensores</p>
      </header>

      <div className="historico-filtros">
        <label>
          Sensor:
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
          Data Início:
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </label>

        <button onClick={() => handleFiltrar()}>Filtrar</button>
      </div>

      {error && <div className="historico-erro">{error}</div>}

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
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                Carregando...
              </td>
            </tr>
          ) : historico.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', color: 'white' }}>
                Nenhum dado encontrado.
              </td>
            </tr>
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
