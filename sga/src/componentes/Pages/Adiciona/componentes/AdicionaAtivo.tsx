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
    return(
        <div className="ComponenteCadatro">
            <div className="BoxCadastro">

                    <h2>Insira os Dados do Ativo que Deseja Cadastrar</h2>
                
                    <input type="text" value={nome} onChange={(dado)=>setNome(dado.target.value)} placeholder="Nome"/>
                    <input type="text" value={numAtivo} onChange={(dado)=>setNumeroAtivo(dado.target.value)} placeholder="Número ativo"/>
                    <label>Data de manutenção</label>
                    <input type="date" value={dataManutencao} onChange={(dado)=>setDataManutencao(dado.target.value)}  />
                    
                    <label htmlFor="">Endereço</label>
                    <input type="text" value={rua} onChange={(dado)=>setRua(dado.target.value)} placeholder="Rua" />
 
                    <input type="text" value={bairro} onChange={(dado)=>setBairro(dado.target.value)} placeholder="Bairro" />
 
                    <input type="text" value={complemento} onChange={(dado)=>setComplemento(dado.target.value)} placeholder="Complemento"/>

                    <input type="number" value={numero} onChange={(dado)=>setNumero(dado.target.value)} placeholder="Número"/>

                    <input type="number" value={cep} onChange={(dado)=>setCep(dado.target.value)} placeholder="CEP"/>

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

                    <button onClick={registrar}>Registrar</button>
                
                {erroNome && <div style={{color: 'red'}}>{erroNome}</div>}
            </div>
            <div className="texto">
                <h2>Ativos cadastrados</h2>
            </div>
            <div className="TabelaCadastro">
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
                            {ativos.map((ativo)=>(
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
        
    )
}