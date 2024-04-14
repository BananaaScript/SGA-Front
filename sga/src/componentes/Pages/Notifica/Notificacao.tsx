import { useState } from "react"
import EstadoNotificacao from "./Componentes/estadoNotificacao"
import DataManutencao from "./Componentes/dataManutencao"
import EdicaoNotificacao from "./Componentes/edicaoNotificacao"
import "./Notificar.css"

export default function Notificacao(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string)=>{
        setSelecionado(escolhido)
    }

    return(
        <>
            <div className="notfcss">
            <div className="TopBar">
                <button onClick={()=>selecionarComponente('data manutencao')}><b>Alterar Data de Manutencao</b></button>
                <button onClick={()=>selecionarComponente('estado notificacao')}><b>Estado dos Ativos</b></button>
                <button onClick={()=>selecionarComponente('edicaoNotificacao')}><b>Editar Notificações</b></button>
            </div>
            <div>
                <head>
                    <link rel="stylesheet" href="./Notificar.css" />
                </head>
                {selecionado === 'data manutencao' && <DataManutencao/>}
                {selecionado === 'estado notificacao' && <EstadoNotificacao/>}
                {selecionado === 'edicaoNotificacao' && <EdicaoNotificacao/>}
            </div>
            </div>
        </>
    )
}