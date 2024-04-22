import { useState } from "react"
import axios from "axios"
import "../Adicionar.css"
import { useEffect } from "react"
import modelo from "../../../../modelos/modelo"

export default function AdicionaModelo(){
    const [nome, setNome] = useState('')
    const [modelo, setModelo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [erro, setErro] = useState('')
    const [modelos, setmodelos] = useState<Array<modelo>>([])
    const [id, setId] = useState('')
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
    let rota = 'http://localhost:8080/modelo/cadastrar'

   function registrar(){
    console.clear()
    setErro('')
    let descricaoNaoInformada = descricao !== '' ? descricao : 'Não informado';
    if(nome !== '' && modelo !== ''){
        console.log(`conexão com banco de dados bem-sucedida, enviando dados`)
        axios.post(rota, {nome, descricao:descricaoNaoInformada, modelo})
        .then(()=>{
            setNome('')
            setModelo('')
            setDescricao('')
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

                    <button onClick={registrar}>Registrar</button>

                {erro && <div style={{color:'red'}}>{erro}</div>}
            </div>
        </div>
        <div className="texto">
                <h2>Categorias cadastradas</h2>
        </div>
        <div className="TabelaCadastro">
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
        </div>
        </>
    )
}