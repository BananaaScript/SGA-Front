import { Component } from "react";
import BarraNavegacao from "./barraLateral";
import '../BaseCSS/Componente.css'

import TelaHome from "../Pages/TelaHome/Home";
import Editar from "../Pages/Edita/Editar";
import ConfigurarNotificacao from "../Pages/Notifica/Notificacao";
import Pesquisa from "../Pages/Pesquisas/Pesquisa";
import Relatorio from "../Pages/Relatorio/Relatorio";
import Tabela from "../Pages/Tabela/Tabela";
import Adicionar from "../Pages/Adiciona/Adicionar";
import Login from "../Pages/Login/inicio";
import BotaoLogin from "./CompLogin";

type State = {
    tela: string
}

export default class Roteador extends Component<{ tela?: string }, State>{
    constructor(props: { tela: string }) {
        super(props)
        this.state = {
            tela: props.tela || 'Home'
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} botoes={['Home', 'Pesquisa', 'Relatorio', 'Tabelas', 'Adicionar', 'Editar', 'Notificacoes']} />
/*         if (this.state.tela === 'Inicio') {
            let login = <BotaoLogin seletorView={this.selecionarView} botoes={['Home']} />
            return (
                <>
                    <div className="TelaLogin">
                        <Login />
                        <div className="divLogin">
                            {login}
                        </div>
                    </div>
                </>
            )
        } */
        if (this.state.tela === 'Home') {
            return (
                <>
                    <div>
                        {barraNavegacao}
                        <div className="Componente">
                            <TelaHome />
                        </div>
                    </div>
                </>
            )
        } else if (this.state.tela === 'Pesquisa') {
            return (
                <>
                    <div>
                        {barraNavegacao}
                        <div className="Componente">
                            <Pesquisa />
                        </div>
                    </div>
                </>
            )
        } else if (this.state.tela === 'Relatorio') {
            return (
                <>
                    <div>
                        {barraNavegacao}
                        <div className="Componente">
                            <Relatorio />
                        </div>
                    </div>
                </>
            )
        } else if (this.state.tela === 'Tabelas') {
            return (
                <>
                    <div>
                        {barraNavegacao}
                        <div className="Componente">
                            <Tabela />
                        </div>
                    </div>
                </>
            )
        } else if (this.state.tela === 'Adicionar') {
            return (
                <>
                    <div>
                        {barraNavegacao}
                        <div className="Componente">
                            <Adicionar />
                        </div>
                    </div>
                </>
            )
        } else if (this.state.tela === 'Editar') {
            return (
                <>
                    <div>
                        {barraNavegacao}
                        <div className="Componente">
                            <Editar />
                        </div>
                    </div>
                </>
            )
        } else if (this.state.tela === 'Notificacoes') {
            return (
                <>
                    <div>
                        {barraNavegacao}
                        <div className="Componente">
                            <ConfigurarNotificacao />
                        </div>
                    </div>
                </>
            )
        } else return (<></>)
    }
}
