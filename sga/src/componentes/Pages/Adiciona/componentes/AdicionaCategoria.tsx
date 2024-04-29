import { useState } from "react"
import axios from "axios"
import {Categoria} from "../../../../modelos/categoria"
import { useEffect } from "react"
import "../Adicionar.css"

export default function AdicionaCategoria(){
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [erro, setErro] = useState('')
    const [categorias, setCategorias] = useState<Array<Categoria>>([])
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

    let rota = 'http://localhost:8080/categoria/cadastrar'

   function registrar(){
    console.clear()
    setErro('')
    let descricaoNaoInformada = descricao !== '' ? descricao : 'Não informado';
    if(nome !== ''){
        console.log(`conexão com banco de dados bem-sucedida, enviando dados`)
        axios.post(rota, {nome, descricao:descricaoNaoInformada})
        .then(()=>{
            setNome('')
            setDescricao('')
            setErro('')
        })
        .catch((error)=>{
            console.error(error)
        })
    }
    else{
        setErro('Preencha os campos vazios')
    }
    }
    return(
        <>
        <div className="ComponenteCadatro">
            <div className="BoxCadastro">

                    <h2>Insira os Dados da Categoria que Deseja Cadastrar</h2>

                    <div className="CadastroInputsFixo">
                <p>Nome da Categoria</p>
                    <input type="text" value={nome} onChange={(dado)=>setNome(dado.target.value)} placeholder="(OBRIGATORIO)" required/>

                <p>Descrição da Categoria</p>
                    <input type="text" value={descricao} onChange={(dado)=>setDescricao(dado.target.value)} placeholder="(OBRIGATORIO)" />

                <p>Complemento da Categoria</p>
                    <input type="text" placeholder="(*OPICONAL)" />

                </div>
                    <button onClick={registrar}>Registrar</button>

                {erro && <div style={{color:'red'}}>{erro}</div>}
            </div>
        </div>

                    
        <div className="Box02">
                <button>
                    Visualizar Categorias Cadastrados
                </button>

            </div>


        <div className="texto">
                <h2>Categorias cadastradas</h2>
        </div>
        <div className="TabelaCadastro">
        <table>
            <input id="inputdofiltro"
                type="text"
                value={filtro}
                onChange={handleFiltroChange}
                placeholder="Filtrar por nome ou descrição"
            />
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                         <tbody>
                            {categoriasFiltrados.map((categoria)=>(
                                <tr key={categoria.id}>
                                    <td>{categoria.nome}</td>
                                    <td>{categoria.descricao}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>
        </div>
        </>
        
    )
}