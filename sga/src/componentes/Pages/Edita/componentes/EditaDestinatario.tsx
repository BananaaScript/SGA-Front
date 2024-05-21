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
    const role = 'USER'

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

    function Editar(id: any, nome: string, email: string, senha: string, cpf: string, telefone: string, role: string) {
        setId(id);
        setNome(nome);
        setEmail(email);
        setSenha(senha);
        setCpf(cpf);
        setTelefone(telefone); 
        setEditando(true);
    }
    

    function Cancelar() {
        setEditando(false);
    }

    function Atualizar() {
        console.clear();
        if (nome && email && senha && cpf && telefone ) {
            axios.put(`http://localhost:8080/usuario/atualizar/${id}`, { nome, email, senha, cpf, telefone})
                .then(() => {
                    setEditando(false);
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
        axios.get('http://localhost:8080/usuario/listar')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }


    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario && usuario.role && usuario.role.includes('USER')
    );
    
    


    return(
        <>
            <div className="BoxTabela">
            <h2>Usuários Destinatarios Cadastrados</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Senha</th>
                            <th>Cpf</th>
                            <th>Telefone</th>
                            <th>Privilegios</th>
                            {!editando && (<th>---</th>)}
                            {!editando && (<th>---</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.senha}</td>
                                <td>{usuario.cpf}</td>
                                <td>{usuario.telefone}</td>
                                <td>{usuario.role}</td>
                                {!editando && (<td><button id="botaocancelar" onClick={() => Deletar(usuario.id)}>Deletar</button></td>)}
                                {!editando && (<td><button onClick={() => Editar(usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.cpf, usuario.telefone, usuario.role )}>Editar</button></td>)}
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
                                    <input type="text" value= {nome} onChange={(dado)=> setNome(dado.target.value)} placeholder="(*OBRIGATORIO)"/>

                                <p>E-mail do Usuário</p>
                                    <input type="text" value= {email} onChange={(dado)=> setEmail(dado.target.value)} placeholder="(*OBRIGATORIO)"/>

                                <p>Senha do Usuário</p>
                                    <input type="text" value= {senha} onChange={(dado)=> setSenha(dado.target.value)} placeholder="(*OBRIGATORIO)"/>

                                <p>Cpf do Usuário</p>
                                    <input type="text" value= {cpf} onChange={(dado)=> setCpf(dado.target.value)} placeholder="(*OBRIGATORIO)"/>
                                
                                <p>Telefone do Usuário</p>
                                    <input type="text" value= {telefone} onChange={(dado)=> setTelefone(dado.target.value)} placeholder="(*OBRIGATORIO)"/>
                                
                                </div>

                                <div>
                                    <button onClick={Atualizar}>Atualizar Usuário</button>
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
        


        </>
    )
}