import { useState } from "react"
import Ativo from "../../../modelos/ativo"
import axios from "axios"

export const CadastrarAtivo = () =>{
    const [nome, setNome]= useState('')
    const [rua, setRua]= useState('')
    const [bairro, setBairro]= useState('')
    const [complemento, setComplemento]= useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep]= useState('')
    const [erroNome, setErroNome] = useState('')
    const [info, setInfo] = useState('')

    const registrar = () =>{
        setErroNome('')
        if(nome && rua && bairro && complemento && numero && cep){
            axios.post('http://localhost:8080/ativo/cadastrar', {nome, rua, bairro, complemento, numero, cep})
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
        <div className="container-fluid">
            <form>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={nome} onChange={(dado)=>setNome(dado.target.value)} placeholder="Nome" aria-describedby="basic-addon1" aria-required/>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={rua} onChange={(dado)=>setRua(dado.target.value)} placeholder="Rua" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={bairro} onChange={(dado)=>setBairro(dado.target.value)} placeholder="Bairro" aria-describedby="basic-addon1" />
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={complemento} onChange={(dado)=>setComplemento(dado.target.value)} placeholder="Complemento" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={numero} onChange={(dado)=>setNumero(dado.target.value)} placeholder="Numero" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={cep} onChange={(dado)=>setCep(dado.target.value)} placeholder="CEP" aria-describedby="basic-addon1"/>
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary" onClick={registrar}>Registrar</button>
                </div>
            </form>
            {erroNome && <div className="alert alert-danger container-fluid" style={{color: 'red'}} role="alert">{erroNome}</div>}
        </div>
    )
}