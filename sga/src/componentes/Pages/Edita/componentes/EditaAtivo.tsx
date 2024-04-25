import { useState } from "react"
import {Ativo} from "../../../../modelos/ativo"
import { useEffect } from "react"
import axios from "axios"
import {format} from 'date-fns'

export default function EditaAtivo(){
    const[ativos, setAtivos] = useState<Array<Ativo>>([])
    const [id, setId] = useState('')
    const [nome, setNome]= useState('')
    const [numeroAtivo, setNumeroAtivo] = useState('')
    const [dataManutencao, setDataManutencao] = useState('')
    const [rua, setRua]= useState('')
    const [bairro, setBairro]= useState('')
    const [complemento, setComplemento]= useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep]= useState('')
    const [editando, setEditando] = useState(false)
    const [filtro, setFiltro] = useState<string>('');

    useEffect(()=>{
        axios.get('http://localhost:8080/ativo/listar')
        .then((response)=>{
            setAtivos(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    }, [])
    const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value);
    };

    const ativosFiltrados = ativos.filter(ativo =>
        ativo.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.rua.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.bairro.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.complemento.toLowerCase().includes(filtro.toLowerCase()) 
    );

    function formataData(data: string){
        const dataFormatada = format(new Date(data), 'dd/MM/yyyy')
        dataFormatada.toString()
        return dataFormatada
    }

    function Atualizar(){
        if(nome || numeroAtivo || dataManutencao || rua || bairro || complemento || numero || cep){
            axios.put(`http://localhost:8080/ativo/atualizar/${id}`, {nome, dataManutencao, rua, bairro, complemento, numero, cep})
            .then(()=>{
                setEditando(false)
                setNome('')
                setNumeroAtivo('')
                setDataManutencao('')
                setRua('')
                setBairro('')
                setComplemento('')
                setNumero('')
                setCep('')
                AtualizarValores()
            })
            .catch((error)=>{
                console.error(error)
            })
        }
    }
    function Editar(id: any, nome: string, dataManutencao: string, rua: string, bairro: string, complemento: string, numero: any, cep: string){
        setId(id)
        setNome(nome)
        setDataManutencao(dataManutencao)
        setRua(rua)
        setBairro(bairro)
        setComplemento(complemento)
        setNumero(numero)
        setCep(cep)
        setEditando(true)
    }
    function Cancelar(){
        setEditando(false)
    }

    function Deletar(id: number){
        axios.delete(`http://localhost:8080/ativo/deletar/${id}`)
        .then(() =>{
            AtualizarValores();
        })
        .catch((error) =>{
            console.error(error)
        })
    }
    function AtualizarValores(){
        axios.get('http://localhost:8080/ativo/listar')
        .then((response) =>{
            setAtivos(response.data);
        })
    }

    return(
        <>
        <div>
            <div className="BoxTabela">
                <h2>Ativos Cadastrados</h2>
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
                                <th>Número ativo</th>
                                <th>Data Manutenção</th>
                                <th>Rua</th>
                                <th>Bairro</th>
                                <th>Complemento</th>
                                <th>Numero</th>
                                <th>CEP</th>
                                <th>---</th>
                                <th>---</th>
                            </tr>
                        </thead>
                         <tbody>
                            {ativos.map((ativo)=>(
                                <tr key={ativo.id}>
                                    <td>{ativo.nome}</td>
                                    <td>{ativo.numAtivo}</td>
                                    <td>{formataData(ativo.dataManutencao)}</td>
                                    <td>{ativo.rua}</td>
                                    <td>{ativo.bairro}</td>
                                    <td>{ativo.complemento}</td>
                                    <td>{ativo.numero}</td>
                                    <td>{ativo.cep}</td>
                                    <td><button onClick={()=>Deletar(ativo.id)}>Deletar</button></td>
                                        {!editando &&(<td><button onClick={() => Editar(ativo.id, ativo.nome, ativo.dataManutencao, ativo.rua, ativo.bairro, ativo.complemento, ativo.numero, ativo.cep)}>Editar</button></td>)}
                                </tr>
                            ))}
                        </tbody>
                </table>
                {editando?(
                    <>
                        <div>
                            <div className="BoxEditar">
                                    <h2>Insira os Novos Dados da Categoria</h2>

                                    <input type="text" value= {nome} onChange={(dado)=> setNome(dado.target.value)} placeholder="Novo nome"/>

                                    <input type="date" value={dataManutencao} onChange={(dado)=> setDataManutencao(dado.target.value)} />

                                    <input type="text" value= {rua} onChange={(dado)=> setRua(dado.target.value)} placeholder="Nova rua"/>

                                    <input type="text" value= {complemento} onChange={(dado)=> setComplemento(dado.target.value)} placeholder="Novo complemento"/>

                                    <input type="text" value= {numero} onChange={(dado)=> setNumero(dado.target.value)} placeholder="Novo numero"/>

                                    <input type="text" value= {cep} onChange={(dado)=> setCep(dado.target.value)} placeholder="Novo CEP"/>

                                    <button onClick={Atualizar}>Atualizar Ativo</button>
                                    <button onClick={Cancelar}>Cancelar Edição</button>

                            </div>
                        </div>
                    </>
                ):
                (
                    <>

                    </>
                )}
            </div>
        </div>
        </>
    )
}