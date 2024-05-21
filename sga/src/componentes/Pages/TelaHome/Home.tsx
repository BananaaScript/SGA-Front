import './home.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


import { formataData } from "../../../functions/formataData"
import { Notificacao } from "../../../modelos/notificacao"
import { Usuario } from "../../../modelos/usuario"
import { METHODS } from 'http';
import { Ativo } from '../../../modelos/ativo';

export default function Home() {
    
    const [tabelaUserAtivos, settabelaUserAtivos] = useState(false)
    function exibirtabelaUserAtivos(){settabelaUserAtivos(true)}
    function fechartabelaUserAtivos(){settabelaUserAtivos(false)}

    const [usuarios, setUsuarios] = useState<Array<Usuario>>([])
    const [usuarioInfromacao, setusuarioInfromacao] = useState<Array<Usuario>>([])
    const [ativoUsuario, setAtivoUsuario] = useState<Array<Ativo>>([])
    
    const [id, setId] = useState('')
    
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [cpf, setCpf] = useState('')
    const [telefone, setTelefone] = useState('')
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');

    const [filtro, setFiltro] = useState<string>('');
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dataFormatada = formataData



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

        axios.get('http://localhost:8080/usuario/listar')
        .then((response) => {
            setUsuarios(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
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
    

  useEffect(() => {
    const informacaoUsuario = async () => {
        try {
            const token = localStorage.getItem('token')
            console.log('Token:', token)

            const response = await axios.get('http://localhost:8080/usuario/informacoes', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setusuarioInfromacao(response.data)
            } else {
                alert("Erro ao obter informações do Usuário")
                console.error('Erro ao obter informações do Usuário:', response.statusText)
            }
        } catch (error) {
            console.error('Erro ao obter informações do usuário:', error)
        }
    };
    informacaoUsuario()
}, []);

useEffect(() => {
    const ativoUsuario = async () => {
        try {
            const token = localStorage.getItem("token")

            const response = await axios.get('http://localhost:8080/ativo/usuario', {
                headers: {
                    'Contente-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 200)
                setAtivoUsuario(response.data)
            else{
                alert("Erro ao encontrar ativos do Usuário")
                console.error("Erro ao obter ativos do Usuário:", response.statusText)
            }
        } catch (error){
            console.error('Erro ao obter ativos do Usuário:', error)
        }
    }
    ativoUsuario()
}, [])






    
    return (
        <>
            <div className='TelaInicial'>
                
                <div><br /><br />{!tabelaUserAtivos && ( <button className='btnUserData' onClick={exibirtabelaUserAtivos}><img src="img/perfil.png" alt="User" /></button>)}</div>

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


                
                <div className="BoxTabelaHome">  
                        <table>
                            <tr>
                                <th>Responsavel</th>
                                <th>Ativo</th>
                                <th>Data de expiração</th>
                                <th>Dias até expirar</th>
                            </tr>
                            <tbody>
                                {ativoUsuario.map((ativo)=>(
                                    <tr >
                                        <td>{ativo.responsavel}</td>
                                        <td>{ativo.nome}</td>
                                        <td>{dataFormatada(ativo.dataManutencao)}</td>
                                        <td>{ativo.dias}</td>
                                    </tr>
                                ))}
                            </tbody>
                            
                        </table>
                          
                    </div>
                    

                        {tabelaUserAtivos &&(
                        
                            <div className='UserData'>
                                <button className='btnUser' onClick={fechartabelaUserAtivos}>Fechar</button>
                                <tbody className='tableUserData'>

                                {usuarioInfromacao.map((usuario) => (
                                    <div>
                                        <tr>
                                            <td>Nome: {usuario.nome}</td>
                                        </tr> <hr />
                                        <tr>
                                            <td>E-mail: {usuario.email}</td>
                                        </tr> <hr />
                                        <tr>
                                            <td>Senha: ******</td>
                                        </tr> <hr />
                                        <tr>
                                            <td>CPF: {usuario.cpf}</td>
                                        </tr> <hr />
                                        <tr>
                                            <td>Telefone: {usuario.telefone}</td>
                                        </tr> 
                                    </div>
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