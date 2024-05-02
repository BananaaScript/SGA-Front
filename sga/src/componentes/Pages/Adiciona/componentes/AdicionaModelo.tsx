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
    const [fabricante, setFabricante] = useState('')
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

    const categoriaSelecionadaObj = categorias.find(Categoria => Categoria.nome === categoriaSelecionada);
    const id_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.id : null;
    const nome_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.nome : null;

    let fabricanteNinformado= fabricante !== '' ? fabricante : 'Não informado';
    let modeloNinformado = modelo !== '' ? modelo : 'Não informado';

    if(nome && descricao && categoriaSelecionada){
        axios.post('http://localhost:8080/modelo/cadastrar', {id_categoria, nome_categoria, nome, descricao, modelo: modeloNinformado, fabricante: fabricanteNinformado})
        .then(()=>{
            setNome('')
            setModelo('')
            setDescricao('')
            setFabricante('')
            setCategoriaSelecionada('')
        })
        .catch((error)=>{
            console.error(error)
        })
    }
    else if(!nome || !descricao || !categoriaSelecionada){
        alert("Verifique os campos obrigatórios!")
    }
    }


    const [tabelaModelos, setTabelaModelos] = useState(false)
    function exibirTabelaModelos(){setTabelaModelos(true)}
    function fecharTabelaModelos(){setTabelaModelos(false)}

    return(
        <>
        <div className="ComponenteCadatro">
            <div className="BoxCadastro">
                
 
                    <h2>Insira os Dados do Modelo que Deseja Cadastrar</h2>
                
                <div className="CadastroInputs">

                <p>Nome do Modelo *</p>
                    <input type="text" value={nome} onChange={(event)=>setNome(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>

                <p>Descrição do Modelo *</p>
                    <input type="text" value={descricao} onChange={(event)=>setDescricao(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>
                    
                <p>Modelo Referente do Ativo</p>
                    <input type="text" value={modelo} onChange={(event)=>setModelo(event.target.value)} placeholder="(OPCIONAL)"/>

                <p>Fabricante do Modelo</p>
                    <input type="text" value={fabricante} onChange={(event) => setFabricante(event.target.value)} placeholder="(OPCIONAL)" />

                <p>Categoria Referente ao Modelo *</p>
                    <select value={categoriaSelecionada} onChange={(dado) => setCategoriaSelecionada(dado.target.value)} required>
                        <option value="">Selecione a Categoria</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
                        ))}
                    </select>
                
                </div>

                    <button onClick={registrar}>Registrar</button>
            </div>
        </div>

                    
        <div className="Box">
                {!tabelaModelos && (
                <button onClick={exibirTabelaModelos}>Visualizar Modelos Cadastrados</button>
                )}


            </div>

{tabelaModelos &&(
    <>
        <div className="texto">
                <h2>Categorias cadastradas</h2>
            <button onClick={fecharTabelaModelos}>Fechar Tabela</button>
        </div>
        <div className="BoxTabela">
            <input
                    type="text"
                    value={filtro}
                    onChange={handleFiltroChange}
                    placeholder="Filtrar por Nome, Modelo ou Descrição"
                />
                <table>
        
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Modelo</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                         <tbody>
                            {modelosFiltrados.map((modelo)=>(
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
    )}
    </>
)}
