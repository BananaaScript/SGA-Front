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
    const [estado, setEstadoAtivo] = useState('')
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

     return(
        <>
        <div>
            <div className="BoxTabela">
                <h2>Ativos Cadastrados</h2>
                    <input 
                        type="text"
                        value={filtro}
                        onChange={handleFiltroChange}
                        placeholder="Filtrar por Nome"
                    />
                <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Número ativo</th>
                                <th>Estado do Ativo</th>
                                <th>Data de Manutenção</th>
                            </tr>
                        </thead>
                         <tbody>
                            {ativosFiltrados.map((ativo)=>(
                                <tr key={ativo.id}>
                                    <td>{ativo.nome}</td>
                                    <td>{ativo.numAtivo}</td>
                                    <td>{ativo.estado}</td>

                                    <td>{formataData(ativo.dataManutencao)}</td>

                                    
                                </tr>
                            ))}
                        </tbody>
                </table>
            </div>
        </div>
        </>
    )
}