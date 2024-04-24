import { useState } from "react"
import axios from "axios"
import {Ativo} from "../../../../modelos/ativo"
import { useEffect } from "react"
import "../Adicionar.css"

export const AdicionaAtivo = () =>{
    const [nome, setNome]= useState('')
    const [dataManutencao, setDataManutencao] = useState('')
    const [rua, setRua]= useState('')
    const [bairro, setBairro]= useState('')
    const [complemento, setComplemento]= useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep]= useState('')
    const [erroNome, setErro] = useState('')
    const [ativos, setAtivos] = useState<Array<Ativo>>([])

    useEffect(()=>{
        axios.get('http://localhost:8080/ativo/listar')
        .then((response)=>{
            setAtivos(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    }, [])
    let rota = 'http://localhost:8080/ativo/cadastrar'

    function registrar(){
        console.clear()
        setErro('')
        if(nome && dataManutencao && rua && bairro && complemento && numero && cep){
            console.log(`conexão com banco de dados bem-sucedida, enviando dados`)
            axios.post(rota, {nome, dataManutencao, rua, bairro, complemento, numero, cep})
            .then(()=>{
                setNome('')
                setDataManutencao('')
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
                    <label>Data de manutenção</label>
                    <input type="date" value={dataManutencao} onChange={(dado)=>setDataManutencao(dado.target.value)}  />

                    <input type="text" value={rua} onChange={(dado)=>setRua(dado.target.value)} placeholder="Rua" />
 
                    <input type="text" value={bairro} onChange={(dado)=>setBairro(dado.target.value)} placeholder="Bairro" />
 
                    <input type="text" value={complemento} onChange={(dado)=>setComplemento(dado.target.value)} placeholder="Complemento"/>

                    <input type="number" value={numero} onChange={(dado)=>setNumero(dado.target.value)} placeholder="Numero"/>

                    <input type="number" value={cep} onChange={(dado)=>setCep(dado.target.value)} placeholder="CEP"/>

                    <button onClick={registrar}>Registrar</button>
                
                {erroNome && <div style={{color: 'red'}}>{erroNome}</div>}
            </div>
            <div className="texto">
                <h2>Ativos cadastrados</h2>
            </div>
            <div className="TabelaCadastro">
                <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Rua</th>
                                <th>Bairro</th>
                                <th>Complemento</th>
                                <th>Numero</th>
                                <th>CEP</th>
                            </tr>
                        </thead>
                         <tbody>
                            {ativos.map((ativo)=>(
                                <tr key={ativo.id}>
                                    <td>{ativo.nome}</td>
                                    <td>{ativo.rua}</td>
                                    <td>{ativo.bairro}</td>
                                    <td>{ativo.complemento}</td>
                                    <td>{ativo.numero}</td>
                                    <td>{ativo.cep}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>
        </div>
        </div>
        
    )
}