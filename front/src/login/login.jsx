import React, { useState } from "react";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular login bem-sucedido
    setMensagem("Login realizado com sucesso!");

    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">ENTRAR NA CIDADE INTELIGENTE</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <FiMail className="icon" />
            <input type="email" placeholder="E-mail" required />
          </div>

          <div className="input-field">
            <FiLock className="icon" />
            <input type="password" placeholder="Senha" required />
          </div>

          <button className="login-button" type="submit">
            ENTRAR <FiArrowRight style={{ marginLeft: "8px" }} />
          </button>

          {/* Mensagem de sucesso */}
          {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

          {/* Mensagem com link para cadastro */}
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
