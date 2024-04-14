import './home.css'
import "../../../assets/Interface.jpg"

export default function Home(){
    return(
        <>
        <div className='TelaInicial'>
            <head>
                <link rel="stylesheet" href="./home.css" />
            </head>
        
            <div className='Cabecalho'>
                <h1>Sistema de Gerenciamento de Ativos - SGA </h1>

                <hr />
                <br />

                <h3>Bem Vindo Usuario!</h3>
                <h4>Este sistema permite que sua empresa tenha o controle total de todos os ativos, separados por Categorias, posteriormente Modelos e enfim Ativos. Além disso também é possivel acompanhar um ativo especifico ou acompanhar por Modelo e Categoria. </h4>
                
                <h5>Abaixo você pode conferir os ativos que possui:  </h5>
            </div>

            <div className='UserData'>

                <h2>Estamos Trabalhando Nisso</h2>
                <h4>Veja quando ficará pronto <a href="https://github.com/BananaaScript/SGA" target="_blank">AQUI</a></h4>

            </div>

        </div>


        </>
    )
}
