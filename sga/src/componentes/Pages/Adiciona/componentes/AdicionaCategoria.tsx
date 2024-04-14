import { useState } from "react"
import axios from "axios"
import "../Adicionar.css"

export default function AdicionaCategoria(){
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [erro, setErro] = useState('')
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

                    <input type="text" value={nome} onChange={(dado)=>setNome(dado.target.value)} placeholder="Nome" required/>

                    <input type="text" value={descricao} onChange={(dado)=>setDescricao(dado.target.value)} placeholder="Descrição" />

                    <button onClick={registrar}>Registrar</button>

                {erro && <div style={{color:'red'}}>{erro}</div>}
            </div>
        </div>
        </>
    )
}