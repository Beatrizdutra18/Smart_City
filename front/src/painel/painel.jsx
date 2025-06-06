import React, { useEffect, useState } from "react";
import axios from "axios";
import "./painel.css";

export default function PainelControle() {
  const [sensores, setSensores] = useState([]); // guardar sensores
  const [onlineCount, setOnlineCount] = useState(0);
  const [offlineCount, setOfflineCount] = useState(0);
  const [mediaTemp, setMediaTemp] = useState(null);
  const [mediaUmidade, setMediaUmidade] = useState(null);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(null);
  const [loading, setLoading] = useState(true);

  // const token = localStorage.getItem("token");

  useEffect(() => {
    // if (!token) return;

    axios
      .get("http://localhost:8000/api/sensores/")
      .then((res) => {
        const sensoresData = res.data;
        setSensores(sensoresData); // salva a lista completa

        const online = sensoresData.filter((s) => s.status === "Ativo");
        const offline = sensoresData.length - online.length;

        setOnlineCount(online.length);
        setOfflineCount(offline);

        const tempSum = online.reduce((acc, cur) => acc + (cur.temperatura ?? 0), 0);
        const umidSum = online.reduce((acc, cur) => acc + (cur.umidade ?? 0), 0);

        setMediaTemp(online.length ? (tempSum / online.length).toFixed(1) : null);
        setMediaUmidade(online.length ? (umidSum / online.length).toFixed(0) : null);

        const sensor1 = sensoresData.find((s) => s.id === 1);
        if (sensor1 && sensor1.ultima_atualizacao) {
          setUltimaAtualizacao(sensor1.ultima_atualizacao);
        } else {
          setUltimaAtualizacao("N/A");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar sensores:", err);
        setLoading(false);
      });
  }, []);

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
            <p>{ultimaAtualizacao ?? "--"}</p>
          </div>
        </section>

        {/* Lista dos sensores */}
        <section className="lista-sensores">
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
                  <th>Última Atualização</th>
                </tr>
              </thead>
              <tbody>
                {sensores.map((sensor) => (
                  <tr key={sensor.id}>
                    <td>{sensor.id}</td>
                    <td>{sensor.nome || "N/D"}</td>
                    <td>{sensor.status}</td>
                    <td>{sensor.temperatura != null ? `${sensor.temperatura}°C` : "N/D"}</td>
                    <td>{sensor.umidade != null ? `${sensor.umidade}%` : "N/D"}</td>
                    <td>{sensor.ultima_atualizacao || "N/D"}</td>
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
