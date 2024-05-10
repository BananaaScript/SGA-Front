import React, { useState, useEffect } from "react";
import { Usuario } from "../../../../modelos/usuario";
import axios from "axios";
import "../Editar.css"


export default function EditaADM(){
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([])
    const [id, setId] = useState('')
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [role, setRole] = useState('')

    const [editando, setEditando] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/usuario/listar')
        .then((response) => {
            setUsuarios(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);



    function Deletar(id: number) {
        axios.delete(`http://localhost:8080/usuario/deletar/${id}`)
        .then(() => {
                alert("Usuário deletado com sucesso!");
                AtualizarValores();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function Editar(id: any, nome: string, email: string, senha: string, cpf: string, telefone: string) {
        setId(id);
        setNome(nome);
        setEmail(email);
        setSenha(senha);
        setCpf(cpf);
        setTelefone(telefone);
        setEmail(email);
        setEditando(true);
    }

    function Cancelar() {
        setEditando(false);
    }

    function Atualizar() {
        console.clear()
        if (nome && email && senha && cpf && telefone) {
            axios.put(`http://localhost:8080/usuario/editar/${id}`, { nome, email, senha, cpf, telefone })
                .then(() => {
                    setEditando(false);
                    setId('');
                    setNome('');
                    setEmail('');
                    setSenha('');
                    setCpf('');
                    setTelefone('');
                    AtualizarValores();
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert("Por favor, preencha todos os campos obrigatórios.");
        }
    }

    function AtualizarValores() {
        axios.get('http://localhost:8080/usuarios/listar')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    return(
        <>
            <div className="BoxTabela">
            <h2>Usuários Administradores Cadastrados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Senha</th>
                            <th>Cpf</th>
                            <th>Telefone</th>
                            <th>Privilegios</th>
                            <th>---</th>
                            <th>---</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.senha}</td>
                                <td>{usuario.cpf}</td>
                                <td>{usuario.telefone}</td>
                                <td>{usuario.role}</td>
                                <td><button onClick={() => Deletar}>Deletar</button></td>
                                {!editando && (<td><button onClick={() => Editar(usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.cpf, usuario.telefone  )}>Editar</button></td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>


                {editando?(
                    <>
                        <div>
                            <div className="BoxEditar">
                                <h2>Insira os Novos Dados do Usuário</h2>
                                <div className="EditarInputs">
                                    <p>Nome do Usuário</p>
                                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="(*OBRIGATORIO)" />

                                    <p>E-mail do Usuário</p>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="(*OBRIGATORIO)" />

                                    <p>Senha do Usuário</p>
                                    <input type="text" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="(*OBRIGATORIO)" />

                                    <p>Cpf do Usuário</p>
                                    <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="(*OBRIGATORIO)" />

                                    <p>Telefone do Usuário</p>
                                    <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(*OBRIGATORIO)" />
                                </div>

                                <div>
                                    <button onClick={Atualizar}>Atualizar Usuário</button>
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
        


        </>
    )
}