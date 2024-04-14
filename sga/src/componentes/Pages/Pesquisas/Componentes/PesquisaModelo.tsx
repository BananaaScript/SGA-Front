import { useState } from "react"
import modelo from "../../../../modelos/modelo"
import { useEffect } from "react"
import axios from "axios"


export default function PesquisaModelo(){
    const [modelos, setmodelos] = useState<Array<modelo>>([])
    const [id, setId] = useState('')
    const [nome, setNome]= useState('')
    const [descricao, setDescricao]= useState('')
    const [modelo, setModelo] = useState('')
    const [editando, setEditando] = useState(false)

    useEffect(()=>{
        axios.get('http://localhost:8080/modelo/listar')
        .then((response)=>{
            setmodelos(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    }, [])


    function AtualizarValores(){
        axios.get('http://localhost:8080/modelo/listar')
        .then((response) =>{
            setmodelos(response.data);
        })
    }


    return(
        <>
            <div className="BoxTabela">
                <h2>Modelos Cadastrados</h2>
                <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Modelo</th>
                                <th>Descrição</th>
                                
                            </tr>
                        </thead>
                         <tbody>
                            {modelos.map((modelo)=>(
                                <tr key={modelo.id}>
                                    <td>{modelo.nome}</td>
                                    <td>{modelo.modelo}</td>
                                    <td>{modelo.descricao}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                </table>
                {editando?(
                    <>
                        <div>
                            <div className="BoxEditar">
                                    <h2>Insira os Novos Dados da Categoria</h2>
                                
                                    <input type="text" value= {nome} onChange={(dado)=> setNome(dado.target.value)} placeholder="Novo nome"/>

                                    <input type="text" value= {descricao} onChange={(dado)=> setDescricao(dado.target.value)} placeholder="Nova descricao"/>

                                    <input type="text" value= {modelo} onChange={(dado)=> setModelo(dado.target.value)} placeholder="Novo modelo"/>

                                    
                                
                            </div>
                        </div>
                    </>
                ):
                (
                    <>

                    </>
                )}
            </div>
        </>
    )
}