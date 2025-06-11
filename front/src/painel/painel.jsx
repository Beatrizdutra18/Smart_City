import React, { useEffect, useState } from "react";
import axios from "axios";
import './painel.css'; // certifique-se de criar e importar o CSS correto

export default function PainelControle() {
  const [sensores, setSensores] = useState([]);
  const [filteredSensores, setFilteredSensores] = useState([]);
  const [loading, setLoading] = useState(true);

  const [idFiltro, setIdFiltro] = useState("");
  const [nomeFiltro, setNomeFiltro] = useState("");

  const fetchSensores = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/sensores/")
      .then((res) => {
        setSensores(res.data);
        setFilteredSensores(res.data);
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

  const aplicarFiltro = () => {
    const filtrados = sensores.filter((sensor) => {
      return (
        (idFiltro === "" || sensor.id.toString() === idFiltro) &&
        (nomeFiltro === "" || (sensor.sensor && sensor.sensor === nomeFiltro))
      );
    });
    setFilteredSensores(filtrados);
  };

  return (
    <div className="painel-container">
      <h1 className="painel-title">PAINEL DE CONTROLE</h1>

      <div className="painel-filtro">
        <select value={idFiltro} onChange={(e) => setIdFiltro(e.target.value)}>
          <option value="">ID</option>
          {[...new Set(sensores.map((s) => s.id))].map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>

        <select value={nomeFiltro} onChange={(e) => setNomeFiltro(e.target.value)}>
          <option value="">NOME</option>
          {[...new Set(sensores.map((s) => s.sensor))].map((nome) =>
            nome && <option key={nome} value={nome}>{nome}</option>
          )}
        </select>

        <button onClick={aplicarFiltro}>FILTRAR</button>
      </div>

      <table className="painel-tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Status</th>
            <th>Temperatura</th>
            <th>Umidade</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="7">Carregando...</td></tr>
          ) : filteredSensores.length === 0 ? (
            <tr><td colSpan="7">Nenhum sensor encontrado.</td></tr>
          ) : (
            filteredSensores.map((sensor) => (
              <tr key={sensor.id}>
                <td>{sensor.id}</td>
                <td>{sensor.sensor || "N/D"}</td>
                <td>{sensor.status}</td>
                <td>{sensor.temperatura ?? "N/D"}</td>
                <td>{sensor.umidade ?? "N/D"}</td>
                <td>{sensor.latitude || "N/D"}</td>
                <td>{sensor.longitude || "N/D"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
