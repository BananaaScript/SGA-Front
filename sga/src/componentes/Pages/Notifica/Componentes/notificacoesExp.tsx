import { useState, useEffect } from "react"
import axios from "axios"
import { Ativo } from "../../../../modelos/ativo"
import { Notificacao } from "../../../../modelos/notificacao"
import { formataData } from "../../../../functions/formataData"

export default function NotificacaoExp(){
    const [ativosExpirados, setAtivosExpirados] = useState<Array<Ativo>>([])
    const [notificacoes, setNotificacoes] = useState<Array<Notificacao>>([])

    useEffect(()=>{

        axios.get('http://localhost:8080/notifica/expirados')
        .then((response)=>{
            setAtivosExpirados(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    }, [])

    function definirCor(dias:any){
        if(dias <= 3){
           return { backgroundColor: '#ffff00' }
        }
        else if(dias > 3 && dias <= 10){
            return { backgroundColor: '#add8e6' }
        }
    }

    return(
        <>
            <div>
                <div>
                    <div>
                        <h3>Notificações expiradas:</h3>
                        <table>
                            <tr>
                                <th>Nome do ativo</th>
                                <th>Data de manutenção</th>
                            </tr>
                            <tbody>
                                {ativosExpirados.map((ativo)=>(
                                    <tr key={ativo.id}>
                                        <td>{ativo.nome}</td>
                                        <td>{formataData(ativo.dataManutencao)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}