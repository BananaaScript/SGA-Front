

import './home.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


import { formataData } from "../../../functions/formataData"
import { Notificacao } from "../../../modelos/notificacao"
import { Usuario } from "../../../modelos/usuario"


export default function Home() {
    
    const [tabelaUserAtivos, settabelaUserAtivos] = useState(false)
    function exibirtabelaUserAtivos(){settabelaUserAtivos(true)}
    function fechartabelaUserAtivos(){settabelaUserAtivos(false)}

    const [usuarios, setUsuarios] = useState<Array<Usuario>>([])
    const [id, setId] = useState('')
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');

    const [filtro, setFiltro] = useState<string>('');
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    axios.get('http://localhost:8080/usuario/listar')
    .then((response) => {
        setUsuarios(response.data);
    })
    .catch((error) => {
        console.error(error);
    });



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
    
    type NotificarProps = {
        dias: { dias: string }[];
      };
      
   
  function Notificar({ dias }: NotificarProps) {
    for (let i = 0; i < dias.length; i++) {
      const noti = dias[i];
      const diasNumber = parseInt(noti.dias); 
  
      if (diasNumber <= 0) {
        return  <div>
                    <div className='PopUpNotificacao2'>

                        <h5>⚠️ Você possui ativos expirados, por favor verifique-os. ⚠️</h5>
                    </div>
                </div>;
        };
        
        if (diasNumber <= 15 && diasNumber > 3) {
            return  <div>
                    <div className='PopUpNotificacao1'>
                        <h5>❕ Você possui ativos que vão expirar em menos de 15 dias. ❕</h5>
                    </div>
                </div>;
        }; 

        if (diasNumber <= 3 && diasNumber > 0) {
          return  <div>
                      <div className='PopUpNotificacao1'>
                          <h5>❕ Você possui ativos que vão expirar em menos de 3 dias. ❕</h5>
                      </div>
                  </div>;
          };
          
    }
  
    return null
  };
    

const usuarioFiltrados = usuarios.filter(usuario => usuario.id === 999);


    
    return (
        <>
            <div className='TelaInicial'>
                

                <div className='Cabecalho'>
                    <h1>Sistema de Gerenciamento de Ativos - SGA </h1>
                    <h6>___________________________________________________________________________________________________________________________________</h6>
                    
                    <h3>Bem Vindo Usuario!</h3>
                    <h4>Este sistema permite que sua empresa tenha o controle total de todos os ativos, separados por Categorias, posteriormente Modelos e enfim Ativos. Além disso também é possivel acompanhar um ativo especifico ou por Modelos e Categorias. </h4>


                                {notificacoes.map((noti) => (
                                    <div key={noti.id}>
                                      <Notificar dias={[{ dias: noti.dias }]} />
                                    </div>
                                ))}


                    <h4>Abaixo você pode conferir os ativos que possui:  </h4>
                </div>


                
                <div className="TabelaAtivosHome">  
                        <table>
                            <tr>
                                <th>Responsavel</th>
                                <th>Data de expiração</th>
                                <th>Dias até expirar</th>
                            </tr>
                            <tbody>
                                {notificacoes.map((noti)=>(
                                    <tr key={noti.id}  >
                                        <td>{noti.usuario}</td>
                                        <td>{formataData(noti.dataExpiracao)}  </td>
                                        <td>{noti.dias} </td>
                                    </tr>
                                ))}
                            </tbody>
                            
                        </table>
                          
                    </div>
                    <div>{!tabelaUserAtivos && (<button className='btnUserData' onClick={exibirtabelaUserAtivos}><img src="img/perfil.png" alt="User" /></button>)}</div>

                        {tabelaUserAtivos &&(
                        
                            <div className='UserData'>
                                <button className='btnUser' onClick={fechartabelaUserAtivos}>Fechar</button>
                                <tbody className='tableUserData'>

                                    {usuarioFiltrados.map((usuario)=>(
                                    
                                        <td key={usuario.id}  >
                                            <tr >Nome: {usuario.nome}</tr>
                                            <hr />
                                            <tr>E-mail: {usuario.email}</tr>
                                            <hr />
                                            <tr>Senha: ************</tr>
                                            <hr />
                                            <tr>CPF: {usuario.cpf}</tr>
                                            <hr />
                                            <tr>Telefone: {usuario.telefone}</tr>
                                        </td>
                                    
                                    ))}

                                </tbody>

                                    <h5>* Para alterar seus dados, acesse o email enviado na data do cadastro e acesse o link disponivel lá.</h5>

                                    <button type='submit' className='btnUserSave' onClick={handleLogout}> Logout </button>
                                    
                            
                            
                            
                            </div>
                        )}



                    </div>
        </>
    );
} 
