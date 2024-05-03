

import './home.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import "../../../assets/img/perfil.png"

import { formataData } from "../../../functions/formataData"
import { Notificacao } from "../../../modelos/notificacao"



export default function Home() {

    const [tabelaUserAtivos, settabelaUserAtivos] = useState(false)
    function exibirtabelaUserAtivos(){settabelaUserAtivos(true)}
    function fechartabelaUserAtivos(){settabelaUserAtivos(false)}

    const [notificacaoAtrazada, setnotificacaoAtrazada] = useState(false)
    function exibirNotificacaoAtrazada(){setnotificacaoAtrazada(true)}
    function fecharNotificacaoAtrazada(){setnotificacaoAtrazada(false)}

    const [notificacaoTresDias, setnotificacaoTresDias] = useState(false)
    function exibirNotificacaoTresDias(){setnotificacaoTresDias(true)}
    function fecharNotificacaoTresDias(){setnotificacaoTresDias(false)}

    const [notificacaoQuinzeDias, setnotificacaoQuinzeDias] = useState(false)
    function exibirNotificacaoQuinzeDias(){setnotificacaoQuinzeDias(true)}
    function fecharNotificacaoQuinzeDias(){setnotificacaoQuinzeDias(false)}

    const [notificacaoPrevista, setnotificacaoPrevista] = useState(false)
    function exibirNotificacaoPrevista(){setnotificacaoPrevista(true)}
    function fecharNotificacaoPrevista(){setnotificacaoPrevista(false)}


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

        // logout
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


    // tabela de notificações
    const [notificacoes, setNotificacoes] = useState<Array<Notificacao>>([])

    useEffect(()=>{
        axios.get('http://localhost:8080/notifica/listar')
        .then((response)=>{
            setNotificacoes(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    }, []);

    //muda a cor
    function definirCor(dias:any){
        if(dias >= 0 && dias <= 3){
           return { backgroundColor: '#ffff00' }
        }
        else if(dias > 3 && dias <= 15){
            return { backgroundColor: '#87CEFA' }
        }
        else if(dias > 15){
            return {backgroundColor: '#3CB371'}
        }
        else if(dias < 0){
            return {backgroundColor: '#FA8072'}
        }
    }

    //function NotificarPopup (dias:any) {//function App() {
    //    useEffect(() => {

    type NotificarProps = {
        dias: number; // Assuming dias is a number
      };
        function Notificar ({dias: diasN}: NotificarProps) {
            if(diasN >= 0 && diasN <= 3){
                exibirNotificacaoTresDias()
             }
             if(diasN > 3 && diasN <= 15){
                 exibirNotificacaoQuinzeDias()
                }
            if(diasN < 0){
                exibirNotificacaoAtrazada()
            } 
             return null;
        } 
    //}, []) }

        


    return (
        <>
            <div className='TelaInicial'>

            

                <div className='Cabecalho'>
                    <h1>Sistema de Gerenciamento de Ativos - SGA </h1>
                    <h6>___________________________________________________________________________________________________________________________________</h6>
                    
                    <h3>Bem Vindo Usuario!</h3>
                    <h4>Este sistema permite que sua empresa tenha o controle total de todos os ativos, separados por Categorias, posteriormente Modelos e enfim Ativos. Além disso também é possivel acompanhar um ativo especifico ou acompanhar por Modelo e Categoria. </h4>
                    <h5>Abaixo você pode conferir os ativos que possui:  </h5>
                </div>


                <div className="TabelaAtivosHome">  
                        <table>
                            <tr>
                                <th>Ativo</th>
                                <th>Data de expiração</th>
                                <th>Dias até expirar</th>
                            </tr>
                            <tbody>
                                {notificacoes.map((noti)=>(
                                    <tr key={noti.id} style={definirCor(noti.dias)} >
                                        <td>{noti.usuario}</td>
                                        <td>{formataData(noti.dataExpiracao)}  </td>
                                        <td>{noti.dias} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                
                    
                                    {notificacoes.map((noti, index)=>(
                                        <Notificar key={index} dias={parseInt(noti.dias)}/>
                                    ))}

                    { notificacaoQuinzeDias &&(
                    
                        <div className='PopUpNotificação'>
                        <h2>Há ativos que vão expirar em 15 dias</h2>
                        <table>
                            <tr>
                                <th>Ativo   |</th>
                                <th>Data de expiração     |</th>
                                <th>Dias até expirar</th>
                            </tr>
                            <tbody>
                                {notificacoes.map((noti)=>(
                                    <tr key={noti.id} style={definirCor(noti.dias)} >
                                        <td>{noti.usuario}</td>
                                        <td>{formataData(noti.dataExpiracao)}  </td>
                                        <td>{noti.dias} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                            <hr />
                        <button onClick={fecharNotificacaoQuinzeDias}>Fechar</button>
                        </div>

                    )}

                    { notificacaoTresDias &&(
                    
                        <div className='PopUpNotificação'>
                            <h2>Há ativos que vão expirar em 3 dias</h2>
                            <table>
                            <tr>
                                <th>Ativo   |</th>
                                <th>Data de expiração     |</th>
                                <th>Dias até expirar</th>
                            </tr>
                            <tbody>
                                {notificacoes.map((noti)=>(
                                    <tr key={noti.id} style={definirCor(noti.dias)} >
                                        <td>{noti.usuario}</td>
                                        <td>{formataData(noti.dataExpiracao)}  </td>
                                        <td>{noti.dias} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                            <hr />
                            <button onClick={fecharNotificacaoTresDias}>Fechar</button>
                        </div>
                    )}
                    
                    { notificacaoAtrazada &&(

                         <div className='PopUpNotificação'>
                             <h2>Há Ativos Atrazados! </h2>
                             <table>
                            <tr>
                                <th>Ativo    |</th>
                                <th>Data de expiração     |</th>
                                <th>Dias até expirar</th>
                            </tr>
                            <tbody>
                                {notificacoes.map((noti)=>(
                                    <tr key={noti.id} style={definirCor(noti.dias)} >
                                        <td>{noti.usuario}</td>
                                        <td>{formataData(noti.dataExpiracao)}  </td>
                                        <td>{noti.dias} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                             <hr />
                             <button onClick={fecharNotificacaoAtrazada}>Fechar</button>
                         </div>

                    )}

                    <div className='botaousuario'>{!tabelaUserAtivos && (<button className='btnUserData' onClick={exibirtabelaUserAtivos}><img src="../../../img/perfil.png" alt="User" /></button>)}</div>

                        {tabelaUserAtivos &&(
                        
                            <div className='UserData'>
                                <button className='btnUser' onClick={fechartabelaUserAtivos}>Fechar</button>
                        
                                {/*
                                    <h3 className='titUser'>Nome:</h3>
                                    <input className='UserName' type="text" />
                        
                                    <h3 className='titUser'>E-mail:</h3>
                                    <input className='UserName' type="text" />

                                    <h3 className='titUser'>Senha:</h3>
                                    <input className='UserName' type="text" placeholder=''/>
                        
                                    <h3 className='titUser'>Cpf:</h3>
                                    <input className='UserName' type="text" placeholder=''/>

                                    <h3 className='titUser'>Telefone:</h3>
                                    <input className='UserName' type="text" placeholder=''/>

                                    <button className='btnUserSave' >Salvar</button>
                                */}

                                    <button type='submit' className='btnUserSave' onClick={handleLogout}> Sair </button>
                            
                            
                            
                            </div>
                        )}

                    </div>
        </>
    );
}
