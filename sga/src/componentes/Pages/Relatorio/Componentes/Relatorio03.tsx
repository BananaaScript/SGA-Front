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
import { Modelo } from "../../../../modelos/modelo";

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
  const [modelos, setModelos] = useState<Array<Modelo>>([])
  const [modeloId, setModeloId] = useState<number | null>(null);
  const [valorAtivosAntigos, setValorAtivosAntigos] = useState({
    valorAtivosAteUmMesAtras: 0,
    valorAtivosAteDoisMesesAtras: 0,
    valorAtivosAteTresMesesAtras: 0,
    valorAtivosAteQuatroMesesAtras: 0,
    valorAtivosAteCincoMesesAtras: 0,
    valorAtivosAteSeisMesesAtras: 0,
    valorAtivosAteSeteMesesAtras: 0,
    valorAtivosAteOitoMesesAtras: 0,
    valorAtivosAteNoveMesesAtras: 0,
    valorAtivosAteDezMesesAtras: 0,
    valorAtivosAteOnzeMesesAtras: 0,
    valorAtivosAteDozeMesesAtras: 0,
  });

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

      axios.get('http://localhost:8080/ativo/valorativosantigo')
      .then((response) => {
        setValorAtivosAntigos(response.data);
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
  const ativosFiltradosModelo = ativos.filter(
    ativo => ativo.id_modelo === modeloId
  );

  const estados = ativosFiltrados.map((ativo) => ativo.estado);
  const estadoCounts: Record<string, number> = estados.reduce((acc, estado) => {
    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});

  const categoriaContagem = categorias.reduce<Record<string, number>>((acc, categoria) => {
    acc[categoria.nome] = ativos.filter(ativo => ativo.id_categoria === categoria.id).length;
    return acc;
  }, {});

  let categoriasNome = categorias.map(categoria => categoria.nome);

  const tempos = [
    "Até 12 meses atrás",
    "Até 11 meses atrás",
    "Até 10 meses atrás",
    "Até 9 meses atrás",
    "Até 8 meses atrás",
    "Até 7 meses atrás",
    "Até 6 meses atrás",
    "Até 5 meses atrás",
    "Até 4 meses atrás",
    "Até 3 meses atrás",
    "Até 2 meses atrás",
    "Até 1 mês atrás",
    "Atualmente"
  ];

  const valores = [
    valorAtivosAntigos.valorAtivosAteDozeMesesAtras,
    valorAtivosAntigos.valorAtivosAteOnzeMesesAtras,
    valorAtivosAntigos.valorAtivosAteDezMesesAtras,
    valorAtivosAntigos.valorAtivosAteNoveMesesAtras,
    valorAtivosAntigos.valorAtivosAteOitoMesesAtras,
    valorAtivosAntigos.valorAtivosAteSeteMesesAtras,
    valorAtivosAntigos.valorAtivosAteSeisMesesAtras,
    valorAtivosAntigos.valorAtivosAteCincoMesesAtras,
    valorAtivosAntigos.valorAtivosAteQuatroMesesAtras,
    valorAtivosAntigos.valorAtivosAteTresMesesAtras,
    valorAtivosAntigos.valorAtivosAteDoisMesesAtras,
    valorAtivosAntigos.valorAtivosAteUmMesAtras,
    ativosValorTotal
  ];


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

  const chartQuantiaCategorias = {
    labels: Object.values(categoriasNome),
    
    datasets: [
      {
        label: "Quantia de Ativo(s)",
        backgroundColor: [
          "rgba(54,162,235,1)",
        ],
        borderColor: [
          "rgba(54,162,235,1)",
        ],
        borderWidth: 1,
        data: Object.values(categoriaContagem),
      },
    ],
  };



  return (
    <>
      <div className="graficos">
        <div className="Graph1">
          
          <h2>Gráfico dos Valores Monetários</h2>
          
          <Bar data={chartDataValor} />
        </div>

        <div className="Graph2">
          <h2>Gráfico de Estados</h2>
          {verificador(ativosFiltrados)}
          <Pie data={chartDataEstado} />
          
        </div>
        
      </div>


      <br /><br /><br /><hr />
      <h1>----Total de ativos: {ativosFiltrados.length}</h1>
      <hr />
      <div className="RelatoriosInterface">

      <div className="Graph001">
            <h2>Quantidade de Ativos por Categoria</h2>
            <br />
            <Bar data={chartQuantiaCategorias} ></Bar>
          </div> 

      </div>
      <div><br /><br /><br /><hr /></div>
    </>
  );
}
