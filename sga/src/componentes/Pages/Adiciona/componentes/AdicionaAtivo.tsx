import { useState } from "react"
import axios from "axios"
import {Ativo} from "../../../../modelos/ativo"
import { useEffect } from "react"
import "../Adicionar.css"
import { Categoria } from "../../../../modelos/categoria"
import { Modelo } from "../../../../modelos/modelo"
import { Usuario } from "../../../../modelos/usuario"

/* Abençoa senhor... */
/* AMÉM IRMÃO */

export const AdicionaAtivo = () =>{
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
        ativo.rua.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.bairro.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.complemento.toLowerCase().includes(filtro.toLowerCase()) 
    );

    function registrar() {
        console.clear();
        let descricaoNinfo = descricao !== '' ? descricao : 'Não informado';
        let complementoAtivoNinfo = complementoAtivo !== '' ? complementoAtivo : 'Não informado';
        let padraoCEP = /^\d{5}-\d{3}$/;
    
        if (nome && dataManutencao && numAtivo && valor && rua && bairro && cidade && pais && complemento && numero && padraoCEP.test(cep) && categoriaSelecionada && modeloSelecionado && dataManutencao && dataTransacao && estado) {
            const usuarioSelecionadoObj = usuarios.find(usuario => usuario.nome === usuarioSelecionado);
            const id_responsavel = usuarioSelecionadoObj ? usuarioSelecionadoObj.id : null;
            const responsavel = usuarioSelecionadoObj ? usuarioSelecionadoObj.nome : null;
    
            const modeloSelecionadoObj = modelos.find(modelo => modelo.nome === modeloSelecionado);
            const id_modelo = modeloSelecionadoObj ? modeloSelecionadoObj.id : null;
            const nome_modelo = modeloSelecionadoObj ? modeloSelecionadoObj.nome : null;
    
            const categoriaSelecionadaObj = categorias.find(categoria => categoria.nome === categoriaSelecionada);
            const id_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.id : null;
            const nome_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.nome : null;
    
            axios.post('http://localhost:8080/ativo/cadastrar', { id_modelo, id_categoria, id_responsavel, nome_modelo, nome_categoria, nome, descricao: descricaoNinfo, complementoAtivo: complementoAtivoNinfo, responsavel, valor, numAtivo, dataManutencao, dataTransacao, rua, bairro, cidade, pais, complemento, numero, cep, estado }).then(() => {
    
                setNome('');
                setDescricao('');
                setComplementoAtivo('');
                setValor('');
                setNumeroAtivo('');
                setDataManutencao('');
                setDataTransacao('');
                setRua('');
                setBairro('');
                setCidade('');
                setPais('');
                setComplemento('');
                setNumero('');
                setCep('');
    
                setUsuarioSelecionado('');
                setModeloSelecionado('');
                setCategoriaSelecionada('');
                console.log(`conexão com banco de dados bem-sucedida, dados enviados!`);
                alert("Ativo Cadastrado com Sucesso");
            })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        alert("Número de ativo fornecido já foi registrado!");
                    }
                });
        }
        else if (!nome || !dataManutencao || !numAtivo || !valor || !rua || !bairro || !cidade || !pais || !complemento || !numero || !cep || !categoriaSelecionada || !modeloSelecionado || !dataManutencao || !dataTransacao || !estado) {
            alert("Preencha todos os campos obrigatórios");
        }
        else if (!padraoCEP.test(cep)) {
            alert("Verifique o CEP fornecido, o padrão deve ser XXXXX-XXX");
        }
    }
    

    const [tabelaAtivos, setTabelaAtivos] = useState(false)
    function exibirTabelaAtivos(){setTabelaAtivos(true)}
    function fecharTabelaAtivos(){setTabelaAtivos(false)}


    return(
        <div className="ComponenteCadatro">



            <div className="BoxCadastro">

                    <h2>Insira os dados do Ativo que Deseja Cadastrar</h2>


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
                            <option value="Não atribuído">Não atribuído</option>
                            {usuarios.map(usuario => (
                                <option key={usuario.id} value={usuario.nome}>{usuario.nome}</option>
                            ))}
                        </select>


                    <p>Data da Proxima Manutenção Agendada *</p>
                        <input type="date" value={dataManutencao} onChange={(event)=>setDataManutencao(event.target.value)} required/>

                    <p>Estado do Ativo *</p>
                        <select value={estado} onChange={(event) => setEstado(event.target.value)} required>
                            <option value="">Selecione o estado</option>
                            <option value="EM MANUTENÇÃO">Em manutenção</option>
                            <option value="DISPONIVEL">Disponível</option>
                            <option value="INATIVO">Inativo</option>
                            <option value="DESCARTADO">Descartado</option>
                        </select>
                    
                    <p>Valor Monetário do Ativo *</p>
                        <input type="number" value={valor} onChange={(event) => setValor(event.target.value)} placeholder="(OBRIGATÓRIO)" />

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

                    <button onClick={registrar}>Registrar</button>
            </div>
            

            
            <div className="Box">
                
                    {!tabelaAtivos && (
                    <button onClick={exibirTabelaAtivos}> Visualizar Ativos Cadastrados </button>
                    
                    ) }
                
            </div>

        {tabelaAtivos && (
           	<>            
                <div>

                    <div className="texto">
                        <h2>Ativos cadastrados</h2>

                        <button onClick={fecharTabelaAtivos}>Fechar Tabela</button>
                    </div>

                    <div className="BoxTabela">
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
                                    <th>Responsável</th>
                                    <th>Categoria</th>
                                    <th>Modelo</th>
                                    <th>Estado do ativo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ativosFiltrados.map((ativo)=>(
                                <tr key={ativo.id}>
                                    <td>{ativo.nome}</td>
                                    <td>{ativo.responsavel}</td>
                                    <td>{ativo.nome_categoria}</td>
                                    <td>{ativo.nome_modelo}</td>
                                    <td>{ativo.estado}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </>
            
        )}
    </div>
    )}  
    
