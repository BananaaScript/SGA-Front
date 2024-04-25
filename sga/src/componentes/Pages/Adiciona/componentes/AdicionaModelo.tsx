import { useState } from "react"
import axios from "axios"
import "../Adicionar.css"
import { useEffect } from "react"
import {Modelo}  from "../../../../modelos/modelo"
import { Categoria } from "../../../../modelos/categoria"

export default function AdicionaModelo(){
    const [nome, setNome] = useState('')
    const [modelo, setModelo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [erro, setErro] = useState('')
    const [modelos, setmodelos] = useState<Array<Modelo>>([])
    const [categorias, setCategorias] = useState<Array<Categoria>>([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [filtro, setFiltro] = useState<string>('');

    useEffect(()=>{
        axios.get('http://localhost:8080/modelo/listar')
        .then((response)=>{
            setmodelos(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })

        axios.get('http://localhost:8080/categoria/listar')
        .then((response)=>{
            setCategorias(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })

    }, [])
    let rota = 'http://localhost:8080/modelo/cadastrar'

    const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value);
    };

    const modelosFiltrados = modelos.filter(modelo =>
        modelo.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        modelo.modelo.toLowerCase().includes(filtro.toLowerCase()) ||
        modelo.descricao.toLowerCase().includes(filtro.toLowerCase())
    );
   function registrar(){
    console.clear()
    setErro('')

    const categoriaSelecionadaObj = categorias.find(Categoria => Categoria.nome === categoriaSelecionada);
    const id_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.id : null;
    const nome_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.nome : null;

    let descricaoNaoInformada = descricao !== '' ? descricao : 'Não informado';
    if(nome !== '' && modelo !== ''){
        console.log(`conexão com banco de dados bem-sucedida, enviando dados`)
        axios.post(rota, {nome, descricao:descricaoNaoInformada, modelo, id_categoria, nome_categoria})
        .then(()=>{
            setNome('')
            setModelo('')
            setDescricao('')
            setCategoriaSelecionada('')
            setErro('')
        })
        .catch((error)=>{
            console.error(error)
        })
    }
    else{
        setErro('Preencha os campos nome e modelo')
    }
    }
    return(
        <>
        <div className="ComponenteCadatro">
            <div className="BoxCadastro">

                    <h2>Insira os Dados do Modelo que Deseja Cadastrar</h2>

                    <input type="text" value={nome} onChange={(dado)=>setNome(dado.target.value)} placeholder="Nome" required/>

                    <input type="text" value={modelo} onChange={(dado)=>setModelo(dado.target.value)} placeholder="Modelo" required/>

                    <input type="text" value={descricao} onChange={(dado)=>setDescricao(dado.target.value)} placeholder="Descrição" />
                    
                    <select value={categoriaSelecionada} onChange={(dado) => setCategoriaSelecionada(dado.target.value)}>
                        <option value="">Selecione a Categoria</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
                        ))}
                    </select>

                    <button onClick={registrar}>Registrar</button>

                {erro && <div style={{color:'red'}}>{erro}</div>}
            </div>
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
                placeholder="Filtrar por nome, modelo ou descrição"
            />
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Modelo</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                         <tbody>
                            {modelos.map((modelo)=>(
                                <tr key={modelo.id}>
                                    <td>{modelo.nome}</td>
                                    <td>{modelo.modelo}</td>
                                    <td>{modelo.descricao}</td>
                                    <td>{modelo.nome_categoria}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>
        </div>
        </>
    )
}