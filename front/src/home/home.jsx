import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const [sensoresAtivos, setSensoresAtivos] = useState(0);
  const [alertasAtivos, setAlertasAtivos] = useState(0);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/api/sensores/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const ativos = res.data.filter((sensor) => sensor.status === "Ativo");
          setSensoresAtivos(ativos.length);
        })
        .catch((err) => {
          console.error("Erro ao buscar sensores:", err);
        });

      axios
        .get("http://localhost:8000/api/historico/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const alertas = res.data.filter((item) => item.alerta === true);
          setAlertasAtivos(alertas.length);
        })
        .catch((err) => {
          console.error("Erro ao buscar alertas:", err);
        });
    }
  }, [token]);

  const handleClick = (rota) => {
    navigate(rota);
  };

  return (
    <div className="home">
      <img src="./imagens/Smart_city.avif" alt="Cabeçalho" />

      <main className="content">
        <h1 className="main-title">SMART CITY</h1>
        <p className="sub-title">
          Central de comando digital da Escola e Faculdade
          <br />
          de Tecnologia Senai Roberto Mange
        </p>

        <div className="grid">
          <button className="card" onClick={() => handleClick("/sensores")}>
            <h2>SENSORES</h2>
            <p>Sensores ativos: {sensoresAtivos}</p>
          </button>
          <button className="card" onClick={() => handleClick("/painel")}>
            <h2>PAINEL DE CONTROLE</h2>
            <p>Visão rápida dos sensores e alertas em tempo real para monitoramento da cidade inteligente.</p>
          </button>
          <button className="card" onClick={() => handleClick("/graficos")}>
            <h2>GRÁFICOS COMPARATIVOS</h2>
            <p>
              Gráficos de barras comparando temperatura e umidade por sensor,
              por data ou por ambiente.
            </p>
          </button>
          <button className="card" onClick={() => handleClick("/mapa")}>
            <h2>MAPA INTERATIVO</h2>
            <p>Mapa da escola com a posição geográfica dos sensores.</p>
          </button>
          <button className="card" onClick={() => handleClick("/alertas")}>
            <h2>ALERTAS</h2>
            <p>Alertas ativos: {alertasAtivos}</p>
          </button>
          <button className="card" onClick={() => handleClick("/ambiente")}>
            <h2>AMBIENTES</h2>
            <p>Página que exibe e filtra ambientes da organização, com dados carregados do backend.</p>
          </button>
          <button className="card" onClick={() => handleClick("/historico")}>
            <h2>HISTÓRICOS</h2>
            <p>Alertas ativos: {alertasAtivos}</p>
          </button>
          <button className="card" onClick={() => handleClick("/configuracoes")}>
            <h2>CONFIGURAÇÕES</h2>
            <p>Personalize idioma, tema, contas, notificações e permissões do sistema.</p>
          </button>
        </div>
      </main>

      <footer className="footer">
        © 2025 Smart City. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Home;
