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
                if (error.response && error.response.data){
                    alert(error.response.data.message)
                }else{
                    console.error(error)
                    alert("Erro ao deletar o usuário")
                }
            });
    }

    function Editar(id: any, nome: string, email: string, senha: string, cpf: string, telefone: string, role: string) {
        setId(id);
        setNome(nome);
        setEmail(email);
        setSenha(senha);
        setCpf(cpf);
        setTelefone(telefone); 
        setRole(role);
        setEditando(true);
    }
    

    function Cancelar() {
        setEditando(false);
    }

    function Atualizar() {
        console.clear()
        if (nome && email && senha && cpf && telefone ) {
            axios.put(`http://localhost:8080/usuario/atualizar/${id}`, { nome, email, senha, cpf, telefone })
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
        axios.get('http://localhost:8080/usuario/listar')
            .then((response) => {
                setUsuarios(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario && usuario.role && usuario.role.includes('ADMIN')
    );
    
    


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
                                {!editando && (<td><button id="botaodeletar" onClick={() => Deletar(usuario.id)}>Deletar</button></td>)}
                                {!editando && (<td><button onClick={() => Editar(usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.cpf, usuario.telefone, usuario.role )}>Editar</button></td>)}
                            </tr>
                        ))}
                    </tbody>
                </table>


                {editando?(
                    <>
                        <div>
                            <hr />
                            <div className="BoxEditar">
                                <h2>Insira os Novos Dados do Usuário</h2>
                                <div className="CadastroInputs">

                                    <p>Nome *</p>
                                        <input type="text" value={nome} onChange={(event)=>setNome(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>

                                    <p>Email *</p>
                                        <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>

                                    <p>Senha *</p>
                                        <input type="text" value={senha} onChange={(event)=>setSenha(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>

                                    <p>Cpf *</p>
                                        <input type="text" value={cpf} onChange={(event) => setCpf(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>

                                    <p>Telefone *</p>
                                        <input type="text" value={telefone} onChange={(event) => setTelefone(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>


                                    </div>

                                <div> <hr /> 
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