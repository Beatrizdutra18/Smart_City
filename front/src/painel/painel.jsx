import React, { useEffect, useState } from "react";
import axios from "axios";
import "./painel.css";

export default function PainelControle() {
  const [sensores, setSensores] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);
  const [mediaTemp, setMediaTemp] = useState(null);
  const [mediaUmidade, setMediaUmidade] = useState(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSensores = () => {
    axios
      .get("http://localhost:8000/api/sensores/")
      .then((res) => {
        const sensoresData = res.data;
        setSensores(sensoresData);

        const online = sensoresData.filter((s) => s.status === "Ativo");
        setOnlineCount(online.length);
        setOfflineCount(sensoresData.length - online.length);

        const tempSum = online.reduce((acc, cur) => acc + (cur.temperatura ?? 0), 0);
        const umidSum = online.reduce((acc, cur) => acc + (cur.umidade ?? 0), 0);

        setMediaTemp(online.length ? (tempSum / online.length).toFixed(1) : null);
        setMediaUmidade(online.length ? (umidSum / online.length).toFixed(0) : null);

        const sensor1 = sensoresData.find((s) => s.id === 1);
        setUltimaAtualizacao(sensor1?.ultima_atualizacao || "N/A");

        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar sensores:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSensores();
  }, []);

  const handleRemoveSensor = (id) => {
    if (window.confirm("Deseja realmente remover este sensor?")) {
      axios
        .delete(`http://localhost:8000/api/sensores/${id}/`)
        .then(() => {
          fetchSensores(); // Atualiza lista após remoção
        })
        .catch((err) => {
          console.error("Erro ao remover sensor:", err);
          alert("Erro ao remover sensor.");
        });
    }
  };

  const handleEditSensor = (id) => {
    // Redireciona para página de edição
    window.location.href = `/editar-sensor/${id}`;
  };

  if (loading) return <p>Carregando painel...</p>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>DASHBOARD</h1>
        <p>Visão geral do projeto em tempo real</p>
      </header>

      <main className="dashboard-main">
        <section className="mapa-escola">
          <img src="imagens/mapa-escola.png" alt="Mapa da escola" className="mapa-fundo" />
          <div className="sensor-icon" style={{ top: "20%", left: "15%" }}>📶</div>
          <div className="sensor-icon" style={{ top: "40%", left: "25%" }}>🌡️</div>
          <div className="sensor-icon" style={{ top: "55%", left: "35%" }}>💧</div>
          <div className="sensor-icon" style={{ top: "70%", left: "20%" }}>🔊</div>
          <div className="sensor-icon" style={{ top: "30%", left: "65%" }}>🌡️</div>
          <div className="sensor-icon" style={{ top: "60%", left: "75%" }}>🚛</div>
        </section>

        <section className="info-cards">
          <div className="card">
            <h3>Sensores</h3>
            <p><strong>{onlineCount}</strong> Online</p>
            <p><strong>{offlineCount}</strong> Offline</p>
          </div>
          <div className="card">
            <h3>Média</h3>
            <p><strong>{mediaTemp ?? "--"}°C</strong> Temperatura</p>
            <p><strong>{mediaUmidade ?? "--"}%</strong> Umidade</p>
          </div>
          <div className="card">
            <h3>Última Atualização</h3>
            <p>Sensor 1</p>
            <p>{ultimaAtualizacao}</p>
          </div>
        </section>

        <section className="tabela-sensores">
          <h2>Lista de Sensores</h2>
          {sensores.length === 0 ? (
            <p>Nenhum sensor encontrado.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Status</th>
                  <th>Temperatura</th>
                  <th>Umidade</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {sensores.map((sensor) => (
                  <tr key={sensor.id}>
                    <td>{sensor.id}</td>
                    <td>{sensor.sensor || "N/D"}</td>
                    <td>{sensor.status}</td>
                    <td>{sensor.temperatura ?? "N/D"}</td>
                    <td>{sensor.umidade ?? "N/D"}</td>
                    <td>{sensor.latitude || "N/D"}</td>
                    <td>{sensor.longitude || "N/D"}</td>
                    <td>
                      <button className="btn-editar" onClick={() => handleEditSensor(sensor.id)}>Editar</button>
                      <button className="btn-remover" onClick={() => handleRemoveSensor(sensor.id)}>Remover</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}
