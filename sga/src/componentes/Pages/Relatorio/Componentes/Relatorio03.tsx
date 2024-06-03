import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Categoria } from "../../../../modelos/categoria";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function EditaAtivo() {
  const [ativos, setAtivos] = useState<Array<any>>([]);
  const [ativosValorTotal, setAtivosValorTotal] = useState<Array<any>>([]);
  const [categorias, setCategorias] = useState<Array<Categoria>>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/ativo/listar")
      .then((response) => {
        setAtivos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('http://localhost:8080/categoria/listar')
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('http://localhost:8080/ativo/totalvalorativos')
      .then((response) => {
        setAtivosValorTotal(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Removendo o filtro de categoria
  const ativosFiltrados = ativos;

  function verificador(ativosFiltrados: any) {
    // Verificar se há ativos filtrados
    if (ativosFiltrados.length === 0) {
      return (<><br /><br /><hr /><h5>---------- Não há ativos ---------</h5><hr /></>);
    }
  }

  const estados = ativosFiltrados.map((ativo) => ativo.estado);
  const estadoCounts: Record<string, number> = estados.reduce((acc, estado) => {
    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});

  const tempos = ["5 anos atrás", "2 anos atrás", "1 ano atrás", "6 meses atrás", "3 meses atrás", "Atualmente"];
  const valores = ["0", "0", "0", "0", "0", ativosValorTotal];

  const chartDataEstado = {
    labels: Object.keys(estadoCounts),
    datasets: [
      {
        label: "Número de Ativos",
        backgroundColor: [
          "#A4EA4F",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
        ],
        borderColor: [
          "white",
        ],
        borderWidth: 3.5,
        data: Object.values(estadoCounts),
      },
    ],
  };

  const chartDataValor = {
    labels: Object.values(tempos),
    datasets: [
      {
        label: "Valore(s) de Ativo(s)",
        backgroundColor: [
          "rgba(54,162,235,1)",
        ],
        borderColor: [
          "rgba(54,162,235,1)",
        ],
        borderWidth: 1,
        data: Object.values(valores),
      },
    ],
  };

  return (
    <>
      <div className="graficos">
        <div className="Graph1">
          <h2>Gráfico dos Valor Monetários dos Ativos</h2>
          <br /><br />
          <Bar data={chartDataValor} />
        </div>

        <div className="Graph2">
          <h2>Gráfico de Estados dos Ativos</h2>
          {verificador(ativosFiltrados)}
          <Pie data={chartDataEstado} />
          <h3>Total de ativos: {ativosFiltrados.length}</h3>
        </div>
      </div>
      <div><br /><br /><br /><br /><br /><hr /></div>
    </>
  );
}
