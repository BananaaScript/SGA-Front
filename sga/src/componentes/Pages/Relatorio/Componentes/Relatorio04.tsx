import React, { useState, useEffect } from "react";
import axios from "axios";
import {Modelo} from "../../../../modelos/modelo"
import { Ativo } from "../../../../modelos/ativo";
import { HistoricoAtivo } from "../../../../modelos/historicoativo";
import { formataData } from "../../../../functions/formataData";

export default function EditaAtivo() {
  const [historico, setHistorico] = useState<Array<HistoricoAtivo>>([]);
  const [ativo, setAtivo] = useState<Array<Ativo>>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/ativo/listarHistorico")
      .then((response) => {
        setHistorico(response.data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id));
      })
      .catch((error) => {
        console.error(error);
      });


      

  }, []);

  let idOrdem = [];

  for (let i = 0; i < historico.length; i++) {

    


  }
    
    

  return (
    <>
        <div className="BoxTabela">
        <h1>Histórico de ativos</h1>
            <table>
                    <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do ativo</th>
                                    <th>Modelo</th>
                                    <th>Número série</th>
                                    <th>Data da transação</th>
                                </tr>
                    </thead>
                    <tbody>
                    {historico.map((historico) => (
                    <tr key={historico.id}>
                                        
                                        <td>{historico.id}</td>
                                        <td>{historico.nomeAtivo}</td>
                                        <td>{historico.modelo}</td>
                                        <td>{historico.numeroSerie}</td>
                                        <td>{formataData(historico.dataTransacao)}</td>
                                </tr>
                    ))}
                    </tbody>
            </table>
        </div>

    
    </>
    );
}
