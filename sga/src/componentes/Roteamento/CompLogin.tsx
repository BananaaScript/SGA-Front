import { Component } from "react";
import '../BaseCSS/NavBar.css'

type props = {
    botoes: string[],
    seletorView: Function
}

export default class BotaoLogin extends Component<props>{
    constructor(props: props | Readonly<props>) {
        super(props)
        this.gerarListaBotoes = this.gerarListaBotoes.bind(this)
    }


    gerarListaBotoes() {
        if (this.props.botoes.length <= 0) {
            return <></>
        } else {

            let lista = this.props.botoes.map(valor =>
                <div key={valor}  >
                    
                    <button onClick={(e) => this.props.seletorView(valor, e)} className="ButtonLogin">Login</button>
                </div>
            )
            return lista
        }
    }

    render() {

        return (
            <>
            <div>
                <head>
                    <link rel="stylesheet" href="../NavBar.css" />
                </head>
                {this.gerarListaBotoes()}
            </div>
            </>
        )
    }
}