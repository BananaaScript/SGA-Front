import { useState } from "react"
import {Ativo} from "../../../../modelos/ativo"
import { useEffect } from "react"
import axios from "axios"
import { formataData } from "../../../../functions/formataData"
import { Categoria } from "../../../../modelos/categoria"
import { Modelo } from "../../../../modelos/modelo"

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
    const [modeloSelecionado, setModeloSelecionado] = useState('');
    const [modelos, setModelos] = useState<Array<Modelo>>([])
    const [categorias, setCategorias] = useState<Array<Categoria>>([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
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
        
    }, [categoriaSelecionada, categorias])
    const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value);
    };

    const ativosFiltrados = ativos.filter(ativo =>
        ativo.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.rua.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.bairro.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.complemento.toLowerCase().includes(filtro.toLowerCase()) 
    );

    function Atualizar(){
        
        const modeloSelecionadoObj = modelos.find(modelo => modelo.nome === modeloSelecionado);
        const id_modelo = modeloSelecionadoObj ? modeloSelecionadoObj.id : null;
        const nome_modelo = modeloSelecionadoObj ? modeloSelecionadoObj.nome : null;

        const categoriaSelecionadaObj = categorias.find(categoria => categoria.nome === categoriaSelecionada);
        const id_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.id : null;
        const nome_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.nome : null;

        if(nome || numeroAtivo || dataManutencao || rua || bairro || complemento || numero || cep){
            console.log("entrandoooooooooooooooooooooo")
            axios.put(`http://localhost:8080/ativo/atualizar/${id}`, {nome, dataManutencao, rua, bairro, complemento, numero, cep, id_modelo, nome_modelo, id_categoria, nome_categoria})
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
            alert("Ativo deletado com sucesso!")
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
                                <th>Data Manutenção</th>
                                <th>CEP</th>
                                <th>Categoria</th>
                                <th>Modelo</th>
                                <th>---</th>
                                <th>---</th>
                            </tr>
                        </thead>
                         <tbody>
                            {ativosFiltrados.map((ativo)=>(
                                <tr key={ativo.id}>
                                    <td>{ativo.nome}</td>
                                    <td>{ativo.numAtivo}</td>
                                    <td>{formataData(ativo.dataManutencao)}</td>
                                    
                                    <td>{ativo.cep}</td>
                                    <td>{ativo.nome_categoria}</td>
                                    <td>{ativo.nome_modelo}</td>
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
                                    <h2>Insira os Novos Dados do Ativo</h2>
                            
                                
                                    <div className="EditarInputs">

                                        <p>Nome do Ativo</p>
                                            <input type="text" value={nome} onChange={(dado)=>setNome(dado.target.value)} placeholder="(*OBRIGATORIO)"/>

                                        <p>Descrição do Ativo</p>
                                            <input type="text" placeholder="(*OBRIGATORIO)" />

                                        <p>Caracteristicas do Ativo</p>
                                            <input type="text" placeholder="(*OPICIONAL)" />

                                        <p>Complemento</p>
                                            <input type="text" placeholder="(*OPICIONAL)" />

                                        <p>Código do Ativo</p>
                                            <input type="text" placeholder="(*OBRIGATORIO)"/>

                                            <p>Selecione a Categoria e o Modelo referente ao Ativo</p>
                                        <select value={categoriaSelecionada} onChange={(dado) => setCategoriaSelecionada(dado.target.value)}>
                                            <option value="">Selecione a Categoria</option>
                                            {categorias.map(categoria => (
                                                <option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
                                            ))}
                                        </select>

                                        <select value={modeloSelecionado} onChange={(dado) => setModeloSelecionado(dado.target.value)}>
                                            <option value="">Selecione o Modelo</option>
                                            {modelos.map(modelo => (
                                                <option key={modelo.id} value={modelo.nome}>{modelo.nome}</option>
                                            ))}
                                        </select>

                                        <br /><br />
                                        <hr /><br /><label><strong>Informações do ativo</strong> </label>

                                        <p>Data da Proxima Manutenção Agendada</p>
                                            <input type="date" value={dataManutencao} onChange={(dado)=>setDataManutencao(dado.target.value)}   />

                                        <p>Responsavel pelo Ativo</p>
                                            <input type="text" placeholder="(*OBRIGATORIO)"/>

                                        <p>Estado do Ativo</p>
                                            <input type="text" placeholder="(*OBRIGATORIO)" />

                                        <p>Valor Monetário do Ativo</p>
                                            <input type="text" placeholder="(*OBRIGATORIO)" />

                                        <p>Garantia do Ativo</p>
                                            <input type="text" placeholder="(*OPICONAL)" />

                                        <p>Data de Aquisição do Ativo </p>
                                            <input type="text" placeholder="(*OBRIGATORIO)" />


                                        <br /><br />
                                        <hr /><br /><label><strong>Informações fiscais</strong>  </label>

                                        <p>Documento Fiscal</p>
                                            <input type="text" placeholder="(*OPICONAL)" />

                                        <p>Nome do Emissor da Nota Fiscal</p>
                                            <input type="text" placeholder="(*OPICONAL)" />

                                        <br /><br />
                                        <hr /><br /><label><strong>Localização do ativo</strong>  </label>

                                        <p>Rua</p>
                                            <input type="text" value={rua} onChange={(dado)=>setRua(dado.target.value)} placeholder="(*OBRIGATORIO)" />

                                        <p>Bairro</p>
                                            <input type="text" value={bairro} onChange={(dado)=>setBairro(dado.target.value)} placeholder="(*OBRIGATORIO)" />

                                        <p>Complemento </p>
                                            <input type="text" value={complemento} onChange={(dado)=>setComplemento(dado.target.value)} placeholder="(*OBRIGATORIO)"/>

                                        <p>Número</p>
                                            <input type="number" value={numero} onChange={(dado)=>setNumero(dado.target.value)} placeholder="(*OBRIGATORIO)"/>

                                        <p>CEP</p>
                                            <input type="number" value={cep} onChange={(dado)=>setCep(dado.target.value)} placeholder="(*OBRIGATORIO)"/>

                                            
                                        </div>

                                        <div>

                                            <button onClick={Atualizar}>Atualizar Ativo</button>
                                            <button onClick={Cancelar}>Cancelar Edição</button>
                                        </div>

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