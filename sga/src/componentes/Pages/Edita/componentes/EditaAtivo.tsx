import { useState } from "react"
import {Ativo} from "../../../../modelos/ativo"
import { useEffect } from "react"
import axios from "axios"
import { formataData } from "../../../../functions/formataData"
import { Categoria } from "../../../../modelos/categoria"
import { Modelo } from "../../../../modelos/modelo"
import { Usuario } from "../../../../modelos/usuario"

export default function EditaAtivo(){
    const[ativos, setAtivos] = useState<Array<Ativo>>([])
    const [id, setId] = useState('')
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

        axios.get('http://localhost:8080/usuario/listar')
        .then((response)=>{
            setUsuarios(response.data)
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

        const usuarioSelecionadoObj = usuarios.find(usuario => usuario.nome === usuarioSelecionado);
        const id_responsavel = usuarioSelecionadoObj ? usuarioSelecionadoObj.id : null;
        const responsavel = usuarioSelecionadoObj ? usuarioSelecionadoObj.nome : null;

        if(nome || dataManutencao || rua || bairro || complemento || numero || cep){
            axios.put(`http://localhost:8080/ativo/atualizar/${id}`, {id_modelo, id_categoria, id_responsavel, nome_modelo, nome_categoria, nome, descricao, complementoAtivo, responsavel, valor, numAtivo, dataManutencao, dataTransacao, rua, bairro, cidade, pais, complemento, numero, cep, estado}).then(()=>{
                setEditando(false)
                setNome('')
                setDescricao('')
                setComplementoAtivo('')
                setValor('')
                setNumeroAtivo('')
                setDataManutencao('')
                setDataTransacao('')
                setRua('')
                setBairro('')
                setCidade('')
                setPais('')
                setComplemento('')
                setNumero('')
                setCep('')
                setEstado('')
                setUsuarioSelecionado('')
                setModeloSelecionado('')
                AtualizarValores()
                alert("Ativo editado com sucesso!")
            })
            .catch((error)=>{
                console.error(error)
            })
        }
    }
    function Editar(id: any, nome: string,descricao: string, complementoAtivo: string, responsavel: string, valor: string, numAtivo: string,dataManutencao: string, dataTransacao: string, rua: string, bairro: string, cidade: string, pais:string, complemento: string, numero: any, cep: string, modelo:string, categoria: string, estado: string){
        setId(id)
        setNome(nome)
        setDescricao(descricao)
        setComplementoAtivo(complementoAtivo)
        setValor(valor)
        setNumeroAtivo( numAtivo)
        setDataManutencao(dataManutencao)
        setDataTransacao(dataTransacao)
        setRua(rua)
        setBairro(bairro)
        setCidade(cidade)
        setPais(pais)
        setComplemento(complemento)
        setNumero(numero)
        setCep(cep)
        setEstado(estado)
        setUsuarioSelecionado(responsavel)
        setModeloSelecionado(modelo)
        setCategoriaSelecionada(categoria)
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
                                <th>Estado do ativo</th>
                                {!editando && (<th>---</th>)}
                                {!editando && (<th>---</th>)}
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
                                    <td>{ativo.estado}</td>
                                    {!editando && (<td><button id="botaodeletar" onClick={()=>Deletar(ativo.id)}>Deletar</button></td> )}
                                    {!editando &&(<td><button id="botaoeditar" onClick={() => Editar(ativo.id, ativo.nome, ativo.descricao, ativo.complemento_ativo, ativo.responsavel, ativo.valor, ativo.numAtivo, ativo.dataManutencao, ativo.dataTransacao, ativo.rua, ativo.bairro, ativo.cidade, ativo.pais, ativo.complemento, ativo.numero, ativo.cep, ativo.nome_modelo, ativo.nome_categoria, ativo.estado)}>Editar</button></td>)}</tr>
                            ))}
                        </tbody>
                </table>
                {editando?(
                    <>
                        <div>
                            <div className="BoxEditar">
                                    <h2>Insira os Novos Dados do Ativo</h2>
                            
                                
                                    <div className="CadastroInputs">

                                    <p>Nome do Ativo *</p>
                                        <input type="text" value={nome} onChange={(event)=>setNome(event.target.value)} required placeholder="(*OBRIGATÓRIO)"/>
                                
                                    <p>Descrição do Ativo</p>
                                        <input type="text" value={descricao} onChange={(event)=>setDescricao(event.target.value)} placeholder="(*OPCIONAL)" />
                                
                                    <p>Complemento</p>
                                        <input type="text" value={complementoAtivo} onChange={(event) =>setComplementoAtivo(event.target.value)} placeholder="(*OPCIONAL)" />
                                
                                    <p>Número do Ativo *</p>
                                        <input type="text" value={numAtivo} onChange={(event)=>setNumeroAtivo(event.target.value)} required placeholder="(*OBRIGATÓRIO)"/>
                                
                                    <p>Categoria e o Modelo referente ao Ativo *</p>
                                        <select value={categoriaSelecionada} onChange={(event) => setCategoriaSelecionada(event.target.value)} required>
                                            <option value="">Selecione a Categoria</option>
                                            {categorias.map(categoria => (
                                                <option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
                                            ))}
                                        </select>
                                        
                                        <select value={modeloSelecionado} onChange={(event) => setModeloSelecionado(event.target.value)} required>
                                            <option value="">Selecione o Modelo</option>
                                            {modelos.map(modelo => (
                                                <option key={modelo.id} value={modelo.nome}>{modelo.nome}</option>
                                            ))}
                                        </select>
                                        
                                    <br /><br />
                                    <hr /><br /><label><strong>Informações do ativo</strong> </label>
                                        
                                    <p>Usuário responsável pelo ativo *</p>
                                        <select value={usuarioSelecionado} onChange={(event) => setUsuarioSelecionado(event.target.value)} required>
                                            <option value="">Selecione o Usuário</option>
                                            {usuarios.map(usuario => (
                                                <option key={usuario.id} value={usuario.nome}>{usuario.nome}</option>
                                            ))}
                                        </select>
                                        
                                        
                                    <p>Data da Proxima Manutenção Agendada *</p>
                                        <input type="Date" value={dataManutencao} onChange={(event)=>setDataManutencao(event.target.value)} required/>
                                        
                                    <p>Estado do Ativo *</p>
                                        <select value={estado} onChange={(event) => setEstado(event.target.value)} required>
                                            <option value="">Selecione o estado</option>
                                            <option value="EM MANUTENÇÃO">Em manutenção</option>
                                            <option value="DISPONIVEL">Disponível</option>
                                            <option value="INATIVO">Inativo</option>
                                            <option value="DESCARTADO">Descartado</option>
                                        </select>
                                        
                                    <p>Valor Monetário do Ativo</p>
                                        <input type="number" value={valor} onChange={(event) => setValor(event.target.value)} placeholder="(OPCIONAL)" />
                                        
                                    <p>Data de Aquisição do Ativo *</p>
                                        <input type="Date" value={dataTransacao} onChange={(event) => setDataTransacao(event.target.value)} required/>
                                        
                                    <br /><br />
                                    <hr /><br /><label><strong>Localização do ativo</strong>  </label>
                                        
                                    <p>Rua *</p>
                                        <input type="text" value={rua} onChange={(event)=>setRua(event.target.value)} required placeholder="(*OBRIGATÓRIO)"/>
                                        
                                    <p>Bairro *</p>
                                        <input type="text" value={bairro} onChange={(event)=>setBairro(event.target.value)} required placeholder="(*OBRIGATÓRIO)"/>
                                        
                                    <p>Cidade *</p>
                                        <input type="text" value={cidade} onChange={(event)=>setCidade(event.target.value)} required placeholder="(*OBRIGATÓRIO)"/>
                                        
                                    <p>País *</p>
                                        <input type="text" value={pais} onChange={(event)=>setPais(event.target.value)} required placeholder="(*OBRIGATÓRIO)"/>
                                        
                                    <p>Complemento *</p>
                                        <input type="text" value={complemento} onChange={(event)=>setComplemento(event.target.value)} required placeholder="(*OBRIGATÓRIO)"/>
                                        
                                    <p>Número *</p>
                                        <input type="number" value={numero} onChange={(event)=>setNumero(event.target.value)} required placeholder="(*OBRIGATÓRIO)"/>
                                        
                                    <p>CEP *</p>
                                        <input type="text" value={cep} onChange={(event)=>setCep(event.target.value)} required placeholder="(*OBRIGATÓRIO)"/>
                                        


                                    </div>

                                        <div className="botoes">

                                            <button id="botaoatualizar" onClick={Atualizar}>Atualizar Ativo</button>
                                            <button id="botaocancelar" onClick={Cancelar}>Cancelar Edição</button>
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