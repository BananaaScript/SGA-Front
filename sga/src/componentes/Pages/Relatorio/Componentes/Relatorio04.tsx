import React, { useState, useEffect } from "react";
import axios from "axios";
import {Modelo} from "../../../../modelos/modelo"
import { HistoricoAtivo } from "../../../../modelos/historicoativo";
import { formataData } from "../../../../functions/formataData";

export default function EditaAtivo() {
  const [historico, setHistorico] = useState<Array<HistoricoAtivo>>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/ativo/listarHistorico")
      .then((response) => {
        setHistorico(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);


    
    

  return (
    <>
        <div className="BoxTabela">
        <h1>Histórico de ativos</h1>
            <table>
                    <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do ativo</th>
                                    <th>Número série</th>
                                    <th>Data da transação</th>
                                </tr>
                    </thead>
                    <tbody>
                    {historico.map((historico) => (
                    <tr key={historico.id}>
                                        
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
