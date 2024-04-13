import { useState } from "react"
import axios from "axios"

export const AdicionaAtivo = () =>{
    const [nome, setNome]= useState('')
    const [rua, setRua]= useState('')
    const [bairro, setBairro]= useState('')
    const [complemento, setComplemento]= useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep]= useState('')
    const [erroNome, setErroNome] = useState('')
    let rota = 'http://localhost:8080/ativo/cadastrar'

    const registrar = () =>{
        setErroNome('')
        if(nome && rua && bairro && complemento && numero && cep){
            axios.post(rota, {nome, rua, bairro, complemento, numero, cep})
            .then(()=>{
                setNome('')
                setRua('')
                setBairro('')
                setComplemento('')
                setNumero('')
                setCep('')
                setErroNome('')
            })
        }
        else if(!nome && !rua && !bairro && !complemento && !numero && !cep ){
            setErroNome('Informe os valores em branco!')
        }
    }

    return(
        <div>
                <div>
                    <input type="text" value={nome} onChange={(dado)=>setNome(dado.target.value)} placeholder="Nome"/>
                </div>
                <div>
                    <input type="text" value={rua} onChange={(dado)=>setRua(dado.target.value)} placeholder="Rua" />
                </div>
                <div>
                    <input type="text" value={bairro} onChange={(dado)=>setBairro(dado.target.value)} placeholder="Bairro" />
                </div>
                <div>
                    <input type="text" value={complemento} onChange={(dado)=>setComplemento(dado.target.value)} placeholder="Complemento"/>
                </div>
                <div>
                    <input type="text" value={numero} onChange={(dado)=>setNumero(dado.target.value)} placeholder="Numero"/>
                </div>
                <div>
                    <input type="text" value={cep} onChange={(dado)=>setCep(dado.target.value)} placeholder="CEP"/>
                </div>
                <div className="input-group mb-3">
                    <button onClick={registrar}>Registrar</button>
                </div>
            {erroNome && <div style={{color: 'red'}}>{erroNome}</div>}
        </div>
    )
}