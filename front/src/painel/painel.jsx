import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // ⬅ adicionado
import './painel.css';

export default function PainelControle() {
  const [sensores, setSensores] = useState([]);
  const [formData, setFormData] = useState({
    sensor: "",
    status: "",
    latitude: "",
    longitude: "",
    mac_address: "",
    unidade_med: ""
  });
  const [editId, setEditId] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const navigate = useNavigate(); // ⬅ adicionado

  const fetchSensores = () => {
    axios
      .get("http://localhost:8000/api/sensores/")
      .then((res) => setSensores(res.data))
      .catch((err) => console.error("Erro ao buscar sensores:", err));
  };

  useEffect(() => {
    fetchSensores();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const limparFormulario = () => {
    setFormData({
      sensor: "",
      status: "",
      latitude: "",
      longitude: "",
      mac_address: "",
      unidade_med: ""
    });
    setEditId(null);
    setMostrarFormulario(false);
  };

  const handleSubmit = () => {
    if (editId) {
      console.log(formData)
      axios
        .put(`http://localhost:8000/api/sensores/${editId}/`, formData)
        .then(() => {
          fetchSensores();
          limparFormulario();
        })
        .catch((err) => console.error("Erro ao editar:", err));
    } else {
      console.log(formData)
      axios
        .post("http://localhost:8000/api/sensores/", formData)
        .then(() => {
          fetchSensores();
          limparFormulario();
        })
        .catch((err) => console.error("Erro ao cadastrar:", err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja deletar?")) {
      axios
        .delete(`http://localhost:8000/api/sensores/${id}/`)
        .then(() => fetchSensores())
        .catch((err) => console.error("Erro ao deletar:", err));
    }
  };

  const handleEdit = (sensor) => {
    setEditId(sensor.id);
    setFormData({
      sensor: sensor.sensor || "",
      status: sensor.status || "",
      latitude: sensor.latitude || "",
      longitude: sensor.longitude || "",
      mac_address: sensor.mac_address || "",
      unidade_med: sensor.unidade_med || ""
    });
    setMostrarFormulario(true);
  };

  return (
    <div className="painel-container">

      <button className="btn-voltar-home" onClick={() => navigate("/home")}>
        ← Voltar para Home
      </button>

      <h1 className="painel-title">PAINEL DE CONTROLE</h1>

      <button
        className="btn-cadastrar"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? <FiX size={18} /> : <FiPlus size={18} />}
        {mostrarFormulario ? " Fechar Cadastro" : " Cadastrar Novo Sensor"}
      </button>

      <AnimatePresence>
        {mostrarFormulario && (
          <motion.div
            className="painel-form"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <input name="sensor" value={formData.sensor} onChange={handleChange} placeholder="Nome do sensor" />
            <input name="status" value={formData.status} onChange={handleChange} placeholder="Status" />
            <input name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" />
            <input name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" />
            <input name="mac_address" value={formData.mac_address} onChange={handleChange} placeholder="Mac address" />
            <input name="unidade_med" value={formData.unidade_med} onChange={handleChange} placeholder="unidade de medida" />
            <button className="btn-enviar" onClick={handleSubmit}>
              {editId ? "Salvar Edição" : "Cadastrar Sensor"}
            </button>
            <button className="btn-cancelar" onClick={limparFormulario}>Cancelar</button>
          </motion.div>
        )}
      </AnimatePresence>

      <table className="painel-tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Status</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Mac</th>
            <th>medida</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {sensores.map((sensor) => (
            <tr key={sensor.id}>
              <td>{sensor.id}</td>
              <td>{sensor.sensor || "N/D"}</td>
              <td>{sensor.status || "N/D"}</td>
              <td>{sensor.latitude || "N/D"}</td>
              <td>{sensor.longitude || "N/D"}</td>
              <td>{sensor.mac_address || "N/D"}</td>
              <td>{sensor.unidade_med || "N/D"}</td>
              <td>
                <div className="acoes">
                  <button className="btn-acao editar" onClick={() => handleEdit(sensor)}>Editar</button>
                  <button className="btn-acao deletar" onClick={() => handleDelete(sensor.id)}>Deletar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
