import { useState } from "react"
import axios from "axios"
import "../Adicionar.css"

export const AdicionaAtivo = () =>{
    const [nome, setNome]= useState('')
    const [rua, setRua]= useState('')
    const [bairro, setBairro]= useState('')
    const [complemento, setComplemento]= useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep]= useState('')
    const [erroNome, setErro] = useState('')
    let rota = 'http://localhost:8080/ativo/cadastrar'

    function registrar(){
        console.clear()
        setErro('')
        if(nome && rua && bairro && complemento && numero && cep){
            console.log(`conexão com banco de dados bem-sucedida, enviando dados`)
            axios.post(rota, {nome, rua, bairro, complemento, numero, cep})
            .then(()=>{
                setNome('')
                setRua('')
                setBairro('')
                setComplemento('')
                setNumero('')
                setCep('')
                setErro('')
            })
            .catch((error)=>{
                console.error(error)
            })
        }
        else if(!nome && !rua && !bairro && !complemento && !numero && !cep ){
            setErro('Informe os valores em branco!')
        }
    }
    return(
        <div className="ComponenteCadatro">
            <div className="BoxCadastro">

                    <h2>Insira os Dados do Ativo que Deseja Cadastrar</h2>
                
                    <input type="text" value={nome} onChange={(dado)=>setNome(dado.target.value)} placeholder="Nome"/>

                    <input type="text" value={rua} onChange={(dado)=>setRua(dado.target.value)} placeholder="Rua" />
 
                    <input type="text" value={bairro} onChange={(dado)=>setBairro(dado.target.value)} placeholder="Bairro" />
 
                    <input type="text" value={complemento} onChange={(dado)=>setComplemento(dado.target.value)} placeholder="Complemento"/>

                    <input type="number" value={numero} onChange={(dado)=>setNumero(dado.target.value)} placeholder="Numero"/>

                    <input type="number" value={cep} onChange={(dado)=>setCep(dado.target.value)} placeholder="CEP"/>

                    <button onClick={registrar}>Registrar</button>
                
                {erroNome && <div style={{color: 'red'}}>{erroNome}</div>}
            
            </div>
        </div>
    )
}