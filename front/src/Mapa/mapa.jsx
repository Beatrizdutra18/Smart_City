import React, { useState } from 'react';
import './mapa.css';

const sensores = [
  { id: 1, nome: 'Sensor 1', top: '12%', left: '20%', temp: '23,1°C', umid: '51%', status: 'Ativo' },
  { id: 2, nome: 'Sensor 2', top: '23%', left: '20%', temp: '25,3°C', umid: '48%', status: 'Alerta' },
  { id: 3, nome: 'Sensor 3', top: '50%', left: '25%', temp: '22,5°C', umid: '55%', status: 'Ativo' },
  { id: 4, nome: 'Sensor 4', top: '65%', left: '40%', temp: '21,9°C', umid: '52%', status: 'Offline' },
  { id: 5, nome: 'Sensor 5', top: '70%', left: '60%', temp: '26,7°C', umid: '47%', status: 'Alerta' },
  { id: 6, nome: 'Sensor 6', top: '60%', left: '75%', temp: '24,0°C', umid: '50%', status: 'Ativo' },
];

export default function Mapa() {
  const [sensorSelecionado, setSensorSelecionado] = useState(null);

  const fecharModal = () => setSensorSelecionado(null);

  return (
    <div className="mapa-container">
      <h1 className="mapa-titulo">TELA DE MAPA INTERATIVO</h1>

      <div className="mapa-wrapper">
        <div className="mapa-imagem">
          <img src="imagens/mapa-interativo.png" alt="Mapa da Escola" className="escola-imagem" />
          {sensores.map((sensor) => (
            <div
              key={sensor.id}
              className={`sensor ${sensor.status.toLowerCase()}`}
              style={{ top: sensor.top, left: sensor.left }}
              onClick={() => setSensorSelecionado(sensor)}
              title={sensor.nome}
            />
          ))}
        </div>
      </div>

      {sensorSelecionado && (
        <div className="modal-sensor">
          <div className="modal-conteudo">
            <button className="fechar-btn" onClick={fecharModal}>×</button>
            <h2>{sensorSelecionado.nome}</h2>
            <p>🌡️ Temperatura: {sensorSelecionado.temp}</p>
            <p>💧 Umidade: {sensorSelecionado.umid}</p>
            <p>
              {sensorSelecionado.status === 'Ativo' && '✅'}
              {sensorSelecionado.status === 'Alerta' && '⚠️'}
              {sensorSelecionado.status === 'Offline' && '🚫'}{' '}
              <strong>Status:</strong> {sensorSelecionado.status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
