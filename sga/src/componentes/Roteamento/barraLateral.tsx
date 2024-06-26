/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component} from "react";
import '../BaseCSS/NavBar.css'

type props = {
    botoes: string[],
    seletorView: Function
}

export default class BarraNavegacao extends Component<props>{
    constructor(props: props | Readonly<props>) {
        super(props)
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this)
    }


    gerarListaBotoes() {
        if (this.props.botoes.length <= 0) {
            return <></>
        } else {

            let lista = this.props.botoes.map(valor =>
                <div className="butaos" key={valor} >
                    
                    <a  href="#" onClick={(e) => this.props.seletorView(valor, e)}>
                        <img className='icon' src={`img/${valor}.png`} alt={valor}></img>

                        <br />

                        <p >{valor}</p>

                    </a>
                    

                </div>
            )
            return lista
        }
    }

    render() {
        return (
            <>
            <div >

                <head>
                    <link rel="stylesheet" href="../NavBar.css" />
                </head>

                <nav >
                    <ul className="SideBar">
                        <br />
                        {this.gerarListaBotoes()}
                    </ul>

                </nav>
                
            </div>

            </>
        )
    }
}