import React, { useState, useEffect } from "react";
import modelo from "../../../../modelos/modelo";
import axios from "axios";
import "../Editar.css"

export default function Editamodelo() {
    const [modelos, setModelos] = useState<Array<modelo>>([]);
    const [filtro, setFiltro] = useState<string>('');
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [modelo, setModelo] = useState('');
    const [editando, setEditando] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/modelo/listar')
            .then((response) => {
                setModelos(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
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
                AtualizarValores();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function Editar(id: any, nome: string, descricao: string, modelo: string) {
        setId(id);
        setNome(nome);
        setDescricao(descricao);
        setModelo(modelo);
        setEditando(true);
    }

    function Cancelar() {
        setEditando(false);
    }

    function Atualizar() {
        if (nome || descricao) {
            axios.put(`http://localhost:8080/modelo/atualizar/${id}`, { nome, descricao, modelo })
                .then(() => {
                    setEditando(false);
                    setNome('');
                    setDescricao('');
                    AtualizarValores();
                })
                .catch((error) => {
                    console.error(error);
                });
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
                        <th>Modelo</th>
                        <th>Descrição</th>
                        <th>---</th>
                        <th>---</th>
                    </tr>
                </thead>
                <tbody>
                    {modelosFiltrados.map((modelo) => (
                        <tr key={modelo.id}>
                            <td>{modelo.nome}</td>
                            <td>{modelo.modelo}</td>
                            <td>{modelo.descricao}</td>
                            <td><button onClick={() => Deletar(modelo.id)}>Deletar</button></td>
                            {!editando && (<td><button onClick={() => Editar(modelo.id, modelo.nome, modelo.descricao, modelo.modelo)}>Editar</button></td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
            {editando ? (
                <div>
                    <div className="BoxEditar">
                        <h2>Insira os Novos Dados da Categoria</h2>

                        <input type="text" value={nome} onChange={(dado) => setNome(dado.target.value)} placeholder="Novo nome" />

                        <input type="text" value={descricao} onChange={(dado) => setDescricao(dado.target.value)} placeholder="Nova descricao" />

                        <input type="text" value={modelo} onChange={(dado) => setModelo(dado.target.value)} placeholder="Novo modelo" />

                        <button onClick={Atualizar}>Atualizar Modelo</button>
                        <button onClick={Cancelar}>Cancelar Edição</button>

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
