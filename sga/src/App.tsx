import React from 'react';
import './App.css';

function App() {
  return (
    <div className='Corpo'>
       <nav>
   <a href="#first"><i className='Pesquisa'><img className='icon' src='img/pesquisar.png'></img></i></a>
   <a href="#second"><i className='Relatorio'><img className='icon' src='img/relatorio.png'></img></i></a>
   <a href="#third"><i className='Tabela'><img className='icon' src='img/tabela.png'></img></i></a>
   <a href="#fourth"><i className="Adicionar"><img className='icon' src='img/adicionar.png'></img></i></a>
   <a href="#fifth"><i className="Editar"><img className='icon' src='img/editar.png'></img></i></a>
   <a href="#sixth"><i className="Notificacao"><img className='icon' src='img/notif.png'></img></i></a>
   <a href="#seventh"><i className="Home"><img className='icon' src='img/home.png'></img></i></a>
 </nav>
  
<div className= 'container'> 
  <section id= 'first'>
    <h1>Pesquisa</h1>
  </section> 
  
  <section id= 'second'>
    <h1>Relatório</h1>
  </section>
  
 <section id= 'third'>
   <h1>Tabela</h1>
  </section>
  
 <section id= 'fourth'>
   <h1>Adicionar</h1>
  </section>

  <section id= 'fifth'>
   <h1>Editar</h1>
  </section>

  <section id= 'sixth'>
   <h1>Notificação</h1>
  </section>

  <section id= 'seventh'>
   <h1>Home</h1>
  </section>
</div>
    </div>
  );
}

export default App;
