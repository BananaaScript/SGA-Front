import { useState } from "react"
import EstadoNotificacao from "./Componentes/notificacoes"
import EdicaoNotificacao from "./Componentes/notificacoesExp"
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
                    <button onClick={()=>selecionarComponente('Notificacao1')}><b>Notificações</b></button>
                    <button onClick={()=>selecionarComponente('NotificacaoExp')}><b>Notificações Expiradas</b></button>
                </div>
                <div>
                    <div className="BoxTabela">
                    {selecionado === 'Notificacao1' && <EstadoNotificacao/>}
                    {selecionado === 'NotificacaoExp' && <EdicaoNotificacao/>}
                    </div>
                </div>
            </div>
        </>
    )
}
