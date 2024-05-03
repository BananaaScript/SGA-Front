import { useState, useEffect } from "react"
import axios from "axios"
import { Ativo } from "../../../../modelos/ativo"
import { Notificacao } from "../../../../modelos/notificacao"
import { formataData } from "../../../../functions/formataData"

export default function Notificacao1(){
    const [ativosExpirados, setAtivosExpirados] = useState<Array<Ativo>>([])
    const [notificacoes, setNotificacoes] = useState<Array<Notificacao>>([])

    useEffect(()=>{
        axios.get('http://localhost:8080/notifica/listar')
        .then((response)=>{
            setNotificacoes(response.data)
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
                        <h3>Notificações:</h3>
                        <table>
                            <tr>
                                <th>Usuário</th>
                                <th>Data de expiração</th>
                                <th>Dias até expirar</th>
                            </tr>
                            <tbody>
                                {notificacoes.map((noti)=>(
                                    <tr key={noti.id} style={definirCor(noti.dias)}>
                                        <td>{noti.usuario}</td>
                                        <td>{formataData(noti.dataExpiracao)}</td>
                                        <td>{noti.dias}</td>
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