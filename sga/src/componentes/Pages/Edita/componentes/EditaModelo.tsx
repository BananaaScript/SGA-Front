import { useState } from "react"
import modelo from "../../../../modelos/modelo"
import { useEffect } from "react"
import axios from "axios"
export default function Editamodelo(){
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

    function Deletar(id: number){
        axios.delete(`http://localhost:8080/modelo/deletar/${id}`)
        .then(() =>{
            AtualizarValores();
        })
        .catch((error) =>{
            console.error(error)
        })
    }

    function Editar(id: any, nome: string, descricao: string, modelo: string){
        setId(id)
        setNome(nome)
        setDescricao(descricao)
        setModelo(modelo)
        setEditando(true)
    }

    function Cancelar(){
        setEditando(false)
    }

    function Atualizar(){
        if(nome || descricao){
            axios.put(`http://localhost:8080/modelo/atualizar/${id}`, {nome, descricao, modelo})
            .then(()=>{
                setEditando(false)
                setNome('')
                setDescricao('')
                AtualizarValores()
            })
            .catch((error)=>{
                console.error(error)
            })
        }
    }

    function AtualizarValores(){
        axios.get('http://localhost:8080/modelo/listar')
        .then((response) =>{
            setmodelos(response.data);
        })
    }


    return(
        <>
            <div>
                <h2>modelos cadastradas</h2>
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
                                    <td><button onClick={()=>Deletar(modelo.id)}>Deletar</button></td>
                                        {!editando &&(<td><button onClick={() => Editar(modelo.id, modelo.nome, modelo.descricao, modelo.modelo)}>Editar</button></td>)}
                                </tr>
                            ))}
                        </tbody>
                </table>
                {editando?(
                    <>
                        <div>
                            <div>
                                <div>
                                    <input type="text" value= {nome} onChange={(dado)=> setNome(dado.target.value)} placeholder="Novo nome"/>
                                </div>
                                <div>
                                    <input type="text" value= {descricao} onChange={(dado)=> setDescricao(dado.target.value)} placeholder="Nova descricao"/>
                                </div>
                                <div>
                                    <input type="text" value= {modelo} onChange={(dado)=> setModelo(dado.target.value)} placeholder="Novo modelo"/>
                                </div>
                                <div>
                                    <button onClick={Atualizar}>Atualizar modelo</button>
                                    <button onClick={Cancelar}>cancelar edição</button>
                                </div>
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