import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX } from "react-icons/fi";
import './painel.css';

export default function PainelControle() {
  const [sensores, setSensores] = useState([]);
  const [formData, setFormData] = useState({
    sensor: "",
    status: "",
    temperatura: "",
    umidade: "",
    latitude: "",
    longitude: "",
  });
  const [editId, setEditId] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
      temperatura: "",
      umidade: "",
      latitude: "",
      longitude: "",
    });
    setEditId(null);
    setMostrarFormulario(false);
  };

  const handleSubmit = () => {
    if (editId) {
      axios
        .put(`http://localhost:8000/api/sensores/${editId}/`, formData)
        .then(() => {
          fetchSensores();
          limparFormulario();
        })
        .catch((err) => console.error("Erro ao editar:", err));
    } else {
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
      temperatura: sensor.temperatura || "",
      umidade: sensor.umidade || "",
      latitude: sensor.latitude || "",
      longitude: sensor.longitude || "",
    });
    setMostrarFormulario(true);
  };

  return (
    <div className="painel-container">
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
            <input name="temperatura" value={formData.temperatura} onChange={handleChange} placeholder="Temperatura" />
            <input name="umidade" value={formData.umidade} onChange={handleChange} placeholder="Umidade" />
            <input name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" />
            <input name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" />
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
              <td>{sensor.status || "N/D"}</td>
              <td>{sensor.temperatura ?? "N/D"}</td>
              <td>{sensor.umidade ?? "N/D"}</td>
              <td>{sensor.latitude || "N/D"}</td>
              <td>{sensor.longitude || "N/D"}</td>
              <td>
                <button className="btn-acao editar" onClick={() => handleEdit(sensor)}>Editar</button>
                <button className="btn-acao deletar" onClick={() => handleDelete(sensor.id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
