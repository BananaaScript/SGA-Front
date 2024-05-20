import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Registrando os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function EditaAtivo() {
  const [ativos, setAtivos] = useState<Array<any>>([]);
  const [filtro, setFiltro] = useState<string>("");
  const [estado, setEstado] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/ativo/listar")
      .then((response) => {
        setAtivos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const ativosFiltrados = ativos.filter((ativo) =>
    ativo.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const estados = ativosFiltrados.map((ativo) => ativo.estado);
  const estadoCounts: Record<string, number> = estados.reduce((acc, estado) => {
    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(estadoCounts),
    datasets: [
      {
        label: "Número de Ativos",
        backgroundColor: [
          "rgba(255,99,132,0.2)",
          "rgba(54,162,235,0.2)",
          "rgba(255,206,86,0.2)",
          "rgba(75,192,192,0.2)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54,162,235,1)",
          "rgba(255,206,86,1)",
          "rgba(75,192,192,1)",
        ],
        borderWidth: 1,
        data: Object.values(estadoCounts),
      },
    ],
  };

  return (
    <div className="graficos">

      <div className="Graph">
        <h2>Gráfico de Estados dos Ativos</h2>
        <Pie data={chartData} />
      </div>
    </div>
  );
}
