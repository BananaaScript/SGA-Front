import { useState } from "react"
import axios from "axios"
import {Categoria} from "../../../../modelos/categoria"
import { useEffect } from "react"
import "../Adicionar.css"

export default function AdicionaCategoria(){
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [complemento, setComplemento] = useState('')
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

   function registrar(){
        console.clear()
        let complementoNaoInformada = complemento !== '' ? complemento : 'Não informado';
        if(nome !== ''){
            axios.post('http://localhost:8080/categoria/cadastrar', {nome, descricao , complemento:complementoNaoInformada})
            .then(()=>{
                setNome('')
                setDescricao('')
                setComplemento('')
            })
            .catch((error)=>{
                console.error(error)
            })
        }
        else{
            alert("Preencha os campos obrigatórios!")
        }
    }

    const [tabelaCategorias, setTabelaCategorias] = useState(false)
    function exibirTabelaCategorias(){setTabelaCategorias(true)}
    function fecharTabelaCategorias(){setTabelaCategorias(false)}

    return(
        <>
        <div className="ComponenteCadatro">
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
                    <button onClick={registrar}>Registrar</button>
            </div>
        </div>
        <br /><br /><br />

                    
        <div className="Box">
                {!tabelaCategorias && (
                    <button onClick={exibirTabelaCategorias}> Visualizar Ativos Cadastrados </button>
                    
                    ) }
            </div>

    {tabelaCategorias && (
        <>
            <div className="texto">
                    <h2>Categorias cadastradas</h2>
                    <button onClick={fecharTabelaCategorias}>Fechar Tabela</button>
            </div>

            <div className="BoxTabela">
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

        )}
    </>
)
}
    