import { useState } from "react"
import {Categoria} from "../../../../modelos/categoria"
import { useEffect } from "react"
import axios from "axios"
export default function EditaCategoria(){
    const [categorias, setCategorias] = useState<Array<Categoria>>([])
    const [id, setId] = useState('')
    const [nome, setNome]= useState('')
    const [descricao, setDescricao]= useState('')
    const [complemento, setComplemento] = useState('')
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
            alert("Categoria deletada com sucesso!")
            AtualizarValores();
        })
        .catch((error) =>{
            console.error(error)
        })
    }

    function Editar(id: any, nome: string, descricao: string, complemento: string){
        setId(id)
        setNome(nome)
        setDescricao(descricao)
        setComplemento(complemento)
        setEditando(true)
    }

    function Cancelar(){
        setEditando(false)
    }

    function Atualizar(){
        if(nome || descricao ){
            axios.put(`http://localhost:8080/categoria/atualizar/${id}`, {nome, descricao})
            .then(()=>{
                setEditando(false)
                setNome('')
                setDescricao('')
                setComplemento('')
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
            <input 
                type="text"
                value={filtro}
                onChange={handleFiltroChange}
                placeholder="Filtrar por Nome ou Descrição"
            />
                <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                {!editando && (<th>---</th>)}
                                {!editando && (<th>---</th>)}
                            </tr>
                        </thead>
                         <tbody>
                            {categoriasFiltrados.map((categoria)=>(
                                <tr key={categoria.id}>
                                    <td>{categoria.nome}</td>
                                    <td>{categoria.descricao}</td>
                                    {!editando && (<td><button id="botaodeletar" onClick={()=>Deletar(categoria.id)}>Deletar</button></td>)}
                                    {!editando &&(<td><button id="botaoeditar" onClick={() => Editar(categoria.id, categoria.nome, categoria.descricao, categoria.complemento)}>Editar</button></td>)}
                                </tr>
                            ))}
                        </tbody>
                </table>
                {editando ?(
                    <>
                        <div>
                        <div className="BoxCadastro" >

                                <h2>Insira os Dados da Categoria que Deseja Cadastrar</h2>

                                <div className="CadastroInputsFixo">
                                <p>Nome da Categoria *</p>
                                <input type="text" value={nome} onChange={(event)=>setNome(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>

                                <p>Descrição da Categoria *</p>
                                <input type="text" value={descricao} onChange={(event)=>setDescricao(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>

                                <p>Complemento da Categoria</p>
                                <input type="text" value={complemento} onChange={(event) => setComplemento(event.target.value)} placeholder="(OPCIONAL)" />

                                </div>

                                <div className="botoes"> <hr />

                                    <button id="botaoatualizar" onClick={Atualizar}>Atualizar Ativo</button>
                                    <br /><br />
                                    <button id="botaocancelar" onClick={Cancelar}>Cancelar Edição</button>
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