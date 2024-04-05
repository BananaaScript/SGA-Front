import React from 'react';
import './App.css';

function App() {
  return (
    <div className='Corpo'>
       <nav>
   <a href="#Login"><i className="Login"></i></a>
   <a href="#Pesquisa"><i className='Pesquisa'><img className='icon' src='img/pesquisar.png'></img></i></a>
   <a href="#Relatorio"><i className='Relatorio'><img className='icon' src='img/relatorio.png'></img></i></a>
   <a href="#Tabela"><i className='Tabela'><img className='icon' src='img/tabela.png'></img></i></a>
   <a href="#Adicionar"><i className="Adicionar"><img className='icon' src='img/adicionar.png'></img></i></a>
   <a href="#Editar"><i className="Editar"><img className='icon' src='img/editar.png'></img></i></a>
   <a href="#Notificacao"><i className="Notificacao"><img className='icon' src='img/notif.png'></img></i></a>
   <a href="#Home"><i className="Home"><img className='icon' src='img/home.png'></img></i></a>
 </nav>
 <div className="navbar">
  <a href="#Perfil"><i className='Perfil'><img className='icon' src='img/perfil.png'></img></i></a>
</div>
<div className= 'container'> 
        <section id= 'Login'>
        <div className="containerLogin">
       <div className="retangulocadastro">
           <h1>FAÇA CADASTRO</h1>
           <button>criar conta</button>
        </div>
        <div className="retanguloLogin">
            <h1>FAÇA LOGIN</h1>
                <input type="text"placeholder="usuario"></input>
            <br></br>
                <input type="text"placeholder="senha"></input>
            <br></br>
            <button>entrar</button>
        </div>
   </div>
        </section> 
        <section id= 'Pesquisa'>
          <h1>Pesquisa</h1>
        </section> 
        <section id= 'Relatorio'>
          <h1>Relatório</h1>
        </section>
      <section id= 'Tabela'>
        <h1>Tabela</h1>
        </section>
      <section id= 'Adicionar'>
        <h1>Adicionar</h1>
        </section>
        <section id= 'Editar'>
        <h1>Editar</h1>
        </section>
        <section id= 'Notificacao'>
        <h1>Notificação</h1>
        </section>
        <section id= 'Home'>
        <h1>Home</h1>
        </section>
        <section id= 'Perfil'>
          <h1>Perfil/Login</h1>
        </section> 
      </div>
    </div>
  );
}

export default App;
