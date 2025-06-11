import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/home';
import Cadastro from './cadastro/cadastro';
import Login from './login/login';
import Painel from './painel/painel';
import Graficos from './graficos/graficos';
import Mapa from './Mapa/mapa';
import Ambiente from './ambiente/ambiente';
import Historico from './historico/historico';
import Configuracoes from './configuracoes/configuracoes';



function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/painel" element={<Painel />} />
      <Route path="/graficos" element={<Graficos />} />
      <Route path="/mapa" element={<Mapa />} />
      <Route path="/ambiente" element={<Ambiente />} />
      <Route path="/historico" element={<Historico />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
    </Routes>
  );
}

export default App;
