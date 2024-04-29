import { useState } from "react"
import axios from "axios"
import {Ativo} from "../../../../modelos/ativo"
import { useEffect } from "react"
import "../Adicionar.css"
import { Categoria } from "../../../../modelos/categoria"
import { Modelo } from "../../../../modelos/modelo"



export const AdicionaAtivo = () =>{
    const [nome, setNome]= useState('')
    const [numAtivo, setNumeroAtivo] = useState('')
    const [dataManutencao, setDataManutencao] = useState('')
    const [rua, setRua]= useState('')
    const [bairro, setBairro]= useState('')
    const [complemento, setComplemento]= useState('')
    const [numero, setNumero] = useState('')
    const [cep, setCep]= useState('')
    const [erroNome, setErro] = useState('')
    const [modeloSelecionado, setModeloSelecionado] = useState('');
    const[modelos, setModelos] = useState<Array<Modelo>>([])
    const [categorias, setCategorias] = useState<Array<Categoria>>([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
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
        
    }, [categoriaSelecionada, categorias])
    let rota = 'http://localhost:8080/ativo/cadastrar'
    
    const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value);
    };

    const ativosFiltrados = ativos.filter(ativo =>
        ativo.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.rua.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.bairro.toLowerCase().includes(filtro.toLowerCase()) ||
        ativo.complemento.toLowerCase().includes(filtro.toLowerCase()) 
    );

    function registrar(){
        console.clear()
        setErro('')
        console.log(numAtivo)
        if(nome && dataManutencao && numAtivo && rua && bairro && complemento && numero && cep){

            const modeloSelecionadoObj = modelos.find(modelo => modelo.nome === modeloSelecionado);
            const id_modelo = modeloSelecionadoObj ? modeloSelecionadoObj.id : null;
            const nome_modelo = modeloSelecionadoObj ? modeloSelecionadoObj.nome : null;

            const categoriaSelecionadaObj = categorias.find(categoria => categoria.nome === categoriaSelecionada);
            const id_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.id : null;
            const nome_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.nome : null;

            axios.post(rota, {nome, numAtivo, dataManutencao, rua, bairro, complemento, numero, cep, id_modelo, nome_modelo, id_categoria, nome_categoria})
            .then(()=>{
                setNome('')
                setNumeroAtivo('')
                setDataManutencao('')
                setRua('')
                setBairro('')
                setComplemento('')
                setNumero('')
                setCep('')
                setModeloSelecionado('')
                setCategoriaSelecionada('')
                setErro('')
            })
            .catch((error)=>{
                console.error(error)
            })
            console.log(`conexão com banco de dados bem-sucedida, dados enviados!`)
        }
        else if(!nome && !rua && !bairro && !complemento && !numero && !cep ){
            setErro('Informe os valores em branco!')
        }
    }

    const [tabelaAtivos, setTabelaAtivos] = useState(false)
    function exibirTabelaAtivos(){setTabelaAtivos(true)}
    function fecharTabelaAtivos(){setTabelaAtivos(false)}


    return(
        <div className="ComponenteCadatro">



            <div className="BoxCadastro">

                    <h2>Insira os Dados do Ativo que Deseja Cadastrar</h2>


                <div className="CadastroInputs">

                    <p>Nome do Ativo</p>
                        <input type="text" value={nome} onChange={(dado)=>setNome(dado.target.value)} placeholder="(*OBRIGATORIO)"/>

                    <p>Descrição do Ativo</p>
                        <input type="text" placeholder="(*OBRIGATORIO)" />

                    <p>Caracteristicas do Ativo</p>
                        <input type="text" placeholder="(*OPICIONAL)" />

                    <p>Complemento</p>
                        <input type="text" placeholder="(*OPICIONAL)" />

                    <p>Código do Ativo</p>
                        <input type="text" value={numAtivo} onChange={(dado)=>setNumeroAtivo(dado.target.value)} placeholder="(*OBRIGATORIO)"/>

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

                    <button onClick={registrar}>Registrar</button>
                
                {erroNome && <div style={{color: 'red'}}>{erroNome}</div>}
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
                                    <th>Rua</th>
                                    <th>Bairro</th>
                                    <th>Complemento</th>
                                    <th>Numero</th>
                                    <th>CEP</th>
                                    <th>Categoria</th>
                                    <th>Modelo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ativosFiltrados.map((ativo)=>(
                                <tr key={ativo.id}>
                                    <td>{ativo.nome}</td>
                                    <td>{ativo.rua}</td>
                                    <td>{ativo.bairro}</td>
                                    <td>{ativo.complemento}</td>
                                    <td>{ativo.numero}</td>
                                    <td>{ativo.cep}</td>
                                    <td>{ativo.nome_categoria}</td>
                                    <td>{ativo.nome_modelo}</td>
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
    
