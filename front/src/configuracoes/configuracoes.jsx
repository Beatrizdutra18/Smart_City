import React, { useState } from "react";
import "./configuracoes.css";

const Configuracoes = () => {
  const [idioma, setIdioma] = useState("Português");
  const [temaEscuro, setTemaEscuro] = useState(true);
  const [mostrarCampoSenha, setMostrarCampoSenha] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");

  const [autenticacao2FA, setAutenticacao2FA] = useState(true);
  const [notificacoes, setNotificacoes] = useState({
    email: false,
    visual: false,
    sonoro: false,
  });
  const [permissao, setPermissao] = useState("");

  const salvarConfiguracoes = () => {
    const dados = {
      idioma,
      temaEscuro,
      novaSenha,
      autenticacao2FA,
      notificacoes,
      permissao,
    };
    alert("Configurações salvas:\n" + JSON.stringify(dados, null, 2));
  };

  const restaurarPadroes = () => {
    setIdioma("Português");
    setTemaEscuro(true);
    setMostrarCampoSenha(false);
    setNovaSenha("");
    setAutenticacao2FA(true);
    setNotificacoes({
      email: false,
      visual: false,
      sonoro: false,
    });
    setPermissao("");
    alert("Configurações restauradas para os padrões.");
  };

  return (
    <div className="config-container">
      <h2 className="config-title">CONFIGURAÇÕES</h2>

      <div className="config-section">
        <h3>GERAL</h3>
        <div className="config-option">
          <label>Idioma</label>
          <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
            <option>Português</option>
            <option>Inglês</option>
          </select>
        </div>
        <div className="config-option">
          <label>Tema</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={temaEscuro}
              onChange={() => setTemaEscuro(!temaEscuro)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="config-section">
        <h3>CONTAS</h3>
        <div className="config-option">
          {mostrarCampoSenha ? (
            <input
              type="password"
              placeholder="Nova senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
          ) : (
            <button className="btn-warning" onClick={() => setMostrarCampoSenha(true)}>
              Alterar senha
            </button>
          )}
        </div>
        <div className="config-option">
          <label>Autenticação em dois fatores</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={autenticacao2FA}
              onChange={() => setAutenticacao2FA(!autenticacao2FA)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="config-grid">
        <div className="config-section">
          <h3>NOTIFICAÇÕES</h3>
          <div className="config-option">
            <label>
              <input
                type="checkbox"
                checked={notificacoes.email}
                onChange={() =>
                  setNotificacoes({ ...notificacoes, email: !notificacoes.email })
                }
              />{" "}
              Alertas de e-mail
            </label>
          </div>
          <div className="config-option">
            <label>
              <input
                type="checkbox"
                checked={notificacoes.visual}
                onChange={() =>
                  setNotificacoes({ ...notificacoes, visual: !notificacoes.visual })
                }
              />{" "}
              Alertas visuais
            </label>
          </div>
          <div className="config-option">
            <label>
              <input
                type="checkbox"
                checked={notificacoes.sonoro}
                onChange={() =>
                  setNotificacoes({ ...notificacoes, sonoro: !notificacoes.sonoro })
                }
              />{" "}
              Alertas sonoros
            </label>
          </div>
        </div>

        <div className="config-section">
          <h3>PERMISSÕES</h3>
          <div className="config-option">
            <label>
              <input
                type="radio"
                name="perm"
                value="microfone"
                checked={permissao === "microfone"}
                onChange={(e) => setPermissao(e.target.value)}
              />{" "}
              Acesso ao microfone
            </label>
          </div>
          <div className="config-option">
            <label>
              <input
                type="radio"
                name="perm"
                value="localizacao"
                checked={permissao === "localizacao"}
                onChange={(e) => setPermissao(e.target.value)}
              />{" "}
              Acesso à localização
            </label>
          </div>
          <div className="config-option">
            <label>
              <input
                type="radio"
                name="perm"
                value="admin"
                checked={permissao === "admin"}
                onChange={(e) => setPermissao(e.target.value)}
              />{" "}
              Modo administrador
            </label>
          </div>
        </div>
      </div>

      <div className="config-section hardware">
        <h3>INTEGRAÇÃO COM HARDWARE</h3>
        <div className="config-option-row">
          <div>
            <label>ESP32 conectado?</label>
            <p>Conectado</p>
          </div>
          <div>
            <label>Atualizar firmware</label>
            <button className="btn-test" onClick={() => alert("Testando conexão com ESP32...")}>
              Testar conexão
            </button>
          </div>
        </div>
      </div>

      <div className="config-actions">
        <button className="btn-save" onClick={salvarConfiguracoes}>
          Salvar Configurações
        </button>
        <button className="btn-reset" onClick={restaurarPadroes}>
          Restaurar Padrões
        </button>
      </div>
    </div>
  );
};

export default Configuracoes;
