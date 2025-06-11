import React, { useEffect, useState } from 'react';
import './ambiente.css';
import axios from 'axios';

const Ambiente = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [filteredAmbientes, setFilteredAmbientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [sigFiltro, setSigFiltro] = useState('');
  const [niFiltro, setNiFiltro] = useState('');
  const [responsavelFiltro, setResponsavelFiltro] = useState('');

  // Formulário visibilidade e dados
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    sig: '',
    descricao: '',
    ni: '',
    responsavel: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAmbientes();
  }, []);

  const fetchAmbientes = () => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/ambientes/")
      .then((res) => {
        const ambienteData = res.data;
        setAmbientes(ambienteData);
        setFilteredAmbientes(ambienteData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar ambientes:", err);
        setLoading(false);
      });
  };

  const aplicarFiltro = () => {
    const filtrados = ambientes.filter((ambiente) => {
      return (
        (sigFiltro === '' || ambiente.sig === sigFiltro) &&
        (niFiltro === '' || ambiente.ni === niFiltro) &&
        (responsavelFiltro === '' || ambiente.responsavel === responsavelFiltro)
      );
    });
    setFilteredAmbientes(filtrados);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const limparFormulario = () => {
    setFormData({
      sig: '',
      descricao: '',
      ni: '',
      responsavel: '',
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleSubmit = () => {
    if (!formData.sig || !formData.descricao) {
      alert('Preencha ao menos SIG e DESCRIÇÃO');
      return;
    }

    if (editId) {
      // Editar ambiente
      axios.put(`http://localhost:8000/api/ambientes/${editId}/`, formData)
        .then(() => {
          fetchAmbientes();
          limparFormulario();
        })
        .catch(err => {
          console.error("Erro ao editar ambiente:", err.response?.data || err.message);
        });
    } else {
      // Cadastrar novo ambiente
      axios.post("http://localhost:8000/api/ambientes/", formData)
        .then(() => {
          fetchAmbientes();
          limparFormulario();
        })
        .catch(err => {
          console.error("Erro ao cadastrar ambiente:", err.response?.data || err.message);
        });
    }
  };

  const handleEdit = (ambiente) => {
    setEditId(ambiente.id);
    setFormData({
      sig: ambiente.sig || '',
      descricao: ambiente.descricao || '',
      ni: ambiente.ni || '',
      responsavel: ambiente.responsavel || '',
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja deletar este ambiente?")) {
      axios.delete(`http://localhost:8000/api/ambientes/${id}/`)
        .then(() => fetchAmbientes())
        .catch(err => console.error("Erro ao deletar ambiente:", err));
    }
  };

  return (
    <div className="ambiente-container">
      <h1 className="ambiente-title">AMBIENTES:</h1>

      <div className="ambiente-filtro">
        <select value={sigFiltro} onChange={(e) => setSigFiltro(e.target.value)}>
          <option value="">SIG</option>
          {[...new Set(ambientes.map(a => a.sig))].map(sig => (
            <option key={sig} value={sig}>{sig}</option>
          ))}
        </select>

        <select value={niFiltro} onChange={(e) => setNiFiltro(e.target.value)}>
          <option value="">NI</option>
          {[...new Set(ambientes.map(a => a.ni))].map(ni => (
            <option key={ni} value={ni}>{ni}</option>
          ))}
        </select>

        <select value={responsavelFiltro} onChange={(e) => setResponsavelFiltro(e.target.value)}>
          <option value="">RESPONSÁVEL</option>
          {[...new Set(ambientes.map(a => a.responsavel))].map(resp => (
            <option key={resp} value={resp}>{resp}</option>
          ))}
        </select>

        <button onClick={aplicarFiltro}>FILTRAR</button>
        <button className="btn-cadastrar" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Fechar Formulário' : 'Cadastrar Ambiente'}
        </button>
      </div>

      {showForm && (
        <div className="ambiente-form">
          <input
            name="sig"
            placeholder="SIG"
            value={formData.sig}
            onChange={handleChange}
          />
          <input
            name="descricao"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={handleChange}
          />
          <input
            name="ni"
            placeholder="NI"
            value={formData.ni}
            onChange={handleChange}
          />
          <input
            name="responsavel"
            placeholder="Responsável"
            value={formData.responsavel}
            onChange={handleChange}
          />
          <div className="form-buttons">
            <button className="btn-cadastrar" onClick={handleSubmit}>
              {editId ? 'Salvar Edição' : 'Cadastrar'}
            </button>
            {editId && (
              <button className="btn-cancelar" onClick={limparFormulario}>Cancelar</button>
            )}
          </div>
        </div>
      )}

      <table className="ambiente-tabela">
        <thead>
          <tr>
            <th>SIG</th>
            <th>DESCRIÇÃO</th>
            <th>NI</th>
            <th>RESPONSÁVEL</th>
            <th>AÇÕES</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="5">Carregando...</td></tr>
          ) : (
            filteredAmbientes.map((item, index) => (
              <tr key={index}>
                <td>{item.sig}</td>
                <td>{item.descricao}</td>
                <td>{item.ni}</td>
                <td>{item.responsavel}</td>
                <td>
                  <button className="btn-acao editar" onClick={() => handleEdit(item)}>Editar</button>
                  <button className="btn-acao deletar" onClick={() => handleDelete(item.id)}>Deletar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ambiente;
