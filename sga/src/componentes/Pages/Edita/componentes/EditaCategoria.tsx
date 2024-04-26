import { useState } from "react"
import {Categoria} from "../../../../modelos/categoria"
import { useEffect } from "react"
import axios from "axios"
export default function EditaCategoria(){
    const [categorias, setCategorias] = useState<Array<Categoria>>([])
    const [id, setId] = useState('')
    const [nome, setNome]= useState('')
    const [descricao, setDescricao]= useState('')
    const [editando, setEditando] = useState(false)
    const [filtro, setFiltro] = useState<string>('');

    useEffect(()=>{
        axios.get('http://localhost:8080/categoria/listar')
        .then((response)=>{
            setCategorias(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    }, [])
    const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value);
    };

    const categoriasFiltrados = categorias.filter(categoria =>
        categoria.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        categoria.descricao.toLowerCase().includes(filtro.toLowerCase())
    );
    function Deletar(id: number){
        axios.delete(`http://localhost:8080/categoria/deletar/${id}`)
        .then(() =>{
            AtualizarValores();
        })
        .catch((error) =>{
            console.error(error)
        })
    }

    function Editar(id: any, nome: string, descricao: string){
        setId(id)
        setNome(nome)
        setDescricao(descricao)
        setEditando(true)
    }

    function Cancelar(){
        setEditando(false)
    }

    function Atualizar(){
        if(nome || descricao){
            axios.put(`http://localhost:8080/categoria/atualizar/${id}`, {nome, descricao})
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
                <input id="inputdofiltro"
                type="text"
                value={filtro}
                onChange={handleFiltroChange}
                placeholder="Filtrar por nomeou descrição"
            />
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>---</th>
                                <th>---</th>
                            </tr>
                        </thead>
                         <tbody>
                            {categorias.map((categoria)=>(
                                <tr key={categoria.id}>
                                    <td>{categoria.nome}</td>
                                    <td>{categoria.descricao}</td>
                                    <td><button onClick={()=>Deletar(categoria.id)}>Deletar</button></td>
                                        {!editando &&(<td><button onClick={() => Editar(categoria.id, categoria.nome, categoria.descricao)}>Editar</button></td>)}
                                </tr>
                            ))}
                        </tbody>
                </table>
                {editando?(
                    <>
                        <div>
                            <div className="BoxEditar">
                                <h2>Insira os Novos Dados da Categoria</h2>

                                <div className="EditarInputs">
                                
                                <p>Nome da Categoria</p>
                                    <input type="text" value= {nome} onChange={(dado)=> setNome(dado.target.value)} placeholder="(*OBRIGATORIO)"/>

                                <p>Descrição da Categoria</p>
                                    <input type="text" value= {descricao} onChange={(dado)=> setDescricao(dado.target.value)} placeholder="(*OBRIGATORIO)"/>

                                <p>Complemento da Categoria</p>
                                    <input type="text" placeholder="(*OPICONAL)"/>

                                </div>

                                <div>
                                    <button onClick={Atualizar}>Atualizar Categoria</button>
                                    <button onClick={Cancelar}>Cancelar Edição</button>
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