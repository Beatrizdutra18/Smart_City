import React, { useState } from 'react';
import './sensores.css';

export default function Sensores() {
  const [sensores, setSensores] = useState([
    { id: 'Sensor 1', local: 'Escola', status: 'Ativo', temp: '22,8°C', umid: '44%', data: '2024-04-25T14:30' },
    { id: 'Sensor 2', local: 'Escola', status: 'Ativo', temp: '22,8°C', umid: '44%', data: '2024-04-25T14:15' },
    { id: 'Sensor 3', local: 'Biblioteca', status: 'Ativo', temp: '18,9°C', umid: '25%', data: '2024-04-25T14:00' },
    { id: 'Sensor 4', local: 'Biblioteca', status: 'Inativo', temp: '24°C', umid: '34%', data: '2024-04-25T13:45' },
    { id: 'Sensor 5', local: 'Sala 101', status: 'Ativo', temp: '22,8°C', umid: '44%', data: '2024-04-25T13:30' },
    { id: 'Sensor 6', local: 'Sala 101', status: 'Inativo', temp: 'N/A', umid: '13%', data: '2024-04-25T13:15' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [novoSensor, setNovoSensor] = useState({
    id: '',
    local: '',
    status: 'Ativo',
    temp: '',
    umid: '',
    data: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoSensor({ ...novoSensor, [name]: value });
  };

  const handleAddSensor = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const atualizados = [...sensores];
      atualizados[editIndex] = novoSensor;
      setSensores(atualizados);
      setEditIndex(null);
    } else {
      setSensores([...sensores, novoSensor]);
    }
    setNovoSensor({ id: '', local: '', status: 'Ativo', temp: '', umid: '', data: '' });
    setShowForm(false);
  };

  const handleRemoveSensor = (index) => {
    const atualizados = [...sensores];
    atualizados.splice(index, 1);
    setSensores(atualizados);
  };

  const handleEditSensor = (index) => {
    setNovoSensor(sensores[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <div className="sensor-container">
      <h1 className="sensor-title">T​ELA DE SENSORES</h1>

      <table className="sensor-table">
        <thead>
          <tr>
            <th>Nome/ID</th>
            <th>Localização</th>
            <th>Status</th>
            <th>Temperatura</th>
            <th>Umidade</th>
            <th>Data/Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sensores.map((sensor, index) => (
            <tr key={index}>
              <td>{sensor.id}</td>
              <td>{sensor.local}</td>
              <td className={sensor.status === 'Ativo' ? 'ativo' : 'inativo'}>{sensor.status}</td>
              <td className="laranja">{sensor.temp}</td>
              <td className="laranja">{sensor.umid}</td>
              <td>{new Date(sensor.data).toLocaleString()}</td>
              <td>
                <button className="btn-remover" onClick={() => handleRemoveSensor(index)}>Remover</button>
                <button className="btn-editar" onClick={() => handleEditSensor(index)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="sensor-actions">
        <button className="btn-cadastrar" onClick={() => {
          setShowForm(!showForm);
          setEditIndex(null);
          setNovoSensor({ id: '', local: '', status: 'Ativo', temp: '', umid: '', data: '' });
        }}>
          {showForm ? 'Cancelar' : 'Cadastrar Sensor'}
        </button>
      </div>

      {showForm && (
        <form className="formulario" onSubmit={handleAddSensor}>
          <input type="text" name="id" placeholder="Nome/ID" value={novoSensor.id} onChange={handleChange} required />
          <input type="text" name="local" placeholder="Localização" value={novoSensor.local} onChange={handleChange} required />
          <select name="status" value={novoSensor.status} onChange={handleChange}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
          <input type="text" name="temp" placeholder="Temperatura" value={novoSensor.temp} onChange={handleChange} />
          <input type="text" name="umid" placeholder="Umidade" value={novoSensor.umid} onChange={handleChange} />
          <input type="datetime-local" name="data" value={novoSensor.data} onChange={handleChange} />
          <button type="submit" className="btn-salvar">{editIndex !== null ? 'Atualizar' : 'Salvar'}</button>
        </form>
      )}
    </div>
  );
}
