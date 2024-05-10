import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import { Usuario } from "../../../../modelos/usuario"

export default function AdicionaDestinatario(){
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([])
    const [id, setId] = useState('')
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [role, setRole] = useState('')
    
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');

    axios.get('http://localhost:8080/usuario/listar')
    .then((response) => {
        setUsuarios(response.data);
    })
    .catch((error) => {
        console.error(error);
    });

    function registrar(){
        console.clear()
    
        if(nome && email && senha && cpf && telefone){
            axios.post('http://localhost:8080/usuario/cadastrar', {id, nome, email, senha, cpf, telefone})
            .then(()=>{
                setNome('')
                setEmail('')
                setSenha('')
                setCpf('')
                setTelefone('')
                setRole('USER')

                alert ("Usuario Cadastrado com Sucesso!")
            })
            .catch((error)=>{
                console.error(error)
            })
        }
        else if(!id || !nome || !email || !senha || !cpf || !telefone ){
            alert("Verifique os campos obrigatórios!")
        }
        }

    return(
        <>
            <div >

            <div className="ComponenteCadatro">
            <div className="BoxCadastro">
                
 
                    <h2>Insira os Dados do Destinatario que Deseja Cadastrar</h2>
                
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

                    <button onClick={registrar}>Registrar</button>
            </div>
        </div>


        <div className="Box">
                
                <button >Visualizar Usuarios Cadastrados</button>
                


            </div>

            </div>
        </>
    )
}