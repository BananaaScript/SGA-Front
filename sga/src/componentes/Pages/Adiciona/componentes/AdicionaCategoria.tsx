import { useState } from "react"
import axios from "axios"
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
        <div>
                <div>
                    <input type="text" value={nome} onChange={(dado)=>setNome(dado.target.value)} placeholder="Nome" required/>
                </div>
                <div>
                    <input type="text" value={descricao} onChange={(dado)=>setDescricao(dado.target.value)} placeholder="Descrição" />
                </div>
                <div>
                    <button onClick={registrar}>Registrar</button>
                </div>
                {erro && <div style={{color:'red'}}>{erro}</div>}
        </div>
        </>
    )
}