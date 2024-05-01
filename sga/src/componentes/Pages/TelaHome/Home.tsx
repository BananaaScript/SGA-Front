
import './home.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "../../../assets/img/perfil.png"

import { formataData } from "../../../functions/formataData"
import { Notificacao } from "../../../modelos/notificacao"



export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                localStorage.removeItem('token'); 
                setIsLoggedIn(false);
                console.log("Logout bem sucedido");
                window.location.reload();
            } else {
                alert("Erro ao efetuar logout");
            }
        } catch (error) {
            console.error('Erro ao efetuar logout:', error);
            alert("Erro ao efetuar logout. Por favor, tente novamente mais tarde.");
        }
    };

    const [notificacoes, setNotificacoes] = useState<Array<Notificacao>>([])

    useEffect(()=>{
        axios.get('http://localhost:8080/notifica/listar')
        .then((response)=>{
            setNotificacoes(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    }, [])


        
    const [tabelaUserAtivos, settabelaUserAtivos] = useState(false)
    function exibirtabelaUserAtivos(){settabelaUserAtivos(true)}
    function fechartabelaUserAtivos(){settabelaUserAtivos(false)}


    return (
        <>
            <div className='TelaInicial'>

                <div className='Cabecalho'>
                    <h1>Sistema de Gerenciamento de Ativos - SGA </h1>
                    <hr />
                    <br />
                    <h3>Bem Vindo Usuario!</h3>
                    <h4>Este sistema permite que sua empresa tenha o controle total de todos os ativos, separados por Categorias, posteriormente Modelos e enfim Ativos. Além disso também é possivel acompanhar um ativo especifico ou acompanhar por Modelo e Categoria. </h4>
                    <h5>Abaixo você pode conferir os ativos que possui:  </h5>
                </div>


                <div className="TabelaAtivosHome">  
                        <table>
                            <tr>
                                <th>Usuário</th>
                                <th>Data de expiração</th>
                                <th>Dias até expirar</th>
                            </tr>
                            <tbody>
                                {notificacoes.map((noti)=>(
                                    <tr key={noti.id} >
                                        <td>{noti.usuario}</td>
                                        <td>{formataData(noti.dataExpiracao)}</td>
                                        <td>{noti.dias}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                
                <div>{!tabelaUserAtivos && (<button className='btnUserData' onClick={exibirtabelaUserAtivos}><img src="../../../img/perfil.png" alt="User" /></button>)}</div>
        
            {tabelaUserAtivos &&(

                <div className='UserData'>
                    <button className='btnUser' onClick={fechartabelaUserAtivos}>Fechar</button>
                      
                        <h3 className='titUser'>Nome:</h3>
                        <input className='UserName' type="text" placeholder=''/>

                        <h3 className='titUser'>E-mail:</h3>
                        <input className='UserName' type="text" placeholder=''/>

                        <h3 className='titUser'>Senha:</h3>
                        <input className='UserName' type="text" placeholder=''/>

                        <h3 className='titUser'>Cpf:</h3>
                        <input className='UserName' type="text" placeholder=''/>

                        <h3 className='titUser'>Telefone:</h3>
                        <input className='UserName' type="text" placeholder=''/>

                        <button className='btnUserSave' >Salvar</button>

                        <button type='submit' className='btnUserSave' onClick={handleLogout}> Sair </button>

                            
                        
                </div>
            )}
            </div>
        </>
    );
}
