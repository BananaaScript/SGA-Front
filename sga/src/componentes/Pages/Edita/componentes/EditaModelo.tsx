import React, { useState, useEffect } from "react";
import {Modelo}  from "../../../../modelos/modelo";
import axios from "axios";
import "../Editar.css"
import { Categoria } from "../../../../modelos/categoria";

export default function Editamodelo() {
    const [modelos, setModelos] = useState<Array<Modelo>>([]);
    const [filtro, setFiltro] = useState<string>('');
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [modelo, setModelo] = useState('');
    const [fabricante, setFabricante] = useState('');
    const [categorias, setCategorias] = useState<Array<Categoria>>([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/modelo/listar')
            .then((response) => {
                setModelos(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

        axios.get('http://localhost:8080/categoria/listar')
        .then((response)=>{
            setCategorias(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })

    }, []);

    const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value);
    };

    const modelosFiltrados = modelos.filter(modelo =>
        modelo.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        modelo.modelo.toLowerCase().includes(filtro.toLowerCase()) ||
        modelo.descricao.toLowerCase().includes(filtro.toLowerCase())
    );

    function Deletar(id: number) {
        axios.delete(`http://localhost:8080/modelo/deletar/${id}`)
        .then(() => {
                alert("Modelo deletado com sucesso!");
                AtualizarValores();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function Editar(id: any, nome: string, descricao: string, modelo: string, fabricante: string, categoria: string) {
        setId(id);
        setNome(nome);
        setDescricao(descricao);
        setModelo(modelo);
        setFabricante(fabricante);
        setCategoriaSelecionada(categoria);
        setEditando(true);
    }

    function Cancelar() {
        setEditando(false);
    }

    function Atualizar() {

        const categoriaSelecionadaObj = categorias.find(Categoria => Categoria.nome === categoriaSelecionada);
        const id_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.id : null;
        const nome_categoria = categoriaSelecionadaObj ? categoriaSelecionadaObj.nome : null;

        if (nome || descricao || modelo || fabricante || nome_categoria) {
            axios.put(`http://localhost:8080/modelo/atualizar/${id}`, { nome, descricao, modelo, fabricante, id_categoria, nome_categoria })
                .then(() => {
                    setEditando(false);
                    setNome('');
                    setDescricao('');
                    setCategoriaSelecionada('')
                    setFabricante('');
                    AtualizarValores();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        if (!nome_categoria){
            alert("Selecione uma categoria.")
        }
    }

    function AtualizarValores() {
        axios.get('http://localhost:8080/modelo/listar')
            .then((response) => {
                setModelos(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="BoxTabela">
            <h2>Modelos Cadastrados</h2>
            <input 
                type="text"
                value={filtro}
                onChange={handleFiltroChange}
                placeholder="Filtrar por Nome, Modelo ou Descrição"
            />
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Modelo</th>
                        <th>Descrição</th>
                        <th>Categoria</th>
                        {!editando && (<th>---</th>)}
                        {!editando && (<th>---</th>)}
                    </tr>
                </thead>
                <tbody>
                    {modelosFiltrados.map((modelo) => (
                        <tr key={modelo.id}>
                            <td>{modelo.nome}</td>
                            <td>{modelo.modelo}</td>
                            <td>{modelo.descricao}</td>
                            <td>{modelo.nome_categoria}</td>
                            {!editando && (<td><button id="botaodeletar" onClick={() => Deletar(modelo.id)}>Deletar</button></td>)}
                            {!editando && (<td><button id="botaoeditar" onClick={() => Editar(modelo.id, modelo.nome, modelo.descricao, modelo.modelo, modelo.fabricante, modelo.nome_categoria)}>Editar</button></td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
            {editando ? (
                <div>
                    <div className="BoxEditar">
                        <h2>Insira os Novos Dados do Modelo </h2>
                        
                        <div className="EditarInputs">
                        
                        <p>Nome do Modelo</p>
                            <input type="text" value={nome} onChange={(dado) => setNome(dado.target.value)} placeholder="(*OBRIGATÓRIO)" />

                        <p>Descrição do Modelo</p>
                            <input type="text" value={descricao} onChange={(dado) => setDescricao(dado.target.value)} placeholder="(*OBRIGATÓRIO)" />

                        <p>Modelo Referente ao Ativo</p>
                            <input type="text" value={modelo} onChange={(dado) => setModelo(dado.target.value)} placeholder="(OPICIONAL)" />
                        
                        <p>Fabricante do Modelo</p>
                            <input type="text" value= {fabricante} onChange={(event) => setFabricante(event.target.value)} placeholder="(OPCIONAL)" />


                        <p>Categoria Referente ao Modelo</p>
                            <select value={categoriaSelecionada} onChange={(dado) => setCategoriaSelecionada(dado.target.value)}>
                                <option value="">Selecione a Categoria</option>
                                {categorias.map(categoria => (
                                    <option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
                                ))}
                            </select>

                        </div>


                        <div className="botoes">

                                            <button id="botaoatualizar" onClick={Atualizar}>Atualizar Modelo</button>
                                            <button id="botaocancelar" onClick={Cancelar}>Cancelar Edição</button>
                            </div>

                    </div>
                </div>
            ) :
                (
                    <>

                    </>
                )}
        </div>
    );
}
