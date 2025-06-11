import React, { useState } from "react";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username: email,
        password: senha,
      });

      // Armazena os tokens no localStorage
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      setMensagem("✅ Login realizado com sucesso!");
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      setMensagem("❌ Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">ENTRAR NA CIDADE INTELIGENTE</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <FiMail className="icon" />
            <input
              type="text"
              placeholder="Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <FiLock className="icon" />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button className="login-button" type="submit">
            ENTRAR <FiArrowRight style={{ marginLeft: "8px" }} />
          </button>

          {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

          <p className="register-link">
            Não possui conta?{" "}
            <Link to="/">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
