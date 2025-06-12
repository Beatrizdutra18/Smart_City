import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} 
from "recharts";
import "./graficos.css";

const dataLine = [
  { sensor: 1, temperatura: 0, umidade: 14 },
  { sensor: 2, temperatura: 22, umidade: 6 },
  { sensor: 3, temperatura: 8, umidade: 14 },
  { sensor: 4, temperatura: 10, umidade: 18 },
  { sensor: 5, temperatura: 9, umidade: 14 },
  { sensor: 6, temperatura: 4, umidade: 18 },
];

const dataBar = [
  { data: "1", temperatura: 13, umidade: 9 },
  { data: "2", temperatura: 18, umidade: 11 },
  { data: "3", temperatura: 15, umidade: 10 },
  { data: "4", temperatura: 23, umidade: 12 },
  { data: "5", temperatura: 28, umidade: 14 },
  { data: "6", temperatura: 17, umidade: 10 },
  { data: "7", temperatura: 14, umidade: 9 },
];

export default function Graficos() {
  const [filtros, setFiltros] = useState({
    data: "Todas",
    sensor: "Todos",
    local: "Todos",
  });

  return (
    <div className="grafico-container">
      <h1 className="titulo">GRÁFICOS COMPARATIVOS</h1>
      <p className="subtitulo">
        Gráficos de linhas ou barras comparando temperatura e umidade
      </p>

      <div className="filtros">
        {["Data", "Sensor", "Local"].map((label) => (
          <div key={label} className="filtro-item">
            <label className="filtro-label">{label}</label>
            <select
              className="filtro-select"
              value={filtros[label.toLowerCase()]}
              onChange={(e) =>
                setFiltros((prev) => ({
                  ...prev,
                  [label.toLowerCase()]: e.target.value,
                }))
              }
            >
              <option value="Todas">Todas</option>
              <option value="Todos">Todos</option>
            </select>
          </div>
        ))}
      </div>

        <div className="grafico-card">
          <h2 className="grafico-titulo">
            Temperatura <span className="umidade-label">Umidade</span>
          </h2>
          <ResponsiveContainer width={900} height={400}>
            <BarChart data={dataBar}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="data" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="temperatura" fill="#f97316" />
              <Bar dataKey="umidade" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
  );
}
