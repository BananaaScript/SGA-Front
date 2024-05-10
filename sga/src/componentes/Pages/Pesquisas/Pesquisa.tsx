import { useState } from "react"
import "./Pesquisar.css"
import Tabela01 from "./Componentes/pesqValor"
import Tabela02 from "./Componentes/pesqEstado"
import Tabela03 from "./Componentes/pesqResponsavel"
import Tabela04 from "./Componentes/pesqLocal"

export default function Pesquisa(){
    const [selecionado, setSelecionado] = useState('Nenhum')
    const selecionarComponente=(escolhido: string)=>{
        setSelecionado(escolhido)
    }
    return(
        <>
            <div className="pesqcss">
            <div className="TopBar">
                <button onClick={()=>selecionarComponente('valor')}><b>Busca por Valor</b></button>
                <button onClick={()=>selecionarComponente('estado')}><b>Busca por Estado</b></button>
                <button onClick={()=>selecionarComponente('responsavel')}><b>Busca por Responsavel</b></button>
                <button onClick={()=>selecionarComponente('local')}><b>Busca por Local</b></button>
            </div>
            <div>
                {selecionado === 'valor' && <Tabela01/>}
                {selecionado === 'estado' && <Tabela02/>}
                {selecionado === 'responsavel' && <Tabela03/>}
                {selecionado === 'local' && <Tabela04/>}
            </div>
            </div>
        </>
    )
}