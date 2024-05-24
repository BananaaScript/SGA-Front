import { useState } from "react"
import { Categoria } from "../../../../modelos/categoria"
import { Modelo } from "../../../../modelos/modelo"
import { Usuario } from "../../../../modelos/usuario"
import axios from "axios"
import {Ativo} from "../../../../modelos/ativo"
import { useEffect } from "react"


export default function Tabela03(){

    const [nome, setNome]= useState('')
    const [descricao, setDescricao] = useState('')
    const [complementoAtivo, setComplementoAtivo] = useState('')

    const [valor, setValor] = useState('')
    const [numAtivo, setNumeroAtivo] = useState('')
    const [dataManutencao, setDataManutencao] = useState('')
    const [dataTransacao, setDataTransacao] = useState('')
    const [rua, setRua]= useState('')
    const [bairro, setBairro]= useState('')
    const [cidade, setCidade]= useState('')
    const [pais, setPais]= useState('')
    const [complemento, setComplemento]= useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep]= useState('')
    const [estado, setEstado] = useState('')
    const [modeloSelecionado, setModeloSelecionado] = useState('');
    const [modelos, setModelos] = useState<Array<Modelo>>([])
    const [categorias, setCategorias] = useState<Array<Categoria>>([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([])
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
    const [ativos, setAtivos] = useState<Array<Ativo>>([])
    const [filtro, setFiltro] = useState<string>('');

    useEffect(()=>{
        axios.get('http://localhost:8080/ativo/listar')
        .then((response)=>{
            setAtivos(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })

        axios.get('http://localhost:8080/modelo/listar')
        .then((response) => {
            const todosModelos: Modelo[] = response.data; 
            if (categoriaSelecionada) {
                const categoriaSelecionadaObj = categorias.find(categoria => categoria.nome === categoriaSelecionada);
                const id_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.id : null;

                if (id_categoria) {
                    const modelosFiltrados = todosModelos.filter((modelo: Modelo) => modelo.id_categoria === id_categoria); 
                    setModelos(modelosFiltrados);
                }
            } 
        })
        .catch((error) => {
            console.error(error);
        });

        axios.get('http://localhost:8080/categoria/listar')
        .then((response) => {
            setCategorias(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

        axios.get('http://localhost:8080/usuario/listar')
        .then((response) => {
            setUsuarios(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
        
    }, [categoriaSelecionada, categorias])
    
    const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value);
    };

    const ativosFiltrados = ativos.filter(ativo =>
        ativo.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.responsavel.toLowerCase().includes(filtro.toLowerCase())
    );


    return(
        <>
                <div>

                <div className="texto">
                    <h2>Monitoramento dos Ativos por Responsável</h2>

                </div>

                <div className="BoxTabela">
                            <input 
                                type="text"
                                value={filtro}
                                onChange={handleFiltroChange}
                                placeholder="Filtrar por Nome ou Responsável..."
                            />
                        <table>

                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descricão</th>
                                    <th>Número do Ativo</th>
                                    <th>Categoria</th>
                                    <th>Modelo</th>
                                    
                                    

                                    <th id="ClasseEspecialBusca">Responsável</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ativosFiltrados.map((ativo)=>(
                                <tr key={ativo.id}>
                                    <td>{ativo.nome}</td>
                                    <td>{ativo.descricao}</td>
                                    <td>{ativo.numAtivo}</td>
                                    <td>{ativo.nome_categoria}</td>
                                    <td>{ativo.nome_modelo}</td>
                                    
                                    
                                    <td id="ClasseEspecialBusca">{ativo.responsavel}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table> <br /><br />
                    </div>
                </div>
        </>
    )
}