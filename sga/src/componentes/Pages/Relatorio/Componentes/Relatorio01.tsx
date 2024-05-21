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
import {Categoria} from "../../../../modelos/categoria"
import Roteador from "../../../Roteamento/roteador";
import Relatorio from "../Relatorio";

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
  const [categorias, setCategorias] = useState<Array<Categoria>>([])
  const [categoriaId, setCategoriaId] = useState<number | null>(null);

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
      .then((response)=>{
          setCategorias(response.data)
      })
      .catch((error)=>{
          console.error(error)
      })

  }, []);


  
  const [gerarGraficos, setgerarGraficos] = useState(false)
  function exibirgerarGraficos(id: number){
    setgerarGraficos(true);
    setCategoriaId(Number(id));

    
  }

  // Filtrar os ativos com base no nome da categoria e converter para id da categoria
  const ativosFiltrados = ativos.filter(
    ativo => ativo.id_categoria === categoriaId
  );

      function verificador(ativosFiltrados: any) {
                    // Verificar se há ativos filtrados
                    if (ativosFiltrados.length === 0) {
                      return (<><br /><br /><hr /><h5>------------- Não há ativos dessa Categoria ------------</h5><hr /></>);
                    };
                  }
                    


      // Calcular os estados e contar o número de ocorrências
      const estados = ativosFiltrados.map((ativo) => ativo.estado);
      const estadoCounts: Record<string, number> = estados.reduce((acc, estado) => {
        acc[estado] = (acc[estado] || 0) + 1;
        return acc;

      }, {});
  
      // Criar os dados para o gráfico
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
    <>
    <div className="RelatoriosInterface">

    
        <div className="BoxTabela">
            <h2>Categorias Cadastradas</h2>
            <table>

                <thead>
                  <th>Categorias</th>
                  <th>Relatorios</th>
                </thead>
                
                <tbody>
                  {categorias.map((categoria)=>(
                    <tr key={categoria.id}>
                      <td>{categoria.nome}</td>
                      
                      <td>
                         
                         <button id="botaoeditar" onClick={() => { exibirgerarGraficos(categoria.id); }}>Gerar Grafico </button>
                         
                         </td>
                         
                      

                    </tr>
                  ))}

                </tbody>

            </table>
        </div>

      {gerarGraficos && (
        <div className="graficos">  

          <div className="Graph">
            <h2>Gráfico de Estados dos Ativos</h2>
            {verificador(ativosFiltrados)}
            <Pie data={chartData} />
            
            
          </div>
          </div>

      )}

      </div>  
    </>
    );
}
