import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import { Usuario } from "../../../../modelos/usuario"


export default function AdicionaADM(){
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([])
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const role = 'ADMIN'

    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
    

    useEffect(()=>{
        axios.get('http://localhost:8080/usuario/listar')
        .then((response) => {
            setUsuarios(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }, [usuarioSelecionado, usuarios])

    function registrar(){
        console.clear()
        const emailRegex:RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
        const cpfRegex:RegExp = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
        const telRegex:RegExp = /^\+55 \(\d{2}\) \d{4}-\d{4}$/

        if(nome && emailRegex.test(email) && senha && cpfRegex.test(cpf) && telRegex.test(telefone)){
            axios.post('http://localhost:8080/usuario/cadastrar', {nome, email, senha, cpf, telefone, role})
            .then(()=>{
                setNome('')
                setEmail('')
                setSenha('')
                setCpf('')
                setTelefone('')


                alert ("Usuario Cadastrado com Sucesso!")
            })
            .catch((error)=>{
                if(error.response && error.response.status === 400){
                    alert("CPF fornecido já foi registrado no sistema!")
                }
            })
        }
        else if(!nome || !email || !senha || !cpf || !telefone ){
            alert("Verifique os campos obrigatórios!")
        }
        else if (!cpfRegex.test(cpf)){
            alert("CPF fornecido inválido, o padrão deve ser: XXX.XXX.XXX-XX")
        }
        else if(!telRegex.test(telefone)){
            alert("telefone inválido, o padrão é: +00 (00) 0000-0000")
        }
        else if(!emailRegex.test(email)){
            alert("Email fornecido é inválido")
        }
        }

    return(
        <>
            <div >

            <div className="ComponenteCadatro">
            <div className="BoxCadastro">
                
 
                    <h2>Insira os Dados do Administrador que Deseja Cadastrar</h2>
                
                <div className="CadastroInputs">

                <p>Nome *</p>
                    <input type="text" value={nome} onChange={(event)=>setNome(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>

                <p>Senha *</p>
                    <input type="password" value={senha} onChange={(event)=>setSenha(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>
                    
                <p>Email *</p>
                    <input type="email" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>
                    

                <p>CPF *</p>
                    <input type="text" value={cpf} onChange={(event) => setCpf(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>

                <p>Telefone *</p>
                    <input type="tel" value={telefone} onChange={(event) => setTelefone(event.target.value)} placeholder="(*OBRIGATÓRIO)" required/>
                

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