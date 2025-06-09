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

  useEffect(() => {
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
  }, []);

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
      </div>

      {/* Tabela abaixo dos filtros */}
      <table className="ambiente-tabela">
        <thead>
          <tr>
            <th>SIG</th>
            <th>DESCRIÇÃO</th>
            <th>NI</th>
            <th>RESPONSÁVEL</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="4">Carregando...</td></tr>
          ) : (
            filteredAmbientes.map((item, index) => (
              <tr key={index}>
                <td>{item.sig}</td>
                <td>{item.descricao}</td>
                <td>{item.ni}</td>
                <td>{item.responsavel}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ambiente;
