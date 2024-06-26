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
import { Bar }  from "react-chartjs-2";
import {Categoria} from "../../../../modelos/categoria"
import Roteador from "../../../Roteamento/roteador";
import Relatorio from "../Relatorio";
import { getIndexAxis } from "chart.js/dist/core/core.config";
import { setOptions } from "react-chartjs-2/dist/utils";

// Registrando os componentes necessários do Chart.js
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
      });

      axios.get('http://localhost:8080/ativo/totalvalorativos')
      .then((response)=>{
        setAtivosValorTotal(response.data)
      })
      .catch((error)=>{
        console.error(error)
      });
      

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
                      return (<><br /><br /><hr /><h5>---------- Não há ativos dessa Categoria ---------</h5><hr /></>);
                    };
                  }
                    


      // Calcular os estados e contar o número de ocorrências
      const estados = ativosFiltrados.map((ativo) => ativo.estado);
      const estadoCounts: Record<string, number> = estados.reduce((acc, estado) => {
        acc[estado] = (acc[estado] || 0) + 1;
        return acc;

      }, {});

      const tempos = ["5 anos atrás", "2 anos atrás","1 ano atrás",, "6 meses atrás",  "3 meses atrás", "Atualmente"]

      const valores = ["0","0","0", "0", "0", ativosValorTotal]

      
      const categoriaContagem = categorias.reduce<Record<string, number>>((acc, categoria) => {
        acc[categoria.nome] = ativos.filter(ativo => ativo.id_categoria === categoria.id).length;
        return acc;
      }, {});
      

  
      
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
        labels: Object.keys(categorias),
        
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

{gerarGraficos && (
        <>
        <div>      <hr /></div>
        <div className="graficos">  
        

          <div className="Graph1">
            <h2>Gráfico dos Valor Monetários dos Ativos</h2>
            <br /><br />
            <Bar data={chartDataValor}  /> 
          </div> 

          <div className="Graph2">
            <h2>Gráfico de Estados dos Ativos</h2>
            {verificador(ativosFiltrados)}
            <Pie data={chartDataEstado} />
            
            
          </div>
          </div>
          <div><br /><br /><br /><br /><br /><hr /></div>
          </>
      )} 

    <div className="RelatoriosInterface">


    
        <div className="BoxTabelaRelatorio">
            <h2>Categorias Cadastradas</h2>
            
            <table>
                <br />
                <thead>
                  <th>Categorias</th>
                  <th>Ativos (Quantidade)</th>
                  <th>Valor Total</th>
                  <th>Relatorios</th>
                </thead>
                
                <tbody>
                  {categorias.map((categoria)=>(
                    <tr key={categoria.id}>
                      <td>{categoria.nome}</td>
                      <td>{categoriaContagem[categoria.nome]}</td>
                      <td>{ativosValorTotal}</td>
                      
                      <td>
                         
                         <button id="botaoeditar" onClick={() => { exibirgerarGraficos(categoria.id); }}>Gerar Grafico </button>
                         
                         </td>
                         
                      

                    </tr>
                  ))}

                </tbody>

            </table>
        </div>

        <div className="Graph00">
            <h2>Quantidade de Ativos por Categoria</h2>
            <br />
            <Bar data={chartQuantiaCategorias} options={{indexAxis: 'y'}}></Bar>
          </div> 


      </div>  
      <br /><br /><br /><br /><br />
    </>
    );
}
