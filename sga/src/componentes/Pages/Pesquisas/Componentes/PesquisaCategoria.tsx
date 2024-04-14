import { useState } from "react"
import Categoria from "../../../../modelos/categoria"
import { useEffect } from "react"
import axios from "axios"


export default function PesquisaCategoria(){
    const [categorias, setCategorias] = useState<Array<Categoria>>([])
    const [id, setId] = useState('')
    const [nome, setNome]= useState('')
    const [descricao, setDescricao]= useState('')
    const [editando, setEditando] = useState(false)

    useEffect(()=>{
        axios.get('http://localhost:8080/categoria/listar')
        .then((response)=>{
            setCategorias(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    }, [])


    function AtualizarValores(){
        axios.get('http://localhost:8080/categoria/listar')
        .then((response) =>{
            setCategorias(response.data);
        })
    }


    return(
        <>
            <div className="BoxTabela">
                <h2>Categorias Cadastradas</h2>
                <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                
                            </tr>
                        </thead>
                         <tbody>
                            {categorias.map((categoria)=>(
                                <tr key={categoria.id}>
                                    <td>{categoria.nome}</td>
                                    <td>{categoria.descricao}</td>
                                    
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