import React from 'react';
import ReactDOM from 'react-dom/client';
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
